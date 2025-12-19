# Product Collection Section - Design Tokens

## 📌 Purpose
This document contains all design specifications, measurements, colors, typography, and styling rules extracted from Figma. Use this as the single source of truth for styling decisions.

**Figma Source:** [Diamension - Dev - FINAL](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-)

**MANDATORY:** Before development, review ALL Figma nodes listed in this document and ALL rules in `docs/rules/`

---

## 🎨 Color Tokens

### Primary Colors
```css
--color-primary-dark: #183754;    /* Main text, buttons, borders, breadcrumb */
--color-secondary-blue: #3e6282;  /* Prices, descriptions, secondary text */
--color-cream-white: #fffaf5;     /* Light backgrounds, button text */
--color-overlay-beige: #e7e6d4;   /* Image card text and button borders */
```

### Background Colors
```css
--color-bg-beige: #f0efea;        /* Page wrapper, product image backgrounds */
--color-bg-white: #ffffff;        /* Card backgrounds */
--color-bg-cream: #fffcf9;        /* Wishlist active state, badge backgrounds */
--color-bg-gradient-start: rgba(197, 188, 160, 0);      /* Image card overlay start */
--color-bg-gradient-end: rgba(0, 0, 0, 0.3);            /* Image card overlay end */
```

### Border & Divider Colors
```css
--color-border-gray: #cbcbcb;     /* Not used in this section */
--color-border-primary: #183754;  /* Active states, filter/sort buttons */
--color-border-image-card: #e7e6d4; /* Image card CTA button border */
```

### Usage Map
| Element | Color Token | Hex Value |
|---------|-------------|-----------|
| Page background | `--color-bg-beige` | `#f0efea` |
| Breadcrumb text | `--color-primary-dark` | `#183754` |
| Collection title | `--color-primary-dark` | `#183754` |
| Collection description | `--color-secondary-blue` | `#3e6282` |
| Product card background | `--color-bg-beige` | `#f0efea` |
| Product title | `--color-primary-dark` | `#183754` |
| Product price | `--color-secondary-blue` | `#3e6282` |
| Filter/Sort button text | `--color-primary-dark` | `#183754` |
| Load More button text | `--color-primary-dark` | `#183754` |
| Load More button border | `--color-border-primary` | `#183754` |
| Image card text | `--color-overlay-beige` | `#e7e6d4` |
| Image card button border | `--color-border-image-card` | `#e7e6d4` |
| NEW ARRIVAL badge bg | `--color-bg-cream` | `#fffaf5` |
| NEW ARRIVAL badge text | `--color-primary-dark` | `#183754` |

---

## 🔤 Typography Tokens

### Font Families
```css
--font-primary: 'Neue Haas Grotesk Display Pro', sans-serif;  /* Headings, buttons */
--font-secondary: 'Neue Montreal', sans-serif;                /* Product titles, prices */
```

**Font Locations:**
- Neue Haas: `assets/fonts/neue-haas-display/`
- Neue Montreal: `assets/fonts/neue-montreal/`

**Available Weights:**
- **Neue Haas:**
  - 45 Light - Light text
  - 55 Roman - Default body text
  - 65 Medium - Emphasis
- **Neue Montreal:**
  - Regular (400) - Product cards

---

### Font Sizes
```css
/* Headings */
--font-size-h1: 32px;              /* Collection title */
--font-size-h2: 20px;              /* Not used */
--font-size-h3: 16px;              /* Breadcrumb, buttons, description, image card caption */

/* Body Text */
--font-size-body-large: 18px;      /* Product title */
--font-size-body-medium: 16px;     /* Product price, filter/sort, load more, image card caption */
--font-size-body-small: 14px;      /* Progress text, badge text */
--font-size-body-xs: 12px;         /* Not used */
```

---

### Line Heights
```css
--line-height-normal: normal;      /* Most text elements */
--line-height-tight: 1.2;          /* Not used */
--line-height-description: 1.3;    /* Multi-line descriptions */
--line-height-double: 2;           /* Image card caption first line */
--line-height-caption: 101.445%;   /* Image card caption second line */
```

---

### Typography Scale

