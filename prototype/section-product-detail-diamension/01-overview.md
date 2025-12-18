# Product Detail Section - Overview

## 📌 Purpose
This document provides a complete overview of the custom product detail section for Diamension jewelry products. This section replaces the default Shopify product page with a highly customized, brand-specific experience optimized for luxury jewelry e-commerce.

---

## 🎯 Section Scope

**File Location:** `sections/custom-product-detail.liquid`

**Primary Function:**
- Display product information for jewelry items (rings, bracelets, necklaces, etc.)
- Support complex variant selection (purity, metal type, size)
- Show detailed price breakdowns with metal charges, diamond costs, making charges, and GST
- Display product specifications with metafield-driven content
- Provide wishlist functionality with persistent storage
- Enable responsive image gallery with zoom capabilities
- Show trust badges and call-to-action buttons

---

## 🏗️ Architecture Overview

### Three-Column Layout (Desktop)

```
┌─────────────┬──────────────────────┬────────────────────────┐
│             │                      │                        │
│  Thumbnail  │    Main Product     │   Product Information  │
│   Gallery   │       Image         │                        │
│  (Sticky)   │     (Sticky)        │   - Header             │
│             │                      │   - Variants           │
│   [↑]       │   [500×800px]       │   - Description        │
│   [ ]       │                      │   - Accordions         │
│   [ ]       │   [Wishlist ♡]      │   - Specifications     │
│   [ ]       │                      │                        │
│   [↓]       │                      │                        │
│             │                      │                        │
└─────────────┴──────────────────────┴────────────────────────┘

                  ┌─────────────────────────────────────────┐
                  │      Sticky Footer (Desktop)            │
                  │  [Trust Badges]  [Add to Bag] [Buy Now] │
                  └─────────────────────────────────────────┘
```

### Column Breakdown:

**Column 1: Thumbnail Gallery**
- Width: Auto (40px thumbnails)
- Sticky positioning (scrolls with content, ends when column 3 ends)
- Up/down arrow navigation
- Active thumbnail highlighting

**Column 2: Main Product Image**
- Width: 500px fixed
- Sticky positioning (scrolls with content, ends when column 3 ends)
- Wishlist button overlay (top-right)
- Click to zoom/modal view
- Image changes based on variant/thumbnail selection

**Column 3: Product Information**
- Flexible width (fills remaining space)
- Contains all product data
- Scrolls naturally
- Controls sticky behavior of columns 1 & 2

---

## 🔗 Key Figma Design References

**IMPORTANT:** Before starting development, you MUST review these Figma nodes to understand the complete design:

### Main Layout Nodes:
- **Full Product Detail Page:** [Node 206-241](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=206-241&m=dev)
- **Sticky CTA Banner:** [Node 206-791](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=206-791&m=dev)

### Component Nodes:
- **Wishlist Button:** [Node 206-256](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=206-256&m=dev)
- **Product Description Text:** [Node 206-270](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=206-270&m=dev)
- **Product Details Accordion:** [Node 206-314](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=206-314&m=dev)
- **Product Details Card (Total Weight):** [Node 206-320](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=206-320&m=dev)
- **Price Breakup Table:** [Node 206-363](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=206-363&m=dev)

**How to Access Figma Nodes:**
Use the MCP Figma tools to fetch design context and screenshots:
```javascript
// Example MCP tool usage:
mcp__figma-desktop-mcp__get_design_context({ nodeId: "206-241" })
mcp__figma-desktop-mcp__get_screenshot({ nodeId: "206-241" })
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
Located in: `prototype/section-product-detail-diamension/`

1. `01-overview.md` - This document (overview)
2. `02-design-tokens.md` - Design specifications and tokens
3. `03-implementation-guide.md` - Step-by-step implementation
4. `wishlist-button-implementation/implementation-overview.md` - Wishlist logic

---

## 🧪 Pre-Development Testing

**MANDATORY:** Before writing any code, use MCP tools to:

1. **Fetch all Figma nodes** listed above to understand visual design
2. **Read all design tokens** in `02-design-tokens.md`
3. **Analyze existing implementation:**
   ```javascript
   // Read current section file
   Read({ file_path: "sections/custom-product-detail.liquid" })

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
- Installed in: `assets/fonts/neue-haas-display/`
- Weights: 45 Light, 55 Roman, 65 Medium

