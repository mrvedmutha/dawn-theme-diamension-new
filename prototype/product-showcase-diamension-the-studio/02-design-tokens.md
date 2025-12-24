# Design Tokens - Product Showcase Studio

**Source:** Figma node 12:8844
**Extracted:** 2025-12-23
**Figma URL:** https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-8844&m=dev

---

## Colors

### Background
- **Wrapper Background:** `#FFFAF5` (warm cream/off-white)
  - RGB: rgb(255, 250, 245)
  - Use: Full-width wrapper background

### Text
- **Primary Text:** `#183754` (dark blue)
  - RGB: rgb(24, 55, 84)
  - Use: Heading text, CTA text
  - Provides strong contrast against light background

---

## Typography

### Font Families
```css
--font-neue-haas-italic: 'Neue Haas Grotesk Display Pro', sans-serif;
--font-neue-haas-roman: 'Neue Haas Grotesk Display Pro', sans-serif;
```

**Font Files:**
- Neue Haas Grotesk Display Pro 56 Roman Italic
- Neue Haas Grotesk Display Pro 55 Roman

**Loading Method:**
- Check if fonts are already loaded in theme
- If not, add Google Fonts link or upload font files

---

## Font Specifications

### Heading (Overlay Text on Right Image)

**Desktop (1440px):**
- **Font Family:** Neue Haas Grotesk Display Pro 56 Roman Italic
- **Font Style:** Italic
- **Font Size:** 20px
- **Line Height:** 30px (1.5)
- **Color:** #183754
- **Text Transform:** Uppercase
- **Text Align:** Center
- **Max Width:** 216px (fixed)
- **Letter Spacing:** Normal

**Position:**
- Top edge: 112px from top of image wrapper (600×800px)
- Centered horizontally within the 216px width container

**Tablet (1024px):**
- Font Size: 18px (adjust proportionally)
- Line Height: 27px
- Max Width: 216px (maintained)
- Position: 112px from top (maintained)

**Mobile (767px and below):**
- Font Size: 16px
- Line Height: 24px
- Max Width: 216px (maintained)
- Position: 112px from top (maintained)

---

### CTA Link (Overlay Text on Right Image)

**Desktop (1440px):**
- **Font Family:** Neue Haas Grotesk Display Pro 55 Roman
- **Font Style:** Normal (not italic)
- **Font Size:** 20px
- **Line Height:** 40px (2.0)
- **Color:** #183754
- **Text Transform:** None
- **Text Decoration:** Underline
- **Text Underline Offset:** 25% (10px from baseline)
- **Text Align:** Left (or center depending on design preference)
- **Display:** Inline or inline-block
- **White Space:** No-wrap

**Position:**
- Bottom edge: 144px from bottom of image wrapper (800px - 144px = 656px from top)
- Centered horizontally

**Tablet (1024px):**
- Font Size: 18px
- Line Height: 36px
- Position: 144px from bottom (maintained)

**Mobile (767px and below):**
- Font Size: 16px
- Line Height: 32px
- Position: 144px from bottom (maintained)

**Hover State:**
- Consider subtle color change or underline animation
- Example: `color: rgba(24, 55, 84, 0.7)` on hover

---

## Layout Dimensions

### Wrapper
- **Width:** 100% (full viewport width)
- **Background:** #FFFAF5

### Container
- **Max Width:** 1440px
- **Centering:** `margin: 0 auto`
- **Padding (Desktop):** 40px (top/bottom), 56px (left/right)
- **Padding (Tablet):** 40px (top/bottom), 40px (left/right)
- **Padding (Mobile):** 40px (top/bottom), 20px (left/right)

### Image Cards Layout
- **Display:** Flexbox
- **Justify Content:** Space-between
- **Gap (Desktop/Tablet):** Space-between (images at edges)
- **Gap (Mobile):** 64px (when stacked vertically)
- **Flex Direction (Desktop/Tablet):** Row
- **Flex Direction (Mobile):** Column

