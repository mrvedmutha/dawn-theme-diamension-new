# Image Hero with Text Section - Technical Specification

## 📋 Overview

Complete technical specification for implementing the Image Hero with Text section in Shopify. This section displays a full-width hero banner with background image and text overlay (heading, caption, CTA link).

**Figma Node:** `12:4725`
**Section Type:** Custom Shopify section
**Complexity:** Low - Simple hero with text overlay

---

## 🎯 Functional Requirements

### Core Functionality
1. **Background Image Display**
   - Full-width container (max 1440px)
   - Image fills container using `object-fit: cover`
   - Responsive height scaling

2. **Text Overlay**
   - Heading (uppercase, customizable)
   - Caption (sentence case, customizable)
   - CTA link (underlined, customizable text & URL)

3. **Merchant Customization**
   - Upload/change background image
   - Edit all text content
   - Customize text color
   - Add optional color overlay with opacity control

4. **Responsive Behavior**
   - 8-divisible proportional scaling
   - All spacing/typography scales from 1440px base
   - Maintains visual hierarchy across all viewports

---

## 📁 File Structure

```
sections/
└── image-hero-with-product.liquid    ← Main section template

assets/
└── section-image-hero-with-product.css   ← Styling (BEM methodology)
```

**Note:** No JavaScript required for basic implementation.

---

## 🏗️ HTML Structure (Liquid)

### Component Hierarchy

```html
<section class="image-hero-section">
  <!-- Background Image -->
  <img class="image-hero-section__background" />

  <!-- Optional Overlay -->
  <div class="image-hero-section__overlay"></div>

  <!-- Text Container -->
  <div class="image-hero-section__text-container">
    <h1 class="image-hero-section__heading"></h1>
    <p class="image-hero-section__caption"></p>
    <a class="image-hero-section__cta"></a>
  </div>
</section>
```

### BEM Class Structure

```
Block:    .image-hero-section
Elements: .image-hero-section__background
          .image-hero-section__overlay
          .image-hero-section__text-container
          .image-hero-section__heading
          .image-hero-section__caption
          .image-hero-section__cta
```

---

## 💻 Liquid Implementation

### Section File: `sections/image-hero-with-product.liquid`

```liquid
{{ 'section-image-hero-with-product.css' | asset_url | stylesheet_tag }}

{%- liquid
  assign bg_image = section.settings.background_image
  assign heading = section.settings.heading
  assign caption = section.settings.caption
  assign cta_text = section.settings.cta_text
  assign cta_link = section.settings.cta_link
  assign text_color = section.settings.text_color
  assign overlay_color = section.settings.overlay_color
  assign overlay_opacity = section.settings.overlay_opacity | times: 0.01
-%}

<section
  class="image-hero-section"
  style="
    --text-color: {{ text_color }};
    --overlay-color: {{ overlay_color }};
    --overlay-opacity: {{ overlay_opacity }};
  "
>
  {%- if bg_image != blank -%}
    <img
      src="{{ bg_image | image_url: width: 1440 }}"
      srcset="
        {{ bg_image | image_url: width: 375 }} 375w,
        {{ bg_image | image_url: width: 767 }} 767w,
        {{ bg_image | image_url: width: 1024 }} 1024w,
        {{ bg_image | image_url: width: 1440 }} 1440w,
        {{ bg_image | image_url: width: 2880 }} 2880w
      "
      sizes="100vw"
      alt="{{ bg_image.alt | escape }}"
      class="image-hero-section__background"
      loading="eager"
      fetchpriority="high"
    >
  {%- endif -%}

  {%- if overlay_opacity > 0 -%}
    <div class="image-hero-section__overlay"></div>
  {%- endif -%}

  <div class="image-hero-section__text-container">
    {%- if heading != blank -%}
      <h1 class="image-hero-section__heading">{{ heading }}</h1>
    {%- endif -%}

    {%- if caption != blank -%}
      <p class="image-hero-section__caption">{{ caption }}</p>
    {%- endif -%}

    {%- if cta_text != blank and cta_link != blank -%}
      <a href="{{ cta_link }}" class="image-hero-section__cta">
        {{ cta_text }}
      </a>
    {%- endif -%}
  </div>
</section>

{% schema %}
{
  "name": "Image Hero with Text",
  "tag": "section",
  "class": "section-image-hero",
  "settings": [
    {
      "type": "image_picker",
      "id": "background_image",
      "label": "Background Image",
      "info": "Recommended size: 1440×1040px or larger (16:9 or 3:2 aspect ratio)"
    },
    {
      "type": "header",
      "content": "Text Content"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "INTO THE RED"
    },
    {
      "type": "textarea",
      "id": "caption",
      "label": "Caption",
      "default": "Jewelry that feels as good as it looks."
    },
    {
      "type": "text",
      "id": "cta_text",
      "label": "Button Text",
      "default": "Shop the Collection"
    },
    {
      "type": "url",
      "id": "cta_link",
      "label": "Button Link"
    },
    {
      "type": "header",
      "content": "Styling"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text Color",
      "default": "#FFFFFF"
    },
    {
      "type": "color",
      "id": "overlay_color",
      "label": "Overlay Color",
      "default": "#000000",
      "info": "Color overlay to improve text readability"
    },
    {
      "type": "range",
      "id": "overlay_opacity",
      "label": "Overlay Opacity",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 0,
      "info": "0% = no overlay, 100% = full overlay"
    }
  ],
  "presets": [
    {
      "name": "Image Hero with Text"
    }
  ]
}
{% endschema %}
```

