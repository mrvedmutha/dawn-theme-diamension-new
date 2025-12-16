# Implementation Guide: Diamension Follow Instagram Section

## Prerequisites

- [ ] Read `overview.md` completely
- [ ] Read `design-tokens.md` for all specifications
- [ ] Review Figma design node: `12:4744`
- [ ] Read all documentation in `docs/rules/` folder
- [ ] Verify GSAP and ScrollTrigger are loaded in `theme.liquid`
- [ ] Verify decorative ellipse SVG exists at `assets/custom-section-instagram/instagram-section-circle.svg`

## File Structure

```
sections/
└── diamension-follow-insta.liquid

assets/
├── diamension-follow-insta.css (or .scss)
├── diamension-follow-insta.js
└── custom-section-instagram/
    └── instagram-section-circle.svg  # Already exists

snippets/
└── (none required for this section)
```

## Implementation Steps

### Step 1: Create Section File

**File:** `sections/diamension-follow-insta.liquid`

#### Section Structure

```liquid
{%- comment -%}
  Section: Diamension Follow Instagram
  Description: Instagram gallery with asymmetric masonry grid and parallax effects
  Figma Node: 12:4744
{%- endcomment -%}

{%- liquid
  # Assign section settings to variables
  assign headline_text = section.settings.headline_text
  assign cta_text = section.settings.cta_text
  assign cta_url = section.settings.cta_url
  assign image_1 = section.settings.image_1
  assign image_2 = section.settings.image_2
  assign image_3 = section.settings.image_3
  assign image_4 = section.settings.image_4
  assign show_decorative_ellipse = section.settings.show_decorative_ellipse
-%}

<section
  class="diamension-follow-insta"
  data-section-id="{{ section.id }}"
  data-section-type="diamension-follow-insta"
>
  <div class="diamension-follow-insta__wrapper">
    <div class="diamension-follow-insta__container">

      {%- comment -%} Headline {%- endcomment -%}
      {%- if headline_text != blank -%}
        <h2 class="diamension-follow-insta__headline">
          {{ headline_text }}
        </h2>
      {%- endif -%}

      {%- comment -%} Decorative Ellipse Background (Desktop Only) {%- endcomment -%}
      {%- if show_decorative_ellipse -%}
        <div class="diamension-follow-insta__ellipse">
          {{- 'instagram-section-circle.svg' | asset_url | img_tag: '', 'diamension-follow-insta__ellipse-svg' -}}
        </div>
      {%- endif -%}

      {%- comment -%}
        Asymmetric Masonry Grid - Image Grid
        Images overlap by 56px (328px - 56px = 272px spacing)
        Total grid width: 1144px, centered with 64px margins
      {%- endcomment -%}
      <div class="diamension-follow-insta__images">

        {%- comment -%} Image 1 (Odd, z-index: 2, left: 0) {%- endcomment -%}
        {%- if image_1 != blank -%}
          <div class="diamension-follow-insta__image-wrapper diamension-follow-insta__image-wrapper--1">
            {{- image_1 | image_url: width: 656 | image_tag:
              loading: 'lazy',
              widths: '328, 492, 656',
              sizes: '(max-width: 767px) 50vw, (max-width: 1024px) 328px, 328px',
              class: 'diamension-follow-insta__image js-parallax-image js-parallax-image--odd',
              alt: image_1.alt | default: 'Instagram image 1'
            -}}
          </div>
        {%- endif -%}

        {%- comment -%} Image 2 (Even, z-index: 3, left: 272px) {%- endcomment -%}
        {%- if image_2 != blank -%}
          <div class="diamension-follow-insta__image-wrapper diamension-follow-insta__image-wrapper--2">
            {{- image_2 | image_url: width: 656 | image_tag:
              loading: 'lazy',
              widths: '328, 492, 656',
              sizes: '(max-width: 767px) 50vw, (max-width: 1024px) 328px, 328px',
              class: 'diamension-follow-insta__image js-parallax-image js-parallax-image--even',
              alt: image_2.alt | default: 'Instagram image 2'
            -}}
          </div>
        {%- endif -%}

        {%- comment -%} Image 3 (Odd, z-index: 4, left: 544px) {%- endcomment -%}
        {%- if image_3 != blank -%}
          <div class="diamension-follow-insta__image-wrapper diamension-follow-insta__image-wrapper--3">
            {{- image_3 | image_url: width: 656 | image_tag:
              loading: 'lazy',
              widths: '328, 492, 656',
              sizes: '(max-width: 767px) 50vw, (max-width: 1024px) 328px, 328px',
              class: 'diamension-follow-insta__image js-parallax-image js-parallax-image--odd',
              alt: image_3.alt | default: 'Instagram image 3'
            -}}
          </div>
        {%- endif -%}

        {%- comment -%} Image 4 (Even, z-index: 5, left: 816px) {%- endcomment -%}
        {%- if image_4 != blank -%}
          <div class="diamension-follow-insta__image-wrapper diamension-follow-insta__image-wrapper--4">
            {{- image_4 | image_url: width: 656 | image_tag:
              loading: 'lazy',
              widths: '328, 492, 656',
              sizes: '(max-width: 767px) 50vw, (max-width: 1024px) 328px, 328px',
              class: 'diamension-follow-insta__image js-parallax-image js-parallax-image--even',
              alt: image_4.alt | default: 'Instagram image 4'
            -}}
          </div>
        {%- endif -%}

      </div>

      {%- comment -%} CTA Link {%- endcomment -%}
      {%- if cta_text != blank and cta_url != blank -%}
        <a
          href="{{ cta_url }}"
          class="diamension-follow-insta__cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ cta_text }}
        </a>
      {%- endif -%}

    </div>
  </div>
</section>

{% schema %}
{
  "name": "Diamension Follow Instagram",
  "tag": "section",
  "class": "section-diamension-follow-insta",
  "settings": [
    {
      "type": "header",
      "content": "Headline"
    },
    {
      "type": "text",
      "id": "headline_text",
      "label": "Headline Text",
      "default": "FOLLOW US ON\nINSTAGRAM",
      "info": "Use line break for two lines (FOLLOW US ON / INSTAGRAM)"
    },
    {
      "type": "header",
      "content": "Instagram Images"
    },
    {
      "type": "paragraph",
      "content": "Upload 4 square images (1:1 ratio). Recommended size: 1000×1000px or larger. Desktop layout creates an asymmetric masonry grid with 56px overlapping images."
    },
    {
      "type": "image_picker",
      "id": "image_1",
      "label": "Image 1",
      "info": "First image (odd - top to bottom parallax on desktop)"
    },
    {
      "type": "image_picker",
      "id": "image_2",
      "label": "Image 2",
      "info": "Second image (even - bottom to top parallax on desktop)"
    },
    {
      "type": "image_picker",
      "id": "image_3",
      "label": "Image 3",
      "info": "Third image (odd - top to bottom parallax on desktop)"
    },
    {
      "type": "image_picker",
      "id": "image_4",
      "label": "Image 4",
      "info": "Fourth image (even - bottom to top parallax on desktop)"
    },
    {
      "type": "header",
      "content": "Call to Action"
    },
    {
      "type": "text",
      "id": "cta_text",
      "label": "CTA Text",
      "default": "Instagram",
      "info": "Link text (e.g., 'Instagram' or 'Follow Us')"
    },
    {
      "type": "url",
      "id": "cta_url",
      "label": "Instagram URL",
      "default": "https://instagram.com/your-brand",
      "info": "Link to your Instagram profile"
    },
    {
      "type": "header",
      "content": "Design Options"
    },
    {
      "type": "checkbox",
      "id": "show_decorative_ellipse",
      "label": "Show decorative ellipse (desktop only)",
      "default": true,
      "info": "Display decorative background ellipse on desktop. Hidden on tablet/mobile."
    }
  ],
  "presets": [
    {
      "name": "Diamension Follow Instagram"
    }
  ]
}
{% endschema %}
```

