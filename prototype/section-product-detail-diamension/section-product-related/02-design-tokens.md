# Related Products Section - Design Tokens

## 📌 Purpose
This document contains all design specifications, measurements, colors, typography, and styling rules extracted from Figma for the "Similar Products" carousel section. Use this as the single source of truth for styling decisions.

**Figma Source:** [Node 206-452](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=206-452&m=dev)

---

## 🎨 Color Tokens

### Primary Colors
```css
--color-primary-dark: #183754;    /* Section title, product names */
--color-secondary-blue: #3e6282;  /* Product prices */
--color-cream-white: #fffaf5;     /* Section container background */
```

### Background Colors
```css
--color-bg-cream: #FFFAF5;        /* Section container background */
--color-bg-beige: #f0efea;        /* Image wrapper background */
--color-bg-wishlist-active: #FFFCF9; /* Wishlist button active state */
```

### Gradient Overlays
```css
--gradient-carousel-hover: linear-gradient(-89.7744deg, rgba(0, 0, 0, 0.8) 17.65%, rgba(102, 102, 102, 0) 30.891%);
```

### Usage Map
| Element | Color Token | Hex Value |
|---------|-------------|-----------|
| Section container background | `--color-bg-cream` | `#FFFAF5` |
| Section title | `--color-primary-dark` | `#183754` |
| Image wrapper background | `--color-bg-beige` | `#f0efea` |
| Product name | `--color-primary-dark` | `#183754` |
| Product price | `--color-secondary-blue` | `#3e6282` |
| Wishlist stroke | `--color-primary-dark` | `#183754` |
| Wishlist active bg | `--color-bg-wishlist-active` | `#FFFCF9` |
| Carousel gradient | `--gradient-carousel-hover` | See above |

---

## 🔤 Typography Tokens

### Font Families
```css
--font-primary: 'Neue Haas Grotesk Display Pro', sans-serif;
--font-secondary: 'Neue Montreal', sans-serif;
```

**Font Location:** `assets/fonts/`

**Neue Haas Grotesk Display Pro - Available Weights:**
- 45 Light - Used for product names
- 55 Roman - Default body text
- 65 Medium - Headings

**Neue Montreal - Available Weights:**
- Regular - Used for product prices

---

### Font Sizes
```css
/* Section Title */
--font-size-section-title: 32px;   /* "Similar Products" heading */

/* Product Card Text */
--font-size-product-name: 20px;    /* Product title */
--font-size-product-price: 16px;   /* Price text */
```

---

### Line Heights
```css
--line-height-normal: normal;      /* Headings, product names, prices */
```

---

### Font Weight Mapping
```css
--font-weight-light: 300;          /* Neue Haas 45 Light (product names) */
--font-weight-regular: 400;        /* Neue Haas 55 Roman, Neue Montreal */
```

---

### Typography Scale
| Element | Font Family | Size | Weight | Line Height | Color |
|---------|-------------|------|--------|-------------|-------|
| **Section Title** | Neue Haas Display Pro | 32px | Regular (400) | normal | `#183754` |
| **Product Name** | Neue Haas Display Pro | 20px | Light (300) | normal | `#183754` |
| **Product Price** | Neue Montreal | 16px | Regular (400) | normal | `#3e6282` |

---

## 📐 Spacing Tokens

### Section Layout Spacing
```css
--section-wrapper-width: 100%;     /* Wrapper is full width */
--section-container-max-width: 1440px; /* Container max-width */
--section-padding-vertical: 100px; /* Container top and bottom padding (desktop) */
--section-padding-horizontal: 50px; /* Container left and right padding (desktop) */
--section-title-gap: 24px;         /* Gap between title and carousel */
```

### Product Card Spacing
```css
--card-width-desktop: 260px;       /* Product card width (desktop) */
--card-gap: 10px;                  /* Gap between product cards */
--card-image-gap: 10px;            /* Gap between image and product name */
--card-name-price-gap: 4px;        /* Gap between product name and price */
```

