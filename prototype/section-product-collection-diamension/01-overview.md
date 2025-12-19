# Product Collection Section - Overview

## 📌 Purpose
This document provides a complete overview of the custom product collection page for Diamension jewelry collections. This section replaces the default Shopify collection template with a highly customized, brand-specific experience optimized for luxury jewelry e-commerce with sophisticated product loading and promotional image cards.

---

## 🎯 Section Scope

**File Location:** `sections/section-product-collection-diamension.liquid`

**Primary Function:**
- Display collection products in a sophisticated grid layout with 4 columns (desktop)
- Support progressive loading with AJAX-based "Load More" functionality
- Display promotional image/video cards interspersed within product grid
- Show collection hero image with caption overlay
- Provide breadcrumb navigation with dynamic menu integration
- Enable filter and sort functionality (UI ready for future implementation)
- Support responsive layouts (4/4/3/2 columns across breakpoints)
- Conditional rendering based on collection metafields

---

## 🏗️ Architecture Overview

### Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                     Full-Width Wrapper                          │
│                   Background: #F0EFEA                           │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │              Full-Width Hero Image                        │ │
│  │           (From collection metafield)                     │ │
│  │         Optional Caption Overlay                          │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │         1440px Max-Width Container (Centered)             │ │
│  │                                                           │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │ Breadcrumb Navigation                               │ │ │
│  │  │ Shop > Categories > Collection Name                 │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                        24px Gap                           │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │ Collection Title + Description    [Filter] [Sort]   │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                        24px Gap                           │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │ Product Grid (4 columns desktop)                    │ │ │
│  │  │ ┌───┐ ┌───┐ ┌───┐ ┌───┐                            │ │ │
│  │  │ │ 1 │ │ 2 │ │ 3 │ │ 4 │  Row 1 (Products 1-4)      │ │ │
│  │  │ └───┘ └───┘ └───┘ └───┘                            │ │ │
│  │  │                        24px Gap                       │ │ │
│  │  │ ┌───┐ ┌───┐ ┌───┐ ┌───┐                            │ │ │
│  │  │ │ 5 │ │ 6 │ │ 7 │ │ 8 │  Row 2 (Products 5-8)      │ │ │
│  │  │ └───┘ └───┘ └───┘ └───┘                            │ │ │
│  │  │                        24px Gap                       │ │ │
│  │  │ ┌───┐ ┌───┐ ┌─────────────┐                        │ │ │
│  │  │ │ 9 │ │10 │ │   IMAGE     │  Row 3 (2 + Image)     │ │ │
│  │  │ └───┘ └───┘ │    CARD     │                        │ │ │
│  │  │             └─────────────┘                        │ │ │
│  │  │                        24px Gap                       │ │ │
│  │  │ ┌───┐ ┌───┐ ┌───┐ ┌───┐                            │ │ │
│  │  │ │11 │ │12 │ │13 │ │14 │  Row 4-5 (Products 11-18)  │ │ │
│  │  │ └───┘ └───┘ └───┘ └───┘                            │ │ │
│  │  │ ┌───┐ ┌───┐ ┌───┐ ┌───┐                            │ │ │
│  │  │ │15 │ │16 │ │17 │ │18 │                            │ │ │
│  │  │ └───┘ └───┘ └───┘ └───┘                            │ │ │
│  │  │                        24px Gap                       │ │ │
│  │  │ ┌─────────────┐ ┌───┐ ┌───┐                        │ │ │
│  │  │ │   IMAGE     │ │19 │ │20 │  Row 6 (Image + 2)     │ │ │
│  │  │ │    CARD     │ └───┘ └───┘                        │ │ │
│  │  │ └─────────────┘                                    │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                        24px Gap                           │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │         Load More Section                           │ │ │
│  │  │   "Showing 20 of 120 products"                      │ │ │
│  │  │   ───────────────────                               │ │ │
│  │  │      [LOAD MORE]                                    │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Product Grid Pattern (Per 20 Products)
```
Products 1-4   (Row 1)    - 4 product cards
Products 5-8   (Row 2)    - 4 product cards
Products 9-10  (Row 3)    - 2 product cards + Image Card (end)
Products 11-18 (Row 4-5)  - 8 product cards
Products 19-20 (Row 6)    - Image Card (start) + 2 product cards
```

**Total: 20 products + 2 image cards per batch**

---

## 🔗 Key Figma Design References

**IMPORTANT:** Before starting development, you MUST review these Figma nodes to understand the complete design:

### Main Layout Nodes:
- **Breadcrumb + Title Section:** [Node 12-6437](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-6437&m=dev)
- **Product Cards Row (4 cards):** [Node 12-6470](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-6470&m=dev)
- **Image Card at End (2 products + image):** [Node 12-6568](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-6568&m=dev)
- **Image Card at Start (image + 2 products):** [Node 12-6700](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-6700&m=dev)
- **Load More Section:** [Node 12-6734](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-6734&m=dev)

### Component Nodes:
- **Single Product Card:** [Node 12-6487](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-6487&m=dev)
- **Wishlist Button (Active State):** [Node 12-6589](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-6589&m=dev)
- **Image Card with Tag Overlay:** [Node 12-6703](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-6703&m=dev)

