# Shop by Price Section - Design Tokens

## 🎨 Color Tokens

```json
{
  "colors": {
    "wrapper": {
      "background": "#FFFAF5",
      "name": "Off-white wrapper"
    },
    "text": {
      "primary": "#183754",
      "name": "Deep navy text"
    },
    "background": {
      "imageContainer": "#F0EFEA",
      "name": "Light beige (image bg only)"
    },
    "interactive": {
      "wishlistLiked": "#FFFCF9",
      "name": "Very light off-white"
    },
    "state": {
      "disabled": "rgba(24, 55, 84, 0.3)",
      "name": "Disabled text (30% opacity)"
    }
  }
}
```

---

## 📏 Spacing Tokens

```json
{
  "spacing": {
    "container": {
      "width": "1440px",
      "paddingTop": "120px",
      "paddingBottom": "120px",
      "paddingLeft": "56px",
      "paddingRight": "56px"
    },
    "sections": {
      "titleToTagline": "10px",
      "taglineToTabs": "88px",
      "tabsToUnderline": "16px",
      "underlineToCards": "64px",
      "imageTitleGap": "10px",
      "titlePriceGap": "8px",
      "cardsToCTA": "96px"
    },
    "layout": {
      "productCardWidth": "225px",
      "productCardHeight": "333px",
      "carouselLeftPadding": "10px",
      "carouselRightPadding": "10px",
      "tabsHorizontalPadding": "144px",
      "arrowToCardGap": "56px",
      "tabsGapDesktop": "141px"
    },
    "wishlist": {
      "topOffset": "16px",
      "rightOffset": "16px",
      "diameter": "26px"
    },
    "heart": {
      "width": "18px",
      "height": "18px"
    },
    "arrows": {
      "size": "24px"
    }
  }
}
```

---

## 🔤 Typography Tokens

```json
{
  "typography": {
    "title": {
      "fontFamily": "Neue Haas Grotesk Display Pro",
      "fontSize": "40px",
      "fontWeight": "Light (45)",
      "lineHeight": "45px",
      "textTransform": "uppercase",
      "letterSpacing": "0",
      "color": "#183754"
    },
    "tagline": {
      "fontFamily": "Neue Haas Grotesk Display Pro",
      "fontSize": "20px",
      "fontWeight": "Light (45)",
      "lineHeight": "30px",
      "color": "#183754",
      "maxWidth": "~400px"
    },
    "tabLabel": {
      "fontFamily": "Neue Haas Grotesk Display Pro / Noto Sans",
      "fontSize": "20px",
      "fontWeight": "Regular (400)",
      "lineHeight": "45px",
      "textTransform": "uppercase",
      "color": "#183754"
    },
    "productTitle": {
      "fontFamily": "Neue Haas Grotesk Display Pro",
      "fontSize": "20px",
      "fontWeight": "Light (45)",
      "lineHeight": "30px",
      "color": "#183754",
      "textAlign": "left",
      "whiteSpace": "nowrap",
      "overflow": "hidden",
      "textOverflow": "ellipsis",
      "maxWidth": "225px"
    },
    "productPrice": {
      "fontFamily": "Neue Haas Grotesk Display Pro / Noto Sans",
      "fontSize": "14px",
      "fontWeight": "Medium (500)",
      "lineHeight": "20px",
      "color": "#183754",
      "textAlign": "left",
      "maxWidth": "225px"
    },
    "shopAllButton": {
      "fontFamily": "Neue Haas Grotesk Display Pro / Noto Sans",
      "fontSize": "20px",
      "fontWeight": "Roman/Medium",
      "color": "#183754",
      "textDecoration": "underline",
      "textDecorationStyle": "solid"
    }
  }
}
```

---

## ✨ Animation Tokens

```json
{
  "animations": {
    "tabChange": {
      "underline": {
        "library": "GSAP",
        "duration": "400ms",
        "easing": "power2.inOut",
        "effect": "fadeIn/fadeOut"
      },
      "productCards": {
        "library": "GSAP",
        "duration": "400ms",
        "easing": "power2.inOut",
        "effect": "fadeIn/fadeOut (subtle)"
      }
    },
    "cardHover": {
      "imageZoom": {
        "type": "transform scale",
        "duration": "350ms",
        "easing": "ease-out",
        "scale": "1.05"
      }
    },
    "wishlistClick": {
      "scaleEffect": {
        "library": "GSAP or CSS",
        "duration": "250ms",
        "easing": "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
        "effect": "scaleDown -> scaleUp"
      }
    },
    "carouselScroll": {
      "smoothScroll": {
        "duration": "300ms",
        "easing": "ease-out"
      }
    }
  }
}
```

---

## 📱 Responsive Breakpoints

