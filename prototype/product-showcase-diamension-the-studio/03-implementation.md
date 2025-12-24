# Implementation Guide - Product Showcase Studio

**Section Name:** Product Showcase - Diamension The Studio
**Version:** 1.0.0
**Implementation Date:** 2025-12-23

---

## Prerequisites

Before starting implementation, ensure you have:

1. ✓ Read `01-overview.md` completely
2. ✓ Read `02-design-tokens.md` for exact specifications
3. ✓ Read all relevant files in `docs/rules/`:
   - `01-WORKFLOW.md` - Complete development process
   - `02-DESIGN-EXTRACTION.md` - Figma extraction
   - `04-LIQUID-DEVELOPMENT.md` - Liquid coding standards
   - `05-CSS-STANDARDS.md` - CSS, BEM, breakpoints
   - `08-NAMING-CONVENTIONS.md` - File and class naming
4. ✓ Accessed Figma node (12:8844) to verify design
5. ✓ Shopify CLI running (`shopify theme dev`)

---

## Files to Create

### 1. Liquid Section File
**Path:** `sections/custom-section-product-showcase-studio.liquid`

### 2. CSS File
**Path:** `assets/section-product-showcase-studio.css`

### 3. No JavaScript Required
This is a static section with no interactive JavaScript functionality.

---

## Implementation Steps

### Step 1: Create Liquid Section File

**File:** `sections/custom-section-product-showcase-studio.liquid`

```liquid
{{ 'section-product-showcase-studio.css' | asset_url | stylesheet_tag }}

<div class="custom-section-product-showcase-studio" style="background-color: {{ section.settings.background_color }};">
  <div class="custom-section-product-showcase-studio__container">
    <div class="custom-section-product-showcase-studio__images">

      {%- if section.settings.image_left != blank -%}
        <div class="custom-section-product-showcase-studio__image-card custom-section-product-showcase-studio__image-card--left">
          <img
            src="{{ section.settings.image_left | image_url: width: 1200 }}"
            srcset="{{ section.settings.image_left | image_url: width: 600 }} 600w,
                    {{ section.settings.image_left | image_url: width: 1200 }} 1200w"
            sizes="(max-width: 767px) 100vw, 600px"
            alt="{{ section.settings.image_left_alt | escape }}"
            class="custom-section-product-showcase-studio__image"
            loading="lazy"
          >
        </div>
      {%- endif -%}

      {%- if section.settings.image_right != blank -%}
        <div class="custom-section-product-showcase-studio__image-card custom-section-product-showcase-studio__image-card--right">

          {%- if section.settings.heading != blank -%}
            <p
              class="custom-section-product-showcase-studio__heading"
              style="max-width: {{ section.settings.heading_width }}px;"
            >
              {{ section.settings.heading }}
            </p>
          {%- endif -%}

          <img
            src="{{ section.settings.image_right | image_url: width: 1200 }}"
            srcset="{{ section.settings.image_right | image_url: width: 600 }} 600w,
                    {{ section.settings.image_right | image_url: width: 1200 }} 1200w"
            sizes="(max-width: 767px) 100vw, 600px"
            alt="{{ section.settings.image_right_alt | escape }}"
            class="custom-section-product-showcase-studio__image"
            loading="lazy"
          >

          {%- if section.settings.cta_text != blank -%}
            <a
              href="{{ section.settings.cta_url }}"
              class="custom-section-product-showcase-studio__cta"
            >
              {{ section.settings.cta_text }}
            </a>
          {%- endif -%}

        </div>
      {%- endif -%}

    </div>
  </div>
</div>

{% schema %}
{
  "name": "Product Showcase Studio",
  "tag": "section",
  "class": "section-product-showcase-studio",
  "settings": [
    {
      "type": "header",
      "content": "Background Settings"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background Color",
      "default": "#FFFAF5"
    },
    {
      "type": "header",
      "content": "Left Image"
    },
    {
      "type": "image_picker",
      "id": "image_left",
      "label": "Left Product Image",
      "info": "Recommended: 600×800px or higher (transparent PNG preferred)"
    },
    {
      "type": "text",
      "id": "image_left_alt",
      "label": "Left Image Alt Text",
      "info": "Describe the image for accessibility",
      "default": "Product image"
    },
    {
      "type": "header",
      "content": "Right Image & Overlay Text"
    },
    {
      "type": "image_picker",
      "id": "image_right",
      "label": "Right Product Image",
      "info": "Recommended: 600×800px or higher (transparent PNG preferred)"
    },
    {
      "type": "text",
      "id": "image_right_alt",
      "label": "Right Image Alt Text",
      "info": "Describe the image for accessibility",
      "default": "Product image"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Overlay Heading",
      "default": "For the Ones Who Define Success",
      "info": "Positioned 112px from top of right image"
    },
    {
      "type": "range",
      "id": "heading_width",
      "label": "Heading Width (px)",
      "min": 150,
      "max": 300,
      "step": 1,
      "unit": "px",
      "default": 216,
      "info": "Fixed width for heading text container"
    },
    {
      "type": "text",
      "id": "cta_text",
      "label": "CTA Link Text",
      "default": "Explore",
      "info": "Positioned 144px from bottom of right image"
    },
    {
      "type": "url",
      "id": "cta_url",
      "label": "CTA Link URL",
      "info": "Where should the CTA link go?"
    }
  ],
  "presets": [
    {
      "name": "Product Showcase Studio"
    }
  ]
}
{% endschema %}
```

