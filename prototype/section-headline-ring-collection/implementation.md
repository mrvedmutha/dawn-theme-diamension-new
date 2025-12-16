# Implementation Guide: Headline Ring Collection Section

## Prerequisites

- [ ] Read `overview.md` completely
- [ ] Read `design-tokens.md` for all specifications
- [ ] Review Figma design node: `12:4785`
- [ ] Read all documentation in `docs/rules/` folder
- [ ] Verify GSAP is loaded in `theme.liquid`

## File Structure

```
sections/
└── headline-ring-collection.liquid

assets/
├── headline-ring-collection.css (or .scss)
└── headline-ring-collection.js

snippets/
└── (none required for this section)
```

## Implementation Steps

### Step 1: Create Section File

**File:** `sections/headline-ring-collection.liquid`

#### Section Structure

```liquid
{%- comment -%}
  Section: Headline Ring Collection
  Description: Hero section with parallax product image and sustainability messaging
  Figma Node: 12:4785
{%- endcomment -%}

{%- liquid
  # Assign section settings to variables
  assign headline_line_1 = section.settings.headline_line_1
  assign headline_line_2 = section.settings.headline_line_2
  assign headline_line_3 = section.settings.headline_line_3
  assign cta_text = section.settings.cta_text
  assign cta_url = section.settings.cta_url
  assign product_image = section.settings.product_image
  assign paragraph_content = section.settings.paragraph_content
  assign feature_1_icon = section.settings.feature_1_icon
  assign feature_1_text = section.settings.feature_1_text
  assign feature_2_icon = section.settings.feature_2_icon
  assign feature_2_text = section.settings.feature_2_text
  assign badge_1_image = section.settings.badge_1_image
  assign badge_2_image = section.settings.badge_2_image
-%}

<section
  class="headline-ring-collection"
  data-section-id="{{ section.id }}"
  data-section-type="headline-ring-collection"
>
  <div class="headline-ring-collection__wrapper">
    <div class="headline-ring-collection__container">

      {%- comment -%} Headlines {%- endcomment -%}
      <div class="headline-ring-collection__headlines">
        {%- if headline_line_1 != blank -%}
          <h2 class="headline-ring-collection__headline headline-ring-collection__headline--line-1">
            {{ headline_line_1 }}
          </h2>
        {%- endif -%}

        {%- if headline_line_2 != blank -%}
          <h2 class="headline-ring-collection__headline headline-ring-collection__headline--line-2">
            {{ headline_line_2 }}
          </h2>
        {%- endif -%}

        {%- if headline_line_3 != blank -%}
          <h2 class="headline-ring-collection__headline headline-ring-collection__headline--line-3">
            {{ headline_line_3 }}
          </h2>
        {%- endif -%}
      </div>

      {%- comment -%} CTA Link {%- endcomment -%}
      {%- if cta_text != blank and cta_url != blank -%}
        <a
          href="{{ cta_url }}"
          class="headline-ring-collection__cta"
        >
          {{ cta_text }}
        </a>
      {%- endif -%}

      {%- comment -%} Product Image with Parallax {%- endcomment -%}
      {%- if product_image != blank -%}
        <div class="headline-ring-collection__image-wrapper" data-parallax-image>
          {{- product_image | image_url: width: 608 | image_tag:
            loading: 'lazy',
            widths: '304, 456, 608',
            class: 'headline-ring-collection__image',
            alt: product_image.alt | default: 'Product image'
          -}}
        </div>
      {%- endif -%}

      {%- comment -%} Paragraph Content {%- endcomment -%}
      {%- if paragraph_content != blank -%}
        <div class="headline-ring-collection__content">
          <p class="headline-ring-collection__paragraph">
            {{ paragraph_content }}
          </p>
        </div>
      {%- endif -%}

      {%- comment -%} Feature Icons {%- endcomment -%}
      <div class="headline-ring-collection__features">

        {%- if feature_1_icon != blank or feature_1_text != blank -%}
          <div class="headline-ring-collection__feature">
            {%- if feature_1_icon != blank -%}
              <div class="headline-ring-collection__feature-icon">
                {{- feature_1_icon | image_url: width: 100 | image_tag:
                  loading: 'lazy',
                  class: 'headline-ring-collection__icon',
                  alt: 'Quality craftmanship icon'
                -}}
              </div>
            {%- endif -%}
            {%- if feature_1_text != blank -%}
              <p class="headline-ring-collection__feature-text">
                {{ feature_1_text }}
              </p>
            {%- endif -%}
          </div>
        {%- endif -%}

        {%- if feature_2_icon != blank or feature_2_text != blank -%}
          <div class="headline-ring-collection__feature">
            {%- if feature_2_icon != blank -%}
              <div class="headline-ring-collection__feature-icon">
                {{- feature_2_icon | image_url: width: 100 | image_tag:
                  loading: 'lazy',
                  class: 'headline-ring-collection__icon',
                  alt: 'Sustainability icon'
                -}}
              </div>
            {%- endif -%}
            {%- if feature_2_text != blank -%}
              <p class="headline-ring-collection__feature-text">
                {{ feature_2_text }}
              </p>
            {%- endif -%}
          </div>
        {%- endif -%}

      </div>

      {%- comment -%} Certification Badges {%- endcomment -%}
      <div class="headline-ring-collection__badges">
        {%- if badge_1_image != blank -%}
          <div class="headline-ring-collection__badge">
            {{- badge_1_image | image_url: width: 200 | image_tag:
              loading: 'lazy',
              class: 'headline-ring-collection__badge-image',
              alt: badge_1_image.alt | default: 'Certification badge'
            -}}
          </div>
        {%- endif -%}

        {%- if badge_2_image != blank -%}
          <div class="headline-ring-collection__badge">
            {{- badge_2_image | image_url: width: 200 | image_tag:
              loading: 'lazy',
              class: 'headline-ring-collection__badge-image',
              alt: badge_2_image.alt | default: 'Certification badge'
            -}}
          </div>
        {%- endif -%}
      </div>

    </div>
  </div>
</section>

{% schema %}
{
  "name": "Headline Ring Collection",
  "tag": "section",
  "class": "section-headline-ring-collection",
  "settings": [
    {
      "type": "header",
      "content": "Headlines"
    },
    {
      "type": "text",
      "id": "headline_line_1",
      "label": "Headline Line 1",
      "default": "BRILLIANCE",
      "info": "First line of the headline (center-aligned)"
    },
    {
      "type": "text",
      "id": "headline_line_2",
      "label": "Headline Line 2",
      "default": "WITHOUT",
      "info": "Second line of the headline"
    },
    {
      "type": "text",
      "id": "headline_line_3",
      "label": "Headline Line 3",
      "default": "COMPROMISE",
      "info": "Third line of the headline"
    },
    {
      "type": "header",
      "content": "Call to Action"
    },
    {
      "type": "text",
      "id": "cta_text",
      "label": "CTA Text",
      "default": "Our story",
      "info": "Call to action link text"
    },
    {
      "type": "url",
      "id": "cta_url",
      "label": "CTA URL",
      "info": "Link destination"
    },
    {
      "type": "header",
      "content": "Product Image"
    },
    {
      "type": "image_picker",
      "id": "product_image",
      "label": "Product Image",
      "info": "Upload a square image (e.g., 1000×1000px) for best results. Image will rotate 3° and have parallax effect."
    },
    {
      "type": "header",
      "content": "Content"
    },
    {
      "type": "textarea",
      "id": "paragraph_content",
      "label": "Paragraph Content",
      "default": "Our diamonds are chemically, physically, and optically identical to mined diamonds — the only difference is the journey. Crafted with cutting-edge technology and ethical values, each stone delivers pure beauty without the environmental and financial cost.",
      "info": "Main description paragraph"
    },
    {
      "type": "header",
      "content": "Feature 1 - Quality"
    },
    {
      "type": "image_picker",
      "id": "feature_1_icon",
      "label": "Feature 1 Icon",
      "info": "SVG or PNG icon for quality craftmanship"
    },
    {
      "type": "text",
      "id": "feature_1_text",
      "label": "Feature 1 Text",
      "default": "QUALITY CRAFTMANSHIP"
    },
    {
      "type": "header",
      "content": "Feature 2 - Sustainability"
    },
    {
      "type": "image_picker",
      "id": "feature_2_icon",
      "label": "Feature 2 Icon",
      "info": "SVG or PNG icon for sustainability"
    },
    {
      "type": "text",
      "id": "feature_2_text",
      "label": "Feature 2 Text",
      "default": "PLANET FRIENDLY AND SUSTAINABLY MADE"
    },
    {
      "type": "header",
      "content": "Certification Badges"
    },
    {
      "type": "image_picker",
      "id": "badge_1_image",
      "label": "Badge 1 (IGI)",
      "info": "First certification badge image"
    },
    {
      "type": "image_picker",
      "id": "badge_2_image",
      "label": "Badge 2 (GIA)",
      "info": "Second certification badge image"
    }
  ],
  "presets": [
    {
      "name": "Headline Ring Collection"
    }
  ]
}
{% endschema %}
```