| Element | Font Family | Size | Weight | Line Height | Color |
|---------|-------------|------|--------|-------------|-------|
| **Breadcrumb Links** | Neue Montreal | 16px | Regular (400) | normal | `#183754` |
| **Collection Title** | Neue Montreal | 32px | Regular (400) | normal | `#183754` |
| **Collection Description** | Neue Montreal | 16px | Regular (400) | 2 / 101.445% | `#3e6282` |
| **Filter/Sort Buttons** | Neue Haas 55 Roman | 16px | Regular (400) | normal | `#183754` |
| **Product Title** | Neue Montreal | 18px | Regular (400) | normal | `#183754` |
| **Product Price** | Neue Montreal | 16px | Regular (400) | normal | `#3e6282` |
| **NEW ARRIVAL Badge** | Neue Montreal | 14px | Regular (400) | normal | `#183754` |
| **Progress Indicator** | Neue Haas 55 Roman | 14px | Regular (400) | normal | `#183754` |
| **Load More Button** | Neue Haas 55 Roman | 16px | Regular (400) | normal | `#183754` |
| **Image Card Caption Line 1** | Neue Haas 55 Roman | 16px | Regular (400) | normal | `#e7e6d4` |
| **Image Card Caption Line 2** | Neue Haas 45 Light | 16px | Light (300) | normal | `#e7e6d4` |
| **Image Card Button** | Neue Haas 55 Roman | 16px | Regular (400) | normal | `#e7e6d4` |

---

## 📐 Spacing Tokens

### Layout Spacing
```css
--spacing-section: 48px;           /* Between major page sections */
--spacing-row: 24px;               /* Between product rows / sections */
--spacing-product: 10px;           /* Between product cards */
--spacing-large: 32px;             /* Large internal spacing */
--spacing-medium: 24px;            /* Medium internal spacing */
--spacing-default: 16px;           /* Default spacing */
--spacing-small: 10px;             /* Small gaps (product title to price) */
--spacing-xs: 8px;                 /* Extra small gaps (filter/sort button icon to text) */
--spacing-xxs: 4px;                /* Minimal spacing (product title to price) */
```

### Container Spacing
```css
--container-max-width: 1440px;     /* Maximum container width */
--container-padding-desktop: 50px; /* Horizontal padding on desktop */
--container-padding-tablet: 30px;  /* Horizontal padding on tablet */
--container-padding-mobile: 20px;  /* Horizontal padding on mobile */
```

### Component-Specific Spacing

#### Breadcrumb Section
```css
padding-top: 8px;
padding-bottom: 0;
padding-horizontal: 50px;
gap-between-links: 10px;
```

#### Title Section
```css
padding-vertical: 0;
padding-horizontal: 50px;
gap-between-title-and-filter: 991px; /* Justify space-between */
gap-internal-title: 10px; /* Between title and description */
gap-filter-sort: 24px; /* Between filter and sort buttons */
gap-icon-text: 8px; /* Inside filter/sort buttons */
```

#### Hero Image Section
```css
margin-bottom: 0;
height: 641.703px; /* Aspect ratio: 1440/641.703 */
```

#### Product Grid
```css
gap-between-rows: 24px;
gap-between-products: 10px;
padding-horizontal: 10px; /* Grid container padding */
```

#### Product Card
```css
gap-image-to-title: 10px;
gap-title-to-price: 4px;
```

#### Image Card
```css
padding-bottom: 24px; /* Tag overlay */
padding-horizontal: 146px; /* Tag overlay text */
gap-text-to-button: 24px; /* Inside tag overlay */
```

#### Load More Section
```css
padding-vertical: 60px;
padding-horizontal: 50px;
gap-internal: 32px; /* Between progress and button */
gap-progress: 16px; /* Between text and line */
```

---

## 🔲 Component Tokens

### Breadcrumb
```css
/* Container */
breadcrumb-gap: 10px;
breadcrumb-align: flex-start;

/* Separator */
separator-width: 0;
separator-height: 19px;
separator-rotation: 90deg;
separator-icon: line-8.svg;

/* Links */
link-font-size: 16px;
link-font-weight: 400;
link-color: #183754;
link-font-family: 'Neue Montreal', sans-serif;
```

