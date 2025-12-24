# Custom Diamension Quote Gallery - Overview

**Section Name:** `custom-diamension-quote-gallery`
**Version:** 1.0.0
**Created:** 2025-12-24

---

## 📋 Section Purpose

A dynamic gallery section featuring 5 asymmetrically positioned images with parallax scrolling effects, centered quote text, and brand logo. Designed to showcase jewelry products with an elegant, floating gallery aesthetic.

---

## 🎨 Figma Reference

**Figma Node:** `12:8854`
**Figma URL:** https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-8854&m=dev

**Design Context:**
- 5 images positioned asymmetrically across the layout
- Center quote with brand logo
- Warm beige background (#fffaf5)
- White containers for images
- Parallax effect on all images (desktop only)

---

## 📚 Development Rules Reference

**IMPORTANT:** Before starting development, developers MUST read the following rules:

### Required Reading:
1. **[00-OVERVIEW.md](../../docs/rules/00-OVERVIEW.md)** - Navigation guide
2. **[01-WORKFLOW.md](../../docs/rules/01-WORKFLOW.md)** - Complete development process
3. **[02-DESIGN-EXTRACTION.md](../../docs/rules/02-DESIGN-EXTRACTION.md)** - Figma extraction standards
4. **[04-LIQUID-DEVELOPMENT.md](../../docs/rules/04-LIQUID-DEVELOPMENT.md)** - Liquid coding standards
5. **[05-CSS-STANDARDS.md](../../docs/rules/05-CSS-STANDARDS.md)** - CSS, BEM, breakpoints
6. **[06-JAVASCRIPT-STANDARDS.md](../../docs/rules/06-JAVASCRIPT-STANDARDS.md)** - JavaScript best practices
7. **[08-NAMING-CONVENTIONS.md](../../docs/rules/08-NAMING-CONVENTIONS.md)** - File naming conventions

### Key Standards:
- ✅ Direct Liquid development (no HTML prototype)
- ✅ BEM methodology with `.custom-section-quote-gallery` prefix
- ✅ Desktop-first responsive design (1440px base)
- ✅ Separate CSS and JS files
- ✅ GSAP + ScrollTrigger for parallax effects
- ✅ Schema settings for all customizable content
- ✅ Never modify core theme files

---

## 🎯 Features

### Core Features:
- 5 customizable image containers with asymmetric positioning
- GSAP parallax scrolling effect (desktop only, >1024px)
- Center quote text (customizable)
- Brand logo (SVG, customizable)
- Warm beige background (customizable color)
- Fully responsive layout

### Interactions:
- **Desktop (>1024px):** Parallax effect - images move vertically (-80px to +80px) on scroll
- **Tablet (768px-1024px):** Same layout, scaled down, no parallax
- **Mobile (<768px):** Stacked layout - center image → two images → content → two images

### Customizable in Theme Editor:
- All 5 images
- Quote text
- Logo SVG
- Background color
- Enable/disable parallax effect

---

## 📁 File Structure

```
sections/
└── custom-section-diamension-quote-gallery.liquid

assets/
├── section-diamension-quote-gallery.css
└── section-diamension-quote-gallery.js

prototype/custom-diamension-quote-gallery/
├── overview.md (this file)
├── design-tokens.md
└── implementation.md
```

---

## 🔧 Technical Stack

- **Liquid:** Shopify templating
- **CSS:** BEM methodology, desktop-first responsive
- **JavaScript:** ES6+, GSAP 3, ScrollTrigger plugin
- **External Libraries:** GSAP (already included in theme)

---

## 📱 Responsive Behavior

### Desktop (>1024px):
- Max-width container: 1440px
- 5 images positioned absolutely within container
- Parallax effect: 80px vertical movement on scroll
- Quote and logo centered

### Tablet (768px-1024px):
- Same positioning system, scaled proportionally
- No parallax effect
- All elements resize to fit viewport

### Mobile (<768px):
- Linear stacked layout:
  1. Center image (top)
  2. Two images in row (square format)
  3. Content block (logo + quote)
  4. Two images in row (square format)

---

## 🎨 Design Tokens

See [design-tokens.md](./design-tokens.md) for complete design specifications including:
- Colors
- Typography
- Spacing
- Layout measurements
- Breakpoints
- Image dimensions

---

## 🚀 Implementation Plan

See [implementation.md](./implementation.md) for detailed implementation steps including:
- Liquid file structure
- CSS implementation (BEM)
- JavaScript parallax setup
- Schema settings
- Testing checklist

---

## ✅ Development Checklist

Before starting development:
- [ ] Read all required rules documentation
- [ ] Review Figma design node (12:8854)
- [ ] Understand design tokens
- [ ] Review implementation plan
- [ ] Collect all assets (images, fonts, logo SVG)
- [ ] Set up GSAP in theme (if not already included)

During development:
- [ ] Create Liquid section file
- [ ] Create CSS file with BEM naming
- [ ] Create JavaScript file with parallax logic
- [ ] Test in Shopify theme editor (localhost:9292)
- [ ] Test all breakpoints (1440px, 1024px, 767px, 375px)
- [ ] Test parallax effect on desktop
- [ ] Verify mobile stacked layout
- [ ] Verify all schema settings work

Before commit:
- [ ] All tests pass
- [ ] No console errors
- [ ] Code follows BEM methodology
- [ ] No core theme files modified
- [ ] All TODO comments removed
- [ ] ESLint warnings addressed

---

## 📝 Notes for Developer

1. **Parallax Implementation:** Use existing parallax logic pattern from the codebase but write new implementation for this specific section.

2. **GSAP Setup:** Verify GSAP and ScrollTrigger are loaded in theme. If not, add to `theme.liquid`:
   ```liquid
   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
   ```

3. **Logo SVG:** Located at `assets/custom-section-diamension-quote/logo/diamension-logo.svg`

4. **Fonts:** Available in `assets/fonts/` directory:
   - Bickham Script Pro
   - Neue Haas Display
   - Neue Montreal

5. **Mobile Layout:** The mobile stacked layout is a design decision to ensure good UX on small screens. Images should be squares (~160px × ~160px) for visual consistency.

6. **Image Optimization:** Use Shopify's image CDN with appropriate sizes:
   - Desktop images: 600px-800px width
   - Mobile images: 400px width

---

## 🐛 Known Considerations

- Parallax effect only works on desktop (>1024px viewport)
- ScrollTrigger instances must be properly cleaned up on resize
- Absolute positioning requires careful testing across different viewport sizes
- Mobile layout deviates significantly from desktop - this is intentional

---

## 📞 Questions/Issues

If you encounter issues or need clarification:
1. Review the Figma node again
2. Check the rules documentation
3. Review existing similar sections in `prototype/` folder
4. Check GSAP documentation: https://greensock.com/docs/
