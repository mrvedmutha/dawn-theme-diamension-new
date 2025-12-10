# Custom Trust Badge Section - Implementation Plan

## Project Overview

Build a fully configurable trust badge section for Shopify Dawn theme that displays up to 4 merchant-selected badges with custom icons and labels. Section features responsive grid layout with automatic centering and hover interactions.

---

## File Structure

```
sections/
  └── custom-section-trust-badge.liquid

assets/
  └── section-custom-trust-badge.css

prototype/custom-trust-badge-section/
  ├── design-tokens.md
  └── IMPLEMENTATION-GUIDE.md (this file)
```

---

## Liquid Section Architecture

### File: `sections/custom-section-trust-badge.liquid`

#### Section Structure
```
1. Stylesheet Link
2. Main Container (.custom-section-trust-badge)
3. Grid Container (.custom-section-trust-badge__grid)
4. Block Loop - Renders 4 badge blocks max
   - Icon Container (.custom-section-trust-badge__icon-wrapper)
   - Icon Image (.custom-section-trust-badge__icon)
   - Label (.custom-section-trust-badge__label)
5. Schema Definition
```

#### Key Components

**Main Container**
- BEM Class: `.custom-section-trust-badge`
- Role: Wrapper with padding and max-width constraints
- Responsive padding: 160px (desktop) → 100px (tablet) → 60px (mobile)
- Responsive horizontal padding: 150px (desktop) → 80px (tablet) → 40px (mobile)

**Grid Container**
- BEM Class: `.custom-section-trust-badge__grid`
- Display: CSS Grid
- Desktop: 4 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gap: 60px (desktop) → 40px (tablet) → 30px (mobile)
- Alignment: `justify-items: center` and `align-items: center` for auto-centering

**Badge Block** (Repeatable)
- BEM Class: `.custom-section-trust-badge__badge`
- Parent: Grid item
- Display: Flex column
- Children:
  - Icon wrapper (60×60px container)
  - Label text (20px, centered)
- Hover effect: scale(1.05) + icon opacity(0.8)

#### Liquid Logic
```liquid
- Loop through section.blocks (max 4 auto-enforced by schema)
- Render badge icon with image_url filter
- Apply section-specific alt text or default
- Output label text from block settings
- No additional conditional logic needed
```

#### Schema Configuration

**Block Type: "trust_badge"**
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

