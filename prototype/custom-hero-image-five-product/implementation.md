# Hero Image + Five Product Carousel - Implementation Guide

**Version:** 1.0.0
**Estimated Time:** 4-6 hours
**Difficulty:** Medium

---

## 🚨 BEFORE YOU START

### Required Reading (MANDATORY)
Read these files in order:
1. `/docs/rules/00-OVERVIEW.md` - Navigation guide
2. `/docs/rules/01-WORKFLOW.md` - Complete workflow
3. `/docs/rules/04-LIQUID-DEVELOPMENT.md` - Liquid standards
4. `/docs/rules/05-CSS-STANDARDS.md` - CSS & BEM methodology
5. `/docs/rules/06-JAVASCRIPT-STANDARDS.md` - JavaScript best practices
6. `/docs/rules/08-NAMING-CONVENTIONS.md` - File naming

### Required Design Review (MANDATORY)
1. Open Figma: https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-8831&m=dev
2. Study node `12:8831` - Main section structure
3. Study nodes `12:8964` to `12:8980` - Product card examples
4. Extract exact spacing, colors, typography from Figma
5. Review `design-tokens.md` in this folder

### Design Token Reference
Keep `design-tokens.md` open while coding for quick reference.

---

## 📋 Phase 0: Preparation

### Step 1: Verify Assets

Ensure these assets exist:
- [x] Arrow icon: `/assets/custom-product-detail/icons/arrow-down.svg`
- [x] Fonts: `/assets/fonts/neue-haas-display/`
- [ ] Test hero image (1440x800px for local testing)

### Step 2: Set Up Local Development

```bash
# Navigate to theme directory
cd /Users/wingsdino/Documents/Wings\ Shopify\ Projects/diamension/diamension-dawn-theme-new/diamension-shopify-dawn

# Start Shopify CLI
shopify theme dev

# Open browser to:
# http://localhost:9292
```

---

## 📝 Phase 1: Create Liquid Section

### Step 1: Create Section File

**File:** `sections/custom-section-hero-five-product.liquid`

