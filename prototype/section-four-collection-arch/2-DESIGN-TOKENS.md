# Four Collection Arch Section - Design Tokens

## 🎨 Overview

This document contains all design tokens (colors, spacing, typography, dimensions) for the Four Collection Arch section. All measurements are extracted from Figma and represent exact specifications.

**Figma Nodes:**
- Header: `12:4784`
- Collection Grid: `12:4776`

**Base Viewport:** 1440px Desktop

---

## 📏 Container Dimensions

```json
{
  "sectionContainer": {
    "height": "640px",
    "width": "100%",
    "maxWidth": "none",
    "description": "Full-width container, 640px fixed height"
  },
  "sectionHeader": {
    "padding": "24px 0",
    "description": "24px top and bottom padding for header"
  },
  "cardGrid": {
    "desktop": {
      "columns": 4,
      "gridTemplateColumns": "repeat(4, 1fr)",
      "gap": "0px",
      "description": "4 equal columns, no gap between cards"
    },
    "tablet": {
      "columns": 4,
      "gridTemplateColumns": "repeat(4, 1fr)",
      "gap": "0px",
      "description": "Same as desktop"
    },
    "mobile": {
      "columns": 2,
      "gridTemplateColumns": "repeat(2, 1fr)",
      "gap": "0px",
      "rows": 2,
      "description": "2 columns, 2 rows for 4 cards total"
    }
  }
}
```

---

## 📐 Card Dimensions

### Desktop & Tablet (1440px, 1024px)

```json
{
  "card": {
    "width": "25%",
    "widthCalc": "100% / 4",
    "height": "544px",
    "heightFixed": true,
    "description": "Fixed 544px height on desktop and tablet"
  }
}
```

### Mobile (767px and below)

```json
{
  "card": {
    "width": "50%",
    "widthCalc": "100% / 2",
    "heightMode": "aspectRatio",
    "aspectRatios": {
      "square": "1 / 1",
      "portrait": "4 / 5",
      "tallPortrait": "9 / 16"
    },
    "defaultAspectRatio": "1 / 1",
    "description": "Width is 50%, height based on aspect ratio setting"
  }
}
```

---

## 🔤 Typography Tokens

### Section Header

```json
{
  "sectionHeader": {
    "fontFamily": "Neue Haas Grotesk Display Pro",
    "fontWeight": "45",
    "fontWeightName": "Light",
    "fontSize": "40px",
    "lineHeight": "45px",
    "letterSpacing": "normal",
    "textTransform": "uppercase",
    "textAlign": "center",
    "color": "#183754",
    "colorName": "Navy Blue",
    "defaultText": "YOUR STYLE, OUR COLLECTION",
    "notes": "Extracted from Figma node 12:4784"
  }
}
```

### Collection Title (Card Heading)

```json
{
  "collectionTitle": {
    "fontFamily": "Neue Haas Grotesk Display Pro",
    "fontWeight": "45",
    "fontWeightName": "Light",
    "fontSize": "40px",
    "fontSizeVariant": "41.924px",
    "lineHeight": "50.309px",
    "letterSpacing": "normal",
    "textTransform": "uppercase",
    "textAlign": "center",
    "color": "#FFFAF5",
    "colorName": "Cream White",
    "position": {
      "bottom": "152px",
      "description": "Bottom edge of text is 152px from bottom of card"
    },
    "spacing": {
      "paddingLeft": "40px",
      "paddingRight": "40px",
      "description": "40px horizontal margin on each side"
    },
    "examples": [
      "EVERYDAY ESSENTIALS",
      "STATEMENT JEWELRY",
      "ENGAGEMENT & BRIDAL",
      "GIFTS THAT SHINE"
    ],
    "notes": "Text may wrap to 2 lines if long. Line-height accounts for multi-line."
  }
}
```

### CTA Link ("View Collection")