**Color Palette:**
- Primary Dark: `#183754` - Text, buttons, borders
- Secondary Blue: `#3e6282` - Descriptions, labels
- Cream White: `#fffaf5` - Light text, backgrounds
- Light Beige: `#f0efea` - Image backgrounds
- Light Gray: `#f1f1f1` - Input backgrounds
- Border Gray: `#cbcbcb` - Dividers, table borders

**Spacing System:**
- Gap between sections: `48px`
- Gap between columns: `34px`
- Internal component gaps: `24px`, `16px`, `12px`, `8px`

---

## 📦 Asset Inventory

All assets are pre-uploaded and ready to use:

### Icons (`assets/custom-product-detail/icons/`):
- `heart-icon-diamension.svg` - Wishlist button
- `magic-star-icon.svg` - Total weight icon
- `magic-pen-icon.svg` - Metal type icon
- `magic-hammer-icon.svg` - Diamond details icon
- `trust-badge-certified-brillance.svg` - Trust badge
- `trust-badge-free-shipping-truck.svg` - Trust badge
- `trust-badge-free-return-circle-arrow.svg` - Trust badge
- `trust-badge-timeless-assurance-smart-bag.svg` - Trust badge

### Images (`assets/custom-product-detail/image/`):
- `image-yellow-gold.png` - Metal type swatch
- `image-rose-gold.png` - Metal type swatch
- `image-white-gold.png` - Metal type swatch

---

## 🔌 Metafield Dependencies

This section relies heavily on Shopify metafields:

### Product Metafields (6 total):
1. `custom.short_description` - Header description text
2. `custom.certifications_of_authenticity` - Certification text
3. `custom.craft_and_care_instructions` - Rich text care guide
4. `custom.metal_type` - Metal type (Yellow Gold/Rose Gold/White Gold)
5. `custom.sku` - Product SKU
6. `custom.style` - Product style (Bracelet/Ring/Necklace)
7. `custom.diamond_details` - Rich text diamond information

### Variant Metafields (8 total):
1. `custom.gross_weight` - Total product weight
2. `custom.metal_weight` - Metal weight only
3. `custom.diamond_in_ct` - Diamond carat weight
4. `custom.metal_charges` - Metal cost
5. `custom.diamond_charges` - Diamond cost
6. `custom.making_charges` - Making/labor cost
7. `custom.gst_rate` - GST percentage (e.g., "3")
8. `custom.gst_charges` - GST amount

**Note:** Merchants will populate these via third-party SaaS integration.

---

## 🧩 Key Features

### 1. Variant Selection System
- **Purity:** 9KT, 14KT, 18KT (pill buttons)
- **Metal Type:** Visual swatches using hardcoded images (not Shopify color swatches)
- **Size:** Dropdown with size guide link
- **Quantity:** Stepper control (-, 1, +)

### 2. Price Breakdown
- Transparent pricing table showing:
  - Metal charges (by purity + type)
  - Diamond charges (by carat)
  - Making charges
  - GST (with rate percentage)
  - Total price
- All values dynamically pulled from variant metafields

### 3. Product Information Accordions
Six accordion sections:
1. **Product Details** - Three-column card layout with icons
2. **Price Breakup** - Table with cost breakdown
3. **Item Details and Specifications** - SKU, style, metal type
4. **Diamond Details** - Rich text content
5. **Certification of Authenticity** - Certification text
6. **Book your Appointment** - CTA with merchant-provided link
7. **Craft and Care Instructions** - Rich text care guide

### 4. Wishlist Functionality
- Persistent storage using localStorage
- Smooth GSAP animations (scale effect)
- Heart icon with visual state changes
- Reference: `wishlist-button-implementation/implementation-overview.md`

### 5. Image Gallery
- Vertical thumbnail strip with navigation arrows
- Sticky main image (desktop)
- Click to zoom/modal view
- `object-fit: contain` for main image
- Variant-based image switching

### 6. Sticky Footer (Desktop)
- Four trust badges with icons
- Two CTA buttons (Add to Bag, Buy Now)
- Legal disclaimer text
- Stays at bottom on desktop, fixed on mobile

---

## 🎯 Section Schema Settings

Merchants can customize via Shopify theme editor:

### Section Settings:
1. `enable_sticky_footer` (checkbox) - Toggle sticky footer
2. `footer_legal_text` (textarea) - Legal disclaimer text
3. `appointment_booking_link` (url) - Link for "Book Now" button

