# Two-Column Hero Section - Overview

## 📌 Purpose
This document provides a complete overview of the custom two-column hero section for "The Studio" collection at Diamension. This section features a split-screen design with lifestyle imagery, text overlays, and CTA buttons, optimized for luxury jewelry brand storytelling.

---

## 🎯 Section Scope

**File Location:** `sections/section-two-column-hero-diamension.liquid`

**Primary Function:**
- Display two full-height background images side-by-side (split-screen layout)
- Support merchant-customizable blocks (2 blocks maximum)
- Each block contains: image, heading, description text, and CTA button
- Text overlay positioned centrally on images
- Fixed 800px height across all screen sizes
- Responsive stacking on mobile (one image below the other, 400px each)
- Typography matches Figma design specifications (Neue Haas Grotesk Display Pro)

---

## 🏗️ Architecture Overview

### Desktop/Tablet Layout (≥768px)
```
┌─────────────────────────────────────────────────────────────────┐
│                     Full-Width Wrapper                          │
│                   Background: #FFFAF5                           │
│                                                                 │
│  ┌─────────────────────────────┬─────────────────────────────┐ │
│  │                             │                             │ │
│  │      Left Image             │      Right Image            │ │
│  │      (Block 1)              │      (Block 2)              │ │
│  │      800px height           │      800px height           │ │
│  │                             │                             │ │
│  │  ┌─────────────────────┐   │                             │ │
│  │  │  METROPOLITAN       │   │                             │ │
│  │  │  VIBES              │   │                             │ │
│  │  │                     │   │                             │ │
│  │  │  Description text   │   │                             │ │
│  │  │                     │   │                             │ │
│  │  │    [EXPLORE]        │   │                             │ │
│  │  └─────────────────────┘   │                             │ │
│  │                             │                             │ │
│  └─────────────────────────────┴─────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Mobile Layout (<768px)
```
┌─────────────────────────────────────────────────────────────────┐
│                     Full-Width Wrapper                          │
│                   Background: #FFFAF5                           │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                           │ │
│  │      Block 1 Image (400px height)                        │ │
│  │                                                           │ │
│  │  ┌─────────────────────┐                                 │ │
│  │  │  METROPOLITAN       │                                 │ │
│  │  │  VIBES              │                                 │ │
│  │  │                     │                                 │ │
│  │  │  Description text   │                                 │ │
│  │  │    [EXPLORE]        │                                 │ │
│  │  └─────────────────────┘                                 │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                           │ │
│  │      Block 2 Image (400px height)                        │ │
│  │                                                           │ │
│  │  (Content overlay if provided)                           │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔗 Key Figma Design References

**IMPORTANT:** Before starting development, you MUST review these Figma nodes to understand the complete design:

### Main Layout Node:
- **Primary Node:** [Node 12-9097](https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-9097&m=dev)
  - Complete two-column layout
  - Shows left image (champagne glass with jewelry)
  - Shows right image (hands with rings)
  - Text overlay positioning
  - CTA button styling

### Component Nodes:
- **Left Image Block (Node 12-9098)** - Image with gradient and text overlay
- **Right Image Block (Node 12-9099)** - Image without overlay (in this example)
- **Heading Text (Node 12-9100)** - "METROPOLITAN VIBES" typography
- **CTA Button (Node 12-9101)** - "EXPLORE" button styling
- **Description Text (Node 12-9103)** - Body copy specifications

**How to Access Figma Nodes:**
Use the MCP Figma tools to fetch design context and screenshots:
```javascript
// Example MCP tool usage:
mcp__figma-desktop-mcp__get_design_context({ nodeId: "12-9097" })
mcp__figma-desktop-mcp__get_screenshot({ nodeId: "12-9097" })
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
7. `06-JAVASCRIPT-STANDARDS.md` - JavaScript patterns (if needed)
8. `08-NAMING-CONVENTIONS.md` - BEM naming conventions

### 2. Section-Specific Documentation
Located in: `prototype/the-studio/the-studio-main/section-two-column-one-side-image-diamension/`

1. `01-overview.md` - This document (overview)
2. `02-design-tokens.md` - Design specifications and tokens
3. `03-implementation.md` - Step-by-step implementation

---

## 🎨 Design System Integration

This section uses the Diamension design system:

**Typography:**
- Primary Font: Neue Haas Grotesk Display Pro
- Weights: 45 Light, 55 Roman
- Installed in: `assets/fonts/`
- Used for: Heading (60px Light), Body (16px Roman), Button (20px Roman)

**Color Palette:**
- Cream White: `#fffaf5` - Text color, page background, button background
- Primary Dark: `#183754` - Button text color
- Background Beige: `#fffaf5` - Wrapper background

**Spacing System:**
- Section height: `800px` (desktop/tablet)
- Section height mobile: `400px` per image
- Container: Full-width (no max-width constraint)
- Content overlay positioning: Centered on left image

---

## 🧩 Key Features

### 1. Block-Based System
- Maximum 2 blocks allowed
- Each block represents one image column
- Merchant can configure:
  - Background image (required)
  - Heading text (optional)
  - Description text (optional)
  - CTA button text (optional)
  - CTA button link (optional)
- If content fields are empty, no overlay is shown

