# Shop by Price Section - Comprehensive Specification

## 📋 Overview
A dynamic product filtering section that allows customers to browse jewelry products filtered by price ranges. Features interactive price tabs, carousel product display with smooth animations, and wishlist functionality.

---

## 🎨 Layout & Dimensions

### Wrapper Container
- **Background Color**: `#FFFAF5`
- **Full viewport width**

### Content Container
- **Max Width**: `1440px`
- **Padding (Top/Bottom)**: `120px`
- **Padding (Left/Right)**: `56px`
- **Background**: Inherits wrapper

### Spacing Structure
```
Wrapper (#FFFAF5)
  └─ Container (1440px, 120px tb / 56px lr padding)
     ├─ "SHOP BY PRICE" title (from padding start)
     ├─ Gap: 10px
     ├─ Tagline text
     ├─ Gap: 88px
     ├─ Price Category Tabs
     ├─ Gap (tabs to line): 16px
     ├─ Underline indicator
     ├─ Gap (line to cards): 64px
     ├─ Product Carousel
     │  └─ Product Card
     │     ├─ Image (225px × 333px, 25:37 ratio)
     │     ├─ Gap: 10px
     │     ├─ Product Title
     │     ├─ Gap: 8px
     │     └─ Product Price
     └─ Gap (cards to CTA): 96px
     └─ "SHOP ALL" Button
```

---

## 🏷️ Typography & Text

### "SHOP BY PRICE" Title
- **Font**: Neue Haas Grotesk Display Pro, Light
- **Size**: `40px`
- **Line Height**: `45px`
- **Weight**: Light (45)
- **Color**: `#183754`
- **Text Transform**: UPPERCASE
- **Alignment**: Center

### Tagline
- **Font**: Neue Haas Grotesk Display Pro, Light
- **Size**: `20px`
- **Line Height**: `30px`
- **Color**: `#183754`
- **Alignment**: Center
- **Max Width**: Responsive (approximately 400px)
- **Text**: "Whatever the budget, we have got a beautiful piece of jewellery for every YOU!"

### Price Category Tabs
- **Font**: Neue Haas Grotesk Display Pro / Noto Sans, Regular
- **Size**: `20px`
- **Line Height**: `45px`
- **Weight**: 400 (Regular)
- **Color**: `#183754`
- **Text Transform**: UPPERCASE
- **Alignment**: Center
- **Default Categories**:
  - BELOW ₹25000
  - UNDER ₹50,000
  - UNDER ₹1,00,000
  - UNDER ₹2,00,000

### Product Title
- **Font**: Neue Haas Grotesk Display Pro, Light
- **Size**: `20px`
- **Line Height**: `30px`
- **Color**: `#183754`
- **Alignment**: Left
- **Behavior**: Single line with ellipsis overflow (`text-overflow: ellipsis`)
- **Max Width**: Image container width (225px)

### Product Price
- **Font**: Neue Haas Grotesk Display Pro / Noto Sans, Medium
- **Size**: `14px`
- **Line Height**: `20px`
- **Weight**: 500 (Medium)
- **Color**: `#183754`
- **Alignment**: Left
- **Format**: `₹ {price}` (e.g., ₹ 32,000)
- **Max Width**: Image container width (225px)

### "SHOP ALL" Button
- **Font**: Neue Haas Grotesk Display Pro, Roman / Noto Sans, Medium
- **Size**: `20px`
- **Line Height**: N/A
- **Color**: `#183754`
- **Alignment**: Center
- **Decoration**: Underline
- **Visibility**: **Only shown if product count > 10** for current price filter

---

## 🎯 Price Category Tabs

### Structure
- **Horizontal layout** on desktop
- **Horizontally scrollable** on tablet/mobile (touch scroll, no buttons)
- **Gap between tabs**: `141px` (desktop)
- **Horizontal padding**: `144px` from container edges

### Interactive Behavior
- **Default Active**: First tab (BELOW ₹25000)
- **Clickable**: Yes, filters products by price range
- **Selection Indicator**: Underline that fades in/out (GSAP animation)
- **Underline Specs**:
  - Position: Below active tab text
  - Distance from text: `16px`
  - Animation: Subtle fade in/out on tab change
  - Color: `#183754`

