# Design Tokens: Diamension Before Footer Hero

## Color Palette

| Element | Color Name | Hex Code |
|---------|------------|----------|
| Wrapper Background | Dark Charcoal | `#212121` |
| Text Color (Quote & Caption) | Light Cream | `#FFFAF5` |

## Typography

### Font Family

- **Primary:** Neue Haas Grotesk Display Pro

### Font Weights

- **Regular (400):** For both quote text and caption text

### Desktop Font Sizes (1440px Container)

| Element | Font Size | Line Height | Weight | Transform |
|---------|-----------|-------------|--------|-----------|
| Quote Text | 40px | 45px (112.5%) | 400 | None |
| Caption Text | 30px | 60px (200%) | 400 | Uppercase |

### Tablet Font Sizes (768px - 1024px)

| Element | Font Size | Line Height | Note |
|---------|-----------|-------------|------|
| Quote Text | 32px | 40px | Scale proportionally |
| Caption Text | 24px | 48px | Maintain uppercase |

### Mobile Font Sizes (<768px)

| Element | Font Size | Line Height | Note |
|---------|-----------|-------------|------|
| Quote Text | 24px | 30px | Maintain readability |
| Caption Text | 20px | 36px | Keep uppercase |

## Layout Specifications

### Desktop Layout (1440px Container)

#### Wrapper

- **Background Color:** `#212121`
- **Width:** 100% (full-width)
- **Min-Height:** Auto (adapts to content)

#### Container

- **Max-Width:** 1440px
- **Height:** 672px
- **Alignment:** Center-aligned (horizontally)
- **Position:** Relative (for absolute positioning of children)

#### Quote Text Block

**Dimensions:**
- **Desktop Width:** 704px (fixed)
- **Desktop Height:** 184px (fixed)
- **Responsive Widths (8-divisible):**
  - 1440px+: 704px
  - 1200px-1439px: 640px
  - 1024px-1199px: 576px
  - 768px-1023px: 512px
  - 576px-767px: 448px
  - 480px-575px: 384px
  - 375px-479px: 320px

**Position:**
- **Top:** 104px from container top edge
- **Horizontal:** Center-aligned within container

**Alignment:**
- **Container Alignment:** Center
- **Text Alignment:** Center

**Font Specifications:**
```css
color: #FFFAF5;
text-align: center;
font-family: "Neue Haas Grotesk Display Pro";
font-size: 40px;
font-style: normal;
font-weight: 400;
line-height: 45px; /* 112.5% */
```

**Content (Default):**
"We believe jewelry should be something you never take off. A companion to your memory, made to last a lifetime, the kind you'll invest in and pass down."

#### Caption Text

**Position:**
- **Top:** 48px gap below quote text bottom edge
  - Calculation: Quote top (104px) + Quote height (184px) + Gap (48px) = 336px from container top
- **Horizontal:** Center-aligned within container

**Font Specifications:**
```css
color: #FFFAF5;
text-align: center;
font-family: "Neue Haas Grotesk Display Pro";
font-size: 30px;
font-style: normal;
font-weight: 400;
line-height: 60px; /* 200% */
text-transform: uppercase;
```

**Content (Default):**
"—KARAN, FOUNDER"

#### Product Image

**Upload Requirement:**
- **Aspect Ratio:** 1:1 (square)
- **Recommended Size:** 1200×1200px minimum for quality

**Display Specifications:**
- **Display Size:** 800px × 800px
- **Aspect Ratio:** Maintain 1:1

**Positioning Strategy (Option A - Recommended):**
- **Position:** Absolute
- **Bottom:** Offset from bottom (merchant adjustable)
  - Default offset: -128px (image extends below container, partially visible)
  - Merchant adjustable range: -200px to 0px
- **Horizontal:** Center-aligned (left: 50%, transform: translateX(-50%))
- **Z-Index:** 1 (below text content)

**Image Offset Settings (Schema):**
```json
{
  "type": "range",
  "id": "image_offset",
  "label": "Image Vertical Position",
  "min": -200,
  "max": 0,
  "step": 8,
  "unit": "px",
  "default": -128,
  "info": "Negative values move image down (more hidden). 0 = fully visible at bottom."
}
```

**Responsive Image Sizes:**
- **Desktop (1440px):** 800×800px
- **Tablet (768px-1024px):** 600×600px
- **Mobile (<768px):** 400×400px

### Tablet Layout (768px - 1024px)

#### Container

- **Max-Width:** 1024px
- **Height:** Auto (adapts to content)
- **Side Padding:** 40px

#### Quote Text

- **Width:** Scales according to 8-divisible breakpoints (512px or 576px)
- **Font Size:** 32px
- **Line Height:** 40px

#### Caption Text

- **Font Size:** 24px
- **Line Height:** 48px
- **Gap from Quote:** 40px

#### Product Image

- **Display Size:** 600×600px
- **Offset:** Proportionally adjusted (default: -96px)

### Mobile Layout (<768px)

#### Container

- **Side Padding:** 20px (left and right)
- **Height:** Auto

#### Quote Text

- **Width:** Scales according to 8-divisible breakpoints (320px, 384px, or 448px)
- **Font Size:** 24px
- **Line Height:** 30px
- **Top Position:** 60px (reduced from 104px)

#### Caption Text

- **Font Size:** 20px
- **Line Height:** 36px
- **Gap from Quote:** 32px (reduced from 48px)

#### Product Image

- **Display Size:** 400×400px
- **Offset:** Adjusted for mobile (default: -80px)
- **Positioning:** Maintain center alignment

## Spacing Scale

### Desktop Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `quote-top` | 104px | Quote text top position |
| `caption-gap` | 48px | Gap between quote and caption |
| `image-offset-default` | -128px | Default image bottom offset |

