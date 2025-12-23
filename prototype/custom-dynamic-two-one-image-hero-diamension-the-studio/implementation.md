# Implementation Plan - Dynamic Hero Studio

**Development Approach:** Direct Liquid development
**Testing Framework:** Playwright
**Status:** Planning Phase

---

## Files to Create

### 1. Liquid Section
```
sections/custom-section-dynamic-hero-studio.liquid
```

### 2. CSS File
```
assets/section-dynamic-hero-studio.css
```

### 3. JavaScript File (Optional)
```
assets/section-dynamic-hero-studio.js
```

**Note:** JavaScript may not be needed if section is purely presentational.

---

## Schema Structure

### Section Settings

```json
{
  "name": "Dynamic Hero - Studio",
  "settings": [
    {
      "type": "header",
      "content": "Image 1"
    },
    {
      "type": "image_picker",
      "id": "image_1",
      "label": "Image 1"
    },
    {
      "type": "text",
      "id": "image_1_overlay_text",
      "label": "Image 1 - Overlay Text",
      "default": "Beauty",
      "info": "Decorative script text shown on image"
    },
    {
      "type": "range",
      "id": "image_1_overlay_text_size_desktop",
      "label": "Image 1 - Overlay Text Size (Desktop)",
      "min": 80,
      "max": 200,
      "step": 10,
      "unit": "px",
      "default": 160
    },
    {
      "type": "range",
      "id": "image_1_overlay_text_size_tablet",
      "label": "Image 1 - Overlay Text Size (Tablet)",
      "min": 60,
      "max": 160,
      "step": 10,
      "unit": "px",
      "default": 100
    },
    {
      "type": "range",
      "id": "image_1_overlay_text_size_mobile",
      "label": "Image 1 - Overlay Text Size (Mobile)",
      "min": 40,
      "max": 120,
      "step": 10,
      "unit": "px",
      "default": 60
    },
    {
      "type": "header",
      "content": "Image 2 (Optional)"
    },
    {
      "type": "image_picker",
      "id": "image_2",
      "label": "Image 2",
      "info": "Leave empty for single image layout"
    },
    {
      "type": "text",
      "id": "image_2_overlay_text",
      "label": "Image 2 - Overlay Text",
      "default": "Beauty"
    },
    {
      "type": "range",
      "id": "image_2_overlay_text_size_desktop",
      "label": "Image 2 - Overlay Text Size (Desktop)",
      "min": 80,
      "max": 200,
      "step": 10,
      "unit": "px",
      "default": 160
    },
    {
      "type": "range",
      "id": "image_2_overlay_text_size_tablet",
      "label": "Image 2 - Overlay Text Size (Tablet)",
      "min": 60,
      "max": 160,
      "step": 10,
      "unit": "px",
      "default": 100
    },
    {
      "type": "range",
      "id": "image_2_overlay_text_size_mobile",
      "label": "Image 2 - Overlay Text Size (Mobile)",
      "min": 40,
      "max": 120,
      "step": 10,
      "unit": "px",
      "default": 60
    },
    {
      "type": "header",
      "content": "Content"
    },
    {
      "type": "text",
      "id": "tagline",
      "label": "Tagline",
      "default": "Sleek. Minimal. Commanding.",
      "info": "Displayed above description (leave empty to hide)"
    },
    {
      "type": "richtext",
      "id": "description",
      "label": "Description",
      "default": "<p>Created in our solar-powered ateliers, the Solaris ring fuses purposeful design with precision-cut lab-grown diamonds set in 14K rose gold. A symbol of forward-thinking elegance.</p>"
    }
  ],
  "presets": [
    {
      "name": "Dynamic Hero - Studio"
    }
  ]
}
```

---

## Liquid Structure

### Main Section Markup