```json
{
  "ctaLink": {
    "fontFamily": "Neue Montreal",
    "fontWeight": "Regular",
    "fontWeightValue": "400",
    "fontSize": "20px",
    "lineHeight": "40px",
    "letterSpacing": "normal",
    "textTransform": "none",
    "textDecoration": "underline",
    "textDecorationStyle": "solid",
    "textUnderlineOffset": "25%",
    "textAlign": "center",
    "color": "#FFFAF5",
    "colorName": "Cream White",
    "position": {
      "bottom": "56px",
      "description": "Bottom edge of text is 56px from bottom of card"
    },
    "visibility": {
      "desktop": "hidden",
      "desktopOpacity": "0",
      "desktopVisibilityOnHover": "visible",
      "tablet": "visible",
      "tabletOpacity": "1",
      "mobile": "visible",
      "mobileOpacity": "1",
      "description": "Hidden on desktop, shows on hover. Always visible on tablet/mobile."
    },
    "defaultText": "View Collection",
    "notes": "Underline offset 25% creates space between text and underline"
  }
}
```

---

## 🎨 Color Tokens

### Section Colors

```json
{
  "colors": {
    "sectionHeader": {
      "text": "#183754",
      "textName": "Navy Blue",
      "customizable": true,
      "description": "Heading text color"
    },
    "collectionCard": {
      "titleText": "#FFFAF5",
      "titleTextName": "Cream White",
      "ctaText": "#FFFAF5",
      "ctaTextName": "Cream White",
      "customizable": true,
      "description": "Text colors on card overlays"
    },
    "background": {
      "sectionBg": "transparent",
      "cardBg": "Cover image (merchant uploads)",
      "fallback": "#000000",
      "description": "Section background transparent, cards use uploaded images"
    }
  }
}
```

---

## 📐 Spacing Tokens

### Section Spacing

```json
{
  "spacing": {
    "sectionContainer": {
      "height": "640px",
      "paddingTop": "0px",
      "paddingBottom": "0px",
      "paddingLeft": "0px",
      "paddingRight": "0px"
    },
    "sectionHeader": {
      "paddingTop": "24px",
      "paddingBottom": "24px",
      "totalHeight": "calc(40px line-height + 48px padding)",
      "description": "24px padding top and bottom of header text"
    },
    "cardGrid": {
      "gap": "0px",
      "rowGap": "0px",
      "columnGap": "0px",
      "description": "No gap between cards - edge to edge"
    }
  }
}
```

### Card Internal Spacing

```json
{
  "cardSpacing": {
    "titlePosition": {
      "bottom": "152px",
      "description": "Title bottom edge is 152px from card bottom"
    },
    "ctaPosition": {
      "bottom": "56px",
      "description": "CTA bottom edge is 56px from card bottom"
    },
    "titlePadding": {
      "left": "40px",
      "right": "40px",
      "description": "40px horizontal padding for title text"
    },
    "ctaPadding": {
      "left": "0px",
      "right": "0px",
      "description": "CTA is centered, no extra padding"
    }
  }
}
```

---

## 📱 Responsive Breakpoints

```json
{
  "breakpoints": {
    "desktop": {
      "minWidth": "1441px",
      "behavior": "Same as 1440px base",
      "columns": 4,
      "cardHeight": "544px",
      "hoverEffects": true
    },
    "desktopBase": {
      "width": "1440px",
      "behavior": "Base design viewport",
      "columns": 4,
      "cardHeight": "544px",
      "hoverEffects": true
    },
    "tablet": {
      "maxWidth": "1024px",
      "behavior": "Same layout as desktop, no hover",
      "columns": 4,
      "cardHeight": "544px",
      "hoverEffects": false
    },
    "mobile": {
      "maxWidth": "767px",
      "behavior": "2 columns, aspect ratio height",
      "columns": 2,
      "rows": 2,
      "cardHeight": "Based on aspect-ratio",
      "hoverEffects": false
    },
    "smallMobile": {
      "maxWidth": "375px",
      "behavior": "Same as mobile",
      "columns": 2,
      "cardHeight": "Based on aspect-ratio",
      "hoverEffects": false
    }
  }
}
```