---

### Step 2: Create CSS/SCSS File

**File:** `assets/headline-ring-collection.scss`

```scss
/* ==========================================================================
   Headline Ring Collection Section
   Figma Node: 12:4785
   ========================================================================== */

.headline-ring-collection {
  width: 100%;
  overflow: hidden;
}

/* Wrapper - Background and Height
   ========================================================================== */
.headline-ring-collection__wrapper {
  background-color: #FFFAF5;
  min-height: 1048px;
  position: relative;

  @media (max-width: 1024px) {
    min-height: auto;
    padding: 60px 0;
  }

  @media (max-width: 767px) {
    min-height: auto;
    padding: 40px 0;
  }
}

/* Container - Max-width and Centering
   ========================================================================== */
.headline-ring-collection__container {
  max-width: 1440px;
  margin: 0 auto;
  position: relative;

  @media (max-width: 767px) {
    padding: 0 40px;
  }
}

/* Headlines
   ========================================================================== */
.headline-ring-collection__headlines {
  position: relative;
  z-index: 1;
}

.headline-ring-collection__headline {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-weight: 300; /* 45 Light */
  font-size: 100px;
  line-height: 86.229px;
  color: #183754;
  text-transform: uppercase;
  margin: 0;

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 104px;
    line-height: calc(104px * 0.86229);
  }

  @media (max-width: 767px) {
    font-size: 56px;
    line-height: calc(56px * 0.86229);
  }
}

/* Headline Line 1 - "BRILLIANCE" */
.headline-ring-collection__headline--line-1 {
  position: absolute;
  top: 184px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  white-space: nowrap;

  @media (max-width: 1024px) {
    position: static;
    transform: none;
    margin-bottom: 0;
  }
}

/* Headline Line 2 - "WITHOUT" */
.headline-ring-collection__headline--line-2 {
  position: absolute;
  top: calc(184px + 86.229px); /* Line 1 top + line height */
  right: 296px;
  white-space: nowrap;

  @media (max-width: 1024px) {
    position: static;
    margin-bottom: 0;
  }
}

/* Headline Line 3 - "COMPROMISE" */
.headline-ring-collection__headline--line-3 {
  position: absolute;
  top: calc(184px + 86.229px + 86.229px); /* Line 1 top + 2 line heights */
  left: calc(160px + 32px); /* CTA left + gap, adjust based on CTA width */
  white-space: nowrap;

  @media (max-width: 1024px) {
    position: static;
    margin-bottom: 0;
  }
}

/* CTA Link
   ========================================================================== */
.headline-ring-collection__cta {
  position: absolute;
  top: calc(184px + 86.229px + 86.229px); /* Align with Line 3 */
  left: 160px;
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-weight: 400; /* 55 Roman */
  font-size: 20px;
  line-height: 20px;
  color: #183754;
  text-transform: uppercase;
  text-decoration: underline;
  text-underline-offset: 25%;
  z-index: 2;

  /* Vertical middle alignment with headline line 3 */
  transform: translateY(50%);

  @media (max-width: 1024px) {
    position: static;
    display: inline-block;
    transform: none;
    margin-bottom: 24px;
  }

  @media (max-width: 767px) {
    margin-top: 8px;
    margin-bottom: 16px;
  }

  &:hover {
    opacity: 0.7;
  }
}

/* Product Image
   ========================================================================== */
.headline-ring-collection__image-wrapper {
  position: absolute;
  width: 304px;
  height: 304px;
  left: 336px;
  top: calc(184px + 86.229px + 86.229px - 24px); /* Line 3 position - 24px */
  transform: rotate(3deg);
  z-index: 2;

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 250px;
    height: 250px;
    left: 50%;
    transform: translateX(-50%) rotate(3deg);
  }

  @media (max-width: 767px) {
    position: static;
    width: 200px;
    height: 200px;
    margin: 0 auto 8px;
    transform: rotate(3deg);
  }
}

.headline-ring-collection__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Paragraph Content
   ========================================================================== */
.headline-ring-collection__content {
  position: absolute;
  top: 536px;
  right: 240px;
  max-width: 496px;
  z-index: 1;

  @media (min-width: 768px) and (max-width: 1024px) {
    position: static;
    max-width: 100%;
    margin-bottom: 40px;
    padding: 0 40px;
  }

  @media (max-width: 767px) {
    position: static;
    max-width: 100%;
    margin-bottom: 32px;
  }
}

.headline-ring-collection__paragraph {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-weight: 400; /* 55 Roman */
  font-size: 20px;
  line-height: 30px;
  color: #183754;
  margin: 0;

  @media (max-width: 767px) {
    font-size: 16px;
    line-height: 24px;
  }
}

/* Feature Icons
   ========================================================================== */
.headline-ring-collection__features {
  position: absolute;
  top: calc(536px + 150px + 72px); /* Paragraph top + approx height + gap */
  left: 704px;
  z-index: 1;

  @media (min-width: 768px) and (max-width: 1024px) {
    position: static;
    margin-bottom: 40px;
    padding: 0 40px;
  }

  @media (max-width: 767px) {
    position: static;
    margin-bottom: 32px;
  }
}

.headline-ring-collection__feature {
  display: flex;
  align-items: center;
  gap: 32px;

  &:not(:last-child) {
    margin-bottom: 40px;
  }

  @media (max-width: 767px) {
    gap: 16px;

    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
}

.headline-ring-collection__feature-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;

  @media (max-width: 767px) {
    width: 32px;
    height: 32px;
  }
}

.headline-ring-collection__icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.headline-ring-collection__feature-text {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-weight: 400; /* 55 Roman */
  font-size: 20px;
  line-height: 20px;
  color: #183754;
  text-transform: uppercase;
  margin: 0;

  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 18px;
  }
}

/* Certification Badges
   ========================================================================== */
.headline-ring-collection__badges {
  position: absolute;
  bottom: 176px;
  left: 56px;
  display: flex;
  align-items: center;
  gap: 32px;
  z-index: 1;

  @media (min-width: 768px) and (max-width: 1024px) {
    position: static;
    padding: 0 40px;
  }

  @media (max-width: 767px) {
    position: static;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}

.headline-ring-collection__badge {
  flex-shrink: 0;
}

.headline-ring-collection__badge-image {
  max-width: 100px;
  height: auto;
  display: block;

  @media (max-width: 767px) {
    max-width: 80px;
  }
}
```

