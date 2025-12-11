# Shop by Price - Visual Overview & Architecture

## 📐 Layout Diagram (Exact Dimensions)

```
┌─────────────────────────────────────────────────────────────────────┐
│                        WRAPPER #FFFAF5                              │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                     CONTAINER 1440px                          │  │
│  │              120px padding (top/bottom)                       │  │
│  │              56px padding (left/right)                        │  │
│  │                                                               │  │
│  │  ┌─────────────────────────────────────────────────────────┐ │  │
│  │  │              SHOP BY PRICE                              │ │  │
│  │  │    Neue Haas Light, 40px, UPPERCASE, #183754          │ │  │
│  │  └─────────────────────────────────────────────────────────┘ │  │
│  │                                  ↓ 10px                       │  │
│  │  ┌─────────────────────────────────────────────────────────┐ │  │
│  │  │  Whatever the budget, we have got a beautiful          │ │  │
│  │  │  piece of jewellery for every YOU!                    │ │  │
│  │  │       Neue Haas Light, 20px, centered, #183754        │ │  │
│  │  └─────────────────────────────────────────────────────────┘ │  │
│  │                                  ↓ 88px                       │  │
│  │  ┌─────────────────────────────────────────────────────────┐ │  │
│  │  │  BELOW ₹25000 | UNDER ₹50,000 | UNDER ₹1,00,000      │ │  │
│  │  │     | UNDER ₹2,00,000                                  │ │  │
│  │  │  20px, Regular, UPPERCASE, #183754                   │ │  │
│  │  │  Gap: 141px between tabs                              │ │  │
│  │  │  Padding: 144px from sides                            │ │  │
│  │  └─────────────────────────────────────────────────────────┘ │  │
│  │                                  ↓ 16px (to line)             │  │
│  │  ┌─────────────────────────────────────────────────────────┐ │  │
│  │  │      ────────────────                                  │ │  │
│  │  │  (Active tab indicator, fade in/out animation)        │ │  │
│  │  └─────────────────────────────────────────────────────────┘ │  │
│  │                                  ↓ 64px                       │  │
│  │  ┌─────────────────────────────────────────────────────────┐ │  │
│  │  │ ← [Product 1] [Product 2] [Product 3] [Product 4] →  │ │  │
│  │  │                                                        │ │  │
│  │  │  Product Card Structure (Desktop: 5 visible)          │ │  │
│  │  │  Tablet: 4 visible, Mobile: 2 visible                │ │  │
│  │  │  Gap between cards: 10px                             │ │  │
│  │  │  Arrow gap from cards: 56px                          │ │  │
│  │  └─────────────────────────────────────────────────────────┘ │  │
│  │                                  ↓ 96px                       │  │
│  │  ┌─────────────────────────────────────────────────────────┐ │  │
│  │  │              Shop All                                  │ │  │
│  │  │     (Only visible if > 10 products in category)       │ │  │
│  │  │     Neue Haas Roman, 20px, underlined, #183754       │ │  │
│  │  └─────────────────────────────────────────────────────────┘ │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🎴 Product Card Architecture

```
┌──────────────────────────────┐
│   Product Card (225×333px)   │
│                              │
│  ┌──────────────────────┐    │
│  │   Image Container    │    │
│  │   225×333px          │    │
│  │                      │    │
│  │ Background: #F0EFEA  │    │ ← Beige background
│  │ (behind image only)  │    │
│  │                      │    │
│  │      [Product        │    │
│  │      Image]          │    │ ← Transparent PNG (primary)
│  │                      │    │    or full color (hover)
│  │       ┌──────────┐   │    │
│  │       │♥ 26px   │   │    │ ← Wishlist button
│  │       │ Button  │   │    │    (top-right, 16px offset)
│  │       └──────────┘   │    │    Default: transparent
│  │                      │    │    Liked: #FFFCF9
│  │ Heart: 18×18px       │    │ ← Heart SVG inside button
│  │ Color: #183754       │    │    Centered in 26px circle
│  └──────────────────────┘    │
│              ↓ 10px          │
│  ┌──────────────────────┐    │
│  │  Circle Earrings...  │    │ ← Title (20px)
│  │                      │    │    Neue Haas Light
│  │  Left-aligned        │    │    Single line + ellipsis
│  │  Max width: 225px    │    │    Color: #183754
│  └──────────────────────┘    │
│              ↓ 8px           │
│  ┌──────────────────────┐    │
│  │  ₹ 32,000            │    │ ← Price (14px)
│  │                      │    │    Noto Sans Medium
│  │  Left-aligned        │    │    Color: #183754
│  │  Max width: 225px    │    │    Format: ₹ {price}
│  └──────────────────────┘    │
│                              │
└──────────────────────────────┘
```

---

## 📱 Responsive Layouts

### Desktop (1440px+)
```
[←] [Card 1] [Card 2] [Card 3] [Card 4] [Card 5] [→]
     └─────────────────────────────────────────────┘
            5 Products Visible
         Arrow Navigation Active
