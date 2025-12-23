# Design Tokens - Dynamic Hero Studio

**Source:** Figma nodes 220:137, 220:148, 220:151
**Extracted:** 2025-12-23

---

## Colors

### Background
- **Section Background:** `#FFFAF5` (warm cream/off-white)

### Text
- **Primary Text:** `#183754` (dark blue)
- **Overlay Text:** `#FFF5F6` (very light cream, semi-transparent on images)

---

## Typography

### Font Families
```css
--font-heading: 'Neue Haas Grotesk Display Pro', sans-serif;
--font-script: 'Bickham Script Pro', cursive;
```

**Font Files Location:** `assets/fonts/`
- Neue Haas Grotesk Display Pro (45 Light, 55 Roman)
- Bickham Script Pro (Regular)

### Font Sizes

#### Tagline
- **Font Family:** Neue Haas Grotesk Display Pro 45 Light
- **Size (Desktop):** 30px
- **Line Height:** 50px
- **Transform:** Uppercase
- **Color:** #183754
- **Align:** Center

#### Description
- **Font Family:** Neue Haas Grotesk Display Pro 55 Roman
- **Size (Desktop):** 20px
- **Line Height:** 28px
- **Transform:** None
- **Color:** #183754
- **Align:** Center
- **Max Width:** 553.77px (centered)

#### Overlay Text on Images
- **Font Family:** Bickham Script Pro Regular
- **Size (Desktop):** 160px
- **Line Height:** None (1)
- **Letter Spacing:** 3.2px
- **Color:** #FFF5F6
- **Transform:** None
- **Text:** "Beauty" (or customizable)

**Note:** Overlay text font size is adjustable via schema for responsive design.

---

## Layout Dimensions

### Container
- **Max Width:** 1440px
- **Centering:** Auto margins (left/right)
- **Section Height:** 1040px (fixed for all devices)

### Images
- **Dimensions:** 688px × 1032px
- **Object Fit:** Contain
- **Gap Between Images:** 32px

### Image Containers
- **Width:** 534px (visible area)
- **Height:** 731px (visible area)
- **Overflow:** Hidden (clip)

**Note:** Images are larger than containers to allow for positioning/cropping effect.

---

## Spacing

### Vertical Spacing
- **Section Height:** 1040px
- **Container Padding Bottom (Desktop):** 128px
- **Container Padding Bottom (Tablet):** Calculated (decreases to fit content)
- **Container Padding Bottom (Mobile):** Calculated (decreases to fit content)

### Content Spacing
- **Image-to-Tagline Gap:** 32px (from bottom of image to top of tagline)
- **Tagline-to-Description Gap:** 16px
- **Two Images Gap:** 32px (horizontal)

### Overlay Text Position
- **Bottom Edge Position:** 64px from bottom of image
  - Calculated: Image height (1032px) - 64px = 968px from top

---

## Breakpoints

### Desktop (Base)
- **Width:** 1440px
- **Images:** 688 × 1032px
- **Tagline:** 30px
- **Description:** 20px
- **Overlay Text:** 160px (adjustable)
- **Padding Bottom:** 128px

### Tablet
- **Width:** 1024px
- **Images:** Scale proportionally (maintain aspect ratio)
- **Tagline:** Responsive (CSS calculated)
- **Description:** Responsive (CSS calculated)
- **Overlay Text:** Adjustable via schema setting
- **Padding Bottom:** Calculated
- **Section Height:** 1040px (maintained)

### Mobile
- **Width:** 767px and below
- **Images:** Scale proportionally (maintain aspect ratio)
- **Two Images:** Always side-by-side (never stack)
- **Tagline:** Responsive (CSS calculated)
- **Description:** Responsive (CSS calculated)
- **Overlay Text:** Adjustable via schema setting
- **Padding Bottom:** Calculated
- **Section Height:** 1040px (maintained)

---

## Positioning

### Image Overlay Text
```
Position: Absolute
Bottom: 64px (from image bottom)
Left: 108.96px (from image left edge, based on Figma)
```