---

## 🎨 CSS Implementation

### File: `assets/section-image-hero-with-product.css`

```css
/* ============================================
   IMAGE HERO SECTION - BEM METHODOLOGY
   Base: 1440px Desktop
   Responsive: 100vh → 80vh → 65vh
   Spacing: 8-divisible scaling
   ============================================ */

/* --------------------------------------------
   BLOCK: Hero Section Container
   -------------------------------------------- */
.image-hero-section {
  position: relative;
  width: 100%;
  max-width: 1440px;
  height: 100vh;
  max-height: 1040px; /* From Figma */
  min-height: 600px;
  margin: 0 auto;
  overflow: hidden;
  background-color: #000; /* Fallback */
}

/* --------------------------------------------
   ELEMENT: Background Image
   -------------------------------------------- */
.image-hero-section__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
}

/* --------------------------------------------
   ELEMENT: Overlay
   -------------------------------------------- */
.image-hero-section__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--overlay-color, rgba(0, 0, 0, 0));
  opacity: var(--overlay-opacity, 0);
  z-index: 1;
  pointer-events: none;
}

/* --------------------------------------------
   ELEMENT: Text Container
   -------------------------------------------- */
.image-hero-section__text-container {
  position: absolute;
  top: 216px;
  left: 56px;
  z-index: 2;
  max-width: 600px;
  color: var(--text-color, #FFFFFF);
}

/* --------------------------------------------
   ELEMENT: Heading
   -------------------------------------------- */
.image-hero-section__heading {
  margin: 0;
  padding: 0;
  font-family: 'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 40px;
  font-weight: 300; /* Light - verify exact weight from Figma */
  line-height: 1.2; /* Verify from Figma */
  letter-spacing: 0; /* Verify from Figma */
  text-transform: uppercase;
  color: inherit;
  margin-bottom: 6px;
}

/* --------------------------------------------
   ELEMENT: Caption
   -------------------------------------------- */
.image-hero-section__caption {
  margin: 0;
  padding: 0;
  font-family: 'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 20px;
  font-weight: 300; /* Light - verify exact weight from Figma */
  line-height: 1.5; /* Verify from Figma */
  letter-spacing: 0; /* Verify from Figma */
  color: inherit;
  margin-bottom: 64px;
}

/* --------------------------------------------
   ELEMENT: CTA Link
   -------------------------------------------- */
.image-hero-section__cta {
  display: inline-block;
  margin: 0;
  padding: 0;
  font-family: 'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 20px;
  font-weight: 300; /* Light or Regular - verify from Figma */
  line-height: 1.5; /* Verify from Figma */
  letter-spacing: 0; /* Verify from Figma */
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 4px;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.image-hero-section__cta:hover {
  opacity: 0.8;
}

.image-hero-section__cta:active {
  opacity: 0.6;
}

/* ============================================
   RESPONSIVE: TABLET (1024px)
   Container: 80vh
   Scale Factor: 71.11% (1024 / 1440)
   ============================================ */
@media (max-width: 1024px) {
  .image-hero-section {
    height: 80vh;
    min-height: 500px;
  }

  .image-hero-section__text-container {
    top: 154px; /* 216 × 0.7111 */
    left: 40px; /* 56 × 0.7111 */
  }

  .image-hero-section__heading {
    font-size: 28px; /* 40 × 0.7111 */
    margin-bottom: 4px; /* 6 × 0.7111 */
  }

  .image-hero-section__caption {
    font-size: 14px; /* 20 × 0.7111 */
    margin-bottom: 46px; /* 64 × 0.7111 */
  }

  .image-hero-section__cta {
    font-size: 14px; /* 20 × 0.7111 */
  }
}

/* ============================================
   RESPONSIVE: MOBILE (767px)
   Container: 65vh
   Scale Factor: 53.26% (767 / 1440)
   ============================================ */
@media (max-width: 767px) {
  .image-hero-section {
    height: 65vh;
    min-height: 400px;
  }

  .image-hero-section__text-container {
    top: 115px; /* 216 × 0.5326 */
    left: 30px; /* 56 × 0.5326 */
  }

  .image-hero-section__heading {
    font-size: 21px; /* 40 × 0.5326 */
    margin-bottom: 3px; /* 6 × 0.5326 */
  }

  .image-hero-section__caption {
    font-size: 11px; /* 20 × 0.5326 */
    margin-bottom: 34px; /* 64 × 0.5326 */
  }

  .image-hero-section__cta {
    font-size: 11px; /* 20 × 0.5326 */
  }
}

/* ============================================
   RESPONSIVE: SMALL MOBILE (375px)
   Container: 65vh (same as mobile)
   With minimum font sizes for readability
   ============================================ */
@media (max-width: 375px) {
  .image-hero-section {
    height: 65vh;
    min-height: 400px;
  }

  .image-hero-section__text-container {
    top: 56px; /* 216 × 0.2604 */
    left: 15px; /* 56 × 0.2604 */
  }

  .image-hero-section__heading {
    font-size: 16px; /* Minimum for readability */
    margin-bottom: 2px; /* 6 × 0.2604 */
  }

  .image-hero-section__caption {
    font-size: 12px; /* Minimum for readability */
    margin-bottom: 17px; /* 64 × 0.2604 */
  }

  .image-hero-section__cta {
    font-size: 12px; /* Minimum for readability */
  }
}

/* ============================================
   RESPONSIVE: LARGE DESKTOP (1441px+)
   Center container, prevent stretching
   ============================================ */
@media (min-width: 1441px) {
  .image-hero-section {
    margin: 0 auto;
  }
}
```