```liquid
{{ 'section-dynamic-hero-studio.css' | asset_url | stylesheet_tag }}

{%- liquid
  assign has_image_1 = false
  assign has_image_2 = false
  assign has_tagline = false
  assign has_description = false

  if section.settings.image_1 != blank
    assign has_image_1 = true
  endif

  if section.settings.image_2 != blank
    assign has_image_2 = true
  endif

  if section.settings.tagline != blank
    assign has_tagline = true
  endif

  if section.settings.description != blank
    assign has_description = true
  endif

  assign layout_class = 'single-image'
  if has_image_2
    assign layout_class = 'two-images'
  endif
-%}

<div class="custom-section-dynamic-hero-studio custom-section-dynamic-hero-studio--{{ layout_class }}">
  <div class="custom-section-dynamic-hero-studio__wrapper">
    <div class="custom-section-dynamic-hero-studio__container">

      {%- if has_image_1 or has_image_2 -%}
        <div class="custom-section-dynamic-hero-studio__images">

          {%- if has_image_1 -%}
            <div class="custom-section-dynamic-hero-studio__image-wrapper">
              <img
                class="custom-section-dynamic-hero-studio__image"
                src="{{ section.settings.image_1 | image_url: width: 1376 }}"
                srcset="{{ section.settings.image_1 | image_url: width: 688 }} 688w,
                        {{ section.settings.image_1 | image_url: width: 1376 }} 1376w"
                sizes="(max-width: 767px) 90vw, 688px"
                alt="{{ section.settings.image_1.alt | escape }}"
                loading="lazy"
              >
              {%- if section.settings.image_1_overlay_text != blank -%}
                <p
                  class="custom-section-dynamic-hero-studio__image-overlay-text custom-section-dynamic-hero-studio__image-overlay-text--image-1"
                  style="
                    --overlay-size-desktop: {{ section.settings.image_1_overlay_text_size_desktop }}px;
                    --overlay-size-tablet: {{ section.settings.image_1_overlay_text_size_tablet }}px;
                    --overlay-size-mobile: {{ section.settings.image_1_overlay_text_size_mobile }}px;
                  "
                >
                  {{ section.settings.image_1_overlay_text }}
                </p>
              {%- endif -%}
            </div>
          {%- endif -%}

          {%- if has_image_2 -%}
            <div class="custom-section-dynamic-hero-studio__image-wrapper">
              <img
                class="custom-section-dynamic-hero-studio__image"
                src="{{ section.settings.image_2 | image_url: width: 1376 }}"
                srcset="{{ section.settings.image_2 | image_url: width: 688 }} 688w,
                        {{ section.settings.image_2 | image_url: width: 1376 }} 1376w"
                sizes="(max-width: 767px) 90vw, 688px"
                alt="{{ section.settings.image_2.alt | escape }}"
                loading="lazy"
              >
              {%- if section.settings.image_2_overlay_text != blank -%}
                <p
                  class="custom-section-dynamic-hero-studio__image-overlay-text custom-section-dynamic-hero-studio__image-overlay-text--image-2"
                  style="
                    --overlay-size-desktop: {{ section.settings.image_2_overlay_text_size_desktop }}px;
                    --overlay-size-tablet: {{ section.settings.image_2_overlay_text_size_tablet }}px;
                    --overlay-size-mobile: {{ section.settings.image_2_overlay_text_size_mobile }}px;
                  "
                >
                  {{ section.settings.image_2_overlay_text }}
                </p>
              {%- endif -%}
            </div>
          {%- endif -%}

        </div>
      {%- endif -%}

      {%- if has_tagline or has_description -%}
        <div class="custom-section-dynamic-hero-studio__content">
          {%- if has_tagline -%}
            <p class="custom-section-dynamic-hero-studio__tagline">
              {{ section.settings.tagline }}
            </p>
          {%- endif -%}

          {%- if has_description -%}
            <div class="custom-section-dynamic-hero-studio__description">
              {{ section.settings.description }}
            </div>
          {%- endif -%}
        </div>
      {%- endif -%}

    </div>
  </div>
</div>

{% schema %}
[JSON schema here]
{% endschema %}
```