**Note:** Text positioning may need adjustment based on actual image content and responsive scaling.

---

## Responsive Scaling Strategy

### Font Sizes (Auto-adjust via CSS)
- Tagline and description font sizes scale proportionally using CSS media queries
- NO schema controls for these - purely CSS-driven
- Maintain readability at all viewport sizes

### Overlay Text (Manual adjust via Schema)
- Schema range input allows merchants to adjust overlay text size
- Separate settings for desktop, tablet, mobile if needed
- Default: 160px (desktop)

### Images
- Scale down proportionally when viewport narrows
- Maintain aspect ratio (object-fit: contain)
- Ensure both images fit side-by-side with 32px gap on mobile

### Section Height Maintenance
- Total section height locked at 1040px
- As images scale down, padding-bottom adjusts
- Content always fits within 1040px envelope
- Example calculation:
  ```
  Section Height (1040px) = Image Container Height + Tagline Height + Description Height + Gaps + Padding Bottom
  ```

---

## States & Interactions

### Conditional Display
- Elements only render if content exists
- No hover states designed
- No click interactions on images
- Static, elegant presentation

---

## Design System Alignment

### Consistency
- Uses existing Diamension font families (Neue Haas, Bickham Script)
- Color palette matches brand (#183754 for text, #FFFAF5 for backgrounds)
- Spacing follows logical 8px/4px grid where applicable

### Accessibility
- Text contrast meets WCAG standards
- Font sizes remain readable at all breakpoints
- Semantic HTML structure

---

## Asset Requirements

### Images (Merchant-Provided)
- Recommended size: 688 × 1032px
- Format: JPG or PNG
- Quality: High-resolution (2x for retina if possible)
- Subject: Product photography

### Fonts (Already Loaded)
- Neue Haas Grotesk Display Pro 45 Light
- Neue Haas Grotesk Display Pro 55 Roman
- Bickham Script Pro Regular

---

## CSS Variables (Suggested)

```css
:root {
  /* Colors */
  --hero-studio-bg: #FFFAF5;
  --hero-studio-text: #183754;
  --hero-studio-overlay-text: #FFF5F6;

  /* Dimensions */
  --hero-studio-max-width: 1440px;
  --hero-studio-height: 1040px;
  --hero-studio-image-width: 688px;
  --hero-studio-image-height: 1032px;
  --hero-studio-image-gap: 32px;

  /* Spacing */
  --hero-studio-padding-bottom-desktop: 128px;
  --hero-studio-content-gap-lg: 32px;
  --hero-studio-content-gap-sm: 16px;
  --hero-studio-overlay-bottom: 64px;

  /* Typography */
  --hero-studio-tagline-size: 30px;
  --hero-studio-tagline-height: 50px;
  --hero-studio-description-size: 20px;
  --hero-studio-description-height: 28px;
  --hero-studio-overlay-size: 160px;
  --hero-studio-overlay-spacing: 3.2px;
}
```

---

## Implementation Notes

1. **Height Calculation:** Padding-bottom must be calculated dynamically based on:
   - Actual rendered image heights (after scaling)
   - Tagline height (if shown)
   - Description height (if shown)
   - Gaps (32px + 16px if all content shown)
   - Target total height: 1040px

2. **Two-Image Responsive Logic:**
   - Calculate available width for both images + gap
   - Scale images proportionally to fit
   - Maintain 32px gap at all costs
   - Never stack vertically

3. **Overlay Text Responsiveness:**
   - Provide schema range input for font size
   - Default to 160px on desktop
   - Suggest 100px for tablet, 60px for mobile
   - Allow merchant to fine-tune per device

4. **Conditional CSS Classes:**
   - `.custom-section-dynamic-hero-studio--single-image`
   - `.custom-section-dynamic-hero-studio--two-images`
   - `.custom-section-dynamic-hero-studio--has-tagline`
   - `.custom-section-dynamic-hero-studio--has-overlay`
