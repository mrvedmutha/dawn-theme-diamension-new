# Custom Hero Image + Five Product Carousel - Overview

**Version:** 1.0.0
**Created:** 2025-12-24
**Section Type:** Custom Product Showcase
**Complexity:** Medium

---

## 📋 Section Purpose

A premium product showcase section combining a full-width hero image (1440x800px) with an elegant 5-product carousel. Designed for the Diamension Corporate Collection, this section emphasizes luxury with asymmetrical card layouts, subtle hover interactions, and responsive carousel navigation.

---

## 🎨 Design Reference

### Figma Source
**File:** Diamension - Dev - FINAL
**Node ID:** `12:8831`
**URL:** https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-8831&m=dev

### Key Figma Nodes to Study
Before development, developers MUST review these Figma nodes:

1. **Main Section Node:** `12:8831` - Overall layout structure
2. **Hero Image Container:** Study spacing and positioning
3. **Product Grid:** `12:8964` to `12:8980` - Asymmetrical product cards
4. **Product Card Examples:**
   - Tall Card (Odd): `12:8964` - Flower Bracelet (379px height)
   - Short Card (Even): `12:8967` - Multi Ring (287px height)

---

## 🏗️ Section Structure

```
┌────────────────────────────────────────────────────┐
│                                                    │
│         Hero Image (Full Width)                    │
│         1440x800px recommended                     │
│                                                    │
└────────────────────────────────────────────────────┘
                    ↓ 60px gap
        ┌────────────────────────────┐
        │   Max Width: 1440px        │
        │  [1] [2] [3] [4] [5]       │
        │  380  288  380  288  380   │ ← Heights (px)
        │  ← → Carousel Navigation   │
        │    (Tablet/Mobile Only)    │
        └────────────────────────────┘
```

---

## ✨ Key Features

### Hero Section
- **Full-width** landscape image display
- Recommended size: 1440x800px
- Merchant-uploadable via section settings
- Responsive scaling on all devices
- No overlay or text (clean image presentation)

### Product Carousel Container
- **Max-width: 1440px** (centered on larger screens)
- 10px gap between product cards
- Contains up to **5 products** from selected collection

### Product Cards
- Width: 280px each
- Background: `#EFE9E4` (soft beige)
- Asymmetrical heights:
  - **Odd positions (1, 3, 5):** 380px tall
  - **Even positions (2, 4):** 288px short
- Product title: 24px from left, 16px from top
- Title overflow: Ellipsis (...)
- Product image: Full card width, auto height
- "View" button:
  - **Desktop:** Shows on hover only
  - **Tablet/Mobile:** Always visible
- Entire card clickable to product page

### Responsive Behavior
- **Desktop (1440px+):** All 5 products visible, no navigation arrows
- **Tablet (768-1439px):** 4 visible + 1 offset, arrows shown
- **Mobile Large (480-767px):** 3 visible + 2 offset, arrows shown
- **Mobile (< 480px):** 2 visible + 3 offset, arrows shown

### Carousel Navigation
- **Arrow icons:** Rotate existing SVG (`/assets/custom-product-detail/icons/arrow-down.svg`)
- **Visibility:** Only on tablet/mobile devices (hidden on desktop)
- **Behavior:** Scroll one product at a time
- **Smart hiding:** Hide left arrow at start, hide right arrow at end
- **No touch swipe** - arrow controls only

---

## 📱 Responsive Grid Layout

| Breakpoint | Container | Visible | Offset | Navigation | Card Width |
|------------|-----------|---------|--------|------------|------------|
| Desktop (1440px+) | 1440px max | 5 | 0 | None | 280px |
| Tablet (768-1439px) | 100% | 4 | +1 | Arrows | 280px |
| Mobile Large (480-767px) | 100% | 3 | +2 | Arrows | 280px |
| Mobile (< 480px) | 100% | 2 | +3 | Arrows | 280px |

**Note:** Product carousel wrapper has `max-width: 1440px` and centers on larger screens.

---

## 🎯 User Interactions

### Desktop
- Hover over product card → "View" button fades in
- Click card → Navigate to product page
- Smooth transitions (0.3s ease)

### Tablet/Mobile
- "View" button always visible
- Click left/right arrows → Scroll one product
- Click card → Navigate to product page
- Arrows hide when at carousel boundaries

