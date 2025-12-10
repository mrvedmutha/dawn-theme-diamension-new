# Feature Slider with Left Image - Design Tokens

## Figma Design Reference

**Source Design File:** 
- **URL:** `https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-4809&m=dev`
- **Node ID:** `12:4809`
- **Section Name:** NEW ARRIVALS (Feature Slider with Left Image)

**How to View Design Details in Figma MCP:**
```bash
# Extract design context and screenshot
figma-mcp-dektop_get_design_context(nodeId: "12:4809")
figma-mcp-dektop_get_screenshot(nodeId: "12:4809")
figma-mcp-dektop_get_variable_defs(nodeId: "12:4809")

# Save outputs to prototype/section-feature-slider-with-left-image/design/
```

**Design Assets Available in Figma:**
- Desktop view (1440px+): 3 full products + left sidebar image
- Tablet/Mobile view: Top image (1:1 square) + 2-3 product cards
- Interactive states: Hover, wishlist active, carousel end states
- All typography, spacing, and color tokens

---

## Colors

### Primary Colors
- **Section Background:** `#FFFAF5` (Light Cream)
- **Card Background:** `#F0EFEA` (Light Tan)
- **Text Primary:** `#183754` (Dark Navy Blue)

### Interactive Colors
- **Wishlist Active Background:** `#183754` (Dark Navy - Ellipse)
- **Wishlist Active Icon:** `#FFFAF5` (Light Cream)
- **Arrow Icon:** Black (from SVG) - `#000000`

### Typography Colors
- **Heading Text:** `#183754`
- **Product Name:** `#183754`
- **Price Text:** `#183754`

---

## Typography

### Font Families
- **Primary Font:** Neue Haas Display
- **Available Weights:**
  - Light (45px weight value)
  - Medium (55px weight value)
  - Roman (regular weight)
  - Bold
  - And other variants available in `prototype/assets/fonts/neue-haas-display/`

### Heading (Section Title)
- **Font Family:** Neue Haas Display
- **Font Weight:** Light (45 weight)
- **Font Size:** 30px (desktop)
- **Font Size (Mobile):** 24px (estimated adjustment)
- **Line Height:** 50px
- **Text Transform:** UPPERCASE
- **Letter Spacing:** Normal
- **Color:** `#183754`

### Product Name/Title
- **Font Family:** Neue Haas Display
- **Font Weight:** Light (45 weight)
- **Font Size:** 20px
- **Line Height:** 30px
- **Text Transform:** Sentence case
- **Letter Spacing:** Normal
- **Color:** `#183754`

### Product Price
- **Font Family:** Neue Haas Display
- **Font Weight:** Medium (55 weight)
- **Font Size:** 14px
- **Line Height:** 20px
- **Text Transform:** UPPERCASE
- **Letter Spacing:** Normal
- **Color:** `#183754`
- **Format:** "₹ 32,000" (with currency symbol)

---

## Spacing & Layout

### Section Container
- **Max Width:** 1440px (centered on larger screens)
- **Padding (1440px+):** 40px horizontal
- **Padding (1024px - 1440px):** 30px horizontal
- **Padding (768px - 1024px):** 20px horizontal
- **Padding (≤ 375px):** 15px horizontal
- **Vertical Padding (Desktop):** 80px top/bottom
- **Vertical Padding (Tablet):** 60px top/bottom
- **Vertical Padding (Mobile):** 40px top/bottom

### Header Section
- **Bottom Margin:** 40px (space between heading and carousel)

### Product Cards
- **Card Gap (Desktop):** 24px (gap between each card in carousel)
- **Card Gap (Tablet):** 20px
- **Card Gap (Mobile):** 16px

### Image Containers
- **Sidebar Image Width (Desktop):** Fixed width (flexible, merchant-defined)
- **Sidebar Image Aspect Ratio:** 1:1 (Square)
- **Top Image Width (Mobile/Tablet):** 100% of container (full vw adjusted for padding)
- **Top Image Aspect Ratio:** 1:1 (Square)
- **Top Image Bottom Margin:** 40px

### Product Card Image
- **Aspect Ratio:** 2:3 (Portrait)
- **Width:** 100% of card container
- **Height:** Auto (maintains aspect ratio)
- **Object Fit:** Cover (image fills container)
- **Object Position:** Center

### Product Info Spacing
- **Image to Title Gap:** 12px
- **Title to Price Gap:** 8px
- **Price to Wishlist Button Gap:** 16px

### Wishlist Button
- **Diameter:** 30px
- **Background (Inactive):** Transparent/None
- **Background (Active):** Ellipse shape, color `#183754`
- **Icon Size (SVG):** 18.755px (as per Figma)
- **Icon Position:** Centered in button

### Arrow Navigation Button
- **Size:** 24x24px
- **Padding:** Optional, around button for larger click target
- **Position:** Aligned with heading, right side
- **Background:** Transparent/None
- **Hover Effect:** None (no visual feedback on hover)

---

## Breakpoint-Specific Tokens

