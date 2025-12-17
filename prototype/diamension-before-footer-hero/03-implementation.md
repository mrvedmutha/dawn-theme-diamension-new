# Implementation Guide: Diamension Before Footer Hero

## Prerequisites

- [ ] Read `01-overview.md` completely
- [ ] Read `02-design-token.md` for all specifications
- [ ] Review Figma design node: `12:4897`
- [ ] Read required documentation from `docs/rules/` folder:
  - [ ] `00-OVERVIEW.md`
  - [ ] `02-DESIGN-EXTRACTION.md`
  - [ ] `04-LIQUID-DEVELOPMENT.md`
  - [ ] `05-CSS-STANDARDS.md`
  - [ ] `08-NAMING-CONVENTIONS.md`

## File Structure

```
sections/
└── custom-diamension-before-footer-hero.liquid    # Main section file

assets/
└── section-diamension-before-footer-hero.css       # Section styles
```

**Note:** No JavaScript file needed for this section (static content only).

## Implementation Steps

### Step 1: Create Section File

**File:** `sections/custom-diamension-before-footer-hero.liquid`

**CRITICAL:** File name MUST be `custom-diamension-before-footer-hero.liquid` following the pattern `custom-[folder-name]`.

#### Complete Section Code

```liquid
{%- comment -%}
  Section: Diamension Before Footer Hero
  Description: Founder quote section with dramatic product image overlay
  Figma Node: 12:4897
  File Pattern: custom-[folder-name]
{%- endcomment -%}

{{ 'section-diamension-before-footer-hero.css' | asset_url | stylesheet_tag }}

{%- liquid
  # Assign section settings to variables
  assign quote_text = section.settings.quote_text
  assign caption_text = section.settings.caption_text
  assign product_image = section.settings.product_image
  assign image_offset = section.settings.image_offset
-%}

<section
  class="custom-diamension-before-footer-hero"
  data-section-id="{{ section.id }}"
  data-section-type="diamension-before-footer-hero"
>
  <div class="custom-diamension-before-footer-hero__wrapper">
    <div class="custom-diamension-before-footer-hero__container">

      {%- comment -%} Quote Text {%- endcomment -%}
      {%- if quote_text != blank -%}
        <div class="custom-diamension-before-footer-hero__quote-wrapper">
          <p class="custom-diamension-before-footer-hero__quote">
            {{ quote_text }}
          </p>
        </div>
      {%- endif -%}

      {%- comment -%} Caption Text {%- endcomment -%}
      {%- if caption_text != blank -%}
        <div class="custom-diamension-before-footer-hero__caption-wrapper">
          <p class="custom-diamension-before-footer-hero__caption">
            {{ caption_text }}
          </p>
        </div>
      {%- endif -%}

      {%- comment -%} Product Image with Adjustable Offset {%- endcomment -%}
      {%- if product_image != blank -%}
        <div
          class="custom-diamension-before-footer-hero__image-wrapper"
          style="--image-offset: {{ image_offset }}px;"
        >
          {{- product_image | image_url: width: 1600 | image_tag:
            loading: 'lazy',
            widths: '400, 600, 800, 1200, 1600',
            sizes: '(max-width: 767px) 400px, (max-width: 1024px) 600px, 800px',
            class: 'custom-diamension-before-footer-hero__image',
            alt: product_image.alt | default: 'Product image'
          -}}
        </div>
      {%- endif -%}

    </div>
  </div>
</section>

{% schema %}
{
  "name": "Before Footer Hero",
  "tag": "section",
  "class": "section-diamension-before-footer-hero",
  "settings": [
    {
      "type": "header",
      "content": "Quote Content"
    },
    {
      "type": "textarea",
      "id": "quote_text",
      "label": "Quote Text",
      "default": "We believe jewelry should be something you never take off. A companion to your memory, made to last a lifetime, the kind you'll invest in and pass down.",
      "info": "Main founder's quote (fully customizable)"
    },
    {
      "type": "header",
      "content": "Attribution"
    },
    {
      "type": "text",
      "id": "caption_text",
      "label": "Caption Text",
      "default": "—KARAN, FOUNDER",
      "info": "Attribution line below the quote (fully customizable, will be uppercase)"
    },
    {
      "type": "header",
      "content": "Product Image"
    },
    {
      "type": "image_picker",
      "id": "product_image",
      "label": "Product Image",
      "info": "Upload a square image (1:1 ratio, minimum 1200x1200px recommended). Image will be 800x800px on desktop."
    },
    {
      "type": "range",
      "id": "image_offset",
      "label": "Image Vertical Position",
      "min": -200,
      "max": 0,
      "step": 8,
      "unit": "px",
      "default": -128,
      "info": "Adjust how much of the image is visible. Negative values move image down (partially hidden). 0 = fully visible at bottom."
    }
  ],
  "presets": [
    {
      "name": "Before Footer Hero"
    }
  ]
}
{% endschema %}
```

