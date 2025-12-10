# Section: Shop Collection Arch - Technical Specification

**Version:** 1.0.0  
**Last Updated:** 2025-12-10  
**Section Name:** Radiance Collection  
**Component Type:** Custom Liquid Section  

---

## 📋 Section Overview

A luxury jewelry showcase section featuring a centered focal video/image with side product imagery, connected by animated lines with a single rotating star SVG. The section includes parallax floating effects on desktop and responsive stacked layout on mobile/tablet.

**Key Features:**
- ✨ Parallax float effect on side images (desktop only)
- 🌟 Single rotating star SVG on connecting lines (desktop only)
- 📱 Responsive stacked layout (tablet/mobile)
- 🎨 Fully customizable via section settings
- 🎬 Video + image fallback support

---

## 🎯 Desktop Layout (1440px)

### Container Structure

```
.custom-section-shop-collection-arch (wrapper - background #FFFAF5)
└── .custom-section-shop-collection-arch__container (max-width: 1440px)
    ├── .custom-section-shop-collection-arch__heading
    ├── .custom-section-shop-collection-arch__content
    │   ├── .custom-section-shop-collection-arch__lines (z-index: 1)
    │   ├── .custom-section-shop-collection-arch__star (z-index: 2)
    │   ├── .custom-section-shop-collection-arch__images (z-index: 3)
    │   │   ├── .custom-section-shop-collection-arch__image--left
    │   │   ├── .custom-section-shop-collection-arch__image--right
    │   │   └── .custom-section-shop-collection-arch__image--bottom
    │   └── .custom-section-shop-collection-arch__center (z-index: 4)
    │       ├── .custom-section-shop-collection-arch__frame
    │       └── .custom-section-shop-collection-arch__cta
```

### Dimensions & Styling

| Element | Property | Value | Notes |
|---------|----------|-------|-------|
| **Wrapper** | Background Color | #FFFAF5 | Beige background |
| **Container** | Max-width | 1440px | Centered |
| **Container** | Margin | 0 auto | Center alignment |
| **Center Frame** | Width | 1260px | |
| **Center Frame** | Height | 420px | |
| **Center Frame** | Rotation | -16deg | CSS transform |
| **Decorative Ellipse** | Rotation | -16.823deg | CSS generated, background layer |
| **Decorative Ellipse** | Visibility | Desktop only | Hidden on tablet/mobile |

### Z-Index Layering (Front to Back)

1. **Z-1: CSS Connecting Lines** - Blue lines connecting side images to center
2. **Z-2: Single Rotating Star** - GSAP-animated star on connecting lines (8s clockwise)
3. **Z-3: Side Product Images** - Left, Right, Bottom with parallax float effect
4. **Z-4: Center Frame** - Archway with video/image and "Shop the Collection" CTA

---

## 📱 Responsive Layout

### Tablet (≤1024px)

- **No decorative ellipse/circle** - Hidden
- **No parallax effect** - Static positioning
- **Layout**: Stacked vertically
  1. Heading ("Radiance Collection")
  2. Center archway frame (full-width or adjusted)
  3. Gap (16px)
  4. Two side images in 2-column flex layout with 16px gap
- **Animations**: Disabled

### Mobile (≤767px)

- **Same as tablet** - Stacked layout
- **Two side images**: 2-column flex with 16px gap
- **Center frame**: Full-width adjusted
- **No parallax, no animations**

### Small Mobile (≤375px)

- **Same as tablet/mobile** - Stacked layout
- **Adjusted padding** for small screens
- **Two side images**: 2-column flex with 16px gap

---

## ✨ Animation Details

### Parallax Float Effect (Desktop Only)

**Trigger:** On scroll (when section enters viewport)

**Behavior:**
- Subtle vertical float movement
- Both side images move in the same direction (up/down together)
- Movement range: Experiment with subtle movement (not obvious)
- Disabled at tablet breakpoint (1024px and below)

**Implementation:**
- GSAP ScrollTrigger for scroll-based parallax
- Smooth easing function
- Performance optimized with `will-change: transform`

### Star Rotation Animation (Desktop Only)

**Behavior:**
- Single star SVG rotates continuously around connecting lines
- Duration: 8 seconds per full rotation
- Direction: Clockwise
- Size: Fixed, very small (xs)
- Path: Rotates along the connecting line curves

**Implementation:**
- GSAP continuous rotation animation
- Fallback: Default SVG star if merchant doesn't upload custom SVG
- Disabled at tablet breakpoint (1024px and below)

---

## ⚙️ Section Settings (Editable Fields)

### Schema Configuration

