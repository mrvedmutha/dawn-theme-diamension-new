# Design Tokens: Headline Ring Collection

## Color Palette

| Element | Color | Hex Code |
|---------|-------|----------|
| Section Background | Cream/Beige | `#FFFAF5` |
| Text Color | Navy Blue | `#183754` |

## Typography

### Font Family
- **Primary:** Neue Haas Grotesk Display Pro

### Font Weights
- **Light:** 45 Light (for headlines)
- **Roman:** 55 Roman (for body text and labels)

### Desktop Font Sizes (1440px)

| Element | Font Size | Line Height | Weight | Transform |
|---------|-----------|-------------|--------|-----------|
| Headline "BRILLIANCE" | 100px | 86.229px | 45 Light | Uppercase |
| Headline "WITHOUT" | 100px | 86.229px | 45 Light | Uppercase |
| Headline "COMPROMISE" | 100px | 86.229px | 45 Light | Uppercase |
| CTA Link "Our story" | 20px | 20px | 55 Roman | Uppercase |
| Paragraph Content | 20px | 30px | 55 Roman | None |
| Feature Labels | 20px | 20px | 55 Roman | Uppercase |

### Tablet Font Sizes (768px - 1024px)

| Element | Font Size | Note |
|---------|-----------|------|
| Headlines | 104px | Use 104px instead of 100px for better 8-divisible scaling |
| Other Elements | Scale proportionally | Maintain aspect ratios |

### Mobile Font Sizes (<768px)

| Element | Font Size Range | Note |
|---------|-----------------|------|
| Headlines | 48px - 64px | Scale down for smaller screens |
| Other Elements | Scale proportionally | Maintain readability |

## Layout Specifications

### Desktop Layout (1440px Container)

#### Wrapper
- **Background Color:** `#FFFAF5`
- **Height:** 1048px

#### Container
- **Max-width:** 1440px
- **Alignment:** Center

#### Headlines
All headlines have **zero gap** between lines (tight line-height creates stacked appearance)

| Headline | Position | Alignment/Edge |
|----------|----------|----------------|
| "BRILLIANCE" | Top: 184px from wrapper | Center-aligned |
| "WITHOUT" | Below "BRILLIANCE" (zero gap) | Right edge: 296px |
| "COMPROMISE" | Below "WITHOUT" (zero gap) | Starts 32px after CTA link |

#### CTA Link
- **Text:** "Our story"
- **Position:** Left edge: 160px
- **Alignment:** Vertically middle-aligned with "COMPROMISE" headline
- **Text Decoration:** Underline
- **Underline Offset:** 25%
- **Gap to "COMPROMISE":** 32px (horizontal)

#### Product Image
- **Upload Requirement:** Square aspect ratio (recommended for optimal display)
- **Display Size:** 304px × 304px
- **Position:**
  - Left edge: 336px
  - Top: 24px above "COMPROMISE" headline
- **Rotation:** 3deg (clockwise)
- **Interaction:** GSAP parallax animation on scroll

#### Paragraph Content
- **Position:**
  - Top: 536px from wrapper top
  - Right edge: 240px from container edge
  - Left edge: ~704px (calculated: 1440px - 240px - content width)
- **Width:** ~496px

#### Feature Icons Section
- **Position:**
  - Top: 72px below paragraph content bottom
  - Left edge: ~704px (aligned with paragraph)
- **Layout:** Vertical stack of horizontal rows
- **Row Structure:** Icon + Text (side by side)
- **Icon to Text Gap:** 32px (horizontal)
- **Between Rows Gap:** 40px (vertical)

**Feature 1:**
- Icon: Quality craftmanship icon (SVG)
- Text: "QUALITY CRAFTMANSHIP"

**Feature 2:**
- Icon: Planet/globe icon (SVG)
- Text: "PLANET FRIENDLY AND SUSTAINABLY MADE"

#### Certification Badges
- **Images:** IGI and GIA logo badges
- **Position:**
  - Bottom: 176px from wrapper bottom
  - Left edge: 56px
- **Gap Between Badges:** 32px (horizontal)
- **Layout:** Horizontal (side by side)

### Tablet Layout (768px - 1024px)

