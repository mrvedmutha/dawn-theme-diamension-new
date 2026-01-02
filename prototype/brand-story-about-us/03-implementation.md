# Brand Story About Us - Implementation Guide

## Complete Implementation Specifications

This document provides the full implementation details for the Developer agent to build the Brand Story About Us section.

---

## 1. Liquid Schema Settings

### Complete Schema Structure

```liquid
{% schema %}
{
  "name": "Brand Story About Us",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "OUR STORY"
    },
    {
      "type": "richtext",
      "id": "content",
      "label": "Content",
      "default": "<p>Diamensions was born with a singular vision: to make brilliance better. Backed by over 25 years of expertise from our parent company HVK Diamonds, we combine tradition with cutting-edge technology to redefine what diamonds mean for today's generation.</p><p>From manufacturing lab-grown diamonds and gold to supplying leading global jewelers, our journey is one of precision, integrity, and ambition.</p>"
    },
    {
      "type": "image_picker",
      "id": "background_image",
      "label": "Background Image",
      "info": "Recommended minimum width: 1440px for best quality"
    },
    {
      "type": "checkbox",
      "id": "show_logo_overlay",
      "label": "Show Logo Overlay",
      "default": true,
      "info": "Display Diamension logo centered on the background image"
    }
  ],
  "presets": [
    {
      "name": "Brand Story About Us"
    }
  ]
}
{% endschema %}
```

---

## 2. Semantic Markup Structure (Liquid)

### HTML Structure Outline

```liquid
{{ 'custom-section-brand-story-about-us.css' | asset_url | stylesheet_tag }}

<section class="brand-story-section" data-section-id="{{ section.id }}">
  <div class="brand-story-container">

    <!-- Left Column: Text Content -->
    <div class="brand-story-content">
      <div class="brand-story-content-inner">
        {% if section.settings.heading != blank %}
          <h2 class="brand-story-heading animate-on-scroll">
            {{ section.settings.heading }}
          </h2>
        {% endif %}

        {% if section.settings.content != blank %}
          <div class="brand-story-text animate-on-scroll">
            {{ section.settings.content }}
          </div>
        {% endif %}
      </div>
    </div>

    <!-- Right Column: Image with Logo Overlay -->
    <div class="brand-story-image-wrapper">
      {% if section.settings.background_image != blank %}
        <div class="brand-story-image" style="background-image: url('{{ section.settings.background_image | image_url: width: 1440 }}');">
          {% if section.settings.show_logo_overlay %}
            <div class="brand-story-logo-overlay animate-on-scroll">
              {{ 'diamension-logo.svg' | asset_url | image_tag }}
            </div>
          {% endif %}
        </div>
      {% else %}
        <div class="brand-story-image brand-story-image-placeholder">
          <span class="brand-story-placeholder-text">Add a background image</span>
          {% if section.settings.show_logo_overlay %}
            <div class="brand-story-logo-overlay animate-on-scroll">
              {{ 'diamension-logo.svg' | asset_url | image_tag }}
            </div>
          {% endif %}
        </div>
      {% endif %}
    </div>

  </div>
</section>

<script src="{{ 'custom-section-brand-story-about-us.js' | asset_url }}" defer></script>
```

**Key Liquid Elements:**
- `{{ section.id }}`: Unique section identifier for JavaScript targeting
- `{{ section.settings.heading }}`: Editable heading text
- `{{ section.settings.content }}`: Rich text content (renders HTML)
- `{{ section.settings.background_image }}`: Image picker asset
- `{{ section.settings.show_logo_overlay }}`: Boolean for logo visibility
- `{{ 'diamension-logo.svg' | asset_url }}`: Reference to existing logo SVG

---

## 3. CSS Implementation - Full Responsive Styles

### Base Styles and Desktop (1440px)