---

### Collection Title Section
```css
/* Title */
title-font-size: 32px;
title-font-weight: 400;
title-color: #183754;
title-font-family: 'Neue Montreal', sans-serif;
title-text-transform: uppercase;

/* Description */
description-font-size: 16px;
description-font-weight: 400;
description-color: #3e6282; /* First line different line-height: 2 */
description-font-family: 'Neue Montreal', sans-serif;
description-line-height-1: 2;
description-line-height-2: 101.445%;

/* Filter/Sort Buttons */
button-gap: 24px;
button-icon-size: 24px;
button-icon-text-gap: 8px;
button-font-size: 16px;
button-font-weight: 400;
button-color: #183754;
button-cursor: pointer;
button-background: transparent;
button-border: none;
button-padding: 0;
```

---

### Hero Image
```css
/* Container */
hero-width: 100%; /* Full width */
hero-aspect-ratio: 1440 / 641.703;
hero-overflow: hidden;

/* Image */
hero-image-width: 103.69%;
hero-image-height: 348.97%;
hero-image-position-top: -218.16%;
hero-image-position-left: 0;
hero-image-max-width: none;

/* Caption Overlay (if needed) */
caption-position: absolute;
caption-bottom: 32px;
caption-left: 50px;
caption-font-size: 16px;
caption-color: #fffaf5;
caption-background: rgba(0, 0, 0, 0.5); /* Optional overlay */
caption-padding: 16px 24px;
```

---

### Product Card
```css
/* Container */
card-display: flex;
card-flex-direction: column;
card-gap: 10px;
card-position: relative;
card-overflow: clip;

/* Image Wrapper */
image-wrapper-width: 348px; /* Desktop - flex basis calculated */
image-wrapper-height: 500px; /* Fixed height */
image-wrapper-background: #f0efea;
image-wrapper-display: flex;
image-wrapper-align: center;
image-wrapper-justify: center;
image-wrapper-overflow: clip;

/* Product Image */
product-image-size: 400px × 400px;
product-image-object-fit: cover;
product-image-object-position: 50% 50%;

/* Wishlist Icon */
wishlist-position: absolute;
wishlist-top: 15.5px; /* or 24px based on card */
wishlist-right: 12px;
wishlist-size: 30px × 30px;
wishlist-border-radius: 100px;
wishlist-padding: 2px;
wishlist-background: transparent;
wishlist-background-active: #fffcf9;

/* Wishlist SVG */
wishlist-svg-size: 24px × 24px;
wishlist-svg-stroke: #183754;
wishlist-svg-fill: none;

/* NEW ARRIVAL Badge */
badge-position: absolute;
badge-top: 12px;
badge-left: 12px;
badge-padding: 10px;
badge-background: #fffaf5;
badge-font-size: 14px;
badge-font-weight: 400;
badge-color: #183754;
badge-font-family: 'Neue Montreal', sans-serif;

/* Product Info */
info-gap: 4px;
info-font-family: 'Neue Montreal', sans-serif;

/* Product Title */
title-font-size: 18px;
title-font-weight: 400;
title-color: #183754;
title-line-height: normal;
title-overflow: ellipsis;
title-white-space: nowrap; /* Unless multi-line */

/* Product Price */
price-font-size: 16px;
price-font-weight: 400;
price-color: #3e6282;
price-line-height: normal;
price-prefix: "From Rs. ";
```

---

### Image Card (Promotional)

#### Container
```css
/* Card Wrapper */
card-width: 704px; /* Takes 2 product card spaces */
card-height: 500px; /* Matches product card height */
card-position: relative;
card-overflow: clip;

/* Background Media */
media-width: 100%;
media-height: 100%;
media-object-fit: cover;
media-position: absolute;
media-top: 0;
media-left: 0;
```

#### Gradient Overlay
```css
overlay-position: absolute;
overlay-bottom: 0;
overlay-left: 50%;
overlay-transform: translateX(-50%);
overlay-width: 704px;
overlay-background: linear-gradient(to bottom,
  rgba(197, 188, 160, 0) 12.016%,
  rgba(0, 0, 0, 0.3) 61.954%
);
overlay-padding-vertical: 24px;
overlay-padding-horizontal: 146px;
overlay-gap: 24px;
overlay-display: flex;
overlay-flex-direction: column;
overlay-align: center;
```

