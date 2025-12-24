# Custom Diamension Quote Gallery - Implementation Guide

**Version:** 1.0.0
**Date:** 2025-12-24

---

## 📋 Pre-Implementation Checklist

Before starting development, ensure you have:

- [ ] Read **ALL** required rules in `docs/rules/` folder
- [ ] Reviewed Figma node `12:8854` thoroughly
- [ ] Reviewed `design-tokens.md` for all specifications
- [ ] Confirmed GSAP and ScrollTrigger are available in theme
- [ ] Collected all required assets (images, logo SVG, fonts)
- [ ] Shopify CLI is running (`shopify theme dev`)

---

## 📁 Files to Create

### 1. Liquid Section File
**Path:** `sections/custom-section-diamension-quote-gallery.liquid`

### 2. CSS File
**Path:** `assets/section-diamension-quote-gallery.css`

### 3. JavaScript File
**Path:** `assets/section-diamension-quote-gallery.js`

---

## 🏗️ Implementation Steps

### Step 1: Create Liquid Section File

**File:** `sections/custom-section-diamension-quote-gallery.liquid`

```liquid
{{ 'section-diamension-quote-gallery.css' | asset_url | stylesheet_tag }}

<div class="custom-section-diamension-quote-gallery js-quote-gallery-section"
     style="background-color: {{ section.settings.background_color }};">
  <div class="custom-section-diamension-quote-gallery__container">

    {%- comment -%} Image 1 - Top Center {%- endcomment -%}
    {% if section.settings.image_1 != blank %}
      <div class="custom-section-diamension-quote-gallery__image-wrapper custom-section-diamension-quote-gallery__image-wrapper--1 js-parallax-image">
        <img
          src="{{ section.settings.image_1 | image_url: width: 800 }}"
          srcset="{{ section.settings.image_1 | image_url: width: 400 }} 400w,
                  {{ section.settings.image_1 | image_url: width: 600 }} 600w,
                  {{ section.settings.image_1 | image_url: width: 800 }} 800w"
          sizes="(max-width: 767px) 100vw, 327px"
          alt="{{ section.settings.image_1.alt | escape }}"
          class="custom-section-diamension-quote-gallery__image"
          loading="lazy"
        >
      </div>
    {% endif %}

    {%- comment -%} Image 2 - Left Top {%- endcomment -%}
    {% if section.settings.image_2 != blank %}
      <div class="custom-section-diamension-quote-gallery__image-wrapper custom-section-diamension-quote-gallery__image-wrapper--2 js-parallax-image">
        <img
          src="{{ section.settings.image_2 | image_url: width: 800 }}"
          srcset="{{ section.settings.image_2 | image_url: width: 400 }} 400w,
                  {{ section.settings.image_2 | image_url: width: 600 }} 600w,
                  {{ section.settings.image_2 | image_url: width: 800 }} 800w"
          sizes="(max-width: 767px) 50vw, 327px"
          alt="{{ section.settings.image_2.alt | escape }}"
          class="custom-section-diamension-quote-gallery__image"
          loading="lazy"
        >
      </div>
    {% endif %}

    {%- comment -%} Image 3 - Left Middle {%- endcomment -%}
    {% if section.settings.image_3 != blank %}
      <div class="custom-section-diamension-quote-gallery__image-wrapper custom-section-diamension-quote-gallery__image-wrapper--3 js-parallax-image">
        <img
          src="{{ section.settings.image_3 | image_url: width: 800 }}"
          srcset="{{ section.settings.image_3 | image_url: width: 400 }} 400w,
                  {{ section.settings.image_3 | image_url: width: 600 }} 600w,
                  {{ section.settings.image_3 | image_url: width: 800 }} 800w"
          sizes="(max-width: 767px) 50vw, 289px"
          alt="{{ section.settings.image_3.alt | escape }}"
          class="custom-section-diamension-quote-gallery__image"
          loading="lazy"
        >
      </div>
    {% endif %}

    {%- comment -%} Image 4 - Right Top {%- endcomment -%}
    {% if section.settings.image_4 != blank %}
      <div class="custom-section-diamension-quote-gallery__image-wrapper custom-section-diamension-quote-gallery__image-wrapper--4 js-parallax-image">
        <img
          src="{{ section.settings.image_4 | image_url: width: 800 }}"
          srcset="{{ section.settings.image_4 | image_url: width: 400 }} 400w,
                  {{ section.settings.image_4 | image_url: width: 600 }} 600w,
                  {{ section.settings.image_4 | image_url: width: 800 }} 800w"
          sizes="(max-width: 767px) 50vw, 327px"
          alt="{{ section.settings.image_4.alt | escape }}"
          class="custom-section-diamension-quote-gallery__image"
          loading="lazy"
        >
      </div>
    {% endif %}

    {%- comment -%} Image 5 - Right Bottom {%- endcomment -%}
    {% if section.settings.image_5 != blank %}
      <div class="custom-section-diamension-quote-gallery__image-wrapper custom-section-diamension-quote-gallery__image-wrapper--5 js-parallax-image">
        <img
          src="{{ section.settings.image_5 | image_url: width: 800 }}"
          srcset="{{ section.settings.image_5 | image_url: width: 400 }} 400w,
                  {{ section.settings.image_5 | image_url: width: 600 }} 600w,
                  {{ section.settings.image_5 | image_url: width: 800 }} 800w"
          sizes="(max-width: 767px) 50vw, 327px"
          alt="{{ section.settings.image_5.alt | escape }}"
          class="custom-section-diamension-quote-gallery__image"
          loading="lazy"
        >
      </div>
    {% endif %}

    {%- comment -%} Center Content (Logo + Quote) {%- endcomment -%}
    <div class="custom-section-diamension-quote-gallery__content">
      {% if section.settings.logo != blank %}
        <div class="custom-section-diamension-quote-gallery__logo">
          <img
            src="{{ section.settings.logo | image_url }}"
            alt="{{ section.settings.logo.alt | default: 'Logo' | escape }}"
            width="46"
            height="74"
          >
        </div>
      {% endif %}

      {% if section.settings.quote_text != blank %}
        <p class="custom-section-diamension-quote-gallery__quote">
          {{ section.settings.quote_text }}
        </p>
      {% endif %}
    </div>

  </div>
</div>

<script src="{{ 'section-diamension-quote-gallery.js' | asset_url }}" defer></script>

{% schema %}
{
  "name": "Diamension Quote Gallery",
  "tag": "section",
  "class": "section-diamension-quote-gallery",
  "settings": [
    {
      "type": "header",
      "content": "Images"
    },
    {
      "type": "image_picker",
      "id": "image_1",
      "label": "Image 1 - Top Center"
    },
    {
      "type": "image_picker",
      "id": "image_2",
      "label": "Image 2 - Left Top"
    },
    {
      "type": "image_picker",
      "id": "image_3",
      "label": "Image 3 - Left Middle"
    },
    {
      "type": "image_picker",
      "id": "image_4",
      "label": "Image 4 - Right Top"
    },
    {
      "type": "image_picker",
      "id": "image_5",
      "label": "Image 5 - Right Bottom"
    },
    {
      "type": "header",
      "content": "Content"
    },
    {
      "type": "image_picker",
      "id": "logo",
      "label": "Logo (SVG recommended)"
    },
    {
      "type": "text",
      "id": "quote_text",
      "label": "Quote Text",
      "default": "Glamour is a condition, not a commodity."
    },
    {
      "type": "header",
      "content": "Settings"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background Color",
      "default": "#fffaf5"
    },
    {
      "type": "checkbox",
      "id": "enable_parallax",
      "label": "Enable Parallax Effect (Desktop only)",
      "default": true
    }
  ],
  "presets": [
    {
      "name": "Diamension Quote Gallery"
    }
  ]
}
{% endschema %}
```

