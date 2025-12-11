# Shop by Price Section - Asset Checklist & Requirements

## 📋 Asset Inventory

### 🖼️ Image Assets

#### Product Images (Primary View)
- **Format**: PNG with transparency
- **Dimensions**: 225px × 333px (25:37 aspect ratio)
- **Color Profile**: sRGB
- **Quality**: High resolution for jewelry detail
- **Count**: Minimum 10 images per price category (40+ total recommended)
- **Naming Convention**: `product-primary-{productId}.png`
- **Location**: `/prototype/section-shop-by-price/assets/images/products/`

**Price Categories Required:**
1. Below ₹25,000 - 10+ images
2. Under ₹50,000 - 10+ images
3. Under ₹1,00,000 - 10+ images
4. Under ₹2,00,000 - 10+ images

**Example Images Needed:**
- [ ] Earrings (circle, drop, studs) - transparent background
- [ ] Necklaces - transparent background
- [ ] Bracelets - transparent background
- [ ] Rings - transparent background

---

#### Product Images (Hover View)
- **Format**: PNG with full color/context
- **Dimensions**: 225px × 333px (25:37 aspect ratio)
- **Color Profile**: sRGB
- **Quality**: High resolution product shots
- **Count**: One per product (match primary image products)
- **Naming Convention**: `product-hover-{productId}.png`
- **Location**: `/prototype/section-shop-by-price/assets/images/products/`
- **Usage**: Shown on hover with subtle zoom effect
- **Examples**:
  - Jewelry on model/hand
  - Different angle of same product
  - Product in lifestyle context
  - Detailed/close-up view

---

### 🎯 Icon Assets

#### Navigation Arrows (Left/Right)
- **Format**: SVG preferred (or 24px PNG)
- **Size**: 24px × 24px
- **Color**: `#183754` (deep navy)
- **Style**: Minimalist, clean lines
- **Count**: 2 (left arrow, right arrow)
- **Naming**:
  - `arrow-left.svg`
  - `arrow-right.svg`
- **Location**: `/prototype/section-shop-by-price/assets/icons/`
- **Usage**: Carousel navigation on desktop/tablet
- **States**:
  - Default (opacity 1.0)
  - Disabled (opacity 0.3)
  - Hover (opacity 0.9)

#### Heart Icon (Wishlist)
- **Format**: SVG preferred (or 18px PNG)
- **Size**: 18px × 18px
- **Color**: `#183754` (deep navy)
- **Style**: Clean, minimal heart shape
- **Count**: 1 (reuse for liked state with background change)
- **Naming**: `heart.svg`
- **Location**: `/prototype/section-shop-by-price/assets/icons/`
- **Usage**: Wishlist button on product cards
- **States**:
  - Default (hollow/outline)
  - Liked (filled) - managed by CSS/JavaScript
  - Hover (slight opacity change)

---

### 🔤 Font Assets

#### Primary Font: Neue Haas Grotesk Display Pro
- **Weights Needed**:
  - Light (45) - for titles, tagline, product names
  - Roman/Regular (55) - for "Shop All" button
  - Medium (500) - for prices

- **Files**:
  - NeueHaasDisplay-Light.woff2
  - NeueHaasDisplay-Light.woff
  - NeueHaasDisplay-Roman.woff2
  - NeueHaasDisplay-Roman.woff
  - NeueHaasDisplay-Medium.woff2
  - NeueHaasDisplay-Medium.woff

- **Location**: `/prototype/assets/fonts/neue-haas-display/`
- **Status**: ✅ Already available in project

#### Secondary Font: Noto Sans
- **Weights Needed**:
  - Regular (400) - for tab labels
  - Medium (500) - for prices

- **Files**:
  - NotoSans-Regular.woff2
  - NotoSans-Medium.woff2

- **Location**: `/prototype/assets/fonts/noto-sans/`
- **Status**: Check if available, add if missing

---

## 📦 Deliverable Format

### Product Image Delivery Package

```
section-shop-by-price/assets/images/products/
├── below-25k/
│   ├── product-primary-001.png
│   ├── product-primary-002.png
│   ├── ...
│   ├── product-hover-001.png
│   ├── product-hover-002.png
│   └── ...
├── 25k-50k/
│   ├── product-primary-001.png
│   ├── product-primary-002.png
│   ├── ...
│   └── product-hover-*.png
├── 50k-100k/
│   ├── product-primary-001.png
│   └── ...
└── 100k-200k/
    ├── product-primary-001.png
    └── ...
```

### Icon Delivery Package

```
section-shop-by-price/assets/icons/
├── arrow-left.svg
├── arrow-right.svg
└── heart.svg
```