---

## 🛠️ Technical Requirements

### Liquid Section Settings
- **Hero Image:** `image_picker` (required)
- **Collection:** `collection` picker (required, limit 5 products)
- **Section visibility:** Optional checkbox

### Assets Required
- Hero image from merchant (1440x800px recommended)
- Product images from Shopify products
- Arrow icon: `/assets/custom-product-detail/icons/arrow-down.svg`
- Fonts: Neue Haas Grotesk Display Pro (already loaded in theme)

### JavaScript Functionality
- Carousel scroll logic
- Arrow visibility toggle based on scroll position
- Smooth scroll animation
- Boundary detection (hide arrows at start/end)

---

## 📦 Files to Create

```
sections/
  └── custom-section-hero-five-product.liquid

assets/
  ├── section-hero-five-product.css
  └── section-hero-five-product.js

tests/liquid/section-hero-five-product/
  └── hero-five-product.spec.js
```

---

## ⚠️ Important Notes for Developers

### MUST READ BEFORE STARTING:
1. **Read all development rules:** `/docs/rules/00-OVERVIEW.md` → Navigate to required docs
2. **Study Figma nodes:** Use Node IDs listed above to extract exact spacing, colors, typography
3. **Use BEM methodology:** Follow `05-CSS-STANDARDS.md`
4. **No core theme modification:** Never touch Dawn theme files
5. **Desktop-first CSS:** Build for 1440px, then add responsive breakpoints
6. **Test with real data:** Use actual products from collection

### Design Tokens Reference
See: `design-tokens.md` in this folder for exact measurements, colors, spacing, typography

### Implementation Guide
See: `implementation.md` in this folder for step-by-step development instructions

---

## 🚀 Development Workflow

1. **Read rules:** `/docs/rules/01-WORKFLOW.md`
2. **Extract Figma design:** Study node `12:8831` and related nodes
3. **Review design tokens:** Read `design-tokens.md`
4. **Follow implementation guide:** Read `implementation.md`
5. **Create Liquid section** with schema settings
6. **Write CSS** following BEM and responsive standards
7. **Write JavaScript** for carousel functionality
8. **Test locally:** `shopify theme dev`
9. **Write Playwright tests**
10. **Deploy to unpublished theme**

---

## ✅ Success Criteria

Before marking this section complete:

- [ ] Hero image displays full-width (scales responsively)
- [ ] Product carousel container has 1440px max-width
- [ ] Exactly 5 products from collection shown
- [ ] Asymmetrical card heights work (tall/short pattern)
- [ ] 60px gap between hero and carousel
- [ ] 10px gap between product cards
- [ ] Carousel navigation works on tablet/mobile
- [ ] Arrows hide at boundaries
- [ ] "View" button hover works on desktop
- [ ] "View" button always visible on mobile/tablet
- [ ] All breakpoints tested (1440px, 1024px, 768px, 480px, 375px)
- [ ] BEM naming followed
- [ ] No core theme files modified
- [ ] Playwright tests pass
- [ ] Works in theme editor

---

## 📚 Related Documentation

- **Complete Workflow:** `/docs/rules/01-WORKFLOW.md`
- **Design Extraction:** `/docs/rules/02-DESIGN-EXTRACTION.md`
- **Liquid Standards:** `/docs/rules/04-LIQUID-DEVELOPMENT.md`
- **CSS Standards:** `/docs/rules/05-CSS-STANDARDS.md`
- **JavaScript Standards:** `/docs/rules/06-JAVASCRIPT-STANDARDS.md`
- **Testing Guide:** `/docs/rules/07-TESTING.md`
- **Naming Conventions:** `/docs/rules/08-NAMING-CONVENTIONS.md`

---

## 🎨 Design Philosophy

This section embodies Diamension's luxury aesthetic:
- **Minimal:** Clean layouts, generous spacing (60px between sections)
- **Elegant:** Soft colors (#EFE9E4), subtle transitions
- **Sophisticated:** Asymmetrical rhythm creates visual interest
- **Tactile:** Hover states reward exploration
- **Responsive:** Graceful adaptation across devices

---

**Ready to build?** → Read `design-tokens.md` next, then `implementation.md`