---

### Step 2: Create CSS File

**File:** `assets/section-diamension-quote-gallery.css`

```css
/* ============================================================================
   Custom Section - Diamension Quote Gallery
   ============================================================================ */

/* CSS Variables */
:root {
  --quote-gallery-bg: #fffaf5;
  --quote-gallery-image-bg: #ffffff;
  --quote-gallery-text: #183754;
  --quote-gallery-font-family: 'Neue Haas Grotesk Display Pro', 'Neue Haas Display', sans-serif;
  --quote-gallery-font-size: 30px;
  --quote-gallery-line-height: 45px;
  --quote-gallery-max-width: 1440px;
}

/* ============================================================================
   Block - Section Container
   ============================================================================ */

.custom-section-diamension-quote-gallery {
  background-color: var(--quote-gallery-bg);
  padding: 80px 40px;
  min-height: 100vh;
  position: relative;
}

.custom-section-diamension-quote-gallery__container {
  max-width: var(--quote-gallery-max-width);
  margin: 0 auto;
  position: relative;
  min-height: 1101px;
}

/* ============================================================================
   Element - Image Wrappers
   ============================================================================ */

.custom-section-diamension-quote-gallery__image-wrapper {
  position: absolute;
  background-color: var(--quote-gallery-image-bg);
  overflow: hidden;
}

.custom-section-diamension-quote-gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Image 1 - Top Center */
.custom-section-diamension-quote-gallery__image-wrapper--1 {
  width: 327px;
  height: 427px;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  z-index: 3;
}

/* Image 2 - Left Top */
.custom-section-diamension-quote-gallery__image-wrapper--2 {
  width: 327px;
  height: 320px;
  left: 0;
  top: 213px;
  z-index: 2;
}

/* Image 3 - Left Middle */
.custom-section-diamension-quote-gallery__image-wrapper--3 {
  width: 289px;
  height: 378px;
  left: 128px;
  top: 342px;
  z-index: 4;
}

/* Image 4 - Right Top */
.custom-section-diamension-quote-gallery__image-wrapper--4 {
  width: 327px;
  height: 427px;
  right: 0;
  top: 536px;
  z-index: 2;
}

/* Image 5 - Right Bottom */
.custom-section-diamension-quote-gallery__image-wrapper--5 {
  width: 327px;
  height: 226px;
  right: 164px;
  top: 876px;
  z-index: 2;
}

/* ============================================================================
   Element - Center Content
   ============================================================================ */

.custom-section-diamension-quote-gallery__content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 5;
  max-width: 676px;
  width: 100%;
  padding: 0 20px;
}

.custom-section-diamension-quote-gallery__logo {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-section-diamension-quote-gallery__logo img {
  width: 46px;
  height: 74px;
  display: block;
}

.custom-section-diamension-quote-gallery__quote {
  font-family: var(--quote-gallery-font-family);
  font-size: var(--quote-gallery-font-size);
  font-weight: 300;
  line-height: var(--quote-gallery-line-height);
  color: var(--quote-gallery-text);
  margin: 0;
  text-align: center;
}

/* ============================================================================
   Responsive - Tablet (768px - 1024px)
   ============================================================================ */

@media (max-width: 1024px) {
  .custom-section-diamension-quote-gallery {
    padding: 60px 30px;
  }

  .custom-section-diamension-quote-gallery__container {
    min-height: 900px;
  }

  /* Scale images proportionally */
  .custom-section-diamension-quote-gallery__image-wrapper--1 {
    width: 280px;
    height: 365px;
    top: 0;
  }

  .custom-section-diamension-quote-gallery__image-wrapper--2 {
    width: 280px;
    height: 274px;
    left: 0;
    top: 180px;
  }

  .custom-section-diamension-quote-gallery__image-wrapper--3 {
    width: 248px;
    height: 324px;
    left: 100px;
    top: 280px;
  }

  .custom-section-diamension-quote-gallery__image-wrapper--4 {
    width: 280px;
    height: 365px;
    right: 0;
    top: 450px;
  }

  .custom-section-diamension-quote-gallery__image-wrapper--5 {
    width: 280px;
    height: 193px;
    right: 120px;
    top: 720px;
  }

  .custom-section-diamension-quote-gallery__quote {
    font-size: 26px;
    line-height: 39px;
  }

  .custom-section-diamension-quote-gallery__logo img {
    width: 40px;
    height: 64px;
  }
}

/* ============================================================================
   Responsive - Mobile (< 768px)
   ============================================================================ */

@media (max-width: 767px) {
  .custom-section-diamension-quote-gallery {
    padding: 40px 20px;
  }

  .custom-section-diamension-quote-gallery__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    min-height: auto;
    position: relative;
  }

  /* Reset absolute positioning for mobile */
  .custom-section-diamension-quote-gallery__image-wrapper {
    position: relative;
    left: auto;
    right: auto;
    top: auto;
    transform: none;
  }

  /* Image 1 - Full width at top */
  .custom-section-diamension-quote-gallery__image-wrapper--1 {
    width: 100%;
    height: auto;
    aspect-ratio: 327 / 427;
    order: 1;
  }

  /* Images 2 & 3 - Side by side in row */
  .custom-section-diamension-quote-gallery__image-wrapper--2,
  .custom-section-diamension-quote-gallery__image-wrapper--3 {
    width: calc(50% - 8px);
    aspect-ratio: 1 / 1;
    height: auto;
  }

  .custom-section-diamension-quote-gallery__image-wrapper--2 {
    order: 2;
  }

  .custom-section-diamension-quote-gallery__image-wrapper--3 {
    order: 3;
  }

  /* Content block - Middle */
  .custom-section-diamension-quote-gallery__content {
    position: relative;
    left: auto;
    top: auto;
    transform: none;
    order: 4;
    padding: 20px;
    max-width: 100%;
  }

  /* Images 4 & 5 - Side by side in row */
  .custom-section-diamension-quote-gallery__image-wrapper--4,
  .custom-section-diamension-quote-gallery__image-wrapper--5 {
    width: calc(50% - 8px);
    aspect-ratio: 1 / 1;
    height: auto;
  }

  .custom-section-diamension-quote-gallery__image-wrapper--4 {
    order: 5;
  }

  .custom-section-diamension-quote-gallery__image-wrapper--5 {
    order: 6;
  }

  /* Two-column grid for side-by-side images */
  .custom-section-diamension-quote-gallery__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  /* Full width for image 1 and content */
  .custom-section-diamension-quote-gallery__image-wrapper--1,
  .custom-section-diamension-quote-gallery__content {
    grid-column: 1 / -1;
  }

  .custom-section-diamension-quote-gallery__quote {
    font-size: 24px;
    line-height: 36px;
  }

  .custom-section-diamension-quote-gallery__logo {
    margin-bottom: 16px;
  }

  .custom-section-diamension-quote-gallery__logo img {
    width: 36px;
    height: 58px;
  }
}

/* ============================================================================
   Responsive - Small Mobile (< 375px)
   ============================================================================ */

@media (max-width: 375px) {
  .custom-section-diamension-quote-gallery {
    padding: 30px 15px;
  }

  .custom-section-diamension-quote-gallery__quote {
    font-size: 20px;
    line-height: 30px;
  }

  .custom-section-diamension-quote-gallery__logo img {
    width: 32px;
    height: 52px;
  }
}

/* ============================================================================
   Accessibility
   ============================================================================ */

@media (prefers-reduced-motion: reduce) {
  .custom-section-diamension-quote-gallery__image-wrapper {
    transform: none !important;
  }
}
```