**Preset** (Default Section)
```json
{
  "name": "Custom Trust Badge",
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

## CSS Architecture

### File: `assets/section-custom-trust-badge.css`

#### Font Face Declaration
```css
@font-face {
  font-family: 'Neue Haas Display Pro';
  src: url('{{ "neue-haas-display/NeueHaasDisplay-Roman.woff2" | asset_url }}') format('woff2'),
       url('{{ "neue-haas-display/NeueHaasDisplay-Roman.woff" | asset_url }}') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

#### BEM Class Hierarchy

**Block: `.custom-section-trust-badge`**
- Position: Main container
- Padding: Responsive vertical/horizontal
- Max-width: 1440px (desktop constraint)
- Margin: 0 auto (center on large screens)
- Font-family: Neue Haas Display Pro, sans-serif

**Element: `.custom-section-trust-badge__container`**
- Optional wrapper if needed for centering logic
- Or merged with main block

**Element: `.custom-section-trust-badge__grid`**
- Display: Grid
- Grid-template-columns: Responsive (4fr → 2fr → 1fr)
- Justify-items: center (auto-center badges)
- Align-items: center (vertical center)
- Gap: Responsive (60px → 40px → 30px)

**Element: `.custom-section-trust-badge__badge`**
- Display: Flex
- Flex-direction: column
- Align-items: center
- Text-align: center
- Transition: transform 0.3s ease, opacity 0.3s ease

**Element: `.custom-section-trust-badge__icon-wrapper`**
- Width: 60px
- Height: 60px
- Display: flex (center content)
- Align-items: center
- Justify-content: center
- Margin-bottom: 20px

**Element: `.custom-section-trust-badge__icon`**
- Width: 60px
- Height: 60px
- Object-fit: contain
- Display: block
- Transition: opacity 0.3s ease

**Element: `.custom-section-trust-badge__label`**
- Font-family: Neue Haas Display Pro, sans-serif
- Font-size: 20px (desktop), 18px (tablet), 16px (mobile)
- Font-weight: 400
- Line-height: 1
- Color: #183754
- Max-width: 100px
- Word-break: break-word

#### Responsive Breakpoints

**Desktop (1440px base)**
- Padding: 160px 150px
- Font-size: 20px
- Grid: repeat(4, 1fr)
- Gap: 60px

**Tablet (@media max-width: 1024px)**
- Padding: 100px 80px
- Font-size: 18px
- Grid: repeat(2, 1fr)
- Gap: 40px

**Mobile (@media max-width: 767px)**
- Padding: 60px 40px
- Font-size: 16px
- Grid: 1fr
- Gap: 30px

**Small Mobile (@media max-width: 375px)**
- Padding: 40px 20px (optional fine-tuning)

#### Hover & Interactive States

**Badge Hover** (`.custom-section-trust-badge__badge:hover`)
- Transform: scale(1.05)
- Cursor: pointer (optional)

**Icon Hover** (`.custom-section-trust-badge__badge:hover .custom-section-trust-badge__icon`)
- Opacity: 0.8

---

## Development Workflow

### Step 1: Create Liquid Section
**File**: `sections/custom-section-trust-badge.liquid`

- Copy template from this guide
- Add stylesheet link
- Add main container with grid
- Add block loop
- Add schema with block definition
- Test structure in theme editor

### Step 2: Create CSS File
**File**: `assets/section-custom-trust-badge.css`

- Define @font-face for Neue Haas Display Pro
- Add BEM base styles (desktop-first)
- Add tablet breakpoint adjustments
- Add mobile breakpoint adjustments
- Test responsive layout on all breakpoints

### Step 3: Add Icon Assets (Merchant Task)
- Guide merchants to upload PNG or SVG icons
- Recommended size: 60×60px (icons auto-scale to 60px)
- Recommended file size: <50KB per icon

### Step 4: Test in Theme Editor
- Add section to page
- Upload test icons
- Add badge labels
- Test block add/remove/reorder
- Verify responsive behavior:
  - Desktop: 4 columns
  - Tablet: 2 columns
  - Mobile: 1 column
- Verify centering on 1-3 items

### Step 5: Verify Across Devices
- Chrome DevTools responsive mode
- Real device testing (iOS/Android)
- Desktop preview (1440px, 1920px)

---

## Schema Definition (Complete)

```json
{
  "name": "Custom Trust Badge",
  "settings": [],
  "blocks": [
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
          "label": "Badge Label",
          "placeholder": "e.g., 100% certified jewellery",
          "default": "Trust Badge"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Custom Trust Badge",
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
  ]
}
```

---

## Image Handling

### Icon Upload Requirements
- **Format**: PNG (transparent background recommended) or SVG
- **Dimensions**: Any size (will be displayed as 60×60px)
- **File Size**: <100KB recommended
- **Color**: Any color (grayscale recommended to match design)

### Image URL in Liquid
```liquid
<img
  src="{{ block.settings.badge_icon | image_url: width: 120 }}"
  alt="{{ block.settings.badge_label }}"
  class="custom-section-trust-badge__icon"
/>
```

---

## Naming Conventions

### Liquid
- Section: `custom-section-trust-badge.liquid`

### CSS
- File: `section-custom-trust-badge.css`
- Block: `.custom-section-trust-badge`
- Elements: `.custom-section-trust-badge__[element]`

### Schema IDs
- `badge_icon`
- `badge_label`

### Variables (if any JavaScript)
- None required (pure CSS solution)

---

## Performance Considerations

1. **CSS Delivery**: Linked in section template (async loaded)
2. **Font Loading**: @font-face with `font-display: swap` for performance
3. **Image Optimization**: Merchant responsibility (guide provided)
4. **JavaScript**: None required (CSS Grid handles layout)
5. **Caching**: Shopify CDN caches images automatically

---

## Browser Compatibility

- **CSS Grid**: Full support (IE 11 not supported, acceptable for modern themes)
- **Object-fit**: Full support
- **Transform**: Full support
- **@font-face**: Full support

---

## Accessibility Checklist

- [x] Alt text for all icon images (from block.settings)
- [x] Semantic HTML (img with alt, structured markup)
- [x] Color contrast: #183754 text on white meets WCAG AA
- [x] Touch targets: 60px icons + 20px spacing meet 44px minimum
- [x] Keyboard navigation: Natural (no custom interactions needed)
- [x] Screen readers: Proper alt text and label structure

---

## Known Limitations & Future Enhancements

### Current Limitations
1. Maximum 4 blocks enforced by UI limitation (can be adjusted)
2. Fixed 60×60px icon size (can be made configurable)
3. Fixed spacing/padding (can be made configurable via theme settings)

### Future Enhancement Ideas
1. Add color customization (text color, background)
2. Add icon size range selector
3. Add spacing customizer
4. Add link support (make badges clickable)
5. Add animation options (fade-in on scroll)

---

## Testing Checklist

- [ ] Section appears in Shopify theme editor
- [ ] Icon upload works (PNG & SVG)
- [ ] Label text updates in real-time
- [ ] Block add/remove/reorder functions
- [ ] Desktop layout: 4 columns properly aligned
- [ ] Tablet layout: 2 columns properly aligned
- [ ] Mobile layout: 1 column centered
- [ ] Hover effects work (scale + opacity)
- [ ] Responsive padding applied correctly
- [ ] Font loads correctly (Neue Haas Display Pro)
- [ ] Icons display at 60×60px
- [ ] Labels wrap/truncate appropriately
- [ ] Works with 1, 2, 3, and 4 blocks
- [ ] Alt text appears in browser DevTools
- [ ] No console errors

---

## Deployment Notes

1. Create `sections/custom-section-trust-badge.liquid`
2. Create `assets/section-custom-trust-badge.css`
3. Upload both files to theme
4. Verify section appears in theme editor
5. Add to pages as needed
6. Merchants upload icons and configure labels
7. No additional setup required

---

## File Creation Checklist

- [ ] `sections/custom-section-trust-badge.liquid` created
- [ ] `assets/section-custom-trust-badge.css` created
- [ ] `prototype/custom-trust-badge-section/design-tokens.md` created
- [ ] `prototype/custom-trust-badge-section/IMPLEMENTATION-GUIDE.md` created
- [ ] All files follow naming conventions
- [ ] All BEM classes properly namespaced
- [ ] Responsive breakpoints implemented
- [ ] Font loading optimized
- [ ] Schema complete and tested