**How to Access Figma Nodes:**
Use the MCP Figma tools to fetch design context and screenshots:
```javascript
// Example MCP tool usage:
mcp__figma-desktop-mcp__get_design_context({ nodeId: "12-6437" })
mcp__figma-desktop-mcp__get_screenshot({ nodeId: "12-6437" })
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
Located in: `prototype/section-product-collection-diamension/`

1. `01-overview.md` - This document (overview)
2. `02-design-tokens.md` - Design specifications and tokens
3. `03-implementation.md` - Step-by-step implementation

---

## 🎨 Design System Integration

This section uses the Diamension design system:

**Typography:**
- Primary Font: Neue Haas Grotesk Display Pro
- Secondary Font: Neue Montreal
- Installed in: `assets/fonts/`
- Weights: 45 Light, 55 Roman, 65 Medium

**Color Palette:**
- Primary Dark: `#183754` - Text, buttons, borders
- Secondary Blue: `#3e6282` - Descriptions, labels, prices
- Cream White: `#fffaf5` - Light text, backgrounds
- Light Beige: `#f0efea` - Page background, image backgrounds
- Light Gray: `#f1f1f1` - Input backgrounds
- Border Gray: `#cbcbcb` - Dividers, table borders
- Overlay Beige: `#e7e6d4` - Image card text/buttons

**Spacing System:**
- Gap between sections: `24px`
- Gap between products: `10px`
- Internal component gaps: `16px`, `12px`, `8px`, `4px`
- Container max-width: `1440px`
- Container padding: `50px` (desktop)

---

## 🔌 Collection Metafield Dependencies

This section relies on Shopify collection metafields:

### Collection Metafields (4 total):

1. **`custom.collection_hero_image`**
   - Type: File
   - Purpose: Full-width hero banner image at top of collection page
   - Optional: If not provided, hero section is hidden

2. **`custom.collection_caption`**
   - Type: Single line text
   - Purpose: Caption text overlay on hero image
   - Optional: If not provided, no caption shown on hero

3. **`custom.collection_first_image`**
   - Type: Metaobject reference (collection_image_card)
   - Purpose: First promotional image card (appears after products 9-10)
   - Optional: If not provided, no image card shown

4. **`custom.collection_second_image`**
   - Type: Metaobject reference (collection_image_card)
   - Purpose: Second promotional image card (appears before products 19-20)
   - Optional: If not provided, no image card shown

### Metaobject Definition: `collection_image_card`

**Fields:**
1. **Image** (File) - Image or video file for the card
2. **Caption** (Multi-line text) - Promotional text overlay
3. **Button Text** (Single line text) - CTA button text (e.g., "SHOP NOW")
4. **Button Link** (URL) - Link destination for CTA button

**Conditional Logic:**
- Image cards only display if collection has 10+ products
- If caption/button fields are empty, they are not rendered
- Image pattern repeats in subsequent 20-product batches

---

## 🧩 Key Features

### 1. Dynamic Breadcrumb Navigation
- Menu selection via section settings
- Dynamic breadcrumb links based on selected menu
- Format: `Shop > Categories > Collection Name`
- Responsive: Visible on all screen sizes

### 2. Collection Header
- Collection title (from Shopify collection object)
- Collection description (from Shopify collection object)
- Filter button (UI only - functionality in future phase)
- Sort button (UI only - functionality in future phase)

### 3. Product Grid System
- **Desktop (≥1024px):** 4 products per row
- **Tablet (768px-1023px):** 4 products per row
- **Big Mobile (480px-767px):** 3 products per row
- **Small/XS Mobile (<480px):** 2 products per row
- 10px gap between product cards
- 24px gap between rows

### 4. Product Card Component
- Image wrapper: 348px × 502px (desktop)
- Background: `#f0efea`
- Wishlist heart icon (top-right)
  - Toggleable state (outlined/filled)
  - Persistent via localStorage
- Product title (18px, Neue Montreal Regular)
- Product price with "From Rs." prefix (16px, Neue Montreal Regular)
- Optional "NEW ARRIVAL" badge
- Maintains aspect ratio across responsive breakpoints

### 5. Promotional Image Cards
- Takes space of 2 product cards (width: 704px desktop)
- Video or image background support
- Gradient overlay at bottom
- Optional text caption overlay
- Optional CTA button with link
- Conditional rendering (only if metaobject data exists)
- Alternating positions:
  - First image: End of row (after 2 products)
  - Second image: Start of row (before 2 products)

### 6. Progressive Loading
- Initial load: 20 products
- "Load More" button shows remaining count
- AJAX-based loading (no page refresh)
- Loads next 20 products on click
- Progress indicator: "Showing X of Y products"
- Image card pattern repeats in each batch of 20

### 7. Hero Image Section
- Full-width background image
- Optional caption overlay
- Responsive scaling
- Conditional rendering (only if metafield populated)

---

## 🎯 Section Schema Settings

Merchants can customize via Shopify theme editor:

### Section Settings:

1. **`breadcrumb_menu`** (link_list)
   - Menu selection for breadcrumb navigation
   - Dynamic: Links update based on selected menu