---

### Step 2: Create CSS/SCSS File

**File:** `assets/diamension-follow-insta.scss`

```scss
/* ==========================================================================
   Diamension Follow Instagram Section
   Figma Node: 12:4744
   Features: Asymmetric masonry grid with 56px overlapping images and parallax
   ========================================================================== */

.diamension-follow-insta {
  width: 100%;
  overflow: hidden;
}

/* Wrapper - Background and Fluid Width
   ========================================================================== */
.diamension-follow-insta__wrapper {
  background-color: #FFFAF5;
  width: 100%;
  position: relative;
  padding: 144px 0 112px; // Top padding for headline, bottom padding for CTA
  z-index: 0;

  @media (max-width: 1024px) {
    padding: 80px 0 60px;
  }

  @media (max-width: 767px) {
    padding: 40px 0;
  }
}

/* Container - Max-width 1440px with 64px side margins
   ========================================================================== */
.diamension-follow-insta__container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 64px; // 64px side margins
  position: relative;
  min-height: 800px; // Ensure adequate space for desktop masonry layout

  @media (max-width: 1024px) {
    min-height: auto;
    padding: 0 40px; // Reduce side margins on tablet
  }

  @media (max-width: 767px) {
    min-height: auto;
    padding: 0; // No horizontal padding for edge-to-edge images on mobile
  }
}

/* Headline
   ========================================================================== */
.diamension-follow-insta__headline {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-weight: 300; /* 45 Light */
  font-size: 40px;
  line-height: 40px;
  color: #183754;
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 80px;
  white-space: pre-line; // Preserve line breaks from schema
  position: relative;
  z-index: 6; // Top layer - always visible

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 32px;
    line-height: 32px;
    margin-bottom: 60px;
  }

  @media (max-width: 767px) {
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 40px;
    padding: 0 20px;
  }
}

/* Decorative Ellipse (Desktop Only)
   Z-Index: 1 (behind all images)
   ========================================================================== */
.diamension-follow-insta__ellipse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1; // Behind all images, above background
  max-width: 1400px;
  width: 100%;
  pointer-events: none;

  @media (max-width: 1024px) {
    display: none; // Hidden on tablet
  }

  @media (max-width: 767px) {
    display: none; // Hidden on mobile
  }
}

.diamension-follow-insta__ellipse-svg {
  width: 100%;
  height: auto;
  display: block;
  opacity: 0.6; // Subtle background element
}

/* Image Grid - Asymmetric Masonry Layout
   Desktop: Centered grid with 56px overlapping images
   Tablet: Horizontal row
   Mobile: 2x2 Grid
   ========================================================================== */
.diamension-follow-insta__images {
  position: relative;
  z-index: 2; // Base z-index for grid, individual images will increment

  // Desktop: Positioned masonry layout
  // Grid width: 1144px (4 images with 56px overlap)
  // Centered within container
  @media (min-width: 1025px) {
    width: 1144px; // Total grid width: 816px + 328px
    max-width: 100%;
    margin: 0 auto; // Center the grid
    min-height: 740px; // Accommodate staggered positioning (400px top + 328px height + gap)
  }

  // Tablet: Horizontal row
  @media (min-width: 768px) and (max-width: 1024px) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0; // Zero gaps
    margin: 0;
    padding: 0;
  }

  // Mobile: 2x2 Grid
  @media (max-width: 767px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0; // Zero gaps
    margin: 0;
    padding: 0;
  }
}

/* Image Wrappers - Base Styles
   ========================================================================== */
.diamension-follow-insta__image-wrapper {
  // Desktop: Absolute positioning for asymmetric masonry with overlap
  @media (min-width: 1025px) {
    position: absolute;
    width: 328px;
    height: 328px;
  }

  // Tablet: Flex items
  @media (min-width: 768px) and (max-width: 1024px) {
    flex: 0 0 328px;
    width: 328px;
    height: 328px;
  }

  // Mobile: Grid items
  @media (max-width: 767px) {
    width: 100%;
    aspect-ratio: 1/1;
  }
}

/* Desktop Masonry Positioning - Image 1
   Type: Odd (top-aligned)
   Position: Top 400px, Left 0 (first image)
   Z-Index: 2 (first in stack)
   Calculation: Image 1 starts at 0
   ========================================================================== */
.diamension-follow-insta__image-wrapper--1 {
  @media (min-width: 1025px) {
    top: 400px;
    left: 0; // Start of grid
    z-index: 2;
  }
}

/* Desktop Masonry Positioning - Image 2
   Type: Even (bottom-aligned)
   Position: Bottom 312px, Left 272px
   Z-Index: 3 (second in stack, overlaps Image 1 by 56px)
   Calculation: 0 + (328 - 56) = 272px
   ========================================================================== */
.diamension-follow-insta__image-wrapper--2 {
  @media (min-width: 1025px) {
    bottom: 312px;
    left: 272px; // 328px - 56px overlap
    z-index: 3;
  }
}

/* Desktop Masonry Positioning - Image 3
   Type: Odd (top-aligned)
   Position: Top 400px, Left 544px
   Z-Index: 4 (third in stack, overlaps Image 2 by 56px)
   Calculation: 272px + (328 - 56) = 544px
   ========================================================================== */
.diamension-follow-insta__image-wrapper--3 {
  @media (min-width: 1025px) {
    top: 400px;
    left: 544px; // 272px + 272px
    z-index: 4;
  }
}

/* Desktop Masonry Positioning - Image 4
   Type: Even (bottom-aligned)
   Position: Bottom 312px, Left 816px
   Z-Index: 5 (highest in image stack, overlaps Image 3 by 56px)
   Calculation: 544px + (328 - 56) = 816px
   ========================================================================== */
.diamension-follow-insta__image-wrapper--4 {
  @media (min-width: 1025px) {
    bottom: 312px;
    left: 816px; // 544px + 272px
    z-index: 5;
  }
}

/* Images
   ========================================================================== */
.diamension-follow-insta__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* CTA Link
   Z-Index: 6 (top layer, always visible)
   ========================================================================== */
.diamension-follow-insta__cta {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-weight: 400; /* 55 Roman */
  font-size: 20px;
  line-height: 40px;
  color: #183754;
  text-decoration: underline;
  text-underline-offset: 25%;
  text-align: center;
  display: block;
  margin-top: 60px;
  position: relative;
  z-index: 6; // Top layer - always visible

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 18px;
    margin-top: 40px;
  }

  @media (max-width: 767px) {
    font-size: 16px;
    margin-top: 40px;
    padding: 0 20px;
  }

  &:hover {
    opacity: 0.7;
  }
}
```