---

### Step 2: Create CSS File

**File:** `assets/section-product-showcase-studio.css`

```css
/* ============================================
   Product Showcase Studio Section
   ============================================ */

/* Wrapper - Full width background */
.custom-section-product-showcase-studio {
  width: 100%;
  background-color: #FFFAF5; /* Default, overridden by inline style */
}

/* Container - Max width with padding */
.custom-section-product-showcase-studio__container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 56px;
}

/* Images Container - Flexbox layout */
.custom-section-product-showcase-studio__images {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0; /* Space-between handles gap */
}

/* Image Card - 600×800px wrapper */
.custom-section-product-showcase-studio__image-card {
  position: relative;
  width: 600px;
  height: 800px;
  flex-shrink: 0;
}

/* Image - Fill wrapper with object-fit cover */
.custom-section-product-showcase-studio__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* Heading - Overlay text on right image */
.custom-section-product-showcase-studio__heading {
  position: absolute;
  top: 112px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  /* Typography */
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-style: italic;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  text-transform: uppercase;
  color: #183754;

  /* Layout */
  max-width: 216px; /* Overridden by inline style if schema value changes */
  margin: 0;
  padding: 0;
}

/* CTA Link - Overlay link on right image */
.custom-section-product-showcase-studio__cta {
  position: absolute;
  bottom: 144px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  /* Typography */
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 40px;
  color: #183754;
  text-decoration: underline;
  text-decoration-color: #183754;
  text-underline-offset: 25%;
  white-space: nowrap;

  /* Display */
  display: inline-block;
  transition: color 0.3s ease;
}

.custom-section-product-showcase-studio__cta:hover {
  color: rgba(24, 55, 84, 0.7);
}

.custom-section-product-showcase-studio__cta:focus {
  outline: 2px solid #183754;
  outline-offset: 4px;
}

/* ============================================
   Responsive Breakpoints
   ============================================ */

/* Large Desktop (1441px+) - Center container, don't stretch */
@media (min-width: 1441px) {
  .custom-section-product-showcase-studio__container {
    max-width: 1440px;
    margin: 0 auto;
  }
}

/* Tablet (1024px) - Adjust padding */
@media (max-width: 1024px) {
  .custom-section-product-showcase-studio__container {
    padding: 40px 40px;
  }

  /* Heading - Adjust font size */
  .custom-section-product-showcase-studio__heading {
    font-size: 18px;
    line-height: 27px;
  }

  /* CTA - Adjust font size */
  .custom-section-product-showcase-studio__cta {
    font-size: 18px;
    line-height: 36px;
  }
}

/* Mobile (767px and below) - Stack vertically */
@media (max-width: 767px) {
  .custom-section-product-showcase-studio__container {
    padding: 40px 20px;
  }

  /* Stack images vertically with gap */
  .custom-section-product-showcase-studio__images {
    flex-direction: column;
    align-items: center;
    gap: 64px;
  }

  /* Image cards - Scale to fit mobile width */
  .custom-section-product-showcase-studio__image-card {
    width: 100%;
    max-width: 600px;
    height: auto;
    aspect-ratio: 3 / 4; /* 600:800 = 3:4 */
  }

  /* Heading - Adjust font size */
  .custom-section-product-showcase-studio__heading {
    font-size: 16px;
    line-height: 24px;
    /* Position maintained: 112px from top */
  }

  /* CTA - Adjust font size */
  .custom-section-product-showcase-studio__cta {
    font-size: 16px;
    line-height: 32px;
    /* Position maintained: 144px from bottom */
  }
}

/* Small Mobile (375px and below) - Fine-tune if needed */
@media (max-width: 375px) {
  .custom-section-product-showcase-studio__container {
    padding: 40px 15px;
  }
}
```

---

### Step 3: Font Loading

