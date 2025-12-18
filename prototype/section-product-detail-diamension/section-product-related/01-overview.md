# Related Products Section - Overview

## 📌 Purpose
This document provides a complete overview of the "Similar Products" carousel section for Diamension jewelry products. This section displays product recommendations in a horizontal scrollable carousel format, typically shown on product detail pages.

---

## 🎯 Section Scope

**File Location:** `sections/custom-product-related.liquid`

**Primary Function:**
- Display related/similar products in a carousel format
- Show 5 products at a time with horizontal scrolling
- Support up to 10 products total (5 visible + 5 hidden)
- Provide wishlist functionality for each product
- Navigate products using arrow buttons
- Responsive design (5 → 4 → 2 products per view)
- Link to individual product pages

---

## 🏗️ Architecture Overview

### Section Structure Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECTION WRAPPER (fluid 100%)                 │
│                    Background: #FFFAF5                          │
│                    Full width across viewport                   │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │            CONTAINER (max-width: 1440px)                  │ │
│  │            Centered with auto margins                     │ │
│  │            Padding: 100px (top/bottom), 50px (left/right) │ │
│  │                                                           │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │                    CONTENTS                         │ │ │
│  │  │                                                     │ │ │
│  │  │  ┌───────────────────────────────────────────────┐ │ │ │
│  │  │  │   "Similar Products" Title (32px)            │ │ │ │
│  │  │  └───────────────────────────────────────────────┘ │ │ │
│  │  │                   ↓ (24px gap)                    │ │ │
│  │  │  ┌───────────────────────────────────────────────┐ │ │ │
│  │  │  │   CAROUSEL CONTAINER                         │ │ │ │
│  │  │  │                                              │ │ │ │
│  │  │  │  [←] [Card] [Card] [Card] [Card] [Card] [→] │ │ │ │
│  │  │  │       ↑     ↑     ↑     ↑     ↑             │ │ │ │
│  │  │  │    260px  10px  260px  10px  260px          │ │ │ │
│  │  │  │    width  gap   width  gap   width          │ │ │ │
│  │  │  └───────────────────────────────────────────────┘ │ │ │
│  │  │                                                     │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Structure Breakdown:

**1. Section Wrapper (Outermost)**
- Width: 100% (fluid, full viewport width)
- Background: #FFFAF5 (cream/off-white)
- Purpose: Provides full-width background color

**2. Container (Middle Layer)**
- Max-width: 1440px
- Margin: 0 auto (centered)
- Padding: 100px (vertical), 50px (horizontal)
- Purpose: Constrains content width and provides padding

**3. Contents (Inner Layer)**
- Contains: Title + Carousel
- Width: 100% of container
- Purpose: Holds actual content elements

### Desktop Layout (≥1024px)

```
Section Wrapper (100% width, bg: #FFFAF5)
│
└── Container (max-width: 1440px, centered, padding)
    │
    └── Contents
        │
        ├── Title: "Similar Products"
        │
        └── Carousel Container
            │
            ├── Arrow Left [←] (hidden at start)
            │
            ├── Product Card 1 (260px width)
            ├── 10px gap
            ├── Product Card 2 (260px width)
            ├── 10px gap
            ├── Product Card 3 (260px width)
            ├── 10px gap
            ├── Product Card 4 (260px width)
            ├── 10px gap
            ├── Product Card 5 (260px width)
            │
            └── Arrow Right [→] (visible if more products)
```

### Product Card Structure (260px × ~430px):

```
┌─────────────────────────┐
│ PRODUCT CARD (260px w)  │
│                         │
│  ┌───────────────────┐  │
│  │ IMAGE WRAPPER     │  │ ← 260px × 360px
│  │ (260px × 360px)   │  │    Background: #f0efea
│  │ Bg: #f0efea       │  │
│  │                   │  │
│  │   ┌───────────┐   │  │
│  │   │  Product  │   │  │ ← Actual Image: 250×250px
│  │   │   Image   │   │  │    Centered, object-fit: contain
│  │   │ 250×250px │   │  │
│  │   └───────────┘   │  │
│  │                   │  │
│  │        ♡          │  │ ← Wishlist: 24×24px (top: 24px, right: 24px)
│  └───────────────────┘  │
│         ↓ 10px gap      │
│  ┌───────────────────┐  │
│  │ Product Name      │  │ ← 20px, Neue Haas 45 Light, #183754
│  └───────────────────┘  │
│         ↓ 4px gap       │
│  ┌───────────────────┐  │
│  │ From Rs. XX,XXX   │  │ ← 16px, Neue Montreal, #3e6282
│  └───────────────────┘  │
│                         │
└─────────────────────────┘
```

