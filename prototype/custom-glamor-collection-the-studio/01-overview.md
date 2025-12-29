# Glamor Collection - The Studio

**Version:** 1.0.0
**Created:** 2025-12-29
**Section Type:** Custom Editorial Product Showcase Section
**Target Page:** The Studio / Corporate Collection Page

---

## Figma References

### Source Node
- **Node ID:** 251:90
- **URL:** https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=251-90&m=dev

**Developer Instructions:**
1. Access the Figma file using the URL above
2. Read the design node (251:90) to understand exact specifications
3. Extract all design tokens and visual specifications
4. Reference `docs/rules/` for development standards before starting

---

## Section Overview

An editorial-style product showcase section featuring a full-width lifestyle background image with floating product cards overlay. The section displays up to 4 product cards positioned over a glamorous lifestyle photograph, each with semi-transparent dark overlays showing product images, names, and CTAs.

### Purpose
Create an aspirational, magazine-style product presentation that combines lifestyle imagery with product showcases for The Studio's Corporate/Glamour collection.

### Key Features
- Full-width background lifestyle image
- Fixed height wrapper (1528px desktop, 100vh tablet/mobile)
- Up to 4 product card blocks (merchant configurable)
- Semi-transparent dark overlay on product cards (rgba(27,27,27,0.19))
- Editorial headline text ("Glamour" + subtitle)
- Desktop: Absolute positioned cards floating over lifestyle image
- Tablet: 4-column grid at bottom of image
- Mobile: 2-column grid at bottom of image
- GSAP scroll animations (desktop only)
- 1:1 square product images

---

## Layout Specifications

### Wrapper Dimensions

**Desktop (1440px+):**
- Width: 100vw
- Height: 1528px (fixed)
- Position: relative (for absolute positioned cards)

**Tablet & Mobile (< 1024px):**
- Width: 100vw
- Height: 100vh (viewport height)
- Position: relative

### Content Structure

1. **Background Image**
   - Full-width lifestyle photography
   - Covers entire wrapper
   - Object-fit: cover
   - Source: Merchant uploaded via section settings

2. **Headline Text (Top Left)**
   - Large script heading: "Glamour"
   - Subtitle: "is a condition, not a commodity."
   - Position: Top-left area of background
   - Editable via section settings (fonts hardcoded)

3. **Product Cards (Blocks - Max 4)**
   - Semi-transparent overlay background
   - Product image (1:1 square ratio)
   - Product name (25-30 character recommendation)
   - CTA link text (15-20 character recommendation)
   - Position varies by viewport (see responsive behavior)

---

## Visual Breakdown

