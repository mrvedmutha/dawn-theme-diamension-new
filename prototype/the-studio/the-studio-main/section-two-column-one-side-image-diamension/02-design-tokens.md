# Two-Column Hero Section - Design Tokens

## 📌 Purpose
This document contains all design specifications, measurements, colors, typography, and styling rules extracted from Figma. Use this as the single source of truth for styling decisions.

**Figma Source:** [Diamension - Dev - FINAL](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-)

**Primary Figma Node:** [12-9097](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-9097&m=dev)

**MANDATORY:** Before development, review ALL Figma nodes listed in this document and ALL rules in `docs/rules/`

---

## 🎨 Color Tokens

### Primary Colors
```css
--color-text-light: #fffaf5;      /* Heading text, description text, button background */
--color-text-dark: #183754;       /* Button text color */
--color-bg-wrapper: #fffaf5;      /* Section wrapper background */
```

### Background & Overlay Colors
```css
--color-gradient-start: rgba(197, 188, 160, 0);    /* Gradient overlay start (transparent) */
--color-gradient-end: rgba(0, 0, 0, 0.3);          /* Gradient overlay end (30% black) */
```

### Usage Map
| Element | Color Token | Hex/RGBA Value |
|---------|-------------|----------------|
| Wrapper background | `--color-bg-wrapper` | `#fffaf5` |
| Heading text | `--color-text-light` | `#fffaf5` |
| Description text | `--color-text-light` | `#fffaf5` |
| Button background | `--color-text-light` (white) | `#ffffff` |
| Button text | `--color-text-dark` | `#183754` |
| Gradient overlay start | `--color-gradient-start` | `rgba(197, 188, 160, 0)` |
| Gradient overlay end | `--color-gradient-end` | `rgba(0, 0, 0, 0.3)` |

---

## 🔤 Typography Tokens

### Font Families
```css
--font-primary: 'Neue Haas Grotesk Display Pro', sans-serif;
```

**Font Locations:**
- Neue Haas: `assets/fonts/neue-haas-display/`

**Available Weights:**
- **Neue Haas Grotesk Display Pro:**
  - 45 Light (300) - Heading text
  - 55 Roman (400) - Description text, button text

---

### Font Sizes
```css
/* Headings */
--font-size-h1: 60px;              /* Main heading (METROPOLITAN VIBES) */

/* Body Text */
--font-size-body: 16px;            /* Description text */

/* Button Text */
--font-size-button: 20px;          /* CTA button text */
```

---

### Line Heights
```css
--line-height-heading: 50px;       /* Heading line height */
--line-height-body: 20px;          /* Description line height */
--line-height-button: 50px;        /* Button line height (visual centering) */
```

---

### Typography Scale

| Element | Font Family | Size | Weight | Line Height | Color | Transform |
|---------|-------------|------|--------|-------------|-------|-----------|
| **Main Heading** | Neue Haas 45 Light | 60px | Light (300) | 50px | `#fffaf5` | Uppercase |
| **Description Text** | Neue Haas 55 Roman | 16px | Roman (400) | 20px | `#fffaf5` | None |
| **CTA Button** | Neue Haas 45 Light | 20px | Light (300) | 50px | `#183754` | Uppercase |