### 2. Responsive Behavior
- **Desktop (≥1024px):** Two images side-by-side, 800px height, 50% width each
- **Tablet (768px-1023px):** Two images side-by-side, 800px height, 50% width each
- **Mobile (<768px):** Images stacked vertically, 400px height each

### 3. Image Handling
- Full-width images (no max-width)
- Fixed height: 800px (desktop/tablet), 400px (mobile per image)
- Object-fit: cover (maintains aspect ratio, fills container)
- Supports standard image formats (JPG, PNG, WebP)
- Lazy loading for performance

### 4. Content Overlay
- Positioned on left side of first block
- White text on dark image background
- Gradient overlay for text readability
- Components:
  - Heading: 60px, uppercase, Neue Haas Light
  - Description: 16px, Neue Haas Roman
  - Button: White background, dark text, uppercase

### 5. Text Overlay Positioning
- Centered vertically and horizontally on the image
- Fixed positioning based on Figma design
- No merchant control over position (ensures design consistency)

---

## 🎯 Section Schema Settings

Merchants can customize via Shopify theme editor:

### Block Settings (2 blocks max):

**Block Type:** `image_block`

1. **`image`** (image_picker)
   - Background image for the column
   - Required field
   - Recommended size: 1920px × 800px

2. **`heading`** (text)
   - Main heading text
   - Optional (if empty, no heading shown)
   - Default: ""

3. **`description`** (richtext)
   - Description text below heading
   - Optional (if empty, no description shown)
   - Default: ""

4. **`button_text`** (text)
   - CTA button text
   - Optional (if empty, no button shown)
   - Default: ""

5. **`button_link`** (url)
   - CTA button destination URL
   - Optional
   - Default: ""

---

## 📱 Responsive Behavior

### Desktop (≥1024px):
- Two columns: 50% width each
- Fixed height: 800px
- Images side-by-side
- Text overlay on left image
- Full-width container

### Tablet (768px - 1023px):
- Two columns: 50% width each
- Fixed height: 800px
- Images side-by-side
- Text overlay adjusted for smaller screens
- Font sizes slightly reduced

### Mobile (<768px):
- Single column: 100% width
- Images stacked vertically
- Fixed height: 400px per image
- Text overlay on first image
- Font sizes adjusted for mobile readability

---

## ⚠️ Important Development Notes

### DO:
✅ Follow BEM naming convention for all CSS classes
✅ Use Liquid best practices (check for nil, use filters properly)
✅ Ensure 800px fixed height on desktop/tablet
✅ Ensure 400px fixed height per image on mobile
✅ Validate all block settings with fallbacks
✅ Use object-fit: cover for images
✅ Match Figma typography exactly (Neue Haas Grotesk Display Pro)
✅ Test responsive layouts on all breakpoints
✅ Use existing design tokens from `02-design-tokens.md`
✅ Ensure images display full-width (no max-width)
✅ Limit blocks to exactly 2 maximum

### DON'T:
❌ Don't add max-width constraint to images
❌ Don't use inline styles (use CSS classes)
❌ Don't skip block settings nil checks
❌ Don't change fixed heights (800px desktop, 400px mobile)
❌ Don't add your own design decisions without checking Figma
❌ Don't skip reading the rules documentation
❌ Don't allow more than 2 blocks
❌ Don't add merchant controls for text positioning
❌ Don't forget to handle empty state (no content overlay if fields empty)

---

## 🤝 Getting Help

**If you don't understand anything, ASK THE HUMAN!**

Common questions to ask:
- "Which Figma node shows the [specific component]?"
- "Should [this data] come from block settings or section settings?"
- "What should happen if the merchant doesn't provide a heading?"
- "How should the gradient overlay work?"
- "Should both images have text overlays or just the first one?"

**The human is here to guide you - don't hesitate to ask for clarification!**

---

## 📊 Success Criteria

This implementation is complete when:

1. ✅ Visual design matches Figma 100% (pixel-perfect)
2. ✅ Two blocks system works correctly (max 2 blocks)
3. ✅ Images display at 800px height on desktop/tablet
4. ✅ Images display at 400px height each on mobile (stacked)
5. ✅ Images are full-width with no max-width constraint
6. ✅ Text overlay displays correctly on first block
7. ✅ Content overlay shows/hides based on field values
8. ✅ Typography matches Figma exactly (Neue Haas Grotesk Display Pro)
9. ✅ CTA button styling matches design
10. ✅ Responsive layouts work perfectly on all screen sizes
11. ✅ No console errors or Liquid syntax errors
12. ✅ Code passes validation (HTML, CSS)
13. ✅ Accessibility requirements met (WCAG AA)
14. ✅ Images maintain aspect ratio with object-fit: cover

---

## 📚 Next Steps

1. **Read this document completely** ✓
2. **Read all files in `docs/rules/`** (especially 04-LIQUID, 05-CSS)
3. **Read `02-design-tokens.md`** for all design specifications
4. **Fetch Figma node 12-9097** using MCP tools
5. **Read `03-implementation.md`** for step-by-step instructions
6. **Ask questions** if anything is unclear
7. **Start development** following the implementation guide

---

**Version:** 1.0
**Last Updated:** 2025-12-22
**Prepared By:** Wings Design Team
**Section:** The Studio - Metropolitan Vibes Hero
