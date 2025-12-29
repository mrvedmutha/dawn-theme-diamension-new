# Glamor Collection - Implementation Guide

**Target Section:** `custom-section-glamor-collection-studio.liquid`
**Last Updated:** 2025-12-29

---

## File Structure

```
sections/
  └── custom-section-glamor-collection-studio.liquid

assets/
  ├── section-glamor-collection-studio.css
  └── section-glamor-collection-studio.js

prototype/
  └── custom-glamor-collection-the-studio/
      ├── 01-overview.md
      ├── 02-design-tokens.md
      └── 03-implementation.md (this file)
```

---

## Prerequisites

Before starting implementation:

1. ✓ Read `docs/rules/04-LIQUID-DEVELOPMENT.md`
2. ✓ Read `docs/rules/05-CSS-STANDARDS.md`
3. ✓ Read `docs/rules/06-JAVASCRIPT-STANDARDS.md`
4. ✓ Read `docs/rules/08-NAMING-CONVENTIONS.md`
5. ✓ Review `01-overview.md` and `02-design-tokens.md`
6. ✓ Access Figma node 251:90 for visual reference
7. ✓ Ensure GSAP library is available (CDN or npm)

---

## Liquid Section Structure

### File: `sections/custom-section-glamor-collection-studio.liquid`

