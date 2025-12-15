# Image Hero with Text Section - Development Guide

## 📌 Quick Overview

A **full-width hero banner section** with background image and text overlay (heading, caption, CTA). Features proportional responsive scaling using 8-divisible math and optional color overlay for text readability.

**Important:** This is NOT the product spotlight section. Ignore any product cards (01, 02, 03) visible in the Figma design - those are not part of this implementation.

**Status:** 📝 **Documentation Complete** → 🔄 **Ready for Development** → 🟢 **Testing** → ✅ **Complete**

---

## 📂 Folder Structure

```
section-image-hero-with-product/
├── 00-INDEX.md                    ← Navigation guide
├── README.md                      ← You are here
├── SPECIFICATION.md               ← Detailed technical specs
├── design-tokens.md               ← Design system & tokens
├── FIGMA-REFERENCE.md             ← Figma extraction notes
└── (To be created during development)
    ├── section-image-hero-with-product.liquid   ← Main section template
    └── section-image-hero-with-product.css      ← Styling
```

---

## 🎯 What This Section Does

### Visual Description
A full-width hero banner with:
- **Background Image:** Large lifestyle/product photography (1440×1040px)
- **Text Overlay:** Left-aligned heading, caption, and CTA link
- **Responsive Scaling:** All measurements scale proportionally using 8-divisible math
- **Optional Overlay:** Color overlay with adjustable opacity for text readability

### NOT Included
- ❌ Product spotlight cards (01, 02, 03 from Figma)
- ❌ Product carousel functionality
- ❌ Interactive elements beyond the CTA link

---

## 🚀 Getting Started

### 1. Prerequisites
Before starting development, read these documents from `@docs/rules/`:
- **04-LIQUID-DEVELOPMENT.md** - Liquid coding standards
- **05-CSS-STANDARDS.md** - CSS, BEM, responsive design
- **08-NAMING-CONVENTIONS.md** - File naming conventions

### 2. Review Documentation (in order)
1. **FIGMA-REFERENCE.md** - Understand Figma extraction
2. **design-tokens.md** - Learn design tokens
3. **SPECIFICATION.md** - Understand technical requirements

### 3. Development Workflow
```
Read Documentation
    ↓
Create Liquid Section File
    ↓
Create CSS File (BEM Methodology)
    ↓
Implement 8-Divisible Responsive Scaling
    ↓
Test Across Breakpoints (1440px, 1024px, 767px, 375px)
    ↓
Validate with Playwright
    ↓
Deploy
```

---

## 📐 Dimensions Quick Reference

### Desktop (1440px - Base)
```
Section:         100vh (max 1040px, min 600px)
Width:           100% (max 1440px)
Image:           object-fit: cover (fills container)

Text Positioning:
├─ Heading Start:    Top: 216px, Left: 56px
├─ Heading to Caption Gap: 6px
├─ Caption to CTA Gap: 64px

Font Sizes:
├─ Heading:      40px
├─ Caption:      20px
└─ CTA:          20px
```

### Tablet (1024px)
```
Section:         80vh (min 500px)

Text Positioning (71% scale):
├─ Heading Start:    Top: 154px, Left: 40px
├─ Heading to Caption Gap: 4px
├─ Caption to CTA Gap: 46px

Font Sizes:
├─ Heading:      28px
├─ Caption:      14px
└─ CTA:          14px
```

### Mobile (767px)
```
Section:         65vh (min 400px)

Text Positioning (53% scale):
├─ Heading Start:    Top: 115px, Left: 30px
├─ Heading to Caption Gap: 3px
├─ Caption to CTA Gap: 34px

Font Sizes:
├─ Heading:      21px
├─ Caption:      11px
└─ CTA:          11px
```

---

## 🎨 Design Tokens Summary

### Colors
```css
/* From Figma - Text appears white on dark background */
--text-color: #FFFFFF (default)
--overlay-color: rgba(0, 0, 0, 0) (default, customizable)
```

### Spacing (1440px Base)
```css
--hero-height: 1040px
--heading-top: 216px
--heading-left: 56px
--heading-caption-gap: 6px
--caption-cta-gap: 64px
```

### Typography (Desktop)
```css
/* Heading */
--heading-size: 40px
--heading-weight: Light (from Figma)
--heading-transform: uppercase

/* Caption */
--caption-size: 20px
--caption-weight: Light (from Figma)

/* CTA */
--cta-size: 20px
--cta-decoration: underline
```

**Full tokens:** See `design-tokens.md`

---

## 🧮 8-Divisible Responsive Math

### Calculation Formula
```javascript
// Target viewport / Base viewport = Scale factor
// Example for 1024px:
1024 / 1440 = 0.7111 (71.11%)

// Apply to all measurements:
Heading Top: 216px × 0.7111 = 154px
Heading Left: 56px × 0.7111 = 40px
Font Size: 40px × 0.7111 = 28px
```

### Key Breakpoints
```
1440px: 100% (base)
1024px: 71.11% scale
767px:  53.26% scale
375px:  26.04% scale
```

