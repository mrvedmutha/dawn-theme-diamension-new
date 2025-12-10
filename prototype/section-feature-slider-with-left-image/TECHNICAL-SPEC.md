# Feature Slider with Left Image - Technical Specification

## Figma Design Reference

**Source Design File:**
- **Figma URL:** `https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-4809&m=dev`
- **Node ID:** `12:4809`
- **Section:** NEW ARRIVALS (Feature Slider with Left Image)

**To Extract Design Details with Figma MCP:**
```javascript
// Get design context and code generation
figma-mcp-dektop_get_design_context({
  nodeId: "12:4809",
  clientFrameworks: "liquid,javascript",
  clientLanguages: "html,css,javascript,liquid"
});

// Get screenshots for reference
figma-mcp-dektop_get_screenshot({
  nodeId: "12:4809"
});

// Get design variables and tokens
figma-mcp-dektop_get_variable_defs({
  nodeId: "12:4809"
});
```

**Design Includes:**
- Complete layout for all responsive breakpoints
- Typography specifications (Neue Haas Display)
- Color palette and hex codes
- Spacing measurements
- Interactive states (hover, active, carousel end)
- Animation guidance

---

## Design Overview

The "New Arrivals" (Feature Slider with Left Image) section is a responsive product carousel that displays a curated collection with an optional sidebar/hero image. The section features a horizontal scroll carousel with smooth GSAP animations, wishlist functionality via local storage, and fully responsive layouts across all breakpoints.

**Max Container Width:** 1440px (centered on larger screens)

---

## Section Architecture

### Layout Breakdown by Viewport

#### **Viewport 1440px+ (Large Desktop)**
- **Left Sidebar:** Static image (merchant-uploaded), square aspect ratio
- **Right Content:** 3 full product cards visible, no offset
- **Carousel behavior:** Smooth horizontal scroll, one product at a time
- **Direction:** Left-to-right by default, flips to right-to-left at carousel end

#### **Viewport 1250-1440px (Desktop)**
- **Left Sidebar:** Static image, square aspect ratio
- **Right Content:** 2 full product cards + 1 card in offset (partially visible)
- **Carousel behavior:** One product scrolls into view at a time
- **Direction:** Same as above

#### **Viewport 1025-1249px (Tablet)**
- **Left Sidebar:** Removed, image moves to top
- **Top Image:** Full viewport width, 1:1 square aspect ratio
- **Content Below:** 3 full product cards, horizontal carousel
- **Carousel behavior:** One product at a time

#### **Viewport 768-1024px (Mobile)**
- **Top Image:** Full viewport width, 1:1 square aspect ratio
- **Content Below:** 2 full product cards, horizontal carousel
- **Carousel behavior:** One product at a time

#### **Viewport ≤ 375px (Small Mobile)**
- **Top Image:** Full viewport width, 1:1 square aspect ratio
- **Content Below:** 2 full product cards, horizontal carousel
- **Carousel behavior:** One product at a time

---

## Component Structure

### Product Card
```
┌─────────────────┐
│                 │
│   Product       │  (2:3 aspect ratio)
│   Image         │
│                 │
└─────────────────┘
Product Name (20px, Light)
₹ 32,000 (14px, Medium)
❤️ (Wishlist Button - 30px diameter)
```

**Card Spacing:**
- Image aspect ratio: 2:3 (portrait)
- If uploaded in square, scales to card width and centers
- No background on card
- Text content below image, no background
- Heart button: 30px diameter circle when inactive

### Arrow Navigation Button
- **SVG Icon:** 24x24px, black fill
- **States:**
  - Points right (→) by default
  - Points left (←) when carousel reaches end
  - GSAP animation on direction change (fast-then-slow easing)
- **No hover state**

### Section Container
```
.custom-section-feature-slider-with-left-image
├── .custom-section-feature-slider-with-left-image__sidebar (Desktop only)
│   └── Image: merchant-uploaded
├── .custom-section-feature-slider-with-left-image__top-image (Mobile/Tablet only)
│   └── Image: merchant-uploaded
├── .custom-section-feature-slider-with-left-image__header
│   ├── Heading: "NEW ARRIVALS"
│   └── Arrow button
└── .custom-section-feature-slider-with-left-image__carousel
    ├── .custom-section-feature-slider-with-left-image__carousel-container
    │   ├── .custom-section-feature-slider-with-left-image__card
    │   │   ├── Image wrapper
    │   │   ├── Product name
    │   │   ├── Price
    │   │   └── Wishlist button
    │   └── ... (repeated for each product)
    └── Arrow navigation (click handler)
```

