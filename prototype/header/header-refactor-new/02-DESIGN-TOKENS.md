# Header Refactor - Design Tokens

**Version:** 1.0.0
**Last Updated:** 2026-01-13

---

## Color Palette

### Background Colors
```css
--bg-cream: #FFFAF5;        /* Main background */
--bg-white: #FFFFFF;        /* Card backgrounds */
```

### Text Colors
```css
--text-dark: #183754;       /* Primary text (dark blue) */
--text-medium: #3E6282;     /* Secondary text (medium blue) */
--text-light: #FFFAF5;      /* Light text (cream) */
```

### Border Colors
```css
--border-light: rgba(255, 250, 245, 0.5);  /* Light border (transparent mode) */
--border-dark: #183754;                    /* Dark border (solid mode) */
```

---

## Typography

### Font Families
```css
--font-primary: 'Neue Montreal', sans-serif;            /* Navigation items */
--font-secondary: 'Neue Haas Grotesk Display Pro', sans-serif;  /* Headings, labels */
```

### Font Sizes

**Desktop Navigation:**
```css
--nav-desktop: 12px;        /* Desktop menu links */
--nav-mobile-main: 12px;    /* Mobile Level 1 items */
--nav-mobile-sub: 14px;     /* Mobile Level 2/3 items */
--login-text: 16px;         /* LOGIN/SIGNUP */
```

**Featured Cards:**
```css
--card-heading: 14px;       /* Card headings */
```

### Font Weights
```css
--weight-regular: 400;
--weight-bold: 700;
```

### Text Transform
```css
text-transform: uppercase;  /* All navigation text */
```

---

## Spacing

### Container Padding
```css
--padding-desktop: 40px;    /* Desktop horizontal padding */
--padding-tablet: 30px;     /* Tablet horizontal padding */
--padding-mobile: 20px;     /* Mobile horizontal padding */
```

### Mobile Drawer Spacing
```css
--drawer-padding-top: 103.31px;     /* From design */
--drawer-padding-horizontal: 20.96px;  /* From design */
--item-height: 46px;                /* Menu item height */
--item-padding-vertical: 14.5px;    /* Vertical padding in items */
```

### Featured Card Grid
```css
--card-gap: 14px;           /* Gap between cards */
--card-grid-columns: 2;     /* 2x2 grid */
```

---

## Layout Dimensions

### Mobile Drawer
```css
--drawer-width: 100vw;      /* Full screen width */
--drawer-max-height: 100vh; /* Full viewport height */
--close-button-top: 47.65px;
--close-button-right: 22.4px;
```

### Desktop Mega Menu
```css
--mega-menu-max-width: 1440px;      /* Max container width */
--mega-menu-padding: 40px;          /* Internal padding */
--column-gap: 24px;                 /* Gap between columns */
```

---

## Icons & SVG

### Chevron Down (Accordion Indicator)
```liquid
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="..." stroke="currentColor" stroke-width="2"/>
</svg>
```

**Specs:**
- Size: 24x24px
- Stroke: currentColor
- Position: Right-aligned in menu item

### Chevron Left (Back Button)
```liquid
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="..." stroke="currentColor" stroke-width="2"/>
</svg>
```

**Specs:**
- Size: 24x24px (rotated -90deg from down chevron)
- Stroke: currentColor
- Position: Left-aligned in header

### Close Button (X)
```liquid
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M18 6L6 18" stroke="#183754" stroke-width="2"/>
  <path d="M6 6L18 18" stroke="#183754" stroke-width="2"/>
</svg>
```

**Specs:**
- Size: 24x24px
- Stroke: #183754 (dark blue)
- Position: Top-right corner

---

## Breakpoints

### Standard Breakpoints
```css
/* Large Desktop - Center content */
@media (min-width: 1441px) {
  max-width: 1440px;
  margin: 0 auto;
}

/* Desktop - Base styles */
/* 1440px - default */

/* Tablet - Layout adjustments */
@media (max-width: 1024px) {
  /* Tablet-specific styles */
}

/* Mobile - Mobile layout */
@media (max-width: 767px) {
  /* Show mobile drawer instead of desktop mega menu */
}

/* Small Mobile - Fine-tuning */
@media (max-width: 375px) {
  /* Compact mobile adjustments */
}
```

---

## Animation Timings

### Mobile Drawer Animations

**Initial Open:**
```javascript
duration: 0.4,              // 400ms
ease: 'power2.out'
```

**Accordion Expand:**
```javascript
// Current level out
duration: 0.3,              // 300ms
ease: 'power2.in'

// New level in
duration: 0.4,              // 400ms
ease: 'power2.out',
delay: 0.1                  // 100ms delay
```

**Back Button:**
```javascript
// Current level fade
duration: 0.2,              // 200ms
ease: 'power2.in'

// Previous level appear
duration: 0.3,              // 300ms
ease: 'power2.out',
delay: 0.1                  // 100ms delay
```