#### Tag Content
```css
/* Caption Text */
caption-font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
caption-font-size: 16px;
caption-line-height: normal;
caption-color: #e7e6d4;
caption-text-align: center;
caption-width: min-content;
caption-min-width: 100%;

/* First Line */
caption-line-1-font-weight: 400; /* 55 Roman */
caption-line-1-margin-bottom: 0;

/* Second Line */
caption-line-2-font-weight: 300; /* 45 Light */

/* CTA Button */
button-border: 1px solid #e7e6d4;
button-padding-vertical: 10px;
button-padding-horizontal: 60px;
button-background: transparent;
button-font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
button-font-size: 16px;
button-font-weight: 400;
button-color: #e7e6d4;
button-text-transform: uppercase;
button-line-height: normal;
```

#### Decorative Text Overlay (Alternative Image Card)
```css
/* Rotating text elements on image */
text-font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
text-font-size: 48px;
text-font-weight: 300; /* 45 Light */
text-color: #183754;
text-position: absolute;

/* "Sweet" */
sweet-top: 32.06px;
sweet-left: 205.46px;
sweet-rotation: 358deg;

/* "Priceless" */
priceless-top: 386.96px;
priceless-left: 100.04px;
priceless-rotation: 358deg;

/* "Cold" */
cold-top: 190.41px;
cold-left: 375.02px;
cold-rotation: 2deg;
```

---

### Load More Section

#### Container
```css
section-padding-vertical: 60px;
section-padding-horizontal: 50px;
section-display: flex;
section-flex-direction: column;
section-align: center;
section-justify: center;
section-gap: 32px;
```

#### Progress Indicator
```css
/* Text */
progress-font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
progress-font-size: 14px;
progress-font-weight: 400;
progress-color: #183754;
progress-text-align: center;
progress-margin-bottom: 16px;

/* Divider Line */
divider-width: 110px;
divider-height: 0;
divider-border-bottom: 1px solid #183754; /* Using line-10.svg */
```

#### Load More Button
```css
button-padding-vertical: 16px;
button-padding-horizontal: 120px;
button-border: 1px solid #183754;
button-background: transparent;
button-font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
button-font-size: 16px;
button-font-weight: 400;
button-color: #183754;
button-text-transform: uppercase;
button-cursor: pointer;

/* Hover State */
button-hover-background: #183754;
button-hover-color: #fffaf5;
button-transition: all 0.3s ease;
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-xs: 0px;              /* Extra small devices */
--breakpoint-small: 375px;         /* Small mobile */
--breakpoint-mobile: 480px;        /* Big mobile */
--breakpoint-tablet: 768px;        /* Tablet */
--breakpoint-desktop: 1024px;      /* Desktop */
--breakpoint-wide: 1440px;         /* Wide screens */
```

### Product Grid Columns by Breakpoint

#### Desktop (≥1024px)
```css
grid-columns: 4;
product-card-width: calc((1440px - 100px - 30px) / 4); /* ~348px */
image-card-width: calc((product-card-width × 2) + 10px); /* 704px */
gap-between-products: 10px;
container-padding: 50px;
```

#### Tablet (768px - 1023px)
```css
grid-columns: 4;
product-card-width: calc((100vw - 60px - 30px) / 4);
image-card-width: calc((product-card-width × 2) + 10px);
gap-between-products: 10px;
container-padding: 30px;
```

#### Big Mobile (480px - 767px)
```css
grid-columns: 3;
product-card-width: calc((100vw - 40px - 20px) / 3);
image-card-width: calc((product-card-width × 2) + 10px);
gap-between-products: 10px;
container-padding: 20px;
image-card-pattern: 3-3-3-3-img (after 12 products);
```

#### Small/XS Mobile (<480px)
```css
grid-columns: 2;
product-card-width: calc((100vw - 40px - 10px) / 2);
image-card-width: calc((product-card-width × 2) + 10px);
gap-between-products: 10px;
container-padding: 20px;
image-card-pattern: 2-2-2-2-2-img (after 10 products);
```