```liquid
{{ 'section-glamor-collection-studio.css' | asset_url | stylesheet_tag }}

<div class="custom-section-glamor-collection" data-section-id="{{ section.id }}">

  {%- comment -%} Wrapper with fixed/viewport height {%- endcomment -%}
  <div class="custom-section-glamor-collection__wrapper">

    {%- comment -%} Background Image {%- endcomment -%}
    {% if section.settings.background_image != blank %}
      <div class="custom-section-glamor-collection__background">
        <img
          src="{{ section.settings.background_image | image_url: width: 1920 }}"
          srcset="
            {{ section.settings.background_image | image_url: width: 768 }} 768w,
            {{ section.settings.background_image | image_url: width: 1440 }} 1440w,
            {{ section.settings.background_image | image_url: width: 1920 }} 1920w
          "
          sizes="100vw"
          alt="{{ section.settings.background_image.alt | escape }}"
          loading="lazy"
          class="custom-section-glamor-collection__background-image"
        >
      </div>
    {% endif %}

    {%- comment -%} Headline Content {%- endcomment -%}
    <div class="custom-section-glamor-collection__headline">
      {% if section.settings.heading_text != blank %}
        <h2 class="custom-section-glamor-collection__headline-text">
          {{ section.settings.heading_text }}
        </h2>
      {% endif %}

      {% if section.settings.subtitle_text != blank %}
        <p class="custom-section-glamor-collection__subtitle">
          {{ section.settings.subtitle_text }}
        </p>
      {% endif %}
    </div>

    {%- comment -%} Product Cards - Desktop Absolute Layout {%- endcomment -%}
    {% if section.blocks.size > 0 %}
      <div class="custom-section-glamor-collection__cards custom-section-glamor-collection__cards--desktop">
        {% for block in section.blocks %}
          {%- assign card_index = forloop.index -%}

          <div
            class="custom-section-glamor-collection__card custom-section-glamor-collection__card--{{ card_index }}"
            {{ block.shopify_attributes }}
            data-card-index="{{ card_index }}"
          >
            <div class="custom-section-glamor-collection__card-overlay">

              {%- comment -%} Product Name {%- endcomment -%}
              {% if block.settings.product_name != blank %}
                <p class="custom-section-glamor-collection__card-name">
                  {{ block.settings.product_name | truncate: 30 }}
                </p>
              {% endif %}

              {%- comment -%} Product Image {%- endcomment -%}
              {% if block.settings.product_image != blank %}
                <img
                  src="{{ block.settings.product_image | image_url: width: 600 }}"
                  srcset="
                    {{ block.settings.product_image | image_url: width: 400 }} 400w,
                    {{ block.settings.product_image | image_url: width: 600 }} 600w,
                    {{ block.settings.product_image | image_url: width: 800 }} 800w
                  "
                  sizes="(max-width: 767px) 50vw, (max-width: 1024px) 25vw, 400px"
                  alt="{{ block.settings.product_name | default: 'Product' | escape }}"
                  loading="lazy"
                  class="custom-section-glamor-collection__card-image"
                >
              {% endif %}

              {%- comment -%} CTA Link {%- endcomment -%}
              {% if block.settings.cta_text != blank %}
                <a
                  href="{{ block.settings.cta_link | default: '#' }}"
                  class="custom-section-glamor-collection__card-cta"
                >
                  {{ block.settings.cta_text | truncate: 20 }}
                </a>
              {% endif %}

            </div>
          </div>
        {% endfor %}
      </div>

      {%- comment -%} Product Cards - Tablet/Mobile Grid Layout {%- endcomment -%}
      <div class="custom-section-glamor-collection__cards custom-section-glamor-collection__cards--responsive">
        {% for block in section.blocks %}
          <div
            class="custom-section-glamor-collection__card"
            {{ block.shopify_attributes }}
          >
            <div class="custom-section-glamor-collection__card-overlay">

              {% if block.settings.product_name != blank %}
                <p class="custom-section-glamor-collection__card-name">
                  {{ block.settings.product_name | truncate: 30 }}
                </p>
              {% endif %}

              {% if block.settings.product_image != blank %}
                <img
                  src="{{ block.settings.product_image | image_url: width: 600 }}"
                  alt="{{ block.settings.product_name | default: 'Product' | escape }}"
                  loading="lazy"
                  class="custom-section-glamor-collection__card-image"
                >
              {% endif %}

              {% if block.settings.cta_text != blank %}
                <a
                  href="{{ block.settings.cta_link | default: '#' }}"
                  class="custom-section-glamor-collection__card-cta"
                >
                  {{ block.settings.cta_text | truncate: 20 }}
                </a>
              {% endif %}

            </div>
          </div>
        {% endfor %}
      </div>
    {% endif %}

  </div>
</div>

<script src="{{ 'section-glamor-collection-studio.js' | asset_url }}" defer></script>

{% schema %}
{
  "name": "Glamor Collection - Studio",
  "tag": "section",
  "class": "section-glamor-collection",
  "settings": [
    {
      "type": "header",
      "content": "Background Image"
    },
    {
      "type": "image_picker",
      "id": "background_image",
      "label": "Background Image",
      "info": "Lifestyle photograph. Recommended: 1920×1528px for desktop."
    },
    {
      "type": "header",
      "content": "Headline Content"
    },
    {
      "type": "text",
      "id": "heading_text",
      "label": "Heading Text",
      "default": "Glamour",
      "info": "Large script heading. Font is hardcoded (Bickham Script Pro)."
    },
    {
      "type": "text",
      "id": "subtitle_text",
      "label": "Subtitle Text",
      "default": "is a condition, not a commodity.",
      "info": "Subtitle text below heading."
    }
  ],
  "blocks": [
    {
      "type": "product_card",
      "name": "Product Card",
      "limit": 4,
      "settings": [
        {
          "type": "image_picker",
          "id": "product_image",
          "label": "Product Image",
          "info": "Required: 1:1 square ratio. Recommended: 600×600px minimum."
        },
        {
          "type": "text",
          "id": "product_name",
          "label": "Product Name",
          "default": "",
          "info": "Recommended: 25-30 characters. Text will overflow with ellipsis if longer."
        },
        {
          "type": "text",
          "id": "cta_text",
          "label": "CTA Text",
          "default": "View",
          "info": "Recommended: 15-20 characters. Text will overflow with ellipsis if longer."
        },
        {
          "type": "url",
          "id": "cta_link",
          "label": "CTA Link",
          "info": "Destination URL when CTA is clicked."
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Glamor Collection - Studio",
      "blocks": []
    }
  ]
}
{% endschema %}
```

---

## CSS Implementation

### File: `assets/section-glamor-collection-studio.css`

