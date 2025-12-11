# Shop by Price Section - Development Guide

## 📌 Quick Overview

The **Shop by Price** section is a dynamic, animated product carousel with price-based filtering. It displays jewelry products in four price tiers with smooth GSAP animations, responsive design, and wishlist integration ready.

**Status**: 🔴 **Awaiting Assets** → 🟡 **In Development** → 🟢 **Complete**

---

## 📂 Folder Structure

```
section-shop-by-price/
├── README.md                      ← You are here
├── PLANNING-SUMMARY.md            ← Full overview & timeline
├── SPECIFICATION.md               ← Detailed technical specs
├── design-tokens.md               ← Design system & tokens
├── ASSET-CHECKLIST.md             ← Asset requirements
├── assets/
│   ├── images/
│   │   └── products/              ← Product images (40+)
│   └── icons/                     ← SVG icons (arrows, heart)
├── section-shop-by-price.liquid   ← Main section template
├── shop-by-price.js               ← JavaScript logic
└── shop-by-price.css              ← Styling
```

---

## 🚀 Getting Started

### 1. **Review Documentation**
Start with these in order:
1. **PLANNING-SUMMARY.md** - Get the big picture
2. **SPECIFICATION.md** - Understand technical details
3. **design-tokens.md** - Learn design system
4. **ASSET-CHECKLIST.md** - Know what assets are needed

### 2. **Prepare Assets**
Gather and organize:
- 40+ product images (primary + hover)
- Arrow icons (left/right)
- Heart icon
- Product metadata (titles, prices, categories)

### 3. **Setup Development**
```bash
# Navigate to section folder
cd prototype/section-shop-by-price/

# Create necessary directories
mkdir -p assets/images/products/{below-25k,25k-50k,50k-100k,100k-200k}
mkdir -p assets/icons

# Copy assets to appropriate folders
# (Follow ASSET-CHECKLIST.md for organization)
```

### 4. **Development Phases**
- Phase 1: HTML structure (Liquid template)
- Phase 2: CSS styling & responsive layout
- Phase 3: JavaScript carousel functionality
- Phase 4: GSAP animations
- Phase 5: Shopify integration & testing

---

## 🎯 Key Features

| Feature | Status | Notes |
|---------|--------|-------|
| Price-based filtering | 📝 Planned | 4 price categories |
| Carousel display | 📝 Planned | Responsive: 5/4/2 products |
| Arrow navigation | 📝 Planned | Desktop/tablet only |
| Touch scroll | 📝 Planned | Mobile-optimized |
| GSAP animations | 📝 Planned | Subtle, refined |
| Wishlist button | 📝 Planned | Scale effect included |
| Responsive design | 📝 Planned | Mobile-first approach |
| "Shop All" CTA | 📝 Planned | Conditional display |

---

## 📐 Dimensions Quick Reference

```
Container:        1440px (desktop)
Padding:          120px top/bottom, 56px left/right
Product Card:     225px × 333px (25:37)
Wishlist Button:  26px diameter
Heart Icon:       18px × 18px
Arrow Icons:      24px × 24px

Responsive Breakpoints:
├─ Desktop (1440px+):  5 products visible
├─ Tablet (768px):     4 products visible
└─ Mobile (<768px):    2 products visible
```

---

## 🎨 Design Tokens

### Colors
```css
--color-text-primary: #183754;
--color-bg-wrapper: #FFFAF5;
--color-bg-image: #F0EFEA;
--color-wishlist-liked: #FFFCF9;
```

### Spacing
All spacing values documented in `design-tokens.md`

### Typography
- **Primary**: Neue Haas Grotesk Display Pro
- **Secondary**: Noto Sans
- Weights: Light (45), Regular (400), Medium (500), Roman (55)

### Animations
- Library: GSAP (TweenMax/gsap.to)
- Duration: 300-400ms
- Easing: power2.inOut, ease-out
- Style: Subtle, not flashy

---