---

### Step 3: Create JavaScript File

**File:** `assets/section-diamension-quote-gallery.js`

```javascript
/**
 * Custom Section - Diamension Quote Gallery
 * Handles GSAP parallax scrolling effects for image gallery
 */

(function() {
  'use strict';

  // ============================================================================
  // Configuration
  // ============================================================================
  const CONFIG = {
    selectors: {
      section: '.js-quote-gallery-section',
      parallaxImages: '.js-parallax-image'
    },
    breakpoints: {
      desktop: 1024
    },
    parallax: {
      movement: 80, // Pixels of vertical movement
      ease: 'none'
    }
  };

  // ============================================================================
  // Parallax Handler (GSAP)
  // ============================================================================
  class ParallaxHandler {
    constructor(section) {
      this.section = section;
      this.images = section.querySelectorAll(CONFIG.selectors.parallaxImages);
      this.isDesktop = window.innerWidth > CONFIG.breakpoints.desktop;
      this.animations = [];

      // Check if GSAP is available
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded. Parallax effect disabled.');
        return;
      }

      // Check if parallax is enabled (from Liquid setting)
      const parallaxEnabled = this.section.dataset.parallaxEnabled !== 'false';

      if (this.isDesktop && this.images.length > 0 && parallaxEnabled) {
        this.init();
      }
    }

    init() {
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      this.images.forEach((image, index) => {
        // Create parallax effect for each image
        // Animation goes from -movement to +movement for proper parallax effect
        const animation = gsap.fromTo(image,
          {
            y: -CONFIG.parallax.movement
          },
          {
            y: CONFIG.parallax.movement,
            ease: CONFIG.parallax.ease,
            scrollTrigger: {
              trigger: this.section,
              start: 'top 80%', // Start animation when section reaches 80% from top
              end: 'bottom 20%', // End animation when section is 20% from top
              scrub: true,
              invalidateOnRefresh: true
            }
          }
        );

        this.animations.push(animation);
      });
    }

    destroy() {
      // Kill all ScrollTrigger instances
      this.animations.forEach(animation => {
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill();
        }
        animation.kill();
      });
      this.animations = [];
    }
  }

  // ============================================================================
  // Section Manager
  // ============================================================================
  class QuoteGallerySection {
    constructor(section) {
      this.section = section;
      this.parallaxHandler = null;
      this.resizeTimer = null;

      this.init();
      this.bindEvents();
    }

    init() {
      // Initialize parallax (desktop only)
      if (window.innerWidth > CONFIG.breakpoints.desktop) {
        this.parallaxHandler = new ParallaxHandler(this.section);
      }
    }

    bindEvents() {
      // Handle window resize
      window.addEventListener('resize', () => {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          this.handleResize();
        }, 250);
      });
    }

    handleResize() {
      const isDesktop = window.innerWidth > CONFIG.breakpoints.desktop;

      // Reinitialize parallax on desktop, destroy on mobile/tablet
      if (isDesktop && !this.parallaxHandler) {
        this.parallaxHandler = new ParallaxHandler(this.section);
      } else if (!isDesktop && this.parallaxHandler) {
        this.parallaxHandler.destroy();
        this.parallaxHandler = null;
      }
    }
  }

  // ============================================================================
  // Initialize
  // ============================================================================
  function init() {
    const sections = document.querySelectorAll(CONFIG.selectors.section);

    if (sections.length === 0) return;

    sections.forEach(section => {
      new QuoteGallerySection(section);
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize on Shopify section load (theme editor)
  if (typeof Shopify !== 'undefined' && Shopify.designMode) {
    document.addEventListener('shopify:section:load', function(event) {
      if (event.target.querySelector(CONFIG.selectors.section)) {
        init();
      }
    });
  }

})();
```

