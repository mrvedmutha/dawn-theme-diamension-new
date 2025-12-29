# Glamor Collection - Design Tokens

**Figma Node:** 251:90
**Extracted:** 2025-12-29
**Base Design:** 1440px Desktop

---

## Wrapper Dimensions

### Desktop (1440px+)
```css
width: 100vw;
height: 1528px; /* Fixed height */
position: relative;
```

### Tablet & Mobile (< 1024px)
```css
width: 100vw;
height: 100vh; /* Viewport height */
position: relative;
```

---

## Colors

### Background
- **Lifestyle Background Tint:** `#beb6a9` (warm taupe/gray)
- **Note:** Actual background is an image, this color may show through or as fallback

### Text Colors
- **Headline (Glamour):** `#fffaf5` (warm white/cream)
- **Subtitle:** `#fffaf5` (warm white/cream)
- **Product Card Text:** `#fffaf5` (warm white/cream)

### Overlays
- **Product Card Overlay:** `rgba(27, 27, 27, 0.19)` (semi-transparent dark overlay)
  - Red: 27
  - Green: 27
  - Blue: 27
  - Alpha: 0.19 (19% opacity)

---

## Typography

### Headline ("Glamour")
```css
font-family: 'Bickham Script Pro', serif;
font-weight: 400; /* Regular */
font-style: normal;
font-size: 160px;
line-height: 45px; /* Tight, script font */
color: #fffaf5;
text-align: left;
```

**Positioning (from Figma):**
```css
position: absolute;
left: calc(50% - 629.6px); /* 810.4px from left edge of 1440px */
top: calc(50% - 584.84px); /* ~178px from top of 1528px wrapper */
width: 372px;
height: 71.872px;
```

### Subtitle ("is a condition, not a commodity.")
```css
font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
font-weight: 300; /* 45 Light */
font-style: normal;
font-size: 30px;
line-height: 45px;
color: #fffaf5;
text-align: left;
```

**Positioning (from Figma):**
```css
position: absolute;
left: calc(50% - 596.4px); /* ~123.6px from left edge */
top: calc(50% - 507.14px); /* ~256.86px from top */
width: 506.799px;
```

### Product Card - Product Name
```css
font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
font-weight: 300; /* 45 Light */
font-style: normal;
font-size: 24px;
line-height: 30px;
color: #fffaf5;
text-align: center;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```

**Character Limit:** 25-30 characters (recommendation)

### Product Card - CTA Link ("View")
```css
font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
font-weight: 400; /* 55 Roman */
font-style: normal;
font-size: 20px;
line-height: 40px;
color: #fffaf5;
text-align: center;
text-decoration: underline;
text-decoration-style: solid;
text-underline-offset: 25%;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```

**Character Limit:** 15-20 characters (recommendation)

---

## Product Card Specifications

### Card Overlay Styling
```css
background-color: rgba(27, 27, 27, 0.19);
overflow: clip; /* or hidden */
```

### Product Image
```css
object-fit: cover;
object-position: 50% 50%;
width: 100%;
height: 100%;
aspect-ratio: 1 / 1; /* Square */
```

---

## Product Card Positions (Desktop - Absolute Layout)

**Note:** These positions are extracted from Figma node 251:90. Cards should be absolutely positioned on desktop.

### Card 1 (Top Right - "Mack Ring")
```css
position: absolute;
left: 975.11px;
top: 606.5px;
width: 269px;
height: 314px;
```

**Product Name Position (within card):**
```css
position: absolute;
left: calc(50% - 64.3px); /* Center with offset */
top: calc(50% - 135.96px); /* Near top */
transform: translateX(-50%);
```

**CTA Position (within card):**
```css
position: absolute;
left: calc(50% - 115.3px); /* Center with offset */
top: calc(50% + 102.41px); /* Near bottom */
```

### Card 2 (Bottom Left - "Multi Ring")
```css
position: absolute;
left: 377px;
top: 1205.57px;
width: 340px;
height: 265px;
```

**Product Name Position (within card):**
```css
position: absolute;
left: calc(50% - 105.37px);
top: calc(50% - 113.29px);
transform: translateX(-50%);
```

**CTA Position (within card):**
```css
position: absolute;
left: calc(50% - 152.37px);
top: calc(50% + 87.29px);
```

