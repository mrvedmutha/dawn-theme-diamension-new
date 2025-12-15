# Image Hero with Text Section - Design Tokens

## 🎨 Overview

This document contains all design tokens (colors, spacing, typography, etc.) for the Image Hero with Text section. All measurements are based on the **1440px desktop viewport** as the base for 8-divisible responsive scaling.

**Figma Node:** `12:4725`
**Base Viewport:** 1440px W × 1040px H

---

## 📏 Container Dimensions

```json
{
  "container": {
    "desktop": {
      "width": "100%",
      "height": "100vh",
      "maxWidth": "1440px",
      "maxHeight": "1040px",
      "minHeight": "600px",
      "description": "Full viewport height on desktop, capped at Figma max (1040px)"
    },
    "tablet": {
      "width": "100%",
      "height": "80vh",
      "minHeight": "500px",
      "description": "80% viewport height on tablet"
    },
    "mobile": {
      "width": "100%",
      "height": "65vh",
      "minHeight": "400px",
      "description": "65% viewport height on mobile, leaves room at bottom"
    },
    "image": {
      "objectFit": "cover",
      "description": "Image fills container maintaining aspect ratio"
    }
  }
}
```

---

## 📐 Spacing Tokens (1440px Base)

```json
{
  "spacing": {
    "textContainer": {
      "top": "216px",
      "left": "56px",
      "description": "Heading start position from container top-left (at 1440px)"
    },
    "gaps": {
      "headingToCaption": "6px",
      "captionToCta": "64px",
      "description": "Vertical gaps between text elements"
    }
  }
}
```

### Spacing Calculations for Responsive

**Desktop (1440px+):**
- Uses absolute positioning: Top 216px, Left 56px
- Container height: 100vh (max 1040px)

**Tablet (1024px):**
- Scale factor: 71% (1024 / 1440)
- Top: 154px, Left: 40px
- Container height: 80vh

**Mobile (767px):**
- Scale factor: 53% (767 / 1440)
- Top: 115px, Left: 30px
- Container height: 65vh

| Viewport | Container Height | Top (216px) | Left (56px) | H→C Gap (6px) | C→CTA Gap (64px) |
|----------|------------------|-------------|-------------|---------------|------------------|
| 1440px   | 100vh (max 1040px) | 216px     | 56px        | 6px           | 64px             |
| 1024px   | 80vh             | 154px       | 40px        | 4px           | 46px             |
| 767px    | 65vh             | 115px       | 30px        | 3px           | 34px             |
| 375px    | 65vh (min 400px) | 56px        | 15px        | 2px           | 17px             |

**Formula:** `originalValue × (targetViewport / 1440)`

---

## 🔤 Typography Tokens

### Base Typography (Desktop - 1440px)

```json
{
  "typography": {
    "heading": {
      "fontFamily": "Neue Haas Grotesk Display Pro",
      "fontSize": "40px",
      "fontWeight": "Light (45)",
      "lineHeight": "TBD - Extract from Figma",
      "letterSpacing": "TBD - Extract from Figma",
      "textTransform": "uppercase",
      "color": "#FFFFFF",
      "textAlign": "left",
      "maxWidth": "none",
      "description": "Main hero heading - 'INTO THE RED'"
    },
    "caption": {
      "fontFamily": "Neue Haas Grotesk Display Pro",
      "fontSize": "20px",
      "fontWeight": "Light (45)",
      "lineHeight": "TBD - Extract from Figma",
      "letterSpacing": "TBD - Extract from Figma",
      "textTransform": "none",
      "color": "#FFFFFF",
      "textAlign": "left",
      "maxWidth": "600px (recommended)",
      "description": "Subheading/description text"
    },
    "cta": {
      "fontFamily": "Neue Haas Grotesk Display Pro",
      "fontSize": "20px",
      "fontWeight": "Light (45) or Regular (400)",
      "lineHeight": "TBD - Extract from Figma",
      "letterSpacing": "TBD - Extract from Figma",
      "textTransform": "none",
      "textDecoration": "underline",
      "textDecorationStyle": "solid",
      "color": "#FFFFFF",
      "textAlign": "left",
      "hoverState": "TBD - optional opacity or color change",
      "description": "Call-to-action link - 'Shop the Collection'"
    }
  }
}
```

