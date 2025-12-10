# Shop Collection Arch - Asset Checklist

**Version:** 1.0.0  
**Last Updated:** 2025-12-10  
**Section Name:** Radiance Collection  
**Status:** 🔴 Awaiting Assets

---

## 📋 Asset Overview

This document tracks all required assets for the "Shop Collection Arch" section. Assets are categorized by type and include specifications for each.

**Total Assets Required:** 7 (1 SVG + 3 Images + 1 Video + 2 Optional)

---

## 🎨 SVG Assets

### 1. Default Star Icon

| Property | Value |
|----------|-------|
| **Name** | star-default.svg |
| **Type** | SVG |
| **Size** | xs (very small) |
| **Destination** | `prototype/section-shop-collection-arch/assets/icons/` |
| **Required** | ✅ Yes (Fallback) |
| **Status** | 🔴 Not Provided |
| **Description** | Default rotating star SVG for connecting lines |
| **Specifications** | - Simple, scalable design<br>- Viewbox: 24x24 or similar<br>- Single color (will use CSS currentColor)<br>- Clean lines for rotation animation |
| **Usage** | Fallback if merchant doesn't upload custom star |
| **Notes** | Can be a simple 5-point star or custom design |

---

## 🖼️ Image Assets

### 2. Left Product Image

| Property | Value |
|----------|-------|
| **Name** | left-product-image |
| **Type** | JPG / PNG / WebP |
| **Destination** | Shopify Media Library (via section settings) |
| **Required** | ❌ No (Optional) |
| **Status** | 🔴 Not Provided |
| **Description** | Product image displayed on left side of center frame |
| **Specifications** | - Recommended: 400x500px minimum<br>- Aspect ratio: Flexible<br>- Format: JPG (preferred) or PNG<br>- Optimized for web |
| **Usage** | Left side product showcase |
| **Notes** | Merchant uploads via image_picker in section settings |
| **Responsive** | Yes - Lazy loaded with srcset |

### 3. Right Product Image

| Property | Value |
|----------|-------|
| **Name** | right-product-image |
| **Type** | JPG / PNG / WebP |
| **Destination** | Shopify Media Library (via section settings) |
| **Required** | ❌ No (Optional) |
| **Status** | 🔴 Not Provided |
| **Description** | Product image displayed on right side of center frame |
| **Specifications** | - Recommended: 400x500px minimum<br>- Aspect ratio: Flexible<br>- Format: JPG (preferred) or PNG<br>- Optimized for web |
| **Usage** | Right side product showcase |
| **Notes** | Merchant uploads via image_picker in section settings |
| **Responsive** | Yes - Lazy loaded with srcset |

### 4. Bottom Product Image

| Property | Value |
|----------|-------|
| **Name** | bottom-product-image |
| **Type** | JPG / PNG / WebP |
| **Destination** | Shopify Media Library (via section settings) |
| **Required** | ❌ No (Optional) |
| **Status** | 🔴 Not Provided |
| **Description** | Product image displayed at bottom of center frame |
| **Specifications** | - Recommended: 400x500px minimum<br>- Aspect ratio: Flexible<br>- Format: JPG (preferred) or PNG<br>- Optimized for web |
| **Usage** | Bottom product showcase |
| **Notes** | Merchant uploads via image_picker in section settings |
| **Responsive** | Yes - Lazy loaded with srcset |

### 5. Center Image Fallback

| Property | Value |
|----------|-------|
| **Name** | center-image-fallback |
| **Type** | JPG / PNG / WebP |
| **Destination** | Shopify Media Library (via section settings) |
| **Required** | ❌ No (Optional) |
| **Status** | 🔴 Not Provided |
| **Description** | Fallback image if no video is provided for center frame |
| **Specifications** | - Recommended: 1260x420px (matches frame)<br>- Aspect ratio: 3:1<br>- Format: JPG (preferred) or PNG<br>- Optimized for web<br>- High quality for luxury brand |
| **Usage** | Center frame display (if no video) |
| **Notes** | Merchant uploads via image_picker in section settings |
| **Responsive** | Yes - Responsive image with srcset |

---

## 🎬 Video Assets

### 6. Center Video

| Property | Value |
|----------|-------|
| **Name** | center-video |
| **Type** | MP4 / WebM / YouTube / Vimeo |
| **Destination** | Shopify Media Library or external URL |
| **Required** | ❌ No (Optional) |
| **Status** | 🔴 Not Provided |
| **Description** | Video displayed in center frame |
| **Specifications** | - Format: MP4 (H.264) or WebM<br>- Resolution: 1260x420px (or 16:9)<br>- Duration: 5-30 seconds recommended<br>- File size: < 10MB for web<br>- Codec: H.264 (MP4) or VP8/VP9 (WebM)<br>- Audio: Muted (no audio track)<br>- Loop: Continuous playback |
| **Usage** | Center frame video showcase |
| **Notes** | Merchant uploads via video_url in section settings<br>Supports YouTube/Vimeo or direct upload |
| **Autoplay** | Yes - Muted, looping |
| **Fallback** | Center image fallback if video fails |

---

## 🎨 Optional Custom Assets

### 7. Custom Decorative Star SVG