### Key Measurements:
- **Section Wrapper:** 100% width (fluid), background: #FFFAF5
- **Container:** max-width: 1440px, centered, padding: 100px/50px
- **Product Card:** 260px width (fixed on desktop)
- **Image Wrapper:** 260px × 360px, background: #f0efea
- **Actual Product Image:** 250×250px (centered within wrapper)
- **Gap between cards:** 10px
- **Gap between image and name:** 10px
- **Gap between name and price:** 4px

---

## 🔗 Key Figma Design References

**IMPORTANT:** Before starting development, you MUST review these Figma nodes to understand the complete design:

### Main Section Node:
- **Similar Products Section:** [Node 206-452](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=206-452&m=dev)

### Component References:
- **Wishlist Button:** [Node 206-461](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=206-461&m=dev)
- **Product Card Structure:** [Node 206-455](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=206-455&m=dev)
- **Chevron Navigation Icon:** [Node 206-523](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=206-523&m=dev)

**How to Access Figma Nodes:**
Use the MCP Figma tools to fetch design context and screenshots:
```javascript
// Example MCP tool usage:
mcp__figma-desktop-mcp__get_design_context({ nodeId: "206-452" })
mcp__figma-desktop-mcp__get_screenshot({ nodeId: "206-452" })
```

---

## 📋 Required Reading Before Development

**YOU MUST READ THESE DOCUMENTS FIRST:**

### 1. Project Rules (Critical!)
Located in: `docs/rules/`

Read in this order:
1. `00-OVERVIEW.md` - Project overview and philosophy
2. `01-WORKFLOW.md` - Development workflow
3. `02-DESIGN-EXTRACTION.md` - How to extract design specs from Figma
4. `03-ASSET-MANAGEMENT.md` - Asset handling and organization
5. `04-LIQUID-DEVELOPMENT.md` - Liquid templating standards
6. `05-CSS-STANDARDS.md` - CSS architecture and naming
7. `06-JAVASCRIPT-STANDARDS.md` - JavaScript patterns
8. `08-NAMING-CONVENTIONS.md` - BEM naming conventions

### 2. Section-Specific Documentation
Located in: `prototype/section-product-detail-diamension/section-product-related/`

1. `01-overview.md` - This document (overview)
2. `02-design-tokens.md` - Design specifications and tokens
3. `03-implementation-guide.md` - Step-by-step implementation

### 3. Related Documentation
- `prototype/section-product-detail-diamension/wishlist-button-implementation/implementation-overview.md` - Wishlist logic (NOTE: Use 24px sizing, not 18px as mentioned in doc)

---

## 🧪 Pre-Development Testing

**MANDATORY:** Before writing any code, use MCP tools to:

1. **Fetch all Figma nodes** listed above to understand visual design
2. **Read all design tokens** in `02-design-tokens.md`
3. **Analyze existing implementation:**
   ```javascript
   // Test on local environment
   mcp__playwright__browser_navigate({
     url: "http://127.0.0.1:9292/products/[product-handle]"
   })

   // Take screenshots to compare with Figma
   mcp__playwright__browser_take_screenshot({ fullPage: true })
   ```

4. **Ask questions** if anything is unclear - the human will guide you!

---

## 🎨 Design System Integration

This section uses the Diamension design system:

**Typography:**
- Primary Font: Neue Haas Grotesk Display Pro
- Secondary Font: Neue Montreal
- Installed in: `assets/fonts/`

**Color Palette:**
- Primary Dark: `#183754` - Title, text
- Secondary Blue: `#3e6282` - Prices
- Light Beige: `#f0efea` - Image backgrounds