**From Figma Node 12-9097:**
- Heading: Font "Neue_Haas_Grotesk_Display_Pro:45_Light", 60px, line-height 50px, uppercase, white (#fffaf5)
- Description: Font "Neue_Haas_Grotesk_Display_Pro:55_Roman", 16px, line-height 20px, white (#fffaf5)
- Button: Font "Neue_Haas_Grotesk_Display_Pro:45_Light", 20px, line-height 50px, dark (#183754), uppercase

---

## 📐 Spacing Tokens

### Layout Dimensions
```css
--section-height-desktop: 800px;       /* Fixed height for desktop/tablet */
--section-height-mobile: 400px;        /* Fixed height per image on mobile */
--section-width: 100%;                 /* Full-width, no max-width */
```

### Container Spacing
```css
--container-max-width: none;           /* No max-width constraint */
--container-padding: 0;                /* No horizontal padding (full-width) */
```

### Content Overlay Spacing
```css
--overlay-padding-horizontal: 25px;    /* Button horizontal padding */
--overlay-padding-vertical: 10px;      /* Button vertical padding */
--overlay-gap: 24px;                   /* Gap between description and button (estimated) */
```

### Component-Specific Spacing

#### Text Overlay
```css
/* Positioning (from Figma Node 12-9100) */
position: absolute;
left: calc(50% - 366.65px);           /* Centered with offset */
top: calc(50% + 97.53px);             /* Centered with offset (below center) */
transform: translateX(-50%);           /* Additional centering adjustment */
```

#### CTA Button
```css
/* Positioning (from Figma Node 12-9101) */
position: absolute;
left: calc(50% - 581.15px);           /* Centered with offset */
top: 682.94px;                         /* Fixed from top */
transform: translateX(-50%);           /* Additional centering adjustment */

/* Dimensions */
width: 171px;
height: 49px;
padding: 10px 25px;
```

#### Description Text
```css
/* Positioning (from Figma Node 12-9103) */
position: absolute;
left: calc(50% - 666.65px);           /* Centered with offset */
top: calc(50% + 180.97px);            /* Centered with offset (below heading) */
width: 423.68px;                       /* Fixed width */
```

---

## 🔲 Component Tokens

### Wrapper
```css
/* Full-width wrapper */
wrapper-background: #fffaf5;
wrapper-width: 100%;
wrapper-position: relative;
```

---

### Image Blocks

#### Desktop/Tablet (≥768px)
```css
/* Image Container */
image-block-width: 50%;                /* Each image takes 50% width */
image-block-height: 800px;             /* Fixed height */
image-display: inline-block;           /* Side-by-side layout */
image-position: relative;

/* Image Element */
image-object-fit: cover;               /* Fill container, maintain aspect ratio */
image-object-position: center center;  /* Center image within container */
image-width: 100%;
image-height: 100%;
```

#### Mobile (<768px)
```css
/* Image Container */
image-block-width: 100%;               /* Full width */
image-block-height: 400px;             /* Half of desktop height */
image-display: block;                  /* Stacked layout */
image-position: relative;

/* Image Element */
image-object-fit: cover;
image-object-position: center center;
image-width: 100%;
image-height: 100%;
```

---

### Content Overlay

#### Container (from Figma analysis)
```css
/* Overlay Wrapper */
overlay-position: absolute;
overlay-display: flex;
overlay-flex-direction: column;
overlay-align-items: center;
overlay-justify-content: center;
overlay-z-index: 10;

/* Gradient Background (optional for better text readability) */
overlay-background: linear-gradient(
  to bottom,
  rgba(197, 188, 160, 0) 0%,
  rgba(0, 0, 0, 0.3) 100%
);
```

---

### Heading Text
```css
/* Typography */
heading-font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
heading-font-weight: 300;              /* 45 Light */
heading-font-size: 60px;
heading-line-height: 50px;
heading-color: #fffaf5;
heading-text-transform: uppercase;
heading-text-align: center;
heading-white-space: nowrap;

/* Positioning */
heading-position: absolute;
heading-left: calc(50% - 366.65px);
heading-top: calc(50% + 97.53px);
heading-transform: translateX(-50%);
```

---

### Description Text
```css
/* Typography */
description-font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
description-font-weight: 400;          /* 55 Roman */
description-font-size: 16px;
description-line-height: 20px;
description-color: #fffaf5;
description-text-align: left;

/* Positioning */
description-position: absolute;
description-left: calc(50% - 666.65px);
description-top: calc(50% + 180.97px);
description-width: 423.68px;
```

---

### CTA Button
```css
/* Container */
button-position: absolute;
button-left: calc(50% - 581.15px);
button-top: 682.94px;
button-transform: translateX(-50%);
button-width: 171px;
button-height: 49px;

/* Styling */
button-background: #ffffff;
button-padding: 10px 25px;
button-display: flex;
button-align-items: center;
button-justify-content: center;
button-border: none;

/* Typography */
button-font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
button-font-weight: 300;               /* 45 Light */
button-font-size: 20px;
button-line-height: 50px;
button-color: #183754;
button-text-transform: uppercase;
button-text-decoration: none;

/* Hover State */
button-hover-opacity: 0.9;
button-transition: opacity 0.3s ease;
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-mobile: 0px;              /* Mobile (default) */
--breakpoint-tablet: 768px;            /* Tablet */
--breakpoint-desktop: 1024px;          /* Desktop */
```

### Layout Changes by Breakpoint

#### Mobile (<768px)
```css
/* Images */
- Image blocks: 100% width, stacked vertically
- Image height: 400px each
- Total section height: 800px (2 × 400px)

/* Typography */
- Heading: 40px (reduced from 60px)
- Description: 14px (reduced from 16px)
- Button: 18px (reduced from 20px)
- Line heights: Proportionally adjusted

/* Content Overlay */
- Positioning: Centered on first image
- Width: Constrained to 90% of viewport
- Padding: 20px horizontal
```

#### Tablet (768px - 1023px)
```css
/* Images */
- Image blocks: 50% width, side-by-side
- Image height: 800px
- Total section height: 800px

/* Typography */
- Heading: 50px (slightly reduced from 60px)
- Description: 15px (slightly reduced from 16px)
- Button: 19px (slightly reduced from 20px)

/* Content Overlay */
- Positioning: Centered on left image
- Width: Adjusted to fit within 50% column
- Padding: 30px horizontal
```

#### Desktop (≥1024px)
```css
/* Images */
- Image blocks: 50% width, side-by-side
- Image height: 800px
- Total section height: 800px

/* Typography */
- Heading: 60px (as designed)
- Description: 16px (as designed)
- Button: 20px (as designed)

/* Content Overlay */
- Positioning: As specified in Figma (absolute positioning)
- Width: Fixed at 423.68px
- Padding: 25px horizontal
```

---

## 🎭 Animation Tokens

### Transitions
```css
--transition-fast: 0.2s ease;
--transition-default: 0.3s ease;
--transition-slow: 0.5s ease;
```

### Hover States
```css
/* Button Hover */
button-hover-opacity: 0.9;
button-hover-transform: translateY(-2px);
button-hover-transition: all 0.3s ease;
```

---

## 🖼️ Asset Specifications

### Images
```css
/* Background Images */
image-format: JPG, PNG, WebP;
image-min-width: 1920px;
image-min-height: 800px;
image-recommended-size: 1920px × 800px;
image-aspect-ratio: flexible (cover fills container);

/* Optimization */
image-compression: 80% quality;
image-lazy-loading: true;
image-srcset: 768w, 1024w, 1440w, 1920w;
```

---

## 📊 Z-Index Scale

```css
--z-index-base: 1;
--z-index-image: 1;
--z-index-overlay: 10;
--z-index-content: 20;
```

**Usage:**
- Background images: `z-index: 1`
- Gradient overlay: `z-index: 10`
- Text content: `z-index: 20`

---

## 🔍 Shadow Tokens

```css
--shadow-none: none;
--shadow-button: 0 2px 8px rgba(0, 0, 0, 0.15);
```

**Usage:**
- Button (default): `--shadow-none`
- Button (hover): `--shadow-button`

---

## 📏 Border Radius Tokens

```css
--radius-none: 0;
--radius-button: 0;                    /* No border radius on buttons */
```

**Usage:**
- All elements: `--radius-none` (sharp corners throughout design)

---

## 🎯 Focus States (Accessibility)

```css
--focus-outline-color: #183754;
--focus-outline-width: 2px;
--focus-outline-offset: 2px;
--focus-outline-style: solid;
```

**Apply to all interactive elements:**
- CTA buttons
- Any clickable overlays

---

## 📝 Figma Node Reference

**CRITICAL:** You MUST review these Figma nodes before development:

### Primary Nodes:
- **12-9097** - Complete two-column layout with overlay
- **12-9098** - Left image block (LAB01382 - champagne glass)
- **12-9099** - Right image block (LAB01382 - hands with jewelry)
- **12-9100** - Heading text ("METROPOLITAN VIBES")
- **12-9101** - CTA button container
- **12-9102** - CTA button text ("EXPLORE")
- **12-9103** - Description text paragraph

**Access via MCP:**
```javascript
mcp__figma-desktop-mcp__get_design_context({ nodeId: "12-9097" })
mcp__figma-desktop-mcp__get_screenshot({ nodeId: "12-9097" })
```

---

## 📐 Exact Measurements from Figma

### Left Image Block (Node 12-9098)
```css
width: 856.07px;                       /* In 1440px frame = ~59.45% */
height: 1283.949px;                    /* Extends beyond frame (cropped) */
position: absolute;
top: -483.95px;                        /* Negative top for cropping */
left: 706.69px;                        /* Positioned right of center */
```

### Right Image Block (Node 12-9099)
```css
width: 706.693px;                      /* In 1440px frame = ~49.08% */
height: 974.881px;                     /* Extends beyond frame (cropped) */
position: absolute;
top: -69.36px;                         /* Negative top for cropping */
left: 0;                               /* Positioned at left edge */
```

### Heading (Node 12-9100)
```css
font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
font-weight: 300;                      /* 45 Light */
font-size: 60px;
line-height: 50px;
color: #fffaf5;
text-transform: uppercase;
text-align: center;
white-space: nowrap;
position: absolute;
left: calc(50% - 366.65px);
top: calc(50% + 97.53px);
transform: translateX(-50%);
```

### CTA Button (Node 12-9101)
```css
width: 171px;
height: 49px;
padding: 10px 25px;
background: #ffffff;
position: absolute;
left: calc(50% - 581.15px);
top: 682.94px;
transform: translateX(-50%);
```

### Description (Node 12-9103)
```css
font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
font-weight: 400;                      /* 55 Roman */
font-size: 16px;
line-height: 20px;
color: #ffffff;
width: 423.68px;
position: absolute;
left: calc(50% - 666.65px);
top: calc(50% + 180.97px);
```

---

## ✅ Token Validation Checklist

Before submitting code, verify:

- [ ] All font sizes match token values exactly
- [ ] All colors use defined color tokens (no hardcoded hex)
- [ ] Typography uses correct font family (Neue Haas Grotesk Display Pro)
- [ ] Font weights are correct (Light 300 for heading, Roman 400 for description)
- [ ] Line heights match specifications
- [ ] Section height is 800px on desktop/tablet
- [ ] Section height is 400px per image on mobile
- [ ] Images are full-width (no max-width)
- [ ] Images use object-fit: cover
- [ ] Background color is #fffaf5
- [ ] Responsive breakpoints match specifications
- [ ] Button styling matches exactly
- [ ] Text overlay positioning is centered on left image
- [ ] All Figma nodes have been reviewed

---

## 🔗 Cross-Reference

**Before development, READ ALL:**
- `docs/rules/00-OVERVIEW.md` - Project philosophy
- `docs/rules/02-DESIGN-EXTRACTION.md` - Figma extraction process
- `docs/rules/04-LIQUID-DEVELOPMENT.md` - Liquid best practices
- `docs/rules/05-CSS-STANDARDS.md` - CSS architecture
- `docs/rules/08-NAMING-CONVENTIONS.md` - BEM naming

---

**Version:** 1.0
**Last Updated:** 2025-12-22
**Source:** Figma Design File - Diamension Dev Final (Node 12-9097)
**Developer:** MUST review ALL Figma nodes and rules before coding