---

## Image Specifications

### Image Wrapper Dimensions
- **Width:** 600px
- **Height:** 800px
- **Position:** Relative (for absolute positioning of overlay text)
- **Overflow:** Hidden (optional, for image clipping)

### Image Properties
- **Width:** 100% (of 600px wrapper)
- **Height:** 100% (of 800px wrapper)
- **Object Fit:** Cover
- **Object Position:** Center
- **Display:** Block

**Image Requirements:**
- Format: PNG (transparent background preferred)
- Recommended resolution: 600×800px or higher (2x = 1200×1600px for retina)
- File optimization: Compress for web without quality loss

---

## Spacing & Positioning

### Container Spacing
| Breakpoint | Top/Bottom Padding | Left/Right Padding |
|------------|-------------------|--------------------|
| Desktop (1440px) | 40px | 56px |
| Tablet (1024px) | 40px | 40px |
| Mobile (767px) | 40px | 20px |

### Content Spacing
- **Space Between Images (Desktop/Tablet):** `justify-content: space-between`
- **Gap Between Stacked Images (Mobile):** 64px
- **Heading Top Position:** 112px from top of right image wrapper
- **CTA Bottom Position:** 144px from bottom of right image wrapper

### Overlay Text Positioning

**Heading:**
- Position: Absolute
- Top: 112px
- Left: 50% (with `transform: translateX(-50%)` for centering)
- Width: 216px (fixed)
- Text-align: Center

**CTA:**
- Position: Absolute
- Bottom: 144px
- Left: 50% (with `transform: translateX(-50%)` for centering)
- Text-align: Center (or left)
- Display: Inline-block or block

---

## Responsive Breakpoints

### Standard Breakpoints
```css
/* Large Desktop (center, don't stretch) */
@media (min-width: 1441px) {
  /* Container max-width: 1440px, centered */
}

/* Desktop - Base Styles */
/* Default styles (1440px) */

/* Tablet */
@media (max-width: 1024px) {
  /* Adjust padding, maintain side-by-side layout */
}

/* Mobile */
@media (max-width: 767px) {
  /* Stack images vertically, adjust padding, 64px gap */
}

/* Small Mobile */
@media (max-width: 375px) {
  /* Fine-tune spacing if needed */
}
```

---

## Image Wrapper Responsive Behavior

### Desktop (1440px)
- Left Image: 600×800px wrapper
- Right Image: 600×800px wrapper
- Layout: Side-by-side with space-between
- Container width: 1440px max
- Available width for images: 1440px - 112px (padding) = 1328px
- Each image: 600px (total: 1200px, leaving 128px between them via space-between)

### Tablet (1024px)
- Image wrappers: 600×800px (maintained)
- Layout: Side-by-side with space-between
- Container width: Fluid (100% - padding)
- Padding: 80px total (40px each side)
- Images scale or adjust to fit container width

**Note:** May need to adjust image wrapper width proportionally if 600px is too large for tablet screens

### Mobile (767px and below)
- Image wrappers: Scale proportionally or maintain aspect ratio
- Layout: Stacked vertically
- Width: 100% of container (minus padding)
- Gap: 64px between images
- Each image maintains 600:800 aspect ratio (3:4)

---

## Z-Index Layering

```css
.custom-section-product-showcase-studio__image-card {
  position: relative; /* Establishes stacking context */
  z-index: 1;
}

.custom-section-product-showcase-studio__image {
  position: relative;
  z-index: 1; /* Base layer */
}

.custom-section-product-showcase-studio__heading,
.custom-section-product-showcase-studio__cta {
  position: absolute;
  z-index: 10; /* Above image */
}
```

---

## Text Decoration Details

### CTA Underline
```css
.custom-section-product-showcase-studio__cta {
  text-decoration: underline;
  text-decoration-color: #183754;
  text-decoration-thickness: 1px;
  text-underline-offset: 25%; /* Or specific px value like 8px */
}
```

