# Naming Conventions

**Consistent file naming across Liquid, CSS, JavaScript, and tests.**

---

## Liquid Files

### Sections
```
sections/custom-section-[name].liquid
```

**Examples:**
- `custom-section-header.liquid`
- `custom-section-hero.liquid`
- `custom-section-product-grid.liquid`

### Snippets
```
snippets/custom-snippet-[name].liquid
```

**Examples:**
- `custom-snippet-product-card.liquid`
- `custom-snippet-testimonial.liquid`
- `custom-snippet-newsletter.liquid`

### Blocks
```
blocks/custom-block-[name].liquid
```

**Examples:**
- `custom-block-feature.liquid`
- `custom-block-image-text.liquid`

---

## CSS Files

### Format
```
assets/[type]-[name].css
```

**Examples:**
- `assets/section-header.css`
- `assets/section-hero.css`
- `assets/snippet-product-card.css`
- `assets/block-feature.css`

---

## JavaScript Files

### Format
```
assets/[type]-[name].js
```

**Examples:**
- `assets/section-header.js`
- `assets/section-hero.js`
- `assets/snippet-product-card.js`
- `assets/utils.js` (shared utilities)

---

## Test Files

### Playwright Tests
```
tests/liquid/[type]-[name]/[name].spec.js
```

**Examples:**
- `tests/liquid/section-header/header.spec.js`
- `tests/liquid/section-product-grid/product-grid.spec.js`
- `tests/liquid/snippet-product-card/product-card.spec.js`

### Vitest Tests (if needed)
```
tests/unit/[name].test.js
```

**Examples:**
- `tests/unit/utils.test.js`
- `tests/unit/calculator.test.js`

---

## BEM Class Names

### Format
```css
.custom-[type]-[name]                    /* Block */
.custom-[type]-[name]__[element]         /* Element */
.custom-[type]-[name]--[modifier]        /* Modifier */
.custom-[type]-[name]__[element]--[modifier]  /* Element + Modifier */
```

**Examples:**
```css
.custom-section-header
.custom-section-header__logo
.custom-section-header__nav
.custom-section-header__nav-item
.custom-section-header--sticky
.custom-section-header__nav-item--active

.custom-snippet-product-card
.custom-snippet-product-card__image
.custom-snippet-product-card__title
.custom-snippet-product-card__price
.custom-snippet-product-card--featured
.custom-snippet-product-card__price--sale
```

---

## Design Files

### Figma Exports
```
prototype/[section-name]/design/figma-[viewport].png
prototype/[section-name]/design/design-tokens.md
```

**Examples:**
- `prototype/header/design/figma-desktop.png`
- `prototype/header/design/figma-tablet.png`
- `prototype/header/design/figma-mobile.png`
- `prototype/header/design/design-tokens.md`

---

## Asset Files

### Global Assets
```
prototype/assets/[category]/[asset-name].[ext]
```

**Examples:**
- `prototype/assets/fonts/NeueHaasDisplay-Regular.woff2`
- `prototype/assets/icons/icon-cart.svg`
- `prototype/assets/images/logo.svg`

### Section Assets
```
prototype/[section-name]/assets/[category]/[asset-name].[ext]
```

**Examples:**
- `prototype/header/assets/images/hero-bg.jpg`
- `prototype/header/assets/icons/menu-icon.svg`
- `prototype/product-card/assets/images/placeholder.png`

---

## Variables & Functions (JavaScript)

### Variables
```javascript
// camelCase
const productPrice = 1999;
const cartItemCount = 5;
const isMenuOpen = false;

// UPPERCASE for constants
const MAX_CART_ITEMS = 10;
const API_ENDPOINT = '/cart.js';
```

### Functions
```javascript
// camelCase, verb-first
const toggleMenu = () => {};
const fetchProduct = async (id) => {};
const calculateDiscount = (original, sale) => {};
const formatPrice = (cents) => {};
```

### Classes (if using)
```javascript
// PascalCase
class ProductCard {}
class CartManager {}
```

---

## Schema IDs (Liquid)

### Format
```
snake_case
```

**Examples:**
```json
{
  "id": "background_image",
  "id": "heading_text",
  "id": "show_arrows",
  "id": "products_to_show",
  "id": "cta_button_text"
}
```

---

## Git Branches (if using)

### Format
```
[type]/[description]
```

**Examples:**
- `feature/custom-header-section`
- `fix/mobile-menu-overflow`
- `refactor/css-structure`
- `test/header-visual-regression`

---

## Git Commit Messages

### Format
```
[Type] Description
```

**Types:**
- `[Feature]` - New section/snippet/functionality
- `[Fix]` - Bug fixes
- `[Style]` - CSS/design changes
- `[Refactor]` - Code restructuring
- `[Test]` - Adding/updating tests
- `[Docs]` - Documentation updates
- `[Setup]` - Project setup/config

**Examples:**
- `[Feature] Add custom header section with mobile menu`
- `[Fix] Resolve mobile menu overflow issue`
- `[Style] Update product card spacing and colors`
- `[Refactor] Reorganize CSS into BEM structure`
- `[Test] Add visual regression tests for header`

---

## Quick Reference

| Type | Pattern | Example |
|------|---------|---------|
| Section (Liquid) | `custom-section-[name].liquid` | `custom-section-header.liquid` |
| Snippet (Liquid) | `custom-snippet-[name].liquid` | `custom-snippet-product-card.liquid` |
| CSS | `[type]-[name].css` | `section-header.css` |
| JavaScript | `[type]-[name].js` | `section-header.js` |
| Test (Playwright) | `[name].spec.js` | `header.spec.js` |
| Test (Vitest) | `[name].test.js` | `utils.test.js` |
| BEM Block | `.custom-[type]-[name]` | `.custom-section-header` |
| BEM Element | `.[block]__[element]` | `.custom-section-header__logo` |
| BEM Modifier | `.[block]--[modifier]` | `.custom-section-header--sticky` |
| JS Variable | `camelCase` | `productPrice` |
| JS Constant | `UPPERCASE` | `MAX_CART_ITEMS` |
| JS Function | `verbCamelCase` | `toggleMenu` |
| Schema ID | `snake_case` | `background_image` |
| Git Commit | `[Type] Description` | `[Feature] Add header` |