```css
/* =============================================
   BRAND STORY ABOUT US SECTION
   ============================================= */

/* Font-face declarations (if not already loaded globally) */
@font-face {
  font-family: 'Neue Haas Grotesk Display Pro';
  src: url('NeueHaasDisplay-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Neue Haas Grotesk Display Pro';
  src: url('NeueHaasDisplay-Roman.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Section Container */
.brand-story-section {
  background-color: #FFFAF5;
  width: 100%;
  height: 800px;
  overflow: hidden;
  position: relative;
}

/* Flexbox Container */
.brand-story-container {
  display: flex;
  flex-direction: row;
  height: 100%;
  max-width: 100%;
  margin: 0 auto;
}

/* Left Column - Content */
.brand-story-content {
  flex: 0 0 50vw;
  width: 50vw;
  display: flex;
  align-items: flex-start;
  padding: 192px 0 0 56px;
  position: relative;
  z-index: 4;
}

.brand-story-content-inner {
  max-width: 498px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Heading */
.brand-story-heading {
  font-family: 'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 300;
  font-size: 40px;
  line-height: 45px;
  color: #183754;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
}

/* Rich Text Content */
.brand-story-text {
  font-family: 'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #3E6282;
}

.brand-story-text p {
  margin: 0 0 20px 0;
}

.brand-story-text p:last-child {
  margin-bottom: 0;
}

/* Right Column - Image Wrapper */
.brand-story-image-wrapper {
  flex: 0 0 50vw;
  width: 50vw;
  height: 100%;
  position: relative;
  z-index: 2;
}

/* Background Image */
.brand-story-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

/* Image Placeholder */
.brand-story-image-placeholder {
  background-color: #E5E5E5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-story-placeholder-text {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-size: 18px;
  color: #999;
}

/* Logo Overlay */
.brand-story-logo-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  max-width: 200px;
  width: 100%;
}

.brand-story-logo-overlay img {
  width: 100%;
  height: auto;
  display: block;
}

/* =============================================
   ANIMATIONS - DESKTOP ONLY
   ============================================= */

/* Initial state for animated elements */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 600ms cubic-bezier(0.4, 0, 0.2, 1),
              transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}

/* Active state when in view */
.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Sequential animation delays */
.brand-story-heading.animate-on-scroll {
  transition-delay: 0ms;
}

.brand-story-text.animate-on-scroll {
  transition-delay: 200ms;
}

.brand-story-logo-overlay.animate-on-scroll {
  transition-delay: 400ms;
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
    will-change: auto;
  }
}

/* =============================================
   LARGE DESKTOP (1441px+)
   ============================================= */

@media (min-width: 1441px) {
  .brand-story-container {
    max-width: 1440px;
  }

  /* Adjust column widths to respect container max-width */
  .brand-story-content,
  .brand-story-image-wrapper {
    flex: 0 0 50%;
    width: 50%;
  }
}

/* =============================================
   TABLET (1024px and below)
   ============================================= */

@media (max-width: 1024px) {
  /* Maintain two-column layout */
  .brand-story-section {
    height: 800px; /* Keep fixed height */
  }

  .brand-story-content {
    padding: 140px 0 0 40px;
  }

  .brand-story-content-inner {
    max-width: 420px;
    gap: 20px;
  }

  /* Scale down typography */
  .brand-story-heading {
    font-size: 32px;
    line-height: 36px;
  }

  .brand-story-text {
    font-size: 18px;
    line-height: 27px;
  }

  .brand-story-text p {
    margin-bottom: 18px;
  }

  /* Logo size adjustment */
  .brand-story-logo-overlay {
    max-width: 180px;
  }

  /* DISABLE ANIMATIONS ON TABLET */
  .animate-on-scroll {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

/* =============================================
   MOBILE (767px and below)
   ============================================= */

@media (max-width: 767px) {
  /* Change to 75vh height */
  .brand-story-section {
    height: 75vh;
  }

  /* Stack layout vertically */
  .brand-story-container {
    flex-direction: column;
  }

  /* Image first - takes 60% of 75vh */
  .brand-story-image-wrapper {
    flex: 0 0 60%;
    width: 100%;
    order: 1;
  }

  /* Content below - takes 40% of 75vh */
  .brand-story-content {
    flex: 0 0 40%;
    width: 100%;
    padding: 40px 20px;
    order: 2;
    overflow-y: auto; /* Allow scroll if content overflows */
  }

  .brand-story-content-inner {
    max-width: 90%;
    margin: 0 auto;
    gap: 16px;
    text-align: left; /* Ensure text is left-aligned */
  }

  /* Scale down typography further */
  .brand-story-heading {
    font-size: 28px;
    line-height: 32px;
  }

  .brand-story-text {
    font-size: 16px;
    line-height: 24px;
  }

  .brand-story-text p {
    margin-bottom: 16px;
  }

  /* Logo size adjustment */
  .brand-story-logo-overlay {
    max-width: 150px;
  }

  /* DISABLE ANIMATIONS ON MOBILE */
  .animate-on-scroll {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

/* =============================================
   SMALL MOBILE (375px and below)
   ============================================= */

@media (max-width: 375px) {
  .brand-story-section {
    height: 75vh; /* Same as mobile */
  }

  .brand-story-content {
    padding: 32px 16px;
  }

  /* Further scale down typography */
  .brand-story-heading {
    font-size: 24px;
    line-height: 28px;
  }

  .brand-story-text {
    font-size: 15px;
    line-height: 22px;
  }

  .brand-story-text p {
    margin-bottom: 14px;
  }

  /* Logo size adjustment */
  .brand-story-logo-overlay {
    max-width: 120px;
  }
}
```