### Product Filtering
- **Source**: Auto-filtered from Shopify store by price
- **Display Limit**: 10 products max per filter
- **Logic**: 
  - If products > 10: Show "SHOP ALL" button
  - If products ≤ 10: Hide "SHOP ALL" button

---

## 🛍️ Product Carousel

### Container
- **Horizontal Layout**: Flex row
- **Overflow**: Hidden (with scroll capability)
- **Padding**: `10px` from left/right edges to first/last product card
- **Gap between arrows and products**: `56px`

### Responsive Product Count
| Device | Products Visible | Scroll Type |
|--------|-----------------|------------|
| Desktop | 5 products | Arrow buttons |
| Tablet | 4 products | Arrow buttons |
| Mobile | 2 products | Touch scroll (no buttons) |

### Navigation Arrows (← →)
- **Icon Size**: `24px`
- **Position**: Left and Right edges, aligned with product images
- **Start Position**: From container padding (56px)
- **Color**: `#183754`
- **Disabled State**: 
  - Opacity: `0.3` (light gray)
  - Disabled when no more products to scroll
  - Left arrow disabled on first product
  - Right arrow disabled on last product
  - Not shown on mobile (touch scroll only)

---

## 🎴 Product Card

### Card Structure
```
Product Card (Width: 225px)
  ├─ Image Container
  │  ├─ Background: #F0EFEA (beige, behind image only)
  │  ├─ Image: 225px × 333px (25:37 ratio)
  │  ├─ First image: Transparent PNG
  │  ├─ Second image: Shown on hover
  │  └─ Hover Effect: Subtle zoom in
  │
  ├─ Wishlist Button
  │  ├─ Position: Top-right (16px from top, 16px from right)
  │  ├─ Size: 26px diameter (ellipse)
  │  ├─ Background (default): Transparent
  │  ├─ Background (liked): #FFFCF9
  │  ├─ SVG Heart: 18px × 18px, centered
  │  └─ Interaction: Scale effect (scale down-up)
  │
  ├─ Gap: 10px
  ├─ Product Title
  │  ├─ Max width: 225px (full card width)
  │  ├─ Single line with ellipsis
  │  └─ Left aligned
  │
  ├─ Gap: 8px
  └─ Product Price
     ├─ Max width: 225px (full card width)
     └─ Left aligned
```

### Image Details
- **Dimensions**: 225px × 333px
- **Aspect Ratio**: 25:37
- **Background (behind image only)**: `#F0EFEA`
- **First Image**: Transparent PNG (uploaded)
- **Second Image**: Shown on hover
- **Hover Effect**: Subtle zoom in transformation

### Wishlist Button
- **Default State**:
  - Background: None (transparent)
  - Heart color: `#183754`
  - Size: 26px diameter (circular/ellipse)
  
- **Liked State** (after click):
  - Background: `#FFFCF9` (off-white)
  - Heart color: `#183754` (filled)
  - Size: 26px diameter
  
- **Interaction**:
  - Click effect: Scale down-up animation (spring effect)
  - Color change: Visual feedback
  - Persistence: State persists across carousel scrolls
  
- **Position**: 
  - Top: `16px` from image top
  - Right: `16px` from image right
  - Z-index: Above image
  
- **Note**: Wishlist API integration planned for later phase

---

## ✨ Animations & Interactions

### Tab Change Animation
- **Trigger**: Click on price category tab
- **Duration**: Subtle (recommended 300-500ms)
- **Effects**:
  1. **Underline**: Fade in/out (GSAP)
  2. **Product cards**: Fade in/out (subtle, not flashy)
  3. **Carousel**: Reset to first product
  
- **Library**: GSAP (TweenMax/gsap.to)

### Product Card Hover
- **Image Change**: Switch to second image
- **Image Animation**: Subtle zoom in
- **Duration**: 300-400ms ease-out
- **Effect**: Not too aggressive, smooth transition

### Wishlist Button Click
- **Animation**: Scale effect (down-up spring)
- **Duration**: 200-300ms
- **States**: 
  - Default → Liked
  - Visual feedback with color change
  - State persists

### Carousel Scroll
- **Desktop/Tablet**: Arrow button click
  - Scroll 1 product at a time
  - Smooth scroll animation (300ms)
  
- **Mobile**: Native touch scroll
  - No arrow buttons
  - Native browser scrolling