### Tablet Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `quote-top` | 80px | Quote text top position |
| `caption-gap` | 40px | Gap between quote and caption |
| `image-offset-default` | -96px | Default image bottom offset |

### Mobile Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `quote-top` | 60px | Quote text top position |
| `caption-gap` | 32px | Gap between quote and caption |
| `image-offset-default` | -80px | Default image bottom offset |

## Responsive Breakpoints

| Breakpoint Name | Range | Container Behavior |
|-----------------|-------|-------------------|
| Large Desktop | 1441px+ | Max-width 1440px, centered |
| Desktop | 1200px-1440px | Max-width 1200px |
| Tablet Landscape | 1024px-1199px | Max-width 1024px, side padding 40px |
| Tablet | 768px-1023px | Max-width 768px, side padding 40px |
| Mobile Large | 576px-767px | Full width, side padding 20px |
| Mobile | 480px-575px | Full width, side padding 20px |
| Mobile Small | <480px | Full width, side padding 20px |

## Quote Text Responsive Width Breakpoints

**CRITICAL: All widths MUST be divisible by 8**

| Viewport Width | Quote Width | Divisibility Check |
|----------------|-------------|-------------------|
| 1440px+ | 704px | 704 ÷ 8 = 88 ✓ |
| 1200px-1439px | 640px | 640 ÷ 8 = 80 ✓ |
| 1024px-1199px | 576px | 576 ÷ 8 = 72 ✓ |
| 768px-1023px | 512px | 512 ÷ 8 = 64 ✓ |
| 576px-767px | 448px | 448 ÷ 8 = 56 ✓ |
| 480px-575px | 384px | 384 ÷ 8 = 48 ✓ |
| <480px | 320px | 320 ÷ 8 = 40 ✓ |

## Image Specifications

### Product Image

**Upload Requirements:**
- **Format:** JPG or PNG (PNG for transparency if needed)
- **Aspect Ratio:** 1:1 (square)
- **Minimum Dimensions:** 1200×1200px
- **Recommended Dimensions:** 1600×1600px for Retina displays
- **File Size:** Optimized, < 500KB recommended
- **Subject:** Product (luxury ring) on clean background or transparent background

**Shopify Image Optimization:**
```liquid
{{ section.settings.product_image | image_url: width: 1600 | image_tag:
  loading: 'lazy',
  widths: '400, 600, 800, 1200, 1600',
  sizes: '(max-width: 767px) 400px, (max-width: 1024px) 600px, 800px',
  class: 'custom-diamension-before-footer-hero__image'
}}
```

## Z-Index Layers

| Element | Z-Index | Note |
|---------|---------|------|
| Wrapper Background | 0 | Dark charcoal background |
| Product Image | 1 | Positioned below text |
| Quote Text | 2 | Above image |
| Caption Text | 2 | Above image |

## Accessibility

### Color Contrast

**Quote Text on Dark Background:**
- Foreground: `#FFFAF5` (Light Cream)
- Background: `#212121` (Dark Charcoal)
- Contrast Ratio: **14.8:1** (WCAG AAA - Passes all levels)

**Caption Text on Dark Background:**
- Foreground: `#FFFAF5` (Light Cream)
- Background: `#212121` (Dark Charcoal)
- Contrast Ratio: **14.8:1** (WCAG AAA - Passes all levels)

### Font Size Accessibility

- **Desktop Quote (40px):** Well above minimum for readability
- **Desktop Caption (30px):** Large enough for easy reading
- **Mobile Quote (24px):** Meets minimum recommended size
- **Mobile Caption (20px):** Acceptable for short text

## Notes for Developers

### 1. Quote Text Container Width

The quote text container has **fixed width** on desktop (704px) but **must adapt responsively** while maintaining 8-divisibility. Use media queries to progressively reduce width at each breakpoint.

```css
.custom-diamension-before-footer-hero__quote {
  width: 704px; /* Desktop */
}

@media (max-width: 1199px) {
  .custom-diamension-before-footer-hero__quote {
    width: 576px; /* Tablet landscape */
  }
}

@media (max-width: 1023px) {
  .custom-diamension-before-footer-hero__quote {
    width: 512px; /* Tablet */
  }
}

/* Continue for all breakpoints... */
```

### 2. Image Offset Positioning

Use CSS custom property for dynamic offset control:

```liquid
<div
  class="custom-diamension-before-footer-hero__image-wrapper"
  style="--image-offset: {{ section.settings.image_offset }}px;"
>
```

```css
.custom-diamension-before-footer-hero__image-wrapper {
  position: absolute;
  bottom: var(--image-offset, -128px);
  left: 50%;
  transform: translateX(-50%);
}
```

### 3. Center Alignment

**Quote and Caption Centering:**
```css
.custom-diamension-before-footer-hero__quote,
.custom-diamension-before-footer-hero__caption {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
```

### 4. Container Height Adaptation

Desktop has fixed 672px height, but tablet and mobile should adapt to content:

```css
.custom-diamension-before-footer-hero__container {
  min-height: 672px;
}

@media (max-width: 1024px) {
  .custom-diamension-before-footer-hero__container {
    min-height: auto;
    padding: 80px 40px;
  }
}

@media (max-width: 767px) {
  .custom-diamension-before-footer-hero__container {
    padding: 60px 20px;
  }
}
```

### 5. Image Aspect Ratio Maintenance

Ensure image maintains 1:1 aspect ratio:

```css
.custom-diamension-before-footer-hero__image {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}
```

---

**Ready to implement?** Proceed to `03-implementation.md` for code examples and step-by-step development guide.
