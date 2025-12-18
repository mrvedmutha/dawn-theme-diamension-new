# Product Detail Section - Design Tokens

## 📌 Purpose
This document contains all design specifications, measurements, colors, typography, and styling rules extracted from Figma. Use this as the single source of truth for styling decisions.

**Figma Source:** [Diamension - Dev - FINAL](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=206-241)

---

## 🎨 Color Tokens

### Primary Colors
```css
--color-primary-dark: #183754;    /* Main text, buttons, borders */
--color-secondary-blue: #3e6282;  /* Descriptions, secondary text */
--color-cream-white: #fffaf5;     /* Light text, button text */
```

### Background Colors
```css
--color-bg-beige: #f0efea;        /* Image container backgrounds */
--color-bg-light-gray: #f1f1f1;   /* Input/button backgrounds (inactive) */
--color-bg-white: #ffffff;        /* Main background */
--color-bg-cream: #FFFCF9;        /* Wishlist button active state */
```

### Border & Divider Colors
```css
--color-border-gray: #cbcbcb;     /* Table borders, dividers */
--color-border-primary: #183754;  /* Active state borders */
```

### Usage Map
| Element | Color Token | Hex Value |
|---------|-------------|-----------|
| Product title | `--color-primary-dark` | `#183754` |
| Product description | `--color-secondary-blue` | `#3e6282` |
| Product price | `--color-primary-dark` | `#183754` |
| Button text (dark) | `--color-cream-white` | `#fffaf5` |
| Button background (primary) | `--color-primary-dark` | `#183754` |
| Button background (secondary) | `--color-bg-light-gray` | `#f1f1f1` |
| Table borders | `--color-border-gray` | `#cbcbcb` |
| Accordion text | `--color-secondary-blue` | `#3e6282` |

---

## 🔤 Typography Tokens

### Font Family
```css
--font-primary: 'Neue Haas Grotesk Display Pro', sans-serif;
```

**Font Location:** `assets/fonts/neue-haas-display/`

**Available Weights:**
- 45 Light - Used for light text in tables
- 55 Roman - Primary body text (default)
- 65 Medium - Headings, emphasis, total rows

---

### Font Sizes
```css
/* Headings */
--font-size-h1: 32px;              /* Product title */
--font-size-h2: 20px;              /* Accordion headers, section labels */
--font-size-h3: 16px;              /* Feature card titles */

/* Body Text */
--font-size-body-large: 24px;      /* Product price */
--font-size-body-medium: 18px;     /* Size dropdown value */
--font-size-body: 16px;            /* Button text, product info */
--font-size-body-small: 14px;      /* Descriptions, table text */
--font-size-body-xs: 12px;         /* Sublabels, disclaimers */
--font-size-body-xxs: 10px;        /* Footer legal text */
```

---

### Line Heights
```css
--line-height-tight: 1.2;          /* Compact text (tables, labels) */
--line-height-normal: 1.3;         /* Paragraphs, descriptions */
--line-height-default: normal;     /* Headings, buttons */
```

---

### Font Weight Mapping
```css
--font-weight-light: 300;          /* Neue Haas 45 Light */
--font-weight-regular: 400;        /* Neue Haas 55 Roman */
--font-weight-medium: 500;         /* Neue Haas 65 Medium */
```

---

### Typography Scale
| Element | Size | Weight | Line Height | Color |
|---------|------|--------|-------------|-------|
| **Product Title** | 32px | Regular (400) | normal | `#183754` |
| **Product Price** | 24px | Regular (400) | normal | `#183754` |
| **Accordion Headers** | 20px | Regular (400) | normal | `#183754` |
| **Feature Titles** | 16px | Regular (400) | normal | `#183754` |
| **Body Text** | 16px | Regular (400) | 1.3 | `#3e6282` |
| **Description** | 14px | Regular (400) | normal | `#3e6282` |
| **Table Text** | 14px | Regular (400) | 1.2 | `#3e6282` |
| **Table Values** | 14px | Medium (500) | 1.2 | `#3e6282` |
| **Total Label** | 14px | Medium (500) | 1.2 | `#3e6282` |
| **Total Value** | 14px | Medium (500) | 1.2 | `#183754` |
| **Sublabels** | 12px | Regular (400) | normal | `#3e6282` |
| **Legal Text** | 10px | Regular (400) | normal | `#183754` |

---

## 📐 Spacing Tokens

### Layout Spacing
```css
--spacing-section: 48px;           /* Gap between major sections */
--spacing-column: 34px;            /* Gap between layout columns */
--spacing-large: 32px;             /* Large internal spacing */
--spacing-medium: 24px;            /* Medium internal spacing */
--spacing-default: 16px;           /* Default spacing */
--spacing-small: 12px;             /* Small gaps */
--spacing-xs: 8px;                 /* Extra small gaps */
--spacing-xxs: 2px;                /* Minimal spacing (wishlist button) */
```

