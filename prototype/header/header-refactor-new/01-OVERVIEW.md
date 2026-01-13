# Header Refactor - Overview

**Version:** 1.0.0
**Last Updated:** 2026-01-13
**Status:** Planning Phase

---

## Prerequisites

**CRITICAL: Read these rules files before starting development:**

1. [docs/rules/00-OVERVIEW.md](../../../docs/rules/00-OVERVIEW.md) - Navigation guide
2. [docs/rules/01-WORKFLOW.md](../../../docs/rules/01-WORKFLOW.md) - Complete workflow
3. [docs/rules/04-LIQUID-DEVELOPMENT.md](../../../docs/rules/04-LIQUID-DEVELOPMENT.md) - Liquid standards
4. [docs/rules/05-CSS-STANDARDS.md](../../../docs/rules/05-CSS-STANDARDS.md) - CSS & BEM
5. [docs/rules/06-JAVASCRIPT-STANDARDS.md](../../../docs/rules/06-JAVASCRIPT-STANDARDS.md) - JavaScript standards
6. [docs/rules/08-NAMING-CONVENTIONS.md](../../../docs/rules/08-NAMING-CONVENTIONS.md) - File naming

**Technology Stack:**
- Vanilla JavaScript (ES6+)
- GSAP 3.x (already loaded globally)
- BEM CSS Methodology
- Shopify Liquid

---

## Project Goal

Refactor the mobile navigation from a simple sidebar to an advanced 3-level drill-down system that mirrors desktop mega menu functionality in a mobile-optimized format.

**Desktop (No Changes):**
- Mega menus on hover (desktop) / click (tablet)
- Close on **scroll down** and **mouse leave**
- Current behavior remains intact

**Mobile (Complete Rebuild):**
- Replace simple sidebar with 3-level drill-down navigation
- Smooth GSAP animations (slide + fade)
- Support for columns, cards, and featured content
- Dynamic menu configuration via ID system

---

## Problem Statement

### Current Limitations

1. **Hardcoded Menu Types:** Mega menus tied to specific names ('shop', 'brand', 'customize', 'origins')
2. **Separate Desktop/Mobile Menus:** Mobile has 4 items, desktop has 6 items, no dynamic sync
3. **Limited Mobile Navigation:** Simple list, no sub-menus or featured content
4. **Multiple Mega Menu Snippets:** 3 separate snippets (`mega-menu-shop.liquid`, `mega-menu-cards.liquid`, `header-mega-menu.liquid`)

### Desired Solution