**Option 1: If Neue Haas Grotesk Display Pro is Already Loaded**
- No action needed
- Verify by checking `layout/theme.liquid` for existing font imports

**Option 2: Add Google Fonts (if not loaded)**
Add to `layout/theme.liquid` in the `<head>` section:

```liquid
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Neue+Haas+Display:ital,wght@0,400;1,400&display=swap" rel="stylesheet">
```

**Option 3: Upload Custom Fonts**
If using custom font files:
1. Upload `.woff2` font files to `assets/fonts/`
2. Add `@font-face` declarations to CSS file

---

## BEM Class Structure

### Block
```css
.custom-section-product-showcase-studio
```

### Elements
```css
.custom-section-product-showcase-studio__container
.custom-section-product-showcase-studio__images
.custom-section-product-showcase-studio__image-card
.custom-section-product-showcase-studio__image
.custom-section-product-showcase-studio__heading
.custom-section-product-showcase-studio__cta
```

### Modifiers
```css
.custom-section-product-showcase-studio__image-card--left
.custom-section-product-showcase-studio__image-card--right
```

**Note:** Modifiers are optional but included for clarity and potential future styling differences.

---

## Schema Configuration Guide

### Image Settings

**Left Image:**
- `image_left` (image_picker): Main product image for left side
- `image_left_alt` (text): Alt text for accessibility

**Right Image:**
- `image_right` (image_picker): Main product image for right side with overlay
- `image_right_alt` (text): Alt text for accessibility

**Info Text:**
- Recommend merchants upload transparent PNGs at 600×800px or higher (2x for retina: 1200×1600px)

### Text Settings

**Heading:**
- `heading` (text): Overlay heading text on right image
- `heading_width` (range): Configurable width (150-300px, default 216px)
- Position: 112px from top (hardcoded in CSS)

**CTA:**
- `cta_text` (text): Call-to-action link text
- `cta_url` (url): Destination URL for CTA
- Position: 144px from bottom (hardcoded in CSS)

### Background Settings

**Background Color:**
- `background_color` (color): Wrapper background color
- Default: #FFFAF5

---

## Testing Procedure

### Local Development Testing

1. **Start Shopify CLI:**
   ```bash
   shopify theme dev
   ```

2. **Access Theme Editor:**
   - Navigate to `http://localhost:9292/admin/themes/current/editor`

3. **Add Section:**
   - Add "Product Showcase Studio" section to a page (e.g., The Studio page)

4. **Test Section Settings:**
   - Upload left image (transparent PNG)
   - Upload right image (transparent PNG)
   - Enter heading text: "For the Ones Who Define Success"
   - Enter CTA text: "Explore"
   - Enter CTA URL: "/collections/all" (or any test URL)
   - Adjust heading width: Test 150px, 216px, 300px

5. **Visual Verification:**
   - ✓ Images display side-by-side on desktop
   - ✓ Images are 600×800px
   - ✓ Background color is #FFFAF5
   - ✓ Heading appears 112px from top of right image
   - ✓ CTA appears 144px from bottom of right image
   - ✓ Heading width is 216px (or custom value)
   - ✓ CTA has underline decoration
   - ✓ Text color is #183754

### Responsive Testing

**Desktop (1440px):**
- Container max-width: 1440px
- Padding: 40px top/bottom, 56px sides
- Images: Side-by-side with space-between
- Font sizes: 20px (heading and CTA)

**Tablet (1024px):**
- Container: Full width with 40px side padding
- Images: Still side-by-side
- Font sizes: 18px (heading and CTA)

**Mobile (767px and below):**
- Container: Full width with 20px side padding
- Images: Stacked vertically with 64px gap
- Each image: Full width (maintains aspect ratio)
- Font sizes: 16px (heading and CTA)
- Overlay positions maintained (112px top, 144px bottom)