| Property | Value |
|----------|-------|
| **Name** | custom-star-svg |
| **Type** | SVG / PNG |
| **Destination** | Shopify Media Library (via section settings) |
| **Required** | ❌ No (Optional) |
| **Status** | 🔴 Not Provided |
| **Description** | Custom star SVG uploaded by merchant (replaces default) |
| **Specifications** | - Format: SVG (preferred) or PNG<br>- Size: xs (very small)<br>- Viewbox: 24x24 or similar<br>- Single color or multi-color<br>- Scalable design |
| **Usage** | Replaces default star on connecting lines |
| **Notes** | Merchant uploads via image_picker in section settings<br>Falls back to default star if not provided |
| **Animation** | Rotates continuously (8s clockwise) |

---

## 📊 Asset Status Summary

| Asset | Type | Required | Status | Priority |
|-------|------|----------|--------|----------|
| Default Star SVG | SVG | ✅ Yes | 🔴 Not Provided | 🔴 Critical |
| Left Product Image | Image | ❌ No | 🔴 Not Provided | 🟡 Medium |
| Right Product Image | Image | ❌ No | 🔴 Not Provided | 🟡 Medium |
| Bottom Product Image | Image | ❌ No | 🔴 Not Provided | 🟡 Medium |
| Center Image Fallback | Image | ❌ No | 🔴 Not Provided | 🟡 Medium |
| Center Video | Video | ❌ No | 🔴 Not Provided | 🟡 Medium |
| Custom Star SVG | SVG | ❌ No | 🔴 Not Provided | 🟢 Low |

---

## 🎯 Asset Delivery Instructions

### For Default Star SVG (Critical)

**What to provide:**
- Simple, scalable SVG star icon
- Size: 24x24px viewBox
- Single color or multi-color design
- Clean lines for rotation animation

**File format:**
```xml
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <!-- Star path here -->
</svg>
```

**Destination:**
```
prototype/section-shop-collection-arch/assets/icons/star-default.svg
```

### For Product Images (Optional)

**What to provide:**
- 3 product images (left, right, bottom)
- Optimized for web (JPG preferred)
- Minimum 400x500px
- High quality for luxury brand

**Delivery method:**
- Upload via Shopify Admin (section settings)
- Or provide URLs for merchant to upload

### For Center Video (Optional)

**What to provide:**
- MP4 or WebM format
- 1260x420px or 16:9 aspect ratio
- Muted, looping video
- < 10MB file size

**Delivery method:**
- Upload to Shopify Media Library
- Or provide YouTube/Vimeo link

### For Custom Star SVG (Optional)

**What to provide:**
- Custom star design (SVG or PNG)
- Very small size (xs)
- Scalable design

**Delivery method:**
- Merchant uploads via section settings (image_picker)

---

## 📁 Asset Directory Structure

```
prototype/section-shop-collection-arch/
├── assets/
│   └── icons/
│       └── star-default.svg          ← CRITICAL: Provide this
├── design/
│   ├── figma-desktop.png
│   ├── figma-tablet.png
│   ├── figma-mobile.png
│   └── design-tokens.md
├── TECHNICAL-SPECIFICATION.md
└── ASSET-CHECKLIST.md
```

---

## ✅ Asset Verification Checklist

Before development can proceed, verify:

- [ ] **Default Star SVG** provided and placed in `assets/icons/`
- [ ] Star SVG is scalable and clean
- [ ] Star SVG uses proper viewBox
- [ ] Product images are optimized for web
- [ ] Center video is muted and looping
- [ ] Center image fallback is high quality
- [ ] All image formats are web-optimized (JPG/PNG/WebP)
- [ ] All assets meet specifications
- [ ] File sizes are optimized
- [ ] Responsive image sizes considered

---

## 🚀 Next Steps

1. **Provide default star SVG** (CRITICAL)
2. **Provide product images** (optional but recommended)
3. **Provide center video** (optional but recommended)
4. **Verify all assets** meet specifications
5. **Place assets** in correct directories
6. **Proceed with development** once critical assets provided

---

## 📞 Asset Specifications Reference

### Image Optimization

**JPG Settings:**
- Quality: 80-85%
- Progressive: Yes
- Optimize: Yes

**PNG Settings:**
- Compression: Maximum
- Interlaced: Yes

**WebP Settings:**
- Quality: 80%
- Method: 6

### Video Optimization

**MP4 Settings:**
- Codec: H.264
- Bitrate: 2-4 Mbps
- Frame rate: 30fps
- Resolution: 1260x420px

**WebM Settings:**
- Codec: VP8/VP9
- Bitrate: 1-2 Mbps
- Frame rate: 30fps
- Resolution: 1260x420px

---

## 📋 Asset Delivery Template

When providing assets, use this template:

```
Asset Name: [Name]
Type: [SVG/JPG/PNG/MP4/WebM]
Size: [Dimensions]
File Size: [KB/MB]
Format: [Format details]
Status: Ready for use
Notes: [Any special notes]
```

---

**Status:** 🔴 Awaiting Assets  
**Critical Assets Missing:** 1 (Default Star SVG)  
**Optional Assets Missing:** 6  
**Last Updated:** 2025-12-10  
**Version:** 1.0.0

---

## 📝 Notes

- **Default Star SVG is critical** for section to function properly
- Product images and center video are optional but recommended for best presentation
- Merchant can upload custom star SVG via section settings
- All image assets should be optimized for web performance
- Video should be muted and looping for autoplay compatibility