---

## 4. JavaScript Implementation (Desktop Animations Only)

### Intersection Observer for Scroll-Triggered Animations

```javascript
// custom-section-brand-story-about-us.js

(function() {
  'use strict';

  // Check if desktop (1025px and above) and not reduced motion preference
  function isDesktop() {
    return window.innerWidth >= 1025;
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Initialize animations only on desktop
  function initAnimations() {
    // Exit early if not desktop or user prefers reduced motion
    if (!isDesktop() || prefersReducedMotion()) {
      // Remove animation classes to show content immediately
      const animatedElements = document.querySelectorAll('.brand-story-section .animate-on-scroll');
      animatedElements.forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    // Intersection Observer options
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters viewport
      threshold: 0.2 // Trigger when 20% of element is visible
    };

    // Callback when element intersects
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class to trigger animation
          entry.target.classList.add('is-visible');
          // Stop observing once animated (animation happens once)
          observer.unobserve(entry.target);
        }
      });
    };

    // Create observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all animated elements in this section
    const animatedElements = document.querySelectorAll('.brand-story-section .animate-on-scroll');
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }

  // Handle resize to disable/enable animations
  let resizeTimer;
  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Reinitialize on resize (e.g., rotate from mobile to desktop)
      initAnimations();
    }, 250);
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }

  // Listen for resize events
  window.addEventListener('resize', handleResize);

})();
```