---

### Step 2: Create CSS File

**File:** `assets/section-diamension-before-footer-hero.css`

#### Complete CSS Code

```css
/* ==========================================================================
   Diamension Before Footer Hero Section
   Figma Node: 12:4897
   Pattern: custom-[folder-name]
   ========================================================================== */

/* Section Root
   ========================================================================== */
.custom-diamension-before-footer-hero {
  width: 100%;
  overflow: hidden;
}

/* Wrapper - Background and Full Width
   ========================================================================== */
.custom-diamension-before-footer-hero__wrapper {
  background-color: #212121;
  width: 100%;
  position: relative;
}

/* Container - Max-width and Height
   ========================================================================== */
.custom-diamension-before-footer-hero__container {
  max-width: 1440px;
  min-height: 672px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Quote Text Wrapper
   ========================================================================== */
.custom-diamension-before-footer-hero__quote-wrapper {
  margin-top: 104px;
  width: 704px;
  max-width: 90%;
}

/* Quote Text
   ========================================================================== */
.custom-diamension-before-footer-hero__quote {
  color: #FFFAF5;
  text-align: center;
  font-family: "Neue Haas Grotesk Display Pro", sans-serif;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: 45px; /* 112.5% */
  margin: 0;
}

/* Caption Wrapper
   ========================================================================== */
.custom-diamension-before-footer-hero__caption-wrapper {
  margin-top: 48px;
}

/* Caption Text
   ========================================================================== */
.custom-diamension-before-footer-hero__caption {
  color: #FFFAF5;
  text-align: center;
  font-family: "Neue Haas Grotesk Display Pro", sans-serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 60px; /* 200% */
  text-transform: uppercase;
  margin: 0;
}

/* Product Image Wrapper
   ========================================================================== */
.custom-diamension-before-footer-hero__image-wrapper {
  position: absolute;
  bottom: var(--image-offset, -128px);
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 800px;
  z-index: 1;
}

/* Product Image
   ========================================================================== */
.custom-diamension-before-footer-hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  aspect-ratio: 1 / 1;
}

/* Quote and Caption - Z-Index Above Image
   ========================================================================== */
.custom-diamension-before-footer-hero__quote-wrapper,
.custom-diamension-before-footer-hero__caption-wrapper {
  position: relative;
  z-index: 2;
}

/* ==========================================================================
   Responsive Breakpoints
   ========================================================================== */

/* Large Desktop - Ensure container doesn't exceed 1440px
   ========================================================================== */
@media (min-width: 1441px) {
  .custom-diamension-before-footer-hero__container {
    max-width: 1440px;
  }
}

/* Desktop - 1200px to 1439px
   ========================================================================== */
@media (max-width: 1439px) and (min-width: 1200px) {
  .custom-diamension-before-footer-hero__quote-wrapper {
    width: 640px;
  }
}

/* Tablet Landscape - 1024px to 1199px
   ========================================================================== */
@media (max-width: 1199px) and (min-width: 1024px) {
  .custom-diamension-before-footer-hero__quote-wrapper {
    width: 576px;
  }
}

/* Tablet - 768px to 1023px
   ========================================================================== */
@media (max-width: 1023px) {
  .custom-diamension-before-footer-hero__container {
    min-height: auto;
    padding: 80px 40px;
  }

  .custom-diamension-before-footer-hero__quote-wrapper {
    margin-top: 0;
    width: 512px;
  }

  .custom-diamension-before-footer-hero__quote {
    font-size: 32px;
    line-height: 40px;
  }

  .custom-diamension-before-footer-hero__caption-wrapper {
    margin-top: 40px;
  }

  .custom-diamension-before-footer-hero__caption {
    font-size: 24px;
    line-height: 48px;
  }

  .custom-diamension-before-footer-hero__image-wrapper {
    width: 600px;
    height: 600px;
    bottom: calc(var(--image-offset, -128px) * 0.75);
  }
}

/* Mobile Large - 576px to 767px
   ========================================================================== */
@media (max-width: 767px) {
  .custom-diamension-before-footer-hero__container {
    padding: 60px 20px;
  }

  .custom-diamension-before-footer-hero__quote-wrapper {
    width: 448px;
  }

  .custom-diamension-before-footer-hero__quote {
    font-size: 24px;
    line-height: 30px;
  }

  .custom-diamension-before-footer-hero__caption-wrapper {
    margin-top: 32px;
  }

  .custom-diamension-before-footer-hero__caption {
    font-size: 20px;
    line-height: 36px;
  }

  .custom-diamension-before-footer-hero__image-wrapper {
    width: 400px;
    height: 400px;
    bottom: calc(var(--image-offset, -128px) * 0.625);
  }
}

/* Mobile - 480px to 575px
   ========================================================================== */
@media (max-width: 575px) {
  .custom-diamension-before-footer-hero__quote-wrapper {
    width: 384px;
  }
}

/* Mobile Small - Below 480px
   ========================================================================== */
@media (max-width: 479px) {
  .custom-diamension-before-footer-hero__quote-wrapper {
    width: 320px;
  }

  .custom-diamension-before-footer-hero__image-wrapper {
    width: 320px;
    height: 320px;
  }
}

/* Extra Small Screens - Below 375px
   ========================================================================== */
@media (max-width: 374px) {
  .custom-diamension-before-footer-hero__container {
    padding: 40px 15px;
  }

  .custom-diamension-before-footer-hero__quote {
    font-size: 20px;
    line-height: 26px;
  }

  .custom-diamension-before-footer-hero__caption {
    font-size: 18px;
    line-height: 32px;
  }
}
```