### Desktop Layout
```
┌─────────────────────────────────────────────────────────────┐
│ Wrapper - 100vw × 1528px                                    │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Background Image (lifestyle photo)                      │ │
│ │                                                           │ │
│ │  "Glamour"                                                │ │
│ │  "is a condition, not a commodity."                       │ │
│ │                                                           │ │
│ │                     ┌────────┐                            │ │
│ │                     │Product │ (positioned as per Figma)  │ │
│ │                     │Card 1  │                            │ │
│ │                     └────────┘                            │ │
│ │   ┌────────┐                                              │ │
│ │   │Product │                        ┌────────┐            │ │
│ │   │Card 2  │                        │Product │            │ │
│ │   └────────┘                        │Card 3  │            │ │
│ │                ┌────────┐           └────────┘            │ │
│ │                │Product │                                 │ │
│ │                │Card 4  │                                 │ │
│ │                └────────┘                                 │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Tablet Layout (768px - 1024px)
```
┌───────────────────────────────────────────┐
│ Wrapper - 100vw × 100vh                   │
│ ┌───────────────────────────────────────┐ │
│ │ Background Image (lifestyle photo)    │ │
│ │                                       │ │
│ │  "Glamour"                            │ │
│ │  "is a condition, not a commodity."   │ │
│ │                                       │ │
│ │                                       │ │
│ │                                       │ │
│ ├───────────────────────────────────────┤ │
│ │ [Card 1] [Card 2] [Card 3] [Card 4]  │ │
│ │  (4 columns, overlaid at bottom)     │ │
│ └───────────────────────────────────────┘ │
└───────────────────────────────────────────┘
```

### Mobile Layout (< 768px)
```
┌─────────────────────────┐
│ Wrapper - 100vw × 100vh │
│ ┌─────────────────────┐ │
│ │ Background Image    │ │
│ │                     │ │
│ │  "Glamour"          │ │
│ │  "subtitle..."      │ │
│ │                     │ │
│ │                     │ │
│ ├─────────────────────┤ │
│ │ [Card 1] [Card 2]  │ │
│ │ [Card 3] [Card 4]  │ │
│ │  (2 columns)       │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```

---

## Responsive Behavior

### Desktop (1440px and above)
- Wrapper: 100vw × 1528px (fixed height)
- Background image fills wrapper
- Headline: Positioned top-left as per Figma
- Product cards: **Absolutely positioned** as per Figma design specs (see design-tokens.md for exact coordinates)
- Cards: Various sizes (see Figma for exact dimensions)
- GSAP animations: Fade in from bottom on scroll

### Tablet (768px - 1024px)
- Wrapper: 100vw × 100vh
- Background image fills wrapper
- Headline: Positioned at top
- Product cards: **4-column grid layout** at bottom of image (overlaid)
- Cards: Equal width, square dimensions
- No animations

### Mobile (< 768px)
- Wrapper: 100vw × 100vh
- Background image fills wrapper
- Headline: Positioned at top
- Product cards: **2-column grid layout** at bottom of image (overlaid)
- Cards: Equal width, square dimensions
- No animations

**Critical Breakpoints:**
- 1440px+ (Desktop large)
- 1440px - 1250px
- 1240px - 1025px
- 1024px - 768px (Tablet)
- 768px - xs
- < xs (Mobile)

---

## Product Cards (Blocks)

### Block Settings
Each product card block contains:

1. **Product Image** (image_picker)
   - Required format: 1:1 square ratio
   - Recommended size: 600×600px minimum
   - Object-fit: cover

2. **Product Name** (text)
   - Character limit: 25-30 characters
   - INFO: "Recommended 25-30 characters. Text will overflow with ellipsis if longer."
   - Default: ""

3. **CTA Text** (text)
   - Character limit: 15-20 characters
   - INFO: "Recommended 15-20 characters. Text will overflow with ellipsis if longer."
   - Default: "View"

4. **CTA Link** (url)
   - Destination URL for the product/collection
   - Default: ""

### Block Constraints
- **Maximum blocks:** 4
- **Minimum blocks:** 0 (section can render with 0 blocks)
- Blocks display in order added (1, 2, 3, 4)
- Desktop positioning follows Figma design for each card position

---

## Section Settings

### Background Image
- **Type:** image_picker
- **ID:** background_image
- **Label:** "Background Image"
- **Info:** "Lifestyle photograph, recommended 1920×1528px for desktop"

### Headline Settings
- **Heading Text:**
  - Type: text
  - ID: heading_text
  - Label: "Heading Text"
  - Default: "Glamour"

- **Subtitle Text:**
  - Type: text
  - ID: subtitle_text
  - Label: "Subtitle Text"
  - Default: "is a condition, not a commodity."

### Styling (Hardcoded Fonts)
- Heading font: Bickham Script Pro Regular, 160px, #FFFAF5
- Subtitle font: Neue Haas Grotesk Display Pro 45 Light, 30px, #FFFAF5
- Product card overlay: rgba(27,27,27,0.19) (fixed in CSS)

---

## Assets Required

### Fonts
**Required fonts (loaded globally or via section):**
1. **Bickham Script Pro:**
   - Weight: Regular
   - Used for: Main heading ("Glamour")

2. **Neue Haas Grotesk Display Pro:**
   - Weights: 45 Light, 55 Roman
   - Used for: Subtitle, product names, CTA text

### Images
1. **Background Image:** Merchant uploads via section settings
   - Format: JPG/PNG
   - Recommended size: 1920×1528px (desktop)
   - Should be optimized for web

2. **Product Images:** Merchant uploads per block (max 4)
   - Format: PNG/JPG
   - **Required aspect ratio: 1:1 (square)**
   - Recommended size: 600×600px minimum
   - Higher resolution for retina displays

### JavaScript Libraries
- **GSAP:** For scroll animations (desktop only)
- CDN or npm package: To be determined in implementation

---

## Technical Requirements

### Files to Create
1. `sections/custom-section-glamor-collection-studio.liquid`
2. `assets/section-glamor-collection-studio.css`
3. `assets/section-glamor-collection-studio.js`

### BEM Class Structure
```
.custom-section-glamor-collection
  .custom-section-glamor-collection__wrapper
  .custom-section-glamor-collection__background
  .custom-section-glamor-collection__content
  .custom-section-glamor-collection__headline
  .custom-section-glamor-collection__headline-text
  .custom-section-glamor-collection__subtitle
  .custom-section-glamor-collection__cards
  .custom-section-glamor-collection__cards--desktop
  .custom-section-glamor-collection__cards--tablet
  .custom-section-glamor-collection__cards--mobile
  .custom-section-glamor-collection__card
  .custom-section-glamor-collection__card-overlay
  .custom-section-glamor-collection__card-image
  .custom-section-glamor-collection__card-name
  .custom-section-glamor-collection__card-cta