```css
/* ==========================================================================
   Glamor Collection - The Studio Section
   ========================================================================== */

/* --------------------------------------------------------------------------
   Base Wrapper Styles
   -------------------------------------------------------------------------- */

.custom-section-glamor-collection__wrapper {
  position: relative;
  width: 100vw;
  height: 1528px; /* Fixed height for desktop */
  overflow: hidden;
  background-color: #beb6a9; /* Fallback color */
}

/* --------------------------------------------------------------------------
   Background Image
   -------------------------------------------------------------------------- */

.custom-section-glamor-collection__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.custom-section-glamor-collection__background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

/* --------------------------------------------------------------------------
   Headline Content
   -------------------------------------------------------------------------- */

.custom-section-glamor-collection__headline {
  position: absolute;
  z-index: 10;
}

.custom-section-glamor-collection__headline-text {
  font-family: 'Bickham Script Pro', serif;
  font-weight: 400;
  font-style: normal;
  font-size: 160px;
  line-height: 45px;
  color: #fffaf5;
  margin: 0;

  /* Position from Figma */
  position: absolute;
  left: calc(50% - 629.6px);
  top: calc(50% - 584.84px);
  width: 372px;
  height: 71.872px;
}

.custom-section-glamor-collection__subtitle {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-weight: 300;
  font-style: normal;
  font-size: 30px;
  line-height: 45px;
  color: #fffaf5;
  margin: 0;

  /* Position from Figma */
  position: absolute;
  left: calc(50% - 596.4px);
  top: calc(50% - 507.14px);
  width: 506.799px;
}

/* --------------------------------------------------------------------------
   Product Cards - Desktop (Absolute Positioning)
   -------------------------------------------------------------------------- */

.custom-section-glamor-collection__cards--desktop {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 5;
}

.custom-section-glamor-collection__cards--responsive {
  display: none; /* Hidden on desktop */
}

.custom-section-glamor-collection__card {
  position: absolute;
  background-color: rgba(27, 27, 27, 0.19);
  overflow: hidden;
}

/* Card Position 1 - Top Right */
.custom-section-glamor-collection__card--1 {
  left: 975.11px;
  top: 606.5px;
  width: 269px;
  height: 314px;
}

.custom-section-glamor-collection__card--1 .custom-section-glamor-collection__card-name {
  position: absolute;
  left: calc(50% - 64.3px);
  top: calc(50% - 135.96px);
  transform: translateX(-50%);
}

.custom-section-glamor-collection__card--1 .custom-section-glamor-collection__card-cta {
  position: absolute;
  left: calc(50% - 115.3px);
  top: calc(50% + 102.41px);
}

/* Card Position 2 - Bottom Left */
.custom-section-glamor-collection__card--2 {
  left: 377px;
  top: 1205.57px;
  width: 340px;
  height: 265px;
}

.custom-section-glamor-collection__card--2 .custom-section-glamor-collection__card-name {
  position: absolute;
  left: calc(50% - 105.37px);
  top: calc(50% - 113.29px);
  transform: translateX(-50%);
}

.custom-section-glamor-collection__card--2 .custom-section-glamor-collection__card-cta {
  position: absolute;
  left: calc(50% - 152.37px);
  top: calc(50% + 87.29px);
}

/* Card Position 3 - Bottom Right */
.custom-section-glamor-collection__card--3 {
  left: 1047.88px;
  top: 1167px;
  width: 275px;
  height: 288px;
}

.custom-section-glamor-collection__card--3 .custom-section-glamor-collection__card-name {
  position: absolute;
  left: calc(50% - 75.77px);
  top: calc(50% - 124.39px);
  transform: translateX(-50%);
}

.custom-section-glamor-collection__card--3 .custom-section-glamor-collection__card-cta {
  position: absolute;
  left: calc(50% - 117.77px);
  top: calc(50% + 91.19px);
}

/* Card Position 4 - Center Bottom */
.custom-section-glamor-collection__card--4 {
  left: 780px;
  top: 1027px;
  width: 214px;
  height: 212px;
}

.custom-section-glamor-collection__card--4 .custom-section-glamor-collection__card-name {
  position: absolute;
  left: calc(50% - 47px);
  top: calc(50% - 91.69px);
  transform: translateX(-50%);
}

.custom-section-glamor-collection__card--4 .custom-section-glamor-collection__card-cta {
  position: absolute;
  left: calc(50% - 94px);
  top: calc(50% + 52.57px);
}

/* --------------------------------------------------------------------------
   Product Card Content
   -------------------------------------------------------------------------- */

.custom-section-glamor-collection__card-overlay {
  position: relative;
  width: 100%;
  height: 100%;
}

.custom-section-glamor-collection__card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  z-index: 1;
}

.custom-section-glamor-collection__card-name {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-weight: 300;
  font-size: 24px;
  line-height: 30px;
  color: #fffaf5;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  z-index: 15;
}

.custom-section-glamor-collection__card-cta {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 40px;
  color: #fffaf5;
  text-align: center;
  text-decoration: underline;
  text-decoration-style: solid;
  text-underline-offset: 25%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: opacity 0.3s ease;
  z-index: 15;
  display: inline-block;
}

.custom-section-glamor-collection__card-cta:hover {
  opacity: 0.7;
}

/* --------------------------------------------------------------------------
   Responsive: Tablet (768px - 1024px)
   -------------------------------------------------------------------------- */

@media (max-width: 1024px) {

  /* Switch to 100vh height */
  .custom-section-glamor-collection__wrapper {
    height: 100vh;
  }

  /* Hide desktop absolute positioned cards */
  .custom-section-glamor-collection__cards--desktop {
    display: none;
  }

  /* Show responsive grid */
  .custom-section-glamor-collection__cards--responsive {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    z-index: 5;
  }

  /* Reset card positioning for grid */
  .custom-section-glamor-collection__card {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    left: auto;
    top: auto;
  }

  /* Center card content */
  .custom-section-glamor-collection__card-name {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 20px);
  }

  .custom-section-glamor-collection__card-cta {
    position: absolute;
    bottom: 15%;
    left: 50%;
    transform: translateX(-50%);
  }

  /* Scale down headline */
  .custom-section-glamor-collection__headline-text {
    font-size: 120px;
    left: 20px;
    top: 40px;
    width: auto;
  }

  .custom-section-glamor-collection__subtitle {
    font-size: 24px;
    left: 20px;
    top: 160px;
    width: auto;
    max-width: 400px;
  }
}

/* --------------------------------------------------------------------------
   Responsive: Mobile (< 768px)
   -------------------------------------------------------------------------- */

@media (max-width: 767px) {

  /* 2-column grid */
  .custom-section-glamor-collection__cards--responsive {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 16px;
  }

  /* Further scale down headline */
  .custom-section-glamor-collection__headline-text {
    font-size: 80px;
    line-height: 1;
    left: 16px;
    top: 30px;
  }

  .custom-section-glamor-collection__subtitle {
    font-size: 18px;
    line-height: 1.4;
    left: 16px;
    top: 120px;
    max-width: calc(100% - 32px);
  }

  /* Adjust card font sizes */
  .custom-section-glamor-collection__card-name {
    font-size: 18px;
    line-height: 24px;
  }

  .custom-section-glamor-collection__card-cta {
    font-size: 16px;
    line-height: 32px;
  }
}

/* --------------------------------------------------------------------------
   Responsive: Small Mobile (< 576px)
   -------------------------------------------------------------------------- */

@media (max-width: 575px) {

  .custom-section-glamor-collection__cards--responsive {
    gap: 10px;
    padding: 12px;
  }

  .custom-section-glamor-collection__headline-text {
    font-size: 60px;
  }

  .custom-section-glamor-collection__subtitle {
    font-size: 16px;
  }
}

/* --------------------------------------------------------------------------
   GSAP Animation Initial States (Desktop Only)
   -------------------------------------------------------------------------- */

@media (min-width: 1025px) {
  .custom-section-glamor-collection__headline,
  .custom-section-glamor-collection__card {
    opacity: 0;
  }
}
```