```

### Tablet (768px - 1023px)
```
[←] [Card 1] [Card 2] [Card 3] [Card 4] [→]
     └──────────────────────────────────────┘
           4 Products Visible
        Arrow Navigation Active
```

### Mobile (< 768px)
```
┌──────────────────────────┐
│ [Card 1] [Card 2]←→      │
│ (Touch scroll continues) │
└──────────────────────────┘
    2 Products Visible
  No Arrow Buttons (hidden)
  Native Touch Scroll
```

---

## 🎬 Animation Flow Diagrams

### 1. Tab Click Animation

```
User Clicks Tab
    │
    ├─→ Underline Animates
    │   Duration: 400ms
    │   Effect: Fade in/out + position change (if needed)
    │   Easing: power2.inOut
    │
    ├─→ Current Cards Fade Out
    │   Duration: 300ms
    │   Effect: Opacity 1 → 0
    │   Easing: power2.inOut
    │
    ├─→ Load New Products (from Shopify API)
    │   Query by price range
    │   Fetch max 10 products
    │
    ├─→ New Cards Fade In
    │   Duration: 300ms
    │   Effect: Opacity 0 → 1
    │   Easing: power2.inOut
    │   Delay: 100ms after fade out
    │
    └─→ Carousel Resets
        Move to first product
        (No animation needed)
```

### 2. Product Hover Animation

```
User Hovers Product Card
    │
    ├─→ Image Switch
    │   Swap from primary to hover image
    │   No transition (instant swap)
    │
    └─→ Zoom Animation
        Duration: 350ms
        Scale: 1.0 → 1.05
        Easing: ease-out
        Effect: Subtle zoom in on image
```

### 3. Wishlist Click Animation

```
User Clicks Wishlist Button
    │
    ├─→ Scale Down
    │   Duration: 100ms
    │   Scale: 1.0 → 0.85
    │   Easing: power2.in
    │
    ├─→ Scale Up (Spring Effect)
    │   Duration: 150ms
    │   Scale: 0.85 → 1.0
    │   Easing: cubic-bezier(0.68, -0.55, 0.27, 1.55)
    │   (Creates bouncy spring effect)
    │
    ├─→ Color Change
    │   Background: transparent → #FFFCF9
    │   Heart: outline → filled
    │
    └─→ State Persists
        Remains liked until clicked again
```

### 4. Carousel Navigation

```
User Clicks Arrow Button
    │
    ├─→ Check Button State
    │   At first product? Disable left arrow (opacity 0.3)
    │   At last product? Disable right arrow (opacity 0.3)
    │
    ├─→ Scroll Animation (if not at limit)
    │   Duration: 300ms
    │   Distance: 1 product width (225px + gap)
    │   Easing: ease-out
    │   Effect: Smooth slide
    │
    └─→ Update Arrow States
        Recalculate button disabilities
        Update opacity
