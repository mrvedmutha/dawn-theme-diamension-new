# Hero Image + Five Product Carousel - Design Tokens

**Extracted from:** Figma Node `12:8831`
**Date:** 2025-12-24
**Designer:** Diamension Design Team

---

## 🎨 Colors

### Background Colors
- **Wrapper Background:** `#FFFAF5` (Warm beige - brand background)
- **Product Card Background:** `#EFE9E4` (Soft beige)
- **Hero Section:** Transparent (shows uploaded image)

### Text Colors
- **Product Title:** `#183754` (Navy blue - brand primary)
- **View Button Text:** `#000000` (Black)
- **View Button Background:** `#FFFFFF` (White)

### Interactive States
- **Card Hover:** No background change (only button appears)
- **Button Hover:** Subtle opacity or transform effect

---

## 📏 Layout & Spacing

### Section Wrapper
- **Background:** `#FFFAF5`
- **Max Width:** Full viewport width
- **Padding:** 0 (full bleed for hero, contained for products)

### Hero Image
- **Dimensions:** 1440px width × 800px height (recommended)
- **Display:** Full viewport width
- **Object Fit:** Cover (maintains aspect ratio)
- **Position:** Top of section

### Vertical Spacing
- **Hero to Product Grid Gap:** `60px`

### Product Carousel Container
- **Max Width:** `1440px`
- **Margin:** `0 auto` (centered on large screens)
- **Padding:** Responsive (see breakpoints)
- **Gap Between Cards:** `10px`

### Product Card Dimensions
- **Width:** `280px` (fixed)
- **Height (Odd Cards):** `380px` (positions 1, 3, 5)
- **Height (Even Cards):** `288px` (positions 2, 4)
- **Pattern:** Tall, Short, Tall, Short, Tall

### Product Card Internal Spacing
- **Product Title:**
  - Top: `16px`
  - Left: `24px`
  - Right: `24px`
- **View Button:**
  - Position: Bottom of card
  - Spacing: (to be determined by developer for visual balance)

---

## 🔤 Typography

### Fonts
**Primary Font Family:** Neue Haas Grotesk Display Pro
**Location:** `/assets/fonts/neue-haas-display/`

### Product Card Title
- **Font Family:** Neue Haas Grotesk Display Pro
- **Weight:** 45 Light
- **Size:** `24px` (from Figma)
- **Line Height:** `30px` (from Figma)
- **Color:** `#183754`
- **Text Transform:** None
- **Overflow:** Ellipsis (`...`) for long titles
- **Max Lines:** 1-2 lines (adjust as needed)

### View Button
- **Font Family:** Neue Haas Grotesk Display Pro
- **Weight:** 45 Light
- **Size:** `20px` (from Figma)
- **Line Height:** `30px`
- **Color:** `#000000` (Black)
- **Text Transform:** Uppercase ("VIEW")
- **Letter Spacing:** Normal

---

## 🖼️ Images

### Hero Image
- **Format:** JPG or PNG
- **Recommended Size:** 1440px × 800px
- **Max File Size:** < 500KB (optimized)
- **Aspect Ratio:** 1.8:1 (9:5)
- **Object Fit:** Cover
- **Loading:** Eager (above fold)

### Product Images
- **Source:** Shopify product featured_image
- **Display Width:** Full card width (280px)
- **Height:** Auto (maintains aspect ratio)
- **Object Fit:** Cover
- **Loading:** Lazy
- **Aspect Ratio:** Variable (adapts to product image)

---

## 🎯 Breakpoints

### Desktop
- **Min Width:** `1440px`
- **Container Max Width:** `1440px`
- **Container Padding:** `0 40px`
- **Visible Products:** 5
- **Navigation:** Hidden
- **Card Width:** `280px`
- **Gap:** `10px`

### Tablet
- **Range:** `768px - 1439px`
- **Container Max Width:** `100%`
- **Container Padding:** `0 30px`
- **Visible Products:** 4 + 1 offset
- **Navigation:** Visible (arrows)
- **Card Width:** `280px`
- **Gap:** `10px`

### Mobile Large
- **Range:** `480px - 767px`
- **Container Max Width:** `100%`
- **Container Padding:** `0 20px`
- **Visible Products:** 3 + 2 offset
- **Navigation:** Visible (arrows)
- **Card Width:** `280px`
- **Gap:** `10px`

### Mobile
- **Max Width:** `479px`
- **Container Max Width:** `100%`
- **Container Padding:** `0 15px`
- **Visible Products:** 2 + 3 offset
- **Navigation:** Visible (arrows)
- **Card Width:** `280px`
- **Gap:** `10px`

---

## 🎬 Transitions & Animations

### View Button Fade-In (Desktop)
- **Property:** `opacity`
- **Duration:** `0.3s`
- **Easing:** `ease`
- **Initial State:** `opacity: 0`
- **Hover State:** `opacity: 1`

### Card Hover Effect
- **Property:** None (only button state changes)
- **Alternative:** Subtle transform or shadow (optional)

### Carousel Scroll
- **Behavior:** `smooth`
- **Duration:** Browser default (~300-400ms)
- **Easing:** Browser default ease-out