---

## JavaScript Implementation

### File: `assets/section-glamor-collection-studio.js`

```javascript
/**
 * Glamor Collection - The Studio Section
 * GSAP scroll animations (desktop only)
 */

(function() {
  'use strict';

  /**
   * Initialize GSAP animations for desktop only
   */
  const initAnimations = () => {
    // Only run on desktop (1025px and above)
    if (window.innerWidth < 1025) return;

    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.error('GSAP or ScrollTrigger not loaded. Animations will not run.');
      return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector('.custom-section-glamor-collection');
    if (!section) return;

    const headline = section.querySelector('.custom-section-glamor-collection__headline');
    const cards = section.querySelectorAll('.custom-section-glamor-collection__card');

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%', // When section is 80% from top of viewport
        toggleActions: 'play none none none',
        once: true, // Only animate once
      }
    });

    // Headline animation
    if (headline) {
      tl.fromTo(
        headline,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        0.1 // Delay
      );
    }

    // Product cards stagger animation
    if (cards.length > 0) {
      tl.fromTo(
        cards,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.15, // 0.15s between each card
        },
        0.4 // Delay (after headline starts)
      );
    }
  };

  /**
   * Initialize on DOMContentLoaded
   */
  const init = () => {
    // Wait for GSAP to load if using CDN
    if (typeof gsap !== 'undefined') {
      initAnimations();
    } else {
      // Fallback: Try again after a short delay
      setTimeout(() => {
        initAnimations();
      }, 100);
    }
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Reinitialize on window resize (debounced)
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Refresh ScrollTrigger on resize
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 250);
  });

})();
```

