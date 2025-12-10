# Feature Slider with Left Image - Asset Checklist

## Required Assets

### 1. Product Images (Collection-Based)
**Type:** Dynamic (pulled from Shopify collection)

| Asset | Format | Aspect Ratio | Specifications | Status |
|-------|--------|--------------|----------------|--------|
| Product Images | JPEG / PNG / WebP | 2:3 preferred (or square) | Max 2MB per image, 72-96 DPI | To be provided by merchant via Shopify |
| Product Titles | - | - | Text from Shopify product data | Auto-pulled |
| Product Prices | - | - | Text from Shopify product data | Auto-pulled |

**Note:** Merchant will upload product images directly to Shopify. This section pulls them via collection API.

---

### 2. Sidebar/Top Image (Section Settings)
**Type:** Merchant-uploaded via theme customizer

| Asset | Format | Aspect Ratio | Specifications | Status |
|-------|--------|--------------|----------------|--------|
| Sidebar/Top Image | JPEG / PNG / WebP | 1:1 (Square) | Max 3MB, 72-96 DPI, optimized | To be provided by merchant |

**Purpose:** Static image displayed on left sidebar (desktop) or top of section (mobile/tablet)

**Upload Location:** Via section settings `sidebar_image` (image_picker)

---

### 3. SVG Icons

#### Arrow Navigation Icon
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M13.103 19.1471C12.9977 19.0417 12.9385 18.8987 12.9385 18.7496C12.9385 18.6006 12.9977 18.4576 13.103 18.3521L18.8921 12.5621L3.7505 12.5621C3.60131 12.5621 3.45824 12.5029 3.35275 12.3974C3.24726 12.2919 3.188 12.1488 3.188 11.9996C3.188 11.8505 3.24726 11.7074 3.35275 11.6019C3.45824 11.4964 3.60131 11.4371 3.7505 11.4371L18.8921 11.4371L13.103 5.64714C13.0036 5.54051 12.9495 5.39948 12.9521 5.25375C12.9547 5.10802 13.0137 4.96898 13.1168 4.86592C13.2198 4.76287 13.3589 4.70383 13.5046 4.70126C13.6503 4.69869 13.7914 4.75278 13.898 4.85214L20.648 11.6021C20.7533 11.7076 20.8125 11.8506 20.8125 11.9996C20.8125 12.1487 20.7533 12.2917 20.648 12.3971L13.898 19.1471C13.7925 19.2525 13.6496 19.3116 13.5005 19.3116C13.3514 19.3116 13.2085 19.2525 13.103 19.1471Z" fill="black"/>
</svg>
```

**Specifications:**
- Size: 24x24px
- Color: Black (`#000000`)
- Format: SVG (inline in Liquid or as asset)
- States: Default (right), Active (left - rotated 180°)
- File name: `icon-arrow-right.svg`
- Location: `prototype/assets/icons/` (global) or `assets/` (theme)

#### Wishlist Heart Icon
**Status:** Use inline SVG from Figma

**Specifications:**
- Size: 18.755px (exact from Figma, but scale to fit 30px button)
- Color: `#183754` (default), `#FFFAF5` (active state)
- Format: SVG (inline)
- States:
  - Inactive: No background, navy icon
  - Active: Ellipse background `#183754`, cream icon `#FFFAF5`

---

### 4. Fonts (Already Available)

| Font | Files | Weights Needed | Location | Status |
|------|-------|-----------------|----------|--------|
| Neue Haas Display | WOFF2, WOFF, TTF, EOT | Light (45), Medium (55), Roman | `prototype/assets/fonts/neue-haas-display/` | ✅ Available |

**Note:** Fonts are already included in the project. No additional font files needed.

---

### 5. Supporting Assets

| Asset | Type | Specifications | Status |
|-------|------|----------------|--------|
| Figma Screenshots - Desktop 1440px | PNG | 1440x900px (estimated) | To be exported from Figma |
| Figma Screenshots - Desktop 1250px | PNG | 1250x900px (estimated) | To be exported from Figma |
| Figma Screenshots - Tablet | PNG | 1024x1200px (estimated) | To be exported from Figma |
| Figma Screenshots - Mobile | PNG | 375x1400px (estimated) | To be exported from Figma |
| Figma Screenshots - Mobile Hover State | PNG | 375x600px (estimated) | To be exported from Figma |

