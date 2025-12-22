# Two-Column Hero Section - Implementation Guide

## 📌 Purpose
This document provides step-by-step implementation instructions for the Diamension two-column hero section. Follow these instructions sequentially to build the section from scratch.

**CRITICAL:** Before starting, you MUST have read:
1. `01-overview.md` - Section overview
2. `02-design-tokens.md` - Design specifications
3. All files in `docs/rules/` - Project standards
4. Figma node 12-9097 and related nodes

---

## 🚀 Implementation Steps

### Phase 1: Setup and File Structure

#### Step 1.1: Create Section File
**File:** `sections/custom-section-two-column-hero-diamension.liquid`

**Initial Structure:**
```liquid
{% comment %}
  Section: Two-Column Hero Diamension
  Purpose: Split-screen hero section with lifestyle imagery and text overlay
  Author: Wings Design Team
  Version: 1.0
  Figma Node: 12-9097
{% endcomment %}

{{ 'section-two-column-hero-diamension.css' | asset_url | stylesheet_tag }}

{% liquid
  # Section settings
  assign section_id = section.id
  assign blocks = section.blocks
  assign blocks_count = blocks.size
%}

<div class="custom-section-two-column-hero" data-section-id="{{ section_id }}">
  <div class="custom-section-two-column-hero__wrapper">

    {% comment %} Image blocks will be rendered here {% endcomment %}
    {% for block in blocks limit: 2 %}
      <div class="custom-section-two-column-hero__block" {{ block.shopify_attributes }}>
        {% comment %} Block content implementation {% endcomment %}
      </div>
    {% endfor %}

  </div>
</div>

{% schema %}
{
  "name": "Two Column Hero - The Studio",
  "class": "section-two-column-hero-diamension",
  "max_blocks": 2,
  "blocks": [
    {
      "type": "image_block",
      "name": "Image Block",
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "Background Image",
          "info": "Recommended size: 1920px × 800px"
        },
        {
          "type": "text",
          "id": "heading",
          "label": "Heading",
          "default": ""
        },
        {
          "type": "richtext",
          "id": "description",
          "label": "Description",
          "default": ""
        },
        {
          "type": "text",
          "id": "button_text",
          "label": "Button Text",
          "default": ""
        },
        {
          "type": "url",
          "id": "button_link",
          "label": "Button Link"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Two Column Hero - The Studio",
      "blocks": [
        {
          "type": "image_block"
        },
        {
          "type": "image_block"
        }
      ]
    }
  ]
}
{% endschema %}
```

---

#### Step 1.2: Create CSS File
**File:** `assets/section-two-column-hero-diamension.css`

**Base Structure:**
```css
/* =============================================================================
   Two-Column Hero Section - The Studio
   ============================================================================= */

/* Wrapper (Full-width background) */
.custom-section-two-column-hero {
  background-color: #fffaf5;
  width: 100%;
  overflow: hidden;
}

.custom-section-two-column-hero__wrapper {
  width: 100%;
  height: 800px;
  display: flex;
  position: relative;
}

/* Image Block */
.custom-section-two-column-hero__block {
  width: 50%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

/* Image */
.custom-section-two-column-hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

/* Content Overlay */
.custom-section-two-column-hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  padding: 40px;
}

/* Heading */
.custom-section-two-column-hero__heading {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-weight: 300;
  font-size: 60px;
  line-height: 50px;
  color: #fffaf5;
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 32px 0;
  white-space: nowrap;
}

/* Description */
.custom-section-two-column-hero__description {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #fffaf5;
  text-align: left;
  max-width: 423px;
  margin: 0 0 24px 0;
}

/* Button */
.custom-section-two-column-hero__button {
  background: #ffffff;
  padding: 10px 25px;
  min-width: 171px;
  height: 49px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.custom-section-two-column-hero__button-text {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-weight: 300;
  font-size: 20px;
  line-height: 50px;
  color: #183754;
  text-transform: uppercase;
  white-space: nowrap;
}

.custom-section-two-column-hero__button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* =============================================================================
   Responsive Styles
   ============================================================================= */

/* Tablet (768px - 1023px) */
@media screen and (max-width: 1023px) and (min-width: 768px) {
  .custom-section-two-column-hero__heading {
    font-size: 50px;
    line-height: 42px;
  }

  .custom-section-two-column-hero__description {
    font-size: 15px;
    line-height: 19px;
    max-width: 360px;
  }

  .custom-section-two-column-hero__button-text {
    font-size: 19px;
  }

  .custom-section-two-column-hero__overlay {
    padding: 30px;
  }
}

/* Mobile (<768px) */
@media screen and (max-width: 767px) {
  .custom-section-two-column-hero__wrapper {
    height: 800px;
    flex-direction: column;
  }

  .custom-section-two-column-hero__block {
    width: 100%;
    height: 400px;
  }

  .custom-section-two-column-hero__heading {
    font-size: 40px;
    line-height: 36px;
    white-space: normal;
  }

  .custom-section-two-column-hero__description {
    font-size: 14px;
    line-height: 18px;
    max-width: 90%;
  }

  .custom-section-two-column-hero__button {
    min-width: 140px;
    height: 44px;
  }

  .custom-section-two-column-hero__button-text {
    font-size: 18px;
  }

  .custom-section-two-column-hero__overlay {
    padding: 20px;
  }
}
```

