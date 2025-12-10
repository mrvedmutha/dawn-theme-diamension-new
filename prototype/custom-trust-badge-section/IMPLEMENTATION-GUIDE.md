# Custom Trust Badge Section - Implementation Plan

## 🎨 Figma Design Reference

**Design Source**: [Diamension - Dev - FINAL](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-4757&m=dev)

**Node ID**: `12:4757`

⚠️ **CRITICAL COMPLIANCE REQUIREMENT**: 
This implementation **MUST strictly follow the Figma design** at node 12:4757. Refer to `design-tokens.md` for all visual specifications including:
- **Background Color**: `#FFFAF5` (warm off-white, NOT #FFFFFF)
- **Typography**: Neue Haas Display Pro, 20px, #183754 color
- **Spacing**: 160px top/bottom, 150px left/right (desktop)
- **Icon Size**: Exactly 60px × 60px
- **Grid**: 4 columns (desktop) → 2 columns (tablet & mobile)
- **Gap**: 60px (desktop) → 40px (tablet) → 30px (mobile)

Any visual deviation from Figma must be explicitly approved before implementation.

---

## Project Overview

Build a fully configurable trust badge section for Shopify Dawn theme that displays up to 4 merchant-selected badges with custom icons (PNG/SVG) and labels. Section features:
- Responsive CSS Grid layout (4→2→2 columns)
- Automatic center-alignment for any badge count
- Light background color (#FFFAF5)
- Neue Haas Display Pro typography
- Smooth hover interactions (scale + opacity)
- Merchant-configurable icons and labels

**Design Base**: Figma node 12:4757 (Diamension - Dev - FINAL)

---

## File Structure

```
sections/
  └── custom-section-trust-badge.liquid

assets/
  └── section-custom-trust-badge.css

prototype/custom-trust-badge-section/
  ├── design-tokens.md                  (all visual specs from Figma)
  ├── IMPLEMENTATION-GUIDE.md          (this file)
```

---

## Liquid Section Architecture

### File: `sections/custom-section-trust-badge.liquid`

#### Section Structure
```
1. Stylesheet Link (section-custom-trust-badge.css)
2. Main Container (.custom-section-trust-badge)
   - Background: #FFFAF5
   - Padding: 160px 150px (desktop), responsive on smaller screens
3. Grid Container (.custom-section-trust-badge__grid)
   - Display: CSS Grid
   - 4 columns (desktop), 2 columns (tablet & mobile)
4. Block Loop - Renders up to 4 badge blocks
   - Icon Wrapper (.custom-section-trust-badge__icon-wrapper) - 60×60px
   - Icon Image (.custom-section-trust-badge__icon) - 60×60px
   - Label (.custom-section-trust-badge__label) - 20px text, #183754 color
5. Schema Definition (with block settings)
```

#### Key Components (Follow Figma Design)

**Main Container**
- **BEM Class**: `.custom-section-trust-badge`
- **Background Color**: `#FFFAF5` (exact from Figma - must not be #FFFFFF)
- **Responsive Padding**:
  - Desktop (1440px): 160px top/bottom, 150px left/right
  - Tablet (1024px): 100px top/bottom, 80px left/right
  - Mobile (767px): 60px top/bottom, 40px left/right
- **Max Width**: 1440px (center on larger screens)
- **Margin**: 0 auto (center on large displays)

**Grid Container**
- **BEM Class**: `.custom-section-trust-badge__grid`
- **Display**: CSS Grid
- **Columns**:
  - Desktop: `repeat(4, 1fr)` (4 equal columns)
  - Tablet: `repeat(2, 1fr)` (2 equal columns)
  - Mobile: `repeat(2, 1fr)` (2 equal columns, same as tablet)
- **Gap**: 60px (desktop) → 40px (tablet) → 30px (mobile)
- **Alignment**: `justify-items: center` and `align-items: center` (auto-centers badges)

**Badge Block** (Repeatable - max 4)
- **BEM Class**: `.custom-section-trust-badge__badge`
- **Display**: Flex (column direction)
- **Content Alignment**: Center horizontally and vertically
- **Gap Between Icon & Text**: 20px (as per Figma)
- **Children**:
  1. Icon wrapper (60×60px container, centered content)
  2. Label text (20px font, center aligned, #183754 color)
- **Hover Effects**: 
  - Badge: `transform: scale(1.05)` (subtle zoom)
  - Icon: `opacity: 0.8` (slight transparency)
  - Transition: `0.3s ease`

**Icon Container**
- **BEM Class**: `.custom-section-trust-badge__icon-wrapper`
- **Dimensions**: 60px × 60px (exact from Figma)
- **Display**: Flex (center icon content)
- **Margin Bottom**: 20px (space before label)

**Icon Image**
- **BEM Class**: `.custom-section-trust-badge__icon`
- **Display Size**: 60px × 60px (Figma specification)
- **Object Fit**: `contain` (preserve aspect ratio, no cropping)
- **Max Width**: 60px (never exceed container)
- **Max Height**: 60px (never exceed container)

**Label Text**
- **BEM Class**: `.custom-section-trust-badge__label`
- **Font Family**: Neue Haas Display Pro, sans-serif (as per Figma)
- **Font Size**:
  - Desktop: 20px (exact from Figma)
  - Tablet: 18px (proportional scale)
  - Mobile: 16px (proportional scale)
- **Font Weight**: 400 (Roman)
- **Color**: `#183754` (exact from Figma - dark teal)
- **Line Height**: 20px (tight spacing, as per Figma)
- **Text Align**: center
- **Max Width**: 100px (prevent very wide labels)
- **Word Wrap**: break-word (handle long text)

#### Liquid Logic
```liquid
{{ 'section-custom-trust-badge.css' | asset_url | stylesheet_tag }}

<div class="custom-section-trust-badge" style="background-color: #FFFAF5;">
  <div class="custom-section-trust-badge__grid">
    {% for block in section.blocks %}
      <div class="custom-section-trust-badge__badge">
        <div class="custom-section-trust-badge__icon-wrapper">
          <img 
            src="{{ block.settings.badge_icon | image_url: width: 120 }}" 
            alt="{{ block.settings.badge_label }}"
            class="custom-section-trust-badge__icon"
            loading="lazy"
          />
        </div>
        <p class="custom-section-trust-badge__label">
          {{ block.settings.badge_label }}
        </p>
      </div>
    {% endfor %}
  </div>
</div>

{% schema %}
{
  "name": "Custom Trust Badge",
  "blocks": [...]
}
{% endschema %}
```

#### Complete Schema Configuration

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
          "label": "Badge Label Text",
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

## CSS Architecture

### File: `assets/section-custom-trust-badge.css`

#### Font Face Declaration (Neue Haas Display Pro)
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

#### Base Styles (Desktop-First - 1440px)

**Block: `.custom-section-trust-badge`**
```css
.custom-section-trust-badge {
  max-width: 1440px;
  margin: 0 auto;
  padding: 160px 150px; /* As per Figma */
  background-color: #FFFAF5; /* Critical: warm off-white, not #FFFFFF */
  font-family: 'Neue Haas Display Pro', sans-serif;
}
```

**Element: `.custom-section-trust-badge__grid`**
```css
.custom-section-trust-badge__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columns desktop */
  gap: 60px; /* Column spacing */
  align-items: center; /* Vertical center */
  justify-items: center; /* Horizontal center (auto-centers badges) */
}
```

**Element: `.custom-section-trust-badge__badge`**
```css
.custom-section-trust-badge__badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.custom-section-trust-badge__badge:hover {
  transform: scale(1.05);
}
```

**Element: `.custom-section-trust-badge__icon-wrapper`**
```css
.custom-section-trust-badge__icon-wrapper {
  width: 60px; /* Exact from Figma */
  height: 60px; /* Exact from Figma */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px; /* Space before label */
}
```

**Element: `.custom-section-trust-badge__icon`**
```css
.custom-section-trust-badge__icon {
  width: 60px; /* Exact from Figma */
  height: 60px; /* Exact from Figma */
  object-fit: contain; /* Preserve aspect ratio */
  display: block;
  transition: opacity 0.3s ease;
}

.custom-section-trust-badge__badge:hover .custom-section-trust-badge__icon {
  opacity: 0.8;
}
```

**Element: `.custom-section-trust-badge__label`**
```css
.custom-section-trust-badge__label {
  font-family: 'Neue Haas Display Pro', sans-serif;
  font-size: 20px; /* Exact from Figma */
  font-weight: 400; /* Roman weight */
  line-height: 20px; /* Tight spacing as per Figma */
  color: #183754; /* Exact from Figma - dark teal */
  text-align: center;
  max-width: 100px;
  word-wrap: break-word;
  margin: 0;
}
```

#### Responsive Breakpoints

**Tablet (@media max-width: 1024px)**
```css
.custom-section-trust-badge {
  padding: 100px 80px; /* Scaled down from desktop */
}

.custom-section-trust-badge__grid {
  grid-template-columns: repeat(2, 1fr); /* 2 columns tablet */
  gap: 40px; /* Smaller gap */
}

.custom-section-trust-badge__label {
  font-size: 18px; /* Proportional scale */
  line-height: 18px;
}
```

**Mobile (@media max-width: 767px)**
```css
.custom-section-trust-badge {
  padding: 60px 40px; /* Minimal padding */
}

.custom-section-trust-badge__grid {
  grid-template-columns: repeat(2, 1fr); /* 2 columns mobile (same as tablet) */
  gap: 30px; /* Slightly smaller gap */
}

.custom-section-trust-badge__label {
  font-size: 16px; /* Further scaled for mobile */
  line-height: 16px;
}
```

**Small Mobile (@media max-width: 375px) - Optional Fine-tuning**
```css
.custom-section-trust-badge {
  padding: 40px 20px; /* Extra minimal padding */
}
```

#### Complete CSS File Structure
```css
/* 1. Font Face Declaration */
@font-face { ... }

/* 2. Base Styles (Desktop 1440px) */
.custom-section-trust-badge { ... }
.custom-section-trust-badge__grid { ... }
.custom-section-trust-badge__badge { ... }
.custom-section-trust-badge__icon-wrapper { ... }
.custom-section-trust-badge__icon { ... }
.custom-section-trust-badge__label { ... }

/* 3. Tablet Breakpoint (@media max-width: 1024px) */
@media (max-width: 1024px) { ... }

/* 4. Mobile Breakpoint (@media max-width: 767px) */
@media (max-width: 767px) { ... }

/* 5. Small Mobile Optional (@media max-width: 375px) */
@media (max-width: 375px) { ... }
```

---

## Image & Asset Handling

### Icon Upload Requirements (Merchant Guidelines)
| Specification | Value | Notes |
|---------------|-------|-------|
| **Accepted Formats** | PNG, SVG | Both supported |
| **Recommended Size** | 60×60px | Matches display size |
| **Background** | Transparent | Recommended for PNG |
| **File Size** | < 50KB | Performance optimization |
| **Color** | Grayscale/Outline | Matches Figma design |
| **Aspect Ratio** | Square (1:1) | Optimal for 60×60 container |

### Image Rendering in Liquid
```liquid
<img 
  src="{{ block.settings.badge_icon | image_url: width: 120 }}"
  alt="{{ block.settings.badge_label }}"
  class="custom-section-trust-badge__icon"
  loading="lazy"
/>
```

**Image URL Processing**:
- Uploaded image: Any dimensions
- Shopify image filter: `| image_url: width: 120` (double size for retina)
- CSS display: 60×60px (via width/height in CSS)
- Object fit: `contain` (no cropping)
- Alt text: Badge label (for accessibility)
- Loading: `lazy` (performance optimization)

---

## Development Workflow

### Step 1: Create Liquid Section File
**File**: `sections/custom-section-trust-badge.liquid`

- Create new file with structure from above
- Add stylesheet link: `{{ 'section-custom-trust-badge.css' | asset_url | stylesheet_tag }}`
- Add main container with background color `#FFFAF5`
- Add grid container with proper BEM classes
- Add block loop ({% for block in section.blocks %})
- Add icon wrapper and label for each block
- Complete schema with block settings
- Test in theme editor

### Step 2: Create CSS File
**File**: `assets/section-custom-trust-badge.css`

- Define @font-face for Neue Haas Display Pro (from `assets/fonts/`)
- Add desktop-first base styles (1440px)
- Add tablet breakpoint adjustments (@media max-width: 1024px)
- Add mobile breakpoint adjustments (@media max-width: 767px)
- Implement hover effects (scale + opacity)
- Verify all color codes match Figma (#FFFAF5, #183754)
- Verify all spacing matches Figma (160px, 150px, 60px, 20px, etc.)
- Verify icon sizing is exactly 60×60px

### Step 3: Icon Asset Preparation
Guide merchants to:
- Use PNG (with transparent background) or SVG format
- Size icons to 60×60px before upload (or they auto-scale)
- Keep file size < 50KB
- Use outline/grayscale style to match Figma design

### Step 4: Test in Theme Editor
- Add section to test page
- Upload test icons (use 60×60px PNG with transparency)
- Configure badge labels (4 default labels provided in preset)
- Test block operations:
  - Add block (up to 4 blocks max)
  - Remove block
  - Reorder blocks (drag/drop)
  - Update icon (image picker)
  - Update label (text field)
- Verify section renders correctly

### Step 5: Responsive Testing
Test all breakpoints to match Figma:

**Desktop (1440px)**
- ✓ 4 columns layout
- ✓ 160px top/bottom padding
- ✓ 150px left/right padding
- ✓ 60px gap between columns
- ✓ 20px font size
- ✓ Icons 60×60px
- ✓ Background #FFFAF5

**Tablet (1024px)**
- ✓ 2 columns layout
- ✓ 100px top/bottom padding
- ✓ 80px left/right padding
- ✓ 40px gap
- ✓ 18px font size
- ✓ Icons 60×60px (unchanged)

**Mobile (767px)**
- ✓ 2 column layout (2×2 grid for 4 items)
- ✓ 60px top/bottom padding
- ✓ 40px left/right padding
- ✓ 30px gap (between columns and rows)
- ✓ 16px font size
- ✓ Icons 60×60px (unchanged)
- ✓ Labels wrap properly

### Step 6: Visual Verification Against Figma
- Open Figma node 12:4757
- Compare pixel-by-pixel:
  - ✓ Background color is #FFFAF5 (not white)
  - ✓ Typography matches (Neue Haas Display Pro, 20px, #183754)
  - ✓ Icon size is exactly 60×60px
  - ✓ Spacing matches (160px, 150px, 60px, 20px)
  - ✓ Layout is 4 columns (desktop), 2 columns (tablet & mobile)
  - ✓ Center alignment is correct
  - ✓ Hover effects are smooth

### Step 7: Cross-Browser Testing
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

### Step 8: Accessibility Audit
- [ ] Alt text present for all icons
- [ ] Color contrast meets WCAG AA (#183754 on #FFFAF5)
- [ ] Touch targets are adequate (60px+ icons)
- [ ] Keyboard navigation works
- [ ] Screen reader compatible

---

## Responsive Behavior Summary

| Viewport | Columns | Padding (V/H) | Gap | Font | Background |
|----------|---------|---------------|-----|------|-----------|
| Desktop 1440px | 4 | 160px / 150px | 60px | 20px | #FFFAF5 |
| Tablet 1024px | 2 | 100px / 80px | 40px | 18px | #FFFAF5 |
| Mobile 767px | 2 | 60px / 40px | 30px | 16px | #FFFAF5 |
| Small Mobile 375px | 2 | 40px / 20px | 30px | 16px | #FFFAF5 |

---

## Naming Conventions (Follow Project Rules)

### Files
- **Liquid Section**: `sections/custom-section-trust-badge.liquid`
- **CSS File**: `assets/section-custom-trust-badge.css`

### BEM Classes
- **Block**: `.custom-section-trust-badge`
- **Elements**: `.custom-section-trust-badge__[element]`
- **Modifiers**: `.custom-section-trust-badge--[modifier]`

### Schema IDs (snake_case)
- `badge_icon` (image picker)
- `badge_label` (text field)

---

## Performance Optimization

1. **CSS Delivery**: Linked in section (async loaded)
2. **Font Loading**: @font-face with `font-display: swap`
3. **Image Lazy Loading**: `loading="lazy"` on img tags
4. **Image Optimization**: Merchants upload optimized files
5. **JavaScript**: None required (pure CSS Grid + CSS transitions)
6. **Media Queries**: Mobile-first approach with min-width queries

---

## Browser Compatibility

- **CSS Grid**: Full support (IE 11 not supported - acceptable for modern theme)
- **Object Fit**: Full support
- **CSS Transforms**: Full support
- **@font-face**: Full support
- **Flexbox**: Full support

---

## Testing Checklist

- [ ] Section file created: `sections/custom-section-trust-badge.liquid`
- [ ] CSS file created: `assets/section-custom-trust-badge.css`
- [ ] Section appears in Shopify theme editor
- [ ] Icon upload works (PNG & SVG formats)
- [ ] Label text editable and updates in real-time
- [ ] Block add/remove/reorder all function
- [ ] Desktop layout: 4 columns with 60px gap
- [ ] Tablet layout: 2 columns with 40px gap
- [ ] Mobile layout: 2 columns (2×2 grid for 4 items, 2×1 for 2 items)
- [ ] Background color is #FFFAF5 (not #FFFFFF)
- [ ] Typography: Neue Haas Display Pro loaded, 20px (desktop)
- [ ] Text color: #183754 (dark teal)
- [ ] Icons display at 60×60px exactly
- [ ] Icon gap to text: 20px (as per Figma)
- [ ] Hover effects work (scale + opacity)
- [ ] Responsive padding applied correctly
- [ ] Font sizes scale: 20px → 18px → 16px
- [ ] Labels wrap/truncate appropriately
- [ ] Works with 1, 2, 3, and 4 blocks
- [ ] Center alignment works for all block counts
- [ ] Alt text appears in browser DevTools
- [ ] No console errors or warnings
- [ ] Tested on multiple devices (desktop, tablet, mobile)
- [ ] Matches Figma design pixel-perfect (node 12:4757)

---

## Deployment Checklist

- [ ] Create `sections/custom-section-trust-badge.liquid` (use file from this guide)
- [ ] Create `assets/section-custom-trust-badge.css` (use file from this guide)
- [ ] Verify Neue Haas Display Pro fonts exist in `assets/fonts/neue-haas-display/`
- [ ] Upload both files to theme
- [ ] Section appears in theme editor under custom sections
- [ ] Add section to test page in theme editor
- [ ] Configure at least one badge block
- [ ] Upload test icon (60×60px PNG recommended)
- [ ] Verify section renders correctly on all devices
- [ ] Save and publish

---

## File Creation Summary

**Files to Create:**
1. ✅ `sections/custom-section-trust-badge.liquid` - Liquid template
2. ✅ `assets/section-custom-trust-badge.css` - Stylesheet
3. ✅ `prototype/custom-trust-badge-section/design-tokens.md` - Design specs (created)
4. ✅ `prototype/custom-trust-badge-section/IMPLEMENTATION-GUIDE.md` - This guide (created)

**Required Asset Files (Already Exist):**
- `assets/fonts/neue-haas-display/NeueHaasDisplay-Roman.woff2`
- `assets/fonts/neue-haas-display/NeueHaasDisplay-Roman.woff`

---

## Figma Design Compliance

**Critical Design Requirements from Figma Node 12:4757:**

✓ Background Color: `#FFFAF5` (warm off-white)
✓ Typography: Neue Haas Grotesk Display Pro, 400 (Roman), 20px
✓ Text Color: `#183754` (dark teal)
✓ Spacing: 160px top/bottom, 150px left/right (desktop)
✓ Icon Size: 60px × 60px (exact)
✓ Icon-to-Text Gap: 20px
✓ Grid: 4 columns (desktop), 2 columns (tablet & mobile)
✓ Gap: 60px (desktop), 40px (tablet), 30px (mobile)
✓ Alignment: Center-aligned badges (both axes)
✓ Hover: scale(1.05) + opacity transition

**Reference**: [Figma Design - Node 12:4757](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-4757&m=dev)

---

**Status**: Ready for Implementation
**Last Updated**: December 10, 2025
**Design Source**: Figma Node 12:4757
**Implementation Guidance**: Follow design-tokens.md for all visual specifications