### Browser Testing
- Chrome/Edge (latest)
- Safari (latest)
- Firefox (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

---

## Common Issues & Solutions

### Issue 1: Images Not Displaying
**Cause:** Images not uploaded or `!= blank` conditional failing
**Solution:**
- Verify images are uploaded in section settings
- Check Liquid conditional syntax
- Inspect browser console for 404 errors

### Issue 2: Overlay Text Not Positioned Correctly
**Cause:** `position: relative` missing on `.image-card`
**Solution:**
- Ensure `.custom-section-product-showcase-studio__image-card` has `position: relative`
- Verify `top` and `bottom` values are correct in CSS

### Issue 3: Images Not Filling Wrapper
**Cause:** `object-fit: cover` not working or image dimensions wrong
**Solution:**
- Verify image wrapper has fixed `width: 600px` and `height: 800px`
- Ensure image has `width: 100%` and `height: 100%`
- Check `object-fit: cover` and `object-position: center` are applied

### Issue 4: Fonts Not Loading
**Cause:** Font files missing or Google Fonts link not added
**Solution:**
- Check if Neue Haas Grotesk Display Pro is loaded in `theme.liquid`
- Add Google Fonts link if needed
- Verify font-family name is correct in CSS

### Issue 5: Mobile Images Not Stacking
**Cause:** Flexbox `flex-direction: column` not applied on mobile
**Solution:**
- Verify `@media (max-width: 767px)` breakpoint includes `flex-direction: column`
- Check `gap: 64px` is applied

### Issue 6: Text Underline Not Showing Offset
**Cause:** `text-underline-offset` not supported in older browsers
**Solution:**
- Use `border-bottom` as fallback:
  ```css
  .custom-section-product-showcase-studio__cta {
    text-decoration: none;
    border-bottom: 1px solid #183754;
    padding-bottom: 8px;
  }
  ```

---

## Performance Optimization

### Image Optimization
1. **Use `loading="lazy"`:**
   - Already included in Liquid markup
   - Defers loading of off-screen images

2. **Use `srcset` for Responsive Images:**
   - Already included in Liquid markup
   - Provides 600w and 1200w versions

3. **Compress Images:**
   - Recommend merchants use TinyPNG or similar tools
   - Target: < 200KB per image

### CSS Optimization
- Single CSS file (no imports)
- Minimal class nesting
- No `!important` declarations

---

## Accessibility Checklist

- [ ] Alt text fields provided for both images
- [ ] Color contrast ratio: #183754 on #FFFAF5 passes WCAG AAA
- [ ] CTA link has visible focus state (`:focus` outline)
- [ ] Text overlay readable against image backgrounds
- [ ] Semantic HTML used (no divs where `<a>` or `<p>` appropriate)
- [ ] Keyboard navigation works for CTA link

---

## Deployment Checklist

Before committing to Git:

- [ ] Liquid section file created and tested
- [ ] CSS file created and linked correctly
- [ ] Schema settings complete with defaults
- [ ] BEM methodology used for all classes
- [ ] Responsive design tested at all breakpoints (1441px+, 1024px, 767px, 375px)
- [ ] Fonts loading correctly
- [ ] Images display with object-fit: cover
- [ ] Overlay text positioned correctly (112px top, 144px bottom)
- [ ] CTA link works and has underline
- [ ] Background color configurable via schema
- [ ] Alt text fields work for accessibility
- [ ] No core theme files modified
- [ ] Code is clean, commented, and follows project standards
- [ ] Section works in Shopify theme editor
- [ ] Preview on live store (if applicable)

---

## Git Commit Message

When ready to commit:

```bash
git add sections/custom-section-product-showcase-studio.liquid
git add assets/section-product-showcase-studio.css
git commit -m "[Feature] Add Product Showcase Studio section

- Two side-by-side product images (600×800px)
- Overlay heading and CTA on right image
- Fully responsive (desktop/tablet/mobile)
- Configurable via section settings
- BEM methodology for CSS
- Figma node: 12:8844"
```

---

## Next Steps After Implementation

1. **Test in Production:**
   - Deploy to staging/production environment
   - Test with real merchant-uploaded images
   - Verify performance on live site

2. **Documentation:**
   - Update merchant documentation if needed
   - Add screenshots to `screenshots/` folder

3. **Merchant Training:**
   - Create guide for uploading images
   - Explain optimal image dimensions (600×800px)
   - Show how to customize heading and CTA

4. **Future Enhancements (Optional):**
   - Add animation on scroll (fade-in effect)
   - Add hover effect on images (zoom or overlay)
   - Allow customization of overlay positions via schema
   - Add optional background image instead of solid color

---

## References

- **Figma Node:** https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-8844&m=dev
- **Design Tokens:** `02-design-tokens.md`
- **Overview:** `01-overview.md`
- **CSS Standards:** `docs/rules/05-CSS-STANDARDS.md`
- **Liquid Development:** `docs/rules/04-LIQUID-DEVELOPMENT.md`
- **BEM Methodology:** `docs/rules/05-CSS-STANDARDS.md`
- **Naming Conventions:** `docs/rules/08-NAMING-CONVENTIONS.md`

---

## Support

If you encounter issues during implementation:

1. Review `docs/rules/` for standards and best practices
2. Check Figma node (12:8844) for visual clarification
3. Reference existing sections in `prototype/` folder
4. Test in Shopify theme editor (localhost:9292)
5. Ask for clarification if specifications are unclear

**Happy Coding!**
