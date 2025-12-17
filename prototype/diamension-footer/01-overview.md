# Diamension Footer - Overview

**Section Name:** `custom-diamension-footer`
**CSS File:** `section-custom-diamension-footer.css`
**JS File:** `section-custom-diamension-footer.js`
**Additional Section:** `custom-diamension-footer-image` (homepage-only image)
**Version:** 1.0.0
**Last Updated:** 2025-12-17

---

## Prerequisites

**CRITICAL: Read these development rules before starting:**

1. **[00-OVERVIEW.md](../../docs/rules/00-OVERVIEW.md)** - Navigation guide
2. **[01-WORKFLOW.md](../../docs/rules/01-WORKFLOW.md)** - Complete development process
3. **[02-DESIGN-EXTRACTION.md](../../docs/rules/02-DESIGN-EXTRACTION.md)** - Figma extraction
4. **[04-LIQUID-DEVELOPMENT.md](../../docs/rules/04-LIQUID-DEVELOPMENT.md)** - Liquid coding standards
5. **[05-CSS-STANDARDS.md](../../docs/rules/05-CSS-STANDARDS.md)** - CSS, BEM, breakpoints
6. **[06-JAVASCRIPT-STANDARDS.md](../../docs/rules/06-JAVASCRIPT-STANDARDS.md)** - JavaScript standards
7. **[08-NAMING-CONVENTIONS.md](../../docs/rules/08-NAMING-CONVENTIONS.md)** - File naming

**Do not proceed until you have read and understood these rules.**

---

## Project Context

This is a custom footer section for the Diamension Dawn theme. It replaces the default Shopify Dawn footer with a brand-specific design that includes:

- Custom multi-column navigation menus
- Newsletter subscription form with inline success/error notifications
- Hardcoded designer credit with link
- Auto-updating copyright
- Legal links menu
- Separate homepage-only footer image section
- Product page spacing adjustment for sticky CTA

---

## Figma Design References

**Desktop Design:**
- **Node ID:** `12:4842`
- **URL:** https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-4842&m=dev

**Mobile Design:**
- **Node ID:** `196:112`
- **URL:** https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=196-112&m=dev

---

## Section Architecture

### Main Footer Structure (Desktop)

```
custom-diamension-footer
├── Footer Wrapper (bg: #fffaf5, height: 656px desktop)
│   ├── Container (max-width: 1440px)
│   │   ├── Logo (top right, above newsletter - desktop only)
│   │   ├── Main Content Grid
│   │   │   ├── SHOP Menu Column (left)
│   │   │   ├── SUPPORT Menu Column
│   │   │   ├── DIAMENSIONS Menu Column
│   │   │   ├── CONNECT Menu Column
│   │   │   └── Newsletter Section (right side)
│   │   │       ├── Newsletter Heading
│   │   │       ├── Success/Error Message (displays here at top)
│   │   │       ├── Description Text
│   │   │       └── Email Input + Submit
│   │   └── Bottom Bar
│   │       ├── "Designed by Wings" (hardcoded, left)
│   │       ├── Copyright (center, auto-year)
│   │       └── Legal Links Menu (right, customizable)
```

### Mobile Structure (<1025px)

```
custom-diamension-footer
├── Footer Wrapper (bg: #fffaf5)
│   ├── Container
│   │   ├── Logo (top, left aligned)
│   │   ├── Newsletter Section (full width, below logo, left aligned)
│   │   │   ├── Newsletter Heading
│   │   │   ├── Success/Error Message (displays here at top)
│   │   │   ├── Description Text
│   │   │   └── Email Input + Submit
│   │   ├── Two-Column Menu Grid (left aligned)
│   │   │   ├── Row 1: SHOP | SUPPORT
│   │   │   └── Row 2: DIAMENSIONS | CONNECT
│   │   └── Bottom Bar (centered, stacked vertically)
│   │       ├── "Designed by Wings"
│   │       ├── Copyright
│   │       └── Legal Links (wrapped)
```