---

## ✅ Testing Checklist

### Theme Editor Testing
- [ ] Section appears in "Add section" menu
- [ ] All 5 image pickers work correctly
- [ ] Logo image picker works
- [ ] Quote text field updates in real-time
- [ ] Background color picker updates section background
- [ ] Enable/disable parallax checkbox works

### Desktop Testing (>1024px)
- [ ] All 5 images positioned correctly
- [ ] Images maintain aspect ratios
- [ ] Parallax effect activates on scroll
- [ ] Images move smoothly (-80px to +80px range)
- [ ] Quote text centered and readable
- [ ] Logo positioned above quote
- [ ] No horizontal scrollbar
- [ ] Max-width container (1440px) works correctly

### Tablet Testing (768px - 1024px)
- [ ] Images scale proportionally
- [ ] Layout maintained without parallax
- [ ] Content remains centered
- [ ] No overlapping elements
- [ ] Readable quote text

### Mobile Testing (<768px)
- [ ] Stacked layout displays correctly
- [ ] Image 1 shows full-width at top
- [ ] Images 2 & 3 show side-by-side
- [ ] Content block (logo + quote) in middle
- [ ] Images 4 & 5 show side-by-side
- [ ] 16px gap between images
- [ ] Square aspect ratio for side-by-side images
- [ ] No parallax effect
- [ ] Quote text readable at 24px

