# Section: Diamension Follow Instagram

## Overview

A social proof and engagement section showcasing the brand's Instagram presence with a visually striking gallery layout. The section features a centered headline inviting users to follow on Instagram, four product images arranged in a creative staggered layout with a decorative rotated ellipse background, and a call-to-action link to Instagram.

## Purpose

This section is designed to:
- Drive social media engagement by directing users to the brand's Instagram profile
- Showcase curated product photography in an artistic, non-grid layout
- Create visual interest through asymmetric image positioning and decorative background element
- Provide social proof by displaying real product imagery from Instagram
- Build brand community and encourage user-generated content engagement

## Before You Start

### Required Reading

1. **Figma Design Reference:**
   - **Node URL:** https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-4744&m=dev
   - **Node ID:** `12:4744`
   - **Action:** Open the Figma file and review the design node thoroughly before starting development

2. **Development Rules:**
   - Read all documentation in `docs/rules/` folder
   - Pay special attention to:
     - `00-OVERVIEW.md` - Project structure and workflow
     - `02-DESIGN-EXTRACTION.md` - How to extract design specifications
     - `03-ASSET-MANAGEMENT.md` - Image and SVG handling
     - `04-LIQUID-DEVELOPMENT.md` - Liquid templating standards
     - `05-CSS-STANDARDS.md` - CSS/SCSS conventions
     - `06-JAVASCRIPT-STANDARDS.md` - JavaScript and GSAP usage
     - `08-NAMING-CONVENTIONS.md` - File and class naming

## Key Features

### Content Elements (All Merchant Customizable)
- **Headline Text:** Two-line heading ("FOLLOW US ON" / "INSTAGRAM")
- **Instagram Images:** Four product images from Instagram feed (uploaded as square 1:1 ratio)
- **Decorative Background:** Rotated ellipse SVG (pre-rotated, included in assets)
- **CTA Link:** "Instagram" link to brand's Instagram profile (customizable URL and text)

### Layout Pattern
- **Desktop:** Asymmetric staggered grid with 4 images
  - Odd images (1st, 3rd): Positioned 400px from top
  - Even images (2nd, 4th): Positioned 312px from bottom
  - Decorative ellipse centered vertically behind images
- **Tablet:** Linear horizontal row of 4 images, ellipse hidden, no gaps
- **Mobile:** 2×2 grid (2 images per row), ellipse hidden, no gaps

### Interactions
- **Parallax Effect:** Desktop only, applied to images (not containers)
  - Odd images (1st, 3rd): Top to bottom vertical movement
  - Even images (2nd, 4th): Bottom to top vertical movement (opposite direction)
  - Powered by GSAP + ScrollTrigger
- **Static Content:** Headline and CTA remain static (no animations)

## Section Configuration

- **Type:** Shopify section (no blocks)
- **Schema:** All content managed through section settings
- **Defaults:** All default values match Figma design specifications
- **Customization:** Merchants can customize headline text, images, Instagram URL, and CTA text through the Shopify theme editor

## Technical Requirements

- **GSAP:** Already installed in `theme.liquid` - use for parallax animation
- **Responsive:** Mobile-first approach with breakpoints at 768px (tablet) and 1024px (desktop)
- **Image Requirements:** All images should be uploaded in square 1:1 aspect ratio for consistent display
- **SVG Asset:** Decorative ellipse SVG already exists at `assets/custom-section-instagram/instagram-section-circle.svg`
- **Browser Support:** Modern browsers with CSS transforms and GSAP compatibility
- **Z-Index Management:** Proper layering required (background → ellipse → images → text)

## File Structure

```
prototype/section-diamension-follow-insta/
├── overview.md              # This file - section overview and requirements
├── design-tokens.md         # Design specifications and measurements
└── implementation.md        # Technical implementation guide

assets/custom-section-instagram/
└── instagram-section-circle.svg  # Pre-rotated decorative ellipse (already exists)
```

## Next Steps

1. Read `design-tokens.md` for precise measurements and styling specifications
2. Read `implementation.md` for step-by-step development instructions
3. Review Figma design node for visual reference
4. Read all documentation in `docs/rules/` folder
5. Begin development following the implementation guide