---

## 📐 Responsive Scaling Calculations

### Breakpoint Scale Factors

```javascript
const breakpoints = {
  desktop: 1440,    // 100% - base
  tablet: 1024,     // 71.11% - 1024 / 1440
  mobile: 767,      // 53.26% - 767 / 1440
  smallMobile: 375  // 26.04% - 375 / 1440
};

// Calculate scaled value
function scaleValue(originalValue, targetViewport, baseViewport = 1440) {
  return Math.round(originalValue * (targetViewport / baseViewport));
}

// Examples:
scaleValue(216, 1024); // 154px (heading top at tablet)
scaleValue(40, 767);   // 21px (heading font at mobile)
scaleValue(64, 375);   // 17px (gap at small mobile)
```

### Measurement Reference Table

| Original (1440px) | Tablet (1024px) | Mobile (767px) | Small (375px) |
|-------------------|-----------------|----------------|---------------|
| Container Height  | 100vh (max 1040px) | 80vh (min 500px) | 65vh (min 400px) | 65vh (min 400px) |
| Top: 216px        | 154px           | 115px          | 56px          |
| Left: 56px        | 40px            | 30px           | 15px          |
| H→C Gap: 6px      | 4px             | 3px            | 2px           |
| C→CTA Gap: 64px   | 46px            | 34px           | 17px          |
| H Font: 40px      | 28px            | 21px           | 16px*         |
| C Font: 20px      | 14px            | 11px           | 12px*         |
| CTA Font: 20px    | 14px            | 11px           | 12px*         |

*With minimum size constraint

---

## ⚙️ Schema Settings Reference

### Setting Types & Usage

```json
{
  "background_image": "image_picker - Main hero image",
  "heading": "text - Main heading (uppercase in CSS)",
  "caption": "textarea - Subheading text",
  "cta_text": "text - Call-to-action link text",
  "cta_link": "url - Link destination",
  "text_color": "color - CSS custom property (--text-color)",
  "overlay_color": "color - CSS custom property (--overlay-color)",
  "overlay_opacity": "range 0-100 - Converted to 0-1 decimal in Liquid"
}
```

### Default Values

- **heading:** "INTO THE RED"
- **caption:** "Jewelry that feels as good as it looks."
- **cta_text:** "Shop the Collection"
- **text_color:** #FFFFFF (white)
- **overlay_color:** #000000 (black)
- **overlay_opacity:** 0 (no overlay)

---

## 🎯 Accessibility Requirements