```liquid
{{ 'section-hero-five-product.css' | asset_url | stylesheet_tag }}

<div class="custom-section-hero-five-product">

  {%- comment -%} Hero Image {%- endcomment -%}
  {% if section.settings.hero_image != blank %}
    <div class="custom-section-hero-five-product__hero">
      <img
        src="{{ section.settings.hero_image | image_url: width: 1920 }}"
        srcset="
          {{ section.settings.hero_image | image_url: width: 768 }} 768w,
          {{ section.settings.hero_image | image_url: width: 1024 }} 1024w,
          {{ section.settings.hero_image | image_url: width: 1440 }} 1440w,
          {{ section.settings.hero_image | image_url: width: 1920 }} 1920w
        "
        sizes="100vw"
        alt="{{ section.settings.hero_image.alt | escape }}"
        class="custom-section-hero-five-product__hero-image"
        loading="eager"
      >
    </div>
  {% endif %}

  {%- comment -%} Product Carousel {%- endcomment -%}
  {% if section.settings.collection != blank %}
    <div class="custom-section-hero-five-product__carousel-wrapper">

      {%- comment -%} Left Arrow {%- endcomment -%}
      <button
        class="custom-section-hero-five-product__arrow custom-section-hero-five-product__arrow--left"
        aria-label="Previous product"
        data-carousel-prev
      >
        <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.9995 16.7996C19.2995 16.7996 18.5995 16.5296 18.0695 15.9996L11.5495 9.47965C11.2595 9.18965 11.2595 8.70965 11.5495 8.41965C11.8395 8.12965 12.3195 8.12965 12.6095 8.41965L19.1295 14.9396C19.6095 15.4196 20.3895 15.4196 20.8695 14.9396L27.3895 8.41965C27.6795 8.12965 28.1595 8.12965 28.4495 8.41965C28.7395 8.70965 28.7395 9.18965 28.4495 9.47965L21.9295 15.9996C21.3995 16.5296 20.6995 16.7996 19.9995 16.7996Z" fill="#183754"/>
        </svg>
      </button>

      {%- comment -%} Product Cards Container {%- endcomment -%}
      <div class="custom-section-hero-five-product__carousel" data-carousel>
        <div class="custom-section-hero-five-product__track" data-carousel-track>

          {% assign product_count = 0 %}
          {% for product in section.settings.collection.products limit: 5 %}
            {% assign product_count = product_count | plus: 1 %}
            {% assign is_tall = false %}
            {% if product_count == 1 or product_count == 3 or product_count == 5 %}
              {% assign is_tall = true %}
            {% endif %}

            <a
              href="{{ product.url }}"
              class="custom-section-hero-five-product__card {% if is_tall %}custom-section-hero-five-product__card--tall{% else %}custom-section-hero-five-product__card--short{% endif %}"
              data-product-card
            >
              {%- comment -%} Product Image {%- endcomment -%}
              {% if product.featured_image %}
                <div class="custom-section-hero-five-product__card-image-wrapper">
                  <img
                    src="{{ product.featured_image | image_url: width: 600 }}"
                    srcset="
                      {{ product.featured_image | image_url: width: 280 }} 280w,
                      {{ product.featured_image | image_url: width: 560 }} 560w
                    "
                    sizes="280px"
                    alt="{{ product.featured_image.alt | escape }}"
                    class="custom-section-hero-five-product__card-image"
                    loading="lazy"
                  >
                </div>
              {% endif %}

              {%- comment -%} Product Title {%- endcomment -%}
              <h3 class="custom-section-hero-five-product__card-title">
                {{ product.title }}
              </h3>

              {%- comment -%} View Button {%- endcomment -%}
              <div class="custom-section-hero-five-product__card-button-wrapper">
                <span class="custom-section-hero-five-product__card-button">
                  VIEW
                </span>
              </div>
            </a>

          {% endfor %}

        </div>
      </div>

      {%- comment -%} Right Arrow {%- endcomment -%}
      <button
        class="custom-section-hero-five-product__arrow custom-section-hero-five-product__arrow--right"
        aria-label="Next product"
        data-carousel-next
      >
        <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.9995 16.7996C19.2995 16.7996 18.5995 16.5296 18.0695 15.9996L11.5495 9.47965C11.2595 9.18965 11.2595 8.70965 11.5495 8.41965C11.8395 8.12965 12.3195 8.12965 12.6095 8.41965L19.1295 14.9396C19.6095 15.4196 20.3895 15.4196 20.8695 14.9396L27.3895 8.41965C27.6795 8.12965 28.1595 8.12965 28.4495 8.41965C28.7395 8.70965 28.7395 9.18965 28.4495 9.47965L21.9295 15.9996C21.3995 16.5296 20.6995 16.7996 19.9995 16.7996Z" fill="#183754"/>
        </svg>
      </button>

    </div>
  {% endif %}

</div>

<script src="{{ 'section-hero-five-product.js' | asset_url }}" defer></script>

{% schema %}
{
  "name": "Hero Image + Five Products",
  "settings": [
    {
      "type": "image_picker",
      "id": "hero_image",
      "label": "Hero Image",
      "info": "Recommended size: 1440px × 800px"
    },
    {
      "type": "collection",
      "id": "collection",
      "label": "Product Collection",
      "info": "Only the first 5 products will be displayed"
    }
  ],
  "presets": [
    {
      "name": "Hero + 5 Products"
    }
  ]
}
{% endschema %}
```

**Key Points:**
- BEM class naming: `custom-section-hero-five-product`
- Conditional rendering for hero image and collection
- Inline SVG for arrows (no external file dependency)
- Limit 5 products
- Tall/short card modifier based on position (odd/even)
- Lazy loading for product images, eager for hero
- Responsive srcset for images