```json
{
  "name": "Shop Collection Arch",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Section Heading",
      "default": "Radiance Collection"
    },
    {
      "type": "video_url",
      "id": "center_video",
      "label": "Center Video (MP4/WebM)",
      "accept": ["youtube", "vimeo"]
    },
    {
      "type": "image_picker",
      "id": "center_image_fallback",
      "label": "Center Image (Fallback if no video)"
    },
    {
      "type": "url",
      "id": "center_cta_link",
      "label": "Center CTA Link"
    },
    {
      "type": "text",
      "id": "center_cta_text",
      "label": "Center CTA Text",
      "default": "Shop the Collection"
    },
    {
      "type": "image_picker",
      "id": "left_image",
      "label": "Left Product Image"
    },
    {
      "type": "url",
      "id": "left_image_link",
      "label": "Left Image Link"
    },
    {
      "type": "image_picker",
      "id": "right_image",
      "label": "Right Product Image"
    },
    {
      "type": "url",
      "id": "right_image_link",
      "label": "Right Image Link"
    },
    {
      "type": "image_picker",
      "id": "bottom_image",
      "label": "Bottom Product Image"
    },
    {
      "type": "url",
      "id": "bottom_image_link",
      "label": "Bottom Image Link"
    },
    {
      "type": "image_picker",
      "id": "decorative_star",
      "label": "Decorative Star SVG (Image Upload)",
      "info": "Upload SVG or PNG. Default star used if empty."
    }
  ],
  "presets": [
    {
      "name": "Shop Collection Arch"
    }
  ]
}
```

### Editable Fields Summary

| Field | Type | Default | Required | Notes |
|-------|------|---------|----------|-------|
| Heading | Text | "Radiance Collection" | No | Section title |
| Center Video | Video URL | - | No | YouTube/Vimeo support |
| Center Image Fallback | Image | - | No | Shows if no video |
| Center CTA Link | URL | - | No | Navigation link |
| Center CTA Text | Text | "Shop the Collection" | No | Link text |
| Left Image | Image | - | No | Product image |
| Left Image Link | URL | - | No | Navigation link |
| Right Image | Image | - | No | Product image |
| Right Image Link | URL | - | No | Navigation link |
| Bottom Image | Image | - | No | Product image |
| Bottom Image Link | URL | - | No | Navigation link |
| Decorative Star | Image | Default SVG | No | Custom star SVG/PNG |

---

## 🎨 Design Tokens

### Typography

| Element | Font | Size | Weight | Color | Line Height |
|---------|------|------|--------|-------|-------------|
| **Heading** | Neue Haas Grotesk Display Pro | 40px | 45 Light | #183754 | 50px |
| **CTA Link** | Neue Haas Grotesk Display Pro | 20px | 55 Roman | #FFFFFF | 40px |

### Colors

| Element | Color | Hex Code | Usage |
|---------|-------|----------|-------|
| **Background** | White | #FFFFFF | Section background |
| **Wrapper Background** | Beige | #FFFAF5 | Outer wrapper |
| **Heading Color** | Dark Blue | #183754 | Text color |
| **CTA Color** | White | #FFFFFF | Link text |
| **Lines Color** | Blue | #3E82C9 | Connecting lines (locked) |

### Spacing

| Element | Value | Notes |
|---------|-------|-------|
| **Side Images Gap** | 16px | Gap between images on mobile |
| **Container Padding** | 40px (desktop), 20px (mobile) | Standard padding |
| **Section Margin** | 0 auto | Center alignment |

### Animations

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| **Parallax Float** | Scroll-based | ease-out | On scroll (desktop) |
| **Star Rotation** | 8s | linear | Continuous (desktop) |

---

## 📁 File Structure

```
sections/
├── custom-section-shop-collection-arch.liquid

assets/
├── section-shop-collection-arch.css
├── section-shop-collection-arch.js

prototype/
├── section-shop-collection-arch/
│   ├── design/
│   │   ├── figma-desktop.png
│   │   ├── figma-tablet.png
│   │   ├── figma-mobile.png
│   │   └── design-tokens.md
│   ├── assets/
│   │   └── icons/
│   │       └── star-default.svg
│   └── TECHNICAL-SPECIFICATION.md
```

---

## 🛠️ Implementation Standards

### Liquid Standards (from docs/rules/04-LIQUID-DEVELOPMENT.md)

- ✅ Section file: `sections/custom-section-shop-collection-arch.liquid`
- ✅ Schema with all editable settings
- ✅ Asset linking via `asset_url` filter
- ✅ Image handling with `image_url` filter and responsive srcset
- ✅ No hardcoded paths
- ✅ BEM class naming convention
- ✅ No core theme file modifications

### CSS Standards (from docs/rules/05-CSS-STANDARDS.md)

- ✅ Separate CSS file: `assets/section-shop-collection-arch.css`
- ✅ BEM methodology
- ✅ Desktop-first responsive design
- ✅ Breakpoints: 1440px (base), 1024px (tablet), 767px (mobile), 375px (small mobile)
- ✅ No core theme class modifications
- ✅ Namespace all classes with `custom-section-shop-collection-arch`
- ✅ Low specificity maintained
- ✅ No `!important` usage