```

---

## 🎨 Color Architecture

```
PRIMARY COLORS
├─ Text Primary:      #183754 (Deep Navy)
│  ├─ Used for: All text, icons, primary elements
│  ├─ Opacity 1.0: Active state
│  └─ Opacity 0.3: Disabled state
│
├─ Background Primary: #FFFAF5 (Off-White)
│  └─ Used for: Wrapper background
│
├─ Background Secondary: #F0EFEA (Light Beige)
│  └─ Used for: Behind product images only (not entire card)
│
└─ Accent Color:      #FFFCF9 (Very Light Off-White)
   └─ Used for: Wishlist button background (liked state)

COLOR USAGE BREAKDOWN:
├─ Titles & Headings:        #183754
├─ Body Text:                #183754
├─ Tab Labels:               #183754
├─ Product Names:            #183754
├─ Product Prices:           #183754
├─ Arrow Icons:              #183754
├─ Heart Icon:               #183754
├─ Wrapper:                  #FFFAF5
├─ Image Background:         #F0EFEA (behind image only)
├─ Wishlist Liked Button:    #FFFCF9
└─ Disabled Elements:        #183754 @ 30% opacity
```

---

## 🔤 Typography Hierarchy

```
LEVEL 1: DISPLAY (Title)
├─ Font:     Neue Haas Grotesk Display Pro, Light
├─ Size:     40px
├─ Weight:   45 (Light)
├─ Line Height: 45px
├─ Color:    #183754
├─ Transform: UPPERCASE
└─ Usage:    "SHOP BY PRICE" heading

LEVEL 2: HEADING (Tagline)
├─ Font:     Neue Haas Grotesk Display Pro, Light
├─ Size:     20px
├─ Weight:   45 (Light)
├─ Line Height: 30px
├─ Color:    #183754
└─ Usage:    "Whatever the budget..." tagline

LEVEL 3: SUBHEADING (Tabs)
├─ Font:     Neue Haas Grotesk Display Pro / Noto Sans
├─ Size:     20px
├─ Weight:   400 (Regular)
├─ Line Height: 45px
├─ Color:    #183754
├─ Transform: UPPERCASE
└─ Usage:    Price category tabs

LEVEL 4: BODY (Product Details)
├─ Font:     Neue Haas Grotesk Display Pro, Light
├─ Size:     20px
├─ Weight:   45 (Light)
├─ Line Height: 30px
├─ Color:    #183754
├─ Overflow: ellipsis
└─ Usage:    Product titles

LEVEL 5: CAPTION (Prices)
├─ Font:     Noto Sans, Medium
├─ Size:     14px
├─ Weight:   500 (Medium)
├─ Line Height: 20px
├─ Color:    #183754
└─ Usage:    Product prices

LEVEL 6: CTA (Shop All)
├─ Font:     Neue Haas Roman / Noto Sans
├─ Size:     20px
├─ Weight:   55 (Roman) / 500 (Medium)
├─ Color:    #183754
├─ Text Decoration: underline (solid)
└─ Usage:    "Shop All" button
```

---

## 🔄 Data Flow Diagram

```
┌──────────────────┐
│  User Action     │
│ (Tab Click)      │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────┐
│ JavaScript Event Handler     │
│ - Get selected tab ID        │
│ - Extract price range        │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ GSAP Animation               │
│ - Fade out current cards     │
│ - Animate underline          │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Shopify GraphQL API          │
│ - Query products by price    │
│ - Filter by category         │
│ - Return max 10 products     │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Data Processing              │
│ - Map product data           │
│ - Process images             │
│ - Format prices              │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Render New Cards             │
│ - Inject into DOM            │
│ - Trigger fade in animation  │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ State Update                 │
│ - Update active tab          │
│ - Update products list       │
│ - Reset carousel position    │
└──────────────────────────────┘
```

---

## 📊 Component State Machine

```
┌─────────────────────┐
│   INITIAL STATE     │
│ - First tab active  │
│ - Products loaded   │
│ - Carousel at start │
│ - No wishlist items │
└──────────┬──────────┘
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
┌─────────┐  ┌──────────────┐
│ TAB     │  │ CAROUSEL     │
│ CLICKED │  │ SCROLLED     │
└────┬────┘  └──────┬───────┘
     │              │
     ▼              ▼