### Block Types:
1. **Feature Card** - Product feature highlights (3 instances)
   - Icon upload
   - Title text
   - Description text
   - Optional link + link text

2. **Trust Badge** - Trust indicators (4 instances)
   - Icon upload
   - Badge text

3. **Accordion** - Custom accordion items (unlimited)
   - Title text
   - Rich text content

---

## 🔄 Dynamic Behavior

### JavaScript Functionality:
1. **Variant Selection**
   - Update price on variant change
   - Update main image on variant change
   - Update price breakdown table
   - Update product details (weight, metal, diamonds)
   - Enable/disable buy buttons based on availability

2. **Image Gallery**
   - Thumbnail click changes main image
   - Arrow navigation scrolls thumbnails
   - Modal zoom on main image click
   - Active thumbnail highlighting

3. **Wishlist**
   - Toggle on/off with localStorage persistence
   - Animated state changes
   - Cross-session memory

4. **Accordions**
   - Toggle open/close
   - Rotate arrow icon
   - Smooth height transitions
   - First accordion (Price Breakup) open by default

5. **Quantity Stepper**
   - Increment/decrement quantity
   - Minimum value: 1
   - Update hidden form input

---

## 📱 Responsive Behavior

### Desktop (≥1024px):
- Three-column layout
- Sticky thumbnails and main image
- Sticky footer at bottom
- Side-by-side variant options

### Tablet (768px - 1023px):
- Two-column layout (image left, info right)
- Thumbnails below main image (horizontal scroll)
- Sticky footer

### Mobile (<768px):
- Single column stacked layout
- Thumbnails horizontal scroll
- Fixed footer at bottom
- Full-width buttons

---

## ⚠️ Important Development Notes

### DO:
✅ Follow BEM naming convention for all CSS classes
✅ Use Liquid best practices (check for nil, use filters properly)
✅ Test with multiple products (different variant counts)
✅ Ensure accessibility (ARIA labels, keyboard navigation)
✅ Use existing design tokens from `02-design-tokens.md`
✅ Hardcode icons and metal type images (don't rely on merchant uploads)
✅ Test variant switching thoroughly
✅ Validate all metafield access with fallbacks

### DON'T:
❌ Don't use Judge.me integration (removed)
❌ Don't use Shopify color swatches for metal type
❌ Don't add your own design decisions without checking Figma
❌ Don't skip reading the rules documentation
❌ Don't start coding without understanding the full scope
❌ Don't use inline styles (use CSS classes)
❌ Don't hardcode text that should come from settings/blocks

---

## 🤝 Getting Help

**If you don't understand anything, ASK THE HUMAN!**

Common questions to ask:
- "Which Figma node shows the [specific component]?"
- "Should [this data] come from a metafield or be hardcoded?"
- "What should happen if [this metafield] is empty?"
- "How should [this component] behave on mobile?"

**The human is here to guide you - don't hesitate to ask for clarification!**

---

## 📊 Success Criteria

This implementation is complete when:

1. ✅ Visual design matches Figma 100% (pixel-perfect)
2. ✅ All metafields display correctly with proper fallbacks
3. ✅ Variant selection updates all related UI elements
4. ✅ Price breakdown calculates accurately
5. ✅ Wishlist persists across sessions
6. ✅ Image gallery navigation works smoothly
7. ✅ All accordions expand/collapse properly
8. ✅ Sticky behavior works on desktop
9. ✅ Responsive design works on all screen sizes
10. ✅ Code passes validation (HTML, CSS, JavaScript)
11. ✅ No console errors or Liquid syntax errors
12. ✅ Accessibility requirements met (WCAG AA)

---

## 📚 Next Steps

1. **Read this document completely** ✓
2. **Read all files in `docs/rules/`** (especially 04-LIQUID, 05-CSS, 06-JAVASCRIPT)
3. **Read `02-design-tokens.md`** for all design specifications
4. **Fetch all Figma nodes** using MCP tools
5. **Read `03-implementation-guide.md`** for step-by-step instructions
6. **Read `wishlist-button-implementation/implementation-overview.md`**
7. **Test current implementation** using Playwright MCP tools
8. **Ask questions** if anything is unclear
9. **Start development** following the implementation guide

---

**Version:** 1.0
**Last Updated:** 2025-01-XX
**Prepared By:** Wings Design Team
