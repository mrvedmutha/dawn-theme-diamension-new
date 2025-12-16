# Design Tokens: Diamension Follow Instagram

## Color Palette

| Element | Color | Hex Code |
|---------|-------|----------|
| Section Background | Cream/Beige | `#FFFAF5` |
| Text Color | Navy Blue | `#183754` |

## Typography

### Font Family
- **Primary:** Neue Haas Grotesk Display Pro

### Font Weights
- **Light:** 45 Light (for headline)
- **Roman:** 55 Roman (for CTA link)

### Desktop Font Sizes (1440px)

| Element | Font Size | Line Height | Weight | Transform |
|---------|-----------|-------------|--------|-----------|
| Headline "FOLLOW US ON" | 40px | 40px | 45 Light | Uppercase |
| Headline "INSTAGRAM" | 40px | 40px | 45 Light | Uppercase |
| CTA Link "Instagram" | 20px | 40px | 55 Roman | None (sentence case) |

### Tablet Font Sizes (768px - 1024px)

| Element | Font Size | Note |
|---------|-----------|------|
| Headlines | 32px | Scaled down proportionally |
| CTA Link | 18px | Scaled down proportionally |

### Mobile Font Sizes (<768px)

| Element | Font Size Range | Note |
|---------|-----------------|------|
| Headlines | 24px - 28px | Scale down for smaller screens |
| CTA Link | 16px | Maintain readability |

## Layout Specifications

### Desktop Layout (1440px Container)

#### Wrapper
- **Background Color:** `#FFFAF5`
- **Width:** 100% (fluid)
- **Min-height:** Auto (content-driven)

#### Container
- **Max-width:** 1440px
- **Alignment:** Center
- **Padding:** 0 (full width within max-width)

#### Headline
- **Text:** "FOLLOW US ON" (line 1) / "INSTAGRAM" (line 2)
- **Position:** Top edge: 144px from wrapper top
- **Alignment:** Center-aligned (horizontal)
- **Line Height:** 40px (tight, creates stacked appearance)
- **Display:** Single text block with line break

#### Decorative Ellipse (Background SVG)
- **Asset:** `assets/custom-section-instagram/instagram-section-circle.svg`
- **Position:** Vertically centered to container height
- **Rotation:** Pre-rotated in SVG (no CSS transform needed)
- **Scaling:** Responsive scaling based on viewport
- **Z-Index:** Behind images (lower layer)
- **Desktop Display:** Visible
- **Tablet Display:** Hidden (`display: none`)
- **Mobile Display:** Hidden (`display: none`)

#### Image Grid Layout

**Layout Pattern:** Asymmetric masonry-style grid with staggered vertical positioning

**Image Specifications:**
- **Aspect Ratio:** 1:1 (square)
- **Desktop Size:** 328×328px (each image)
- **Upload Recommendation:** 1000×1000px or larger for quality

**Image Positioning (Desktop):**

The layout creates visual depth through staggered positioning where odd images align to the top and even images align to the bottom, forming a dynamic zigzag pattern with overlapping images.

**Horizontal Positioning Math:**
- **Image Size:** 328×328px
- **Overlap:** 56px (images overlap by 56px)
- **Spacing Between Start Points:** 328px - 56px = 272px
- **Calculation:**
  - Image 1 starts at: 0
  - Image 2 starts at: 0 + 272px = 272px
  - Image 3 starts at: 272px + 272px = 544px
  - Image 4 starts at: 544px + 272px = 816px
- **Total Grid Width:** 816px + 328px = 1144px

**Container Alignment:**
- **Container Max-Width:** 1440px
- **Side Margins:** 64px (left and right)
- **Image Grid:** Center-aligned within container
- **Available Space:** 1440px - (64px × 2) = 1312px
- **Grid Centering:** Images centered within available space

| Image | Type | Vertical Position | Horizontal Position (from left) | Z-Index |
|-------|------|-------------------|---------------------------------|---------|
| Image 1 | Odd | Top: 400px | Left: 0 (relative to grid start) | 2 |
| Image 2 | Even | Bottom: 312px | Left: 272px (relative to grid start) | 3 |
| Image 3 | Odd | Top: 400px | Left: 544px (relative to grid start) | 4 |
| Image 4 | Even | Bottom: 312px | Left: 816px (relative to grid start) | 5 |