---

## CSS Structure (BEM)

### Root Styles & Variables

```css
:root {
  /* Colors */
  --hero-studio-bg: #FFFAF5;
  --hero-studio-text: #183754;
  --hero-studio-overlay-text: #FFF5F6;

  /* Dimensions */
  --hero-studio-max-width: 1440px;
  --hero-studio-height: 1040px;
  --hero-studio-image-width: 688px;
  --hero-studio-image-height: 1032px;
  --hero-studio-image-gap: 32px;

  /* Spacing */
  --hero-studio-padding-bottom-desktop: 128px;
  --hero-studio-content-gap-lg: 32px;
  --hero-studio-content-gap-sm: 16px;
  --hero-studio-overlay-bottom: 64px;

  /* Typography */
  --hero-studio-tagline-size: 30px;
  --hero-studio-tagline-height: 50px;
  --hero-studio-description-size: 20px;
  --hero-studio-description-height: 28px;
}
```

### Block

```css
.custom-section-dynamic-hero-studio {
  /* Container for entire section */
}
```

### Elements

```css
.custom-section-dynamic-hero-studio__wrapper {
  /* Full-width wrapper with background color */
  background-color: var(--hero-studio-bg);
  height: var(--hero-studio-height);
}

.custom-section-dynamic-hero-studio__container {
  /* Max-width container, centered */
  max-width: var(--hero-studio-max-width);
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: var(--hero-studio-padding-bottom-desktop);
}

.custom-section-dynamic-hero-studio__images {
  /* Container for 1 or 2 images */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: var(--hero-studio-image-gap);
}

.custom-section-dynamic-hero-studio__image-wrapper {
  /* Individual image wrapper */
  position: relative;
  width: 534px;
  height: 731px;
  overflow: hidden;
}

.custom-section-dynamic-hero-studio__image {
  /* Image styling */
  width: var(--hero-studio-image-width);
  height: var(--hero-studio-image-height);
  object-fit: contain;
  display: block;
}

.custom-section-dynamic-hero-studio__image-overlay-text {
  /* Decorative script text on image */
  position: absolute;
  bottom: var(--hero-studio-overlay-bottom);
  left: 108.96px;
  font-family: 'Bickham Script Pro', cursive;
  font-size: var(--overlay-size-desktop);
  line-height: 1;
  letter-spacing: 3.2px;
  color: var(--hero-studio-overlay-text);
  white-space: nowrap;
  pointer-events: none;
}

.custom-section-dynamic-hero-studio__content {
  /* Text content below images */
  text-align: center;
  margin-top: var(--hero-studio-content-gap-lg);
}

.custom-section-dynamic-hero-studio__tagline {
  /* Uppercase tagline */
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-weight: 300; /* 45 Light */
  font-size: var(--hero-studio-tagline-size);
  line-height: var(--hero-studio-tagline-height);
  color: var(--hero-studio-text);
  text-transform: uppercase;
  margin: 0;
}

.custom-section-dynamic-hero-studio__description {
  /* Description text */
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-weight: 400; /* 55 Roman */
  font-size: var(--hero-studio-description-size);
  line-height: var(--hero-studio-description-height);
  color: var(--hero-studio-text);
  max-width: 553.77px;
  margin: var(--hero-studio-content-gap-sm) auto 0;
}
```

### Modifiers

```css
.custom-section-dynamic-hero-studio--single-image {
  /* Modifier for single image layout */
}

.custom-section-dynamic-hero-studio--two-images {
  /* Modifier for two image layout */
}
```

---

## Responsive Breakpoints

### Tablet (1024px)