### JavaScript Standards (from docs/rules/06-JAVASCRIPT-STANDARDS.md)

- ✅ Separate JS file: `assets/section-shop-collection-arch.js`
- ✅ Modern ES6+ syntax
- ✅ GSAP for animations (parallax + star rotation)
- ✅ Defer script loading
- ✅ Error handling for missing elements
- ✅ No global scope pollution (IIFE or module pattern)
- ✅ TODO comments for debugging
- ✅ Meaningful variable names

---

## 📊 Breakpoint Behavior

| Breakpoint | Layout | Parallax | Star Rotation | Ellipse | Notes |
|-----------|--------|----------|---------------|---------|-------|
| **1440px+** | Desktop | ✅ Yes | ✅ Yes | ✅ Yes | Full experience |
| **1024px-1440px** | Tablet | ❌ No | ❌ No | ❌ No | Stacked layout |
| **767px-1024px** | Mobile | ❌ No | ❌ No | ❌ No | Stacked layout |
| **≤375px** | Small Mobile | ❌ No | ❌ No | ❌ No | Stacked layout |

---

## 🎯 BEM Class Structure

### Block
```css
.custom-section-shop-collection-arch
```

### Elements
```css
.custom-section-shop-collection-arch__wrapper
.custom-section-shop-collection-arch__container
.custom-section-shop-collection-arch__heading
.custom-section-shop-collection-arch__content
.custom-section-shop-collection-arch__lines
.custom-section-shop-collection-arch__star
.custom-section-shop-collection-arch__images
.custom-section-shop-collection-arch__image
.custom-section-shop-collection-arch__center
.custom-section-shop-collection-arch__frame
.custom-section-shop-collection-arch__cta
```

### Modifiers
```css
.custom-section-shop-collection-arch__image--left
.custom-section-shop-collection-arch__image--right
.custom-section-shop-collection-arch__image--bottom
```

---

## ✅ Asset Requirements

### Required Assets

- ✅ **Default star SVG** - `prototype/section-shop-collection-arch/assets/icons/star-default.svg`
  - Small, simple design
  - Scalable SVG format
  - Fallback if merchant doesn't upload custom SVG

- ✅ **3 Product images** (left, right, bottom)
  - Configurable via section settings
  - Optimized for web
  - Responsive sizes

- ✅ **Center video or image**
  - Configurable via section settings
  - MP4/WebM format for video
  - High-quality image fallback

- ✅ **Merchant-uploaded decorative SVG**
  - Image format (SVG or PNG)
  - Fallback to default star if not provided

---

## 🔄 Responsive Behavior Summary

### Desktop (1440px)
- Full layout with all elements visible
- Parallax float effect on side images
- Star rotation animation on connecting lines
- Decorative ellipse visible
- Smooth animations and transitions

### Tablet (1024px)
- Stacked vertical layout
- Heading at top
- Center frame below heading
- Two side images in 2-column flex (16px gap)
- No animations or parallax
- No decorative ellipse

### Mobile (767px)
- Same as tablet
- Adjusted padding and spacing
- Two side images in 2-column flex (16px gap)
- Full-width center frame

### Small Mobile (375px)
- Same as tablet/mobile
- Minimal padding
- Two side images in 2-column flex (16px gap)

---

## 📋 Pre-Development Checklist

- [ ] All section settings defined in schema
- [ ] BEM class naming structure documented
- [ ] GSAP animations planned (parallax + star rotation)
- [ ] Responsive breakpoints confirmed
- [ ] Asset requirements listed
- [ ] Design tokens extracted
- [ ] Liquid structure planned
- [ ] CSS standards reviewed
- [ ] JavaScript standards reviewed
- [ ] No core theme files to be modified
- [ ] Wrapper background color (#FFFAF5) confirmed
- [ ] Star rotation animation details confirmed
- [ ] Ready for development

---

## 🚀 Next Steps

1. **Create Figma screenshots** - Desktop, tablet, mobile views
2. **Extract design tokens** - Colors, typography, spacing
3. **Collect assets** - Star SVG, product images
4. **Develop Liquid section** - `custom-section-shop-collection-arch.liquid`
5. **Write CSS** - `section-shop-collection-arch.css`
6. **Write JavaScript** - `section-shop-collection-arch.js` (GSAP animations)
7. **Test responsive** - All breakpoints
8. **Test animations** - Parallax and star rotation
9. **Create Playwright tests** - Visual regression testing
10. **Deploy and commit** - Follow git workflow

---

**Status:** ✅ Ready for Development  
**Last Updated:** 2025-12-10  
**Version:** 1.0.0
