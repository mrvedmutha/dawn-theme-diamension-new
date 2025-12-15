# Image Hero with Text Section - Documentation Index

## 📌 Quick Navigation

| Document | Purpose | Read First? |
|----------|---------|-------------|
| **README.md** | Overview & getting started | ✅ Start here |
| **SPECIFICATION.md** | Detailed technical specs | ✅ Required |
| **design-tokens.md** | Design system & tokens | ✅ Required |
| **FIGMA-REFERENCE.md** | Figma extraction notes | ✅ Required |

---

## 🎯 Section Purpose

A full-width hero banner section featuring:
- Background image (1440px × 1040px)
- Text overlay (heading, caption, CTA)
- Proportional responsive scaling using 8-divisible math
- Optional color overlay for text readability

**Key Feature:** Simple, elegant hero with text content - NO product spotlight cards.

---

## 📂 What's in This Folder

```
section-image-hero-with-product/
├── 00-INDEX.md              ← You are here
├── README.md                ← Start here for overview
├── SPECIFICATION.md         ← Technical implementation details
├── design-tokens.md         ← Design system tokens
└── FIGMA-REFERENCE.md       ← Figma extraction notes
```

---

## 🚀 Quick Start for Developers

### 1. Read Documentation (in order)
1. **README.md** - Understand the section
2. **FIGMA-REFERENCE.md** - Understand what to extract from Figma
3. **design-tokens.md** - Learn the design system
4. **SPECIFICATION.md** - Technical implementation guide

### 2. Read Required Rules
Before coding, read these from `@docs/rules/`:
- **04-LIQUID-DEVELOPMENT.md** - Liquid standards
- **05-CSS-STANDARDS.md** - CSS, BEM, breakpoints
- **08-NAMING-CONVENTIONS.md** - File naming

### 3. Implementation Steps
1. Create Liquid section file
2. Create CSS file with BEM methodology
3. Implement responsive scaling (8-divisible)
4. Test across breakpoints
5. Validate with Playwright

---

## ⚠️ Critical Notes

- **NO product spotlight feature** - Ignore the 01, 02, 03 product cards in Figma
- This is a **simple hero image with text overlay**
- Use **8-divisible responsive scaling** (not arbitrary breakpoints)
- All spacing/positioning scales proportionally from 1440px base
- **Always ask if unclear** - Do not assume or guess

---

## 📏 Key Measurements (1440px Base)

```
Section:         1440px W × 1040px H
Image:           object-fit: cover

Text Positioning (from top-left):
├─ Heading:      Top 216px, Left 56px
├─ Gap:          6px
├─ Caption:      [flows from heading]
├─ Gap:          64px
└─ CTA:          [flows from caption]

Font Sizes (Desktop):
├─ Heading:      40px
├─ Caption:      20px
└─ CTA:          20px
```

---

## 🎨 Customizable Elements

Merchants can customize:
- ✅ Background image (upload)
- ✅ Heading text
- ✅ Caption text
- ✅ CTA text & link
- ✅ Text color
- ✅ Overlay color & opacity (percentage)

---

## 📖 Development Rules

**Required Reading:**
- `@docs/rules/04-LIQUID-DEVELOPMENT.md`
- `@docs/rules/05-CSS-STANDARDS.md`
- `@docs/rules/08-NAMING-CONVENTIONS.md`

**Key Standards:**
- BEM methodology for CSS classes
- Desktop-first responsive design (1440px base)
- Separate CSS file (`assets/section-image-hero-with-product.css`)
- 8-divisible responsive scaling
- Never modify core theme files

---

**Last Updated:** 2025-12-15
**Figma Node:** `12:4725`
**Status:** 📝 Documentation Complete → 🔄 Ready for Development