### Separate Homepage Image Section

**Section Name:** `custom-diamension-footer-image`

```
custom-diamension-footer-image (separate section)
├── Conditional Rendering: {% if template.name == 'index' %}
│   ├── Image Wrapper (bg: #fffaf5 for gap on product pages)
│   │   └── Footer Image
│   │       ├── Width: 100%
│   │       ├── Height: 448px (desktop, scales down)
│   │       ├── object-fit: cover
│   │       └── object-position: center
```

**Why Separate Section?**
- Like Dawn's announcement bar pattern (separate from header)
- Easier to manage in theme customizer
- Can be enabled/disabled independently
- Shows only on homepage via template conditional
- On product pages, adds gap in footer background color for sticky CTA clearance

---

## Responsive Breakpoints

Must implement **6 breakpoints** with smooth scaling:

1. **Desktop:** ≥1025px (base design, horizontal layout)
2. **Small Desktop:** 1024px - 900px
3. **Tablet:** 899px - 768px (mobile layout starts)
4. **Mid Mobile:** 767px - 480px
5. **Small Mobile:** 479px - 376px
6. **XS Mobile:** ≤375px

**Layout Switch:** Desktop horizontal layout until 1024px, then switch to mobile vertical layout at <1025px.

---

## Key Features

### 1. Newsletter Functionality
- Uses Shopify native `{%- form 'customer' -%}` (no custom API calls)
- Success/failure messages display **at top of newsletter section** (above description text)
- Simple messages: "Signed Up Successfully!" or "Signed Up Failed!"
- Messages use footer typography and color scheme
- Email input has **no focus outline**
- Arrow submit button from Figma design

### 2. Customization via Theme Editor
**Merchant can customize:**
- All menu blocks (SHOP, SUPPORT, DIAMENSIONS, CONNECT)
- Menu titles and link items
- Newsletter heading and description text
- Logo upload (appears top right desktop, top left aligned mobile)
- Legal links menu
- Footer image upload (separate section)