---

## ✅ Validation Checklist

### Product Images
- [ ] All 40+ images are 225px × 333px
- [ ] Primary images have transparent background
- [ ] Hover images show product in context
- [ ] Image quality is suitable for jewelry display
- [ ] File sizes are optimized for web (< 100KB each)
- [ ] File naming follows convention
- [ ] Organized by price category

### Icon Assets
- [ ] Arrow icons are 24px × 24px
- [ ] Heart icon is 18px × 18px
- [ ] Icons are color `#183754`
- [ ] SVG format preferred (or high-quality PNG)
- [ ] Icons are properly named
- [ ] Icons are placed in correct folder

### Font Assets
- [ ] Neue Haas Grotesk Display Pro (Light, Roman, Medium)
- [ ] Noto Sans (Regular, Medium)
- [ ] Fonts are in woff/woff2 format
- [ ] All required weights present
- [ ] Fonts are accessible in project

---

## 🎨 Color Reference Guide

Use these exact colors when creating/exporting assets:

| Element | Hex Code | RGB | Usage |
|---------|----------|-----|-------|
| Text/Icons | `#183754` | rgb(24, 55, 84) | Primary color for arrows, heart, text |
| Wrapper BG | `#FFFAF5` | rgb(255, 250, 245) | Section background |
| Image BG | `#F0EFEA` | rgb(240, 239, 234) | Behind product images only |
| Wishlist Liked | `#FFFCF9` | rgb(255, 252, 249) | Wishlist button background (liked state) |

---

## 📐 Icon Specifications

### Arrow Icons
```
Size: 24px × 24px
Stroke Width: 1-1.5px
Color: #183754
Style: Minimalist, clean
Direction: Left & Right variants
```

### Heart Icon
```
Size: 18px × 18px
Stroke Width: 1px
Color: #183754
Style: Clean, minimal
Shape: Standard heart
```

---

## 🚀 Asset Delivery Checklist

### Before Implementation Begins
1. **Images Organized**
   - [ ] 10 primary images per price category (4 categories = 40+)
   - [ ] 10 hover images per price category (40+)
   - [ ] All PNG format with correct dimensions
   - [ ] Organized in folder structure

2. **Icons Prepared**
   - [ ] arrow-left.svg
   - [ ] arrow-right.svg
   - [ ] heart.svg
   - [ ] All 18px or 24px as specified

3. **Fonts Available**
   - [ ] Neue Haas Grotesk Display Pro (all weights)
   - [ ] Noto Sans (Regular & Medium)
   - [ ] WOFF/WOFF2 files in project

4. **Documentation**
   - [ ] Product metadata (titles, prices, descriptions)
   - [ ] Price range categorization
   - [ ] Product URLs for "view product" links

---

## 📝 Image Metadata Template

For each product image, collect:

```json
{
  "productId": "shopify-product-id",
  "title": "Circle Earrings",
  "price": 32000,
  "currency": "₹",
  "priceCategory": "below-25k",
  "primaryImageUrl": "/assets/products/circle-earrings-001.png",
  "hoverImageUrl": "/assets/products/circle-earrings-001-hover.png",
  "productUrl": "/products/circle-earrings",
  "description": "Elegant circle earrings in silver"
}
```

---

## 🎯 Next Steps

1. **Gather Assets**:
   - Collect all product images from jewelry catalog
   - Resize/crop to 225×333px if needed
   - Optimize PNG files

2. **Create Icons**:
   - Design or source arrow and heart icons
   - Ensure `#183754` color
   - Export as SVG

3. **Verify Fonts**:
   - Check if Neue Haas & Noto Sans already in project
   - Add missing fonts

4. **Organize Structure**:
   - Create folder hierarchy as specified
   - Upload all assets

5. **Provide Metadata**:
   - Create product list with prices and categorization
   - Map images to products
   - Verify pricing accuracy

6. **Final Review**:
   - Check all files are present
   - Validate image dimensions
   - Test color accuracy

---

## ⚠️ Important Notes

- **Image Quality**: Jewelry is detail-oriented; ensure high-quality, clear images
- **Transparency**: Primary images must have transparent/white background for `#F0EFEA` bg to show
- **Color Consistency**: Ensure consistent color grading across product images
- **Icon Scalability**: SVG icons scale perfectly; PNGs should be 2x resolution for sharpness
- **File Optimization**: Compress PNG files without losing quality (use TinyPNG or similar)
- **Metadata**: Accurate pricing is critical for category filtering

---

**Status**: ⏳ Awaiting asset delivery before implementation begins