**Spacing System:**
- Section padding: `50px` horizontal, `100px` vertical
- Gap between products: `10px`
- Gap between title and products: `24px`
- Gap between image and info: `10px`
- Gap between product name and price: `4px`

---

## 📦 Asset Inventory

All assets are pre-uploaded and ready to use:

### Icons (`assets/custom-product-detail/icons/`):
- `heart-icon-diamension.svg` - Wishlist button (24×24px)
- `chevron-right-icon.svg` - Navigation arrow (will be extracted from Figma)

**Note:** Chevron icon from Figma is 56×56px. You may need to extract this asset or use an existing arrow icon from the project.

---

## 🔌 Data Source

### Products Selection
Products can be sourced from:
1. **Shopify Product Recommendations API** (recommended)
   - Based on current product
   - Machine learning powered
   - Automatically updates
2. **Manual collection selection** (fallback)
   - Merchant selects a collection via section settings
   - Products pulled from that collection
3. **Tagged products** (alternative)
   - Products with matching tags

### Product Data Required
For each product card:
- Product title
- Product featured image
- Product price (or price range)
- Product URL
- Product ID (for wishlist)

---

## 🧩 Key Features

### 1. Horizontal Carousel
- **Visible Products:** 5 on desktop, 4 on tablet, 2 on mobile
- **Total Products:** Up to 10 products
- **Scrolling:** Smooth horizontal scroll
- **Navigation:** Arrow buttons on left and right sides

### 2. Navigation Arrows
- **Position:** Left and right edges of carousel
- **Visibility:**
  - Left arrow: Hidden when at start position
  - Right arrow: Hidden when at end position
- **Hover Effect:**
  - Gradient overlay appears on hover
  - Gradient: `linear-gradient(-89.7744deg, rgba(0, 0, 0, 0.8) 17.65%, rgba(102, 102, 102, 0) 30.891%)`
- **Icon Size:** 56×56px chevron icon

### 3. Product Cards
Each card displays:
- **Image Container:** 360px height, centered product image
- **Product Image:** 250×250px, object-fit: contain
- **Wishlist Button:** Top-right corner (24px SVG icon)
- **Product Name:** 20px, truncated if too long
- **Product Price:** 16px, with "From" prefix if price range exists