**Hardcoded (not customizable):**
- "Designed by Wings" text and link (https://wings.design)
- Copyright format (auto-updates year)
- Newsletter success/error message text

### 3. Conditional Rendering

**Product Page Modifier:**
```liquid
<footer class="custom-diamension-footer {% if template.name == 'product' %}custom-diamension-footer--product-page{% endif %}">
```
- Adds extra bottom margin in footer bg color (#fffaf5)
- Creates space for sticky CTA without hiding footer content

**Homepage Footer Image (separate section):**
```liquid
{% if template.name == 'index' %}
  <!-- Render footer image -->
{% endif %}
```
- Only renders on homepage
- Maintains footer bg color (#fffaf5) on other pages

---

## Typography & Fonts

### Font Files Location
Fonts are located in: `assets/fonts/`
- `assets/fonts/neue-montreal/`
- `assets/fonts/neue-haas-display/`

### Font Usage
- **Neue Montreal Regular** - Menu headings/labels (14px uppercase)
- **Neue Haas Grotesk Display Pro 55 Roman** - Body text, descriptions (14px)
- **Neue Haas Grotesk Display Pro 45 Light** - Legal links (14px)
- **Inter Regular** - Logo subtitle "JEWELLERY" (12px desktop, 8.4px mobile, wide letter-spacing)

### Font Import
Must use `@font-face` declarations in CSS to import from `assets/fonts/` directory.

---

## Color Palette
- Background: `#fffaf5`
- Primary text: `#183754`
- Secondary/headings: `#3e6282`

---

## Spacing Specifications

### Desktop (≥1025px)
- Wrapper height: `656px`
- Top padding: `152px`
- Left/Right padding: `48px`
- Bottom padding: `24px`

### Mobile/Tablet (<1025px)
- Top padding: `48px`
- Left/Right padding: `24px`
- Bottom padding: `32px`
- Height: auto (content-based)

### Logo Sizing (8-division rule)
- Desktop: `368px` width
- Mobile: `256px` width

### Homepage Footer Image (separate section)
- Width: `100%` (full width)
- Desktop height: `448px`
- Responsive heights (8-divisible): 384px, 320px, 288px, 256px, 224px, 192px
- `object-fit: cover`
- `object-position: center`

---

## Files to Create

### Main Footer Section
```
sections/custom-diamension-footer.liquid
assets/section-custom-diamension-footer.css
assets/section-custom-diamension-footer.js
```

### Footer Image Section (separate)
```
sections/custom-diamension-footer-image.liquid
assets/section-custom-diamension-footer-image.css
```

---

## Development Workflow

1. **Read all prerequisite docs** (listed at top)
2. **Review design tokens** (02-design-tokens.md)
3. **Follow implementation guide** (03-implementation.md)
4. **Create main footer section first**
5. **Create separate footer image section**
6. **Test in theme editor** (http://localhost:9292)
7. **Test all 6 breakpoints**
8. **Test newsletter functionality** (success/error states)
9. **Test template conditionals** (homepage image, product page spacing)
10. **Verify BEM naming** (all classes follow standards)
11. **Run Playwright tests**
12. **Commit with proper message format**

---

## Core Principles to Follow

### 1. Never Modify Core Theme Files
```
❌ sections/footer.liquid
❌ snippets/card-product.liquid
❌ assets/base.css
❌ layout/theme.liquid (unless adding global font imports)
```

### 2. Use BEM Methodology
```css
/* Main Footer */
.custom-diamension-footer { }
.custom-diamension-footer__container { }
.custom-diamension-footer__logo { }
.custom-diamension-footer__newsletter { }
.custom-diamension-footer__newsletter-heading { }
.custom-diamension-footer__newsletter-message { }
.custom-diamension-footer__menu { }
.custom-diamension-footer__menu-title { }
.custom-diamension-footer__menu-item { }
.custom-diamension-footer--product-page { }

/* Footer Image Section */
.custom-diamension-footer-image { }
.custom-diamension-footer-image__wrapper { }
.custom-diamension-footer-image__img { }
```

### 3. Desktop-First CSS
- Write base styles for 1440px desktop
- Use `max-width` media queries for smaller screens
- Use `min-width: 1441px` to center content beyond 1440px

### 4. Separate Asset Files
- CSS in dedicated files (no inline styles)
- JavaScript deferred loading
- Font imports via @font-face

### 5. Performance Optimization
- Lazy load footer image: `loading="lazy"`
- Defer JavaScript: `<script src="..." defer></script>`
- Use responsive image srcsets
- Minimize Liquid loops

---

## Success Criteria

**Before marking this section complete:**

- [ ] Main footer section created and functional
- [ ] Separate footer image section created
- [ ] All 6 breakpoints implemented and tested
- [ ] Logo positioned correctly (top right desktop, top left aligned mobile)
- [ ] Newsletter form submits successfully
- [ ] Success message displays at top of newsletter section
- [ ] Error message displays at top of newsletter section
- [ ] Email input has no focus outline
- [ ] Footer image displays only on homepage
- [ ] Product page has proper spacing (sticky CTA clearance)
- [ ] All menu blocks customizable in theme editor
- [ ] Logo upload works correctly
- [ ] "Designed by Wings" link hardcoded to https://wings.design
- [ ] Copyright year auto-updates
- [ ] Legal links menu customizable
- [ ] Fonts imported from assets/fonts/
- [ ] BEM naming conventions followed
- [ ] No core theme files modified
- [ ] Code is clean and readable
- [ ] All Playwright tests pass

---

## Next Steps

1. ✅ Read this overview
2. → Read [02-design-tokens.md](./02-design-tokens.md)
3. → Read [03-implementation.md](./03-implementation.md)
4. → Begin development