**Purpose:** Visual reference for development

---

## Asset Delivery Checklist

### Before Development Starts

- [ ] **Sidebar/Top Image (Square 1:1)**
  - Format: JPEG, PNG, or WebP
  - Aspect Ratio: 1:1 (Square)
  - Max size: 3MB
  - Resolution: 72-96 DPI
  - Filename: `sidebar-image.jpg` (or similar)

- [ ] **Figma Screenshots**
  - Desktop 1440px+ view
  - Desktop 1250-1440px view
  - Tablet view
  - Mobile view
  - Saved to: `prototype/section-feature-slider-with-left-image/design/figma-*.png`

- [ ] **Design Tokens Confirmation**
  - Colors: Verified hex codes
  - Typography: Font weights and sizes
  - Spacing: Padding and gaps
  - Animations: Timings and easing

### Product Images (Ongoing - Merchant Responsibility)

- [ ] **Product Collection Created**
  - Shopify collection created
  - Products assigned to collection
  - Product images uploaded with 2:3 aspect ratio (or square)

- [ ] **Product Data Populated**
  - Product titles: Clear and concise
  - Product prices: In correct currency
  - Product handles: SEO-friendly

---

## Asset Organization

```
prototype/section-feature-slider-with-left-image/
├── design/
│   ├── figma-desktop-1440.png
│   ├── figma-desktop-1250.png
│   ├── figma-tablet.png
│   ├── figma-mobile.png
│   ├── design-tokens.md
│   └── TECHNICAL-SPEC.md
│
├── assets/
│   ├── images/
│   │   └── sidebar-image-placeholder.jpg (optional, for development)
│   └── icons/
│       └── icon-arrow-right.svg (optional)
│
└── IMPLEMENTATION-GUIDE.md
```

**Theme Assets Structure (after development):**

```
assets/
├── section-feature-slider-with-left-image.css
└── section-feature-slider-with-left-image.js

sections/
└── custom-section-feature-slider-with-left-image.liquid
```

---

## Asset Notes

### Images
- **Product Images:** Managed entirely by Shopify product management. Section automatically pulls from collection.
- **Sidebar/Top Image:** Single static image uploaded via section settings. Merchant controls this via theme customizer.
- **Format:** Support JPEG, PNG, WebP for maximum compatibility
- **Optimization:** Use Shopify's built-in image optimization via `image_url` filter with width parameter

### SVGs
- **Arrow Icon:** Inline SVG in Liquid (minimal file size, no extra HTTP request)
- **Heart Icon:** Inline SVG, colors controlled via CSS classes or inline styles
- **No external SVG file needed** unless client specifically requests separate files

### Fonts
- **Neue Haas Display:** Already loaded in project
- **No additional fonts needed** for this section
- **Font weights used:** Light (45), Medium (55), Roman

---

## Responsive Image Handling

### Product Images (Dynamic)
```liquid
{{ product.featured_image | image_url: width: 400 | img_tag }}
```

### Sidebar/Top Image (Section Setting)
```liquid
{{ section.settings.sidebar_image | image_url: width: 800 | img_tag }}
```

---

## File Naming Conventions

- **Images:** `kebab-case` (e.g., `sidebar-image.jpg`)
- **SVGs:** `icon-[name].svg` (e.g., `icon-arrow-right.svg`)
- **Screenshots:** `figma-[viewport].png` (e.g., `figma-desktop-1440.png`)

---

## Quality Assurance Checklist

- [ ] All images are optimized (under file size limits)
- [ ] Image aspect ratios are correct
- [ ] SVG icons render correctly at 24x24px and 18.755px
- [ ] Font files load properly in browser DevTools
- [ ] Figma screenshots accurately represent the design
- [ ] Colors match hex codes exactly
- [ ] No broken image links in prototypes

---

## Status Summary

| Category | Status | Notes |
|----------|--------|-------|
| SVG Icons | ✅ Ready | Arrow and heart icons specified, inline SVG approach |
| Fonts | ✅ Ready | Neue Haas Display already in project |
| Sidebar Image | ⏳ Pending | Merchant uploads via section settings |
| Product Images | ⏳ Pending | Merchant uploads to Shopify products |
| Figma Screenshots | ⏳ Pending | To be extracted and saved |
| Design Tokens | ✅ Complete | All tokens documented |

---

**Next Step:** Confirm asset receipt, then proceed to development.
