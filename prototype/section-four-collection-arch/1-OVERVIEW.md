# Four Collection Arch Section - Development Guide

## 📌 Quick Overview

A **full-width collection showcase section** featuring a centered heading and collection cards with image backgrounds, text overlays, and interactive hover effects. Desktop users experience an arch animation on hover with GSAP, while mobile/tablet views remain static.

**Status:** 📝 **Documentation Complete** → 🔄 **Ready for Development**

---

## 📂 Folder Structure

```
section-four-collection-arch/
├── 1-OVERVIEW.md              ← You are here
├── 2-DESIGN-TOKENS.md         ← Design system & tokens
├── 3-IMPLEMENTATION.md        ← Technical specifications
└── (To be created during development)
    ├── custom-section-four-collection-arch.liquid   ← Main section template
    ├── section-four-collection-arch.css             ← Styling
    └── section-four-collection-arch.js              ← GSAP animations
```

---

## 🎯 What This Section Does

### Visual Description

A collection showcase section with:
- **Section Header:** Centered heading "YOUR STYLE, OUR COLLECTION" (merchant editable)
- **Collection Cards:** Horizontal grid layout showcasing jewelry collections (using blocks)
- **Image Backgrounds:** Full-bleed collection photography with text overlays
- **Hover Interactions (Desktop Only):** Top arch effect + CTA animation using GSAP
- **Responsive Layout:** 4 columns (desktop/tablet), 2 columns (mobile)

### Default Collection Cards (from Figma):
1. **Engagement & Bridal**
2. **Everyday Essentials**
3. **Statement Jewelry**
4. **Gifts That Shine**

**Note:** Merchants can add/remove/reorder cards using blocks.

---

## 🏗️ Section Architecture

### Section-Level Settings
Applies to the entire section:
- Section heading text
- Heading color
- Mobile aspect ratio (1:1, 5:4, 9:16)
- Section-wide padding/spacing

### Block-Level Settings
Each collection card is a **separate block**. Merchants can:
- Add new collection cards
- Remove existing cards
- Reorder cards (drag & drop)
- Edit each card independently

**Per Block Settings:**
- Collection image (merchant uploads)
- Collection title (text)
- CTA text (e.g., "View Collection")
- CTA link URL
- Text color (optional override)

**Why blocks?**
✅ Merchants control how many cards to show (not limited to 4)
✅ Easy to add new collections without developer
✅ Reorderable via drag & drop
✅ Each card independently editable

---

## 🎨 Design Features

### Section Header
- **Text:** Merchant editable (default: "YOUR STYLE, OUR COLLECTION")
- **Position:** Center aligned
- **Spacing:** 24px padding top/bottom
- **Typography:** Neue Haas Grotesk Display Pro 45 Light, 40px, #183754, uppercase

### Collection Cards
- **Layout:**
  - Desktop: 4 columns (25% width each)
  - Tablet: 4 columns (25% width each)
  - Mobile: 2 columns (50% width each, 2 rows)
- **Dimensions:**
  - Desktop/Tablet: 544px height
  - Mobile: Square ratio (1:1) based on width (default)
- **Card Content:**
  - Background image with optional mask overlay
  - Collection title (centered, 152px from bottom edge)
  - "View Collection" CTA (centered, 56px from bottom edge)

### Hover Interaction (Desktop Only)
- **Top Arch Effect:** border-radius 50% on top-left and top-right corners
- **CTA Animation:** Fades out while moving up, then fades back in
- **Technology:** GSAP for smooth animations
- **Mobile/Tablet:** No hover effects, CTA always visible, no arch

---

## 📐 Dimensions Quick Reference

### Section Container
```
Height:          640px (fixed)
Width:           100% (full-width, fluid)
Max Width:       None (full browser width)
```

### Section Header
```
Padding:         24px (top/bottom)
Font Size:       40px
Font Family:     Neue Haas Grotesk Display Pro
Font Weight:     45 Light
Line Height:     45px
Color:           #183754 (navy blue)
Text Transform:  Uppercase
Alignment:       Center
```

### Collection Card (Desktop/Tablet)
```
Width:           25% (4 columns in grid)
Height:          544px (fixed)
Image:           object-fit: cover
Gap:             0px (no gap between cards)
```

### Collection Card (Mobile)
```
Width:           50% (2 columns)
Height:          Based on aspect ratio setting
Aspect Ratios:   1:1 (square), 5:4, 9:16
Default:         1:1 (square)
Gap:             0px
```

