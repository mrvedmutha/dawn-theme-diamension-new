# Four Collection Arch Section - Technical Implementation

## 📋 Overview

Complete technical specification for implementing the Four Collection Arch section in Shopify Liquid with GSAP animations.

**Complexity:** Medium
- Liquid: Blocks-based structure
- CSS: BEM methodology, responsive grid
- JavaScript: GSAP hover animations (desktop only)

---

## 📁 File Structure

```
sections/
└── custom-section-four-collection-arch.liquid

assets/
├── section-four-collection-arch.css
└── section-four-collection-arch.js
```

---

## 💻 Liquid Implementation

### File: `sections/custom-section-four-collection-arch.liquid`

```liquid
{{ 'section-four-collection-arch.css' | asset_url | stylesheet_tag }}

{%- liquid
  assign heading = section.settings.heading
  assign heading_color = section.settings.heading_color
  assign mobile_aspect_ratio = section.settings.mobile_aspect_ratio
-%}

<section
  class="custom-section-four-collection-arch"
  style="
    --heading-color: {{ heading_color }};
    --mobile-aspect-ratio: {% if mobile_aspect_ratio == '5-4' %}4 / 5{% elsif mobile_aspect_ratio == '9-16' %}9 / 16{% else %}1 / 1{% endif %};
  "
  data-section-id="{{ section.id }}"
>
  {%- if heading != blank -%}
    <div class="custom-section-four-collection-arch__header">
      <h2 class="custom-section-four-collection-arch__heading">
        {{ heading }}
      </h2>
    </div>
  {%- endif -%}

  {%- if section.blocks.size > 0 -%}
    <div class="custom-section-four-collection-arch__grid">
      {%- for block in section.blocks -%}
        {%- liquid
          assign card_image = block.settings.image
          assign card_title = block.settings.title
          assign cta_text = block.settings.cta_text
          assign cta_link = block.settings.cta_link
          assign text_color = block.settings.text_color
        -%}

        <div
          class="custom-section-four-collection-arch__card"
          data-block-id="{{ block.id }}"
          style="--card-text-color: {{ text_color }};"
          {{ block.shopify_attributes }}
        >
          {%- if card_image != blank -%}
            <img
              src="{{ card_image | image_url: width: 800 }}"
              srcset="
                {{ card_image | image_url: width: 400 }} 400w,
                {{ card_image | image_url: width: 800 }} 800w,
                {{ card_image | image_url: width: 1200 }} 1200w
              "
              sizes="(max-width: 767px) 50vw, 25vw"
              alt="{{ card_image.alt | escape }}"
              class="custom-section-four-collection-arch__card-image"
              loading="lazy"
            >
          {%- endif -%}

          <div class="custom-section-four-collection-arch__card-content">
            {%- if card_title != blank -%}
              <h3 class="custom-section-four-collection-arch__card-title">
                {{ card_title }}
              </h3>
            {%- endif -%}

            {%- if cta_text != blank -%}
              <span class="custom-section-four-collection-arch__card-cta">
                {{ cta_text }}
              </span>
            {%- endif -%}
          </div>

          {%- if cta_link != blank -%}
            <a
              href="{{ cta_link }}"
              class="custom-section-four-collection-arch__card-link"
              aria-label="{{ card_title | escape }}"
            >
              <span class="visually-hidden">{{ card_title }}</span>
            </a>
          {%- endif -%}
        </div>
      {%- endfor -%}
    </div>
  {%- endif -%}
</section>

<script src="{{ 'section-four-collection-arch.js' | asset_url }}" defer></script>

{% schema %}
{
  "name": "Four Collection Arch",
  "class": "section-four-collection-arch",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Section Heading",
      "default": "YOUR STYLE, OUR COLLECTION"
    },
    {
      "type": "color",
      "id": "heading_color",
      "label": "Heading Color",
      "default": "#183754"
    },
    {
      "type": "header",
      "content": "Mobile Settings"
    },
    {
      "type": "select",
      "id": "mobile_aspect_ratio",
      "label": "Mobile Card Aspect Ratio",
      "options": [
        {
          "value": "1-1",
          "label": "1:1 (Square)"
        },
        {
          "value": "5-4",
          "label": "5:4 (Portrait)"
        },
        {
          "value": "9-16",
          "label": "9:16 (Tall Portrait)"
        }
      ],
      "default": "1-1",
      "info": "Controls card height on mobile devices"
    }
  ],
  "blocks": [
    {
      "type": "collection_card",
      "name": "Collection Card",
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "Collection Image",
          "info": "Recommended size: 800x1200px"
        },
        {
          "type": "text",
          "id": "title",
          "label": "Collection Title",
          "default": "Collection Name"
        },
        {
          "type": "text",
          "id": "cta_text",
          "label": "CTA Text",
          "default": "View Collection"
        },
        {
          "type": "url",
          "id": "cta_link",
          "label": "CTA Link"
        },
        {
          "type": "color",
          "id": "text_color",
          "label": "Text Color",
          "default": "#FFFAF5"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Four Collection Arch",
      "blocks": [
        {
          "type": "collection_card",
          "settings": {
            "title": "Engagement & Bridal",
            "cta_text": "View Collection"
          }
        },
        {
          "type": "collection_card",
          "settings": {
            "title": "Everyday Essentials",
            "cta_text": "View Collection"
          }
        },
        {
          "type": "collection_card",
          "settings": {
            "title": "Statement Jewelry",
            "cta_text": "View Collection"
          }
        },
        {
          "type": "collection_card",
          "settings": {
            "title": "Gifts That Shine",
            "cta_text": "View Collection"
          }
        }
      ]
    }
  ]
}
{% endschema %}
```