---

## 🎬 Animation Tokens (GSAP)

### Hover Animation - Arch Effect

```json
{
  "archAnimation": {
    "property": "border-radius",
    "fromValue": "0",
    "toValue": {
      "topLeft": "50%",
      "topRight": "50%",
      "bottomLeft": "0",
      "bottomRight": "0"
    },
    "duration": "0.6s",
    "durationRecommended": "0.4s to 0.6s",
    "easing": "power2.out",
    "alternativeEasing": "ease",
    "description": "Top corners become 50% radius on hover, creating arch",
    "deviceSupport": "Desktop only (>= 768px)"
  }
}
```

### Hover Animation - CTA Fade & Move

```json
{
  "ctaAnimation": {
    "sequence": [
      {
        "step": 1,
        "action": "Fade out",
        "property": "opacity",
        "fromValue": "0",
        "toValue": "0",
        "duration": "0.2s",
        "description": "Start hidden (opacity 0)"
      },
      {
        "step": 2,
        "action": "Fade in and move",
        "properties": ["opacity", "transform"],
        "opacity": {
          "fromValue": "0",
          "toValue": "1"
        },
        "transform": {
          "fromValue": "translateY(10px)",
          "toValue": "translateY(0)",
          "description": "Move from 10px below to original position"
        },
        "duration": "0.4s",
        "easing": "power2.out"
      }
    ],
    "totalDuration": "0.6s",
    "durationRecommended": "0.4s to 0.6s",
    "easing": "power2.out",
    "alternativeEasing": "ease",
    "description": "CTA fades in while moving up on hover",
    "deviceSupport": "Desktop only (>= 768px)"
  }
}
```

---

## 🏗️ Component Structure Tokens

```json
{
  "componentStructure": {
    "section": {
      "element": "section",
      "class": "custom-section-four-collection-arch",
      "height": "640px",
      "width": "100%"
    },
    "header": {
      "element": "div",
      "class": "custom-section-four-collection-arch__header",
      "children": ["heading"]
    },
    "heading": {
      "element": "h2",
      "class": "custom-section-four-collection-arch__heading",
      "textContent": "Merchant editable"
    },
    "grid": {
      "element": "div",
      "class": "custom-section-four-collection-arch__grid",
      "display": "grid",
      "gridTemplateColumns": "repeat(4, 1fr)",
      "gap": "0"
    },
    "card": {
      "element": "div",
      "class": "custom-section-four-collection-arch__card",
      "position": "relative",
      "overflow": "hidden",
      "height": "544px"
    },
    "cardLink": {
      "element": "a",
      "class": "custom-section-four-collection-arch__card-link",
      "position": "absolute",
      "inset": "0"
    },
    "cardImage": {
      "element": "img",
      "class": "custom-section-four-collection-arch__card-image",
      "objectFit": "cover",
      "width": "100%",
      "height": "100%"
    },
    "cardContent": {
      "element": "div",
      "class": "custom-section-four-collection-arch__card-content",
      "position": "absolute",
      "inset": "0",
      "zIndex": "2"
    },
    "cardTitle": {
      "element": "h3",
      "class": "custom-section-four-collection-arch__card-title",
      "position": "absolute",
      "bottom": "152px",
      "textAlign": "center",
      "width": "100%",
      "padding": "0 40px"
    },
    "cardCta": {
      "element": "span",
      "class": "custom-section-four-collection-arch__card-cta",
      "position": "absolute",
      "bottom": "56px",
      "textAlign": "center",
      "width": "100%",
      "opacity": "0 (desktop), 1 (mobile/tablet)"
    }
  }
}
```

---

## 📊 Aspect Ratios (Mobile)