### Image Wrapper Spacing
```css
--image-wrapper-width: 260px;      /* Desktop width */
--image-wrapper-height: 360px;     /* Desktop height */
--image-size: 250px;               /* Actual product image size (250×250px) */
```

### Wishlist Button Position
```css
--wishlist-position-top: 24px;     /* Distance from top of image wrapper */
--wishlist-position-right: 24px;   /* Distance from right of image wrapper */
```

---

## 🔲 Component Tokens

### Section Wrapper (Outermost)
```css
section-wrapper-width: 100%; /* Fluid, full viewport width */
section-wrapper-background: #FFFAF5;
section-wrapper-display: block;
```

### Section Container (Middle Layer)
```css
section-container-max-width: 1440px;
section-container-margin: 0 auto; /* Centered */
section-container-padding-top: 100px;
section-container-padding-bottom: 100px;
section-container-padding-left: 50px;
section-container-padding-right: 50px;
```

---

### Section Title
```css
section-title-font-family: 'Neue Haas Grotesk Display Pro';
section-title-font-size: 32px;
section-title-font-weight: 400; /* 55 Roman */
section-title-color: #183754;
section-title-line-height: normal;
section-title-margin-bottom: 24px;
```

---

### Carousel Wrapper
```css
carousel-wrapper-display: flex;
carousel-wrapper-gap: 10px;
carousel-wrapper-overflow-x: auto; /* or hidden with JS scroll */
carousel-wrapper-scroll-behavior: smooth;
carousel-wrapper-align-items: center;
```

---

### Product Card
```css
product-card-width: 260px; /* Desktop */
product-card-flex-shrink: 0;
product-card-display: flex;
product-card-flex-direction: column;
product-card-position: relative;
```

---

### Image Wrapper
```css
image-wrapper-width: 260px;
image-wrapper-height: 360px;
image-wrapper-background: #f0efea;
image-wrapper-display: flex;
image-wrapper-align-items: center;
image-wrapper-justify-content: center;
image-wrapper-position: relative;
image-wrapper-overflow: hidden; /* Clip content if needed */
```

---

### Product Image
```css
product-image-width: 250px;
product-image-height: 250px;
product-image-object-fit: contain;
product-image-object-position: center;
```

---

### Wishlist Button
```css
wishlist-button-size: 30px × 30px;
wishlist-button-position: absolute;
wishlist-button-top: 24px;
wishlist-button-right: 24px;
wishlist-button-border-radius: 100px; /* Full circle */
wishlist-button-padding: 2px;
wishlist-button-background: transparent;
wishlist-button-background-active: #FFFCF9;
wishlist-button-z-index: 10;
wishlist-button-cursor: pointer;
wishlist-button-border: none;
wishlist-button-display: flex;
wishlist-button-align-items: center;
wishlist-button-justify-content: center;

/* Wishlist SVG */
wishlist-svg-size: 24px × 24px;
wishlist-svg-stroke: #183754;
wishlist-svg-stroke-width: 1.25px;
wishlist-svg-fill: none;
```

**IMPORTANT:** Wishlist icon is 24×24px (NOT 18px as mentioned in reference documentation).

---

### Product Name
```css
product-name-font-family: 'Neue Haas Grotesk Display Pro';
product-name-font-size: 20px;
product-name-font-weight: 300; /* 45 Light */
product-name-color: #183754;
product-name-line-height: normal;
product-name-margin-top: 10px; /* Gap after image */
product-name-margin-bottom: 4px; /* Gap before price */
product-name-text-overflow: ellipsis;
product-name-overflow: hidden;
product-name-white-space: nowrap; /* Single line with truncation */
```

---

### Product Price
```css
product-price-font-family: 'Neue Montreal';
product-price-font-size: 16px;
product-price-font-weight: 400;
product-price-color: #3e6282;
product-price-line-height: normal;
```

**Price Display Logic:**
- If product has single price: `Rs. XX,XXX`
- If product has price range: `From Rs. XX,XXX` (show lowest price)

---

### Navigation Arrows

