# Section: Headline Ring Collection

## Overview

A hero/feature section showcasing lab-grown diamond jewelry with a strong sustainability message. The section features a prominent headline "Brilliance Without Compromise," a parallax-animated product image, descriptive content, sustainability features with icons, and certification badges.

## Purpose

This section is designed to:
- Communicate the brand's core value proposition of sustainable luxury
- Showcase a hero product with visual interest through parallax scrolling
- Highlight quality craftmanship and eco-friendly practices
- Display industry certifications (IGI, GIA) to build trust
- Provide a call-to-action link to the brand story

## Before You Start

### Required Reading

1. **Figma Design Reference:**
   - **Node URL:** https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-4785&m=dev
   - **Node ID:** `12:4785`
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
- **Headline Text:** Three-part headline ("Brilliance" / "Without" / "Compromise")
- **CTA Link:** "Our story" link with customizable URL and text
- **Product Image:** Hero product image (uploaded as square, displayed at 304x304px with 3deg rotation)
- **Description Paragraph:** Main content explaining the product value proposition
- **Feature Icons:** Two sustainability features with custom icons and text
  - Quality Craftmanship (with icon)
  - Planet Friendly and Sustainably Made (with icon)
- **Certification Badges:** IGI and GIA badge images

### Interactions
- **Parallax Effect:** Product image floats/moves subtly on scroll using GSAP
- **Static Content:** All text and other elements remain static (no animations)

## Section Configuration

- **Type:** Shopify section (no blocks)
- **Schema:** All content managed through section settings
- **Defaults:** All default values match Figma design specifications
- **Customization:** Merchants can customize all text, images, and icons through the Shopify theme editor

## Technical Requirements

- **GSAP:** Already installed in `theme.liquid` - use for parallax animation
- **Responsive:** Mobile-first approach with breakpoints at 768px (tablet) and 1440px (desktop)
- **Image Requirements:** Product image should be uploaded in square aspect ratio for optimal display
- **Browser Support:** Modern browsers with CSS transforms and GSAP compatibility

## File Structure

```
prototype/section-headline-ring-collection/
├── overview.md              # This file - section overview and requirements
├── design-tokens.md         # Design specifications and measurements
└── implementation.md        # Technical implementation guide
```

## Next Steps

1. Read `design-tokens.md` for precise measurements and styling specifications
2. Read `implementation.md` for step-by-step development instructions
3. Review Figma design node for visual reference
4. Begin development following the implementation guide
