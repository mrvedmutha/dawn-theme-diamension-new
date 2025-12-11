# Shop by Price Section - Planning Summary

**Created**: December 11, 2025  
**Project**: Diamension Shopify Theme  
**Status**: 🔵 **Design Phase - Awaiting Asset Delivery**

---

## 📌 Executive Summary

The **"Shop by Price"** section is a dynamic product filtering component that enables customers to browse jewelry items across four price categories. The section features interactive price tabs, a carousel-style product display with smooth GSAP animations, and wishlist functionality (integrated later).

**Key Characteristics**:
- ✅ 4 price-based filter tabs (Below ₹25K, Under ₹50K, Under ₹1L, Under ₹2L)
- ✅ 5 products visible on desktop, 4 on tablet, 2 on mobile
- ✅ Arrow-based carousel (desktop/tablet) + touch scroll (mobile)
- ✅ Subtle GSAP animations on tab change and card interactions
- ✅ Wishlist button with scale effect (implementation ready for later)
- ✅ Responsive design with no sacrifice to functionality
- ✅ "Shop All" button (shown only if > 10 products in category)

---

## 🎯 Section Overview

### Purpose
Allow customers to discover jewelry products within their budget range with smooth, interactive browsing experience.

### Use Case
- Customer arrives at Diamension homepage
- Sees "Shop by Price" section
- Clicks on desired price range (e.g., "Below ₹25000")
- Products in that range load with fade animation
- Browses through carousel (5 products visible)
- Can wishlist items or view product details
- Clicks "Shop All" to see all products in that price range

---

## 📐 Layout Specifications

### Container Structure
```
┌─────────────────────────────────────────────┐
│  Wrapper Background: #FFFAF5                │
│  ┌───────────────────────────────────────┐  │
│  │  Container: 1440px, 120px tb/56px lr  │  │
│  │                                       │  │
│  │  • SHOP BY PRICE (title)             │  │
│  │    ↓ 10px                            │  │
│  │  • Whatever the budget... (tagline)  │  │
│  │    ↓ 88px                            │  │
│  │  • Price Tabs [Below ₹25k | Under... │  │
│  │    ↓ 16px (to underline)             │  │
│  │  • ──────────── (underline)          │  │
│  │    ↓ 64px                            │  │
│  │  • ←  [Products Carousel]  →         │  │
│  │    ↓ 96px                            │  │
│  │  • Shop All (if > 10 products)       │  │
│  │                                       │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Key Measurements
| Component | Dimension |
|-----------|-----------|
| Container Width | 1440px |
| Container Padding | 120px (tb) / 56px (lr) |
| Product Card | 225px × 333px |
| Tabs Horizontal Gap | 141px |
| Tabs Padding (sides) | 144px |
| Title to Tagline | 10px |
| Tagline to Tabs | 88px |
| Tabs to Underline | 16px |
| Underline to Cards | 64px |
| Cards to CTA | 96px |

---

## 🎨 Visual Design

### Color Palette
| Element | Color | Usage |
|---------|-------|-------|
| Wrapper | `#FFFAF5` | Background |
| Text/Icons | `#183754` | Primary color |
| Image Bg | `#F0EFEA` | Behind product images only |
| Wishlist Liked | `#FFFCF9` | Button background when liked |

### Typography
- **Title**: Neue Haas Light, 40px, UPPERCASE
- **Tagline**: Neue Haas Light, 20px
- **Tabs**: Neue Haas Regular, 20px, UPPERCASE
- **Product Title**: Neue Haas Light, 20px (ellipsis if too long)
- **Product Price**: Noto Sans Medium, 14px
- **"Shop All" Button**: Neue Haas Roman, 20px, underlined

---

## 🛍️ Product Carousel Details

### Desktop (1440px+)
- **Products Visible**: 5
- **Navigation**: Arrow buttons (← →)
- **Scroll**: One product at a time
- **Duration**: 300ms smooth scroll
- **Button States**: Disabled (opacity 0.3) at limits

### Tablet (768px - 1023px)
- **Products Visible**: 4
- **Navigation**: Arrow buttons (← →)
- **Scroll**: One product at a time
- **Tabs**: Horizontally scrollable (touch)