- **Scaling:** Proportional reduction of all elements
- **Headline Font:** 104px (instead of 100px)
- **Spacing:** All spacing scales down proportionally
- **Maintain:** Same layout structure as desktop

### Mobile Layout (<768px)

#### Container
- **Side Padding:** 40px (left and right)

#### Headlines
- **Font Size:** 48px - 64px (scaled down)
- **Layout:** Same stacked arrangement as desktop/tablet

#### CTA Link
- **Position:** Right below "COMPROMISE" headline's right edge
- **Gap:** 8px below "COMPROMISE"

#### Product Image
- **Size:** Reduced (scale down from 304px)
- **Rotation:** Keep 3deg
- **Parallax:** Maintain GSAP animation

#### Content Stacking Order
1. Headlines + CTA (top)
2. Product Image (with parallax)
3. **Gap:** 8px
4. Paragraph Content
5. Feature Icons (vertical stack)
6. Certification Badges (vertical stack)

#### Feature Icons - Mobile
- **Layout:** Vertical stack
- **Structure:** Each row maintains horizontal layout (icon + text side by side)
- **Stack:**
  ```
  [Icon] Quality Craftmanship
  [Icon] Planet Friendly and Sustainably Made
  ```

#### Certification Badges - Mobile
- **Layout:** Vertical stack (one below the other)
- **Structure:**
  ```
  [IGI Badge]
  [GIA Badge]
  ```

## Responsive Breakpoints

| Breakpoint | Range | Behavior |
|------------|-------|----------|
| Desktop | 1440px+ | Full layout, max-width container |
| Tablet | 768px - 1024px | Proportional scaling, 104px headlines |
| Mobile | < 768px | Stacked layout, 40px padding, reduced sizes |

## Image Specifications

### Product Image
- **Recommended Upload:** Square aspect ratio (e.g., 1000×1000px, 1200×1200px)
- **Display Sizes:**
  - Desktop: 304×304px
  - Tablet: Scaled proportionally
  - Mobile: Reduced size (scale down)
- **Format:** JPG or PNG
- **Optimization:** Shopify image_url filter with appropriate sizing

### Feature Icons
- **Format:** SVG (preferred for scalability)
- **Size:** Flexible (will be styled via CSS)
- **Upload:** Custom icons via section schema

### Certification Badges
- **Format:** PNG or SVG
- **Display:** Maintain aspect ratio
- **Size:** Auto-scaled based on layout

## Spacing Scale

| Token | Desktop | Tablet | Mobile | Usage |
|-------|---------|--------|--------|-------|
| `gap-xs` | 8px | 6px | 8px | Small gaps |
| `gap-sm` | 24px | 18px | 16px | Medium gaps |
| `gap-md` | 32px | 24px | 24px | Standard gaps |
| `gap-lg` | 40px | 32px | 32px | Large gaps |
| `gap-xl` | 72px | 56px | 48px | Extra large gaps |

## Z-Index Layers

| Element | Z-Index | Note |
|---------|---------|------|
| Background | 0 | Wrapper background |
| Static Content | 1 | Text, badges, icons |
| Product Image | 2 | Parallax image (can overlap text if needed) |

## Text Decoration

| Element | Decoration | Properties |
|---------|------------|------------|
| CTA Link | Underline | `text-decoration: underline;`<br>`text-underline-offset: 25%;`<br>`text-decoration-color: #183754;` |

## Notes for Developers

1. **Line Height for Headlines:** The zero gap between headlines is achieved by using tight line-height (86.229px for 100px font). This creates the stacked, visually connected appearance.

2. **Image Rotation:** Use CSS `transform: rotate(3deg)` for the product image rotation.

3. **Middle Alignment:** CTA and "COMPROMISE" should be vertically centered on the same horizontal axis using flexbox or CSS alignment.

4. **Responsive Scaling:** Use CSS calc() and viewport units (vw) for fluid scaling between breakpoints.

5. **GSAP Parallax:** The product image should have subtle vertical movement on scroll. Keep movement range small for elegance (e.g., ±20-30px).

6. **Font Loading:** Ensure Neue Haas Grotesk Display Pro is properly loaded via font-face or Shopify fonts.

7. **Merchant Customization:** All values should have schema settings with these specifications as defaults.