---

## 🎨 CSS Implementation

### File: `assets/section-four-collection-arch.css`

```css
/* =============================================================================
   Four Collection Arch Section
   ============================================================================= */

/* Section Container
   ========================================================================== */

.custom-section-four-collection-arch {
  height: 640px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

/* Section Header
   ========================================================================== */

.custom-section-four-collection-arch__header {
  padding: 24px 0;
  text-align: center;
}

.custom-section-four-collection-arch__heading {
  font-family: 'Neue Haas Grotesk Display Pro', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 300;
  font-size: 40px;
  line-height: 45px;
  text-transform: uppercase;
  color: var(--heading-color, #183754);
  margin: 0;
  letter-spacing: normal;
}

/* Collection Grid
   ========================================================================== */

.custom-section-four-collection-arch__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  height: calc(640px - 88px); /* Section height minus header (40px + 48px padding) */
}

/* Collection Card
   ========================================================================== */

.custom-section-four-collection-arch__card {
  position: relative;
  height: 544px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 0;
  transition: border-radius 0.6s ease;
}

.custom-section-four-collection-arch__card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.custom-section-four-collection-arch__card-content {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.custom-section-four-collection-arch__card-link {
  position: absolute;
  inset: 0;
  z-index: 3;
  text-decoration: none;
}

.custom-section-four-collection-arch__card-link .visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Card Title
   ========================================================================== */

.custom-section-four-collection-arch__card-title {
  position: absolute;
  bottom: 152px;
  left: 0;
  right: 0;
  width: 100%;
  padding: 0 40px;
  margin: 0;
  text-align: center;
  font-family: 'Neue Haas Grotesk Display Pro', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 300;
  font-size: 40px;
  line-height: 50.309px;
  text-transform: uppercase;
  color: var(--card-text-color, #FFFAF5);
  letter-spacing: normal;
}

/* Card CTA
   ========================================================================== */

.custom-section-four-collection-arch__card-cta {
  position: absolute;
  bottom: 56px;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  font-family: 'Neue Montreal', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 40px;
  color: var(--card-text-color, #FFFAF5);
  text-decoration: underline;
  text-decoration-style: solid;
  text-underline-offset: 25%;
  opacity: 0;
  transition: opacity 0.4s ease, transform 0.4s ease;
}

/* Desktop Hover Effects
   ========================================================================== */

@media (min-width: 768px) {
  .custom-section-four-collection-arch__card:hover {
    /* Arch effect applied via GSAP */
  }

  .custom-section-four-collection-arch__card:hover .custom-section-four-collection-arch__card-cta {
    /* CTA animation applied via GSAP */
  }
}

/* =============================================================================
   Responsive Styles
   ============================================================================= */

/* Tablet (1024px)
   ========================================================================== */

@media (max-width: 1024px) {
  .custom-section-four-collection-arch__grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .custom-section-four-collection-arch__card {
    height: 544px;
  }

  /* Show CTA on tablet */
  .custom-section-four-collection-arch__card-cta {
    opacity: 1;
  }
}

/* Mobile (767px and below)
   ========================================================================== */

@media (max-width: 767px) {
  .custom-section-four-collection-arch {
    height: auto;
  }

  .custom-section-four-collection-arch__heading {
    font-size: 32px;
    line-height: 36px;
  }

  .custom-section-four-collection-arch__grid {
    grid-template-columns: repeat(2, 1fr);
    height: auto;
  }

  .custom-section-four-collection-arch__card {
    height: auto;
    aspect-ratio: var(--mobile-aspect-ratio, 1 / 1);
  }

  .custom-section-four-collection-arch__card-title {
    bottom: 80px;
    font-size: 28px;
    line-height: 32px;
    padding: 0 20px;
  }

  .custom-section-four-collection-arch__card-cta {
    bottom: 30px;
    font-size: 16px;
    line-height: 24px;
    opacity: 1; /* Always visible on mobile */
  }
}

/* Small Mobile (375px)
   ========================================================================== */

@media (max-width: 375px) {
  .custom-section-four-collection-arch__heading {
    font-size: 28px;
    line-height: 32px;
    padding: 0 16px;
  }

  .custom-section-four-collection-arch__card-title {
    bottom: 60px;
    font-size: 24px;
    line-height: 28px;
    padding: 0 16px;
  }

  .custom-section-four-collection-arch__card-cta {
    bottom: 24px;
    font-size: 14px;
    line-height: 20px;
  }
}
```

