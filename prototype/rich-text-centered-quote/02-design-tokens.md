# Rich Text Centered Quote - Design Tokens

## Color Tokens

| Token Name | Hex Value | Usage | Customizable |
|------------|-----------|-------|--------------|
| `background-color` | `#FFFAF5` | Section background (warm off-white) | Yes - Schema setting |
| `text-color` | `#183754` | Text content color (deep blue) | Yes - Schema setting |

### Color Notes
- Both colors are customizable via schema settings
- Default values match Figma design specifications
- No hover states or color variations needed (static display)

---

## Typography Tokens

### Font Family
- **Primary Font**: Neue Haas Grotesk Display Pro
- **Weight**: 400 (Roman)
- **Font File**: `assets/fonts/neue-haas-display/NeueHaasDisplay-Roman.woff2`
- **Fallback**: `sans-serif`
- **Status**: Already available in theme assets

### Responsive Typography Scale

| Breakpoint | Font Size | Line Height | Width Constraint | Notes |
|------------|-----------|-------------|------------------|-------|
| **Desktop (1440px)** | `40px` | `45px` | `675px` (max-width) | Base design - matches Figma exactly |
| **Tablet (1024px)** | `32px` | `38px` | `80vw` | 20% reduction from desktop |
| **Mobile (767px)** | `24px` | `30px` | `90vw` | Content must fit in 5 lines max |
| **Small Mobile (375px)** | `20px` | `26px` | `95vw` | Content must fit in 5 lines max |

### Typography Notes
- Font sizes are FIXED and not customizable via schema
- Line-height ratios maintain consistent text density:
  - Desktop: 1.125 (45/40)
  - Tablet: 1.1875 (38/32)
  - Mobile: 1.25 (30/24)
  - Small Mobile: 1.3 (26/20)
- Text alignment is hardcoded to `center` (not customizable)
- Font weight remains 400 at all breakpoints

---

## Spacing Tokens

### Section-Level Spacing

| Element | Desktop (1440px) | Tablet (1024px) | Mobile (767px) | Small Mobile (375px) |
|---------|------------------|-----------------|----------------|----------------------|
| **Section Height** | `605px` | `605px` | `605px` | `605px` |
| **Section Max-Width** | `1440px` | `1440px` | `1440px` | `1440px` |
| **Section Margin** | `0 auto` | `0 auto` | `0 auto` | `0 auto` |

### Content-Level Spacing

| Element | Desktop (1440px) | Tablet (1024px) | Mobile (767px) | Small Mobile (375px) |
|---------|------------------|-----------------|----------------|----------------------|
| **Content Max-Width** | `675px` | `80vw` | `90vw` | `95vw` |
| **Content Padding** | `0` | `0` | `0` | `0` |
| **Text Alignment** | `center` | `center` | `center` | `center` |

### Spacing Notes

#### Critical Constraint: Fixed Height
- Section height is **FIXED at 605px** for ALL breakpoints
- This is non-negotiable and does not change for mobile
- Content is vertically centered using flexbox within this fixed container

#### Container Behavior
- Container max-width prevents stretching beyond 1440px
- `margin: 0 auto` centers the container horizontally
- No padding on the container itself

#### Content Width Strategy
- Desktop: Fixed max-width of 675px for optimal line length
- Tablet: Responsive 80vw allows content to breathe
- Mobile: 90vw accommodates smaller screens
- Small Mobile: 95vw maximizes available space

#### No Additional Spacing
- No top/bottom padding (height is fixed at 605px)
- No left/right padding (content width handles spacing)
- No gaps or margins between elements (single text block)

---

## Layout Tokens

### Flexbox Configuration

| Property | Value | Purpose |
|----------|-------|---------|
| `display` | `flex` | Enable flexbox layout |
| `align-items` | `center` | Vertical centering |
| `justify-content` | `center` | Horizontal centering |
| `flex-direction` | `column` | Stack content vertically (single element) |

### Container Configuration

| Property | Value | Purpose |
|----------|-------|---------|
| `max-width` | `1440px` | Prevent stretch on ultra-wide displays |
| `margin` | `0 auto` | Horizontal centering |
| `width` | `100%` | Full-width until max-width reached |
| `height` | `605px` | Fixed height constraint |

---

## Responsive Breakpoints Reference

```css
/* Base: 1440px Desktop */
.custom-section-rich-text-centered-quote { }

/* Large Desktop: 1441px+ */
@media (min-width: 1441px) {
  /* Container constraint - prevent stretch beyond 1440px */
}

/* Tablet: 1024px and below */
@media (max-width: 1024px) {
  /* Typography: 32px/38px, Width: 80vw */
}

/* Mobile: 767px and below */
@media (max-width: 767px) {
  /* Typography: 24px/30px, Width: 90vw */
}

/* Small Mobile: 375px and below */
@media (max-width: 375px) {
  /* Typography: 20px/26px, Width: 95vw */
}
```

---

## Design Token Summary

### Token Categories
1. **Colors**: 2 tokens (background, text) - both customizable
2. **Typography**: 5 tokens (font-family, weight, 4 breakpoint sizes)
3. **Spacing**: 3 tokens (section height, max-width, content width)
4. **Layout**: 2 tokens (flexbox centering, container config)

### Customizable vs. Fixed

**Customizable via Schema:**
- Text content (textarea)
- Background color (color picker)
- Text color (color picker)

**Fixed (Hardcoded in CSS):**
- Section height (605px)
- Font family (Neue Haas Grotesk Display Pro)
- Font weight (400)
- Font sizes at all breakpoints
- Text alignment (center)
- Container max-width (1440px)
- Content max-widths per breakpoint

---

## Implementation Notes

### Color Application
```liquid
style="background-color: {{ section.settings.background_color }}; color: {{ section.settings.text_color }};"
```

### Font Loading
Font is already loaded globally in theme - no additional @font-face needed.

### Responsive Width Strategy
Use CSS custom properties or direct media queries - content width changes at each breakpoint to maintain optimal readability.

### Height Constraint Warning
Users should be informed that content length is limited by the fixed 605px height and 5-line mobile constraint. Excessively long text may overflow on mobile devices.

---

## Token Validation Checklist

- [x] All color values match Figma specifications
- [x] Typography scales proportionally across breakpoints
- [x] Spacing maintains visual hierarchy at all sizes
- [x] Fixed height constraint is clearly documented
- [x] Container max-width prevents ultra-wide stretching
- [x] Content width strategy accommodates all screen sizes
- [x] Font files are confirmed available in assets
- [x] Responsive breakpoints follow project standards