---

## CSS Implementation Notes

### 1. BEM Methodology

**Block:** `.custom-diamension-before-footer-hero`

**Elements:**
- `__wrapper` - Background container
- `__container` - Content container (max-width 1440px)
- `__quote-wrapper` - Quote text container
- `__quote` - Quote text element
- `__caption-wrapper` - Caption text container
- `__caption` - Caption text element
- `__image-wrapper` - Image positioning wrapper
- `__image` - Image element

**No Modifiers Needed:** This section has no variations.

### 2. Positioning Strategy

**Desktop (1440px):**
- Container uses `display: flex` with `flex-direction: column` and `align-items: center` for vertical stacking and horizontal centering
- Quote wrapper has `margin-top: 104px` for top positioning
- Caption wrapper has `margin-top: 48px` for gap
- Image wrapper uses `position: absolute` with `bottom` offset for emerging effect

**Tablet/Mobile:**
- Switch to natural document flow with padding
- Image scales down proportionally
- Offset is calculated proportionally (e.g., `bottom: calc(var(--image-offset) * 0.75)` on tablet)

### 3. Responsive Width Management

Quote wrapper width changes at each breakpoint, maintaining 8-divisibility:

```css
/* Desktop: 704px (default) */
.custom-diamension-before-footer-hero__quote-wrapper {
  width: 704px;
}

/* 1200-1439px: 640px */
@media (max-width: 1439px) and (min-width: 1200px) {
  .custom-diamension-before-footer-hero__quote-wrapper {
    width: 640px;
  }
}

/* Continue pattern... */
```

### 4. CSS Custom Properties for Dynamic Offset

The image offset uses a CSS custom property set via inline style:

