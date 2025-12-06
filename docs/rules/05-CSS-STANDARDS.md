# CSS Standards

**BEM methodology, desktop-first responsive design, separate CSS files.**

---

## File Organization

**ALWAYS create separate CSS files:**
```
assets/section-[name].css
assets/snippet-[name].css
```

**Link in Liquid:**
```liquid
{{ 'section-[name].css' | asset_url | stylesheet_tag }}
```

**Exception:** Only write CSS in `<style>` tags if absolutely no other way exists.

---

## BEM Methodology

**Block Element Modifier**

### Structure
```css
/* Block */
.product-card { }

/* Element */
.product-card__image { }
.product-card__title { }
.product-card__price { }
.product-card__button { }

/* Modifier */
.product-card--featured { }
.product-card--sale { }
.product-card__button--primary { }
.product-card__button--secondary { }
```

### Example
```html
<div class="product-card product-card--featured">
  <img class="product-card__image" src="..." alt="...">
  <h3 class="product-card__title">Product Name</h3>
  <p class="product-card__price">$99.99</p>
  <button class="product-card__button product-card__button--primary">Add to Cart</button>
</div>
```

```css
.product-card {
  border: 1px solid #ddd;
  padding: 20px;
}

.product-card--featured {
  border-color: #000;
  background: #f9f9f9;
}

.product-card__image {
  width: 100%;
  height: auto;
}

.product-card__title {
  font-size: 1.5rem;
  margin: 10px 0;
}

.product-card__price {
  font-size: 1.25rem;
  color: #333;
}

.product-card__button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.product-card__button--primary {
  background: #000;
  color: #fff;
}

.product-card__button--secondary {
  background: #fff;
  color: #000;
  border: 1px solid #000;
}
```

---

## Breakpoints & Responsive Design

### Base Styles (1440px Desktop)
```css
/* Write core CSS for 1440px Desktop first */
.custom-section-hero {
  max-width: 1440px;
  margin: 0 auto;
  padding: 80px 40px;
  font-size: 16px;
}
```

### Breakpoint Structure
```css
/* 1. Large Desktop - Contain, don't stretch beyond 1440px */
@media (min-width: 1441px) {
  .custom-section-hero {
    max-width: 1440px;
    margin: 0 auto; /* Center content */
  }
}

/* 2. Tablet - Adjust layout from base */
@media (max-width: 1024px) {
  .custom-section-hero {
    padding: 60px 30px;
    font-size: 15px;
  }
}

/* 3. Mobile - Mobile layout */
@media (max-width: 767px) {
  .custom-section-hero {
    padding: 40px 20px;
    font-size: 14px;
  }
}

/* 4. Small Mobile - Fine-tune for small screens */
@media (max-width: 375px) {
  .custom-section-hero {
    padding: 30px 15px;
  }
}
```

### Standard Breakpoints
- **Large Desktop:** `min-width: 1441px` - Center content, don't stretch
- **Desktop:** `1440px` - Base styles
- **Tablet:** `max-width: 1024px` - Layout adjustments
- **Mobile:** `max-width: 767px` - Mobile layout
- **Small Mobile:** `max-width: 375px` - Fine-tuning

---

## Core Theme Protection

### NEVER Modify Core Classes Directly
```css
/* ✗ BAD - Modifying core Dawn class */
.page-width {
  max-width: 1440px;
}

/* ✓ GOOD - Namespaced override */
.custom-section-header .page-width {
  max-width: 1440px;
}
```

### Namespace Custom Sections
```css
/* Always prefix with custom-section- or custom-snippet- */
.custom-section-header { }
.custom-snippet-product-card { }
```

---

## CSS Best Practices

### Keep Specificity Low
```css
/* ✓ GOOD - Low specificity */
.product-card__title {
  font-size: 1.5rem;
}

/* ✗ BAD - High specificity */
div.product-card div.product-card__content h3.product-card__title {
  font-size: 1.5rem;
}
```

### Avoid !important
```css
/* ✓ GOOD - Proper specificity */
.custom-section-header .page-width {
  max-width: 1440px;
}

/* ✗ BAD - Using !important */
.page-width {
  max-width: 1440px !important;
}
```

**Only use `!important` when absolutely necessary (e.g., overriding inline styles).**

### Group Related Styles
```css
/* Layout */
.custom-section-header {
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px;
}

/* Typography */
.custom-section-header__title {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
}

/* Colors */
.custom-section-header__title {
  color: #000;
}

/* Spacing */
.custom-section-header__content {
  margin-bottom: 20px;
}
```