#### Arrow Button
```css
arrow-button-size: 56px × 56px; /* Desktop */
arrow-button-position: absolute;
arrow-button-top: 50%;
arrow-button-transform: translateY(-50%);
arrow-button-z-index: 20;
arrow-button-cursor: pointer;
arrow-button-background: transparent;
arrow-button-border: none;
arrow-button-display: flex;
arrow-button-align-items: center;
arrow-button-justify-content: center;

/* Left Arrow */
arrow-left-position-left: 0;

/* Right Arrow */
arrow-right-position-right: 0;
```

#### Arrow Icon (Chevron)
```css
arrow-icon-size: 56px × 56px;
arrow-icon-color: #ffffff; /* White on dark gradient */
```

#### Arrow Visibility
```css
/* Hide left arrow when at start */
arrow-left-display: none; /* when scrollLeft === 0 */

/* Hide right arrow when at end */
arrow-right-display: none; /* when scrolled to end */
```

---

### Gradient Overlay (Hover Effect)

**Applied to last visible card or on hover:**
```css
gradient-overlay-position: absolute;
gradient-overlay-inset: 0;
gradient-overlay-background: linear-gradient(-89.7744deg, rgba(0, 0, 0, 0.8) 17.65%, rgba(102, 102, 102, 0) 30.891%);
gradient-overlay-pointer-events: none;
gradient-overlay-opacity: 0; /* Default */
gradient-overlay-opacity-hover: 1; /* On hover */
gradient-overlay-transition: opacity 0.3s ease;
```

---

## 🎭 Animation Tokens

### Transitions
```css
--transition-fast: 0.15s ease;
--transition-default: 0.3s ease;
--transition-slow: 0.5s ease;
```

### Wishlist Button Animation (GSAP)
```css
animation-duration: 250ms total;
animation-scale-down: 0.85;
animation-scale-up: 1.0;
animation-timing-down: 100ms;
animation-timing-up: 150ms;
animation-easing-down: power2.in;
animation-easing-up: cubic-bezier(0.68, -0.55, 0.27, 1.55);
```

### Carousel Scroll Animation
```css
scroll-behavior: smooth;
scroll-transition: 0.3s ease;
```

### Hover States
```css
wishlist-hover-opacity: 0.8;
arrow-hover-opacity: 0.9;
gradient-hover-opacity: 1;
```

---

## 📱 Responsive Breakpoints & Adjustments

```css
/* Mobile First Approach */
--breakpoint-mobile: 0px;          /* Default */
--breakpoint-tablet: 768px;        /* Tablet and up */
--breakpoint-desktop: 1024px;      /* Desktop and up */
```

### Desktop (≥1024px)
```css
section-padding-vertical: 100px;
section-padding-horizontal: 50px;
products-visible: 5;
card-width: 260px;
card-gap: 10px;
image-wrapper-width: 260px;
image-wrapper-height: 360px;
arrow-size: 56px × 56px;
```

### Tablet (768px - 1023px)
```css
section-padding-vertical: 60px;
section-padding-horizontal: 30px;
products-visible: 4;
card-width: calc((100% - 30px) / 4); /* Fluid width */
card-gap: 10px;
image-wrapper-width: 100%; /* Fills card */
image-wrapper-height: 300px; /* Reduced height */
arrow-size: 48px × 48px;
```

### Mobile (<768px)
```css
section-padding-vertical: 50px;
section-padding-horizontal: 20px;
products-visible: 2;
card-width: calc((100% - 8px) / 2); /* Fluid width */
card-gap: 8px;
image-wrapper-width: 100%;
image-wrapper-height: 240px; /* Further reduced */
arrow-size: 40px × 40px;
product-name-font-size: 16px; /* Smaller text */
product-price-font-size: 14px; /* Smaller text */
```

---

## 🖼️ Asset Specifications

### Icons

#### Wishlist Heart Icon
- **Format:** SVG inline
- **Size:** 24×24px
- **Stroke color:** `#183754`
- **Stroke width:** `1.25px`
- **Fill:** `none` (outlined)
- **Path:** Use existing `heart-icon-diamension.svg` from `assets/custom-product-detail/icons/`