---

### Step 3: Create JavaScript File

**File:** `assets/diamension-follow-insta.js`

```javascript
/**
 * Diamension Follow Instagram Section - JavaScript
 * Handles parallax effects for asymmetric masonry grid using GSAP
 */

(function() {
  'use strict';

  // ============================================================================
  // Configuration
  // ============================================================================
  const CONFIG = {
    selectors: {
      section: '.diamension-follow-insta',
      oddImages: '.js-parallax-image--odd',
      evenImages: '.js-parallax-image--even'
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
  // Desktop-only parallax for asymmetric masonry grid
  // ============================================================================
  class ParallaxHandler {
    constructor(section) {
      this.section = section;
      this.oddImages = section.querySelectorAll(CONFIG.selectors.oddImages);
      this.evenImages = section.querySelectorAll(CONFIG.selectors.evenImages);
      this.isDesktop = window.innerWidth > CONFIG.breakpoints.desktop;

      if (this.isDesktop && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        this.init();
      }
    }

    init() {
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      // Odd images (Image 1, Image 3): Top to bottom parallax
      this.oddImages.forEach((image) => {
        gsap.fromTo(image,
          {
            y: -CONFIG.parallax.movement // Start above natural position
          },
          {
            y: CONFIG.parallax.movement, // End below natural position
            ease: CONFIG.parallax.ease,
            scrollTrigger: {
              trigger: this.section,
              start: 'top 80%', // Start when section enters viewport
              end: 'bottom 20%', // End when section exits viewport
              scrub: true // Smooth 1:1 scroll-tied animation
            }
          }
        );
      });

      // Even images (Image 2, Image 4): Bottom to top parallax (opposite direction)
      this.evenImages.forEach((image) => {
        gsap.fromTo(image,
          {
            y: CONFIG.parallax.movement // Start below natural position
          },
          {
            y: -CONFIG.parallax.movement, // End above natural position
            ease: CONFIG.parallax.ease,
            scrollTrigger: {
              trigger: this.section,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: true
            }
          }
        );
      });
    }

    destroy() {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === this.section) {
            trigger.kill();
          }
        });
      }
    }
  }

  // ============================================================================
  // Section Manager
  // ============================================================================
  class DiamensionFollowInstaSection {
    constructor(section) {
      this.section = section;
      this.parallaxHandler = null;

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
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
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

    onUnload() {
      if (this.parallaxHandler) {
        this.parallaxHandler.destroy();
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
      const instance = new DiamensionFollowInstaSection(section);
      section.diamensionFollowInstaInstance = instance; // Store for cleanup
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
      const section = event.target.querySelector(CONFIG.selectors.section);
      if (section) {
        const instance = new DiamensionFollowInstaSection(section);
        section.diamensionFollowInstaInstance = instance;
      }
    });

    document.addEventListener('shopify:section:unload', function(event) {
      const section = event.target.querySelector(CONFIG.selectors.section);
      if (section && section.diamensionFollowInstaInstance) {
        section.diamensionFollowInstaInstance.onUnload();
      }
    });
  }

})();
```