---

## ⚡ JavaScript Implementation (GSAP)

### File: `assets/section-four-collection-arch.js`

```javascript
/**
 * Four Collection Arch Section
 * GSAP hover animations for desktop only
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    DESKTOP_MIN_WIDTH: 768,
    ARCH_DURATION: 0.6,
    CTA_DURATION: 0.4,
    ARCH_RADIUS: '50%',
    EASING: 'power2.out'
  };

  // Check if GSAP is available
  if (typeof gsap === 'undefined') {
    console.error('GSAP is required for Four Collection Arch animations');
    return;
  }

  /**
   * Check if current viewport is desktop
   */
  const isDesktop = () => {
    return window.innerWidth >= CONFIG.DESKTOP_MIN_WIDTH;
  };

  /**
   * Initialize hover animations for a card
   */
  const initCardHover = (card) => {
    const cta = card.querySelector('.custom-section-four-collection-arch__card-cta');

    if (!cta) return;

    // Mouse enter handler
    const handleMouseEnter = () => {
      if (!isDesktop()) return;

      // Arch effect on card
      gsap.to(card, {
        borderRadius: `${CONFIG.ARCH_RADIUS} ${CONFIG.ARCH_RADIUS} 0 0`,
        duration: CONFIG.ARCH_DURATION,
        ease: CONFIG.EASING
      });

      // CTA animation: fade in while moving up
      gsap.fromTo(cta,
        {
          opacity: 0,
          y: 10
        },
        {
          opacity: 1,
          y: 0,
          duration: CONFIG.CTA_DURATION,
          ease: CONFIG.EASING
        }
      );
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      if (!isDesktop()) return;

      // Remove arch effect
      gsap.to(card, {
        borderRadius: '0',
        duration: CONFIG.ARCH_DURATION,
        ease: CONFIG.EASING
      });

      // Fade out CTA
      gsap.to(cta, {
        opacity: 0,
        y: 10,
        duration: CONFIG.CTA_DURATION,
        ease: CONFIG.EASING
      });
    };

    // Attach event listeners
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    // Store handlers for cleanup
    card._hoverHandlers = {
      mouseenter: handleMouseEnter,
      mouseleave: handleMouseLeave
    };
  };

  /**
   * Remove hover animations from a card
   */
  const destroyCardHover = (card) => {
    if (card._hoverHandlers) {
      card.removeEventListener('mouseenter', card._hoverHandlers.mouseenter);
      card.removeEventListener('mouseleave', card._hoverHandlers.mouseleave);
      delete card._hoverHandlers;
    }

    // Reset styles
    gsap.set(card, { borderRadius: '0' });
    const cta = card.querySelector('.custom-section-four-collection-arch__card-cta');
    if (cta) {
      gsap.set(cta, { opacity: isDesktop() ? 0 : 1, y: 0 });
    }
  };

  /**
   * Initialize all cards in a section
   */
  const initSection = (section) => {
    const cards = section.querySelectorAll('.custom-section-four-collection-arch__card');

    cards.forEach(card => {
      initCardHover(card);
    });

    // Store reference for cleanup
    section._initialized = true;
  };

  /**
   * Destroy animations in a section
   */
  const destroySection = (section) => {
    const cards = section.querySelectorAll('.custom-section-four-collection-arch__card');

    cards.forEach(card => {
      destroyCardHover(card);
    });

    section._initialized = false;
  };

  /**
   * Handle window resize
   */
  let resizeTimeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const sections = document.querySelectorAll('.custom-section-four-collection-arch');

      sections.forEach(section => {
        if (section._initialized) {
          destroySection(section);
          initSection(section);
        }
      });
    }, 250);
  };

  /**
   * Initialize on DOM ready
   */
  const init = () => {
    const sections = document.querySelectorAll('.custom-section-four-collection-arch');

    sections.forEach(section => {
      initSection(section);
    });

    // Handle window resize
    window.addEventListener('resize', handleResize);
  };

  /**
   * Cleanup on page unload
   */
  const cleanup = () => {
    const sections = document.querySelectorAll('.custom-section-four-collection-arch');

    sections.forEach(section => {
      destroySection(section);
    });

    window.removeEventListener('resize', handleResize);
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', cleanup);

  // Shopify Theme Editor support
  if (Shopify && Shopify.designMode) {
    document.addEventListener('shopify:section:load', (event) => {
      const section = event.target.querySelector('.custom-section-four-collection-arch');
      if (section) {
        initSection(section);
      }
    });

    document.addEventListener('shopify:section:unload', (event) => {
      const section = event.target.querySelector('.custom-section-four-collection-arch');
      if (section) {
        destroySection(section);
      }
    });

    document.addEventListener('shopify:block:select', (event) => {
      const card = event.target.closest('.custom-section-four-collection-arch__card');
      if (card && !card._hoverHandlers) {
        initCardHover(card);
      }
    });
  }

})();
```