### Component-Specific Spacing

#### Product Header
```css
gap-between-title-and-description: 20px;
gap-between-description-and-rating: 10px;
gap-between-rating-and-price: 10px;
```

#### Variant Options
```css
gap-between-option-groups: 24px;
gap-between-purity-buttons: 12px;
gap-between-color-swatches: 8px;
gap-between-size-buttons: 12px;
```

#### Accordions
```css
accordion-header-padding: 20px 24px 20px 0;
accordion-content-padding: 24px 0 30px 0;
gap-between-accordions: 0; /* Border handles separation */
```

#### Sticky Footer
```css
footer-padding-vertical: 30px;
footer-padding-horizontal: 50px;
gap-between-trust-badges: 56px;
gap-between-badge-icon-and-text: 16px;
gap-between-cta-buttons: 16px;
gap-between-buttons-and-legal: 10px;
```

---

## 🔲 Component Tokens

### Thumbnails (Column 1)
```css
thumbnail-size: 40px × 40px;
thumbnail-gap: 16px;
thumbnail-background: #f0efea;
thumbnail-blur: 0.25px;
thumbnail-border-radius: 0;

/* Active State */
thumbnail-active-border: 2px solid #183754;
thumbnail-active-border-width: 2px;

/* Navigation Arrows */
arrow-size: 24px × 24px;
arrow-position-top: 0;
arrow-position-bottom: 350px;
arrow-rotation-up: 180deg;
```

---

### Main Image (Column 2)
```css
main-image-width: 500px;
main-image-height: 800px;
main-image-background: #f0efea;
main-image-object-fit: contain;
main-image-position: sticky;
main-image-top: 0;

/* Wishlist Button */
wishlist-button-size: 30px × 30px;
wishlist-button-position-top: 24px;
wishlist-button-position-right: 24px;
wishlist-button-border-radius: 100px; /* Full circle */
wishlist-button-padding: 2px;
wishlist-button-background: transparent;
wishlist-button-background-active: #FFFCF9;

/* Wishlist SVG */
wishlist-svg-size: 24px × 24px;
wishlist-svg-stroke: #183754;
wishlist-svg-stroke-width: 1.25px;
wishlist-svg-fill: none;
```

---

### Variant Selection Buttons

#### Purity Buttons
```css
purity-button-padding: 10px;
purity-button-min-width: auto;
purity-button-font-size: 16px;
purity-button-font-weight: 400;

/* Unselected State */
purity-button-background: #f1f1f1;
purity-button-color: #3e6282;
purity-button-border: none;

/* Selected State */
purity-button-background-active: #183754;
purity-button-color-active: #fffaf5;
```

#### Metal Type Swatches
```css
swatch-size: 32px × 32px;
swatch-image-size: 28px × 28px; /* Visible portion */
swatch-border-radius: 50%; /* Full circle */
swatch-gap: 8px;

/* Selected State */
swatch-border-selected: 0.8px solid #183754;
swatch-padding-selected: 3.2px; /* Creates border effect */
```

#### Size Dropdown
```css
size-dropdown-width: 88px;
size-dropdown-height: 42px;
size-dropdown-padding: 10px 15px 10px 25px;
size-dropdown-background: #f1f1f1;
size-dropdown-font-size: 18px;
size-dropdown-font-weight: 400;
size-dropdown-color: #3e6282;

/* Dropdown Arrow */
dropdown-arrow-size: 24px × 14.184px;
dropdown-arrow-position-right: 15px;
dropdown-arrow-position-top: 13.91px;
```

#### Quantity Stepper
```css
quantity-button-size: 42px × 42px;
quantity-button-background: #f1f1f1;
quantity-button-padding: 10px;
quantity-button-font-size: 20px;
quantity-button-font-weight: 400;
quantity-button-color: #3e6282;
quantity-gap: 0; /* Buttons flush together */
```

---

### Accordions

#### Accordion Header
```css
accordion-header-padding: 20px 24px 20px 0;
accordion-title-font-size: 20px;
accordion-title-font-weight: 400;
accordion-title-color: #183754;
accordion-arrow-size: 24px × 24px;
accordion-arrow-rotation-open: 180deg;
accordion-arrow-transition: transform 0.3s ease;
```

#### Accordion Content
```css
accordion-content-padding-top: 24px;
accordion-content-padding-bottom: 30px;
accordion-content-padding-horizontal: 0;
accordion-border-bottom: 1px solid #cbcbcb;
```

---

### Product Details Cards (Three-Column Layout)