---

## 🎨 Phase 2: Create CSS File

### Step 1: Create CSS File

**File:** `assets/section-hero-five-product.css`

```css
/* ================================================================
   Hero Image + Five Product Carousel
   ================================================================ */

/* CSS Variables */
:root {
  --hero-five-product-wrapper-bg: #FFFAF5;
  --hero-five-product-card-bg: #EFE9E4;
  --hero-five-product-text-primary: #183754;
  --hero-five-product-button-bg: #FFFFFF;
  --hero-five-product-button-text: #000000;
  --hero-five-product-gap-hero: 60px;
  --hero-five-product-gap-cards: 10px;
  --hero-five-product-container-max: 1440px;
  --hero-five-product-card-width: 280px;
  --hero-five-product-card-tall: 380px;
  --hero-five-product-card-short: 288px;
}

/* ================================================================
   Section Wrapper
   ================================================================ */

.custom-section-hero-five-product {
  background-color: var(--hero-five-product-wrapper-bg);
  width: 100%;
}

/* ================================================================
   Hero Image
   ================================================================ */

.custom-section-hero-five-product__hero {
  width: 100%;
  height: 800px;
  overflow: hidden;
}

.custom-section-hero-five-product__hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ================================================================
   Carousel Wrapper (Max Width Container)
   ================================================================ */

.custom-section-hero-five-product__carousel-wrapper {
  max-width: var(--hero-five-product-container-max);
  margin: 0 auto;
  margin-top: var(--hero-five-product-gap-hero);
  padding: 0 40px 80px 40px;
  position: relative;
}

/* ================================================================
   Carousel Container
   ================================================================ */

.custom-section-hero-five-product__carousel {
  overflow: hidden;
  width: 100%;
}

.custom-section-hero-five-product__track {
  display: flex;
  gap: var(--hero-five-product-gap-cards);
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.custom-section-hero-five-product__track::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

/* ================================================================
   Product Card
   ================================================================ */

.custom-section-hero-five-product__card {
  flex: 0 0 var(--hero-five-product-card-width);
  width: var(--hero-five-product-card-width);
  background-color: var(--hero-five-product-card-bg);
  position: relative;
  overflow: hidden;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.custom-section-hero-five-product__card--tall {
  height: var(--hero-five-product-card-tall);
}

.custom-section-hero-five-product__card--short {
  height: var(--hero-five-product-card-short);
}

/* ================================================================
   Product Image
   ================================================================ */

.custom-section-hero-five-product__card-image-wrapper {
  width: 100%;
  flex: 1;
  overflow: hidden;
}

.custom-section-hero-five-product__card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ================================================================
   Product Title
   ================================================================ */

.custom-section-hero-five-product__card-title {
  position: absolute;
  top: 16px;
  left: 24px;
  right: 24px;
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-weight: 300;
  font-size: 24px;
  line-height: 30px;
  color: var(--hero-five-product-text-primary);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ================================================================
   View Button
   ================================================================ */

.custom-section-hero-five-product__card-button-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

.custom-section-hero-five-product__card-button {
  width: 240px;
  height: 42px;
  background-color: var(--hero-five-product-button-bg);
  color: var(--hero-five-product-button-text);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-weight: 300;
  font-size: 20px;
  line-height: 30px;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Desktop: Show button on card hover */
@media (min-width: 1440px) {
  .custom-section-hero-five-product__card:hover .custom-section-hero-five-product__card-button {
    opacity: 1;
  }
}

/* ================================================================
   Navigation Arrows (Hidden on Desktop)
   ================================================================ */

.custom-section-hero-five-product__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;
  padding: 10px;
  display: none; /* Hidden on desktop */
}

.custom-section-hero-five-product__arrow svg {
  display: block;
}

.custom-section-hero-five-product__arrow--left {
  left: 10px;
}

.custom-section-hero-five-product__arrow--left svg {
  transform: rotate(90deg);
}

.custom-section-hero-five-product__arrow--right {
  right: 10px;
}

.custom-section-hero-five-product__arrow--right svg {
  transform: rotate(-90deg);
}

.custom-section-hero-five-product__arrow:hover {
  opacity: 0.7;
}

.custom-section-hero-five-product__arrow[disabled] {
  display: none;
}

/* ================================================================
   Responsive - Tablet (768px - 1439px)
   ================================================================ */

@media (max-width: 1439px) {
  .custom-section-hero-five-product__hero {
    height: 600px;
  }

  .custom-section-hero-five-product__carousel-wrapper {
    padding: 0 30px 60px 30px;
  }

  /* Show arrows on tablet */
  .custom-section-hero-five-product__arrow {
    display: block;
  }

  /* Button always visible on tablet/mobile */
  .custom-section-hero-five-product__card-button {
    opacity: 1;
  }
}

/* ================================================================
   Responsive - Mobile Large (480px - 767px)
   ================================================================ */

@media (max-width: 767px) {
  .custom-section-hero-five-product__hero {
    height: 400px;
  }

  .custom-section-hero-five-product__carousel-wrapper {
    padding: 0 20px 40px 20px;
    margin-top: 40px;
  }
}

/* ================================================================
   Responsive - Mobile (< 480px)
   ================================================================ */

@media (max-width: 479px) {
  .custom-section-hero-five-product__hero {
    height: 300px;
  }

  .custom-section-hero-five-product__carousel-wrapper {
    padding: 0 15px 30px 15px;
    margin-top: 30px;
  }

  .custom-section-hero-five-product__card-title {
    font-size: 20px;
    line-height: 26px;
  }

  .custom-section-hero-five-product__card-button {
    width: 200px;
    height: 36px;
    font-size: 18px;
  }
}
```