### Text Positioning (Inside Cards)
```
Collection Title:
  - Bottom Edge:      152px from bottom of card
  - Horizontal:       Center aligned
  - Side Margin:      40px left/right padding
  - Font:             Neue Haas Grotesk Display Pro 45 Light
  - Size:             40px (41.924px in some cards)
  - Line Height:      50.309px
  - Color:            #FFFAF5 (cream white)
  - Transform:        Uppercase

"View Collection" CTA:
  - Bottom Edge:      56px from bottom of card
  - Horizontal:       Center aligned
  - Font:             Neue Montreal Regular
  - Size:             20px
  - Line Height:      40px
  - Color:            #FFFAF5 (cream white)
  - Decoration:       Underline
  - Underline Offset: 25%
  - Desktop:          Hidden (opacity: 0), shows on hover
  - Mobile/Tablet:    Always visible (opacity: 1)
```

---

## 🎬 Hover Interactions (Desktop Only)

### Card Hover State
1. **Arch Effect:**
   - Apply `border-radius: 50%` to top-left corner
   - Apply `border-radius: 50%` to top-right corner
   - Creates upside-down U shape at top of card
   - Smooth transition with GSAP
   - Duration: Subtle (recommend 0.4-0.6s)

2. **CTA Animation:**
   - Default State: Hidden (opacity: 0)
   - On Hover: CTA fades out → moves up → fades in
   - Animation sequence:
     1. Fade out from opacity 1 to 0 (while at 56px from bottom)
     2. Move upward during fade
     3. Fade in from opacity 0 to 1 (at new position)
   - Duration: Subtle, smooth (recommend 0.4-0.6s total)
   - Easing: Ease or power2.out

### Mobile/Tablet Behavior
- **No arch effect** - cards remain rectangular
- **CTA always visible** - opacity: 1, no fade animations
- **No GSAP listeners** - static presentation

---

## 🛠️ Implementation Checklist

### Phase 1: Setup & Understanding
- [ ] Read this overview document completely
- [ ] Read `2-DESIGN-TOKENS.md` for exact measurements
- [ ] Read `3-IMPLEMENTATION.md` for code structure
- [ ] Read project rules in `@docs/rules/` (04, 05, 06, 08)
- [ ] Use Figma MCP to read both nodes (12:4784, 12:4776)
- [ ] Extract exact font specifications from Figma

### Phase 2: Liquid Template
- [ ] Create `sections/custom-section-four-collection-arch.liquid`
- [ ] Add section-level settings (heading text, heading color, mobile aspect ratio)
- [ ] Add blocks schema for collection cards
- [ ] Add per-block settings (image, title, CTA text, CTA URL, text color)
- [ ] Structure HTML with BEM classes
- [ ] Link CSS file: `{{ 'section-four-collection-arch.css' | asset_url | stylesheet_tag }}`
- [ ] Link JS file: `<script src="{{ 'section-four-collection-arch.js' | asset_url }}" defer></script>`
- [ ] Loop through `section.blocks` to render cards
- [ ] Add placeholder content for default 4 cards