---

## Interactive Behaviors

### Carousel Navigation

**Initial State:**
- Show products 1, 2 (full) + 3 (offset) for 1250-1440px
- Show products 1, 2, 3 (full) for 1440px+
- Show products 1, 2 (full) for mobile/tablet
- Arrow points right (→)

**On "Next" Click:**
- Current product scrolls out of view
- Next product enters view with GSAP animation (fast-then-slow easing)
- If at carousel end: arrow flips to point left (←)
- Animation duration: ~800ms

**On "Prev" Click (at carousel end):**
- Previous product scrolls back into view
- Arrow flips to point right (→)

**Carousel End Behavior:**
- Last product(s) visible, no wrapping
- Arrow permanently points left (←) until scrolled back
- Empty space (no 3rd product) visible on right

### Wishlist Button Interaction

**Default State:**
- Heart icon, 30px diameter circle
- No background
- Color: `#183754`

**On Click:**
- **Animation:** GSAP scale down to 0.9 → scale up to 1 (press effect)
- **Duration:** 300ms
- **Visual State:** 
  - Background: Ellipse shape, color `#183754`
  - SVG icon: Color `#FFFAF5`
  - Item added to localStorage with key `diamension_wishlist`

**Stored Data Structure:**
```javascript
{
  wishlist: [
    {
      productId: "gid://shopify/Product/123456",
      productHandle: "circle-earrings",
      timestamp: 1234567890
    }
  ]
}
```

---

## Section Settings (Schema)

### Configurable Settings

| Setting ID | Type | Label | Default | Description |
|-----------|------|-------|---------|-------------|
| `section_heading` | text | Section Heading | "New Arrivals" | Main heading text |
| `sidebar_image` | image_picker | Sidebar/Top Image | - | Merchant uploads image (square aspect ratio recommended) |
| `collection_handle` | text | Collection Handle | - | Shopify collection to pull products from |
| `products_limit` | number | Products to Display | 10 | Max products to show in carousel |
| `show_heading` | checkbox | Show Heading | true | Toggle section heading visibility |
| `heading_alignment` | select | Heading Alignment | "left" | Options: left, center, right |

### Product Block (If Using Blocks)
If section uses blocks for custom product lists (alternative to collection):

| Block Setting | Type | Label | Default |
|---------------|------|-------|---------|
| `product_id` | product | Select Product | - | Individual product picker |

---

## Design Tokens

### Colors
- **Section Background:** `#FFFAF5`
- **Card Image Container Background:** `#F0EFEA`
- **Text Color (Primary):** `#183754`
- **Wishlist Active Background:** `#183754`
- **Wishlist Active Icon:** `#FFFAF5`
- **Arrow Icon:** Black (from SVG)

### Typography
- **Section Heading:** 
  - Font: Neue Haas Display (Light, 45px weight)
  - Size: 30px
  - Color: `#183754`
  - Uppercase
- **Product Name:**
  - Font: Neue Haas Display (Light, 45px weight)
  - Size: 20px
  - Color: `#183754`
  - Line height: 30px
- **Price:**
  - Font: Neue Haas Display (Medium, 55px weight)
  - Size: 14px
  - Color: `#183754`
  - Uppercase
  - Line height: 20px

### Spacing
- **Section Padding (Desktop):** 80px horizontal, 40px vertical
- **Section Padding (Tablet):** 60px horizontal, 30px vertical
- **Section Padding (Mobile):** 40px horizontal, 20px vertical
- **Card Gap (Desktop):** 24px between products
- **Card Gap (Mobile):** 16px between products
- **Header Bottom Margin:** 40px

### Images
- **Sidebar/Top Image Aspect Ratio:** 1:1 (Square)
- **Product Image Aspect Ratio:** 2:3 (Portrait, but adapts if uploaded square)
- **Top Image Width (Mobile/Tablet):** Full viewport width (100vw)
- **Top Image Height (Mobile/Tablet):** Equal to width (square)

### Components
- **Wishlist Button Diameter:** 30px
- **Arrow Icon Size:** 24x24px
- **Card Border Radius:** 0 (no border radius)

### Animations
- **Carousel Scroll Duration:** 800ms
- **Carousel Easing:** GSAP fast-then-slow (custom cubic-bezier or easeInOutQuad equivalent)
- **Wishlist Button Scale:** 0.9 (down) → 1 (up)
- **Wishlist Button Duration:** 300ms
- **Arrow Flip Animation:** 400ms

---

## Responsive Breakpoints