---

## GSAP Integration

### Option 1: CDN (Recommended for Quick Setup)

Add to `layout/theme.liquid` before closing `</head>`:

```liquid
<!-- GSAP Library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

### Option 2: NPM (For Build Process)

```bash
npm install gsap
```

Then import in your JavaScript:

```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
```

---

## Development Workflow

### Step 1: Setup
1. Create section file: `sections/custom-section-glamor-collection-studio.liquid`
2. Create CSS file: `assets/section-glamor-collection-studio.css`
3. Create JS file: `assets/section-glamor-collection-studio.js`
4. Ensure GSAP is loaded in `layout/theme.liquid`

### Step 2: Development
1. Run Shopify CLI: `shopify theme dev`
2. Access theme editor: `http://localhost:9292/admin/themes/current/editor`
3. Add section to a page
4. Test settings and blocks

### Step 3: Testing

**Desktop Testing (1440px+):**
- [ ] Wrapper is 1528px height
- [ ] Background image displays correctly
- [ ] Headline positioned top-left
- [ ] 4 product cards positioned as per Figma (absolute)
- [ ] GSAP animations trigger on scroll
- [ ] Headline fades in first
- [ ] Cards stagger in sequence

**Tablet Testing (768px - 1024px):**
- [ ] Wrapper switches to 100vh height
- [ ] Product cards in 4-column grid at bottom
- [ ] No animations
- [ ] All cards are square (1:1 aspect ratio)

**Mobile Testing (<768px):**
- [ ] Wrapper is 100vh height
- [ ] Product cards in 2-column grid at bottom
- [ ] No animations
- [ ] Headline scales appropriately
- [ ] Text remains readable

**Theme Editor Testing:**
- [ ] Can upload background image
- [ ] Can edit heading/subtitle text
- [ ] Can add up to 4 product blocks
- [ ] Can upload product images (1:1 ratio maintained)
- [ ] Can add product names (ellipsis works for long text)
- [ ] Can add CTA text and links
- [ ] Can delete/reorder blocks
- [ ] Changes reflect in preview

### Step 4: Performance Check
- [ ] Images are lazy loaded
- [ ] CSS is minified for production
- [ ] JavaScript is deferred
- [ ] GSAP only runs on desktop
- [ ] No console errors
- [ ] Smooth scroll performance

---

## Common Implementation Patterns

### Handling Empty States

```liquid
{%- comment -%} Show placeholder if no background image {%- endcomment -%}
{% if section.settings.background_image == blank %}
  <div class="custom-section-glamor-collection__background custom-section-glamor-collection__background--placeholder">
    <p>Add a background image in section settings</p>
  </div>
{% endif %}
```

### Product Image Aspect Ratio Enforcement

```css
.custom-section-glamor-collection__card-image {
  aspect-ratio: 1 / 1; /* Modern browsers */
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Fallback for older browsers */
@supports not (aspect-ratio: 1 / 1) {
  .custom-section-glamor-collection__card::before {
    content: '';
    display: block;
    padding-top: 100%; /* 1:1 ratio */
  }

  .custom-section-glamor-collection__card-image {
    position: absolute;
    top: 0;
    left: 0;
  }
}
```

### Character Limit Enforcement

Liquid truncate (recommended):
```liquid
{{ block.settings.product_name | truncate: 30 }}
```