---

### Step 4: Include Assets in theme.liquid

**File:** `layout/theme.liquid`

Add to `<head>` section:

```liquid
{{ 'diamension-follow-insta.css' | asset_url | stylesheet_tag }}
```

Add before closing `</body>` tag (after GSAP is loaded):

```liquid
<script src="{{ 'diamension-follow-insta.js' | asset_url }}" defer></script>
```

---

## CSS Implementation Notes

### Asymmetric Masonry Grid with 56px Overlap

The desktop layout creates an **asymmetric masonry-style grid** with overlapping images through absolute positioning.

**Key Mathematical Calculations:**

```scss
// Image specifications
$image-size: 328px;
$overlap: 56px;
$spacing: $image-size - $overlap; // 328px - 56px = 272px

// Image positions (left values)
Image 1: 0 (start)
Image 2: 0 + 272px = 272px
Image 3: 272px + 272px = 544px
Image 4: 544px + 272px = 816px

// Total grid width
Total: 816px + 328px = 1144px
```

**Container Centering:**

```scss
// Container: max-width 1440px with 64px side margins
.diamension-follow-insta__container {
  max-width: 1440px;
  padding: 0 64px; // Side margins
  margin: 0 auto;
}

// Image grid: 1144px centered within container
.diamension-follow-insta__images {
  width: 1144px;
  max-width: 100%;
  margin: 0 auto; // Center the grid
}
```