**Browser Compatibility:**
- `text-underline-offset` is supported in modern browsers
- Fallback: Use `border-bottom` if needed for older browsers

---

## Accessibility Considerations

### Image Alt Text
- Always provide descriptive alt text for both images
- Schema should include alt text fields
- Example: "Diamond necklace draped over champagne coupe glass"

### Color Contrast
- Text (#183754) on background (#FFFAF5): **AAA** rating
- Ensure overlay text is readable against image backgrounds
- Consider adding subtle text-shadow if needed:
  ```css
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8);
  ```

### Focus States
- Add visible focus outline for CTA link:
  ```css
  .custom-section-product-showcase-studio__cta:focus {
    outline: 2px solid #183754;
    outline-offset: 4px;
  }
  ```

---

## Design Tokens Summary

### Quick Reference Table

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-wrapper` | #FFFAF5 | Wrapper background |
| `--text-primary` | #183754 | All text color |
| `--container-max-width` | 1440px | Container max-width |
| `--container-padding-desktop` | 40px 56px | Desktop padding |
| `--container-padding-tablet` | 40px 40px | Tablet padding |
| `--container-padding-mobile` | 40px 20px | Mobile padding |
| `--image-width` | 600px | Image wrapper width |
| `--image-height` | 800px | Image wrapper height |
| `--heading-font-size-desktop` | 20px | Desktop heading size |
| `--heading-line-height-desktop` | 30px | Desktop heading line-height |
| `--heading-max-width` | 216px | Heading fixed width |
| `--heading-top-position` | 112px | Heading top offset |
| `--cta-font-size-desktop` | 20px | Desktop CTA size |
| `--cta-line-height-desktop` | 40px | Desktop CTA line-height |
| `--cta-bottom-position` | 144px | CTA bottom offset |
| `--mobile-stack-gap` | 64px | Gap between stacked images |

---

## CSS Variable Implementation (Optional)

```css
:root {
  /* Colors */
  --product-showcase-bg: #FFFAF5;
  --product-showcase-text: #183754;

  /* Layout */
  --product-showcase-max-width: 1440px;
  --product-showcase-padding-y: 40px;
  --product-showcase-padding-x-desktop: 56px;
  --product-showcase-padding-x-tablet: 40px;
  --product-showcase-padding-x-mobile: 20px;

  /* Images */
  --product-showcase-image-width: 600px;
  --product-showcase-image-height: 800px;

  /* Typography */
  --product-showcase-heading-size: 20px;
  --product-showcase-heading-line: 30px;
  --product-showcase-heading-width: 216px;
  --product-showcase-cta-size: 20px;
  --product-showcase-cta-line: 40px;

  /* Positioning */
  --product-showcase-heading-top: 112px;
  --product-showcase-cta-bottom: 144px;
  --product-showcase-mobile-gap: 64px;
}
```

---

## Notes for Developer

1. **Font Loading:** Verify Neue Haas Grotesk Display Pro is already loaded in the theme. If not, add font loading to `theme.liquid` or use web fonts.

2. **Image Optimization:** Encourage merchants to upload high-quality transparent PNGs at 2x resolution (1200×1600px) for retina displays.

3. **Object-fit Browser Support:** `object-fit: cover` is widely supported. No fallback needed for modern browsers.

4. **Text Overlay Positioning:** Use `position: absolute` with `top/bottom` values as specified. Center horizontally with `left: 50%` and `transform: translateX(-50%)`.

5. **Responsive Images:** On mobile, image wrappers may need to scale to fit screen width while maintaining 3:4 aspect ratio. Use percentage-based widths or `max-width`.

6. **Testing:** Test with various image sizes and orientations to ensure object-fit: cover works correctly.

7. **Schema Configuration:** Make heading width configurable (range: 150-300px) to allow merchants flexibility if text length varies.