```liquid
style="--image-offset: {{ section.settings.image_offset }}px;"
```

```css
.custom-diamension-before-footer-hero__image-wrapper {
  bottom: var(--image-offset, -128px); /* Default: -128px */
}
```

This allows merchants to control the offset via the schema range slider.

### 5. Z-Index Layering

- **Image:** `z-index: 1` (background layer)
- **Quote/Caption:** `z-index: 2` (foreground layer)

This ensures text always appears above the product image.

---

## Schema Settings Explained

### Quote Text (textarea)

```json
{
  "type": "textarea",
  "id": "quote_text",
  "label": "Quote Text",
  "default": "We believe jewelry should be something...",
  "info": "Main founder's quote (fully customizable)"
}
```

**Why textarea?** Allows multi-line editing in theme editor for long quotes.

### Caption Text (text)

```json
{
  "type": "text",
  "id": "caption_text",
  "label": "Caption Text",
  "default": "—KARAN, FOUNDER",
  "info": "Attribution line below the quote (fully customizable, will be uppercase)"
}
```

**Why text?** Short single-line content, simpler input.

### Product Image (image_picker)

```json
{
  "type": "image_picker",
  "id": "product_image",
  "label": "Product Image",
  "info": "Upload a square image (1:1 ratio, minimum 1200x1200px recommended)..."
}
```

**Image requirements clearly stated** in the info text to guide merchants.

### Image Offset (range)

```json
{
  "type": "range",
  "id": "image_offset",
  "label": "Image Vertical Position",
  "min": -200,
  "max": 0,
  "step": 8,
  "unit": "px",
  "default": -128,
  "info": "Adjust how much of the image is visible. Negative values move image down..."
}
```

**Why range -200 to 0?**
- **0:** Image bottom edge aligns with container bottom (fully visible)
- **-128 (default):** Image extends 128px below container (partially hidden, optimal)
- **-200:** Image extends 200px below (more hidden)

**Why step: 8?** Maintains 8-divisibility for all measurements.

---

## Testing Checklist

### Visual Testing

- [ ] Background color is exactly `#212121` (dark charcoal)
- [ ] Text color is exactly `#FFFAF5` (light cream)
- [ ] Quote text is center-aligned
- [ ] Caption text is center-aligned and uppercase
- [ ] Product image is square (1:1 aspect ratio)
- [ ] Image appears to "emerge" from bottom with default offset

### Responsive Testing

**Desktop (1440px+):**
- [ ] Container is 1440px wide, 672px tall
- [ ] Quote text width is 704px
- [ ] Quote top margin is 104px
- [ ] Caption gap is 48px below quote
- [ ] Image is 800×800px
- [ ] Image default offset is -128px

**Tablet (768px-1023px):**
- [ ] Quote width is 512px
- [ ] Font sizes reduced (32px quote, 24px caption)
- [ ] Image is 600×600px
- [ ] Container has padding instead of fixed height

**Mobile (<768px):**
- [ ] Quote width adapts (448px, 384px, or 320px based on viewport)
- [ ] Font sizes reduced (24px quote, 20px caption)
- [ ] Image is 400×400px
- [ ] All content remains readable

### Content Testing

- [ ] Default quote text displays correctly
- [ ] Default caption text displays correctly
- [ ] Merchant can edit quote text via theme editor
- [ ] Merchant can edit caption text via theme editor
- [ ] Merchant can upload/change product image
- [ ] Image offset slider works (-200 to 0 range)

### Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] iOS Safari (mobile)
- [ ] Chrome Mobile (Android)

### Theme Editor Testing

- [ ] Section loads correctly in theme editor
- [ ] All settings update live without refresh
- [ ] Section can be added/removed without errors
- [ ] Default values match Figma design
- [ ] Image picker shows preview
- [ ] Range slider updates image position in real-time

### Accessibility Testing

- [ ] Image has proper `alt` attribute
- [ ] Color contrast is 14.8:1 (WCAG AAA compliant)
- [ ] Text remains readable at all sizes
- [ ] Section uses semantic HTML (`<section>`, `<p>`)
- [ ] No accessibility errors in browser console