1. **Dynamic ID-Based System:** Blocks assigned to menu items via `menu_id` (like FAQ's `category_id`)
2. **Separate Menu Settings:** `section.settings.menu` (desktop), `section.settings.mobile_menu` (mobile)
3. **3-Level Mobile Navigation:** Main → Submenu → Terminal links
4. **New Custom Snippets:** Create new custom snippets, don't modify existing ones
5. **Smooth Animations:** GSAP-powered transitions

---

## Design References

### Figma Nodes

**Mobile Navigation (3 Levels):**

- **Level 1 - Main Menu**
  Node: [535:114](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=535-114&m=dev)
  Shows: SHOP, THE STUDIO, CUSTOMIZE, BRAND, BLOG, CONTACT + Featured cards + LOGIN/SIGNUP

- **Level 2 - SHOP Submenu**
  Node: [535:163](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=535-163&m=dev)
  Shows: CATEGORIES, COLLECTIONS, BY STYLE, PRICE, DIAMENSION MOMENTS, BY SHAPE (all with accordion ▼)

- **Level 3 - CATEGORIES Links**
  Node: [535:204](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=535-204&m=dev)
  Shows: Earrings, Necklaces, Rings, Pendants, Bracelets, New Arrivals (terminal links)

**Desktop Mega Menu Layouts:**

- **Columns + Cards Layout**
  Node: [526:84](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=526-84&m=dev)
  Columns on left, featured cards on right

- **Centered Cards Only**
  Node: [528:191](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=528-191&m=dev)
  Card grid, centered layout

---

## Architecture Overview

### File Structure

```
sections/
  └── custom-section-diamension-header.liquid   (Updated schema)

snippets/
  ├── custom-header-mega-menu.liquid            (NEW - Consolidated desktop mega menu)
  ├── custom-mobile-nav-drawer.liquid           (NEW - 3-level mobile navigation)
  ├── mega-menu-shop.liquid                     (KEEP - Do not modify)
  ├── mega-menu-cards.liquid                    (KEEP - Do not modify)
  └── header-mega-menu.liquid                   (KEEP - Do not modify)

assets/
  ├── section-diamension-header.js              (Updated - Add DiamensionMobileNav class)
  ├── section-diamension-header.css             (Updated - Add mobile drawer styles)
  ├── custom-header-mega-menu.css               (NEW - Desktop mega menu styles)
  └── custom-mobile-nav-drawer.css              (NEW - Mobile drawer styles)
```

**IMPORTANT:** Do NOT modify existing snippets. Create new custom versions instead.

### Component Breakdown

**1. Schema Refactor**
- Add `mobile_menu` setting (separate from desktop `menu`)
- Add `menu_id` field to all 3 block types
- Add new "Mobile Featured Card" block type

**2. Desktop Mega Menu (New Custom Snippet)**
- Create `custom-header-mega-menu.liquid` snippet
- Adaptive layout based on content:
  - Columns + Cards → Columns left, cards right
  - Only cards OR only columns → Centered
  - Only columns → Left-aligned
- Filter blocks by `menu_id` instead of hardcoded names
- **Closes on scroll down and mouse leave**

**3. Mobile Navigation (New Custom Snippet)**
- Create `custom-mobile-nav-drawer.liquid` snippet
- 3-level drill-down hierarchy
- GSAP animations (slide + fade)
- Support for columns, cards, and featured content

**4. JavaScript Updates**
- `DiamensionMegaMenu` class → Use `menu_id` instead of text extraction
- `DiamensionMobileNav` class (NEW) → Handle drill-down navigation

---

## Navigation Hierarchy

### Desktop Behavior

**NO CHANGES** to desktop functionality:
- Mega menus appear on hover (desktop) / click (tablet)
- **Close on scroll down and mouse leave**
- Current animations and behavior remain

### Mobile Behavior (New)

**Level 1 - Main Menu:**
```
SHOP ▼
THE STUDIO
CUSTOMIZE ▼
BRAND ▼
BLOG ▼
CONTACT

[Featured Card 1] [Featured Card 2]
[Featured Card 3] [Featured Card 4]

LOGIN/SIGNUP
```

- Items with assigned blocks show accordion chevron ▼
- Items without blocks are simple links
- Featured cards in 2x2 grid
- LOGIN/SIGNUP fixed at bottom

**Level 2 - Submenu (e.g., SHOP):**
```
◀ SHOP

CATEGORIES ▼
COLLECTIONS ▼
BY STYLE ▼
PRICE ▼
DIAMENSION MOMENTS ▼
BY SHAPE ▼
```

- Back arrow ◀ returns to Level 1
- If has columns: Column headings as accordion items
- If has cards: Show cards in 2x2 grid

**Level 3 - Terminal Links (e.g., CATEGORIES):**
```
◀ CATEGORIES

Earrings
Necklaces
Rings
Pendants
Bracelets
New Arrivals
```

- Back arrow ◀ returns to Level 2
- Terminal links (no more drilling)
- Clicking link navigates to page

---

## Animation Specifications

### Desktop Mega Menu (Existing - No Changes)

**Opens on hover/click, closes on scroll down and mouse leave**

### Mobile Drawer Animations (GSAP)

**Initial Open:**
```javascript
// Drawer slides in from right + fade in
gsap.fromTo(drawer,
  { x: '100%', opacity: 0 },
  { x: '0%', opacity: 1, duration: 0.4, ease: 'power2.out' }
);
```

**Accordion Expand (Level 1 → Level 2):**
```javascript
// Current content slides left/backward
gsap.to(currentLevel, {
  x: '-20%',
  opacity: 0,
  duration: 0.3,
  ease: 'power2.in'
});

// New content slides in from right
gsap.fromTo(newLevel,
  { x: '100%', opacity: 0 },
  { x: '0%', opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.1 }
);
```

**Back Button Click (Level 2 → Level 1):**
```javascript
// Current content fades out (NOT reverse animation)
gsap.to(currentLevel, {
  opacity: 0,
  duration: 0.2,
  ease: 'power2.in'
});

// Previous level appears
gsap.to(previousLevel, {
  x: '0%',
  opacity: 1,
  duration: 0.3,
  ease: 'power2.out',
  delay: 0.1
});
```

---

## Menu Configuration System

### Dynamic ID-Based Assignment

**Schema Example:**
```json
{
  "type": "mega_menu_column",
  "settings": [
    {
      "id": "menu_id",
      "type": "text",
      "label": "Assign to Menu (ID)",
      "default": "shop",
      "info": "Enter lowercase menu ID: shop, brand, customize, blog, etc."
    },
    {
      "id": "heading",
      "type": "text",
      "label": "Column Heading"
    },
    {
      "id": "menu",
      "type": "link_list",
      "label": "Menu Links"
    }
  ]
}
```

**Liquid Filtering:**
```liquid
{%- liquid
  assign menu_id = 'shop'
  assign menu_columns = section.blocks | where: 'type', 'mega_menu_column'
  assign shop_columns = ''

  for block in menu_columns
    if block.settings.menu_id == menu_id
      assign shop_columns = shop_columns | append: block.id | append: ','
    endif
  endfor
-%}
```

**JavaScript Matching:**
```javascript
getMegaMenuId(link) {
  // Extract from data attribute or link text
  return link.dataset.menuId || link.textContent.trim().toLowerCase();
}
```

---

## Block Types

### 1. Mega Menu Column
```json
{
  "type": "mega_menu_column",
  "settings": [
    { "id": "menu_id", "type": "text", "label": "Menu ID" },
    { "id": "heading", "type": "text", "label": "Heading" },
    { "id": "menu", "type": "link_list", "label": "Links" }
  ]
}
```

**Usage:** Desktop columns, Mobile Level 2 accordion items

### 2. Desktop Featured Card
```json
{
  "type": "mega_menu_featured_card",
  "settings": [
    { "id": "menu_id", "type": "text", "label": "Menu ID" },
    { "id": "image", "type": "image_picker", "label": "Image" },
    { "id": "heading", "type": "text", "label": "Heading" },
    { "id": "link", "type": "url", "label": "Link" }
  ]
}
```

**Usage:** Desktop mega menu featured cards (right side)

### 3. Mobile Featured Card (NEW)
```json
{
  "type": "mobile_featured_card",
  "settings": [
    { "id": "image", "type": "image_picker", "label": "Image" },
    { "id": "heading", "type": "text", "label": "Heading" },
    { "id": "link", "type": "url", "label": "Link" }
  ]
}
```

**Usage:** Mobile Level 1 featured cards (2x2 grid below menu items)

---

## Developer Checklist

### Before Starting
- [ ] Read all prerequisite rule files (listed at top)
- [ ] Review all Figma design nodes
- [ ] Understand current header implementation
- [ ] Review `section-diamension-header.js` (current JS classes)
- [ ] Review `section-diamension-header.css` (current styles)

### During Development
- [ ] Follow BEM naming conventions
- [ ] Use vanilla JS ES6+ (no jQuery)
- [ ] Use GSAP for animations (already loaded)
- [ ] Test on all breakpoints (desktop, tablet, mobile)
- [ ] Add TODO comments for console.log debugging
- [ ] **DO NOT modify existing snippets** (create custom versions)
- [ ] Never modify core theme files
- [ ] Keep CSS/JS in separate files

### Before Committing
- [ ] Remove all console.log statements (or keep with TODO)
- [ ] Test desktop mega menus (no regressions)
- [ ] Test mobile drawer (all 3 levels)
- [ ] Test animations on actual mobile devices
- [ ] Verify no layout shifts or visual bugs
- [ ] Run Playwright tests (if applicable)
- [ ] Code review for clean, readable code

---

## Next Steps

1. Read **02-DESIGN-TOKENS.md** for design specifications
2. Read **03-IMPLEMENTATION.md** for technical implementation guide
3. Begin with schema refactoring (Phase 1)
4. Create `custom-header-mega-menu.liquid` (Phase 2)
5. Create `custom-mobile-nav-drawer.liquid` (Phase 3)
6. Integration and testing (Phase 4)

---

## Questions & Support

**Issues or Questions:**
- Check existing header code: `sections/custom-section-diamension-header.liquid`
- Review FAQ section code for ID-based filtering: `sections/custom-section-faq.liquid`
- Reference GSAP docs: https://greensock.com/docs/
- Review Shopify Liquid docs: https://shopify.dev/docs/api/liquid

**Contact:**
- Project Lead: [Your Name]
- Design Reference: Figma (links above)