### Card 3 (Bottom Right - "Multi Ring")
```css
position: absolute;
left: 1047.88px;
top: 1167px;
width: 275px;
height: 288px;
```

**Product Name Position (within card):**
```css
position: absolute;
left: calc(50% - 75.77px);
top: calc(50% - 124.39px);
transform: translateX(-50%);
```

**CTA Position (within card):**
```css
position: absolute;
left: calc(50% - 117.77px);
top: calc(50% + 91.19px);
```

### Card 4 (Center Bottom - "Multi Ring")
```css
position: absolute;
left: 780px;
top: 1027px;
width: 214px;
height: 212px;
```

**Product Name Position (within card):**
```css
position: absolute;
left: calc(50% - 47px);
top: calc(50% - 91.69px);
transform: translateX(-50%);
```

**CTA Position (within card):**
```css
position: absolute;
left: calc(50% - 94px);
top: calc(50% + 52.57px);
```

---

## Responsive Grid Layout (Tablet & Mobile)

### Tablet (768px - 1024px)

**Product Cards Container:**
```css
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 16px; /* Adjust as needed */
position: absolute;
bottom: 0; /* Positioned at bottom of wrapper */
left: 0;
right: 0;
padding: 20px; /* Inner padding */
```

**Product Card:**
```css
aspect-ratio: 1 / 1; /* Square */
width: 100%;
background-color: rgba(27, 27, 27, 0.19);
```

### Mobile (< 768px)

**Product Cards Container:**
```css
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 12px; /* Adjust as needed */
position: absolute;
bottom: 0;
left: 0;
right: 0;
padding: 16px;
```

**Product Card:**
```css
aspect-ratio: 1 / 1; /* Square */
width: 100%;
background-color: rgba(27, 27, 27, 0.19);
```

---

## Breakpoints

### Exact Breakpoints (User Specified)
```css
/* 1. Desktop Large */
@media (min-width: 1440px) {
  /* Maintain 1440px max-width, center content */
}

/* 2. Desktop Medium */
@media (min-width: 1250px) and (max-width: 1439px) {
  /* Adjust absolute positions proportionally */
}

/* 3. Desktop Small */
@media (min-width: 1025px) and (max-width: 1249px) {
  /* Continue adjusting positions */
}

/* 4. Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
  /* Switch to 4-column grid */
  /* Height becomes 100vh */
}

/* 5. Mobile Large */
@media (min-width: 576px) and (max-width: 767px) {
  /* 2-column grid */
  /* Height is 100vh */
}

/* 6. Mobile Small */
@media (max-width: 575px) {
  /* 2-column grid */
  /* Smaller padding/gaps */
}
```

---

## Spacing & Positioning

### Desktop Headline Spacing
- **Headline to Subtitle vertical gap:** ~78px (507.14 - 584.84 + 71.872)
- **Headline from left edge:** ~810px
- **Headline from top:** ~178px

### Product Card Internal Spacing

**General Pattern:**
- Product name: Positioned in upper third of card
- Product image: Fills card with object-fit: cover
- CTA: Positioned in lower third of card
- All text is centered horizontally within card

---

## Image Specifications

### Background Image
- **Format:** JPG/PNG (optimized for web)
- **Desktop dimensions:** 1440×1528px minimum
- **Tablet dimensions:** 1024×768px minimum (100vh adaptive)
- **Mobile dimensions:** 375×667px minimum (100vh adaptive)
- **Object-fit:** cover
- **Object-position:** center center (50% 50%)

### Product Card Images
- **Format:** PNG/JPG
- **Aspect ratio:** 1:1 (square) **REQUIRED**
- **Recommended dimensions:** 600×600px minimum
- **Retina:** 1200×1200px for high-DPI displays
- **Object-fit:** cover
- **Object-position:** center center (50% 50%)

---

## Z-Index Hierarchy

```css
/* Background image */
z-index: 0;

/* Headline & subtitle */
z-index: 10;

/* Product cards */
z-index: 5;

/* Product card content (name, CTA) */
z-index: 15; /* Above card overlay */
```

---

## Animation Tokens (Desktop Only - GSAP)

### Headline Animation
```javascript
{
  opacity: 0 → 1,
  y: 20 → 0,
  duration: 0.6,
  ease: "power2.out",
  delay: 0.1
}
```