## 🔄 Interaction Flows

### Tab Selection Flow
```
User clicks price tab
    ↓
Underline animates (fade in/out)
    ↓
Current cards fade out
    ↓
Load new products from Shopify API
    ↓
New cards fade in
    ↓
Carousel resets to first product
```

### Carousel Navigation Flow
```
Desktop/Tablet:
User clicks → arrow
    ↓
Smooth scroll 300ms
    ↓
Show next product
    ↓
Check if at limit
    ↓
Disable arrow if at end

Mobile:
User swipes/scrolls
    ↓
Native touch scroll
    ↓
No arrow buttons (hidden)
```

### Wishlist Flow
```
User hovers product card
    ↓
Image switches to hover version
    ↓
Image zooms in subtly (350ms)
    ↓
User clicks wishlist button
    ↓
Scale animation (down-up)
    ↓
Background changes to #FFFCF9
    ↓
State persists across carousel scrolls
```

---

## 📦 Asset Checklist

### Before Starting Development
- [ ] 10 primary images per price category (40+ total)
- [ ] 10 hover images per price category (40+ total)
- [ ] All images are 225×333px
- [ ] Primary images: transparent PNG
- [ ] Arrow icons (left/right) 24×24px SVG
- [ ] Heart icon 18×18px SVG
- [ ] Product metadata (titles, prices, URLs)
- [ ] All images organized in folder structure

**Detailed requirements**: See ASSET-CHECKLIST.md

---

## 💻 Technical Requirements

### Frameworks & Libraries
- **Liquid**: Shopify template language
- **JavaScript**: Vanilla or jQuery
- **CSS3**: Flexbox, Grid, Media Queries
- **GSAP**: Animation library (version 3+)
- **Shopify API**: GraphQL for product filtering

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- IE11 (if required, needs polyfills)

### Performance Targets
- Image optimization (< 100KB per image)
- Lazy loading for product images
- Smooth 60fps animations
- < 3s initial load time

---

## 🎬 Animation Details

### Tab Change Animation
```javascript
// Underline fade in/out
Duration: 400ms
Easing: power2.inOut
Effect: Fade + position transition

// Product cards fade
Duration: 300ms out, 300ms in
Delay: 100ms between out and in
Easing: power2.inOut
```

### Hover Animation
```javascript
// Image zoom
Duration: 350ms
Easing: ease-out
Transform: scale(1.05)
Trigger: On hover
```

### Click Animation (Wishlist)
```javascript
// Scale down-up
Timeline: 
  - 100ms scale to 0.85 (power2.in)
  - 150ms scale to 1.0 (cubic-bezier spring)
Total: 250ms
```

### Carousel Scroll
```javascript
// Smooth scroll
Duration: 300ms
Easing: ease-out
Distance: 1 product width
```

---

## 📱 Responsive Implementation

### Mobile-First Approach
```css
/* Base styles for mobile */
.product-carousel {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

/* Tablet enhancement */
@media (min-width: 768px) {
  .product-carousel {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Desktop enhancement */
@media (min-width: 1440px) {
  .product-carousel {
    grid-template-columns: repeat(5, 1fr);
  }
}
```

### Touch vs Click
```javascript
// Mobile: Native scroll (no events needed)
// Tablet/Desktop: Arrow click events
if (isMobile) {
  // Hide arrow buttons
  arrowsContainer.style.display = 'none';
} else {
  // Add click listeners to arrows
  leftArrow.addEventListener('click', scrollLeft);
  rightArrow.addEventListener('click', scrollRight);
}
```

---

## 🔗 Integration Points

### Shopify GraphQL API
Fetch products by price:
```graphql
query GetProductsByPrice($priceMin: Float!, $priceMax: Float!) {
  products(first: 10, query: "price:[$priceMin TO $priceMax]") {
    edges {
      node {
        id
        title
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 2) {
          edges {
            node {
              url
            }
          }
        }
      }
    }
  }
}
```