CSS ellipsis (additional safety):
```css
.custom-section-glamor-collection__card-name {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

---

## Troubleshooting

### Issue: GSAP animations not working

**Solution:**
1. Check browser console for errors
2. Verify GSAP CDN links in `theme.liquid`
3. Ensure ScrollTrigger plugin is loaded
4. Check viewport width (animations only run >= 1025px)
5. Add debug logging:
```javascript
console.log('GSAP loaded:', typeof gsap !== 'undefined');
console.log('ScrollTrigger loaded:', typeof ScrollTrigger !== 'undefined');
console.log('Viewport width:', window.innerWidth);
```

### Issue: Product cards not positioned correctly

**Solution:**
1. Verify exact pixel values from Figma node 251:90
2. Check wrapper height is 1528px on desktop
3. Ensure wrapper has `position: relative`
4. Check card classes match (`.custom-section-glamor-collection__card--1`, etc.)

### Issue: 100vh not working on mobile Safari

**Solution:**
```css
.custom-section-glamor-collection__wrapper {
  height: 100vh;
  height: -webkit-fill-available; /* Safari fix */
}
```

Or use JavaScript:
```javascript
const setVH = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setVH();
window.addEventListener('resize', setVH);
```

Then in CSS:
```css
.custom-section-glamor-collection__wrapper {
  height: calc(var(--vh, 1vh) * 100);
}
```

### Issue: Images not maintaining 1:1 ratio

**Solution:**
1. Add `aspect-ratio: 1 / 1` to card wrapper
2. Ensure `object-fit: cover` on image
3. Test with different image aspect ratios
4. Add fallback for older browsers (see pattern above)

---

## Performance Optimization

### Lazy Loading
All images use `loading="lazy"` attribute for native lazy loading.

### Critical CSS
Consider inlining critical CSS for above-the-fold content:
```liquid
<style>
  .custom-section-glamor-collection__wrapper {
    /* Critical styles here */
  }
</style>
```

### Image Optimization
- Use Shopify's `image_url` filter with appropriate widths
- Provide `srcset` for responsive images
- Compress images before upload (80-85% quality)
- Consider WebP format with JPG fallback

### JavaScript Optimization
- GSAP is loaded from CDN with caching
- Script tag uses `defer` attribute
- Animations only initialize on desktop
- Event listeners use debouncing where appropriate

---

## Accessibility Checklist

- [ ] Background image has descriptive alt text
- [ ] Product images have alt text (defaults to product name)
- [ ] Headline uses semantic `<h2>` tag
- [ ] CTA links are keyboard accessible
- [ ] Focus states are visible
- [ ] Color contrast meets WCAG AA standards
- [ ] Text remains readable at 200% zoom
- [ ] Screen readers can access all content

---

## Final Checklist Before Deployment

- [ ] All three markdown docs read and understood
- [ ] Figma node 251:90 referenced for exact values
- [ ] All files created in correct locations
- [ ] BEM naming conventions followed
- [ ] CSS follows project standards
- [ ] JavaScript follows project standards
- [ ] GSAP integrated correctly
- [ ] Tested on desktop (1440px+)
- [ ] Tested on tablet (768px-1024px)
- [ ] Tested on mobile (<768px)
- [ ] All breakpoints work correctly
- [ ] Section settings functional in theme editor
- [ ] Blocks can be added/removed/reordered
- [ ] Images load correctly
- [ ] Animations work on desktop
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] Accessibility requirements met
- [ ] Code is clean and commented
- [ ] No core theme files modified
- [ ] Ready for production deployment

---

## Additional Resources

- Figma Node: https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=251-90&m=dev
- GSAP Docs: https://greensock.com/docs/
- ScrollTrigger Docs: https://greensock.com/docs/v3/Plugins/ScrollTrigger
- Shopify Section Docs: https://shopify.dev/docs/themes/architecture/sections
- BEM Methodology: http://getbem.com/

---

## Questions or Issues

For implementation questions:
1. Review this implementation guide
2. Check `02-design-tokens.md` for exact specifications
3. Reference `docs/rules/` for coding standards
4. Inspect Figma node for visual clarification
5. Test with Shopify CLI theme editor
6. Ask for clarification if specifications are unclear
