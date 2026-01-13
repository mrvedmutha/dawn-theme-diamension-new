# Header Refactor - Developer Documentation

**Project:** Diamension Shopify Dawn Theme - Header Refactoring
**Version:** 1.0.0
**Date:** 2026-01-13

---

## Quick Start

### Before You Begin

**MANDATORY: Read project rules first**

Navigate to `docs/rules/` and read these files in order:

1. `00-OVERVIEW.md` - Start here
2. `01-WORKFLOW.md` - Complete development process
3. `04-LIQUID-DEVELOPMENT.md` - Liquid standards
4. `05-CSS-STANDARDS.md` - CSS & BEM methodology
5. `06-JAVASCRIPT-STANDARDS.md` - JavaScript standards
6. `08-NAMING-CONVENTIONS.md` - File naming conventions

**Do NOT proceed without reading these files.**

---

## Documentation Structure

Read in this order:

### 1. Overview (START HERE)
**File:** `01-OVERVIEW.md`

**Contents:**
- Project goals and scope
- Problem statement
- Architecture overview
- Figma design references
- File structure
- Navigation hierarchy
- Developer checklist

**Read this to:** Understand what you're building and why

---

### 2. Design Tokens
**File:** `02-DESIGN-TOKENS.md`

**Contents:**
- Color palette
- Typography specifications
- Spacing system
- Layout dimensions
- Icon specifications
- Breakpoints
- Animation timings
- Mobile navigation levels
- Desktop mega menu layouts

**Read this to:** Get exact design specifications

---

### 3. Implementation Guide
**File:** `03-IMPLEMENTATION.md`

**Contents:**
- Phase-by-phase implementation steps
- Complete code examples
- Schema refactoring
- Custom snippet creation
- JavaScript class implementations
- Testing checklist
- Troubleshooting guide

**Read this to:** Learn how to actually build it

---

## Project Summary

### What's Changing

**Desktop:** No changes, existing behavior preserved

**Mobile:** Complete rebuild from simple sidebar to 3-level drill-down navigation

### Key Features

1. **Dynamic ID-Based System**
   - Blocks assigned via `menu_id` (like FAQ `category_id`)
   - Flexible, not hardcoded to specific menu names

2. **Separate Desktop/Mobile Menus**
   - `section.settings.menu` for desktop
   - `section.settings.mobile_menu` for mobile
   - Can have different items on each

3. **3-Level Mobile Navigation**
   - Level 1: Main menu + featured cards
   - Level 2: Submenus (columns as accordions)
   - Level 3: Terminal links

4. **Consolidated Desktop Mega Menu**
   - Single `custom-header-mega-menu.liquid` snippet
   - Adaptive layouts based on content
   - Replaces 3 separate snippets

5. **GSAP Animations**
   - Smooth slide + fade transitions
   - Mobile drawer drill-down animations
   - Desktop mega menu stagger effects

---

## Files You'll Create

### Liquid Files
```
snippets/
  ├── custom-header-mega-menu.liquid      (NEW - Desktop mega menu)
  └── custom-mobile-nav-drawer.liquid     (NEW - Mobile navigation)
```

### CSS Files
```
assets/
  ├── custom-header-mega-menu.css         (NEW)
  └── custom-mobile-nav-drawer.css        (NEW)
```

### JavaScript Files
```
assets/
  └── section-diamension-header.js        (UPDATE - Add DiamensionMobileNav class)
```

### Files You'll Modify
```
sections/
  └── custom-section-diamension-header.liquid  (UPDATE - Schema + render calls)
```

### Files You'll Keep Unchanged
```
snippets/
  ├── mega-menu-shop.liquid               (DO NOT MODIFY)
  ├── mega-menu-cards.liquid              (DO NOT MODIFY)
  └── header-mega-menu.liquid             (DO NOT MODIFY)
```

---

## Implementation Phases

### Phase 1: Schema Refactoring
- Add `mobile_menu` setting
- Add `menu_id` to existing blocks
- Create `mobile_featured_card` block

