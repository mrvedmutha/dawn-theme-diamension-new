# Custom Trust Badge Section - Design Tokens

## 🎨 Figma Design Reference

**Design Source**: [Diamension - Dev - FINAL](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-4757&m=dev)

**Node ID**: `12:4757`

**Frame Name**: Trust Badges Section

⚠️ **CRITICAL**: This implementation **MUST strictly follow the Figma design**. All typography, spacing, colors, sizing, and layout specifications are derived directly from the referenced Figma node. Any visual deviations from the Figma design are **NOT permitted** without explicit approval.

---

## 📋 Overview

Trust badge section displaying up to 4 benefits with merchant-uploaded icons (PNG/SVG) and labels. Fully configurable through Shopify admin with dynamic CSS Grid layout that automatically centers badges based on block count (1, 2, 3, or 4).

**Key Features:**
- 4 repeatable badge blocks (max)
- Merchant-uploaded badge icons (60px × 60px display)
- Merchant-defined badge label text
- Responsive grid: 4 columns (desktop) → 2 columns (tablet) → 1 column (mobile)
- Auto-centered layout for any number of badges
- Light background color (#FFFAF5)
- Neue Haas Display Pro typography
- Smooth hover interactions

---

## 🎯 Section Container Sizing

### Desktop (1440px base - Figma default)
| Property | Value | Notes |
|----------|-------|-------|
| **Max Width** | `1440px` | Matches Figma canvas width |
| **Padding Top** | `160px` | As per Figma design |
| **Padding Bottom** | `160px` | As per Figma design |
| **Padding Left** | `150px` | As per Figma design |
| **Padding Right** | `150px` | As per Figma design |
| **Background Color** | `#FFFAF5` | Figma fill color (off-white/cream) |
| **Height** | `Auto` | Based on content |
| **Container Width** | `1440px` | Center on larger screens |

**Calculation for Desktop**:
- Available width after padding: `1440px - (150px + 150px) = 1140px`
- Grid with 4 columns and 60px gap: Each badge gets ~265px width
- Badge container: 60px icon + 20px gap + label text + spacing

### Tablet (1024px breakpoint)
| Property | Value | Notes |
|----------|-------|-------|
| **Max Width** | `1024px` | Tablet viewport |
| **Padding Top** | `100px` | Scaled down from desktop |
| **Padding Bottom** | `100px` | Scaled down from desktop |
| **Padding Left** | `80px` | Scaled down from desktop |
| **Padding Right** | `80px` | Scaled down from desktop |
| **Background Color** | `#FFFAF5` | Same as desktop |

**Calculation for Tablet**:
- Available width: `1024px - (80px + 80px) = 864px`
- Grid with 2 columns and 40px gap: Each badge gets ~412px width
- Better readability on smaller screens

### Mobile (767px breakpoint)
| Property | Value | Notes |
|----------|-------|-------|
| **Max Width** | `100%` | Full viewport width |
| **Padding Top** | `60px` | Minimal vertical padding |
| **Padding Bottom** | `60px` | Minimal vertical padding |
| **Padding Left** | `40px` | Minimal horizontal padding |
| **Padding Right** | `40px` | Minimal horizontal padding |
| **Background Color** | `#FFFAF5` | Same as desktop |

**Calculation for Mobile**:
- Available width: `viewport - 80px (padding)`
- Grid with **2 columns** (same as tablet): 2×2 grid on mobile
- Better readability with 2 badges per row instead of single column

---

## 🔤 Typography (Exactly as per Figma Node 12:4757)

### Badge Label Text
| Property | Value | Source | Notes |
|----------|-------|--------|-------|
| **Font Family** | `Neue Haas Grotesk Display Pro` | Figma | Matches Figma typography |
| **Font Weight** | `400` | Figma: Roman | Light regular weight |
| **Font Size - Desktop** | `20px` | Figma: 20px | As shown in Figma frame |
| **Font Size - Tablet** | `18px` | Derived | Scaled down proportionally |
| **Font Size - Mobile** | `16px` | Derived | Further scaled for readability |
| **Line Height** | `20px` (1.0) | Figma: 20px | Tight spacing as per design |
| **Text Color** | `#183754` | Figma: Dark Blue | Dark navy/teal color |
| **Text Align** | `center` | Figma | Center aligned badges |
| **Letter Spacing** | `0px` | Figma | Default spacing |

### Typography Scale (Responsive)
```
Desktop:  20px (1.25rem)
Tablet:   18px (1.125rem)  
Mobile:   16px (1rem)
```

### Font File Reference
**Path**: `assets/fonts/neue-haas-display/`

- **File Used**: `NeueHaasDisplay-Roman.woff2` (Primary)
- **Fallback**: `NeueHaasDisplay-Roman.woff` (Older browsers)
- **System Fallback**: `sans-serif`
- **Font Display**: `swap` (Show fallback while loading)

---

## 🎨 Colors

### Primary Color Palette
| Token | Color Code | RGB | Usage | Source |
|-------|-----------|-----|-------|--------|
| **Text Color** | `#183754` | rgb(24, 55, 84) | Badge labels | Figma |
| **Background Color** | `#FFFAF5` | rgb(255, 250, 245) | Section background | Figma |
| **Fallback BG** | `#FFFFFF` | rgb(255, 255, 255) | If #FFFAF5 not applied | Design |

### Color Usage
- **Section Background**: `#FFFAF5` (warm off-white/cream - must be applied to container)
- **Label Text**: `#183754` (dark teal/navy)
- **Icon Color**: Depends on merchant upload (usually grayscale/outline icons)

### Hover States & Interactions
| Element | Property | Value | Effect |
|---------|----------|-------|--------|
| Badge Block | `transform` | `scale(1.05)` | Subtle zoom on hover |
| Badge Icon | `opacity` | `0.8` | Slight transparency on hover |
| Transition | `duration` | `0.3s ease` | Smooth animation |

---

## 📐 Layout & Grid Specifications

### Grid Container
| Property | Desktop | Tablet | Mobile | Notes |
|----------|---------|--------|--------|-------|
| **Display** | `grid` | `grid` | `grid` | CSS Grid layout |
| **Columns** | `repeat(4, 1fr)` | `repeat(2, 1fr)` | `repeat(2, 1fr)` | 4 columns (desktop), 2 columns (tablet & mobile) |
| **Gap** | `60px` | `40px` | `30px` | Column spacing |
| **Align Items** | `center` | `center` | `center` | Vertical center |
| **Justify Items** | `center` | `center` | `center` | Horizontal center |

### Badge Block Container
| Property | Value | Notes |
|----------|-------|-------|
| **Display** | `flex` | Flexbox for internal layout |
| **Flex Direction** | `column` | Stack icon above text |
| **Align Items** | `center` | Center content horizontally |
| **Gap** | `20px` | Space between icon and text |
| **Text Align** | `center` | Center badge text |
| **Max Width** | `120px` | Max width of label area |

### Icon Container (Wrapper)
| Property | Value | Figma Dimension | Notes |
|----------|-------|-----------------|-------|
| **Width** | `60px` | 60px × 60px | Exact Figma size |
| **Height** | `60px` | 60px × 60px | Square container |
| **Display** | `flex` | - | Center icon content |
| **Align Items** | `center` | - | Vertical centering |
| **Justify Content** | `center` | - | Horizontal centering |
| **Margin Bottom** | `20px` | - | Space before label text |

### Icon Image
| Property | Value | Notes |
|----------|-------|-------|
| **Width** | `60px` | Display size in Figma |
| **Height** | `60px` | Display size in Figma |
| **Object Fit** | `contain` | Preserve aspect ratio |
| **Display** | `block` | No inline spacing |
| **Max Width** | `60px` | Never exceed container |
| **Max Height** | `60px` | Never exceed container |

### Label Text Container
| Property | Value | Notes |
|----------|-------|-------|
| **Font Size** | 20px / 18px / 16px | Responsive sizes |
| **Font Family** | Neue Haas Display Pro | As per Figma |
| **Color** | `#183754` | Dark teal as per Figma |
| **Line Height** | `20px` | Tight spacing |
| **Max Width** | `100px` | Prevent very long text |
| **Word Wrap** | `break-word` | Handle long labels |
| **Text Align** | `center` | Center aligned |

---

## 📦 Icon & Image Specifications

### Icon Upload Requirements (Merchant Guidelines)
| Property | Value | Example |
|----------|-------|---------|
| **Accepted Formats** | PNG, SVG | badge-icon.png, badge-icon.svg |
| **Recommended Size** | 60px × 60px | Square aspect ratio |
| **Actual Display Size** | 60px × 60px | Fixed in CSS |
| **Background** | Transparent | Recommended for PNG |
| **File Size** | < 50KB | For performance |
| **Color Style** | Outline / Grayscale | Matches Figma design |

### Image Rendering
- **Images uploaded**: Any size
- **CSS Display**: 60px × 60px (aspect ratio preserved via object-fit: contain)
- **Alt Text**: Using badge label text (e.g., "100% certified jewellery")
- **Lazy Loading**: Applied with `loading="lazy"` attribute

---

## 📱 Responsive Breakpoint Details

### Breakpoint 1: Desktop (1440px base - Figma default)
```
Width: 1440px (max)
Padding: 160px vertical, 150px horizontal
Grid: 4 columns
Gap: 60px
Font: 20px
Icon: 60px × 60px
Background: #FFFAF5
```
**Use Case**: Desktop browsers, tablets in landscape

### Breakpoint 2: Tablet (@media max-width: 1024px)
```
Width: 1024px
Padding: 100px vertical, 80px horizontal
Grid: 2 columns
Gap: 40px
Font: 18px
Icon: 60px × 60px (same)
Background: #FFFAF5
```
**Use Case**: Tablets in portrait, smaller laptops

### Breakpoint 3: Mobile (@media max-width: 767px)
```
Width: 100% (full viewport minus padding)
Padding: 60px vertical, 40px horizontal
Grid: 2 columns (same as tablet)
Gap: 30px
Font: 16px
Icon: 60px × 60px (same)
Background: #FFFAF5
```
**Use Case**: Mobile phones, small screens (2×2 grid for 4 items, 2×1 for 2 items)

### Breakpoint 4: Small Mobile (@media max-width: 375px) - Optional Fine-tuning
```
Width: 100% (full viewport minus minimal padding)
Padding: 40px vertical, 20px horizontal (optional)
Grid: 2 columns (same as tablet and mobile)
Font: 16px (same as mobile)
Icon: 60px × 60px (same)
Background: #FFFAF5
```
**Use Case**: Extra small phones (iPhone SE, older devices)

---

## 🔌 Center Alignment Logic

### How Auto-Centering Works
CSS Grid naturally centers content when:
- Fewer items than columns
- `justify-items: center` applied to container
- No explicit width constraints on grid items

### Examples:
- **4 Blocks + 4 Columns** → Full width grid (all cells filled)
- **3 Blocks + 4 Columns (Desktop)** → 3 items centered with gap
- **3 Blocks + 2 Columns (Tablet)** → 2 in row 1, 1 centered in row 2
- **1 Block** → Single centered item (width of container)

**No JavaScript required** - Pure CSS Grid handles alignment.

---

## 🏛️ BEM Class Structure

### Block (Main Container)
```css
.custom-section-trust-badge
```

### Elements (Sub-components)
```css
.custom-section-trust-badge__container      /* Wrapper for grid */
.custom-section-trust-badge__grid           /* Grid container */
.custom-section-trust-badge__badge          /* Individual badge block */
.custom-section-trust-badge__icon-wrapper   /* Icon container (60×60) */
.custom-section-trust-badge__icon           /* Icon image element */
.custom-section-trust-badge__label          /* Label text container */
```

### Modifiers (Optional - for item count styling)
```css
.custom-section-trust-badge--1-item
.custom-section-trust-badge--2-items
.custom-section-trust-badge--3-items
.custom-section-trust-badge--4-items
```

---

## 📋 Schema & Block Settings

### Section-Level Settings
```json
{
  "name": "Custom Trust Badge",
  "settings": []
}
```

### Block-Level Settings (Repeatable - Max 4)
```json
{
  "type": "trust_badge",
  "name": "Trust Badge",
  "settings": [
    {
      "type": "image_picker",
      "id": "badge_icon",
      "label": "Badge Icon (PNG or SVG)"
    },
    {
      "type": "text",
      "id": "badge_label",
      "label": "Badge Label Text",
      "placeholder": "e.g., 100% certified jewellery",
      "default": "Trust Badge"
    }
  ]
}
```

### Preset (Default Content)
```json
{
  "name": "Trust Badge Section",
  "blocks": [
    {
      "type": "trust_badge",
      "settings": {
        "badge_label": "100% certified jewellery"
      }
    },
    {
      "type": "trust_badge",
      "settings": {
        "badge_label": "15 days easy return"
      }
    },
    {
      "type": "trust_badge",
      "settings": {
        "badge_label": "lifetime exchange"
      }
    },
    {
      "type": "trust_badge",
      "settings": {
        "badge_label": "lifetime warrenty"
      }
    }
  ]
}
```

---

## ✨ Visual Specifications from Figma

### Section Frame Dimensions (Figma Node 12:4757)
- **Width**: 1440px (Figma canvas)
- **Height**: Auto (content-based)
- **Background**: `#FFFAF5` (must apply to section container)

### Spacing from Figma
- **Top Padding**: 160px (measured in Figma)
- **Bottom Padding**: 160px (measured in Figma)
- **Left Padding**: 150px (measured in Figma)
- **Right Padding**: 150px (measured in Figma)

### Icon Specifications from Figma
- **Icon Size**: 60px × 60px (exact from Figma)
- **Icon Gap to Text**: 20px (measured in Figma)
- **Icons Used in Figma**:
  - noun-warranty-6897097 (shield icon)
  - Group1410082395 (box/return icon)
  - Group87 (certificate icon)
  - Vector (diamond icon)

### Typography from Figma
- **Font**: Neue Haas Grotesk Display Pro
- **Weight**: 55 Roman (400 equivalent)
- **Size**: 20px
- **Line Height**: 20px
- **Color**: #183754
- **Text Alignment**: center

---

## ✅ Design Compliance Checklist

- [ ] Section background is exactly `#FFFAF5`
- [ ] Icon size is exactly 60px × 60px (not 64px or 50px)
- [ ] Icon margin/gap is exactly 20px below icon
- [ ] Top padding is 160px on desktop
- [ ] Bottom padding is 160px on desktop
- [ ] Left padding is 150px on desktop
- [ ] Right padding is 150px on desktop
- [ ] Font is Neue Haas Display Pro (Roman/400 weight)
- [ ] Font size is 20px on desktop
- [ ] Text color is exactly `#183754`
- [ ] Grid is 4 columns on desktop
- [ ] Grid is 2 columns on tablet
- [ ] Grid is 1 column on mobile
- [ ] Badges are center-aligned (both vertically and horizontally)
- [ ] Icon and label are center-stacked (flex column)
- [ ] Hover effects are smooth (0.3s ease)
- [ ] Responsive padding scales proportionally
- [ ] All responsive breakpoints tested against Figma design

---

## 🚀 Implementation Notes

1. **Follow Figma Exactly**: This section must match the Figma design pixel-perfect. Use the design tokens as the source of truth.
2. **Color Code**: The background color `#FFFAF5` is critical - it's not white (#FFFFFF) but a warm off-white.
3. **Typography**: Neue Haas Grotesk Display Pro must be loaded. Use the font files from `assets/fonts/neue-haas-display/`.
4. **Icon Sizing**: Icons are always displayed at 60×60px. Merchant uploads any size, CSS scales to 60px.
5. **Responsive**: Test all three breakpoints (1440px, 1024px, 767px) to ensure layout matches Figma.
6. **No JavaScript**: Layout is pure CSS Grid - no JavaScript needed.
7. **Accessibility**: Apply alt text from badge label for each icon.

---

## 📞 Design Reference Contact

For any questions or clarifications about the design:
- **Figma File**: [Diamension - Dev - FINAL](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-4757&m=dev)
- **Node ID**: `12:4757`
- **Open in Figma**: Click the link above to view the original design

---

**Last Updated**: December 10, 2025
**Design Source**: Figma Node 12:4757
**Status**: Ready for Implementation
