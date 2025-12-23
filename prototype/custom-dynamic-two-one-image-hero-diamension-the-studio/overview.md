# Custom Dynamic Two-One Image Hero - The Studio

**Version:** 1.0.0
**Created:** 2025-12-23
**Section Type:** Custom Hero Section
**Target Page:** The Studio Page

---

## Figma References

### Source Nodes
- **Node 1 (220:137):** Single image layout with description only
  - URL: https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=220-137

- **Node 2 (220:148):** Single image layout with tagline, description, and overlay text
  - URL: https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=220-148

- **Node 3 (220:151):** Two-image layout with tagline, description, and overlay text
  - URL: https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=220-151

---

## Section Overview

A flexible hero section that supports three layout variations:
1. **Single Image - Minimal:** Image + description text only
2. **Single Image - Enhanced:** Tagline + image with decorative overlay text + description
3. **Two Images:** Tagline + two side-by-side images with decorative overlay text + description

### Purpose
Display high-quality product imagery with optional marketing copy for The Studio page.

### Key Features
- Fluid background wrapper with fixed max-width container
- Conditional rendering (show only what's uploaded/filled)
- Decorative script text overlay on images
- Fully responsive with maintained 1040px section height
- Side-by-side image support with automatic scaling

---

## Layout Specifications

### Wrapper & Container
- **Wrapper:** Full-width with background color #FFFAF5
- **Container:** Max-width 1440px, centered
- **Section Height:** 1040px (fixed across all devices)

### Content Structure
1. **Images** (1 or 2)
   - Dimensions: 688x1032px
   - Object-fit: contain
   - Gap between two images: 32px
   - Optional decorative overlay text positioned 64px from bottom

2. **Text Content** (below images)
   - Optional tagline (uppercase, 30px, light weight)
   - Heading-to-image gap: 32px
   - Heading-to-paragraph gap: 16px
   - Description text (20px, centered)

3. **Spacing**
   - Container padding-bottom: 128px (desktop), decreases responsively
   - Total section height: Always 1040px

---

## Layout Variations

### Variation 1: Single Image - Minimal (Node 220:137)
```
[ Wrapper - Background #FFFAF5 ]
  [ Container - Max 1440px ]
    [ Image: 688x1032px ]
    [ Description Text ]
    [ Padding Bottom: 128px ]
```

### Variation 2: Single Image - Enhanced (Node 220:148)
```
[ Wrapper - Background #FFFAF5 ]
  [ Container - Max 1440px ]
    [ Image: 688x1032px ]
      [ Overlay Text: "Beauty" - 64px from bottom ]
    [ Tagline: "SLEEK. MINIMAL. COMMANDING." ]
    [ Description Text ]
    [ Padding Bottom: 128px ]
```

### Variation 3: Two Images (Node 220:151)
```
[ Wrapper - Background #FFFAF5 ]
  [ Container - Max 1440px ]
    [ Image 1: 688x1032px ] [32px gap] [ Image 2: 688x1032px ]
      [ Overlay Text ]                   [ Overlay Text ]
    [ Tagline: "SLEEK. MINIMAL. COMMANDING." ]
    [ Description Text ]
    [ Padding Bottom: 128px ]
```

---

## Conditional Rendering Rules

Content is **only displayed if provided**:
- ✓ If 1 image uploaded → Show 1 image
- ✓ If 2 images uploaded → Show 2 images side-by-side
- ✓ If tagline field filled → Show tagline
- ✓ If overlay text field filled → Show decorative text on image
- ✓ If description field filled → Show description
- ✗ If no content → Don't render empty elements

---

## Responsive Behavior

### Desktop (1440px)
- Base layout as designed
- Images: 688x1032px
- Container padding-bottom: 128px
- Section height: 1040px

### Tablet (1024px)
- Images scale down proportionally
- Maintain 32px gap between images
- Reduce padding-bottom (calculated to maintain 1040px height)
- Font sizes adjust via CSS (no schema)

### Mobile (767px and below)
- Images scale down further
- Two images always stay side-by-side
- Reduce padding-bottom (calculated to maintain 1040px height)
- Font sizes adjust via CSS (no schema)
- Section height: 1040px maintained

**Critical:** Total section height must remain 1040px across all devices. Only padding-bottom and content sizing adjust.

---

## Assets Required

### Fonts (Already Loaded)
- **Neue Haas Grotesk Display:**
  - 45 Light (tagline)
  - 55 Roman (description)
- **Bickham Script Pro:** Regular (decorative overlay text)

Location: `assets/fonts/`

### Images
- Merchant-uploaded via Shopify image picker
- Recommended dimensions: 688x1032px
- Format: JPG/PNG
- Optimized for web

---

## Technical Requirements

### Files to Create
1. `sections/custom-section-dynamic-hero-studio.liquid`
2. `assets/section-dynamic-hero-studio.css`
3. `assets/section-dynamic-hero-studio.js` (if needed for interactions)

### Schema Settings
- image_1 (image_picker)
- image_1_overlay_text (text)
- image_1_overlay_text_size (range) - responsive font size
- image_2 (image_picker)
- image_2_overlay_text (text)
- image_2_overlay_text_size (range) - responsive font size
- tagline (text)
- description (richtext)

### BEM Class Structure
```
.custom-section-dynamic-hero-studio
  .custom-section-dynamic-hero-studio__wrapper
  .custom-section-dynamic-hero-studio__container
  .custom-section-dynamic-hero-studio__images
  .custom-section-dynamic-hero-studio__image-wrapper
  .custom-section-dynamic-hero-studio__image
  .custom-section-dynamic-hero-studio__image-overlay-text
  .custom-section-dynamic-hero-studio__content
  .custom-section-dynamic-hero-studio__tagline
  .custom-section-dynamic-hero-studio__description
```

---

## Testing Checklist

- [ ] Single image layout renders correctly
- [ ] Two image layout with 32px gap
- [ ] Overlay text positioned 64px from bottom
- [ ] Tagline shows only when filled
- [ ] Description shows only when filled
- [ ] Section height is 1040px on all devices
- [ ] Images scale proportionally on tablet/mobile
- [ ] Two images always stay side-by-side
- [ ] Fonts load correctly
- [ ] Responsive font sizing works
- [ ] Container max-width 1440px maintained
- [ ] Background color #FFFAF5 applied

---

## Design Notes

- Background color creates warm, elegant atmosphere
- Decorative script text adds luxury branding element
- Object-fit: contain preserves image aspect ratios
- Fixed section height ensures consistent page flow
- Conditional rendering keeps layout clean when content missing