### Product Cards Animation
```javascript
{
  opacity: 0 → 1,
  y: 30 → 0,
  duration: 0.5,
  ease: "power2.out",
  stagger: 0.15, // Between each card
  delay: 0.3 // After headline
}
```

### ScrollTrigger Settings
```javascript
{
  trigger: ".custom-section-glamor-collection",
  start: "top 80%", // When section is 80% from top of viewport
  toggleActions: "play none none none", // Play once on enter
  once: true // Don't repeat on scroll back
}
```

---

## Transitions & Effects

### Hover Effects (Desktop)

**CTA Link Hover:**
```css
transition: opacity 0.3s ease;

&:hover {
  opacity: 0.7;
}
```

**Product Card Hover (Optional):**
```css
transition: transform 0.3s ease;

&:hover {
  transform: scale(1.02);
}
```

---

## Accessibility Considerations

### Image Alt Text
- Background image: Descriptive alt text from merchant input
- Product images: Product name as alt text minimum

### Keyboard Navigation
- CTA links must be keyboard accessible
- Focus states should be visible

### Screen Readers
- Headline hierarchy: H2 for "Glamour"
- Product names: H3 or span with appropriate ARIA
- CTA links: Descriptive link text or aria-label

---

## Font Loading

### Required Font Files

**Bickham Script Pro:**
- Weight: 400 (Regular)
- Format: WOFF2, WOFF
- Fallback: serif

**Neue Haas Grotesk Display Pro:**
- Weights: 300 (45 Light), 400 (55 Roman)
- Format: WOFF2, WOFF
- Fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Font Display Strategy
```css
@font-face {
  font-family: 'Bickham Script Pro';
  font-weight: 400;
  font-display: swap; /* Show fallback until custom font loads */
  src: url(...) format('woff2');
}

@font-face {
  font-family: 'Neue Haas Grotesk Display Pro';
  font-weight: 300;
  font-display: swap;
  src: url(...) format('woff2');
}
```

---

## Performance Considerations

### Image Optimization
- Background image: Compressed, progressive JPEG
- Product images: Optimized PNGs or WebP with PNG fallback
- Lazy load product images if below fold
- Use `srcset` for responsive images

### CSS Optimization
- Use `transform` and `opacity` for animations (GPU accelerated)
- Avoid animating `left`, `top`, `width`, `height` properties
- Use `will-change` sparingly for animated elements

### JavaScript Optimization
- Load GSAP asynchronously or defer
- Only initialize animations on desktop (not tablet/mobile)
- Use `IntersectionObserver` or ScrollTrigger for efficient scroll detection

---

## Design Token Summary

**Key Measurements:**
- Wrapper height (desktop): `1528px`
- Wrapper height (tablet/mobile): `100vh`
- Product cards max count: `4`
- Card overlay opacity: `0.19` (rgba)
- Heading font size: `160px`
- Subtitle font size: `30px`
- Product name font size: `24px`
- CTA font size: `20px`
- Grid gap (tablet): `16px`
- Grid gap (mobile): `12px`

**Key Colors:**
- Text: `#fffaf5`
- Overlay: `rgba(27, 27, 27, 0.19)`
- Background tint: `#beb6a9`

---

## Developer Notes

1. **Absolute Positioning (Desktop):** Extract exact pixel positions from Figma for each of the 4 card slots. Positions are relative to the 1440×1528px wrapper.

2. **Responsive Scaling:** Between 1440px and 1024px, consider using percentage-based positioning or CSS `scale()` to maintain layout proportions.

3. **100vh Consideration:** On mobile Safari, `100vh` may include browser chrome. Consider using `-webkit-fill-available` or JavaScript-based viewport height calculation.

4. **Character Overflow:** Use `text-overflow: ellipsis` with `white-space: nowrap` and `overflow: hidden` to gracefully handle long product names/CTAs.

5. **GSAP Version:** Use GSAP 3.x with ScrollTrigger plugin. Ensure it's loaded before section JavaScript.

6. **Grid Auto-Flow:** For tablet/mobile grids, if fewer than 4 blocks are added, cards should flow naturally in grid (no empty spaces at start).

7. **Aspect Ratio:** Ensure product images maintain 1:1 aspect ratio across all breakpoints. Use `aspect-ratio: 1 / 1` CSS property with fallback for older browsers.