---

### Phase 2: Component Implementation

#### Step 2.1: Complete Liquid Implementation

**Full Section Code:**
```liquid
{% comment %}
  Section: Two-Column Hero Diamension
  Purpose: Split-screen hero section with lifestyle imagery and text overlay
  Author: Wings Design Team
  Version: 1.0
  Figma Node: 12-9097
{% endcomment %}

{{ 'section-two-column-hero-diamension.css' | asset_url | stylesheet_tag }}

{% liquid
  assign section_id = section.id
  assign blocks = section.blocks
  assign blocks_count = blocks.size
%}

<div class="custom-section-two-column-hero" data-section-id="{{ section_id }}">
  <div class="custom-section-two-column-hero__wrapper">

    {% for block in blocks limit: 2 %}
      {% liquid
        assign block_image = block.settings.image
        assign block_heading = block.settings.heading
        assign block_description = block.settings.description
        assign block_button_text = block.settings.button_text
        assign block_button_link = block.settings.button_link

        # Check if this block has any content to display
        assign has_content = false
        if block_heading != blank or block_description != blank or block_button_text != blank
          assign has_content = true
        endif
      %}

      <div class="custom-section-two-column-hero__block" {{ block.shopify_attributes }}>

        {% comment %} Background Image {% endcomment %}
        {% if block_image != blank %}
          <img
            src="{{ block_image | image_url: width: 1920 }}"
            srcset="
              {{ block_image | image_url: width: 768 }} 768w,
              {{ block_image | image_url: width: 1024 }} 1024w,
              {{ block_image | image_url: width: 1440 }} 1440w,
              {{ block_image | image_url: width: 1920 }} 1920w
            "
            sizes="(min-width: 768px) 50vw, 100vw"
            alt="{{ block_heading | default: 'The Studio Collection' | escape }}"
            loading="{% if forloop.first %}eager{% else %}lazy{% endif %}"
            class="custom-section-two-column-hero__image"
          >
        {% else %}
          {% comment %} Fallback placeholder if no image {% endcomment %}
          <div class="custom-section-two-column-hero__placeholder" style="background: #f0efea;"></div>
        {% endif %}

        {% comment %} Content Overlay (only show if content exists) {% endcomment %}
        {% if has_content %}
          <div class="custom-section-two-column-hero__overlay">

            {% comment %} Heading {% endcomment %}
            {% if block_heading != blank %}
              <h2 class="custom-section-two-column-hero__heading">
                {{ block_heading | escape }}
              </h2>
            {% endif %}

            {% comment %} Description {% endcomment %}
            {% if block_description != blank %}
              <div class="custom-section-two-column-hero__description">
                {{ block_description }}
              </div>
            {% endif %}

            {% comment %} CTA Button {% endcomment %}
            {% if block_button_text != blank %}
              <a
                href="{{ block_button_link | default: '#' }}"
                class="custom-section-two-column-hero__button"
                {% if block_button_link == blank %}aria-disabled="true"{% endif %}
              >
                <span class="custom-section-two-column-hero__button-text">
                  {{ block_button_text | escape }}
                </span>
              </a>
            {% endif %}

          </div>
        {% endif %}

      </div>
    {% endfor %}

  </div>
</div>

{% schema %}
{
  "name": "Two Column Hero - The Studio",
  "class": "section-two-column-hero-diamension",
  "max_blocks": 2,
  "blocks": [
    {
      "type": "image_block",
      "name": "Image Block",
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "Background Image",
          "info": "Recommended size: 1920px × 800px"
        },
        {
          "type": "text",
          "id": "heading",
          "label": "Heading",
          "default": "",
          "info": "Leave empty to hide"
        },
        {
          "type": "richtext",
          "id": "description",
          "label": "Description",
          "default": "",
          "info": "Leave empty to hide"
        },
        {
          "type": "text",
          "id": "button_text",
          "label": "Button Text",
          "default": "",
          "info": "Leave empty to hide button"
        },
        {
          "type": "url",
          "id": "button_link",
          "label": "Button Link"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Two Column Hero - The Studio",
      "blocks": [
        {
          "type": "image_block",
          "settings": {
            "heading": "METROPOLITAN VIBES",
            "description": "<p>Diamension's Corporate line redefines daily luxury for those who lead with confidence. Designed for the boardroom and beyond, each piece reflects understated brilliance.</p>",
            "button_text": "EXPLORE"
          }
        },
        {
          "type": "image_block"
        }
      ]
    }
  ]
}
{% endschema %}
```