**Key Points:**
- CSS variables for maintainability
- BEM naming throughout
- Desktop-first approach (1440px base)
- Responsive breakpoints for tablet and mobile
- Arrows hidden on desktop, visible on tablet/mobile
- Button opacity 0 on desktop (hover to show), opacity 1 on tablet/mobile
- Smooth scroll behavior for carousel

---

## 💻 Phase 3: Create JavaScript File

### Step 1: Create JavaScript File

**File:** `assets/section-hero-five-product.js`

```javascript
/**
 * Hero Image + Five Product Carousel
 * Handles carousel navigation and arrow visibility
 */

class HeroFiveProductCarousel {
  constructor(section) {
    this.section = section;
    this.track = section.querySelector('[data-carousel-track]');
    this.prevButton = section.querySelector('[data-carousel-prev]');
    this.nextButton = section.querySelector('[data-carousel-next]');

    if (!this.track || !this.prevButton || !this.nextButton) return;

    this.init();
  }

  init() {
    // Bind navigation events
    this.prevButton.addEventListener('click', () => this.scrollPrev());
    this.nextButton.addEventListener('click', () => this.scrollNext());

    // Update arrow visibility on scroll
    this.track.addEventListener('scroll', () => this.updateArrowsVisibility());

    // Initial arrow state
    this.updateArrowsVisibility();
  }

  scrollPrev() {
    const cardWidth = 280;
    const gap = 10;
    const scrollAmount = cardWidth + gap;

    this.track.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  }

  scrollNext() {
    const cardWidth = 280;
    const gap = 10;
    const scrollAmount = cardWidth + gap;

    this.track.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  updateArrowsVisibility() {
    const scrollLeft = this.track.scrollLeft;
    const maxScroll = this.track.scrollWidth - this.track.clientWidth;

    // Hide left arrow if at start
    if (scrollLeft <= 0) {
      this.prevButton.setAttribute('disabled', '');
    } else {
      this.prevButton.removeAttribute('disabled');
    }

    // Hide right arrow if at end
    if (scrollLeft >= maxScroll - 1) { // -1 for floating point tolerance
      this.nextButton.setAttribute('disabled', '');
    } else {
      this.nextButton.removeAttribute('disabled');
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.custom-section-hero-five-product');
  sections.forEach(section => new HeroFiveProductCarousel(section));
});

// Re-initialize on Shopify section load (theme editor support)
if (window.Shopify && Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    const section = event.target.querySelector('.custom-section-hero-five-product');
    if (section) {
      new HeroFiveProductCarousel(section);
    }
  });
}
```