---

## 🔧 Implementation Notes

### GSAP Loading

Ensure GSAP is loaded before the section JavaScript. Add to `theme.liquid` if not already present:

```liquid
<!-- In theme.liquid <head> or before closing </body> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
```

Or if using npm/yarn:
```bash
npm install gsap
```

### Font Loading

Add fonts to `theme.liquid` if not already present:

```liquid
<!-- In theme.liquid <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Neue+Haas+Grotesk+Display:wght@300&display=swap" rel="stylesheet">
```

### BEM Class Naming

All classes follow BEM methodology:
- **Block:** `.custom-section-four-collection-arch`
- **Elements:** `__header`, `__grid`, `__card`, `__card-image`, etc.
- **Modifiers:** Not used in this section (could add `--loading`, `--error` if needed)

### Mobile Aspect Ratio Implementation

The mobile aspect ratio is controlled via CSS custom property:

**Liquid:**
```liquid
--mobile-aspect-ratio: {% if mobile_aspect_ratio == '5-4' %}4 / 5{% elsif mobile_aspect_ratio == '9-16' %}9 / 16{% else %}1 / 1{% endif %};
```

**CSS:**
```css
@media (max-width: 767px) {
  .custom-section-four-collection-arch__card {
    aspect-ratio: var(--mobile-aspect-ratio, 1 / 1);
  }
}
```

### Hover Animation Logic

**Desktop (>= 768px):**
1. User hovers over card
2. GSAP animates `border-radius: 50% 50% 0 0` (arch effect)
3. CTA fades in from `opacity: 0` to `opacity: 1` while moving up
4. On mouse leave, animations reverse

**Mobile/Tablet (< 768px):**
- No event listeners attached
- CTA always visible (`opacity: 1` in CSS)
- No border-radius changes

### Performance Optimizations

1. **Lazy Loading:** Images use `loading="lazy"`
2. **Deferred JS:** Script loads with `defer` attribute
3. **Debounced Resize:** Window resize handler debounced to 250ms
4. **Event Delegation:** Could be implemented for large numbers of cards
5. **GSAP Efficiency:** Uses `gsap.to()` and `gsap.fromTo()` for optimal performance

---

## 🛠️ Customization Guide

### Changing Card Height (Desktop)

**Location:** `assets/section-four-collection-arch.css`

```css
/* Line ~70 */
.custom-section-four-collection-arch__card {
  height: 544px; /* Change this value */
}
```

If changing height, adjust text positions proportionally:

```css
.custom-section-four-collection-arch__card-title {
  bottom: 152px; /* Adjust proportionally */
}

.custom-section-four-collection-arch__card-cta {
  bottom: 56px; /* Adjust proportionally */
}
```

### Changing Animation Speed

**Location:** `assets/section-four-collection-arch.js`

```javascript
// Line ~13-16
const CONFIG = {
  ARCH_DURATION: 0.6,  // Arch animation duration (seconds)
  CTA_DURATION: 0.4,   // CTA animation duration (seconds)
  EASING: 'power2.out' // Easing function
};
```

### Adding Overlay Color Option

To add an optional overlay for better text readability:

**Schema (add to section settings):**
```json
{
  "type": "color",
  "id": "overlay_color",
  "label": "Overlay Color",
  "default": "#000000"
},
{
  "type": "range",
  "id": "overlay_opacity",
  "label": "Overlay Opacity",
  "min": 0,
  "max": 100,
  "step": 5,
  "unit": "%",
  "default": 0
}
```

**Liquid (add to card):**
```liquid
<div class="custom-section-four-collection-arch__card-overlay"
     style="background-color: {{ section.settings.overlay_color }}; opacity: {{ section.settings.overlay_opacity | divided_by: 100.0 }};"></div>
```

**CSS (add):**
```css
.custom-section-four-collection-arch__card-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
```

---

## ✅ Implementation Checklist

### Phase 1: File Creation
- [ ] Create `sections/custom-section-four-collection-arch.liquid`
- [ ] Create `assets/section-four-collection-arch.css`
- [ ] Create `assets/section-four-collection-arch.js`
- [ ] Verify file naming follows conventions

### Phase 2: Liquid Template
- [ ] Copy Liquid code from this document
- [ ] Verify schema settings are correct
- [ ] Add 4 default blocks to presets
- [ ] Test in Shopify theme editor
- [ ] Verify blocks can be added/removed/reordered

### Phase 3: CSS Styling
- [ ] Copy CSS code from this document
- [ ] Verify BEM class names match Liquid
- [ ] Test desktop layout (4 columns)
- [ ] Test tablet layout (4 columns, CTA visible)
- [ ] Test mobile layout (2 columns, aspect ratio)
- [ ] Verify text positioning (152px, 56px)
- [ ] Check responsive breakpoints

### Phase 4: JavaScript (GSAP)
- [ ] Ensure GSAP is loaded in theme
- [ ] Copy JS code from this document
- [ ] Test hover animations on desktop
- [ ] Verify no animations on mobile/tablet
- [ ] Test window resize behavior
- [ ] Check for console errors
- [ ] Test in Shopify theme editor (section load/unload)

### Phase 5: Manual Verification
- [ ] Upload test images via theme editor
- [ ] Edit all section settings
- [ ] Edit all block settings
- [ ] Test mobile aspect ratio switcher
- [ ] Verify hover arch effect (desktop)
- [ ] Verify CTA fade animation (desktop)
- [ ] Verify CTA always visible (mobile/tablet)
- [ ] Test all viewport sizes
- [ ] Check text readability
- [ ] Verify links work correctly
- [ ] Test with 2, 3, 4, 5+ cards

---

## 🐛 Troubleshooting

### Issue: GSAP animations not working
**Solutions:**
1. Check browser console for GSAP errors
2. Verify GSAP is loaded before section JS
3. Check `window.innerWidth >= 768` condition
4. Verify class names match between Liquid and JS

### Issue: CTA visible on desktop (should be hidden)
**Solutions:**
1. Check CSS: `.custom-section-four-collection-arch__card-cta { opacity: 0; }`
2. Verify no inline styles overriding opacity
3. Check if JS is running (console.log in handlers)

### Issue: Mobile cards not using aspect ratio
**Solutions:**
1. Check CSS custom property `--mobile-aspect-ratio`
2. Verify media query `@media (max-width: 767px)`
3. Check browser support for `aspect-ratio` property
4. Add fallback: `height: auto;` or min-height

### Issue: Hover animation choppy
**Solutions:**
1. Reduce GSAP duration (try 0.3s)
2. Use simpler easing (try 'ease')
3. Check for CSS transitions conflicting with GSAP
4. Use `will-change: border-radius` (sparingly)

### Issue: Cards not equal width
**Solutions:**
1. Verify CSS: `grid-template-columns: repeat(4, 1fr)`
2. Check for padding/margin on cards
3. Verify no max-width on cards
4. Check grid gap is 0

---

## 📚 Reference

### BEM Methodology
- Block: `.custom-section-four-collection-arch`
- Elements: `__header`, `__heading`, `__grid`, `__card`, etc.
- Follow project standards in `@docs/rules/05-CSS-STANDARDS.md`

### GSAP Documentation
- Official docs: https://greensock.com/docs/
- Easing visualizer: https://greensock.com/ease-visualizer/
- GSAP 3 migration: https://greensock.com/3-migration/

### Shopify Liquid
- Section schema: https://shopify.dev/docs/themes/architecture/sections/section-schema
- Blocks: https://shopify.dev/docs/themes/architecture/sections/section-schema#blocks
- Image filters: https://shopify.dev/docs/api/liquid/filters/image_url

---

**Last Updated:** 2025-12-16
**Version:** 1.0.0
**Status:** Ready for implementation
**Files Required:** 3 files (Liquid, CSS, JS)