### Breakpoint Reference (Following Project Standards)
```css
/* Large Desktop - Contain, don't stretch beyond 1440px */
@media (min-width: 1441px) { /* Apply 1440px width constraint */ }

/* Desktop - Base styles at 1440px */
/* No media query needed for base */

/* Tablet - Adjust layout */
@media (max-width: 1024px) { /* 3 cards, image moves to top */ }

/* Mobile - Mobile layout */
@media (max-width: 767px) { /* 2 cards, image at top */ }

/* Small Mobile - Fine-tuning */
@media (max-width: 375px) { /* 2 cards, adjust spacing */ }
```

### Desktop Variant Breakpoints
- **1440px+:** Show 3 full products
- **1250-1440px:** Show 2 full + 1 offset products
- **1025-1249px:** Show 3 full products, image at top

---

## Animation Specifications

### GSAP Animations

#### Carousel Scroll Animation
```javascript
// When user clicks next arrow
gsap.to(carouselContainer, {
  x: -productWidth, // Negative for RTL scroll
  duration: 0.8,
  ease: "power2.inOut" // Fast then slow effect
});
```

#### Wishlist Button Press Effect
```javascript
// On heart button click
gsap.timeline()
  .to(heartButton, { scale: 0.9, duration: 0.15 }, 0)
  .to(heartButton, { scale: 1, duration: 0.15 }, 0.15);
```

#### Arrow Direction Flip
```javascript
// When carousel reaches end
gsap.to(arrowIcon, {
  rotation: 180, // Flip from right to left
  duration: 0.4,
  ease: "power2.inOut"
});
```

---

## Wishlist Implementation (Local Storage)

### Data Structure
```javascript
localStorage.diamension_wishlist = JSON.stringify({
  wishlist: [
    {
      productId: "gid://shopify/Product/6989625057411",
      productHandle: "circle-earrings",
      productTitle: "Circle Earrings",
      productImage: "https://...",
      timestamp: 1702857600000
    }
  ]
});
```

### JavaScript Functions (To Implement Later)
```javascript
// Add to wishlist
function addToWishlist(product) {
  const wishlist = getWishlist();
  wishlist.push({
    productId: product.id,
    productHandle: product.handle,
    productTitle: product.title,
    productImage: product.image,
    timestamp: Date.now()
  });
  saveWishlist(wishlist);
  updateWishlistUI(product.handle, true);
}

// Remove from wishlist
function removeFromWishlist(productId) {
  const wishlist = getWishlist();
  const updated = wishlist.filter(item => item.productId !== productId);
  saveWishlist(updated);
}

// Check if product is in wishlist
function isInWishlist(productId) {
  const wishlist = getWishlist();
  return wishlist.some(item => item.productId === productId);
}

// Get wishlist from localStorage
function getWishlist() {
  const data = localStorage.getItem('diamension_wishlist');
  return data ? JSON.parse(data).wishlist : [];
}

// Save wishlist to localStorage
function saveWishlist(wishlist) {
  localStorage.setItem('diamension_wishlist', JSON.stringify({ wishlist }));
}
```

---

## File Structure

```
sections/
├── custom-section-feature-slider-with-left-image.liquid

assets/
├── section-feature-slider-with-left-image.css
└── section-feature-slider-with-left-image.js

prototype/section-feature-slider-with-left-image/
├── design/
│   ├── design-tokens.md
│   └── TECHNICAL-SPEC.md
└── IMPLEMENTATION-GUIDE.md
```

---

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest versions

---

## Performance Considerations

- Use CSS transforms (translate3d) for carousel animations instead of left/right positioning
- Lazy load product images using `loading="lazy"`
- Debounce resize events for responsive breakpoint changes
- Minimize localStorage access (cache wishlist data in memory)
- Use will-change sparingly on carousel container during animation

---

## Accessibility

- Arrow button should have `aria-label="Next Products"` or `aria-label="Previous Products"`
- Wishlist button: `aria-label="Add to Wishlist"` / `aria-label="Remove from Wishlist"`
- Carousel should announce item count: "Product 1 of 5"
- Keyboard navigation: Support arrow keys for carousel (optional enhancement)
- Color contrast: All text meets WCAG AA standards

---

## Checklist

- [ ] Figma screenshots saved to `prototype/section-feature-slider-with-left-image/design/`
- [ ] Design tokens documented and extracted
- [ ] Section settings schema defined
- [ ] Responsive layouts confirmed for all breakpoints
- [ ] Animation specifications detailed
- [ ] Wishlist localStorage structure documented
- [ ] File naming conventions applied
- [ ] BEM class naming structure ready
- [ ] Asset requirements list created
- [ ] Implementation plan reviewed