**Key Points:**
- ES6 class-based structure
- Scroll one product at a time (280px + 10px gap = 290px)
- Dynamic arrow visibility based on scroll position
- Shopify theme editor support
- No console.log (clean production code)

---

## 🧪 Phase 4: Local Testing

### Step 1: Add Section to Theme

1. Open theme editor: `http://localhost:9292/admin/themes/current/editor`
2. Add section "Hero + 5 Products"
3. Upload a test hero image (1440x800px)
4. Select a collection with at least 5 products
5. Save

### Step 2: Test Checklist

**Desktop (1440px):**
- [ ] Hero image displays at 1440x800px
- [ ] All 5 products visible
- [ ] Cards alternate tall/short (380px, 288px, 380px, 288px, 380px)
- [ ] 10px gap between cards
- [ ] 60px gap between hero and carousel
- [ ] Arrows hidden
- [ ] "View" button shows on card hover
- [ ] Card clickable to product page

**Tablet (1024px):**
- [ ] Hero image scales appropriately
- [ ] 4 products visible + 1 offset (scroll hint)
- [ ] Arrows visible
- [ ] "View" button always visible
- [ ] Left arrow hidden at start
- [ ] Right arrow hidden at end
- [ ] Smooth scroll on arrow click

**Mobile (375px):**
- [ ] Hero image scales (300px height)
- [ ] 2 products visible + 3 offset
- [ ] Arrows visible and functional
- [ ] "View" button always visible
- [ ] Smooth scroll behavior

**Interactions:**
- [ ] Clicking card navigates to product page
- [ ] Arrow navigation scrolls one product
- [ ] Arrows hide at boundaries
- [ ] No console errors

---

## 🎭 Phase 5: Playwright Testing

### Step 1: Create Test File

**File:** `tests/liquid/section-hero-five-product/hero-five-product.spec.js`

```javascript
const { test, expect } = require('@playwright/test');

test.describe('Hero Image + Five Product Carousel', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to page with section (adjust URL as needed)
    await page.goto('http://localhost:9292/pages/test-hero-five-product');
  });

  test('should display hero image', async ({ page }) => {
    const hero = page.locator('.custom-section-hero-five-product__hero');
    await expect(hero).toBeVisible();

    const heroImage = page.locator('.custom-section-hero-five-product__hero-image');
    await expect(heroImage).toBeVisible();
  });

  test('should display 5 product cards', async ({ page }) => {
    const cards = page.locator('.custom-section-hero-five-product__card');
    await expect(cards).toHaveCount(5);
  });

  test('should have alternating tall/short cards', async ({ page }) => {
    const tallCards = page.locator('.custom-section-hero-five-product__card--tall');
    const shortCards = page.locator('.custom-section-hero-five-product__card--short');

    await expect(tallCards).toHaveCount(3); // Cards 1, 3, 5
    await expect(shortCards).toHaveCount(2); // Cards 2, 4
  });

  test('should show View button on hover (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const card = page.locator('.custom-section-hero-five-product__card').first();
    const button = card.locator('.custom-section-hero-five-product__card-button');

    // Button should be hidden initially
    await expect(button).toHaveCSS('opacity', '0');

    // Hover over card
    await card.hover();

    // Button should be visible
    await expect(button).toHaveCSS('opacity', '1');
  });

  test('should hide arrows on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const leftArrow = page.locator('[data-carousel-prev]');
    const rightArrow = page.locator('[data-carousel-next]');

    await expect(leftArrow).toHaveCSS('display', 'none');
    await expect(rightArrow).toHaveCSS('display', 'none');
  });

  test('should show arrows on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });

    const leftArrow = page.locator('[data-carousel-prev]');
    const rightArrow = page.locator('[data-carousel-next]');

    await expect(leftArrow).toBeVisible();
    await expect(rightArrow).toBeVisible();
  });

  test('should scroll carousel on arrow click', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });

    const track = page.locator('[data-carousel-track]');
    const rightArrow = page.locator('[data-carousel-next]');

    // Get initial scroll position
    const initialScroll = await track.evaluate(el => el.scrollLeft);

    // Click right arrow
    await rightArrow.click();
    await page.waitForTimeout(500); // Wait for smooth scroll

    // Check scroll position changed
    const newScroll = await track.evaluate(el => el.scrollLeft);
    expect(newScroll).toBeGreaterThan(initialScroll);
  });

  test('should navigate to product page on card click', async ({ page }) => {
    const card = page.locator('.custom-section-hero-five-product__card').first();

    // Should have href attribute
    await expect(card).toHaveAttribute('href');
  });
});
```