#### Card Container
```css
card-padding-vertical: 20px;
card-padding-horizontal: 0;
card-border-right: 1px solid #cbcbcb;
card-gap: 8px;
card-align: center;
```

#### Card Content
```css
icon-size: 28px × 28px;
icon-margin-bottom: 8px;

label-font-size: 14px;
label-font-weight: 400;
label-color: #3e6282;
label-line-height: 1.2;
label-text-align: center;

value-font-size: 16px;
value-font-weight: 400;
value-color: #183754;
value-margin-bottom: 8px;

sublabel-font-size: 12px;
sublabel-font-weight: 400;
sublabel-color: #3e6282;
```

---

### Price Breakup Table

#### Table Structure
```css
table-border: 1px solid #cbcbcb;
table-cell-padding: 10px;
table-cell-border-right: 1px solid #cbcbcb;
table-cell-border-bottom: 1px solid #cbcbcb;
```

#### Table Typography
```css
/* Label Column (Left) */
label-font-size: 14px;
label-font-weight: 400;
label-color: #3e6282;
label-line-height: 1.2;
label-text-align: left;

/* Value Column (Right) */
value-font-size: 14px;
value-font-weight: 500; /* Medium */
value-color: #3e6282;
value-line-height: 1.2;
value-text-align: right;

/* Total Row */
total-label-font-weight: 500;
total-label-color: #3e6282;
total-value-font-weight: 500;
total-value-color: #183754; /* Darker for emphasis */
```

#### Disclaimer Text
```css
disclaimer-font-size: 14px;
disclaimer-font-weight: 400;
disclaimer-color: #3e6282;
disclaimer-line-height: 1.2;
disclaimer-text-align: right;
disclaimer-margin-top: 24px;
```

---

### Item Details Table

**Same styling as Price Breakup Table with one exception:**

```css
/* All Text (Labels & Values) */
font-weight: 300; /* Light weight instead of Regular/Medium */
color: #3e6282; /* Same color for both columns */
```

---

### Feature Cards

#### Card Layout
```css
feature-card-gap-internal: 8px;
feature-cards-gap-between: 40px;
feature-cards-margin-top: 32px;
feature-cards-layout: row; /* Three cards side-by-side */
```

#### Card Content
```css
icon-size: 28px × 28px;
icon-margin-bottom: 8px;

title-font-size: 16px;
title-font-weight: 400;
title-color: #183754;
title-margin-bottom: 8px;

description-font-size: 14px;
description-font-weight: 400;
description-color: #3e6282;
description-line-height: 1.2;
```

---

### Sticky Footer / CTA Banner

#### Container
```css
footer-background: #fffaf5;
footer-border-top: 1px solid #e5e5e5;
footer-padding: 30px 50px;
footer-display: flex;
footer-align-items: center;
footer-justify-content: space-between;
```

#### Trust Badges
```css
badge-layout: row;
badge-gap: 56px;
badge-icon-size: 24px × 24px;
badge-text-font-size: 14px;
badge-text-font-weight: 400;
badge-text-color: #183754;
badge-gap-icon-text: 16px;
badge-align: center;
badge-direction: column; /* Icon above text */
```

#### CTA Buttons
```css
buttons-container-width: 380px;
buttons-gap: 16px;
button-padding-vertical: 16px;
button-font-size: 16px;
button-font-weight: 400;
button-text-transform: uppercase;

/* Add to Bag (Secondary) */
button-secondary-background: transparent;
button-secondary-border: 1px solid #183754;
button-secondary-color: #183754;
button-secondary-padding-horizontal: 20px;

/* Buy Now (Primary) */
button-primary-background: #183754;
button-primary-border: none;
button-primary-color: #fffaf5;
button-primary-padding-horizontal: 30px;
```

#### Legal Text
```css
legal-font-size: 10px;
legal-font-weight: 400;
legal-color: #183754;
legal-text-transform: uppercase;
legal-margin-top: 10px;
legal-text-align: center;
```

---

## 🎭 Animation Tokens

### Transitions
```css
--transition-fast: 0.15s ease;
--transition-default: 0.3s ease;
--transition-slow: 0.5s ease;
```

### Wishlist Button Animation
```css
animation-duration: 250ms total;
animation-scale-down: 0.85;
animation-scale-up: 1.0;
animation-timing-down: 100ms;
animation-timing-up: 150ms;
animation-easing-down: power2.in;
animation-easing-up: cubic-bezier(0.68, -0.55, 0.27, 1.55);
```

### Accordion Animation
```css
accordion-transition: transform 0.3s ease;
accordion-arrow-rotation: 180deg;
```