**Why This Approach Works:**
1. Container has 64px side margins
2. Image grid has fixed width (1144px) and is centered
3. Images positioned absolutely within centered grid
4. Creates perfect 56px overlap effect

### Z-Index Management (Critical)

Each image has an **incrementing z-index** to ensure proper overlapping:

```scss
.diamension-follow-insta__image-wrapper--1 { z-index: 2; } // First image
.diamension-follow-insta__image-wrapper--2 { z-index: 3; } // Overlaps Image 1
.diamension-follow-insta__image-wrapper--3 { z-index: 4; } // Overlaps Image 2
.diamension-follow-insta__image-wrapper--4 { z-index: 5; } // Overlaps Image 3
```

**Complete Z-Index Hierarchy:**
```scss
Background wrapper: z-index: 0
Decorative ellipse: z-index: 1 (behind all images)
Image 1: z-index: 2
Image 2: z-index: 3
Image 3: z-index: 4
Image 4: z-index: 5
Text/CTA: z-index: 6 (always visible on top)
```

### Tablet/Mobile Layout Simplification

1. **Tablet:** Switch to `display: flex` for horizontal row, zero gaps
2. **Mobile:** Switch to `display: grid` with `grid-template-columns: 1fr 1fr` for 2×2 grid
3. **Side Margins:**
   - Desktop: 64px
   - Tablet: 40px
   - Mobile: 0 (edge-to-edge images)

---

## JavaScript Implementation Notes

### Parallax Effect for Overlapping Images

**Target:** Individual `<img>` elements (not wrapper containers)

**Opposite Directions:**
1. **Odd Images (Image 1, Image 3):**
   - Start: `y: -80px` (above natural position)
   - End: `y: 80px` (below natural position)
   - Direction: Top → Bottom

2. **Even Images (Image 2, Image 4):**
   - Start: `y: 80px` (below natural position)
   - End: `y: -80px` (above natural position)
   - Direction: Bottom → Top (opposite of odd)

**Note:** Parallax applies to images themselves, not their absolutely positioned containers. This creates the floating effect while maintaining the 56px overlap structure.

---

## Testing Checklist

### Visual Testing

