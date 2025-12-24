# Custom Diamension Quote Gallery - Design Tokens

**Extracted from Figma Node:** `12:8854`
**Date:** 2025-12-24

---

## 🎨 Colors

### Background
- **Section Background:** `#fffaf5` (Warm Beige)
- **Image Containers:** `#ffffff` (White)

### Typography
- **Quote Text:** `#183754` (Dark Blue)
- **Logo Fill:** `#183754` (Dark Blue)

---

## 📝 Typography

### Quote Text
- **Font Family:** Neue Haas Grotesk Display Pro
- **Font Weight:** 45 Light (300)
- **Font Size:** 30px
- **Line Height:** 45px (1.5)
- **Text Align:** Center
- **Color:** #183754
- **Max Width:** 675.684px

### Font Files Available
Located in `assets/fonts/`:
- Neue Haas Display
- Neue Montreal
- Bickham Script Pro

---

## 📐 Layout Measurements

### Container
- **Max Width:** 1440px (approximate, based on image positioning)
- **Min Height:** ~1101px (based on bottom image position + height)
- **Padding:** To be determined for responsive spacing
- **Alignment:** Center

### Section Spacing
- **Desktop Padding:** 80px (top/bottom), 40px (left/right)
- **Tablet Padding:** 60px (top/bottom), 30px (left/right)
- **Mobile Padding:** 40px (top/bottom), 20px (left/right)

---

## 🖼️ Image Specifications

### Image 1 - Top Center (Node: 12:8855)
- **Container Dimensions:** 327px × 427px
- **Position:**
  - Horizontal: Center (left: 50%, transform: translateX(-50%))
  - Vertical: Top (~0px from container top)
- **Background:** White
- **Overflow:** Clip
- **Inner Image Dimensions:** 1031.569px × 687.713px
- **Inner Image Position:** left: -352.48px, top: -260.71px
- **Parallax:** Yes

### Image 2 - Left Top (Node: 12:8857)
- **Container Dimensions:** 327px × 320px
- **Position:**
  - Left: 0.36px
  - Top: 213.47px
- **Background:** White
- **Overflow:** Clip
- **Inner Image Dimensions:** 568.07px × 852.105px
- **Inner Image Position:** left: -241.07px, top: -292.44px
- **Parallax:** Yes

### Image 3 - Left Middle (Node: 12:8863)
- **Container Dimensions:** 289px × 378px
- **Position:**
  - Left: 128px
  - Top: 341.66px
- **Background:** White
- **Overflow:** Clip
- **Inner Image Dimensions:** 643.28px × 428.854px
- **Inner Image Position:** left: -192.32px, top: -50.85px
- **Parallax:** Yes

### Image 4 - Right Top (Node: 12:8859)
- **Container Dimensions:** 327px × 427px
- **Position:**
  - Left: 1113.35px (right side)
  - Top: 535.83px
- **Background:** White
- **Overflow:** Clip
- **Inner Image Dimensions:** 640.5px × 427px
- **Inner Image Position:** left: -156.94px, top: 0
- **Parallax:** Yes

### Image 5 - Right Bottom (Node: 12:8861)
- **Container Dimensions:** 327px × 226px
- **Position:**
  - Left: 949.35px (right side)
  - Top: 875.66px
- **Background:** White
- **Overflow:** Clip
- **Inner Image Dimensions:** 1676.971px × 969.946px
- **Inner Image Position:** left: -1119.1px, top: -664.03px
- **Parallax:** Yes

### Mobile Image Sizes
- **Square Format:** ~160px × ~160px (approximate)
- **Center Image:** Full width, maintain aspect ratio
- **Gap Between Images:** 16px

---

## 🎯 Center Content

### Logo (Node: 12:8866)
- **Position:** Absolute center
- **Vertical Position:** calc(50% - 31.06px offset)
- **SVG Dimensions:** 46px × 74px
- **SVG Path:** `assets/custom-section-diamension-quote/logo/diamension-logo.svg`
- **Color:** #183754

### Quote Text (Node: 12:8865)
- **Content:** "Glamour is a condition, not a commodity."
- **Position:** Absolute center
- **Vertical Position:** calc(50% + 31.06px offset)
- **Max Width:** 675.684px
- **Horizontal:** Center (left: 50%, transform: translateX(-50%))

---

## 📱 Breakpoints

### Desktop (Base)
- **Min Width:** 1025px
- **Max Container Width:** 1440px
- **Parallax:** Enabled
- **Layout:** Absolute positioned gallery

