# Custom Trust Badge Section - Design Tokens

## Overview
Trust badge section displaying up to 4 benefits with merchant-uploaded icons and labels. Fully configurable through Shopify admin with dynamic grid layout based on number of blocks.

---

## Typography

### Badge Label Text
| Token | Value | Usage |
|-------|-------|-------|
| `font-family` | `Neue Haas Display Pro` | Badge labels |
| `font-size` | `20px` | Desktop label text |
| `font-weight` | `400` (Roman) | Regular weight |
| `line-height` | `20px` (1) | Tight line height |
| `color` | `#183754` | Dark blue label text |
| `text-align` | `center` | Center aligned badges |

### Typography Responsive
| Breakpoint | Font Size | Line Height |
|-----------|-----------|-------------|
| Desktop (1440px+) | `20px` | `20px` |
| Tablet (≤1024px) | `18px` | `18px` |
| Mobile (≤767px) | `16px` | `16px` |

---

## Spacing & Layout

### Section Container
| Property | Desktop | Tablet | Mobile |
|----------|---------|--------|--------|
| `padding-top` | `160px` | `100px` | `60px` |
| `padding-bottom` | `160px` | `100px` | `60px` |
| `padding-left` | `150px` | `80px` | `40px` |
| `padding-right` | `150px` | `80px` | `40px` |
| `max-width` | `1440px` | `1440px` | `100%` |

### Grid Layout
| Property | Desktop | Tablet | Mobile |
|----------|---------|--------|--------|
| `grid-template-columns` | `repeat(4, 1fr)` | `repeat(2, 1fr)` | `1fr` |
| `gap` | `60px` | `40px` | `30px` |
| `align-items` | `center` | `center` | `center` |
| `justify-items` | `center` | `center` | `center` |

### Badge Block Spacing
| Property | Value |
|----------|-------|
| `gap` (icon to text) | `20px` |
| `icon-margin-bottom` | `20px` |
| `text-max-width` | `100px` |

---

## Icons & Images

### Icon Dimensions
| Property | Value |
|----------|-------|
| `icon-size` | `60px` × `60px` |
| `icon-object-fit` | `contain` |
| `icon-display` | `block` |

### Icon Container
| Property | Value |
|----------|-------|
| `width` | `60px` |
| `height` | `60px` |
| `margin` | `0 auto 20px` |

### Image Upload Format
| Property | Value |
|----------|-------|
| `accepted-formats` | `PNG, SVG` |
| `max-dimensions` | `120px × 120px` recommended |
| `alt-text` | Merchant-provided (badge label) |

---

## Colors

### Primary Colors
| Token | Color Code | Usage |
|-------|-----------|-------|
| `text-color` | `#183754` | Badge label text |
| `background-color` | `transparent` | Section background (inherits page) |

### Hover States
| Element | Property | Value |
|---------|----------|-------|
| Badge Icon | `opacity` | `0.8` on hover |
| Badge Block | `transform` | `scale(1.05)` on hover |

---

## Grid Alignment Logic

### Center Alignment Rules
The grid automatically centers badges based on block count:

- **4 Blocks**: Full width grid (4 columns desktop, 2 tablet)
- **3 Blocks**: Centered with gaps (grid naturally centers)
- **2 Blocks**: Centered with gaps (grid naturally centers)
- **1 Block**: Single centered item

**Implementation**: CSS Grid with `justify-items: center` on container handles auto-centering without JavaScript.

---

## Font Reference

### Neue Haas Display Pro
- **Weight**: 400 (Roman)
- **File Path**: `assets/fonts/neue-haas-display/`
- **Fallback**: `sans-serif`
- **Loading**: Via `@font-face` in section CSS

---

## BEM Class Structure

### Block
```
.custom-section-trust-badge
```

### Elements
```
.custom-section-trust-badge__container
.custom-section-trust-badge__grid
.custom-section-trust-badge__badge
.custom-section-trust-badge__icon-wrapper
.custom-section-trust-badge__icon
.custom-section-trust-badge__label
```

### Modifiers
```
.custom-section-trust-badge--1-item
.custom-section-trust-badge--2-items
.custom-section-trust-badge--3-items
.custom-section-trust-badge--4-items
```

---

## Schema Settings

### Block Settings (Repeatable)
```json
{
  "type": "trust_badge",
  "name": "Trust Badge",
  "settings": [
    {
      "type": "image_picker",
      "id": "badge_icon",
      "label": "Badge Icon (PNG/SVG)"
    },
    {
      "type": "text",
      "id": "badge_label",
      "label": "Badge Label",
      "placeholder": "e.g., 100% certified jewellery"
    }
  ]
}
```

---

## Responsive Behavior

### Desktop (1440px+)
- 4 columns
- Large padding (150px sides, 160px top/bottom)
- 20px font size
- 60px gap between columns

### Tablet (768px - 1024px)
- 2 columns
- Medium padding (80px sides, 100px top/bottom)
- 18px font size
- 40px gap between columns

### Mobile (≤767px)
- 1 column (single centered)
- Small padding (40px sides, 60px top/bottom)
- 16px font size
- 30px gap (N/A for 1 column)

---

## Accessibility

- **Alt Text**: Merchant-provided alt text for each icon
- **Semantic HTML**: Proper heading hierarchy
- **Color Contrast**: #183754 on white meets WCAG AA standards
- **Touch Targets**: Minimum 44px height for badges (icon + label)

---

## Performance

- **Image Optimization**: Merchants should upload optimized PNG/SVG files
- **CSS Delivery**: Inline in section stylesheet
- **JavaScript**: None required (pure CSS Grid)
- **Font Loading**: Async load Neue Haas Display Pro

---

## Notes

- Grid automatically centers content via CSS Grid properties
- No max items validation needed (4 blocks hard limit in schema)
- Smooth transitions on hover for better UX
- All spacing scales proportionally with breakpoints