```json
{
  "breakpoints": {
    "mobile": {
      "maxWidth": "767px",
      "productsVisible": 2,
      "navigation": "touch-scroll-only",
      "tabsScroll": "horizontal-touch-scroll",
      "arrowButtons": false,
      "carouselType": "native-scroll"
    },
    "tablet": {
      "minWidth": "768px",
      "maxWidth": "1023px",
      "productsVisible": 4,
      "navigation": "arrow-buttons",
      "tabsScroll": "horizontal-touch-scroll",
      "arrowButtons": true,
      "carouselType": "arrow-scroll"
    },
    "desktop": {
      "minWidth": "1024px",
      "productsVisible": 5,
      "navigation": "arrow-buttons",
      "tabsScroll": "static-layout",
      "arrowButtons": true,
      "carouselType": "arrow-scroll"
    }
  }
}
```

---

## 🖼️ Component States

```json
{
  "states": {
    "tab": {
      "default": {
        "color": "#183754",
        "underlineVisible": false,
        "opacity": 1
      },
      "active": {
        "color": "#183754",
        "underlineVisible": true,
        "underlineAnimation": "fadeIn (400ms)"
      },
      "hover": {
        "color": "#183754",
        "opacity": 0.8
      }
    },
    "arrowButton": {
      "active": {
        "opacity": 1,
        "cursor": "pointer",
        "color": "#183754"
      },
      "disabled": {
        "opacity": 0.3,
        "cursor": "not-allowed",
        "color": "#183754"
      },
      "hover": {
        "opacity": 0.9
      }
    },
    "wishlistButton": {
      "default": {
        "background": "transparent",
        "heartColor": "#183754",
        "size": "26px"
      },
      "liked": {
        "background": "#FFFCF9",
        "heartColor": "#183754",
        "size": "26px"
      },
      "hover": {
        "background": "transparent",
        "heartColor": "#183754"
      },
      "active": {
        "animation": "scale-down-up (250ms)"
      }
    },
    "productCard": {
      "default": {
        "imageOpacity": 1,
        "secondImageVisible": false
      },
      "hover": {
        "imageAnimation": "zoom-in (350ms)",
        "secondImageVisible": true
      }
    }
  }
}
```

---

## 🔢 Aspect Ratios

```json
{
  "aspectRatios": {
    "productImage": {
      "width": 225,
      "height": 333,
      "ratio": "25:37"
    }
  }
}
```

---

## 📊 Product Data Structure

```json
{
  "productSchema": {
    "id": "string",
    "title": "string",
    "price": "number",
    "currency": "₹",
    "imageUrl": "string (transparent PNG)",
    "hoverImageUrl": "string",
    "productUrl": "string",
    "priceRange": "enum: ['below-25k', '25k-50k', '50k-100k', '100k-200k', 'above-200k']"
  }
}
```

---

## 🎯 Key Measurements Summary

| Element | Measurement |
|---------|-------------|
| Container Width | 1440px |
| Container Padding (TB) | 120px |
| Container Padding (LR) | 56px |
| Product Card Width | 225px |
| Product Card Height | 333px |
| Wishlist Button Size | 26px |
| Heart Icon Size | 18px |
| Arrow Size | 24px |
| Gap (Title to Tagline) | 10px |
| Gap (Tagline to Tabs) | 88px |
| Gap (Tabs to Underline) | 16px |
| Gap (Underline to Cards) | 64px |
| Gap (Image to Title) | 10px |
| Gap (Title to Price) | 8px |
| Gap (Cards to CTA) | 96px |
| Gap (Tabs Horizontal) | 141px |
| Tabs Padding (LR) | 144px |
| Arrow to Card Gap | 56px |
| Products Desktop | 5 |
| Products Tablet | 4 |
| Products Mobile | 2 |

---

## 🎬 GSAP Animation Examples

### Tab Change Underline Animation
```javascript
// Animate underline fade in
gsap.to(underlineElement, {
  duration: 0.4,
  opacity: 1,
  ease: "power2.inOut"
});

// Position change if needed
gsap.to(underlineElement, {
  duration: 0.4,
  x: newPosition, // X position of active tab
  ease: "power2.inOut"
});
```

### Product Cards Fade Animation
```javascript
// Fade out old cards
gsap.to(".product-card", {
  duration: 0.3,
  opacity: 0,
  ease: "power2.inOut"
});

// Fade in new cards
gsap.to(".product-card", {
  duration: 0.3,
  opacity: 1,
  ease: "power2.inOut",
  delay: 0.1
});
```

### Wishlist Scale Animation
```javascript
// Scale down then up
gsap.timeline()
  .to(wishlistButton, {
    duration: 0.1,
    scale: 0.85,
    ease: "power2.in"
  }, 0)
  .to(wishlistButton, {
    duration: 0.15,
    scale: 1,
    ease: "cubic-bezier(0.68, -0.55, 0.27, 1.55)"
  }, 0.1);
```

---

## 📝 Notes

- All colors use hex notation (#RRGGBB)
- Font weights use numeric values (45 for Light, 400 for Regular, 500 for Medium, etc.)
- Animations are subtle and not flashy - prioritize smooth, refined interactions
- Mobile has no arrow buttons - uses native touch scroll
- Product images have background only behind the image, not the entire card
- Wishlist API integration planned for future phases