```json
{
  "mobileAspectRatios": {
    "square": {
      "label": "1:1 (Square)",
      "value": "1 / 1",
      "cssValue": "aspect-ratio: 1 / 1",
      "description": "Default - balanced square cards",
      "recommended": true
    },
    "portrait": {
      "label": "5:4 (Portrait)",
      "value": "4 / 5",
      "cssValue": "aspect-ratio: 4 / 5",
      "description": "Slightly taller - Instagram style"
    },
    "tallPortrait": {
      "label": "9:16 (Tall Portrait)",
      "value": "9 / 16",
      "cssValue": "aspect-ratio: 9 / 16",
      "description": "Very tall - Story format"
    }
  }
}
```

---

## 🎯 State Tokens

### Desktop Hover States

```json
{
  "hoverStates": {
    "card": {
      "default": {
        "borderRadius": "0",
        "cursor": "pointer"
      },
      "hover": {
        "borderRadius": "50% 50% 0 0",
        "cursor": "pointer",
        "transition": "border-radius 0.6s power2.out",
        "description": "Arch effect on top corners"
      }
    },
    "cta": {
      "default": {
        "opacity": "0",
        "transform": "translateY(0)",
        "visibility": "hidden"
      },
      "hover": {
        "opacity": "1",
        "transform": "translateY(0)",
        "visibility": "visible",
        "animation": "Fade in while moving up",
        "transition": "opacity 0.4s, transform 0.4s",
        "easing": "power2.out"
      }
    }
  }
}
```

### Mobile/Tablet States (No Hover)

```json
{
  "mobileStates": {
    "card": {
      "default": {
        "borderRadius": "0",
        "cursor": "pointer"
      },
      "tap": {
        "borderRadius": "0",
        "description": "No visual change on tap"
      }
    },
    "cta": {
      "always": {
        "opacity": "1",
        "visibility": "visible",
        "description": "Always visible, no animation"
      }
    }
  }
}
```

---

## 🖼️ Image Specifications

```json
{
  "images": {
    "cardBackground": {
      "recommendedSize": "800x1200px",
      "minSize": "600x900px",
      "maxSize": "2000x3000px",
      "aspectRatio": "Flexible (uses object-fit: cover)",
      "format": "JPG, PNG, WebP",
      "optimization": "Recommended: WebP for best performance",
      "objectFit": "cover",
      "objectPosition": "center center",
      "loading": "lazy",
      "description": "Merchant uploads via image picker"
    }
  }
}
```

---

## 📋 Schema Settings Tokens

### Section Settings

```json
{
  "sectionSettings": {
    "heading": {
      "type": "text",
      "id": "heading",
      "label": "Section Heading",
      "default": "YOUR STYLE, OUR COLLECTION"
    },
    "heading_color": {
      "type": "color",
      "id": "heading_color",
      "label": "Heading Color",
      "default": "#183754"
    },
    "mobile_aspect_ratio": {
      "type": "select",
      "id": "mobile_aspect_ratio",
      "label": "Mobile Card Aspect Ratio",
      "options": [
        {
          "value": "1-1",
          "label": "1:1 (Square)"
        },
        {
          "value": "5-4",
          "label": "5:4 (Portrait)"
        },
        {
          "value": "9-16",
          "label": "9:16 (Tall Portrait)"
        }
      ],
      "default": "1-1"
    }
  }
}
```

### Block Settings (Per Card)

```json
{
  "blockSettings": {
    "image": {
      "type": "image_picker",
      "id": "image",
      "label": "Collection Image"
    },
    "title": {
      "type": "text",
      "id": "title",
      "label": "Collection Title",
      "default": "Collection Name"
    },
    "cta_text": {
      "type": "text",
      "id": "cta_text",
      "label": "CTA Text",
      "default": "View Collection"
    },
    "cta_link": {
      "type": "url",
      "id": "cta_link",
      "label": "CTA Link"
    },
    "text_color": {
      "type": "color",
      "id": "text_color",
      "label": "Text Color",
      "default": "#FFFAF5"
    }
  }
}
```