### Semantic HTML
- Use `<h1>` or `<h2>` for heading (depending on page context)
- Use `<p>` for caption
- Use `<a>` for CTA with proper href
- Add descriptive alt text for background image

### Color Contrast
- Ensure text color contrasts with background image
- Use overlay if contrast is insufficient
- Test with WCAG contrast checker (minimum 4.5:1 for normal text)

### Keyboard Navigation
- CTA link must be keyboard accessible
- Ensure focus states are visible

### Screen Readers
- Background image alt text should be descriptive
- Text content should be meaningful when read aloud

---

## 🧪 Testing Checklist

### Visual Testing (All Breakpoints)
- [ ] Desktop (1440px): Layout matches Figma
- [ ] Tablet (1024px): Proportional scaling correct
- [ ] Mobile (767px): Proportional scaling correct
- [ ] Small Mobile (375px): Text remains readable
- [ ] Large Desktop (1920px+): Container centers correctly

### Functional Testing
- [ ] Image upload works in theme editor
- [ ] Image displays correctly (object-fit: cover)
- [ ] All text fields are editable
- [ ] CTA link navigates correctly
- [ ] Text color picker works
- [ ] Overlay color picker works
- [ ] Overlay opacity slider works

### Responsive Testing
- [ ] All measurements scale proportionally
- [ ] Font sizes maintain readability at all viewports
- [ ] Text doesn't overflow container
- [ ] Image maintains aspect ratio

### Performance Testing
- [ ] Image lazy loading works (if not hero)
- [ ] Srcset provides correct image sizes
- [ ] No console errors
- [ ] No layout shift (CLS)

### Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox (desktop)
- [ ] Edge (desktop)

---

## ⚠️ Common Issues & Solutions

### Issue 1: Text not visible on light backgrounds
**Cause:** Low contrast between text and background
**Solution:** Merchant should use overlay with 30-50% opacity

### Issue 2: Font not loading
**Cause:** Neue Haas Grotesk not included in theme
**Solution:** Ensure font is loaded in theme.liquid or add fallback fonts

### Issue 3: Image not filling container
**Cause:** object-fit not supported or incorrect dimensions
**Solution:** Verify CSS, add fallback for older browsers

### Issue 4: Responsive scaling doesn't match
**Cause:** Incorrect scale factor calculations
**Solution:** Verify math: targetViewport / 1440

### Issue 5: Overlay opacity not working
**Cause:** Incorrect conversion from percentage to decimal
**Solution:** Verify Liquid: `overlay_opacity | times: 0.01`

---

## 📋 Implementation Workflow

### Phase 1: Setup
1. Read all documentation files
2. Read required rules from `@docs/rules/`
3. Extract typography details from Figma node 12:4725
4. Update design-tokens.md with extracted values

### Phase 2: Liquid Development
1. Create `sections/image-hero-with-product.liquid`
2. Implement schema settings
3. Add HTML structure with BEM classes
4. Add CSS custom properties for colors
5. Implement image srcset for responsive images

### Phase 3: CSS Development
1. Create `assets/section-image-hero-with-product.css`
2. Implement BEM methodology
3. Add base styles (1440px)
4. Calculate and add tablet styles (1024px)
5. Calculate and add mobile styles (767px)
6. Calculate and add small mobile styles (375px)
7. Add large desktop centering (1441px+)

### Phase 4: Testing
1. Test in Shopify theme editor
2. Test image upload
3. Test all text editing
4. Test color/overlay settings
5. Test across all breakpoints
6. Test in multiple browsers

### Phase 5: Validation
1. Validate HTML structure
2. Validate CSS (BEM methodology)
3. Check accessibility (contrast, semantics)
4. Verify no console errors
5. Performance check (image optimization)

---

## 🔗 External Dependencies

### Fonts
- **Neue Haas Grotesk Display Pro** (Light weight)
- Fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Images
- Recommended format: JPG or WebP
- Recommended size: 1440×1040px minimum
- Recommended optimization: < 200KB file size

### Browser Support
- Modern browsers (last 2 versions)
- IE11 not required (CSS Grid, CSS Custom Properties used)

---

## 📞 Developer Questions?

Before implementing, verify:
1. ✅ Read all documentation files
2. ✅ Read required rules from `@docs/rules/`
3. ✅ Extracted typography from Figma
4. ✅ Understand 8-divisible scaling

**If unclear:** Ask human for clarification - do NOT assume or approximate.

---

**Last Updated:** 2025-12-15
**Version:** 1.0.0
**Figma Node:** `12:4725`
**Status:** Ready for development
