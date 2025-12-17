# Section: Diamension Before Footer Hero

## Overview

A powerful brand storytelling section featuring a founder's quote with a dramatic product image overlay. This section is designed to appear before the footer, leaving a lasting emotional impression on visitors with brand philosophy and luxury product imagery.

## Purpose

This section is designed to:
- Communicate the brand's core philosophy about jewelry as lifelong companions
- Create emotional connection through founder's authentic voice
- Showcase luxury product (diamond ring) with striking visual presentation
- Serve as a compelling closing statement before the footer
- Reinforce brand values of quality, longevity, and meaningful jewelry

## Before You Start

### CRITICAL: File Naming Convention

**Shopify Section File Name:** `custom-diamension-before-footer-hero.liquid`

**Pattern:** `custom-[folder-name]`

This naming convention is MANDATORY. When creating the Shopify section file, you MUST use the exact name `custom-diamension-before-footer-hero.liquid` following the pattern where "folder-name" is `diamension-before-footer-hero`.

### Required Reading (MUST READ BEFORE DEVELOPING)

1. **Figma Design Reference:**
   - **Node URL:** https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-4897&m=dev
   - **Node ID:** `12:4897`
   - **Action:** Open the Figma file and thoroughly review the design node to understand the visual layout, spacing, and design intent before writing any code

2. **Development Rules (Read ONLY the required ones):**

   **MUST READ:**
   - `docs/rules/00-OVERVIEW.md` - Project structure and workflow
   - `docs/rules/02-DESIGN-EXTRACTION.md` - How to extract design specifications from Figma
   - `docs/rules/04-LIQUID-DEVELOPMENT.md` - Liquid templating standards and best practices
   - `docs/rules/05-CSS-STANDARDS.md` - CSS/BEM methodology and breakpoint standards
   - `docs/rules/08-NAMING-CONVENTIONS.md` - File and class naming conventions

   **READ IF APPLICABLE:**
   - `docs/rules/03-ASSET-MANAGEMENT.md` - If working with images/assets
   - `docs/rules/06-JAVASCRIPT-STANDARDS.md` - If adding any JavaScript functionality
   - `docs/rules/07-TESTING.md` - Before final testing phase

## Key Features

### Content Elements (All Merchant Customizable)

- **Quote Text:** Main founder's quote about jewelry philosophy
  - Default: "We believe jewelry should be something you never take off. A companion to your memory, made to last a lifetime, the kind you'll invest in and pass down."
  - Fully customizable text content via section settings
  - Center-aligned within fixed-width container (desktop)

- **Caption Text:** Founder attribution line
  - Default: "—KARAN, FOUNDER"
  - Fully customizable text via section settings
  - Uppercase styling
  - 48px gap from quote text bottom

- **Hero Product Image:** Luxury ring image with strategic positioning
  - 1:1 aspect ratio (square) for upload
  - Displays at 800×800px in container
  - Fully customizable via image_picker in section settings
  - Merchant-adjustable vertical offset positioning
  - Image appears to "emerge" from bottom of section

### Interactions

- **Static Content:** No animations or transitions - focuses on clean, impactful presentation
- **Image Positioning:** Merchant can control how much of the image is visible using offset settings

## Section Configuration

- **Type:** Shopify section (no blocks)
- **Schema:** All content managed through section settings
  - Quote text (textarea)
  - Caption text (text input)
  - Product image (image_picker)
  - Image offset (range slider)
- **Defaults:** All default values match Figma design specifications
- **Customization:** Merchants can customize quote text, caption, image, and image offset through the Shopify theme editor

## Technical Requirements

### Layout Specifications

**Wrapper:**
- Background color: `#212121` (dark charcoal)
- Full-width background
- Adapts to content height

**Container:**
- Desktop dimensions: 1440px (width) × 672px (height)
- Centered alignment
- Responsive height adaptation on smaller screens

**Quote Text:**
- Desktop: Fixed dimensions 704px (w) × 184px (h)
- Position: Top edge at 104px from container top
- Center-aligned container with center-aligned text
- Responsive width: Must be divisible by 8 (704px → 640px → 576px → 512px → 448px → 384px → 320px)

**Caption Text:**
- Position: 48px gap below quote text bottom edge
- Center-aligned
- Uppercase transformation applied

**Product Image:**
- Upload requirement: 1:1 square aspect ratio
- Display size: 800×800px
- Positioning: Offset from bottom (merchant adjustable)
- Two positioning approaches:
  - Option A (Recommended): Image offset from bottom, appearing to "rise up"
  - Merchant control via schema setting

### Responsive Behavior

- **Desktop (1440px):** Full layout with precise positioning
- **Tablet (768px-1024px):** Proportional scaling, container height adapts
- **Mobile (<768px):** Stacked vertical layout, image scales down

### Image Requirements

- **Upload format:** Square aspect ratio (recommended: 1200×1200px minimum)
- **File format:** JPG or PNG
- **Optimization:** Shopify image_url filter with srcset for responsive images

## File Structure

```
prototype/diamension-before-footer-hero/
├── 01-overview.md           # This file - section overview and requirements
├── 02-design-token.md       # Design specifications, measurements, and tokens
└── 03-implementation.md     # Technical implementation guide and code

sections/
└── custom-diamension-before-footer-hero.liquid    # Main section file

assets/
├── section-diamension-before-footer-hero.css       # Section styles
└── (optional) custom-diamension-before-footer-hero.js  # If JavaScript needed
```

## Design Highlights

### Visual Characteristics

1. **Dark, Dramatic Background:** The `#212121` charcoal background creates high contrast with light cream text
2. **Elegant Typography:** Large, readable quote text with refined spacing
3. **Product Focus:** The ring image provides visual interest without competing with the message
4. **Minimal Layout:** Clean, uncluttered design focuses attention on the quote and product
5. **Strategic Positioning:** Before-footer placement ensures this message is the last major content visitors see

### Brand Messaging

The section communicates:
- **Longevity:** "never take off," "lifetime," "pass down"
- **Meaning:** "companion to your memory"
- **Quality:** "invest in"
- **Founder Authenticity:** Direct quote from founder Karan

## Next Steps

1. **Read `02-design-token.md`** for precise measurements, spacing, typography, and color specifications
2. **Read `03-implementation.md`** for step-by-step development instructions and code examples
3. **Review Figma design node** (`12:4897`) for visual reference and design context
4. **Read required rules** from `docs/rules/` folder (listed above)
5. **Begin development** following the implementation guide with exact specifications

## Developer Notes

### Important Reminders

1. **File Naming:** Section file MUST be named `custom-diamension-before-footer-hero.liquid`
2. **Figma First:** Always review the Figma node before coding to understand design intent
3. **BEM Methodology:** Use `.custom-diamension-before-footer-hero` as the base class
4. **No Core Modifications:** Never modify core Dawn theme files
5. **8-Divisible Widths:** All responsive quote text widths must be divisible by 8
6. **Desktop-First CSS:** Write base styles for 1440px, then add responsive breakpoints
7. **Testing:** Test on all breakpoints (1440px+, 1024px, 768px, 375px) before committing

### Schema Setting Priorities

1. **Quote Text** - Core content, default matches Figma (merchant customizable)
2. **Caption Text** - Founder attribution, default matches Figma (merchant customizable)
3. **Product Image** - Critical visual element (merchant customizable)
4. **Image Offset** - Merchant control for positioning (range input recommended)

---

**Ready to develop?** Proceed to `02-design-token.md` for exact specifications.