### Use CSS Variables (if applicable)
```css
:root {
  --color-primary: #000000;
  --color-secondary: #FFFFFF;
  --spacing-base: 20px;
  --font-heading: 'Neue Haas Display', sans-serif;
}

.custom-section-header {
  background-color: var(--color-primary);
  padding: var(--spacing-base);
  font-family: var(--font-heading);
}
```

---

## Common Patterns

### Container/Wrapper
```css
.custom-section-[name] {
  max-width: 1440px;
  margin: 0 auto;
  padding: 80px 40px;
}

@media (max-width: 1024px) {
  .custom-section-[name] {
    padding: 60px 30px;
  }
}

@media (max-width: 767px) {
  .custom-section-[name] {
    padding: 40px 20px;
  }
}
```

### Grid Layout
```css
.custom-section-products__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .custom-section-products__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 767px) {
  .custom-section-products__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 375px) {
  .custom-section-products__grid {
    grid-template-columns: 1fr;
  }
}
```

### Flexbox Layout
```css
.custom-section-header__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

@media (max-width: 767px) {
  .custom-section-header__content {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

### Button Styles
```css
.custom-section-hero__button {
  padding: 12px 24px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.custom-section-hero__button:hover {
  background: #333;
}

.custom-section-hero__button:active {
  background: #000;
}
```

### Image Responsive
```css
.product-card__image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
```

---

## Typography

### Font Sizes
```css
/* Use rem for scalability */
.custom-section-header__title {
  font-size: 3rem; /* 48px */
}

.custom-section-header__subtitle {
  font-size: 1.5rem; /* 24px */
}

.custom-section-header__body {
  font-size: 1rem; /* 16px */
}

@media (max-width: 767px) {
  .custom-section-header__title {
    font-size: 2rem; /* 32px */
  }

  .custom-section-header__subtitle {
    font-size: 1.25rem; /* 20px */
  }
}
```

### Line Heights
```css
.custom-section-header__title {
  line-height: 1.2; /* Tight for headings */
}

.custom-section-header__body {
  line-height: 1.6; /* Comfortable for body text */
}
```

### Font Weights
```css
.custom-section-header__title {
  font-weight: 700; /* Bold */
}

.custom-section-header__body {
  font-weight: 400; /* Regular */
}
```

---

## Spacing

### Consistent Spacing Scale
```css
/* Base spacing: 4px */
--spacing-xs: 8px;   /* 2 * 4 */
--spacing-sm: 16px;  /* 4 * 4 */
--spacing-md: 24px;  /* 6 * 4 */
--spacing-lg: 40px;  /* 10 * 4 */
--spacing-xl: 80px;  /* 20 * 4 */
```

### Margin & Padding
```css
.custom-section-hero {
  padding: 80px 40px; /* Top/Bottom, Left/Right */
  margin-bottom: 40px;
}

@media (max-width: 767px) {
  .custom-section-hero {
    padding: 40px 20px;
    margin-bottom: 20px;
  }
}
```

---

## Colors

### Use Hex Codes
```css
.custom-section-header {
  background-color: #000000;
  color: #FFFFFF;
}
```

### Transparency (rgba)
```css
.custom-section-hero__overlay {
  background-color: rgba(0, 0, 0, 0.5); /* Black with 50% opacity */
}
```

---

## Transitions & Animations

### Hover Transitions
```css
.custom-section-hero__button {
  transition: background 0.3s ease, transform 0.2s ease;
}

.custom-section-hero__button:hover {
  background: #333;
  transform: translateY(-2px);
}
```

### Smooth Animations
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.custom-section-hero {
  animation: fadeIn 0.5s ease-in-out;
}
```

---

## Performance

### Minimize Reflows
```css
/* ✓ GOOD - Transform instead of top/left */
.custom-section-hero__button:hover {
  transform: translateY(-2px);
}

/* ✗ BAD - Triggers reflow */
.custom-section-hero__button:hover {
  top: -2px;
}
```

### Use will-change (sparingly)
```css
.custom-section-hero__image {
  will-change: transform;
}
```

---

## Checklist

- [ ] Separate CSS file created
- [ ] BEM methodology used
- [ ] Desktop-first (1440px base)
- [ ] All breakpoints tested (1441px+, 1024px, 767px, 375px)
- [ ] No core theme files modified
- [ ] Low specificity maintained
- [ ] No !important (unless necessary)
- [ ] Consistent spacing/typography
- [ ] Smooth transitions
- [ ] Clean, readable code