- [ ] Headline displays correctly with line break ("FOLLOW US ON" / "INSTAGRAM")
- [ ] Headline is center-aligned at all breakpoints
- [ ] Decorative ellipse visible on desktop, hidden on tablet/mobile
- [ ] **Desktop: Images overlap by exactly 56px** (measure in browser dev tools)
- [ ] **Desktop: Image grid is centered with 64px side margins**
- [ ] **Desktop: Image positioning follows calculation (0, 272px, 544px, 816px)**
- [ ] **Desktop: Images have correct z-index stacking** (2, 3, 4, 5)
- [ ] **Desktop: Total grid width is 1144px**
- [ ] Tablet: 4 images in horizontal row with zero gaps
- [ ] Mobile: 4 images in 2×2 grid with zero gaps
- [ ] CTA link is center-aligned and underlined
- [ ] Colors match design tokens (#FFFAF5, #183754)
- [ ] Typography matches Figma (font family, sizes, weights)

### Responsive Testing

- [ ] Desktop (1024px+): Absolute positioning masonry layout with 56px overlap
- [ ] Desktop: Container has 64px side margins
- [ ] Tablet (768px-1024px): Horizontal row, zero gaps, 40px side margins
- [ ] Mobile (<768px): 2×2 grid, zero gaps, 0 side margins
- [ ] Images maintain 1:1 aspect ratio at all breakpoints
- [ ] No horizontal scrolling or overflow issues

### Interaction Testing

- [ ] Parallax animation works smoothly on desktop
- [ ] **Odd images (1, 3) move top to bottom**
- [ ] **Even images (2, 4) move bottom to top (opposite direction)**
- [ ] Parallax applies to images, not containers
- [ ] No parallax on tablet/mobile
- [ ] Animation performance is smooth (60fps)
- [ ] CTA link is clickable and opens Instagram in new tab

### Mathematical Validation

- [ ] **Image 1 left position: 0**
- [ ] **Image 2 left position: 272px** (328 - 56 = 272)
- [ ] **Image 3 left position: 544px** (272 + 272 = 544)
- [ ] **Image 4 left position: 816px** (544 + 272 = 816)
- [ ] **Total grid width: 1144px** (816 + 328 = 1144)
- [ ] **Overlap between adjacent images: 56px**
- [ ] **Container side margins: 64px** (desktop)

### Z-Index Testing (Critical)

- [ ] **Image 1 has z-index: 2**
- [ ] **Image 2 has z-index: 3 (visually overlaps Image 1)**
- [ ] **Image 3 has z-index: 4 (visually overlaps Image 2)**
- [ ] **Image 4 has z-index: 5 (highest in image stack)**
- [ ] **Decorative ellipse has z-index: 1 (behind all images)**
- [ ] **Headline and CTA have z-index: 6 (always visible on top)**

### Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Theme Editor Testing

- [ ] Section loads correctly in Theme Editor
- [ ] All schema settings work and update live
- [ ] Image uploads display correctly
- [ ] Section can be added/removed without errors
- [ ] Parallax animation works in preview mode

---

## Common Issues & Solutions

### Issue: Images Not Overlapping by 56px

**Solution:** Verify left position calculations in CSS:
```scss
.diamension-follow-insta__image-wrapper--1 { left: 0; }
.diamension-follow-insta__image-wrapper--2 { left: 272px; } // 328 - 56 = 272
.diamension-follow-insta__image-wrapper--3 { left: 544px; } // 272 + 272 = 544
.diamension-follow-insta__image-wrapper--4 { left: 816px; } // 544 + 272 = 816
```

### Issue: Image Grid Not Centered

**Solution:** Ensure grid has fixed width and auto margins:
```scss
.diamension-follow-insta__images {
  width: 1144px;
  max-width: 100%;
  margin: 0 auto;
}
```

### Issue: Side Margins Incorrect

**Solution:** Check container padding:
```scss
.diamension-follow-insta__container {
  max-width: 1440px;
  padding: 0 64px; // Desktop: 64px side margins
}
```

### Issue: Images Stacking Incorrectly

**Solution:** Verify z-index incremental values:
```scss
--1: z-index: 2;
--2: z-index: 3;
--3: z-index: 4;
--4: z-index: 5;
```

### Issue: Total Grid Width Incorrect

**Solution:** Double-check calculation:
- Last image left position (816px) + image width (328px) = 1144px

---

## Additional Resources

- **Figma Node:** https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-4744
- **GSAP Docs:** https://greensock.com/docs/
- **ScrollTrigger Docs:** https://greensock.com/docs/v3/Plugins/ScrollTrigger
- **Shopify Liquid Docs:** https://shopify.dev/docs/api/liquid
- **Project Rules:** `docs/rules/` folder

---

**Development Complete?** Run through the entire testing checklist, especially the mathematical validation and overlap tests, before marking this section as done.