---

### Step 3: Create JavaScript File

**File:** `assets/headline-ring-collection.js`

```javascript
/**
 * Headline Ring Collection Section
 * Handles GSAP parallax animation for product image
 */

if (typeof gsap !== 'undefined') {

  class HeadlineRingCollection {
    constructor(section) {
      this.section = section;
      this.parallaxImage = this.section.querySelector('[data-parallax-image]');

      if (this.parallaxImage) {
        this.initParallax();
      }
    }

    initParallax() {
      // GSAP ScrollTrigger for parallax effect
      gsap.to(this.parallaxImage, {
        y: 30, // Move down 30px
        ease: 'none',
        scrollTrigger: {
          trigger: this.section,
          start: 'top bottom', // Start when section enters viewport
          end: 'bottom top', // End when section leaves viewport
          scrub: true, // Smooth scrubbing effect
        }
      });
    }

    onUnload() {
      // Clean up ScrollTrigger on section unload
      if (this.parallaxImage) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === this.section) {
            trigger.kill();
          }
        });
      }
    }
  }

  // Initialize section
  const sections = document.querySelectorAll('[data-section-type="headline-ring-collection"]');
  sections.forEach(section => {
    new HeadlineRingCollection(section);
  });

  // Theme Editor support
  if (Shopify.designMode) {
    document.addEventListener('shopify:section:load', (event) => {
      if (event.target.querySelector('[data-section-type="headline-ring-collection"]')) {
        new HeadlineRingCollection(event.target);
      }
    });

    document.addEventListener('shopify:section:unload', (event) => {
      const section = event.target.querySelector('[data-section-type="headline-ring-collection"]');
      if (section && section.headlineRingCollectionInstance) {
        section.headlineRingCollectionInstance.onUnload();
      }
    });
  }

} else {
  console.warn('GSAP is not loaded. Parallax effect will not work.');
}
```