### Desktop Mega Menu (Existing)
```javascript
// Column/card stagger
duration: 0.4,
ease: 'power2.out',
stagger: 0.05               // 50ms between items

// Hide animation
duration: 0.2,
ease: 'power2.in'
```

---

## Mobile Navigation Levels

### Level 1 - Main Menu

**Background:** `#FFFAF5`

**Menu Items:**
```
Font: Neue Montreal Regular
Size: 12px
Color: #183754
Height: 46px
Padding: 14.5px vertical
Border: 1px solid divider
Transform: uppercase
```

**Featured Cards:**
```
Layout: 2x2 grid
Gap: 14px
Image: Product/collection image
Heading Font: Neue Haas Grotesk Display Pro
Heading Size: 14px
Heading Color: #3E6282
Transform: uppercase
```

**LOGIN/SIGNUP:**
```
Font: Neue Haas Grotesk Display Pro
Size: 16px
Color: #183754
Position: Fixed bottom
Transform: uppercase
```

### Level 2 - Submenu

**Header:**
```
Back Arrow: ◀ (chevron left)
Menu Name: e.g., "SHOP"
Font: Neue Haas Grotesk Display Pro
Size: 14px
Color: #3E6282
Transform: uppercase
```

**Accordion Items:**
```
Font: Neue Haas Grotesk Display Pro
Size: 14px
Color: #3E6282
Height: 46px
Chevron: Down ▼ (right-aligned)
Transform: uppercase
```

### Level 3 - Terminal Links

**Header:**
```
Back Arrow: ◀ (chevron left)
Category Name: e.g., "CATEGORIES"
Font: Neue Haas Grotesk Display Pro
Size: 14px
Color: #3E6282
Transform: uppercase
```

**Links:**
```
Font: Neue Haas Grotesk Display Pro
Size: 14px
Color: #183754
Height: 46px
No chevron (terminal links)
```

---

## Desktop Mega Menu Layouts

### Layout 1: Columns + Cards (Node 526:84)

**Structure:**
```
┌─────────────────────────────────────┐
│  Column 1   Column 2   │  Card 1   │
│                        │  Card 2   │
│  Column 3   Column 4   │           │
└─────────────────────────────────────┘
```

**Specs:**
- Columns: Left side, multi-column grid
- Cards: Right side, featured cards
- Gap: 24px between columns
- Container: max-width 1440px, centered

### Layout 2: Centered Cards Only (Node 528:191)

**Structure:**
```
┌─────────────────────────────────────┐
│       Card 1    Card 2    Card 3    │
│                                     │
│       Card 4    Card 5    Card 6    │
└─────────────────────────────────────┘
```

**Specs:**
- Cards: Centered grid
- Gap: 24px between cards
- Container: max-width 1440px, centered

### Layout 3: Columns Only (Left-aligned)

**Structure:**
```
┌─────────────────────────────────────┐
│  Column 1   Column 2   Column 3     │
│                                     │
│  Column 4   Column 5   Column 6     │
└─────────────────────────────────────┘
```

**Specs:**
- Columns: Left-aligned grid
- Gap: 24px between columns
- Container: max-width 1440px

---

## Z-Index Layers

```css
--z-drawer: 999;            /* Mobile drawer */
--z-mega-menu: 998;         /* Desktop mega menu */
--z-header: 997;            /* Main header */
--z-backdrop: 996;          /* Modal backdrops */
```

---

## State Classes

### Mobile Drawer States
```css
.is-open                    /* Drawer is visible */
.is-level-1                 /* Showing Level 1 (main menu) */
.is-level-2                 /* Showing Level 2 (submenu) */
.is-level-3                 /* Showing Level 3 (links) */
```

### Mega Menu States
```css
.is-active                  /* Mega menu is visible */
```

### Menu Item States
```css
.is-active                  /* Current/active page */
.has-submenu                /* Item has submenu/mega menu */
```

---

## Accessibility

### ARIA Attributes

**Accordion Buttons:**
```html
<button aria-expanded="false" aria-label="Expand SHOP menu">
  SHOP
  <svg aria-hidden="true">...</svg>
</button>
```

**Back Buttons:**
```html
<button aria-label="Back to main menu">
  <svg aria-hidden="true">...</svg>
  SHOP
</button>
```

**Close Button:**
```html
<button aria-label="Close navigation menu">
  <svg aria-hidden="true">...</svg>
</button>
```

---

## Quick Reference

| Element | Font | Size | Color | Transform |
|---------|------|------|-------|-----------|
| Desktop Nav Link | Neue Montreal | 12px | #FFFAF5 (transparent) / #183754 (solid) | uppercase |
| Mobile L1 Item | Neue Montreal | 12px | #183754 | uppercase |
| Mobile L2/L3 Item | Neue Haas Display | 14px | #3E6282 / #183754 | uppercase |
| Featured Card Heading | Neue Haas Display | 14px | #3E6282 | uppercase |
| LOGIN/SIGNUP | Neue Haas Display | 16px | #183754 | uppercase |

---

## Next Steps

After reviewing design tokens, read:
- **03-IMPLEMENTATION.md** - Technical implementation guide
