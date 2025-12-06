# Header Design Tokens & Specifications

## Extracted from Figma (2025-12-04)

### Design Overview
A dynamic header that transforms from transparent to filled on scroll:
- **Initial State:** Transparent background with white text/icons
- **Scrolled State:** Filled background (#fffaf5) with dark text/icons (#183754)
- **Behavior:** Becomes sticky when scrolling

---

## Color Palette

### Transparent Header (Initial)
- **Background:** `transparent`
- **Text Color:** `#fffaf5` (off-white/cream)
- **Icons:** `#fffaf5` (white)
- **Divider Line:** `#fffaf5` (white)

### Filled Header (Scrolled/Sticky)
- **Background:** `#fffaf5` (cream/beige)
- **Text Color:** `#183754` (dark blue)
- **Icons:** `#183754` (dark blue)
- **Divider Line:** `#183754` (dark blue)
- **Dropdown Background:** `#fffaf5` (cream/beige)

### Additional Colors
- **Secondary Text:** `#3e6282` (medium blue) - used in some contexts

---

## Typography

### Font Families
1. **Neue Haas Grotesk Display Pro**
   - Weight: 45 Light
   - Weight: 55 Roman
   - Usage: Navigation, currency selector, shipping message

2. **Inter**
   - Weight: Regular (400)
   - Usage: "jewellery" subtitle under logo

### Font Sizes
- **Shipping Message:** `14px`
- **Navigation Items:** `14px` (tracking: 0.28px, uppercase)
- **Currency Selector:** `16px`
- **Logo Subtitle ("jewellery"):** `6.269px` (tracking: 18.8055px, uppercase)

### Line Heights
- Navigation: `normal`
- Shipping message: `normal`

---

## Layout & Spacing

### Header Dimensions
- **Total Height (Transparent):** `105px`
- **Total Height (Filled):** `109px`
- **Top Bar Height:** `~42px` (shipping message section)
- **Main Nav Height:** `~64px` (logo + navigation)

### Horizontal Spacing
- **Container Max Width:** `1440px`
- **Navigation Items Gap:** `40px`
- **Icon Group Gap:** `40px`
- **Left Padding (Nav):** `50.38px` (transparent) / `50.5px` (filled)
- **Right Padding (Icons):** `~1148px` from left edge

### Vertical Spacing
- **Shipping Message Top:** `14.12px` (transparent) / `9.75px` (filled)
- **Navigation Top:** `61.5px` (transparent) / `65.61px` (filled)
- **Logo Center:** `53.4px` from top (transparent) / `53.74px` (filled)
- **Divider Line Top:** `41.52px` (transparent) / `41.7px` (filled)

---

## Components

### Header Structure
```
┌─────────────────────────────────────────────────────────────┐
│  FREE STANDARD SHIPPING MESSAGE (centered, 14px)            │
├─────────────────────────────────────────────────────────────┤
│ Nav Items        │    DIAMENSION LOGO    │  Icons + Currency│
│ (Shop, Customize,│     + jewellery       │  (Search, INR,   │
│  Brand, Origins) │                       │   Profile, Cart) │
└─────────────────────────────────────────────────────────────┘
```

### Navigation Items (Left)
1. Shop
2. Customize
3. Brand
4. Origins

**Styling:**
- Font: Neue Haas Grotesk Display Pro 55 Roman
- Size: 14px
- Spacing: 40px gap
- Transform: uppercase
- Letter-spacing: 0.28px

### Icon Group (Right)
1. Search (MagnifyingGlass) - 24×24px
2. Currency Selector (INR / ₹) - 16px text
3. Profile (noun-profile) - 24×24px
4. Cart (UserCircle) - 24×24px

**Spacing:** 40px gap between each

### Logo (Center)
- **Main Logo:** "DIAMENSION" - 192.494px × 22.813px
- **Subtitle:** "jewellery" - 6.269px, tracking: 18.8055px
- **Position:** Horizontally centered, positioned at ~53px from top

---

## Interactions & Behavior

### Scroll Trigger
- **Initial:** Transparent header with white text
- **On Scroll:**
  - Transition to filled background (#fffaf5)
  - Change text/icons to dark (#183754)
  - Become sticky/fixed to top
  - Smooth transition animation (~300ms recommended)

### Currency Dropdown
- **Initial State:** Shows "INR / ₹"
- **On Hover/Click:** Dropdown appears showing "USD / $"
- **Dropdown Background:** `#fffaf5`
- **Dropdown Dimensions:** 112px × 43px
- **Dropdown Position:** Below currency selector

### Mobile Menu (For Responsive)
- **Breakpoint:** `<= 767px` (mobile)
- **Hamburger Icon:** Required (not shown in desktop Figma)
- **Menu Slide-in:** From left or right

---

## Responsive Breakpoints

### Desktop (1440px+)
- Full header layout as designed
- All navigation items visible
- Icons visible

### Tablet (1024px)
- Consider reducing navigation gap
- May need to adjust logo size

### Mobile (767px)
- Hide navigation items
- Show hamburger menu icon
- Reduce icon group (hide some icons or reduce size)
- Adjust shipping message font size

### Small Mobile (375px)
- Further optimize spacing
- Ensure touch targets are at least 44×44px

---

## Assets Required

### Fonts
- [ ] Neue Haas Grotesk Display Pro (45 Light, 55 Roman) - .woff2
- [ ] Inter Regular (400) - .woff2 (Google Fonts available)

### Logo
- [ ] DIAMENSION logo (white version) - SVG
- [ ] DIAMENSION logo (dark #183754 version) - SVG
- [ ] Dimensions: 192.494px × 22.813px

### Icons (24×24px, SVG format)
- [ ] Search icon (MagnifyingGlass) - white + dark versions
- [ ] Profile icon (noun-profile) - white + dark versions
- [ ] Cart icon (UserCircle) - white + dark versions

### Divider Line
- [ ] Horizontal line (1px height) - white + dark versions
- Or create with CSS border

---

## Animation Specifications

### Scroll Transition
```css
transition:
  background-color 300ms ease-in-out,
  color 300ms ease-in-out,
  box-shadow 300ms ease-in-out;
```

### Sticky Behavior
```css
position: sticky;
top: 0;
z-index: 1000;
```

### Optional: Box Shadow on Scroll
```css
box-shadow: 0 2px 8px rgba(24, 55, 84, 0.1);
```

---

## Accessibility Notes

- **ARIA Labels:** Add for icon buttons (search, profile, cart)
- **Keyboard Navigation:** Ensure all interactive elements are keyboard accessible
- **Focus States:** Visible focus indicators for all interactive elements
- **Color Contrast:**
  - White (#fffaf5) on transparent → Ensure background image contrast
  - Dark (#183754) on cream (#fffaf5) → WCAG AA compliant ✅

---

## Technical Notes

### JavaScript Functionality Required
1. **Scroll Detection:** Listen for scroll events
2. **Header State Toggle:** Add/remove CSS class based on scroll position
3. **Smooth Transition:** CSS transitions for color/background changes
4. **Currency Dropdown:** Toggle dropdown on click
5. **Mobile Menu:** Toggle mobile menu on hamburger click

### CSS Architecture (BEM)
```css
.header { }
.header--transparent { }
.header--filled { }
.header__top-bar { }
.header__shipping-message { }
.header__nav { }
.header__nav-item { }
.header__logo { }
.header__logo-subtitle { }
.header__icon-group { }
.header__icon { }
.header__currency { }
.header__currency-dropdown { }
.header__divider { }
```

---

## Z-Index Hierarchy
- Header: `z-index: 1000`
- Currency Dropdown: `z-index: 1001`
- Mobile Menu: `z-index: 1002`

---

**Last Updated:** 2025-12-04
**Figma Node IDs:**
- Transparent Header: `12:5030`
- Filled Header: `12:5188`

**Status:** ✅ Design extracted, awaiting assets