### Hover States
```css
button-hover-opacity: 0.8;
link-hover-opacity: 0.8;
thumbnail-hover-opacity: 0.9;
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-mobile: 0px;          /* Default */
--breakpoint-tablet: 768px;        /* Tablet and up */
--breakpoint-desktop: 1024px;      /* Desktop and up */
--breakpoint-wide: 1440px;         /* Wide screens */
```

### Layout Changes by Breakpoint

#### Mobile (<768px)
- Single column layout
- Thumbnails horizontal scroll below main image
- Fixed footer at bottom (not sticky)
- Full-width buttons
- Stack all content vertically

#### Tablet (768px - 1023px)
- Two-column layout (image left, info right)
- Thumbnails below image (horizontal scroll)
- Sticky footer
- Reduced padding and gaps

#### Desktop (≥1024px)
- Three-column layout (thumbnails, image, info)
- Sticky image and thumbnails
- Sticky footer
- Full spacing as designed

---

## 🖼️ Asset Specifications

### Icons
All icons are 24px × 24px or 28px × 28px SVG files with:
- Stroke color: `#183754`
- Stroke width: `1.5px` - `2px`
- Fill: `none` (outlined style)
- Format: SVG (optimized)

### Metal Type Images
- Format: PNG with transparency
- Size: 64px × 64px minimum (displayed at 28px × 28px)
- Background: Transparent
- Content: Photo/render of metal texture

---

## 📊 Z-Index Scale

```css
--z-index-base: 1;
--z-index-dropdown: 10;
--z-index-sticky: 20;
--z-index-modal: 100;
--z-index-overlay: 90;
```

**Usage:**
- Wishlist button: `z-index: 10`
- Sticky thumbnails/image: `z-index: 20`
- Sticky footer: `z-index: 20`
- Image modal: `z-index: 100`
- Modal overlay: `z-index: 90`

---

## 🔍 Shadow Tokens

```css
--shadow-subtle: 0 1px 3px rgba(0, 0, 0, 0.1);
--shadow-medium: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-strong: 0 10px 25px rgba(0, 0, 0, 0.15);
```

**Usage:**
- Modal: `--shadow-strong`
- Dropdowns: `--shadow-medium`
- Hover states: `--shadow-subtle`

---

## 📏 Border Radius Tokens

```css
--radius-none: 0;
--radius-small: 2px;
--radius-medium: 4px;
--radius-large: 8px;
--radius-full: 100px; /* For circular elements */
```

**Usage:**
- Buttons: `--radius-none` (0)
- Wishlist button: `--radius-full` (100px)
- Input fields: `--radius-none` (0)
- Cards: `--radius-none` (0)

---

## 🎯 Focus States (Accessibility)

```css
--focus-outline-color: #183754;
--focus-outline-width: 2px;
--focus-outline-offset: 2px;
--focus-outline-style: solid;
```

**Apply to all interactive elements:**
- Buttons
- Links
- Form inputs
- Accordion headers
- Thumbnail images

---

## 📝 Usage Guidelines

### Applying Tokens in CSS

**DO:**
```css
.custom-product-detail__title {
  font-family: var(--font-primary);
  font-size: var(--font-size-h1);
  color: var(--color-primary-dark);
  line-height: var(--line-height-default);
}
```

**DON'T:**
```css
.custom-product-detail__title {
  font-family: 'Helvetica'; /* ❌ Wrong font */
  font-size: 30px; /* ❌ Not a token value */
  color: #000; /* ❌ Not a defined color */
}
```

---

### Applying Tokens in Liquid

**DO:**
```liquid
<h1 class="custom-product-detail__title">
  {{ product.title }}
</h1>
```

**DON'T:**
```liquid
<h1 style="font-size: 32px; color: #183754;">
  {{ product.title }}
</h1>
```

---

## ✅ Token Validation Checklist

Before submitting code, verify:

- [ ] All font sizes match token values
- [ ] All colors use defined color tokens
- [ ] All spacing uses spacing scale
- [ ] Typography uses Neue Haas Grotesk Display Pro
- [ ] Line heights match specifications
- [ ] Border colors use `--color-border-gray` or `--color-border-primary`
- [ ] Hover states use opacity or defined hover colors
- [ ] Focus states are visible and accessible
- [ ] Animations use defined timing values
- [ ] Responsive breakpoints match specifications

---

## 🔗 Cross-Reference

- **Typography implementation:** See `docs/rules/05-CSS-STANDARDS.md`
- **Color usage:** See `docs/rules/05-CSS-STANDARDS.md`
- **Spacing system:** See `docs/rules/05-CSS-STANDARDS.md`
- **BEM naming:** See `docs/rules/08-NAMING-CONVENTIONS.md`

---

**Version:** 1.0
**Last Updated:** 2025-01-XX
**Source:** Figma Design File - Diamension Dev Final
