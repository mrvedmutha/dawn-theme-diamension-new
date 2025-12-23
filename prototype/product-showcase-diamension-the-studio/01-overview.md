# Product Showcase - Diamension The Studio

**Version:** 1.0.0
**Created:** 2025-12-23
**Section Type:** Custom Product Showcase Section
**Target Page:** The Studio Page

---

## Figma References

### Source Node
- **Node ID:** 12:8844
- **URL:** https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-8844&m=dev

**Developer Instructions:**
1. Access the Figma file using the URL above
2. Read the design node (12:8844) to understand exact specifications
3. Extract all design tokens and visual specifications
4. Reference `docs/rules/` for development standards before starting

---

## Section Overview

A luxury product showcase section featuring two side-by-side high-quality product images with elegant overlay text and call-to-action.

### Purpose
Display premium jewelry products in an aspirational context with marketing copy and exploration CTA for The Studio page.

### Key Features
- Two equal-sized product images (600×800px) displayed side-by-side
- Transparent PNG images with object-fit: cover
- Right image has overlay text (heading + CTA)
- Fully responsive with specific breakpoint behavior
- Fixed background color wrapper
- Configurable through Shopify section settings

---

## Layout Specifications

### Wrapper & Container
- **Wrapper:** Full-width with background color #FFFAF5
- **Container:**
  - Max-width: 1440px
  - Centered with auto margins
  - Padding (Desktop): 40px top/bottom, 56px left/right
  - Padding (Tablet): Adjusted proportionally
  - Padding (Mobile): Adjusted proportionally

### Content Structure
1. **Two Image Cards** (flexbox with space-between)
   - Each image wrapper: 600×800px (fixed dimensions)
   - Gap between images: Space-between (pushes to edges)
   - Images: Transparent PNG, object-fit: cover

2. **Right Image Card Overlay Text**
   - Heading positioned 112px from top edge of image wrapper
   - CTA positioned 144px from bottom edge of image wrapper
   - Text overlays the image (z-index layering)

---

## Visual Breakdown

```
[ Wrapper - Full width, Background #FFFAF5 ]
  [ Container - Max 1440px, Padding 40px/56px ]
    [ Flexbox - justify-content: space-between ]

      [ Left Image Card - 600×800px ]
        [ Image - Transparent PNG, object-fit: cover ]

      [ Right Image Card - 600×800px, position: relative ]
        [ Heading - 112px from top, z-index: 10 ]
        [ Image - Transparent PNG, object-fit: cover ]
        [ CTA Link - 144px from bottom, z-index: 10 ]
```

---

## Responsive Behavior

### Desktop (1440px)
- Container: 1440px max-width, 40px top/bottom padding, 56px side padding
- Both images: 600×800px
- Images: Space-between (at edges of container)
- Overlay text: As specified (112px top, 144px bottom)

### Tablet (1024px)
- Container: Full width with adjusted side padding
- Both images: 600×800px (maintained)
- Images: Space-between (responsive to container width)
- Overlay text: Same positioning (112px top, 144px bottom)

### Mobile (767px and below)
- Container: Adjusted side padding
- Images: Stack vertically (flex-direction: column)
- Gap between stacked images: 64px
- Each image: Full width (or proportionally scaled to fit)
- Overlay text: Maintain 112px top, 144px bottom positioning

**Critical:**
- Desktop/Tablet: Two images side-by-side
- Mobile: Two images stacked vertically with 64px gap
- Images always 600×800px aspect ratio with object-fit: cover
- Text overlay maintains fixed positioning on right image

---

## Layout Variations