### Performance Testing
- [ ] No console errors
- [ ] Images load with lazy loading
- [ ] Smooth scroll performance
- [ ] No layout shifts on load
- [ ] GSAP animations perform well
- [ ] Resize handling works correctly

### Accessibility Testing
- [ ] All images have alt text
- [ ] Quote text has proper contrast
- [ ] Reduced motion preference respected
- [ ] Keyboard navigation works
- [ ] Screen reader friendly

### Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## 🐛 Troubleshooting

### Issue: Parallax not working
**Solutions:**
1. Check if GSAP and ScrollTrigger are loaded in theme
2. Verify viewport width is >1024px
3. Check browser console for JavaScript errors
4. Ensure "Enable Parallax" checkbox is checked in theme editor

### Issue: Images not positioned correctly
**Solutions:**
1. Verify CSS file is loading correctly
2. Check for conflicting styles from theme
3. Ensure container has min-height
4. Test in incognito mode to rule out cache issues

### Issue: Mobile layout not stacking
**Solutions:**
1. Check media query breakpoints in CSS
2. Verify grid layout CSS is applied
3. Clear browser cache
4. Test on actual mobile device, not just browser DevTools

### Issue: Quote text font not loading
**Solutions:**
1. Verify font file exists in `assets/fonts/`
2. Add `@font-face` declaration in CSS if needed
3. Fallback to system font if custom font unavailable