2. **`products_per_page`** (range)
   - Number of products to load per batch
   - Default: 20
   - Range: 12-40
   - Step: 4

3. **`show_filter_button`** (checkbox)
   - Toggle filter button visibility
   - Default: true

4. **`show_sort_button`** (checkbox)
   - Toggle sort button visibility
   - Default: true

5. **`enable_ajax_loading`** (checkbox)
   - Toggle AJAX vs. traditional pagination
   - Default: true

---

## 🔄 Dynamic Behavior

### JavaScript Functionality:

1. **AJAX Product Loading**
   - Fetch next batch of products without page reload
   - Update product grid with new items
   - Update progress indicator
   - Smooth scroll to new products
   - Handle loading states (button disabled during fetch)

2. **Wishlist Toggle**
   - Add/remove products from wishlist
   - Persistent storage using localStorage
   - Visual state changes (outlined ↔ filled)
   - Cross-session memory

3. **Image Card Rendering**
   - Conditional display based on product count
   - Position calculation (after 10 products, after 18 products)
   - Repeat pattern in subsequent batches

4. **Responsive Grid Recalculation**
   - Adjust product columns based on viewport
   - Recalculate image card positions for mobile layouts
   - Maintain aspect ratios

---

## 📱 Responsive Behavior

### Desktop (≥1024px):
- 4 products per row
- Image cards take 2 product card spaces (704px)
- Image pattern: 4-4-2+img-8-img+2
- Container max-width: 1440px centered

### Tablet (768px - 1023px):
- 4 products per row (adjust spacing if cards look off)
- Image cards take 2 product card spaces
- Same pattern as desktop
- Reduced container padding

### Big Mobile (480px - 767px):
- 3 products per row
- Image cards take 2 product card spaces
- Image pattern: 3-3-3-3-img (after 12 products)
- Full-width container with padding

### Small/XS Mobile (<480px):
- 2 products per row
- Image cards take 2 product card spaces
- Image pattern: 2-2-2-2-2-img (after 10 products)
- Minimal container padding

---

## ⚠️ Important Development Notes

### DO:
✅ Follow BEM naming convention for all CSS classes
✅ Use Liquid best practices (check for nil, use filters properly)
✅ Test with collections of varying product counts (5, 10, 20, 50, 100+)
✅ Ensure image cards only show when collection has 10+ products
✅ Validate all metafield access with fallbacks
✅ Use CSS Grid for product layout (not flexbox)
✅ Implement proper loading states for AJAX
✅ Test responsive layouts on all breakpoints
✅ Use existing design tokens from `02-design-tokens.md`
✅ Ensure wishlist persists across page loads

### DON'T:
❌ Don't implement filter/sort functionality yet (UI only)
❌ Don't hardcode product data (use Shopify collection object)
❌ Don't use inline styles (use CSS classes)
❌ Don't skip metafield nil checks
❌ Don't create image cards for collections with <10 products
❌ Don't add your own design decisions without checking Figma
❌ Don't skip reading the rules documentation
❌ Don't use flexbox for grid (use CSS Grid)
❌ Don't forget to handle empty states

---

## 🤝 Getting Help

**If you don't understand anything, ASK THE HUMAN!**

Common questions to ask:
- "Which Figma node shows the [specific component]?"
- "Should [this data] come from a metafield or collection object?"
- "What should happen if the collection has only 5 products?"
- "How should image cards behave on mobile when there are 15 products?"
- "Should the hero image be optional or required?"

**The human is here to guide you - don't hesitate to ask for clarification!**

---

## 📊 Success Criteria

This implementation is complete when:

1. ✅ Visual design matches Figma 100% (pixel-perfect)
2. ✅ Product grid displays correctly on all breakpoints (4/4/3/2 columns)
3. ✅ Image cards show only when collection has 10+ products
4. ✅ Image cards position correctly (alternating end/start)
5. ✅ AJAX loading works smoothly without page refresh
6. ✅ Progress indicator updates correctly
7. ✅ Wishlist functionality persists across sessions
8. ✅ Breadcrumb navigation reflects selected menu
9. ✅ Hero image displays when metafield populated
10. ✅ All metafields have proper fallbacks
11. ✅ Responsive layouts work perfectly on all screen sizes
12. ✅ Image card pattern repeats correctly in batches
13. ✅ No console errors or Liquid syntax errors
14. ✅ Code passes validation (HTML, CSS, JavaScript)
15. ✅ Accessibility requirements met (WCAG AA)
16. ✅ Product cards maintain aspect ratio across breakpoints

---

## 📚 Next Steps

1. **Read this document completely** ✓
2. **Read all files in `docs/rules/`** (especially 04-LIQUID, 05-CSS, 06-JAVASCRIPT)
3. **Read `02-design-tokens.md`** for all design specifications
4. **Fetch all Figma nodes** using MCP tools
5. **Read `03-implementation.md`** for step-by-step instructions
6. **Ask questions** if anything is unclear
7. **Start development** following the implementation guide

---

**Version:** 1.0
**Last Updated:** 2025-01-19
**Prepared By:** Wings Design Team