### Desktop Layout (1440px+)
```
┌─────────────────────────────────────────────────────────┐
│ Wrapper (#FFFAF5)                                       │
│ ┌───────────────────────────────────────────────────┐   │
│ │ Container (1440px, padding: 40px 56px)            │   │
│ │ ┌──────────────┐          ┌──────────────┐        │   │
│ │ │              │          │ Heading      │        │   │
│ │ │              │          │ (112px top)  │        │   │
│ │ │   Left       │          │              │        │   │
│ │ │   Image      │   SPACE  │   Right      │        │   │
│ │ │  600×800px   │  BETWEEN │   Image      │        │   │
│ │ │              │          │  600×800px   │        │   │
│ │ │              │          │              │        │   │
│ │ │              │          │ CTA          │        │   │
│ │ │              │          │ (144px btm)  │        │   │
│ │ └──────────────┘          └──────────────┘        │   │
│ └───────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Mobile Layout (< 767px)
```
┌─────────────────────────┐
│ Wrapper (#FFFAF5)       │
│ ┌─────────────────────┐ │
│ │ Container           │ │
│ │ ┌─────────────────┐ │ │
│ │ │   Left Image    │ │ │
│ │ │   600×800px     │ │ │
│ │ │   (scaled)      │ │ │
│ │ └─────────────────┘ │ │
│ │                     │ │
│ │    [64px gap]       │ │
│ │                     │ │
│ │ ┌─────────────────┐ │ │
│ │ │ Heading (112px) │ │ │
│ │ │   Right Image   │ │ │
│ │ │   600×800px     │ │ │
│ │ │   (scaled)      │ │ │
│ │ │ CTA (144px btm) │ │ │
│ │ └─────────────────┘ │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```

---

## Assets Required

### Fonts
- **Neue Haas Grotesk Display Pro:**
  - 56 Roman Italic (heading)
  - 55 Roman (CTA)
- Location: Already loaded in theme or needs Google Fonts integration

### Images
- **Left Image:** Merchant-uploaded transparent PNG via Shopify image picker
  - Recommended size: 600×800px or higher resolution
  - Format: PNG (transparent background)

- **Right Image:** Merchant-uploaded transparent PNG via Shopify image picker
  - Recommended size: 600×800px or higher resolution
  - Format: PNG (transparent background)

---

## Technical Requirements

### Files to Create
1. `sections/custom-section-product-showcase-studio.liquid`
2. `assets/section-product-showcase-studio.css`
3. No JavaScript file needed (static section)

### Schema Settings

**Images:**
- `image_left` (image_picker) - Left product image
- `image_left_alt` (text) - Alt text for left image
- `image_right` (image_picker) - Right product image with overlay
- `image_right_alt` (text) - Alt text for right image

**Text Content:**
- `heading` (text) - Overlay heading text
  - Default: "For the Ones Who Define Success"
- `heading_width` (range) - Heading max-width in px
  - Min: 150, Max: 300, Step: 1, Default: 216
- `cta_text` (text) - CTA link text
  - Default: "Explore"
- `cta_url` (url) - CTA destination URL

**Styling (Optional):**
- `background_color` (color) - Wrapper background
  - Default: #FFFAF5

### BEM Class Structure
```
.custom-section-product-showcase-studio
  .custom-section-product-showcase-studio__wrapper
  .custom-section-product-showcase-studio__container
  .custom-section-product-showcase-studio__images
  .custom-section-product-showcase-studio__image-card
  .custom-section-product-showcase-studio__image-card--left
  .custom-section-product-showcase-studio__image-card--right
  .custom-section-product-showcase-studio__image
  .custom-section-product-showcase-studio__heading
  .custom-section-product-showcase-studio__cta
```

---

## Conditional Rendering Rules

Content is **only displayed if provided**:
- ✓ If left image uploaded → Show left image
- ✓ If right image uploaded → Show right image
- ✓ If heading text filled → Show heading overlay
- ✓ If CTA text filled → Show CTA link
- ✗ If no images → Show placeholder or hide section

---

## Testing Checklist

- [ ] Desktop: Two images side-by-side with space-between
- [ ] Tablet: Two images side-by-side (adjusted width)
- [ ] Mobile: Two images stacked vertically with 64px gap
- [ ] Image wrappers are 600×800px
- [ ] Images use object-fit: cover
- [ ] Heading positioned 112px from top of right image wrapper
- [ ] CTA positioned 144px from bottom of right image wrapper
- [ ] Text overlays right image correctly (z-index)
- [ ] Background color #FFFAF5 applied to wrapper
- [ ] Container max-width 1440px maintained
- [ ] Container padding correct (40px/56px desktop)
- [ ] Heading width fixed at 216px (or configurable value)
- [ ] CTA underline renders correctly
- [ ] Font families load correctly
- [ ] All responsive breakpoints work
- [ ] Transparent PNG images render properly
- [ ] Section settings allow merchant customization

---

## Design Notes

- **Background Color:** Warm cream (#FFFAF5) creates luxurious, soft atmosphere
- **Image Presentation:** Transparent PNGs allow background color to show through
- **Object-fit: Cover:** Ensures images fill wrapper completely while maintaining aspect ratio
- **Text Overlay:** Positioned absolutely over right image for elegant integration
- **Space-between:** Creates visual balance by pushing images to edges
- **Fixed Heading Width:** 216px ensures consistent text wrapping as designed
- **Underline CTA:** Adds subtle elegance without heavy button styling
- **Responsive Stacking:** Mobile vertical stack with generous 64px gap maintains visual clarity

---

## Developer Workflow

Before starting development, ensure you:
1. ✓ Read this overview document completely
2. ✓ Review `02-design-tokens.md` for exact specifications
3. ✓ Review `03-implementation.md` for code structure
4. ✓ Read all relevant files in `docs/rules/` directory:
   - `01-WORKFLOW.md` - Complete development process
   - `02-DESIGN-EXTRACTION.md` - Figma extraction guidelines
   - `04-LIQUID-DEVELOPMENT.md` - Liquid coding standards
   - `05-CSS-STANDARDS.md` - CSS, BEM, breakpoints
   - `08-NAMING-CONVENTIONS.md` - File and class naming
5. ✓ Access Figma node (12:8844) to verify design details
6. ✓ Collect all assets before starting development
7. ✓ Build directly in Liquid (no HTML prototype)
8. ✓ Test with Shopify CLI at localhost:9292

---

## Questions or Issues

If any specifications are unclear:
1. Reference the Figma node (12:8844) for visual clarification
2. Check existing similar sections for patterns
3. Consult `docs/rules/` for standard practices
4. Ask for clarification before making assumptions