### Shopify Liquid Variables
```liquid
{% assign products = section.settings.products %}
{% assign price_categories = section.settings.price_categories %}
{% assign show_wishlist = section.settings.enable_wishlist %}
```

---

## 🧪 Testing Checklist

### Functional Testing
- [ ] Tab click loads correct products
- [ ] Animations play smoothly
- [ ] Carousel scrolls correctly
- [ ] Wishlist button toggles state
- [ ] "Shop All" shows/hides appropriately
- [ ] Images load correctly
- [ ] Responsive layout works on all breakpoints

### Performance Testing
- [ ] Animations maintain 60fps
- [ ] No memory leaks
- [ ] Images optimized
- [ ] Lazy loading implemented
- [ ] API calls are efficient

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen readers compatible
- [ ] Color contrast sufficient
- [ ] Focus indicators visible
- [ ] ARIA labels present

### Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Firefox (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Edge (desktop)
- [ ] IE11 (if required)

---

## 🐛 Debugging Tips

### Common Issues
1. **Animations not playing**
   - Check GSAP is loaded
   - Verify selectors are correct
   - Check browser console for errors

2. **Images not showing**
   - Verify image paths are correct
   - Check image dimensions (225×333px)
   - Ensure transparent background on primary images

3. **Carousel not scrolling**
   - Check arrow click listeners are attached
   - Verify carousel container has overflow hidden
   - Check transform values in console

4. **Responsive not working**
   - Verify breakpoints in CSS
   - Check media query syntax
   - Test with browser dev tools

### Debug Mode
```javascript
// Enable console logging
const DEBUG = true;

if (DEBUG) {
  console.log('Product count:', products.length);
  console.log('Active tab:', activeTab);
  console.log('Carousel position:', carouselPosition);
}
```

---

## 📚 Reference Documents

| Document | Purpose | Read Time |
|----------|---------|-----------|
| PLANNING-SUMMARY.md | Overview & timeline | 5 min |
| SPECIFICATION.md | Detailed technical specs | 15 min |
| design-tokens.md | Design system & tokens | 10 min |
| ASSET-CHECKLIST.md | Asset requirements | 10 min |

---

## ⚠️ Important Notes

- **Color Accuracy**: All colors use exact hex values, no approximations
- **Image Quality**: Jewelry requires sharp, detailed images
- **Animation Subtlety**: Animations should be refined, not flashy
- **Mobile First**: Design should work perfectly on mobile first
- **Accessibility**: All interactive elements must be keyboard-accessible
- **Performance**: Optimize images and lazy load where possible

---

## 🚀 Development Timeline

**Phase 1: Setup** (Current)
- Duration: 1-2 days
- Deliverable: Assets organized, documentation ready

**Phase 2: Markup** (Next)
- Duration: 2-3 days
- Deliverable: Liquid template structure

**Phase 3: Styling**
- Duration: 2-3 days
- Deliverable: Responsive CSS

**Phase 4: Interactions**
- Duration: 3-4 days
- Deliverable: JavaScript carousel & filtering

**Phase 5: Animations**
- Duration: 2-3 days
- Deliverable: GSAP animations implemented

**Phase 6: Integration & Testing**
- Duration: 2-3 days
- Deliverable: Shopify API integrated, tested

**Phase 7: Deployment**
- Duration: 1 day
- Deliverable: Live on store

**Total Estimated**: 15-20 days

---

## 📞 Questions?

Refer to the appropriate document:
- **"What should this section do?"** → PLANNING-SUMMARY.md
- **"What are the exact dimensions?"** → SPECIFICATION.md
- **"What colors should I use?"** → design-tokens.md
- **"What assets do I need?"** → ASSET-CHECKLIST.md
- **"How do I code this?"** → This file + Code comments

---

**Last Updated**: December 11, 2025  
**Status**: 🔴 Awaiting Assets  
**Next Step**: Deliver assets from ASSET-CHECKLIST.md