**JavaScript Features:**
1. Intersection Observer API for performant scroll detection
2. Desktop-only activation (1025px and above)
3. Respects `prefers-reduced-motion` accessibility preference
4. One-time animations (elements don't re-animate when scrolling back)
5. Handles window resize to adapt to orientation changes
6. Immediately shows content on non-desktop devices

---

## 5. Asset Integration

### Logo SVG Reference

**Existing Asset Path:**
```
assets/custom-section-diamension-quote/logo/diamension-logo.svg
```

**Liquid Tag:**
```liquid
{{ 'diamension-logo.svg' | asset_url | image_tag }}
```

**Note:** This assumes the logo SVG is already in the assets folder from the Quote section. If the file is in a subfolder, use the full path or move it to the root assets folder for easier reference.

### Font Loading

**Font Files (Existing):**
```
assets/fonts/neue-haas-display/NeueHaasDisplay-Light.woff2
assets/fonts/neue-haas-display/NeueHaasDisplay-Roman.woff2
```

**Implementation:**
- Include @font-face declarations in CSS (shown in section 3)
- Use `font-display: swap` for performance
- Provide system font fallback stack

### Background Image

**Shopify Image Filter:**
```liquid
{{ section.settings.background_image | image_url: width: 1440 }}
```

**Responsive Srcset (Optional Enhancement):**
```liquid
<img
  src="{{ section.settings.background_image | image_url: width: 1440 }}"
  srcset="
    {{ section.settings.background_image | image_url: width: 768 }} 768w,
    {{ section.settings.background_image | image_url: width: 1024 }} 1024w,
    {{ section.settings.background_image | image_url: width: 1440 }} 1440w
  "
  sizes="(max-width: 767px) 100vw, 50vw"
  alt="Brand story background"
  loading="lazy"
>
```

**Placeholder Handling:**
- Show `.brand-story-image-placeholder` if no image uploaded
- Display "Add a background image" text
- Still show logo overlay if enabled

---

## 6. Responsive Strategy Summary

### Desktop (1440px)
- Two-column flexbox (50-50vw split)
- Fixed 800px height
- Content left: 56px padding, starts 192px from top
- Image right: Full 50vw width, object-fit cover
- Logo centered on image
- Animations: Scroll-triggered fade-in sequence (heading → content → logo)

### Large Desktop (1441px+)
- Container max-width 1440px, centered
- Columns adjust to 50% each (not 50vw)
- Same visual appearance, prevents excessive stretching

### Tablet (1024px)
- Maintain two-column layout
- Fixed 800px height
- Reduce padding: 40px left, 140px top
- Scale fonts: 32px heading, 18px body
- Content max-width: 420px
- Logo: 180px max-width
- Animations: DISABLED

### Mobile (767px and below)
- Stack vertically with flex-direction: column
- Section height: 75vh (viewport-relative)
- Image first (60% of 75vh), content below (40% of 75vh)
- Content: Centered block, left-aligned text, padding 40px 20px
- Scale fonts: 28px heading, 16px body
- Logo: 150px max-width
- Animations: DISABLED
- Content overflow: Scrollable if needed

### Small Mobile (375px)
- Same as mobile layout
- Section height: 75vh
- Further font scaling: 24px heading, 15px body
- Tighter padding: 32px 16px
- Logo: 120px max-width
- Animations: DISABLED

---

## 7. Development Checklist

### Liquid File
- [ ] Create `sections/custom-section-brand-story-about-us.liquid`
- [ ] Include schema with 4 settings (heading, content, image, logo toggle)
- [ ] Add stylesheet and script tags
- [ ] Implement semantic HTML structure
- [ ] Handle empty states (no image, no content)
- [ ] Add section preset for Theme Editor

### CSS File
- [ ] Create `assets/custom-section-brand-story-about-us.css`
- [ ] Include font-face declarations
- [ ] Implement base desktop styles (1440px)
- [ ] Add large desktop media query (1441px+)
- [ ] Add tablet media query (1024px)
- [ ] Add mobile media query (767px)
- [ ] Add small mobile media query (375px)
- [ ] Implement animation styles (desktop only)
- [ ] Add reduced motion query
- [ ] Ensure z-index layering is correct

### JavaScript File
- [ ] Create `assets/custom-section-brand-story-about-us.js`
- [ ] Implement Intersection Observer
- [ ] Add desktop detection (1025px+)
- [ ] Add reduced motion detection
- [ ] Disable animations on tablet/mobile
- [ ] Handle window resize events
- [ ] Test animation sequence timing
- [ ] Ensure one-time animations

### Asset Integration
- [ ] Verify logo SVG path is correct
- [ ] Verify font files are loaded
- [ ] Test image placeholder fallback
- [ ] Optimize image loading with lazy attribute

### Testing
- [ ] Test on desktop (1440px) - animations should work
- [ ] Test on large desktop (1920px) - max-width constraint
- [ ] Test on tablet (1024px) - two-column, no animations
- [ ] Test on mobile (767px) - stacked, 75vh height
- [ ] Test on small mobile (375px) - further scaling
- [ ] Test with no background image
- [ ] Test with logo toggle off
- [ ] Test with empty heading/content
- [ ] Test accessibility (keyboard navigation, screen reader)
- [ ] Test reduced motion preference

---

## 8. Special Implementation Notes

### Critical Requirements

1. **Image Container Constraint:**
   - Image MUST stay within 50vw flexbox column on desktop
   - Do NOT use viewport width breakout techniques
   - Use `flex: 0 0 50vw` to enforce width

2. **Height Management:**
   - Desktop/Tablet: Fixed 800px (no viewport units)
   - Mobile: 75vh (adapts to screen size)
   - Use media query breakpoint at 767px to switch

3. **Animation Trigger:**
   - MUST use scroll trigger (Intersection Observer)
   - NOT page load trigger
   - Only active on desktop (1025px and above)
   - Completely disabled on tablet and mobile

4. **Mobile Layout Order:**
   - Image FIRST (order: 1)
   - Content SECOND (order: 2)
   - Use flexbox `order` property or structure HTML accordingly

5. **Mobile Text Alignment:**
   - Content block: Centered with `margin: 0 auto`
   - Text within block: LEFT aligned with `text-align: left`
   - Do NOT center the text itself

6. **Color Hardcoding:**
   - Background: #FFFAF5
   - Heading: #183754
   - Body: #3E6282
   - NOT configurable in schema settings

7. **Rich Text Rendering:**
   - Use `{{ section.settings.content }}` without filters
   - Shopify richtext fields output HTML
   - Style `<p>` tags for proper spacing

8. **Logo Overlay:**
   - Positioned absolutely, centered on image
   - Conditional rendering based on checkbox
   - Reuse existing SVG asset

---

## 9. Performance Optimizations

1. **Font Loading:**
   - Use `font-display: swap` to prevent FOIT (Flash of Invisible Text)
   - Preload critical fonts if needed

2. **Image Optimization:**
   - Use Shopify's image filters for responsive sizing
   - Add `loading="lazy"` for off-screen images
   - Consider srcset for multiple resolutions

3. **Animation Performance:**
   - Use `transform` and `opacity` (GPU-accelerated)
   - Add `will-change` property for animated elements
   - Use Intersection Observer instead of scroll listener

4. **JavaScript:**
   - Defer script loading with `defer` attribute
   - Use IIFE to avoid global scope pollution
   - Debounce resize handler

---

## 10. Accessibility Considerations

1. **Semantic HTML:**
   - Use `<section>` for section wrapper
   - Use `<h2>` for heading (appropriate hierarchy)
   - Use `<div>` for rich text container

2. **Keyboard Navigation:**
   - No interactive elements (no special handling needed)
   - If adding links in rich text, ensure proper focus styles

3. **Screen Readers:**
   - Logo image should have meaningful alt text
   - Consider `aria-label` for section if needed

4. **Reduced Motion:**
   - Respect `prefers-reduced-motion` media query
   - Disable animations for users who prefer it
   - Show content immediately without transitions

5. **Color Contrast:**
   - Verify heading color (#183754) on background (#FFFAF5) meets WCAG AA
   - Verify body color (#3E6282) on background (#FFFAF5) meets WCAG AA

---

## 11. Error Handling and Edge Cases

1. **No Background Image:**
   - Show placeholder with background color
   - Display "Add a background image" text
   - Still show logo overlay if enabled

2. **Empty Heading:**
   - Conditional rendering with `{% if %}`
   - Don't render `<h2>` tag if empty

3. **Empty Content:**
   - Conditional rendering with `{% if %}`
   - Don't render content wrapper if empty

4. **Logo SVG Missing:**
   - Add fallback or error handling in Liquid
   - Consider using `{% if %}` to check asset exists

5. **Font Loading Failure:**
   - System font fallback stack ensures text is always readable
   - `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

6. **JavaScript Disabled:**
   - Animations should gracefully degrade
   - Content should still be visible (use CSS-only approach)
   - Consider removing `animate-on-scroll` class via `<noscript>` CSS

---

## Implementation Priority

1. **Phase 1:** Liquid file with schema and markup
2. **Phase 2:** CSS for desktop (1440px) base styles
3. **Phase 3:** CSS responsive breakpoints (1441px, 1024px, 767px, 375px)
4. **Phase 4:** JavaScript for desktop animations
5. **Phase 5:** Testing and refinement

---

## Files Summary

| File | Path | Purpose |
|------|------|---------|
| Liquid Section | `sections/custom-section-brand-story-about-us.liquid` | Section markup and schema |
| CSS | `assets/custom-section-brand-story-about-us.css` | All styles and responsive design |
| JavaScript | `assets/custom-section-brand-story-about-us.js` | Desktop scroll animations |

All specifications are complete and ready for the Developer agent to implement.