```

---

## Animation Specifications

### Desktop GSAP Animations
**Trigger:** When section enters viewport (on scroll)

**Headline Animation:**
- Fade in from opacity 0 to 1
- Translate Y: 20px → 0
- Duration: 0.6s
- Easing: ease-out
- Delay: 0.1s

**Product Cards Animation:**
- Fade in from opacity 0 to 1
- Translate Y: 30px → 0
- Duration: 0.5s
- Easing: ease-out
- Stagger: 0.15s between each card (sequential)
- Delay: 0.3s (after headline)

**No animations on tablet/mobile** (performance consideration)

---

## Conditional Rendering Rules

Content display logic:
- ✓ If background image uploaded → Show background
- ✗ If no background image → Show placeholder or solid color fallback
- ✓ If heading text filled → Show headline
- ✓ If subtitle text filled → Show subtitle
- ✓ For each block:
  - If product image uploaded → Show card
  - If product name filled → Show name (with ellipsis overflow)
  - If CTA text filled → Show CTA link
  - If CTA link filled → Make CTA clickable
- ✗ If block has no image → Don't render that block

---

## Testing Checklist

### Desktop (1440px+)
- [ ] Wrapper is 100vw × 1528px
- [ ] Background image covers wrapper completely
- [ ] Headline positioned at top-left as per Figma
- [ ] Product cards absolutely positioned as per Figma specs
- [ ] Card overlay is rgba(27,27,27,0.19)
- [ ] Product images are 1:1 square with object-fit: cover
- [ ] Text overflows with ellipsis beyond character limits
- [ ] GSAP animations trigger on scroll
- [ ] Headline fades in first, cards follow with stagger
- [ ] All 4 card positions render correctly (if 4 blocks added)

### Tablet (768px - 1024px)
- [ ] Wrapper is 100vw × 100vh
- [ ] Background image covers wrapper completely
- [ ] Headline positioned at top
- [ ] Product cards in 4-column grid at bottom
- [ ] Cards are equal width and square
- [ ] Cards overlay the bottom portion of background image
- [ ] No animations
- [ ] Grid gap is appropriate

### Mobile (< 768px)
- [ ] Wrapper is 100vw × 100vh
- [ ] Background image covers wrapper completely
- [ ] Headline positioned at top (responsive sizing)
- [ ] Product cards in 2-column grid at bottom
- [ ] Cards are equal width and square
- [ ] Cards overlay the bottom portion of background image
- [ ] No animations
- [ ] Grid gap is appropriate
- [ ] Headline text scales down appropriately

### Cross-Browser
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] GSAP loads and executes correctly
- [ ] Fonts load correctly
- [ ] Responsive breakpoints work as expected

### Section Settings
- [ ] Background image uploads and displays
- [ ] Heading text is editable
- [ ] Subtitle text is editable
- [ ] Can add up to 4 product blocks
- [ ] Can delete/reorder blocks
- [ ] Product image uploads and displays
- [ ] Product name displays with ellipsis overflow
- [ ] CTA text displays with underline
- [ ] CTA link works correctly

---

## Design Notes

- **Editorial Style:** Inspired by luxury fashion magazine layouts
- **Lifestyle Context:** Products shown in aspirational context rather than clinical product shots
- **Floating Cards:** Creates depth and visual interest through layering
- **Semi-Transparent Overlays:** Maintains connection to lifestyle image while showcasing products
- **Typography Hierarchy:** Script heading conveys luxury, sans-serif keeps product info clean
- **Responsive Strategy:** Desktop focuses on design fidelity, tablet/mobile prioritize usability with grid layouts
- **Character Limits:** Prevent layout breaking while giving merchants guidance
- **1:1 Images:** Ensures consistency across all product cards regardless of source image
- **GSAP Animations:** Subtle, elegant entrance that doesn't distract from content

---

## Developer Workflow

Before starting development, ensure you:
1. ✓ Read this overview document completely
2. ✓ Review `02-design-tokens.md` for exact Figma measurements
3. ✓ Review `03-implementation.md` for code structure and patterns
4. ✓ Read all relevant files in `docs/rules/` directory:
   - `01-WORKFLOW.md` - Complete development process
   - `02-DESIGN-EXTRACTION.md` - Figma extraction guidelines
   - `04-LIQUID-DEVELOPMENT.md` - Liquid coding standards
   - `05-CSS-STANDARDS.md` - CSS, BEM, breakpoints
   - `06-JAVASCRIPT-STANDARDS.md` - JavaScript and GSAP standards
   - `08-NAMING-CONVENTIONS.md` - File and class naming
5. ✓ Access Figma node (251:90) to verify exact positioning
6. ✓ Extract product card positions from Figma for desktop layout
7. ✓ Build directly in Liquid (no HTML prototype)
8. ✓ Test with Shopify CLI at localhost:9292
9. ✓ Test GSAP animations work correctly
10. ✓ Verify all breakpoints before committing

---

## Questions or Issues

If any specifications are unclear:
1. Reference the Figma node (251:90) for visual clarification
2. Check existing similar sections for patterns
3. Consult `docs/rules/` for standard practices
4. Refer to existing prototype sections like `product-showcase-diamension-the-studio`
5. Ask for clarification before making assumptions