#### Chevron Right Icon
- **Format:** SVG inline or image
- **Size:** 56×56px (desktop), scales down on mobile
- **Color:** `#ffffff` (white on gradient background)
- **File:** Extract from Figma Node 206-523 or use existing chevron icon

---

## 📊 Z-Index Scale

```css
--z-index-base: 1;
--z-index-wishlist: 10;
--z-index-arrow: 20;
--z-index-gradient: 5;
```

**Usage:**
- Wishlist button: `z-index: 10`
- Navigation arrows: `z-index: 20`
- Gradient overlay: `z-index: 5`

---

## 🔍 Shadow Tokens

**Note:** This section uses minimal or no shadows. Flat design style.

```css
--shadow-none: none;
```

---

## 📏 Border Radius Tokens

```css
--radius-none: 0;                  /* Product cards, image wrappers */
--radius-full: 100px;              /* Wishlist button (circular) */
```

**Usage:**
- Product cards: `border-radius: 0`
- Image wrappers: `border-radius: 0`
- Wishlist button: `border-radius: 100px`
- Arrow buttons: `border-radius: 0` or `border-radius: 50%` (circular)

---

## 🎯 Focus States (Accessibility)

```css
--focus-outline-color: #183754;
--focus-outline-width: 2px;
--focus-outline-offset: 2px;
--focus-outline-style: solid;
```

**Apply to all interactive elements:**
- Product card links
- Wishlist buttons
- Navigation arrows

---

## 📝 Usage Guidelines

### Applying Tokens in CSS

**DO:**
```css
.custom-section-related-products {
  max-width: var(--section-max-width);
  background-color: var(--color-bg-cream);
  padding: var(--section-padding-vertical) var(--section-padding-horizontal);
}

.custom-section-related-products__title {
  font-family: var(--font-primary);
  font-size: var(--font-size-section-title);
  color: var(--color-primary-dark);
}
```

**DON'T:**
```css
.custom-section-related-products {
  max-width: 1500px; /* ❌ Wrong value */
  background-color: #fff; /* ❌ Wrong color */
  padding: 80px 40px; /* ❌ Not a token value */
}
```

---

### Applying Tokens in Liquid

**DO:**
```liquid
<div class="custom-section-related-products">
  <h2 class="custom-section-related-products__title">
    {{ section.settings.heading }}
  </h2>
</div>
```

**DON'T:**
```liquid
<div style="max-width: 1440px; background: #FFFAF5;">
  <!-- ❌ Inline styles -->
</div>
```

---

## ✅ Token Validation Checklist

Before submitting code, verify:

- [ ] Section container max-width is 1440px
- [ ] Section background is #FFFAF5
- [ ] Product card width is 260px on desktop
- [ ] Image wrapper is 260×360px on desktop
- [ ] Product image is 250×250px centered
- [ ] Wishlist icon is 24×24px (NOT 18px)
- [ ] Product name uses Neue Haas 45 Light, 20px
- [ ] Product price uses Neue Montreal Regular, 16px
- [ ] Gap between cards is 10px (desktop)
- [ ] Responsive breakpoints match specifications (5 → 4 → 2)
- [ ] Navigation arrows are 56px (desktop), scale down on mobile
- [ ] Gradient overlay uses correct linear-gradient value
- [ ] All spacing matches token values
- [ ] GSAP animation matches wishlist implementation
- [ ] Focus states are visible and accessible

---

## 🔗 Cross-Reference

- **Typography implementation:** See `docs/rules/05-CSS-STANDARDS.md`
- **Color usage:** See `docs/rules/05-CSS-STANDARDS.md`
- **Spacing system:** See `docs/rules/05-CSS-STANDARDS.md`
- **BEM naming:** See `docs/rules/08-NAMING-CONVENTIONS.md`
- **Wishlist logic:** See `prototype/section-product-detail-diamension/wishlist-button-implementation/implementation-overview.md`

---

**Version:** 1.0
**Last Updated:** 2025-01-18
**Source:** Figma Design File - Node 206-452