### Arrow Button States
- **Active**: Full opacity (1.0), cursor: pointer
- **Disabled**: Opacity 0.3, cursor: not-allowed
- **Hover**: Slight color/opacity change (subtle)

---

## 📱 Responsive Behavior

### Desktop (1440px)
- Container: 1440px with 56px lr padding
- Products visible: 5
- Navigation: Arrow buttons visible
- Tabs: Horizontal layout with gaps
- Scroll: Arrow-based (smooth scroll 300ms)

### Tablet (768px - 1023px)
- Container: Responsive width with padding
- Products visible: 4
- Navigation: Arrow buttons visible
- Tabs: Horizontally scrollable (touch scroll)
- Scroll: Arrow-based carousel

### Mobile (< 768px)
- Container: Full width with padding
- Products visible: 2
- Navigation: **No arrow buttons** (hidden)
- Tabs: Horizontally scrollable (touch scroll)
- Scroll: Native touch scroll (momentum scrolling)
- Wishlist button: Still visible and functional

---

## 📊 Product Data

### Product Filtering
- **Source**: Shopify GraphQL API (store products)
- **Filter Logic**: Filter by price metadata/tag
- **Display Count**: 10 products per price category
- **Sorting**: Default store sorting (newest/featured first)

### Required Fields
- Product ID
- Product title
- Product price
- Product image (primary - transparent)
- Product image (secondary - for hover)
- Product URL
- Price range/category

### Dynamic "SHOP ALL" Button
- **Visibility**: Shown only if filtered products > 10
- **Behavior**: Links to collection page filtered by price range
- **Hidden**: If ≤ 10 products in category

---

## 🎨 Color Palette

| Element | Color | Usage |
|---------|-------|-------|
| Wrapper Background | `#FFFAF5` | Main background |
| Container Background | Same as wrapper | Content area |
| Text (Titles, Prices, Tabs) | `#183754` | Primary text color |
| Image Background | `#F0EFEA` | Behind product image only |
| Wishlist Liked State | `#FFFCF9` | Button background when liked |
| Arrows/Icons | `#183754` | Navigation buttons |
| Disabled State | `#183754` (0.3 opacity) | Inactive arrows |

---

## 📁 Implementation Assets Needed

### Images
- [ ] Product images (transparent PNGs for primary view)
- [ ] Product images (colored/styled for hover view)
- [ ] Arrow icons (24px, SVG or PNG)
- [ ] Heart icon (18px, SVG or PNG)

### Fonts
- Neue Haas Grotesk Display Pro (Light, Roman, Medium weights)
- Noto Sans (Regular, Medium weights)

### Variables/Tokens
- Color tokens (primary text, backgrounds, accents)
- Spacing tokens (gaps, padding)
- Font tokens (family, sizes, weights)
- Animation timings (GSAP durations)

---

## 🔄 State Management

### Price Filter State
- **Current Active Tab**: Tracked and persisted
- **Products List**: Updated on tab change
- **Carousel Position**: Reset on tab change

### Carousel State
- **Current Scroll Position**: Tracks arrow button states
- **Products Visible**: 5 (desktop), 4 (tablet), 2 (mobile)
- **Button Disabled State**: Updates based on scroll position

### Wishlist State
- **Liked Products**: Stored (client-side initially, API later)
- **Visual State**: Heart fills/unfills on toggle

---

## ⚠️ Edge Cases & Validation

1. **No Products in Category**: Show empty state message
2. **Products < 10**: Hide "SHOP ALL" button
3. **Product Title Too Long**: Ellipsis with `text-overflow: ellipsis`
4. **Image Missing**: Show placeholder with background color
5. **Last Product Visible**: Disable right arrow
6. **First Product Visible**: Disable left arrow
7. **Mobile Scroll End**: Stop at last visible product
8. **Wishlist on Mobile**: Full touch functionality maintained

---

## 🚀 Next Steps

1. **Confirm** this specification matches your vision
2. **Provide** all product images and assets
3. **Create** design tokens document
4. **Build** Liquid section with JavaScript functionality
5. **Implement** GSAP animations
6. **Test** responsive behavior across devices
7. **Integrate** Shopify API for dynamic filtering

---

## 📝 Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-11 | Initial specification based on Figma design |