---

#### Step 2.2: Enhanced CSS with Gradient Overlay

**Add Gradient Overlay for Better Text Readability:**

```css
/* =============================================================================
   Enhanced Content Overlay with Gradient
   ============================================================================= */

/* Gradient overlay for better text contrast */
.custom-section-two-column-hero__block::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(197, 188, 160, 0) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  z-index: 5;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Only show gradient when there's content */
.custom-section-two-column-hero__block:has(.custom-section-two-column-hero__overlay)::before {
  opacity: 1;
}

/* Ensure overlay is above gradient */
.custom-section-two-column-hero__overlay {
  z-index: 10;
}
```

---

#### Step 2.3: Accessibility Enhancements

**Add Focus States and ARIA Labels:**

```css
/* =============================================================================
   Accessibility - Focus States
   ============================================================================= */

.custom-section-two-column-hero__button:focus {
  outline: 2px solid #183754;
  outline-offset: 2px;
}

.custom-section-two-column-hero__button:focus-visible {
  outline: 2px solid #183754;
  outline-offset: 2px;
}
```

**Update Liquid for Better Accessibility:**

```liquid
{% comment %} CTA Button with proper ARIA {% endcomment %}
{% if block_button_text != blank %}
  <a
    href="{{ block_button_link | default: '#' }}"
    class="custom-section-two-column-hero__button"
    {% if block_button_link == blank %}
      aria-disabled="true"
      tabindex="-1"
    {% endif %}
    {% if block_heading != blank %}
      aria-label="{{ block_button_text }}: {{ block_heading | strip_html }}"
    {% endif %}
  >
    <span class="custom-section-two-column-hero__button-text">
      {{ block_button_text | escape }}
    </span>
  </a>
{% endif %}
```

---

### Phase 3: Advanced Features

#### Step 3.1: Image Lazy Loading Optimization

**Liquid Enhancement:**
```liquid
{% comment %} Optimized image loading {% endcomment %}
{% if block_image != blank %}
  <img
    src="{{ block_image | image_url: width: 1920 }}"
    srcset="
      {{ block_image | image_url: width: 768 }} 768w,
      {{ block_image | image_url: width: 1024 }} 1024w,
      {{ block_image | image_url: width: 1440 }} 1440w,
      {{ block_image | image_url: width: 1920 }} 1920w
    "
    sizes="(min-width: 768px) 50vw, 100vw"
    alt="{{ block_heading | default: 'The Studio Collection' | escape }}"
    loading="{% if forloop.first %}eager{% else %}lazy{% endif %}"
    fetchpriority="{% if forloop.first %}high{% else %}auto{% endif %}"
    class="custom-section-two-column-hero__image"
  >
{% endif %}
```

---

#### Step 3.2: Mobile-Specific Layout Adjustments

**Enhanced Mobile CSS:**