---

## 🎭 Animation Tokens

### Transitions
```css
--transition-fast: 0.2s ease;
--transition-default: 0.3s ease;
--transition-slow: 0.5s ease;
```

### Wishlist Button Animation
```css
/* Same as product detail section */
animation-duration: 250ms;
animation-scale-down: 0.85;
animation-scale-up: 1.0;
animation-timing-down: 100ms;
animation-timing-up: 150ms;
animation-easing: cubic-bezier(0.68, -0.55, 0.27, 1.55);
```

### Hover States
```css
button-hover-opacity: 0.8;
card-hover-transform: translateY(-4px);
card-hover-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
```

### AJAX Loading States
```css
loading-opacity: 0.6;
loading-cursor: wait;
loading-transition: opacity 0.3s ease;
```

---

## 🖼️ Asset Specifications

### Icons
```css
/* Filter Icon */
filter-icon: 'filter-add-1.svg';
filter-icon-size: 24px × 24px;
filter-icon-stroke: #183754;

/* Sort Icon */
sort-icon: 'sort-1.svg';
sort-icon-size: 24px × 24px;
sort-icon-stroke: #183754;

/* Wishlist Icon */
wishlist-icon: 'heart-1.svg';
wishlist-icon-size: 24px × 24px;
wishlist-icon-stroke: #183754;
wishlist-icon-stroke-width: 1.25px;
wishlist-icon-fill: none;

/* Breadcrumb Separator */
breadcrumb-separator: 'line-8.svg';
separator-height: 19px;
separator-rotation: 90deg;

/* Progress Line */
progress-line: 'line-10.svg';
progress-line-width: 110px;
```

### Images
```css
/* Product Images */
product-image-format: JPG, PNG, WebP;
product-image-min-size: 400px × 400px;
product-image-recommended-size: 800px × 800px;
product-image-aspect-ratio: 1:1 (square);

/* Hero Image */
hero-image-format: JPG, PNG, WebP;
hero-image-min-width: 1440px;
hero-image-aspect-ratio: 1440:641.703;

/* Image Card Media */
image-card-format: JPG, PNG, WebP, MP4 (video);
image-card-min-size: 704px × 500px;
image-card-recommended-size: 1408px × 1000px;
```

### Video Specifications
```css
/* Image Card Video */
video-format: MP4, WebM;
video-autoplay: true;
video-loop: true;
video-muted: true;
video-controls: false;
video-playsinline: true;
video-object-fit: cover;
```

---

## 📊 Z-Index Scale

```css
--z-index-base: 1;
--z-index-wishlist: 10;
--z-index-badge: 10;
--z-index-image-overlay: 5;
--z-index-sticky: 20;
--z-index-modal: 100;
```

**Usage:**
- Product card badges: `z-index: 10`
- Wishlist button: `z-index: 10`
- Image card overlay: `z-index: 5`
- Sticky elements: `z-index: 20`
- Modals: `z-index: 100`

---

## 🔍 Shadow Tokens

```css
--shadow-none: none;
--shadow-subtle: 0 1px 3px rgba(0, 0, 0, 0.1);
--shadow-medium: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-card-hover: 0 4px 12px rgba(0, 0, 0, 0.1);
```

**Usage:**
- Product cards: `--shadow-none` (default)
- Product cards (hover): `--shadow-card-hover`
- Buttons: `--shadow-none`

---

## 📏 Border Radius Tokens

```css
--radius-none: 0;
--radius-small: 2px;
--radius-medium: 4px;
--radius-large: 8px;
--radius-full: 100px;
```

**Usage:**
- Product cards: `--radius-none` (0)
- Buttons: `--radius-none` (0)
- Wishlist button: `--radius-full` (100px)
- Badges: `--radius-none` (0)

---

## 🎯 Focus States (Accessibility)

```css
--focus-outline-color: #183754;
--focus-outline-width: 2px;
--focus-outline-offset: 2px;
--focus-outline-style: solid;
```