### 4. Wishlist Functionality
- **Icon:** Heart SVG (24×24px)
- **Position:** Top-right of image container (24px from top, 24px from right)
- **Animation:** GSAP scale animation (inspired by `wishlist-button-implementation/`)
- **Storage:** localStorage persistence
- **States:**
  - Default: Transparent background, outlined heart
  - Active/Liked: Cream background (#FFFCF9), filled or outlined heart

**IMPORTANT:** The wishlist implementation document mentions 18px sizing - IGNORE THIS. Use 24×24px as shown in Figma (Node 206-461).

### 5. Price Display Logic
- **Simple Price:** `Rs. XX,XXX` (no "From" prefix)
- **Price Range:** `From Rs. XX,XXX` (show lowest price)
- **Detection:** Check if product has variants with different prices
- **Formatting:** Use Shopify's `money` filter

### 6. "NEW ARRIVAL" Badge
**Status:** DEFERRED - Not implementing in initial version
**Future Implementation:** Badge system for product labels (e.g., "NEW ARRIVAL", "SALE", etc.)

---

## 🎯 Section Schema Settings

Merchants can customize via Shopify theme editor:

### Section Settings:
1. **Section Heading** (text)
   - Default: "Similar Products"
   - Label: "Section Heading"

2. **Product Source** (select)
   - Options:
     - "Automatic Recommendations" (default)
     - "From Collection"
   - Label: "Product Source"

3. **Collection** (collection picker)
   - Only shown if "From Collection" is selected
   - Label: "Select Collection"

4. **Number of Products** (range)
   - Min: 2
   - Max: 10
   - Default: 10
   - Step: 1
   - Label: "Number of Products to Show"

5. **Enable Wishlist** (checkbox)
   - Default: true
   - Label: "Show Wishlist Button"

---

## 🔄 Dynamic Behavior

### JavaScript Functionality:

1. **Carousel Navigation**
   - Click left arrow: Scroll one product to the left
   - Click right arrow: Scroll one product to the right
   - Smooth scroll animation
   - Update arrow visibility based on scroll position

2. **Arrow Visibility**
   - Check scroll position on load
   - Update on scroll event
   - Hide left arrow if scrollLeft === 0
   - Hide right arrow if scrolled to end

3. **Wishlist Toggle**
   - Click heart icon: Toggle wishlist state
   - Store product ID in localStorage
   - Animate button with GSAP scale effect
   - Update visual state (background color change)
   - Persist across page loads

4. **Gradient Hover Effect**
   - Show gradient overlay on product card hover (over last visible card)
   - Gradient animates in smoothly
   - Optional: Could apply to all cards on hover

---

## 📱 Responsive Behavior

### Desktop (≥1024px):
- Show 5 products at once
- Equal width cards with 10px gap
- Full section padding (50px horizontal, 100px vertical)
- Arrow buttons on edges

### Tablet (768px - 1023px):
- Show 4 products at once
- Equal width cards with 10px gap
- Reduced section padding (30px horizontal, 60px vertical)
- Arrow buttons on edges

### Mobile (<768px):
- Show 2 products at once
- Equal width cards with 8px gap
- Minimal section padding (20px horizontal, 50px vertical)
- Arrow buttons on edges (smaller size: 40×40px)

---

## ⚠️ Important Development Notes

### DO:
✅ Follow BEM naming convention for all CSS classes
✅ Use Liquid best practices (check for nil, use filters properly)
✅ Test with varying numbers of products (2, 5, 10)
✅ Ensure accessibility (ARIA labels, keyboard navigation)
✅ Use existing design tokens from `02-design-tokens.md`
✅ Implement smooth scroll behavior
✅ Handle edge cases (no products, 1 product, etc.)
✅ Use GSAP for wishlist animation (same as product detail page)
✅ Adjust wishlist icon to 24px (not 18px from reference doc)
✅ Implement "From" price logic correctly

### DON'T:
❌ Don't implement "NEW ARRIVAL" badge (deferred)
❌ Don't use inline styles (use CSS classes)
❌ Don't hardcode product IDs
❌ Don't skip responsive testing
❌ Don't forget to handle empty states
❌ Don't use different animation libraries (stick with GSAP)
❌ Don't modify core theme files

---

## 🤝 Getting Help

**If you don't understand anything, ASK THE HUMAN!**

Common questions to ask:
- "Should the product recommendations use Shopify's API or manual collection?"
- "What should happen if there are fewer than 5 products?"
- "Should the gradient effect be on hover for all cards or just the last one?"
- "How should the carousel scroll - one product at a time or full viewport?"

**The human is here to guide you - don't hesitate to ask for clarification!**

---

## 📊 Success Criteria

This implementation is complete when:

1. ✅ Visual design matches Figma 100% (pixel-perfect)
2. ✅ Carousel displays correct number of products per viewport
3. ✅ Navigation arrows show/hide correctly based on scroll position
4. ✅ Smooth scrolling animation works
5. ✅ Wishlist functionality works with persistence
6. ✅ "From" price logic displays correctly
7. ✅ Responsive design works on all screen sizes (5 → 4 → 2 products)
8. ✅ Products link to correct product pages
9. ✅ Empty states handled gracefully
10. ✅ Code passes validation (HTML, CSS, JavaScript)
11. ✅ No console errors or Liquid syntax errors
12. ✅ Accessibility requirements met (WCAG AA)
13. ✅ GSAP animation matches product detail wishlist behavior

---

## 📚 Next Steps

1. **Read this document completely** ✓
2. **Read all files in `docs/rules/`** (especially 04-LIQUID, 05-CSS, 06-JAVASCRIPT)
3. **Read `02-design-tokens.md`** for all design specifications
4. **Fetch all Figma nodes** using MCP tools
5. **Read `03-implementation-guide.md`** for step-by-step instructions
6. **Read `wishlist-button-implementation/implementation-overview.md`** (remember: use 24px, not 18px)
7. **Ask questions** if anything is unclear
8. **Start development** following the implementation guide

---

**Version:** 1.0
**Last Updated:** 2025-01-18
**Prepared By:** Wings Design Team