```css
/* =============================================================================
   Mobile Optimizations
   ============================================================================= */

@media screen and (max-width: 767px) {
  /* Stack blocks vertically */
  .custom-section-two-column-hero__wrapper {
    height: 800px;
    flex-direction: column;
  }

  .custom-section-two-column-hero__block {
    width: 100%;
    height: 400px;
  }

  /* Adjust text sizing for mobile */
  .custom-section-two-column-hero__heading {
    font-size: 40px;
    line-height: 36px;
    white-space: normal;
    margin: 0 0 20px 0;
  }

  .custom-section-two-column-hero__description {
    font-size: 14px;
    line-height: 18px;
    max-width: 90%;
    margin: 0 0 20px 0;
    text-align: center;
  }

  .custom-section-two-column-hero__button {
    min-width: 140px;
    height: 44px;
    padding: 8px 20px;
  }

  .custom-section-two-column-hero__button-text {
    font-size: 18px;
  }

  .custom-section-two-column-hero__overlay {
    padding: 20px;
  }

  /* Hide second block content on mobile if needed (optional) */
  .custom-section-two-column-hero__block:nth-child(2) .custom-section-two-column-hero__overlay {
    display: none;
  }
}

/* Small mobile adjustments */
@media screen and (max-width: 479px) {
  .custom-section-two-column-hero__heading {
    font-size: 32px;
    line-height: 30px;
  }

  .custom-section-two-column-hero__description {
    font-size: 13px;
    line-height: 16px;
  }

  .custom-section-two-column-hero__button-text {
    font-size: 16px;
  }
}
```

---

### Phase 4: Testing and Validation

#### Step 4.1: Functionality Tests

**Testing Checklist:**
- [ ] Section displays with 2 blocks side-by-side on desktop
- [ ] Section displays with 2 blocks stacked on mobile
- [ ] Images load correctly with proper srcset
- [ ] Text overlay displays only when content is provided
- [ ] Text overlay hides when all fields are empty
- [ ] Heading displays correctly (60px desktop, 40px mobile)
- [ ] Description displays correctly (16px desktop, 14px mobile)
- [ ] Button displays correctly (20px desktop, 18px mobile)
- [ ] Button links work correctly
- [ ] Button hover state works
- [ ] Section height is 800px on desktop/tablet
- [ ] Section height is 800px total on mobile (400px × 2)
- [ ] Images use object-fit: cover
- [ ] Images are centered

---

#### Step 4.2: Responsive Testing

**Breakpoint Testing:**
```
Desktop (≥1024px):
✓ Two columns, 50% width each
✓ Section height: 800px
✓ Heading: 60px
✓ Description: 16px
✓ Button: 20px

Tablet (768px - 1023px):
✓ Two columns, 50% width each
✓ Section height: 800px
✓ Heading: 50px
✓ Description: 15px
✓ Button: 19px

Mobile (<768px):
✓ Stacked layout
✓ Section height: 800px total (400px each)
✓ Heading: 40px
✓ Description: 14px
✓ Button: 18px
```

---

#### Step 4.3: Browser Testing

**Test on:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

#### Step 4.4: Accessibility Testing

**WCAG AA Compliance:**
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Focus states are visible
- [ ] ARIA labels present
- [ ] Color contrast passes (white text on dark images)
- [ ] Alt text on images
- [ ] Semantic HTML structure (h2 for heading)
- [ ] Links have proper href attributes

**Test with:**
- Screen reader (VoiceOver, NVDA, JAWS)
- Keyboard-only navigation
- Axe DevTools or Lighthouse accessibility audit

---

### Phase 5: Performance Optimization

#### Step 5.1: Image Optimization

**Best Practices:**
```liquid
{% comment %}
  Image optimization checklist:
  1. Use appropriate image sizes (1920px max width)
  2. Compress images to 80% quality
  3. Use WebP format when possible
  4. Implement lazy loading
  5. Set fetchpriority="high" for first image
  6. Use proper srcset and sizes attributes
{% endcomment %}

<img
  src="{{ block_image | image_url: width: 1920 }}"
  srcset="
    {{ block_image | image_url: width: 768 }} 768w,
    {{ block_image | image_url: width: 1024 }} 1024w,
    {{ block_image | image_url: width: 1440 }} 1440w,
    {{ block_image | image_url: width: 1920 }} 1920w
  "
  sizes="(min-width: 768px) 50vw, 100vw"
  alt="{{ block_heading | default: 'The Studio Collection' | escape }}"
  loading="{% if forloop.first %}eager{% else %}lazy{% endif %}"
  fetchpriority="{% if forloop.first %}high{% else %}auto{% endif %}"
  class="custom-section-two-column-hero__image"
>
```

---

#### Step 5.2: CSS Optimization

**Minification:**
- Use CSS minifier before deploying
- Remove unused CSS rules
- Combine similar selectors
- Use CSS custom properties for reusable values