┌─────────────────────────────┐
│ UPDATE ACTIVE TAB           │
│ - Fetch new products        │
│ - Animate underline         │
│ - Fade out/in cards         │
│ - Reset carousel position   │
└──────────────┬──────────────┘
               │
    ┌──────────┴──────────┐
    │                     │
    ▼                     ▼
┌──────────────┐  ┌──────────────┐
│ PRODUCTS     │  │ CAROUSEL     │
│ CHANGED      │  │ POSITION     │
│ EVENT        │  │ UPDATED      │
└──────────────┘  └──────────────┘
```

---

## 🎯 Interaction Matrix

| Event | Trigger | Duration | Effect | Library |
|-------|---------|----------|--------|---------|
| Tab Click | Click on price tab | 400ms | Underline fade + card fade | GSAP |
| Card Hover | Mouse over card | 350ms | Image zoom in | CSS/JS |
| Wishlist Click | Click heart button | 250ms | Scale down-up | GSAP |
| Carousel Click | Click arrow button | 300ms | Smooth scroll | GSAP |
| Tab Scroll | Touch scroll tabs | Native | Native scroll | Browser |
| Card Scroll | Touch scroll cards | Native | Native scroll | Browser |

---

## 📁 File Organization

```
section-shop-by-price/
│
├── Documentation (7 files, 2,729 lines)
│   ├── 00-INDEX.md              ← Start here
│   ├── README.md                ← Developer guide
│   ├── PLANNING-SUMMARY.md      ← Complete overview
│   ├── SPECIFICATION.md         ← Technical details
│   ├── design-tokens.md         ← Design system
│   ├── ASSET-CHECKLIST.md       ← Asset requirements
│   └── QUICK-REFERENCE.md       ← One-page reference
│
├── Assets (To be created)
│   ├── images/
│   │   └── products/
│   │       ├── below-25k/       (20 images)
│   │       ├── 25k-50k/         (20 images)
│   │       ├── 50k-100k/        (20 images)
│   │       └── 100k-200k/       (20 images)
│   └── icons/
│       ├── arrow-left.svg
│       ├── arrow-right.svg
│       └── heart.svg
│
└── Implementation (To be created)
    ├── section-shop-by-price.liquid
    ├── shop-by-price.js
    └── shop-by-price.css
```

---

## 🚀 Implementation Phases

```
PHASE 1: SETUP
├─ Figma analysis
├─ Specification creation
├─ Design tokens extraction
├─ Asset requirements
└─ Documentation
   Status: ✅ COMPLETE

PHASE 2: MARKUP (2-3 days)
├─ Liquid template structure
├─ HTML semantics
├─ Schema settings
└─ Asset integration

PHASE 3: STYLING (2-3 days)
├─ CSS layout
├─ Responsive design
├─ Color & typography
└─ Media queries

PHASE 4: INTERACTIVITY (3-4 days)
├─ Tab click handlers
├─ Carousel logic
├─ State management
└─ Button functionality

PHASE 5: ANIMATIONS (2-3 days)
├─ GSAP library setup
├─ Underline animation
├─ Card transitions
├─ Hover effects
└─ Wishlist animation

PHASE 6: INTEGRATION (2-3 days)
├─ Shopify GraphQL API
├─ Product filtering
├─ Dynamic rendering
└─ Error handling

PHASE 7: TESTING (2-3 days)
├─ Responsive testing
├─ Browser compatibility
├─ Performance optimization
├─ Accessibility audit
└─ Mobile testing

PHASE 8: DEPLOYMENT (1 day)
├─ Final review
├─ QA sign-off
├─ Live deployment
└─ Monitoring
```

---

**This diagram provides visual reference for implementation. Refer to detailed documents for exact specifications.**

