# FAQ Section - Overview

**Section Name:** `custom-section-faq`
**Type:** Dynamic section with theme blocks
**Purpose:** Display frequently asked questions organized by tabs with accordion functionality

---

## Features

### Core Functionality
- ✅ **Multiple Tab Categories** - Add unlimited tabs (e.g., Orders, Shipping, Products)
- ✅ **Nested FAQ Items** - Each tab contains its own FAQ questions
- ✅ **Accordion Behavior** - Click questions to expand/collapse answers
- ✅ **Auto-scroll to Tab** - Clicking a tab scrolls to that section and opens first FAQ
- ✅ **Single FAQ Open** - Opening one FAQ automatically closes others
- ✅ **Horizontal Tab Scroll** - Tabs scroll horizontally with visual hints (no visible scrollbar)
- ✅ **Info Menu Sidebar** - Reusable navigation menu on the left

### User Experience
- **Tab Navigation:** Horizontal tabs with active state highlighting
- **Visual Hints:** Partial tab visibility on edges to indicate scrollable content
- **Smooth Scrolling:** Animated scroll to selected tab category
- **Accordion Control:** Only one FAQ expanded at a time for focused reading
- **Responsive Design:** Adapts layout for desktop, tablet, and mobile

---

## File Structure

```
prototype/section-faq/
├── 01-overview.md                    # This file
├── 02-design-tokens.md               # Design specifications from Figma
├── 03-implementation.md              # Technical implementation details
└── design/                           # Design reference folder
    └── (Read Figma node 429-387 if needed for visual reference)
```

**Theme Files (to be created):**
```
blocks/faq-tab.liquid                 # Theme block: Tab container
blocks/faq-item.liquid                # Theme block: FAQ question/answer
sections/custom-section-faq.liquid    # Main section file
assets/section-faq.css                # Styles
assets/section-faq.js                 # Tab navigation + accordion logic
```

---

## Block Structure

### 1. Section Blocks
**Defined in:** `sections/custom-section-faq.liquid`

- **`info_menu_item`** - Navigation menu items in sidebar
  - Settings: menu_text, menu_link, is_active

### 2. Theme Blocks (Nested)
**Defined in:** `/blocks/` folder

- **`faq-tab`** (Parent) - Tab category container
  - Settings: tab_label, tab_id
  - Can contain: `faq-item` blocks (nested children)

- **`faq-item`** (Child) - Individual FAQ question/answer
  - Settings: question, answer
  - Must be nested inside `faq-tab` block

---

## Merchant Workflow

### Adding a New FAQ Category

1. **Add Tab Block:**
   - Click "+ Add block" → Select "FAQ Tab"
   - Set tab label (e.g., "Shipping & Delivery")
   - Set tab ID (e.g., "shipping")

2. **Add FAQ Items:**
   - Inside the tab block, click "+ Add block" → Select "FAQ Item"
   - Enter question and answer
   - Add as many FAQ items as needed

3. **Repeat for More Categories:**
   - Add more tab blocks for other categories
   - Each tab can have unlimited FAQ items

### Example Structure in Theme Editor

```
📁 FAQ Tab: "Orders Issues" (tab_id: "orders")
  └─ 📄 FAQ Item: "What's your return policy?"
  └─ 📄 FAQ Item: "Can I return an item I exchanged?"
  └─ 📄 FAQ Item: "How can I process a return?"

📁 FAQ Tab: "Products & Materials" (tab_id: "products")
  └─ 📄 FAQ Item: "Where is your jewelry made?"
  └─ 📄 FAQ Item: "Are all pieces 14K solid gold?"
  └─ 📄 FAQ Item: "Do your products have a warranty?"

📁 FAQ Tab: "Shipping & Delivery" (tab_id: "shipping")
  └─ 📄 FAQ Item: "Do you ship internationally?"
  └─ 📄 FAQ Item: "How can I track my order?"
```

---

## Behavior Specifications

### Tab Navigation
- **Click Tab:** Smooth scroll to that category section
- **First FAQ:** Automatically opens first FAQ in that category
- **Active State:** Clicked tab gets highlighted with underline
- **Horizontal Scroll:** Tabs scroll horizontally if many tabs exist
- **Scroll Hints:** Partial visibility on edges shows more tabs available
- **No Scrollbar:** Scrollbar hidden but scrolling still enabled

### Accordion Behavior
- **Click Question:** Expands answer with smooth animation
- **Auto-close Others:** Opening one FAQ closes all other FAQs
- **Icon Toggle:** Plus icon (+) when closed, Minus icon (−) when open
- **First Item:** First FAQ in active tab opens automatically on tab click
- **Smooth Animation:** Max-height transition for expand/collapse

### Responsive Behavior
- **Desktop (1440px):** Two-column layout (sidebar + content), 128px gap
- **Tablet (1024px):** Two-column layout, reduced gap (64px)
- **Mobile (767px):** Stacked layout (sidebar on top, then content)
- **Tab Scroll:** Always horizontal scroll on all devices

---

## Technical Highlights

### Theme Blocks Advantages
- ✅ Visual parent-child hierarchy in theme editor
- ✅ No manual category matching required
- ✅ Drag-and-drop reordering of tabs and FAQs
- ✅ Reusable blocks across sections (future flexibility)
- ✅ Better merchant UX

### JavaScript Features
- **Tab Controller:** Manages tab switching and scrolling
- **Accordion Controller:** Handles expand/collapse logic
- **Smooth Scrolling:** Uses `scrollIntoView` with smooth behavior
- **Auto-close Logic:** Tracks open FAQ and closes when new one opens
- **Scroll Hints:** CSS overflow + padding for edge peek effect

---

## Development Workflow

1. ✅ **Design Extraction** - Extract from Figma node 429-387 (completed)
2. ✅ **Documentation** - Write overview, tokens, implementation (this)
3. 🔄 **Create Blocks** - Build `/blocks/faq-tab.liquid` and `/blocks/faq-item.liquid`
4. 🔄 **Create Section** - Build `sections/custom-section-faq.liquid`
5. 🔄 **Write CSS** - Implement styles in `assets/section-faq.css`
6. 🔄 **Write JavaScript** - Tab navigation + accordion in `assets/section-faq.js`
7. 🔄 **Local Testing** - Test with `shopify theme dev`
8. 🔄 **Playwright Tests** - Write and run automated tests
9. 🔄 **Deploy** - Push to unpublished theme, then live

---

## Success Criteria

- [ ] Tabs display horizontally with scroll hints
- [ ] Clicking tab scrolls to category and opens first FAQ
- [ ] Only one FAQ open at a time
- [ ] Smooth animations for scroll and accordion
- [ ] Responsive on all breakpoints
- [ ] No console errors
- [ ] Passes all Playwright tests
- [ ] Matches Figma design pixel-perfect

---

## Design Reference

**Figma Node:** 429-387 (Read using Figma MCP if visual reference needed)

---

**Next Steps:** Read `02-design-tokens.md` for design specifications.