**Masonry Grid Characteristics:**
- **Staggered Rows:** Not a traditional grid - two visual "rows" at different vertical positions
- **Visual Flow:** Creates a diagonal reading pattern from left to right with overlapping images
- **Image Overlap:** 56px overlap creates layered depth effect (requires proper z-index)
- **Center Alignment:** Entire image grid centered within container with 64px side margins
- **Asymmetric Balance:** Overlapping images balanced by decorative ellipse in center

**Z-Index Layering (Critical for Depth):**
- Background wrapper: `z-index: 0`
- Decorative ellipse: `z-index: 1` (behind all images)
- Image 1 (first image): `z-index: 2`
- Image 2 (second image): `z-index: 3`
- Image 3 (third image): `z-index: 4`
- Image 4 (fourth image): `z-index: 5`
- Text (headline, CTA): `z-index: 6` (always on top)

**Note on Z-Index:** Each image has an incrementing z-index to ensure proper visual stacking as they create the masonry effect. This prevents visual conflicts and maintains the intended depth hierarchy.

#### CTA Link
- **Text:** "Instagram"
- **Position:** Bottom edge: 112px from wrapper bottom
- **Alignment:** Center-aligned (horizontal)
- **Text Decoration:** Underline
- **Underline Offset:** Standard (browser default or 25%)

### Tablet Layout (768px - 1024px)

#### Decorative Ellipse
- **Display:** `display: none` (hidden)

#### Image Grid
- **Layout:** Horizontal row (4 images side by side)
- **Image Size:** 328×328px (maintain desktop size or scale proportionally)
- **Spacing:** Zero margin, zero padding, zero gap between images
- **Alignment:** Center-aligned within container
- **Display:** `display: flex` or `display: grid` with no gaps

#### Content Adjustments
- Headline font size: 32px
- CTA font size: 18px
- Maintain center alignment
- Reduce vertical spacing proportionally

### Mobile Layout (<768px)

#### Container
- **Side Padding:** 0 (images edge-to-edge) or minimal padding
- **Max-width:** 100%

#### Decorative Ellipse
- **Display:** `display: none` (hidden)

#### Image Grid
- **Layout:** 2×2 grid (2 images per row, 2 rows)
- **Image Size:** 50% container width (or calculated for perfect squares)
- **Spacing:** Zero margin, zero padding, zero gap between images
- **Display:** `display: grid; grid-template-columns: 1fr 1fr; gap: 0;`
- **Arrangement:**
  ```
  [Image 1] [Image 2]
  [Image 3] [Image 4]
  ```

#### Content Adjustments
- Headline font size: 24px - 28px
- CTA font size: 16px
- Maintain center alignment
- Stack order: Headline → Images → CTA

## Responsive Breakpoints

| Breakpoint | Range | Layout Behavior |
|------------|-------|-----------------|
| Desktop | 1024px+ | Asymmetric masonry grid, ellipse visible, parallax active |
| Tablet | 768px - 1024px | Horizontal row of 4 images, ellipse hidden, no parallax |
| Mobile | < 768px | 2×2 grid, ellipse hidden, no parallax |

## Image Specifications

### Instagram Product Images
- **Recommended Upload:** Square aspect ratio (1:1), minimum 1000×1000px
- **Display Sizes:**
  - Desktop: 328×328px (each image)
  - Tablet: 328×328px or proportionally scaled
  - Mobile: ~50vw (fluid based on viewport)
- **Format:** JPG or PNG
- **Optimization:** Shopify image_url filter with appropriate sizing
- **Quantity:** 4 images total

### Decorative Ellipse SVG
- **File:** `instagram-section-circle.svg`
- **Location:** `assets/custom-section-instagram/`
- **Format:** SVG (scalable)
- **Rotation:** Pre-rotated in source file (no CSS rotation needed)
- **Scaling:** CSS `width` and `height` for responsive sizing

## Spacing Scale