### Phase 3: CSS Styling
- [ ] Create `assets/section-four-collection-arch.css`
- [ ] Implement BEM methodology (`.custom-section-four-collection-arch`)
- [ ] Style section header (24px padding, 40px font, centered, #183754)
- [ ] Create 4-column grid for cards (desktop/tablet)
- [ ] Create 2-column grid for cards (mobile)
- [ ] Set card dimensions (544px desktop, aspect-ratio mobile)
- [ ] Position text overlays (152px and 56px from bottom)
- [ ] Style collection titles (40px, uppercase, #FFFAF5, 40px side margins)
- [ ] Style CTA links (20px, underline, #FFFAF5, underline-offset: 25%)
- [ ] Hide CTA on desktop (opacity: 0), show on mobile/tablet (opacity: 1)
- [ ] Implement responsive breakpoints (@media queries)
- [ ] Add CSS foundation for arch effect (border-radius)
- [ ] Use `object-fit: cover` for images

### Phase 4: JavaScript (GSAP)
- [ ] Create `assets/section-four-collection-arch.js`
- [ ] Load GSAP library (check if already available in theme)
- [ ] Detect device type (desktop vs mobile/tablet)
- [ ] Add hover listeners to cards (desktop only, `window.innerWidth >= 768`)
- [ ] Animate arch effect on hover (border-radius transition)
- [ ] Animate CTA on hover (fade out → move up → fade in)
- [ ] Remove hover listeners on mobile/tablet
- [ ] Test smooth animations (0.4-0.6s duration, ease/power2.out)
- [ ] Handle window resize (re-check device type)

### Phase 5: Manual Verification
- [ ] Test section at 1440px viewport (4 columns, hover works)
- [ ] Test section at 1024px viewport (4 columns, no hover)
- [ ] Test section at 767px viewport (2 columns, no hover)
- [ ] Test section at 375px viewport (2 columns, square ratio)
- [ ] Verify hover arch animation (desktop only)
- [ ] Verify CTA fade animation (desktop only)
- [ ] Verify CTA is visible on mobile/tablet (no hover)
- [ ] Test adding/removing blocks in theme editor
- [ ] Test reordering blocks via drag & drop
- [ ] Test all merchant settings work
- [ ] Test mobile aspect ratio switcher (1:1, 5:4, 9:16)
- [ ] Verify images display correctly (`object-fit: cover`)
- [ ] Verify text is readable on all backgrounds
- [ ] Verify CTA links navigate correctly
- [ ] Check for console errors (desktop and mobile)

---

## 🎯 Merchant Customization

Merchants can customize via Shopify Theme Editor:

### Section-Level Settings
1. **Section Heading** - Text input (default: "YOUR STYLE, OUR COLLECTION")
2. **Heading Color** - Color picker (default: #183754)
3. **Mobile Aspect Ratio** - Select dropdown:
   - 1:1 (Square) - Default
   - 5:4 (Portrait)
   - 9:16 (Tall Portrait)

### Block Settings (Per Collection Card)
Each block represents one collection card:
1. **Collection Image** - Image picker (merchant uploads image)
2. **Collection Title** - Text input (e.g., "Engagement & Bridal")
3. **CTA Text** - Text input (default: "View Collection")
4. **CTA Link** - URL picker (link to collection page)
5. **Text Color** - Color picker (default: #FFFAF5 - cream white)

### Block Management
Merchants can:
- Add new blocks (collection cards)
- Delete blocks
- Reorder blocks (drag & drop)
- Edit each block's content independently

---

## 📱 Responsive Behavior

### Desktop (1440px)
- Grid: 4 columns at 25% width each
- Card height: 544px (fixed)
- Hover effects: ✅ Arch + CTA animation
- CTA visibility: Hidden by default, shows on hover
- Gap: 0px between cards

### Tablet (1024px)
- Grid: 4 columns at 25% width each
- Card height: 544px (fixed)
- Hover effects: ❌ None
- CTA visibility: Always visible
- Gap: 0px between cards

### Mobile (767px and below)
- Grid: 2 columns at 50% width each
- Card height: Based on aspect ratio (default 1:1 square)
- Rows: 2 rows (if 4 cards total)
- Hover effects: ❌ None
- CTA visibility: Always visible
- Gap: 0px between cards

### Small Mobile (375px)
- Same as mobile (2 columns, 2 rows)
- Maintains selected aspect ratio
- Text may scale for readability if needed

---

## ⚠️ Critical Implementation Notes

### DO
✅ Use Figma MCP to read both nodes (12:4784, 12:4776)
✅ Create blocks for collection cards (repeatable content)
✅ Follow BEM methodology (`.custom-section-four-collection-arch`)
✅ Use GSAP for smooth hover animations (desktop only)
✅ Use `aspect-ratio` CSS property for mobile cards
✅ Make heading and all block content merchant editable
✅ Loop through `section.blocks` to render cards dynamically
✅ Add default 4 blocks in presets
✅ Document height adjustment options for future changes
✅ Test on real Shopify theme editor
✅ Ask if anything is unclear

### DON'T
❌ Hardcode collection data (use blocks instead)
❌ Apply hover animations on mobile/tablet
❌ Modify core theme files
❌ Use arbitrary breakpoints (use standard: 1440px, 1024px, 767px, 375px)
❌ Use inline styles (except CSS custom properties)
❌ Attach GSAP listeners on mobile devices
❌ Limit blocks to exactly 4 (merchant should be able to add more)
❌ Assume - clarify unclear requirements first

---

## 🔗 Figma Reference

### Node 1: Section Header
**Figma Node ID:** `12:4784`
**URL:** `https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-4784`

**What to Extract:**
- Header text: "yOUR STYLE, OUR COLLECTION"
- Font: Neue Haas Grotesk Display Pro 45 Light
- Font size: 40px
- Line height: 45px
- Color: #183754
- Text transform: Uppercase
- Alignment: Center

### Node 2: Collection Grid
**Figma Node ID:** `12:4776`
**URL:** `https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-4776`

**What to Extract:**
- Card dimensions: 358.87px W × 544.174px H
- 4 collection images
- Collection title styling:
  - Font: Neue Haas Grotesk Display Pro 45 Light
  - Size: 40px (some 41.924px)
  - Line height: 50.309px
  - Color: #FFFAF5
  - Transform: Uppercase
  - Position: 152px from bottom
- CTA styling:
  - Font: Neue Montreal Regular
  - Size: 20px
  - Line height: 40px
  - Color: #FFFAF5
  - Decoration: Underline (offset 25%)
  - Position: 56px from bottom
  - Opacity: 0 (hidden, shows on hover)
- SVG mask shape (for arch effect reference)

**Developer Action:**
Use Figma MCP tool before development to confirm all measurements.

---

## 📚 Reference Documents

| Document | Purpose | When to Read |
|----------|---------|--------------|
| **1-OVERVIEW.md** | Overview (this file) | First - Start here |
| **2-DESIGN-TOKENS.md** | All design tokens & measurements | During development |
| **3-IMPLEMENTATION.md** | Code examples & structure | During development |
| **@docs/rules/04-LIQUID-DEVELOPMENT.md** | Liquid standards & blocks | Before Liquid coding |
| **@docs/rules/05-CSS-STANDARDS.md** | CSS, BEM, responsive | Before CSS coding |
| **@docs/rules/06-JAVASCRIPT-STANDARDS.md** | JavaScript & GSAP | Before JS coding |
| **@docs/rules/08-NAMING-CONVENTIONS.md** | File & class naming | Before creating files |

---

## 🔍 Developer Notes

### Height Customization Guide

**Desktop/Tablet Height (544px):**
To change card height on desktop:
1. Open `assets/section-four-collection-arch.css`
2. Locate `.custom-section-four-collection-arch__card`
3. Update `height: 544px` to desired value
4. If changing height significantly, adjust text positions:
   - Title: Currently 152px from bottom
   - CTA: Currently 56px from bottom
   - Calculate new positions proportionally

**Mobile Height (Aspect Ratio):**
Controlled by merchant via section settings:
- 1:1 (Square) - Default
- 5:4 (Portrait) - Slightly taller
- 9:16 (Tall Portrait) - Very tall (story format)

Implementation:
- CSS custom property: `--card-aspect-ratio`
- Applied via `aspect-ratio` CSS property
- Located in `@media (max-width: 767px)` media query

### GSAP Integration

If GSAP is not already in the theme:
1. Add GSAP via CDN or npm
2. Load before `section-four-collection-arch.js`
3. Or use theme's existing animation library if preferred

---

## 🐛 Common Issues & Solutions

### Issue: Arch effect appears on mobile
**Solution:** Check GSAP listener condition: `if (window.innerWidth >= 768)`

### Issue: CTA animation not smooth
**Solution:** Adjust GSAP duration (0.4-0.6s) and easing (power2.out)

### Issue: Images stretched or squashed
**Solution:** Verify `object-fit: cover` on image element

### Issue: Text not readable on light images
**Solution:** Add optional overlay color to blocks (future enhancement)

### Issue: Cards not equal width
**Solution:** Check grid CSS: `grid-template-columns: repeat(4, 1fr)`

### Issue: Mobile aspect ratio not working
**Solution:** Verify `aspect-ratio` CSS property support and fallback

---

## 📞 Questions?

**Before Development:**
- ❓ Confirm CTA animation sequence (fade out → move up → fade in)
- ❓ Confirm arch animation duration and easing
- ❓ Should blocks be limited to max 4, or unlimited?
- ❓ Any overlay color option needed for text readability?

**During Development:**
- ❓ Check `2-DESIGN-TOKENS.md` for exact measurements
- ❓ Check `3-IMPLEMENTATION.md` for code structure
- ❓ Use Figma MCP to verify design specs
- ❓ Refer to `@docs/rules/` for coding standards
- ❓ Ask stakeholder if requirements unclear

**Never assume - always clarify first.**

---

**Last Updated:** 2025-12-16
**Version:** 1.0.0
**Status:** 📝 Documentation Complete
**Next Step:** Read 2-DESIGN-TOKENS.md