---

## 🎯 Key Measurements Summary Table

| Element | Desktop/Tablet | Mobile | Notes |
|---------|----------------|--------|-------|
| **Section Height** | 640px | 640px | Fixed height |
| **Header Padding** | 24px (top/bottom) | 24px | Consistent |
| **Card Width** | 25% (4 columns) | 50% (2 columns) | Responsive |
| **Card Height** | 544px | Aspect ratio (1:1, 5:4, 9:16) | Fixed vs fluid |
| **Card Gap** | 0px | 0px | Edge to edge |
| **Title Bottom** | 152px | 152px | From card bottom |
| **Title Padding** | 40px (left/right) | 40px | Horizontal spacing |
| **CTA Bottom** | 56px | 56px | From card bottom |
| **CTA Opacity** | 0 (hover: 1) | 1 | Hidden on desktop |
| **Header Font** | 40px | 40px | Neue Haas Display |
| **Title Font** | 40px | 40px | Neue Haas Display |
| **CTA Font** | 20px | 20px | Neue Montreal |

---

## 🔍 Design Token Extraction Checklist

Before implementation, verify these tokens from Figma:

### Typography
- [x] Section heading font: Neue Haas Grotesk Display Pro 45 Light
- [x] Section heading size: 40px
- [x] Section heading line-height: 45px
- [x] Section heading color: #183754
- [x] Card title font: Neue Haas Grotesk Display Pro 45 Light
- [x] Card title size: 40px (41.924px variant)
- [x] Card title line-height: 50.309px
- [x] Card title color: #FFFAF5
- [x] CTA font: Neue Montreal Regular
- [x] CTA size: 20px
- [x] CTA line-height: 40px
- [x] CTA color: #FFFAF5
- [x] CTA underline offset: 25%

### Spacing
- [x] Section height: 640px
- [x] Header padding: 24px top/bottom
- [x] Card height: 544px (desktop)
- [x] Title bottom position: 152px
- [x] CTA bottom position: 56px
- [x] Title side margins: 40px

### Colors
- [x] Header text: #183754
- [x] Card text: #FFFAF5
- [x] CTA text: #FFFAF5

### Dimensions
- [x] Card dimensions: 358.87px × 544.174px (Figma)
- [x] Grid columns: 4 (desktop), 2 (mobile)
- [x] Card gap: 0px

---

## ⚠️ Important Notes

1. **Font Loading:** Ensure fonts are loaded in theme:
   - Neue Haas Grotesk Display Pro (weight 45 Light)
   - Neue Montreal (weight Regular/400)

2. **Fallback Fonts:**
   ```css
   font-family: 'Neue Haas Grotesk Display Pro', 'Helvetica Neue', Arial, sans-serif;
   font-family: 'Neue Montreal', 'Helvetica Neue', Arial, sans-serif;
   ```

3. **Color Accessibility:**
   - Verify text contrast ratio on images
   - Provide overlay option if needed for readability

4. **GSAP Version:**
   - Use GSAP 3.x for animations
   - Recommended: power2.out easing for smooth feel

5. **CSS Custom Properties:**
   Use for merchant-customizable values:
   ```css
   --heading-color: #{section.settings.heading_color};
   --card-text-color: #{block.settings.text_color};
   --mobile-aspect-ratio: 1 / 1;
   ```

---

## 📞 Questions?

If any token value is unclear:
1. Use Figma MCP to verify exact measurements from nodes 12:4784, 12:4776
2. Check 3-IMPLEMENTATION.md for code examples
3. Refer to @docs/rules/ for project standards
4. Ask stakeholder before assuming values

---

**Last Updated:** 2025-12-16
**Version:** 1.0.0
**Figma Nodes:** `12:4784`, `12:4776`
**Status:** Ready for implementation