### Step 2: Run Tests

```bash
# Run tests
npx playwright test tests/liquid/section-hero-five-product

# Run with UI
npx playwright test tests/liquid/section-hero-five-product --ui

# Update screenshots (if using visual regression)
npx playwright test tests/liquid/section-hero-five-product --update-snapshots
```

---

## ✅ Final Checklist

Before marking complete:

### Code Quality
- [ ] BEM naming used throughout
- [ ] No core theme files modified
- [ ] CSS variables used
- [ ] Comments added for clarity
- [ ] No console.log in production code

### Functionality
- [ ] Hero image displays correctly
- [ ] 5 products from collection shown
- [ ] Alternating card heights work
- [ ] Carousel navigation works
- [ ] Arrow visibility logic works
- [ ] "View" button hover works (desktop)
- [ ] "View" button always visible (mobile/tablet)
- [ ] Cards link to product pages

### Responsive
- [ ] Tested at 1440px (desktop)
- [ ] Tested at 1024px (tablet)
- [ ] Tested at 768px (tablet)
- [ ] Tested at 480px (mobile large)
- [ ] Tested at 375px (mobile)

### Testing
- [ ] Playwright tests written
- [ ] All tests pass
- [ ] Manual testing complete
- [ ] Works in theme editor

### Deployment Ready
- [ ] Git commit prepared
- [ ] Ready to push to unpublished theme
- [ ] Client approval (if needed)

---

## 🐛 Troubleshooting

### Issue: Carousel not scrolling
- Check JavaScript loaded (defer attribute)
- Verify data attributes match selectors
- Check console for errors

### Issue: Arrows not hiding at boundaries
- Verify `updateArrowsVisibility()` logic
- Check scroll position calculation
- Ensure scroll event listener attached

### Issue: Button not showing on hover (desktop)
- Verify CSS media query
- Check hover selector specificity
- Ensure opacity transition working

### Issue: Cards not alternating heights
- Check Liquid logic (odd/even)
- Verify CSS modifiers applied
- Check product_count increment

### Issue: Images not loading
- Verify image_url filter syntax
- Check srcset sizes
- Ensure lazy loading working

---

## 📚 Additional Resources

- **Shopify Liquid Docs:** https://shopify.dev/docs/themes/liquid
- **BEM Methodology:** https://getbem.com/
- **Playwright Docs:** https://playwright.dev/

---

## 🎉 Completion

Once all checklist items are complete:
1. Commit code with message: `[Feature] Add hero image + 5 product carousel section`
2. Push to unpublished theme
3. Share with client for review
4. Deploy to live theme after approval

**Congratulations! Section complete! 🚀**
