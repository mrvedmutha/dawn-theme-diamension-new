# 📇 Shop by Price - Quick Reference Card

## 🎯 Section at a Glance

**Name**: Shop by Price  
**Type**: Product Carousel with Price Filtering  
**Purpose**: Allow customers to browse jewelry by budget  
**Status**: 🟢 Planning Complete → ⏳ Awaiting Assets

---

## 📐 Key Dimensions

```
WRAPPER: Full width, bg #FFFAF5
  └─ CONTAINER: 1440px
     ├─ Padding: 120px (top/bottom), 56px (left/right)
     ├─ TITLE: "SHOP BY PRICE" (40px, centered)
     ├─ GAP: 10px
     ├─ TAGLINE: "Whatever the budget..." (20px, centered)
     ├─ GAP: 88px
     ├─ TABS: 4 price categories (20px, uppercase)
     ├─ GAP: 16px
     ├─ UNDERLINE: Active tab indicator
     ├─ GAP: 64px
     ├─ CAROUSEL: 
     │  └─ CARDS: 225×333px (25:37 ratio), gap 10px
     │     ├─ IMAGE: 225×333px, bg #F0EFEA
     │     ├─ WISHLIST: 26px circle, top-right (16px)
     │     ├─ GAP: 10px
     │     ├─ TITLE: 20px, ellipsis
     │     ├─ GAP: 8px
     │     └─ PRICE: 14px
     ├─ GAP: 96px
     └─ CTA: "Shop All" (if > 10 products)
```

---

## 🎨 Colors

| Element | Color | Hex |
|---------|-------|-----|
| Text/Icons | Deep Navy | #183754 |
| Background | Off-white | #FFFAF5 |
| Image BG | Beige | #F0EFEA |
| Wishlist Liked | Very Light | #FFFCF9 |

---

## 🔤 Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Title | Neue Haas | 40px | Light (45) |
| Tagline | Neue Haas | 20px | Light (45) |
| Tabs | Neue Haas | 20px | Regular (400) |
| Product Title | Neue Haas | 20px | Light (45) |
| Product Price | Noto Sans | 14px | Medium (500) |

---

## 📱 Responsive

| Device | Width | Products | Nav |
|--------|-------|----------|-----|
| Desktop | 1440px+ | 5 | Arrows |
| Tablet | 768px+ | 4 | Arrows |
| Mobile | <768px | 2 | Touch |

---

## 💬 Price Categories

1. **Below ₹25,000**
2. **Under ₹50,000**
3. **Under ₹1,00,000**
4. **Under ₹2,00,000**

Each category shows **max 10 products**.

---

## ✨ Animations (GSAP)

| Event | Duration | Effect |
|-------|----------|--------|
| Tab Click | 400ms | Underline fade + cards fade |
| Hover | 350ms | Image zoom 1.0 → 1.05 |
| Wishlist Click | 250ms | Scale 0.85 → 1.0 |
| Carousel | 300ms | Smooth scroll |

---

## 🎬 Interactions

```
TAB CLICK:
  └─ Underline animates (fade in/out)
  └─ Cards fade out → new products load → fade in
  └─ Carousel resets to first product

PRODUCT HOVER:
  └─ Switch to second image
  └─ Zoom in subtly (350ms)

WISHLIST CLICK:
  └─ Scale animation (down-up, 250ms)
  └─ Background changes to #FFFCF9
  └─ State persists

CAROUSEL ARROW CLICK:
  └─ Smooth scroll 300ms
  └─ Disable at limits (opacity 0.3)
```

---

## 📦 Assets Needed

- [ ] 40+ product images (225×333px)
  - 10 primary per category (transparent)
  - 10 hover per category (in context)
- [ ] 3 icon SVGs (arrows left/right, heart)
- [ ] Product metadata (titles, prices)

**Location**: `/prototype/section-shop-by-price/assets/`

---

## 🔄 State Management

```
ACTIVE TAB:      Current selected price category
PRODUCTS LIST:   10 products for active category
CAROUSEL POS:    Current scroll position
LIKED PRODUCTS:  Wishlist items (client-side initially)
```

---

## 📋 Spacing Reference

| Spacing | Value |
|---------|-------|
| Title → Tagline | 10px |
| Tagline → Tabs | 88px |
| Tabs → Line | 16px |
| Line → Cards | 64px |
| Image → Title | 10px |
| Title → Price | 8px |
| Cards → CTA | 96px |
| Tab Gaps | 141px |
| Tabs Padding (LR) | 144px |

---

## 🎯 Implementation Tasks

**Phase 1**: ✅ Planning (Done)  
**Phase 2**: 📝 Markup (Liquid template)  
**Phase 3**: 📝 Styling (CSS, responsive)  
**Phase 4**: 📝 JavaScript (carousel, filtering)  
**Phase 5**: 📝 GSAP (animations)  
**Phase 6**: 📝 Integration (Shopify API)  
**Phase 7**: 📝 Testing & QA  
**Phase 8**: 📝 Deployment  

**Timeline**: 15-20 days from asset delivery

---

## 📚 Full Documentation

| Doc | Purpose |
|-----|---------|
| 00-INDEX.md | Overview & summary |
| README.md | Developer guide |
| PLANNING-SUMMARY.md | Complete overview |
| SPECIFICATION.md | Technical specs |
| design-tokens.md | Design system |
| ASSET-CHECKLIST.md | Asset requirements |

---

## ⏳ Next Action

1. **Review** this card + README.md
2. **Confirm** specifications match vision
3. **Gather** assets (40+ images, 3 icons)
4. **Provide** product metadata
5. **Give "Ready"** signal to start Phase 2

---

## 📞 Questions?

- **"How should it look?"** → See screenshot in Figma + PLANNING-SUMMARY
- **"What size is X?"** → See SPECIFICATION.md
- **"What color is Y?"** → See design-tokens.md
- **"What assets do I need?"** → See ASSET-CHECKLIST.md
- **"How do I code it?"** → See README.md

---

**Created**: December 11, 2025  
**Location**: `/prototype/section-shop-by-price/`  
**Status**: 🟢 Complete