---

## 🚀 Deployment Steps

1. **Commit Files:**
   ```bash
   git add sections/custom-section-diamension-quote-gallery.liquid
   git add assets/section-diamension-quote-gallery.css
   git add assets/section-diamension-quote-gallery.js
   git commit -m "[Feature] Add Diamension Quote Gallery section with parallax"
   ```

2. **Push to Development:**
   ```bash
   git push origin feature/custom-diamension-quote-gallery
   ```

3. **Test in Staging:**
   - Add section to test page
   - Upload all 5 images
   - Configure quote text and logo
   - Test all breakpoints
   - Verify parallax effect

4. **Merge to Main:**
   - Create pull request
   - Review code
   - Merge after approval
   - Deploy to production

---

## 📝 Post-Deployment Notes

1. **Content Editor Instructions:**
   - Upload high-quality images (min 800px width)
   - Keep quote text concise (max ~80 characters)
   - Use SVG for logo for best quality
   - Test section on mobile after adding content

2. **Maintenance:**
   - Monitor GSAP version updates
   - Check performance on low-end devices
   - Update breakpoints if design changes

3. **Future Enhancements (Optional):**
   - Add hover effects on images
   - Add fade-in animation on page load
   - Allow custom parallax movement range
   - Add video support for images
   - Add color overlay options

---

## 🎓 Developer Notes

1. **Why GSAP instead of CSS?**
   - Smooth scroll-linked animation
   - Better browser compatibility
   - Easier to control animation timing
   - Already included in theme

2. **Why disable parallax on mobile?**
   - Performance concerns on low-end devices
   - Stacked layout doesn't benefit from parallax
   - Better user experience without it

3. **Why absolute positioning on desktop?**
   - Allows creative asymmetric layout
   - Matches Figma design exactly
   - Creates depth with overlapping elements

4. **Why grid layout on mobile?**
   - Clean, predictable stacking
   - Easy to maintain equal spacing
   - Responsive and flexible

---

## ✅ Completion Checklist

- [ ] All files created and linked correctly
- [ ] BEM methodology followed throughout
- [ ] Desktop-first responsive design implemented
- [ ] GSAP parallax working on desktop
- [ ] Mobile stacked layout working correctly
- [ ] All schema settings functional
- [ ] Tested on all breakpoints
- [ ] Tested in Shopify theme editor
- [ ] No console errors
- [ ] Code is clean and documented
- [ ] Git commit follows naming convention
- [ ] Pull request created and merged

---

**Implementation Complete!** 🎉

Refer to this guide during development and check off items as you complete them. If you encounter issues not covered here, refer to the rules documentation or consult with the team.