### Mobile (< 768px)
- **Products Visible**: 2
- **Navigation**: No buttons (hidden)
- **Scroll**: Native touch scroll
- **Tabs**: Horizontally scrollable (touch)

---

## 🎴 Product Card Structure

```
┌─────────────────────────────┐
│  Image Container 225×333    │
│  ┌───────────────────────┐  │
│  │  [Product Image]      │  │ ← Transparent PNG
│  │  Background: #F0EFEA  │  │
│  │  ┌─────────────────┐  │  │
│  │  │♥ (26px) Wishlist│  │  │ ← Top-right corner
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
├─────────────────────────────┤ ↑ 10px gap
│ Circle Earrings         ... │ ← Ellipsis if too long
├─────────────────────────────┤ ↑ 8px gap
│ ₹ 32,000                    │
└─────────────────────────────┘
```

### Product Card Features
- ✅ Image: 225×333px, transparent background, `#F0EFEA` behind
- ✅ Title: Left-aligned, single line with ellipsis
- ✅ Price: Left-aligned, "₹ {price}" format
- ✅ Wishlist Button:
  - Size: 26px (circular)
  - Position: Top-right (16px from top/right)
  - Default: Transparent background
  - Liked: `#FFFCF9` background
  - Animation: Scale effect on click

---

## ✨ Animations & Interactions

### 1️⃣ **Tab Selection** (On Click)
```javascript
Timeline:
├─ Underline: Fade in/out (GSAP, 400ms, power2.inOut)
├─ Product Cards: Fade out (300ms) → Load new → Fade in (300ms)
└─ Carousel: Reset to first product
```

### 2️⃣ **Product Card Hover**
```javascript
├─ Image: Switch to hover image
├─ Animation: Subtle zoom in (350ms, ease-out)
└─ Scale: 1.0 → 1.05
```

### 3️⃣ **Wishlist Click**
```javascript
Timeline:
├─ Scale Down: 1.0 → 0.85 (100ms)
├─ Scale Up: 0.85 → 1.0 (150ms, spring ease)
├─ Background: Change to #FFFCF9
└─ Heart: Visual feedback (filled/outline toggle)
```

### 4️⃣ **Carousel Scroll**
```javascript
├─ Desktop/Tablet: Arrow click → Smooth scroll 300ms
├─ Mobile: Native touch scroll (momentum)
└─ Arrow State: Disable at limits (opacity 0.3)
```

---

## 📱 Responsive Behavior

### Desktop (1440px)
```
[←] [Product 1] [Product 2] [Product 3] [Product 4] [Product 5] [→]
    └─────────────────────────────────────────────────────────┘
                      5 products visible
```

### Tablet (768-1023px)
```
[←] [Product 1] [Product 2] [Product 3] [Product 4] [→]
    └──────────────────────────────────────────────┘
                4 products visible
```

### Mobile (< 768px)
```
[Product 1] [Product 2]
└─────────────────────────► (touch scroll continues)
        2 products visible, no buttons
```

---

## 🔄 Price Filtering Logic

### Price Categories
1. **Below ₹25,000**
2. **Under ₹50,000**
3. **Under ₹1,00,000**
4. **Under ₹2,00,000**

### Filtering Behavior
- ✅ Auto-filtered from Shopify store via price metadata/tags
- ✅ 10 products max per category
- ✅ Products reset to first on tab change
- ✅ Animations smooth transition

### "Shop All" Button
- ✅ **Visible**: Only if product count > 10
- ✅ **Hidden**: If product count ≤ 10
- ✅ **Links to**: Collection page with price filter applied
- ✅ **Position**: Below carousel, centered

---

## 📋 State Management

### Tab State
- Current active tab
- Products list for active tab
- Carousel scroll position (reset on change)

### Carousel State
- Current scroll position
- Button disabled states (left/right)
- Products visible count (responsive)

### Wishlist State
- Liked products (client-side initially)
- Visual state (heart filled/unfilled)
- Persists across carousel scrolls

---

## 🎬 Animation Library

**Primary**: GSAP (TweenMax/gsap.to)

```javascript
// Example: Tab underline animation
gsap.to(underline, {
  duration: 0.4,
  opacity: 1,
  x: newXPosition,
  ease: "power2.inOut"
});

// Example: Product cards fade
gsap.timeline()
  .to(".product-card", { opacity: 0, duration: 0.3 })
  .to(".product-card", { opacity: 1, duration: 0.3 }, 0.1);
```