### Phase 2: Desktop Mega Menu
- Create `custom-header-mega-menu.liquid`
- Create `custom-header-mega-menu.css`
- Update header section render calls

### Phase 3: Mobile Navigation
- Create `custom-mobile-nav-drawer.liquid`
- Create `custom-mobile-nav-drawer.css`
- Add to header section

### Phase 4: JavaScript
- Update `DiamensionMegaMenu` class
- Create `DiamensionMobileNav` class
- Initialize new class

### Phase 5: Testing
- Desktop mega menus (no regressions)
- Mobile drawer (all 3 levels)
- Animations on real devices
- Cross-browser testing
- Accessibility testing

---

## Design References

All designs in Figma:

**Mobile Navigation:**
- Level 1: https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=535-114
- Level 2: https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=535-163
- Level 3: https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=535-204

**Desktop Mega Menu:**
- Columns + Cards: https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=526-84
- Centered Cards: https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=528-191

---

## Technology Stack

- **Liquid:** Shopify templating language
- **JavaScript:** Vanilla ES6+, no frameworks
- **GSAP:** 3.x (already loaded globally)
- **CSS:** BEM methodology
- **Testing:** Playwright (visual + functional)

---

## Important Rules

1. **DO NOT modify existing snippets** - create custom versions
2. **Follow BEM naming** - `custom-[type]-[name]__element--modifier`
3. **Use GSAP for animations** - already loaded
4. **Add TODO comments** for console.log during debugging
5. **Never modify core theme files**
6. **Keep CSS/JS in separate files**
7. **Test on real devices** before committing

---

## Success Criteria

### Desktop
- [x] Mega menus work on hover/click
- [x] Close on scroll down and mouse leave
- [x] No regressions to existing behavior
- [x] Adaptive layouts work correctly
- [x] GSAP animations smooth

### Mobile
- [x] 3-level drill-down navigation works
- [x] Animations smooth on real devices
- [x] Featured cards display in 2x2 grid
- [x] Back button works at all levels
- [x] Drawer closes properly (X button, ESC, link click)
- [x] LOGIN/SIGNUP link works

### General
- [x] No JavaScript errors
- [x] No layout shifts
- [x] Works across all breakpoints
- [x] Accessible (keyboard, screen reader)
- [x] Cross-browser compatible

---

## Getting Help

**Issues or Questions:**
- Check existing header: `sections/custom-section-diamension-header.liquid`
- Review FAQ section: `sections/custom-section-faq.liquid` (ID-based filtering example)
- GSAP docs: https://greensock.com/docs/
- Shopify Liquid: https://shopify.dev/docs/api/liquid
- Project rules: `docs/rules/`

---

## Workflow

```
1. Read all prerequisite docs (rules + this folder)
   ↓
2. Understand current implementation
   ↓
3. Phase 1: Schema refactoring
   ↓
4. Phase 2: Desktop mega menu (custom snippet)
   ↓
5. Phase 3: Mobile drawer (custom snippet)
   ↓
6. Phase 4: JavaScript integration
   ↓
7. Phase 5: Testing & validation
   ↓
8. Code review
   ↓
9. Deploy to staging
   ↓
10. Final QA
   ↓
11. Production deployment
```

---

## Estimated Timeline

**Total:** ~3-5 days (experienced developer)

- Phase 1 (Schema): 2-4 hours
- Phase 2 (Desktop): 4-6 hours
- Phase 3 (Mobile): 8-12 hours
- Phase 4 (JavaScript): 4-6 hours
- Phase 5 (Testing): 4-8 hours

**Note:** Timeline assumes familiarity with Shopify Liquid and GSAP.

---

## Ready to Start?

1. ✅ Read all prerequisite docs
2. ✅ Review Figma designs
3. ✅ Understand current implementation
4. ✅ Set up local development environment
5. → Start with Phase 1 in `03-IMPLEMENTATION.md`

---

## Document Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-13 | Initial documentation created |

---

**Questions?** Review the troubleshooting section in `03-IMPLEMENTATION.md` or check project rules in `docs/rules/`.