**Apply to all interactive elements:**
- Product cards (clickable)
- Wishlist buttons
- Filter/Sort buttons
- Load More button
- Breadcrumb links
- Image card CTA buttons

---

## 📝 Figma Node Reference

**CRITICAL:** You MUST review these Figma nodes before development:

### Primary Nodes:
- **12-6437** - Breadcrumb + Title + Filter/Sort + Hero Image
- **12-6438** - Breadcrumb component
- **12-6444** - Title section
- **12-6446** - Filter and Sort buttons
- **12-6469** - Hero image
- **12-6470** - Product cards row (4 cards)
- **12-6471** - Single row container
- **12-6472** - Product card #1
- **12-6487** - Product card #2 (detailed view)
- **12-6568** - Image card at end (2 products + image)
- **12-6700** - Image card at start (image + 2 products)
- **12-6703** - Image card with tag overlay (video background)
- **12-6734** - Load More section
- **12-6589** - Wishlist button (filled state)

**Access via MCP:**
```javascript
mcp__figma-desktop-mcp__get_design_context({ nodeId: "12-6437" })
mcp__figma-desktop-mcp__get_screenshot({ nodeId: "12-6437" })
```

---

## 📋 Image Card Pattern Logic

### Desktop/Tablet (4 columns):
```
Batch 1 (20 products):
  Row 1: Products 1-4
  Row 2: Products 5-8
  Row 3: Products 9-10 + Image Card #1 (end)
  Row 4-5: Products 11-18
  Row 6: Image Card #2 (start) + Products 19-20

Batch 2 (21-40):
  Row 7: Products 21-24
  Row 8: Products 25-28
  Row 9: Products 29-30 + Image Card #1 (end) [repeat]
  Row 10-11: Products 31-38
  Row 12: Image Card #2 (start) + Products 39-40 [repeat]
```

### Big Mobile (3 columns):
```
Batch 1 (20 products):
  Row 1-4: Products 1-12 (3 per row)
  Row 5: Image Card #1 (takes 2 card spaces)
  Row 6-7: Products 13-18
  Row 8: Image Card #2 (takes 2 card spaces)
  Row 9: Products 19-20

Total rows with images: After every 12 products
```

### Small/XS Mobile (2 columns):
```
Batch 1 (20 products):
  Row 1-5: Products 1-10 (2 per row)
  Row 6: Image Card #1 (takes 2 card spaces)
  Row 7-10: Products 11-18
  Row 11: Image Card #2 (takes 2 card spaces)
  Row 12: Products 19-20

Total rows with images: After every 10 products
```

---

## ✅ Token Validation Checklist

Before submitting code, verify:

- [ ] All font sizes match token values exactly
- [ ] All colors use defined color tokens (no hardcoded hex)
- [ ] All spacing uses spacing scale (no arbitrary values)
- [ ] Typography uses correct font families (Neue Haas vs Neue Montreal)
- [ ] Line heights match specifications
- [ ] Product card dimensions are correct (348×500px)
- [ ] Image card takes exactly 2 product card spaces (704px)
- [ ] Gaps are correct (24px rows, 10px products)
- [ ] Container max-width is 1440px
- [ ] Background color is #f0efea
- [ ] Responsive breakpoints match specifications
- [ ] Image card pattern logic is correct for all breakpoints
- [ ] AJAX loading states are implemented
- [ ] Wishlist animation matches product detail section
- [ ] All Figma nodes have been reviewed

---

## 🔗 Cross-Reference

**Before development, READ ALL:**
- `docs/rules/00-OVERVIEW.md` - Project philosophy
- `docs/rules/02-DESIGN-EXTRACTION.md` - Figma extraction process
- `docs/rules/04-LIQUID-DEVELOPMENT.md` - Liquid best practices
- `docs/rules/05-CSS-STANDARDS.md` - CSS architecture
- `docs/rules/06-JAVASCRIPT-STANDARDS.md` - JavaScript patterns
- `docs/rules/08-NAMING-CONVENTIONS.md` - BEM naming

---

**Version:** 1.0
**Last Updated:** 2025-01-19
**Source:** Figma Design File - Diamension Dev Final
**Developer:** MUST review ALL Figma nodes and rules before coding