| Token | Desktop | Tablet | Mobile | Usage |
|-------|---------|--------|--------|-------|
| `headline-top` | 144px | 80px | 40px | Headline top edge spacing |
| `cta-bottom` | 112px | 60px | 40px | CTA bottom edge spacing |
| `image-top-odd` | 400px | N/A | N/A | Odd images top position (desktop only) |
| `image-bottom-even` | 312px | N/A | N/A | Even images bottom position (desktop only) |
| `image-gap` | 0 | 0 | 0 | Gap between images (tablet/mobile) |

## Z-Index Layers

| Element | Z-Index | Note |
|---------|---------|------|
| Background Wrapper | 0 | Base layer with background color |
| Decorative Ellipse | 1 | Behind images, above background |
| Image 1 | 2 | First image in stacking order |
| Image 2 | 3 | Second image (may overlap Image 1) |
| Image 3 | 4 | Third image (higher stack) |
| Image 4 | 5 | Fourth image (highest in image stack) |
| Text Content (Headline, CTA) | 6 | Top layer, always visible |

## Parallax Animation Specifications

### Desktop Only (1024px+)
- **Target:** Individual `<img>` elements (not containers)
- **Movement Range:** ±80px vertical (configurable, reference: shop-collection-arch section)
- **Animation Trigger:** Section enters/exits viewport
- **Scroll Behavior:** Smooth scrubbing tied to scroll position

### Odd Images (1st, 3rd)
- **Direction:** Top to bottom
- **Start Position:** `y: -80px` (above natural position)
- **End Position:** `y: 80px` (below natural position)
- **Scroll Trigger Range:** Section top 80% to bottom 20%

### Even Images (2nd, 4th)
- **Direction:** Bottom to top (opposite of odd images)
- **Start Position:** `y: 80px` (below natural position)
- **End Position:** `y: -80px` (above natural position)
- **Scroll Trigger Range:** Section top 80% to bottom 20%

### Tablet/Mobile
- **Parallax:** Disabled (`display: none` or conditional initialization)
- **Images:** Static positioning

## Text Decoration

| Element | Decoration | Properties |
|---------|------------|------------|
| CTA Link | Underline | `text-decoration: underline;`<br>`text-underline-offset: 25%;`<br>`text-decoration-color: #183754;` |

## Notes for Developers

1. **Asymmetric Masonry Grid:** The desktop layout is NOT a traditional grid. It's an asymmetric masonry-style layout where images are positioned at different vertical levels (top vs bottom alignment) to create visual interest and depth. This requires absolute positioning on desktop.

2. **Z-Index Management:** Critical for proper visual stacking. Each image has an incrementing z-index (2, 3, 4, 5) to ensure the masonry effect displays correctly, especially where the decorative ellipse or images may visually overlap.

3. **Ellipse SVG Asset:** The decorative ellipse is already rotated in the SVG file (`instagram-section-circle.svg`). Do not apply additional CSS rotation. Only handle responsive scaling.

4. **Image Container vs Image:** Parallax effect MUST be applied to the `<img>` element itself, not the parent container. This ensures proper visual effect.

5. **Zero Gaps:** Tablet and mobile layouts require absolute zero spacing between images. Use `gap: 0`, `margin: 0`, and `padding: 0` to achieve edge-to-edge image placement.

6. **Parallax Direction:** Odd and even images have opposite movement directions to create dynamic visual interest. Test both directions to ensure correct implementation.

7. **Responsive Ellipse:** On desktop, the ellipse scales proportionally with viewport size. Use `max-width` and `height: auto` or CSS `clamp()` for fluid scaling.

8. **Square Image Ratio:** Images must maintain 1:1 aspect ratio across all breakpoints. Use `aspect-ratio: 1/1` CSS property or calculated height/width.

9. **GSAP Dependencies:** Verify GSAP and ScrollTrigger are loaded before initializing parallax. Desktop-only initialization requires viewport width check.

10. **Merchant Customization:** All values should have schema settings with these specifications as defaults. Merchants should be able to upload their own Instagram images.

11. **Center Alignment:** Headline and CTA must remain horizontally centered at all breakpoints. Use `text-align: center` or flexbox centering.

12. **Performance:** Lazy-load images for optimal performance. Parallax animation should maintain 60fps on modern devices.