---

### Step 4: Include Assets in theme.liquid

**File:** `layout/theme.liquid`

Add to `<head>` section (if not already included):

```liquid
{{ 'headline-ring-collection.css' | asset_url | stylesheet_tag }}
```

Add before closing `</body>` tag (after GSAP is loaded):

```liquid
<script src="{{ 'headline-ring-collection.js' | asset_url }}" defer></script>
```

---

## CSS Implementation Notes

### Positioning Strategy

1. **Desktop (1440px):**
   - Use `position: absolute` for precise placement as per Figma specs
   - Wrapper is `position: relative` to contain absolutely positioned children
   - All measurements are exact from design tokens

2. **Tablet (768px - 1024px):**
   - Switch to `position: static` for natural document flow
   - Use proportional scaling with media queries
   - Maintain spacing relationships

3. **Mobile (<768px):**
   - All elements `position: static`
   - Vertical stacking with flexbox
   - 40px side padding

### Typography

- Use `text-transform: uppercase` for all-caps text
- Tight `line-height` (86.229px for 100px font) creates zero-gap stacking
- Load custom font properly via `@font-face` or Shopify font loader

### Responsive Images

```liquid
{{ image | image_url: width: 608 | image_tag:
  loading: 'lazy',
  widths: '304, 456, 608',
  sizes: '(max-width: 767px) 200px, (max-width: 1024px) 250px, 304px'
}}
```