**Implementation Details:** See `SPECIFICATION.md` for CSS implementation

---

## 🛠️ Implementation Checklist

### Phase 1: Setup
- [ ] Read all documentation
- [ ] Read required rules from `@docs/rules/`
- [ ] Understand 8-divisible scaling

### Phase 2: Liquid Template
- [ ] Create `sections/image-hero-with-product.liquid`
- [ ] Add schema settings (image, heading, caption, CTA, colors)
- [ ] Structure HTML with BEM classes
- [ ] Add CSS file reference

### Phase 3: CSS Styling
- [ ] Create `assets/section-image-hero-with-product.css`
- [ ] Implement BEM methodology
- [ ] Add desktop styles (1440px base)
- [ ] Implement responsive scaling with media queries
- [ ] Add overlay color support

### Phase 4: Testing
- [ ] Test at 1440px (base)
- [ ] Test at 1024px (tablet)
- [ ] Test at 767px (mobile)
- [ ] Test at 375px (small mobile)
- [ ] Test image upload in theme editor
- [ ] Test all text edits work
- [ ] Test overlay color & opacity controls
- [ ] Validate with Playwright

### Phase 5: Validation
- [ ] No console errors
- [ ] All breakpoints work correctly
- [ ] Text is readable on all backgrounds
- [ ] CTA link works
- [ ] Schema settings save correctly

---

## 🎯 Merchant Customization

Merchants can customize via Shopify Theme Editor:

### Settings Required
1. **Image Upload** - Background image
2. **Heading Text** - Main heading text
3. **Caption Text** - Subheading/description text
4. **CTA Text** - Call-to-action link text
5. **CTA Link** - URL for CTA
6. **Text Color** - Color picker for text
7. **Overlay Color** - Color picker for overlay
8. **Overlay Opacity** - Range slider (0-100%)

---

## 📱 Responsive Behavior

### Desktop (1440px)
- Full-width hero at 1040px height
- Text positioned at 216px top, 56px left
- Font sizes: 40px / 20px / 20px

### Tablet (1024px)
- Proportionally scaled dimensions
- Text repositioned maintaining visual hierarchy
- Font sizes scale down proportionally

### Mobile (767px and below)
- Further scaled dimensions
- Text remains readable
- Maintains visual hierarchy

### Small Mobile (375px)
- Smallest supported viewport
- All elements scale to minimum readable sizes
- Layout integrity maintained

---

## ⚠️ Critical Implementation Notes

### DO
✅ Use 8-divisible math for responsive scaling
✅ Follow BEM methodology for CSS classes
✅ Create separate CSS file in `assets/`
✅ Use `object-fit: cover` for background image
✅ Test across all breakpoints
✅ Ask if anything is unclear

### DON'T
❌ Include product spotlight cards (01, 02, 03)
❌ Modify core theme files
❌ Use arbitrary breakpoint values
❌ Use inline styles
❌ Assume or guess - ask if unclear

---

## 🔗 Figma Reference

**Figma Node ID:** `12:4725`
**Figma URL:** `https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-4725`

**What to Extract:**
- ✅ Background image styling
- ✅ Text content (heading, caption, CTA)
- ✅ Text positioning
- ✅ Typography (font family, sizes, weights)
- ✅ Colors (text, overlay)

**What to Ignore:**
- ❌ Product spotlight cards (01, 02, 03)
- ❌ Product images on the right side
- ❌ "View Now" links on product cards

See `FIGMA-REFERENCE.md` for detailed extraction notes.

---

## 📚 Reference Documents

| Document | Purpose | When to Read |
|----------|---------|--------------|
| **00-INDEX.md** | Navigation guide | First |
| **README.md** | Overview (this file) | Second |
| **FIGMA-REFERENCE.md** | Figma extraction | Before design work |
| **design-tokens.md** | Design system tokens | During development |
| **SPECIFICATION.md** | Technical implementation | During development |

---

## 🐛 Common Issues & Solutions

### Issue: Text not visible on light images
**Solution:** Use overlay color setting with appropriate opacity (30-50%)

### Issue: Responsive scaling doesn't match design
**Solution:** Verify 8-divisible math calculations, check media queries

### Issue: Image doesn't fill container
**Solution:** Ensure `object-fit: cover` is applied to image element

### Issue: CTA link not clickable
**Solution:** Check z-index, ensure proper link structure in Liquid

---

## 📞 Questions?

**Before assuming or guessing:**
- ❓ Check SPECIFICATION.md for technical details
- ❓ Check design-tokens.md for exact measurements
- ❓ Check FIGMA-REFERENCE.md for Figma extraction notes
- ❓ Ask a human if still unclear

**Never assume implementation details - always clarify first.**

---

**Last Updated:** 2025-12-15
**Version:** 1.0.0
**Status:** 📝 Documentation Complete
**Next Step:** Read FIGMA-REFERENCE.md and design-tokens.md