---

## 📦 Assets Required

### Product Images
- 40+ images (10 per price category)
- **Primary**: 225×333px, transparent PNG
- **Hover**: 225×333px, product in context PNG
- Jewelry quality (sharp, detailed)

### Icons (SVG Preferred)
- Arrow Left: 24×24px, `#183754`
- Arrow Right: 24×24px, `#183754`
- Heart: 18×18px, `#183754`

### Fonts (Already in Project)
- Neue Haas Grotesk Display (Light, Roman, Medium)
- Noto Sans (Regular, Medium)

---

## 🔐 Technical Stack

| Technology | Purpose |
|-----------|---------|
| Liquid | Template structure |
| JavaScript (Vanilla) | Interactivity & filtering |
| CSS3 | Styling & responsive layout |
| GSAP | Animations |
| Shopify GraphQL API | Product filtering |

---

## ✅ Implementation Checklist

### Phase 1: Setup ✅ (Current)
- [x] Design extracted from Figma
- [x] Specification documented
- [x] Design tokens created
- [x] Asset checklist prepared
- [ ] **Assets delivered** ← Waiting here

### Phase 2: Development (Next)
- [ ] Liquid section created
- [ ] CSS styling implemented
- [ ] JavaScript carousel logic
- [ ] GSAP animations
- [ ] Responsive testing
- [ ] Shopify API integration

### Phase 3: Wishlist (Later)
- [ ] Wishlist API endpoints
- [ ] State persistence
- [ ] User authentication check
- [ ] Backend integration

### Phase 4: Testing & Deploy
- [ ] Browser compatibility
- [ ] Mobile testing
- [ ] Performance optimization
- [ ] Accessibility check
- [ ] Production deployment

---

## 📂 File Structure (To Be Created)

```
prototype/section-shop-by-price/
├── SPECIFICATION.md              ✅ Created
├── design-tokens.md              ✅ Created
├── ASSET-CHECKLIST.md            ✅ Created
├── PLANNING-SUMMARY.md           ✅ This file
├── assets/
│   ├── images/
│   │   └── products/
│   │       ├── below-25k/        ⏳ Awaiting
│   │       ├── 25k-50k/          ⏳ Awaiting
│   │       ├── 50k-100k/         ⏳ Awaiting
│   │       └── 100k-200k/        ⏳ Awaiting
│   └── icons/
│       ├── arrow-left.svg        ⏳ Awaiting
│       ├── arrow-right.svg       ⏳ Awaiting
│       └── heart.svg             ⏳ Awaiting
├── section-shop-by-price.liquid  📝 To be created
├── shop-by-price.js              📝 To be created
└── shop-by-price.css             📝 To be created
```

---

## 🎯 Success Criteria

- [x] Design fully documented
- [x] Specifications clear and detailed
- [x] Design tokens extracted
- [x] Asset requirements documented
- [ ] All assets delivered
- [ ] Responsive design tested
- [ ] Animations smooth and subtle
- [ ] Performance optimized
- [ ] Accessibility compliant
- [ ] Shopify integration working

---

## ⏳ Current Status

### Status: 🔵 **AWAITING ASSET DELIVERY**

**Completed**:
- ✅ Figma design analysis
- ✅ Comprehensive specification
- ✅ Design tokens documentation
- ✅ Asset checklist
- ✅ Planning & timeline

**Blocked on**:
- ⏳ Product images (40+ images)
- ⏳ Icon assets (arrows, heart)
- ⏳ Product metadata (titles, prices, categories)

**Next Steps**:
1. Deliver all assets from asset checklist
2. Provide product metadata JSON
3. Confirm font availability
4. Begin development phase

---

## 📞 Contact & Questions

**For clarifications on**:
- Layout specifications → Refer to SPECIFICATION.md
- Design tokens → Refer to design-tokens.md
- Asset requirements → Refer to ASSET-CHECKLIST.md
- Implementation approach → To be discussed in development phase

---

## 📜 Document Versions

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-11 | Design Team | Initial planning from Figma |

---

**Next Action**: Deliver assets and we'll begin development! 🚀