---

## JavaScript Implementation Notes

### GSAP Parallax

1. **Effect:** Subtle vertical movement (±30px) on scroll
2. **Performance:** Use `scrub: true` for smooth 1:1 scroll-tied animation
3. **Cleanup:** Always kill ScrollTrigger instances on section unload (Theme Editor)

### Theme Editor Support

- Handle `shopify:section:load` for dynamic section loading
- Handle `shopify:section:unload` for cleanup
- Test all customizations in Theme Editor

---

## Testing Checklist

### Visual Testing

- [ ] All text displays correctly at all breakpoints
- [ ] Headlines have zero gap (tight line-height)
- [ ] CTA is vertically middle-aligned with "COMPROMISE"
- [ ] Product image is rotated 3deg at all breakpoints
- [ ] Colors match design tokens (#FFFAF5, #183754)
- [ ] Typography matches Figma (font family, sizes, weights)

### Responsive Testing

- [ ] Desktop (1440px+): Absolute positioning works correctly
- [ ] Tablet (768px-1024px): Elements scale proportionally
- [ ] Mobile (<768px): Content stacks vertically with proper gaps
- [ ] Feature icons maintain horizontal layout on mobile
- [ ] Badges stack vertically on mobile

### Interaction Testing

- [ ] Parallax animation works smoothly on scroll
- [ ] Animation performance is smooth (60fps)
- [ ] CTA link is clickable and navigates correctly
- [ ] No layout shifts or content jumps

### Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Theme Editor Testing

- [ ] Section loads correctly in Theme Editor
- [ ] All schema settings work and update live
- [ ] Section can be added/removed without errors
- [ ] Parallax animation works in preview mode
- [ ] Default values match Figma design

### Accessibility Testing

- [ ] All images have proper `alt` attributes
- [ ] Color contrast meets WCAG AA standards
- [ ] Keyboard navigation works for CTA link
- [ ] Screen reader announces content correctly
- [ ] No `aria-` attributes needed (semantic HTML sufficient)

### Performance Testing

- [ ] Images are lazy-loaded
- [ ] CSS is minified for production
- [ ] JavaScript is deferred
- [ ] No console errors
- [ ] Lighthouse score >90

---

## Common Issues & Solutions

### Issue: Headlines Not Stacking with Zero Gap

**Solution:** Ensure `line-height` is exactly as specified (86.229px for 100px font). Remove any default margins with `margin: 0`.

### Issue: CTA Not Middle-Aligned with "COMPROMISE"

**Solution:** Use `transform: translateY(50%)` on CTA or flexbox alignment. Both elements should have same vertical center.

### Issue: Parallax Not Working

**Solution:**
1. Verify GSAP is loaded before your script
2. Check `gsap` and `ScrollTrigger` are defined
3. Ensure `[data-parallax-image]` attribute exists

### Issue: Mobile Layout Breaking

**Solution:** Switch all absolute positioning to static/relative on mobile breakpoint. Use flexbox for stacking.

### Issue: Image Not Rotating

**Solution:** Apply `transform: rotate(3deg)` to wrapper div, not img tag. Ensure no other transforms are overriding.

---

## Additional Resources

- **Figma Node:** https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-4785
- **GSAP Docs:** https://greensock.com/docs/
- **Shopify Liquid Docs:** https://shopify.dev/docs/api/liquid
- **Project Rules:** `docs/rules/` folder

---

## Support

If you encounter issues not covered in this guide:

1. Review all documentation in `docs/rules/`
2. Check Figma design node for visual reference
3. Verify all design tokens are correctly implemented
4. Test in multiple browsers and devices
5. Consult with team lead or senior developer

---

**Development Complete?** Run through the entire testing checklist before marking this section as done.