```css
@media (max-width: 1024px) {
  :root {
    --hero-studio-padding-bottom-desktop: 100px;
    --hero-studio-tagline-size: 26px;
    --hero-studio-tagline-height: 42px;
    --hero-studio-description-size: 18px;
    --hero-studio-description-height: 26px;
  }

  .custom-section-dynamic-hero-studio__image-wrapper {
    width: 450px;
    height: 600px;
  }

  .custom-section-dynamic-hero-studio__image {
    width: 580px;
    height: 870px;
  }

  .custom-section-dynamic-hero-studio__image-overlay-text {
    font-size: var(--overlay-size-tablet);
    left: 90px;
  }
}
```

### Mobile (767px)

```css
@media (max-width: 767px) {
  :root {
    --hero-studio-padding-bottom-desktop: 80px;
    --hero-studio-tagline-size: 22px;
    --hero-studio-tagline-height: 36px;
    --hero-studio-description-size: 16px;
    --hero-studio-description-height: 24px;
    --hero-studio-image-gap: 16px;
    --hero-studio-content-gap-lg: 24px;
    --hero-studio-content-gap-sm: 12px;
  }

  .custom-section-dynamic-hero-studio__container {
    padding: 0 20px;
  }

  .custom-section-dynamic-hero-studio__image-wrapper {
    width: 300px;
    height: 450px;
  }

  .custom-section-dynamic-hero-studio__image {
    width: 385px;
    height: 578px;
  }

  .custom-section-dynamic-hero-studio__image-overlay-text {
    font-size: var(--overlay-size-mobile);
    left: 60px;
    bottom: 40px;
  }

  .custom-section-dynamic-hero-studio__description {
    max-width: 90%;
  }
}
```

### Small Mobile (375px)

```css
@media (max-width: 375px) {
  .custom-section-dynamic-hero-studio__image-wrapper {
    width: 250px;
    height: 380px;
  }

  .custom-section-dynamic-hero-studio__image {
    width: 320px;
    height: 480px;
  }

  .custom-section-dynamic-hero-studio__image-overlay-text {
    left: 50px;
    bottom: 30px;
  }
}
```

---

## JavaScript (Optional)

If needed for dynamic height calculations or interactions:

```javascript
class DynamicHeroStudio {
  constructor(section) {
    this.section = section;
    this.container = section.querySelector('.custom-section-dynamic-hero-studio__container');

    this.init();
  }

  init() {
    // Calculate and adjust padding-bottom to maintain 1040px height
    this.adjustPadding();

    // Recalculate on window resize
    window.addEventListener('resize', this.debounce(() => {
      this.adjustPadding();
    }, 250));
  }

  adjustPadding() {
    const sectionHeight = 1040;
    const imagesHeight = this.getImagesHeight();
    const contentHeight = this.getContentHeight();
    const gaps = this.calculateGaps();

    const requiredPadding = sectionHeight - imagesHeight - contentHeight - gaps;

    if (requiredPadding > 0) {
      this.container.style.paddingBottom = `${requiredPadding}px`;
    }
  }

  getImagesHeight() {
    const imagesContainer = this.section.querySelector('.custom-section-dynamic-hero-studio__images');
    return imagesContainer ? imagesContainer.offsetHeight : 0;
  }

  getContentHeight() {
    const content = this.section.querySelector('.custom-section-dynamic-hero-studio__content');
    return content ? content.offsetHeight : 0;
  }

  calculateGaps() {
    let gaps = 0;
    const hasTagline = this.section.querySelector('.custom-section-dynamic-hero-studio__tagline');
    const hasDescription = this.section.querySelector('.custom-section-dynamic-hero-studio__description');

    if (hasTagline || hasDescription) {
      gaps += 32; // Image to content gap
    }
    if (hasTagline && hasDescription) {
      gaps += 16; // Tagline to description gap
    }

    return gaps;
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const heroSections = document.querySelectorAll('.custom-section-dynamic-hero-studio');
  heroSections.forEach(section => new DynamicHeroStudio(section));
});
```