### Performance Testing

- [ ] Image is lazy-loaded (`loading="lazy"`)
- [ ] Responsive images use `srcset` and `sizes`
- [ ] CSS file is properly linked
- [ ] No console errors
- [ ] Lighthouse performance score >90

---

## Common Issues & Solutions

### Issue: Text Not Centered

**Problem:** Quote or caption text appears left-aligned.

**Solution:**
1. Ensure wrapper has `text-align: center`
2. Quote wrapper should be center-aligned: `margin: 0 auto`
3. Check that no parent container overrides alignment

```css
.custom-diamension-before-footer-hero__quote-wrapper {
  margin-left: auto;
  margin-right: auto;
}

.custom-diamension-before-footer-hero__quote {
  text-align: center;
}
```

### Issue: Image Not Visible

**Problem:** Product image doesn't appear or is completely hidden.

**Solution:**
1. Check that image is uploaded in theme editor
2. Verify `position: absolute` on image wrapper
3. Ensure offset isn't too negative (try setting to 0 temporarily)
4. Check z-index isn't causing image to be behind wrapper

### Issue: Quote Text Width Not Responsive

**Problem:** Quote text doesn't adapt width at different breakpoints.

**Solution:**
Ensure all breakpoint media queries are correctly written:

```css
@media (max-width: 1439px) and (min-width: 1200px) {
  .custom-diamension-before-footer-hero__quote-wrapper {
    width: 640px;
  }
}

@media (max-width: 1199px) and (min-width: 1024px) {
  .custom-diamension-before-footer-hero__quote-wrapper {
    width: 576px;
  }
}

/* Continue for all breakpoints */
```

### Issue: Image Offset Slider Not Working

**Problem:** Moving the slider doesn't change image position.

**Solution:**
1. Verify inline style is being applied: `style="--image-offset: {{ section.settings.image_offset }}px;"`
2. Check CSS custom property syntax: `bottom: var(--image-offset, -128px);`
3. Ensure no other CSS is overriding the `bottom` property

### Issue: Container Height Too Tall on Mobile

**Problem:** Excessive white space on mobile devices.

**Solution:**
Change `min-height` to `auto` and use padding instead:

```css
@media (max-width: 1023px) {
  .custom-diamension-before-footer-hero__container {
    min-height: auto;
    padding: 80px 40px;
  }
}
```

### Issue: Image Not Maintaining Aspect Ratio

**Problem:** Image appears stretched or squashed.

**Solution:**
Ensure `aspect-ratio` and `object-fit` are applied:

```css
.custom-diamension-before-footer-hero__image {
  aspect-ratio: 1 / 1;
  object-fit: cover;
}
```

---

## Deployment Checklist

Before committing and deploying:

- [ ] File named correctly: `custom-diamension-before-footer-hero.liquid`
- [ ] CSS file named correctly: `section-diamension-before-footer-hero.css`
- [ ] All design tokens match specifications in `02-design-token.md`
- [ ] BEM naming convention followed throughout
- [ ] All responsive breakpoints tested
- [ ] Schema defaults match Figma design
- [ ] No core Dawn theme files modified
- [ ] Code is clean, commented, and readable
- [ ] All tests passed (visual, responsive, browser, theme editor)
- [ ] Figma design node referenced in comments

---

## Additional Resources

- **Figma Node:** https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-4897&m=dev
- **Shopify Liquid Docs:** https://shopify.dev/docs/api/liquid
- **Shopify Section Schema:** https://shopify.dev/docs/themes/architecture/sections/section-schema
- **Project Rules:** `docs/rules/` folder
- **BEM Methodology:** http://getbem.com/

---

## Support

If you encounter issues not covered in this guide:

1. Review all documentation in `docs/rules/`
2. Check Figma design node `12:4897` for visual reference
3. Verify all design tokens from `02-design-token.md` are correctly implemented
4. Test in multiple browsers and devices
5. Compare with existing section: `sections/headline-ring-collection.liquid`
6. Consult with team lead or senior developer

---

**Development Complete?** Run through the entire testing checklist and deployment checklist before marking this section as done.