### Arrow Icon
- **Transform:** Rotate 90deg for left, -90deg for right
- **Transition:** None (static rotation)

---

## 🔘 Interactive Elements

### Product Card
- **Clickable Area:** Entire card
- **Cursor:** `pointer`
- **Action:** Navigate to product.url
- **Desktop Hover:**
  - Show "View" button
  - Optional: Subtle shadow or transform
- **Mobile/Tablet:**
  - "View" button always visible

### View Button
- **Width:** `240px`
- **Height:** `42px`
- **Background:** `#FFFFFF` (White)
- **Border:** None (or 1px solid black - verify in Figma)
- **Text:** "VIEW" (uppercase, centered)
- **Cursor:** `pointer`
- **Visibility:**
  - Desktop: `opacity: 0` default, `opacity: 1` on card hover
  - Tablet/Mobile: Always visible (`opacity: 1`)

### Navigation Arrows
- **Source:** `/assets/custom-product-detail/icons/arrow-down.svg`
- **Size:** `40px × 24px` (from SVG viewBox)
- **Color:** `#183754` (matches icon fill)
- **Transform:**
  - Left Arrow: `rotate(90deg)`
  - Right Arrow: `rotate(-90deg)`
- **Position:** Absolute, positioned on carousel container
- **Cursor:** `pointer`
- **Disabled State:** `display: none` (hide when at boundaries)
- **Visibility:** Only on tablet and mobile (`display: none` on desktop)

---

## 📐 Grid Layout Calculation

### Desktop (5 visible products)
```
Container: 1440px max-width
Padding: 40px left + 40px right = 80px
Available width: 1440px - 80px = 1360px
Cards: 5 × 280px = 1400px
Gaps: 4 × 10px = 40px
Total needed: 1400px + 40px = 1440px
Fit: Perfect (with padding)
```

### Tablet (4 visible + 1 offset)
```
Visible cards: 4 × 280px = 1120px
Gaps: 3 × 10px = 30px
Total visible: 1150px
Offset card: Partially visible (creates scroll hint)
```

### Mobile Large (3 visible + 2 offset)
```
Visible cards: 3 × 280px = 840px
Gaps: 2 × 10px = 20px
Total visible: 860px
Offset cards: 2 cards hidden (scroll to reveal)
```

### Mobile (2 visible + 3 offset)
```
Visible cards: 2 × 280px = 560px
Gaps: 1 × 10px = 10px
Total visible: 570px
Offset cards: 3 cards hidden (scroll to reveal)
```

---

## 🎨 Component States

### Product Card States
1. **Default:**
   - Background: `#EFE9E4`
   - Title visible
   - Image visible
   - Button: Hidden (desktop) / Visible (mobile/tablet)

2. **Hover (Desktop only):**
   - Background: `#EFE9E4` (no change)
   - Title visible
   - Image visible
   - Button: Visible (fade in)

3. **Active/Click:**
   - Navigate to product page
   - No special styling needed

### Navigation Arrow States
1. **Default (Visible):**
   - Opacity: `1`
   - Display: `block`
   - Cursor: `pointer`

2. **Disabled (At Boundary):**
   - Display: `none`

3. **Hover:**
   - Optional: Opacity `0.7` or transform

---

## 🔧 Technical Specs

### CSS Variables (Recommended)
```css
:root {
  /* Colors */
  --color-wrapper-bg: #FFFAF5;
  --color-card-bg: #EFE9E4;
  --color-text-primary: #183754;
  --color-button-bg: #FFFFFF;
  --color-button-text: #000000;

  /* Spacing */
  --gap-hero-to-products: 60px;
  --gap-product-cards: 10px;
  --card-title-top: 16px;
  --card-title-left: 24px;

  /* Dimensions */
  --container-max-width: 1440px;
  --hero-height: 800px;
  --card-width: 280px;
  --card-height-tall: 380px;
  --card-height-short: 288px;

  /* Typography */
  --font-family-primary: 'Neue Haas Grotesk Display Pro', sans-serif;
  --font-size-card-title: 24px;
  --font-size-button: 20px;

  /* Transitions */
  --transition-button: opacity 0.3s ease;
}
```

---

## ✅ Design Token Checklist

Before development, verify all tokens are documented:

- [x] All colors defined (backgrounds, text, buttons)
- [x] All spacing values documented (gaps, padding, margins)
- [x] Typography specs complete (font, size, weight, color)
- [x] Breakpoints defined (desktop, tablet, mobile large, mobile)
- [x] Transition/animation specs provided
- [x] Interactive states documented (hover, active, disabled)
- [x] Grid layout calculations verified
- [x] Asset requirements listed (images, icons, fonts)

---

## 🔗 Figma Reference Nodes

For exact measurements, always refer back to Figma:
- **Main Section:** Node `12:8831`
- **Product Cards:** Nodes `12:8964` to `12:8980`
- **Typography:** Extract from Figma text layers
- **Spacing:** Use Figma's spacing measurements

---

**Next Step:** Read `implementation.md` for step-by-step development guide.