**Note:** Values marked "TBD - Extract from Figma" must be extracted by developer from Figma node 12:4725 before implementation.

### Typography Scaling (Responsive)

| Viewport | Scale | Heading (40px) | Caption (20px) | CTA (20px) |
|----------|-------|----------------|----------------|------------|
| 1440px   | 100%  | 40px           | 20px           | 20px       |
| 1024px   | 71%   | 28px           | 14px           | 14px       |
| 767px    | 53%   | 21px           | 11px           | 11px       |
| 375px    | 26%   | 10px*          | 5px*           | 5px*       |

**Note:** At 375px, consider setting minimum font sizes (e.g., 16px for heading, 12px for caption) to maintain readability.

---

## 🎨 Color Tokens

```json
{
  "colors": {
    "text": {
      "primary": "#FFFFFF",
      "name": "White text (default)",
      "description": "Default text color for heading, caption, and CTA"
    },
    "overlay": {
      "default": "rgba(0, 0, 0, 0)",
      "name": "Transparent (no overlay by default)",
      "description": "Optional color overlay for text readability",
      "customizable": true
    },
    "background": {
      "fallback": "#000000",
      "name": "Black fallback",
      "description": "Fallback background if image fails to load"
    }
  }
}
```

### Customizable Color Settings

Merchants can customize via theme settings:
- **Text Color** - Color picker (default: #FFFFFF)
- **Overlay Color** - Color picker (default: rgba(0, 0, 0, 0))
- **Overlay Opacity** - Range slider 0-100% (default: 0%)

---

## 📱 Responsive Breakpoints

```json
{
  "breakpoints": {
    "desktop": {
      "minWidth": "1441px",
      "containerHeight": "100vh",
      "maxHeight": "1040px",
      "minHeight": "600px",
      "scale": "1.0",
      "behavior": "Full viewport height, capped at Figma max (1040px)",
      "description": "Large desktop - 100vh with max constraint"
    },
    "desktopBase": {
      "width": "1440px",
      "containerHeight": "100vh",
      "maxHeight": "1040px",
      "scale": "1.0",
      "behavior": "Base viewport, full viewport height",
      "description": "Desktop base - 100vh"
    },
    "tablet": {
      "maxWidth": "1024px",
      "containerHeight": "80vh",
      "minHeight": "500px",
      "scale": "0.7111",
      "calculation": "1024 / 1440 = 0.7111",
      "behavior": "80% viewport height, spacing scaled by 71.11%",
      "description": "Tablet - 80vh container"
    },
    "mobile": {
      "maxWidth": "767px",
      "containerHeight": "65vh",
      "minHeight": "400px",
      "scale": "0.5326",
      "calculation": "767 / 1440 = 0.5326",
      "behavior": "65% viewport height, spacing scaled by 53.26%",
      "description": "Mobile - 65vh container"
    },
    "smallMobile": {
      "maxWidth": "375px",
      "containerHeight": "65vh",
      "minHeight": "400px",
      "scale": "0.2604",
      "calculation": "375 / 1440 = 0.2604",
      "behavior": "65% viewport height with minimum constraints",
      "description": "Small mobile - 65vh with minimums"
    }
  }
}
```

---

## 🧮 Responsive Scaling Formula

### Container Height Formula

```javascript
// Desktop: Full viewport height (capped at Figma max)
const desktopHeight = 'min(100vh, 1040px)';

// Tablet: 80% viewport height
const tabletHeight = '80vh';

// Mobile: 65% viewport height
const mobileHeight = '65vh';
```

### Spacing Scale Formula

```javascript
// Calculate scale factor for spacing/typography
const scaleFactor = targetViewport / 1440;

// Apply to spacing measurements
const scaledValue = originalValue * scaleFactor;

// Example: Heading top position at 1024px
const headingTop = 216 * (1024 / 1440);
// Result: 154px
```

### CSS Implementation

```css
/* Base (1440px) - Full viewport height */
.hero {
  height: 100vh;
  max-height: 1040px; /* From Figma */
  min-height: 600px;
}

.hero__text-container {
  top: 216px;
  left: 56px;
}

.hero__heading {
  font-size: 40px;
  margin-bottom: 6px;
}

.hero__caption {
  font-size: 20px;
  margin-bottom: 64px;
}

/* Tablet (1024px) - 80vh, spacing scaled 71.11% */
@media (max-width: 1024px) {
  .hero {
    height: 80vh;
    min-height: 500px;
  }

  .hero__text-container {
    top: 154px;   /* 216 × 0.7111 */
    left: 40px;   /* 56 × 0.7111 */
  }

  .hero__heading {
    font-size: 28px;  /* 40 × 0.7111 */
    margin-bottom: 4px;  /* 6 × 0.7111 */
  }

  .hero__caption {
    font-size: 14px;  /* 20 × 0.7111 */
    margin-bottom: 46px;  /* 64 × 0.7111 */
  }
}

/* Mobile (767px) - 65vh, spacing scaled 53.26% */
@media (max-width: 767px) {
  .hero {
    height: 65vh;
    min-height: 400px;
  }

  .hero__text-container {
    top: 115px;   /* 216 × 0.5326 */
    left: 30px;   /* 56 × 0.5326 */
  }

  .hero__heading {
    font-size: 21px;  /* 40 × 0.5326 */
    margin-bottom: 3px;  /* 6 × 0.5326 */
  }

  .hero__caption {
    font-size: 11px;  /* 20 × 0.5326 */
    margin-bottom: 34px;  /* 64 × 0.5326 */
  }
}

/* Small Mobile (375px) - 65vh with minimum font sizes */
@media (max-width: 375px) {
  .hero {
    height: 65vh;
    min-height: 400px;
  }

  .hero__heading {
    font-size: max(16px, 10px);  /* Minimum for readability */
  }

  .hero__caption {
    font-size: max(12px, 5px);  /* Minimum for readability */
  }
}
```

---

## ✨ State & Interaction Tokens

```json
{
  "states": {
    "cta": {
      "default": {
        "color": "#FFFFFF",
        "textDecoration": "underline",
        "opacity": "1",
        "cursor": "pointer"
      },
      "hover": {
        "color": "#FFFFFF",
        "textDecoration": "underline",
        "opacity": "0.8",
        "transition": "opacity 0.3s ease",
        "description": "Optional hover effect"
      },
      "active": {
        "color": "#FFFFFF",
        "textDecoration": "underline",
        "opacity": "0.6",
        "description": "Optional active/click effect"
      }
    }
  }
}
```

---

## 🎯 Component Structure Tokens

```json
{
  "componentStructure": {
    "container": {
      "element": "section",
      "class": "image-hero-section",
      "maxWidth": "1440px",
      "height": "1040px",
      "position": "relative",
      "overflow": "hidden"
    },
    "image": {
      "element": "img",
      "class": "image-hero-section__background",
      "objectFit": "cover",
      "position": "absolute",
      "width": "100%",
      "height": "100%"
    },
    "overlay": {
      "element": "div",
      "class": "image-hero-section__overlay",
      "position": "absolute",
      "inset": "0",
      "backgroundColor": "customizable",
      "opacity": "customizable (0-1)"
    },
    "textContainer": {
      "element": "div",
      "class": "image-hero-section__text-container",
      "position": "absolute",
      "top": "216px",
      "left": "56px",
      "zIndex": "2"
    },
    "heading": {
      "element": "h1 or h2",
      "class": "image-hero-section__heading",
      "textTransform": "uppercase"
    },
    "caption": {
      "element": "p",
      "class": "image-hero-section__caption",
      "maxWidth": "600px"
    },
    "cta": {
      "element": "a",
      "class": "image-hero-section__cta",
      "textDecoration": "underline"
    }
  }
}
```

---

## 📊 Aspect Ratios

```json
{
  "aspectRatios": {
    "container": {
      "width": 1440,
      "height": 1040,
      "ratio": "72:52",
      "simplified": "approximately 1.38:1",
      "description": "Hero container aspect ratio"
    }
  }
}
```

---

## 🎬 Animation Tokens (Optional)

```json
{
  "animations": {
    "ctaHover": {
      "property": "opacity",
      "duration": "300ms",
      "easing": "ease",
      "fromValue": "1",
      "toValue": "0.8"
    },
    "imageLoad": {
      "property": "opacity",
      "duration": "500ms",
      "easing": "ease-in-out",
      "fromValue": "0",
      "toValue": "1",
      "description": "Optional fade-in when image loads"
    }
  }
}
```

---

## 📋 Schema Settings Tokens

```json
{
  "schemaSettings": {
    "image": {
      "type": "image_picker",
      "id": "background_image",
      "label": "Background Image",
      "info": "Recommended size: 1440×1040px or larger"
    },
    "heading": {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "INTO THE RED"
    },
    "caption": {
      "type": "textarea",
      "id": "caption",
      "label": "Caption",
      "default": "Jewelry that feels as good as it looks."
    },
    "ctaText": {
      "type": "text",
      "id": "cta_text",
      "label": "Button Text",
      "default": "Shop the Collection"
    },
    "ctaLink": {
      "type": "url",
      "id": "cta_link",
      "label": "Button Link"
    },
    "textColor": {
      "type": "color",
      "id": "text_color",
      "label": "Text Color",
      "default": "#FFFFFF"
    },
    "overlayColor": {
      "type": "color",
      "id": "overlay_color",
      "label": "Overlay Color",
      "default": "#000000"
    },
    "overlayOpacity": {
      "type": "range",
      "id": "overlay_opacity",
      "label": "Overlay Opacity",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 0
    }
  }
}
```

---

## 🎯 Key Measurements Summary Table

| Element | Desktop (1440px) | Tablet (1024px) | Mobile (767px) | Small (375px) |
|---------|------------------|-----------------|----------------|---------------|
| **Container Height** | 100vh (max 1040px) | 80vh (min 500px) | 65vh (min 400px) | 65vh (min 400px) |
| **Heading Top** | 216px | 154px | 115px | 56px |
| **Heading Left** | 56px | 40px | 30px | 15px |
| **H→C Gap** | 6px | 4px | 3px | 2px |
| **C→CTA Gap** | 64px | 46px | 34px | 17px |
| **Heading Font** | 40px | 28px | 21px | 16px* |
| **Caption Font** | 20px | 14px | 11px | 12px* |
| **CTA Font** | 20px | 14px | 11px | 12px* |

*With minimum size constraints for readability

---

## 🔍 Design Token Extraction Checklist

Before implementation, verify these values are extracted from Figma:

### Typography
- [ ] Heading font family (exact name)
- [ ] Heading font weight (exact numeric value)
- [ ] Heading line height
- [ ] Heading letter spacing
- [ ] Caption font family
- [ ] Caption font weight
- [ ] Caption line height
- [ ] Caption letter spacing
- [ ] CTA font family
- [ ] CTA font weight
- [ ] CTA line height
- [ ] CTA letter spacing

### Colors
- [ ] Text color (exact hex from Figma)
- [ ] Overlay color (if any, exact rgba)
- [ ] Overlay opacity (if any)

### Spacing
- [ ] Verify heading top: 216px
- [ ] Verify heading left: 56px
- [ ] Verify heading-caption gap: 6px
- [ ] Verify caption-CTA gap: 64px

---

## ⚠️ Important Notes

1. **Font Loading:** Ensure Neue Haas Grotesk Display Pro is loaded in theme
2. **Fallback Fonts:** Provide fallback fonts in CSS (e.g., sans-serif)
3. **Minimum Font Sizes:** At small viewports, enforce minimum readable sizes
4. **Overlay Calculation:** Convert percentage (0-100) to decimal (0-1) for CSS opacity
5. **Text Readability:** Always test text contrast against image backgrounds
6. **Performance:** Optimize background image size for web (recommend WebP format)

---

## 📞 Questions?

If any token value is unclear or missing:
1. Check FIGMA-REFERENCE.md for extraction instructions
2. Verify measurements in Figma node 12:4725
3. Ask human if still unclear - do NOT assume or approximate

---

**Last Updated:** 2025-12-15
**Version:** 1.0.0
**Figma Node:** `12:4725`
**Status:** Ready for implementation (pending Figma typography extraction)