### Large Desktop (1440px+)
```css
@media (min-width: 1441px) {
  Container max-width: 1440px;
  Sidebar visible: YES (left side);
  Product cards visible: 3 (full, no offset);
  Card gap: 24px;
  Padding: 40px horizontal;
  Image position: Left sidebar;
}
```

### Desktop (1250-1440px)
```css
Base styling at 1440px
  Sidebar visible: YES (left side);
  Product cards visible: 2 full + 1 offset;
  Card gap: 24px;
  Padding: 40px horizontal;
}
```

### Tablet (1025-1249px)
```css
@media (max-width: 1024px) {
  Sidebar visible: NO (moved to top);
  Top image: 100% width, 1:1 aspect ratio;
  Product cards visible: 3 (full, no offset);
  Card gap: 20px;
  Padding: 30px horizontal;
  Image position: Top, full width;
}
```

### Mobile (768-1024px)
```css
@media (max-width: 767px) {
  Top image: 100% width, 1:1 aspect ratio;
  Product cards visible: 2 (full, no offset);
  Card gap: 16px;
  Padding: 20px horizontal;
  Image position: Top, full width;
}
```

### Small Mobile (≤ 375px)
```css
@media (max-width: 375px) {
  Top image: 100% width, 1:1 aspect ratio;
  Product cards visible: 2 (full, no offset);
  Card gap: 16px;
  Padding: 15px horizontal;
  Image position: Top, full width;
}
```

---

## Component Dimensions

### Product Card
- **Width (Desktop 1440px+):** Calculated based on viewport - roughly 280-320px
- **Width (1250-1440px):** Roughly 240-280px (2 full + 1 offset)
- **Width (Tablet/Mobile):** Responsive, auto-calculated per breakpoint
- **Height:** Auto (based on image aspect ratio + text content)

### Image Container (Product)
- **Aspect Ratio:** 2:3
- **Width:** 100% of card
- **Height:** 150% of width (to maintain 2:3 ratio)

### Top Image (Mobile)
- **Width:** 100% of section (minus padding)
- **Height:** Equal to width (1:1 square)

### Sidebar Image (Desktop)
- **Aspect Ratio:** 1:1 (Square)
- **Estimated Width:** 300-400px (flexible, responsive)
- **Height:** Equal to width

---

## Animation Tokens

### Carousel Scroll
- **Duration:** 800ms
- **Easing:** GSAP Power2.inOut (similar to cubic-bezier(0.455, 0.03, 0.515, 0.955))
- **Effect:** Fast then Slow
- **Transform Property:** translate3d (use GPU acceleration)

### Wishlist Button Press
- **Down Scale:** 0.9 (90% of original size)
- **Duration (Down):** 150ms
- **Duration (Up):** 150ms
- **Easing:** Power2.out
- **Total Duration:** 300ms

### Arrow Direction Flip
- **Rotation:** 180 degrees (right ↔ left)
- **Duration:** 400ms
- **Easing:** GSAP Power2.inOut
- **Timing:** Triggered when carousel reaches end

---

## Border & Shadows

### Product Cards
- **Border Radius:** 0 (no rounding)
- **Border:** None
- **Box Shadow:** None (no shadow effect)

### Wishlist Button
- **Border Radius:** 100px (perfect circle)
- **Border:** None
- **Box Shadow:** None (inactive state)

### Top/Sidebar Image
- **Border Radius:** 0 (no rounding)
- **Border:** None
- **Box Shadow:** None

---

## Transitions

### General Transitions
- **Button State Change:** 0.3s ease (CSS transition)
- **Arrow Animation:** 0.4s ease (GSAP)
- **Carousel Scroll:** 0.8s ease (GSAP)

---

## Asset Specifications

### Images
- **Format:** JPEG (photos), PNG (with transparency), WebP (optimized)
- **Sidebar/Top Image:** 1:1 square aspect ratio
- **Product Images:** 2:3 portrait aspect ratio (merchants can upload square, will auto-adapt)
- **DPI:** 72-96 DPI for web
- **Optimization:** Compress with Imagemin or similar

### Icons/SVG
- **Arrow Icon:** 24x24px, black fill
- **Heart/Wishlist Icon:** 18.755px (as per Figma)
- **Format:** SVG (inline or as image)
- **Color:** Black (`#000000`) for arrow, will change dynamically for heart

### Fonts
- **Neue Haas Display:** Already available in `prototype/assets/fonts/neue-haas-display/`
- **Required Weights for this section:**
  - Light (45px weight)
  - Medium (55px weight)
  - Roman (regular)

---

## Z-Index Stack

```css
Base: 1
Product Cards: 1
Carousel Container: 1
Header/Title: 2
Arrow Button: 10 (ensure clickable, above carousel)
Wishlist Button: 20 (ensure interactive, above product card)
```

---

## Checklist

- [x] Colors defined with hex codes
- [x] Typography families, sizes, weights specified
- [x] Spacing values documented for all breakpoints
- [x] Component dimensions outlined
- [x] Animation timings and easing specified
- [x] Border and shadow properties noted
- [x] Asset specifications detailed
- [x] Z-index stack defined