**Note:** JavaScript may not be needed if CSS alone can handle the 1040px height constraint with proper calculations.

---

## Development Checklist

### Phase 1: Setup
- [ ] Create `sections/custom-section-dynamic-hero-studio.liquid`
- [ ] Create `assets/section-dynamic-hero-studio.css`
- [ ] Link CSS in Liquid file
- [ ] Add schema settings

### Phase 2: Liquid Development
- [ ] Implement conditional rendering logic
- [ ] Add image 1 markup with overlay text
- [ ] Add image 2 markup with overlay text (conditional)
- [ ] Add tagline (conditional)
- [ ] Add description (conditional)
- [ ] Apply inline styles for overlay text sizing

### Phase 3: CSS Development
- [ ] Set up CSS variables
- [ ] Style wrapper and container
- [ ] Style images container and wrappers
- [ ] Style individual images
- [ ] Style overlay text with positioning
- [ ] Style content area (tagline + description)
- [ ] Implement responsive breakpoints (1024px, 767px, 375px)
- [ ] Test 1040px height constraint at all breakpoints

### Phase 4: Testing
- [ ] Test single image layout
- [ ] Test two image layout
- [ ] Test with overlay text
- [ ] Test without overlay text
- [ ] Test with tagline
- [ ] Test without tagline
- [ ] Test responsive scaling on tablet
- [ ] Test responsive scaling on mobile
- [ ] Verify section height is 1040px on all devices
- [ ] Verify 32px gap between two images
- [ ] Verify overlay text positioned 64px from bottom
- [ ] Test in Shopify theme editor
- [ ] Visual comparison with Figma designs

### Phase 5: Optimization
- [ ] Verify image lazy loading
- [ ] Check font loading
- [ ] Ensure no layout shift
- [ ] Validate accessibility (alt text, semantic HTML)
- [ ] Test with long/short content variations

---

## Testing Strategy

### Manual Testing in Theme Editor
1. Add section to The Studio page
2. Upload single image → verify layout
3. Upload second image → verify two-column layout with gap
4. Add overlay text to both → verify positioning
5. Add tagline and description → verify spacing
6. Test responsive views in theme editor
7. Verify all conditional rendering scenarios

### Playwright Tests
Create: `tests/liquid/section-dynamic-hero-studio/dynamic-hero-studio.spec.js`

Test cases:
- Single image renders correctly
- Two images render side-by-side with 32px gap
- Overlay text positioned 64px from bottom
- Tagline displays when provided
- Description displays when provided
- Section height is 1040px
- Responsive scaling works correctly
- Visual regression against Figma screenshots

---

## Known Challenges & Solutions

### Challenge 1: Maintaining 1040px Height
**Problem:** Content varies, padding-bottom must adjust
**Solution:** Use CSS calculations or JavaScript to dynamically set padding-bottom

### Challenge 2: Two Images on Small Mobile
**Problem:** Two images may be too cramped side-by-side
**Solution:** Scale images aggressively, reduce gap to 16px on mobile

### Challenge 3: Overlay Text Responsiveness
**Problem:** Fixed 160px font size too large on mobile
**Solution:** Provide schema settings for desktop/tablet/mobile sizes

### Challenge 4: Image Aspect Ratio Variations
**Problem:** Merchant may upload images with different aspect ratios
**Solution:** object-fit: contain ensures no cropping, container overflow: hidden clips excess

---

## Future Enhancements (Optional)

- Add animation on scroll (fade in, parallax)
- Allow custom background color via schema
- Add optional CTA button below description
- Support video instead of images
- Add image captions
- Allow repositioning of overlay text (top/bottom/left/right)

---

## Notes

- This section is designed for The Studio page but can be reused elsewhere
- Keep schema simple and intuitive for merchants
- Prioritize visual accuracy to Figma over complex features
- Ensure performant image loading (lazy, srcset)
- Follow all BEM and coding standards from `docs/rules/`