**Example with CSS Variables:**
```css
:root {
  --hero-bg-color: #fffaf5;
  --hero-text-light: #fffaf5;
  --hero-text-dark: #183754;
  --hero-height-desktop: 800px;
  --hero-height-mobile: 400px;
  --font-primary: 'Neue Haas Grotesk Display Pro', sans-serif;
}

.custom-section-two-column-hero {
  background-color: var(--hero-bg-color);
}

.custom-section-two-column-hero__wrapper {
  height: var(--hero-height-desktop);
}

@media screen and (max-width: 767px) {
  .custom-section-two-column-hero__block {
    height: var(--hero-height-mobile);
  }
}
```

---

### Phase 6: Final Integration

#### Step 6.1: Add Section to Theme

1. **Upload Files:**
   - Upload `sections/custom-section-two-column-hero-diamension.liquid`
   - Upload `assets/section-two-column-hero-diamension.css`

2. **Test in Theme Editor:**
   - Go to Shopify Admin → Online Store → Themes
   - Click "Customize" on your theme
   - Add section "Two Column Hero - The Studio"
   - Add 2 blocks
   - Upload images to each block
   - Add heading, description, and button text to first block
   - Preview on desktop, tablet, and mobile

3. **Assign to Template:**
   - Use in page templates (e.g., page.studio.json)
   - Or add to existing templates as needed

---

#### Step 6.2: Content Guidelines for Merchants

**Documentation for Merchants:**

```
# Two-Column Hero Section - Usage Guide

## Image Requirements:
- Recommended size: 1920px × 800px
- Format: JPG, PNG, or WebP
- File size: Under 500KB (compressed)
- Aspect ratio: Flexible (will crop to fit)

## Text Guidelines:
- Heading: Keep under 20 characters for best display
- Description: Keep under 150 characters
- Button text: Keep under 15 characters (e.g., "EXPLORE", "SHOP NOW")

## Best Practices:
- Use high-quality lifestyle images
- Ensure text has good contrast against image
- Test on mobile devices
- First block typically has text overlay
- Second block typically shows image only
```

---

## 📚 Troubleshooting

### Common Issues:

**Issue 1: Images not displaying full-width**
```css
/* Solution: Ensure no max-width on container */
.custom-section-two-column-hero__wrapper {
  max-width: none; /* Remove any max-width */
  width: 100%;
}
```

**Issue 2: Text not centered on image**
```css
/* Solution: Check overlay positioning */
.custom-section-two-column-hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
```

**Issue 3: Mobile images too tall**
```css
/* Solution: Set explicit height on mobile */
@media screen and (max-width: 767px) {
  .custom-section-two-column-hero__block {
    height: 400px; /* Exactly 400px */
  }
}
```

**Issue 4: Font not loading**
```liquid
<!-- Solution: Add font preload to theme.liquid -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preload" href="{{ 'neue-haas-display-light.woff2' | asset_url }}" as="font" type="font/woff2" crossorigin>
```

---

## ✅ Final Checklist

Before submitting:

**Code Quality:**
- [ ] No Liquid syntax errors
- [ ] CSS is valid and minified
- [ ] BEM naming convention followed
- [ ] Comments are clear and helpful
- [ ] No hardcoded values (use tokens)

**Functionality:**
- [ ] Section works with 0-2 blocks
- [ ] Images display correctly
- [ ] Text overlay shows/hides correctly
- [ ] Button works and links correctly
- [ ] Responsive on all devices

**Design:**
- [ ] Matches Figma pixel-perfect
- [ ] Typography is correct
- [ ] Colors match design tokens
- [ ] Spacing is accurate
- [ ] 800px height on desktop
- [ ] 400px height per block on mobile

**Performance:**
- [ ] Images are optimized
- [ ] Lazy loading implemented
- [ ] CSS is minified
- [ ] No console errors

**Accessibility:**
- [ ] WCAG AA compliant
- [ ] Keyboard accessible
- [ ] Screen reader friendly
- [ ] Focus states visible

---

## 📖 Additional Resources

**Related Documentation:**
- `docs/rules/04-LIQUID-DEVELOPMENT.md` - Liquid best practices
- `docs/rules/05-CSS-STANDARDS.md` - CSS architecture
- `docs/rules/08-NAMING-CONVENTIONS.md` - BEM naming

**Figma References:**
- Node 12-9097: Main layout
- Node 12-9098: Left image
- Node 12-9099: Right image
- Node 12-9100: Heading
- Node 12-9101: Button
- Node 12-9103: Description

---

**Version:** 1.0
**Last Updated:** 2025-12-22
**Implementation Status:** Ready for Development
**Estimated Development Time:** 4-6 hours