### Tablet
- **Range:** 768px - 1024px
- **Container Width:** 100%
- **Parallax:** Disabled
- **Layout:** Absolute positioned (scaled)

### Mobile
- **Max Width:** 767px
- **Container Width:** 100%
- **Parallax:** Disabled
- **Layout:** Stacked vertical
  1. Center image (full-width)
  2. Two images row
  3. Content (logo + quote)
  4. Two images row

### Small Mobile
- **Max Width:** 375px
- **Padding:** 30px (top/bottom), 15px (left/right)
- **Font Size Adjustments:** Quote text: 24px

---

## ✨ Parallax Effect Specifications

### GSAP Settings
- **Movement Range:** -80px to +80px (160px total)
- **Easing:** None (linear with scroll)
- **Scroll Trigger:**
  - Start: "top 80%" (when section reaches 80% from viewport top)
  - End: "bottom 20%" (when section is 20% from viewport top)
  - Scrub: true (smooth scroll-linked animation)
- **Target Elements:** All 5 image containers
- **Device Support:** Desktop only (>1024px)

### Animation Details
```javascript
// Each image animates from:
y: -80  // Starting position (above natural position)

// To:
y: 80   // Ending position (below natural position)
```

---

## 🎭 States & Interactions

### Default State
- Images in absolute positions
- Quote and logo visible and centered

### Scroll State (Desktop only)
- Images move vertically based on scroll position
- Smooth parallax effect creates depth illusion

### Hover States
- None specified in design
- Consider adding subtle hover effects for images (optional enhancement)

---

## 🔤 Design System Tokens

### Spacing Scale
- **xs:** 8px
- **sm:** 16px
- **md:** 24px
- **lg:** 40px
- **xl:** 80px

### Border Radius
- Image containers: 0px (sharp corners)

### Shadows
- None specified in design

### Transitions
- Parallax: Smooth scroll-linked (GSAP)
- Hover (if added): 0.3s ease

---

## 📊 Aspect Ratios

### Desktop Image Containers
- **Image 1:** ~0.766 (327/427)
- **Image 2:** ~1.022 (327/320)
- **Image 3:** ~0.765 (289/378)
- **Image 4:** ~0.766 (327/427)
- **Image 5:** ~1.447 (327/226)

### Mobile Images
- **All images:** 1:1 (square) for consistency

---

## 🎨 CSS Custom Properties (Suggested)

```css
:root {
  /* Colors */
  --quote-gallery-bg: #fffaf5;
  --quote-gallery-image-bg: #ffffff;
  --quote-gallery-text: #183754;

  /* Typography */
  --quote-gallery-font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  --quote-gallery-font-size: 30px;
  --quote-gallery-line-height: 45px;

  /* Layout */
  --quote-gallery-max-width: 1440px;
  --quote-gallery-padding-desktop: 80px 40px;
  --quote-gallery-padding-tablet: 60px 30px;
  --quote-gallery-padding-mobile: 40px 20px;

  /* Parallax */
  --quote-gallery-parallax-range: 80px;

  /* Breakpoints */
  --breakpoint-tablet: 1024px;
  --breakpoint-mobile: 767px;
  --breakpoint-small-mobile: 375px;
}
```

---

## 📝 Notes

1. **Image Cropping:** All images use `overflow: clip` to show only a portion of the full image. Inner images are positioned to show the desired crop area.

2. **Responsive Strategy:**
   - Desktop/Tablet: Maintain aspect ratios and absolute positioning
   - Mobile: Convert to stacked layout with square images

3. **Font Loading:** Ensure Neue Haas Grotesk Display Pro is properly loaded. May need to add `@font-face` declaration if not already in theme.

4. **Parallax Performance:** Only enable on desktop to ensure smooth performance. Mobile devices may struggle with parallax effects.

5. **Content Flexibility:** Quote text max-width (675.684px) ensures readability and prevents line breaks in undesirable places.

6. **Logo Sizing:** SVG logo (46px × 74px) maintains crisp quality at all screen sizes.

---

## 🔍 Design Verification Checklist

When implementing, verify:
- [ ] Background color matches exactly (#fffaf5)
- [ ] Text color matches exactly (#183754)
- [ ] Font family is Neue Haas Grotesk Display Pro 45 Light
- [ ] Font size is 30px with 45px line height
- [ ] Logo SVG dimensions are 46px × 74px
- [ ] All 5 images positioned correctly on desktop
- [ ] Parallax effect moves 80px up and down
- [ ] Mobile layout stacks correctly
- [ ] Quote text is centered and has max-width constraint
- [ ] Logo is positioned above quote text in center
