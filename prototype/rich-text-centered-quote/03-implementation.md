# Rich Text Centered Quote - Implementation Guide

## File Structure

```
sections/
└── custom-section-rich-text-centered-quote.liquid

assets/
└── section-rich-text-centered-quote.css
```

**Note**: No JavaScript file required (static display only)

---

## 1. Liquid Schema Settings

### Complete Schema Configuration

```liquid
{% schema %}
{
  "name": "Rich Text Centered Quote",
  "tag": "section",
  "class": "custom-section-rich-text-centered-quote",
  "settings": [
    {
      "type": "textarea",
      "id": "text_content",
      "label": "Text Content",
      "default": "We believe diamonds should not only shine but also stand for something greater. With Diamensions, you don't just wear jewelry—you wear authenticity, innovation, and a vision for the future.",
      "info": "Keep content concise. Mobile devices limit text to 5 lines maximum."
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background Color",
      "default": "#FFFAF5"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text Color",
      "default": "#183754"
    }
  ],
  "presets": [
    {
      "name": "Rich Text Centered Quote"
    }
  ]
}
{% endschema %}
```

### Schema Notes
- **textarea**: For multi-line text input (better than single-line text)
- **color**: Native Shopify color picker with hex values
- **info**: Warns users about mobile line constraint
- **presets**: Allows section to be added from theme editor

---

## 2. Liquid Markup Structure

### Semantic HTML Structure

```liquid
<section
  class="custom-section-rich-text-centered-quote"
  style="background-color: {{ section.settings.background_color }};"
>
  <div class="custom-section-rich-text-centered-quote__container">
    <p
      class="custom-section-rich-text-centered-quote__text"
      style="color: {{ section.settings.text_color }};"
    >
      {{ section.settings.text_content }}
    </p>
  </div>
</section>

{{ 'section-rich-text-centered-quote.css' | asset_url | stylesheet_tag }}
```

### Markup Notes

#### Element Hierarchy
```
<section>                    → .custom-section-rich-text-centered-quote
  <div>                      → .custom-section-rich-text-centered-quote__container
    <p>                      → .custom-section-rich-text-centered-quote__text
```

#### Inline Styles
- Background color applied to `<section>` element
- Text color applied to `<p>` element
- Allows schema settings to override CSS defaults

#### CSS Asset Loading
- Loaded at bottom of section
- Uses Shopify's `asset_url` filter
- `stylesheet_tag` generates proper `<link>` element

#### Accessibility Considerations
- `<section>` tag provides semantic structure
- `<p>` tag for paragraph text content
- No ARIA labels needed (simple static text)
- Color contrast meets WCAG standards (dark text on light background)

---

## 3. CSS Implementation

### Complete CSS for All Breakpoints

```css
/* =============================================================================
   Rich Text Centered Quote Section
   Fixed-height centered text block with responsive typography
   ============================================================================= */

/* Base styles for 1440px Desktop */
.custom-section-rich-text-centered-quote {
  background-color: #FFFAF5; /* Default - overridden by inline style */
  width: 100%;
  height: 605px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-section-rich-text-centered-quote__container {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-section-rich-text-centered-quote__text {
  max-width: 675px;
  width: 100%;
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-weight: 400;
  font-size: 40px;
  line-height: 45px;
  color: #183754; /* Default - overridden by inline style */
  text-align: center;
  margin: 0;
  padding: 0;
}

/* Large Desktop - Prevent stretch beyond 1440px */
@media (min-width: 1441px) {
  .custom-section-rich-text-centered-quote__container {
    max-width: 1440px;
  }
}

/* Tablet - 1024px and below */
@media (max-width: 1024px) {
  .custom-section-rich-text-centered-quote {
    height: 605px; /* Maintain fixed height */
  }

  .custom-section-rich-text-centered-quote__text {
    max-width: 80vw;
    font-size: 32px;
    line-height: 38px;
  }
}

/* Mobile - 767px and below */
@media (max-width: 767px) {
  .custom-section-rich-text-centered-quote {
    height: 605px; /* Maintain fixed height */
  }

  .custom-section-rich-text-centered-quote__text {
    max-width: 90vw;
    font-size: 24px;
    line-height: 30px;
  }
}

/* Small Mobile - 375px and below */
@media (max-width: 375px) {
  .custom-section-rich-text-centered-quote {
    height: 605px; /* Maintain fixed height */
  }

  .custom-section-rich-text-centered-quote__text {
    max-width: 95vw;
    font-size: 20px;
    line-height: 26px;
  }
}
```

### CSS Architecture Notes

#### BEM Naming Convention
```
Block:    .custom-section-rich-text-centered-quote
Element:  .custom-section-rich-text-centered-quote__container
Element:  .custom-section-rich-text-centered-quote__text
```

#### Fixed Height Strategy
- Section height: `605px` at ALL breakpoints
- Explicitly restated in each media query for clarity
- Flexbox centering handles vertical alignment automatically

#### Container Strategy
- Outer section: Full-width with fixed height
- Inner container: Max-width 1440px, centered with flexbox
- Text element: Responsive max-width per breakpoint

#### Typography Cascade
- Base (1440px): 40px/45px - matches Figma exactly
- Tablet (1024px): 32px/38px - 20% reduction
- Mobile (767px): 24px/30px - progressive scaling
- Small Mobile (375px): 20px/26px - final fine-tuning

#### Responsive Width Strategy
- Desktop: Fixed `675px` max-width for optimal line length (45-75 characters)
- Tablet: `80vw` allows content to breathe with side margins
- Mobile: `90vw` accommodates smaller screens
- Small Mobile: `95vw` maximizes available space

#### Color Application
- CSS defaults provide fallback values
- Inline styles from Liquid override for customization
- No `!important` flags needed

---

## 4. Responsive Behavior Breakdown

### Desktop (1440px)
```css
/* Section */
height: 605px;
width: 100%;

/* Container */
max-width: 1440px;
display: flex; (centering)

/* Text */
max-width: 675px;
font-size: 40px;
line-height: 45px;
```

**Visual Result**: Text block centered in 605px tall section, max 675px wide

---

### Large Desktop (1441px+)
```css
/* Container */
max-width: 1440px; (prevents ultra-wide stretch)
margin: 0 auto; (centers container)
```

**Visual Result**: Content doesn't stretch beyond 1440px on 4K+ displays

---

### Tablet (1024px and below)
```css
/* Section */
height: 605px; (unchanged)

/* Text */
max-width: 80vw;
font-size: 32px; (20% smaller)
line-height: 38px;
```

**Visual Result**: Smaller text, wider relative width (80% of viewport)

---

### Mobile (767px and below)
```css
/* Section */
height: 605px; (unchanged)

/* Text */
max-width: 90vw;
font-size: 24px; (40% smaller than desktop)
line-height: 30px;
```

**Visual Result**: Text scales down, takes 90% of screen width
**Constraint**: Content should fit within 5 lines maximum

---

### Small Mobile (375px and below)
```css
/* Section */
height: 605px; (unchanged)

/* Text */
max-width: 95vw;
font-size: 20px; (50% smaller than desktop)
line-height: 26px;
```

**Visual Result**: Smallest text size, maximum width usage (95%)
**Constraint**: Content should fit within 5 lines maximum

---

## 5. JavaScript Requirements

**NONE** - This section is static with no interactions.

No JavaScript file needed for:
- Animations
- Hover effects
- Scroll effects
- Dynamic behavior

---

## 6. Asset Dependencies

### Required Assets

#### Fonts
- **File**: `assets/fonts/neue-haas-display/NeueHaasDisplay-Roman.woff2`
- **Status**: Already available in theme
- **Loading**: Global theme font loading (no section-specific @font-face needed)

### Not Required

#### Images
- None (text-only section)

#### Icons
- None (no decorative elements)

#### Additional JavaScript
- None (static display)

---

## 7. Development Checklist

### Pre-Implementation
- [x] Design analysis complete
- [x] Planning documents approved
- [x] Font assets confirmed available
- [x] Responsive strategy defined

### Liquid File
- [ ] Create `sections/custom-section-rich-text-centered-quote.liquid`
- [ ] Implement schema with 3 settings (text, background color, text color)
- [ ] Add markup structure (section > container > text)
- [ ] Apply inline styles for background and text color
- [ ] Load CSS asset with `stylesheet_tag`
- [ ] Test schema settings in theme editor

### CSS File
- [ ] Create `assets/section-rich-text-centered-quote.css`
- [ ] Implement base styles for 1440px
- [ ] Add large desktop media query (1441px+)
- [ ] Add tablet media query (1024px)
- [ ] Add mobile media query (767px)
- [ ] Add small mobile media query (375px)
- [ ] Verify fixed 605px height at all breakpoints
- [ ] Verify responsive typography scaling
- [ ] Verify responsive width constraints

### Testing & Validation
- [ ] Run `shopify theme check` (Liquid validation)
- [ ] Verify section appears in theme editor
- [ ] Test all three schema settings
- [ ] Test responsive behavior at all breakpoints
- [ ] Verify vertical/horizontal centering
- [ ] Verify 1440px max-width constraint on large displays
- [ ] Verify mobile 5-line constraint with default content
- [ ] Check color contrast accessibility
- [ ] Visual regression testing (screenshots at 4 breakpoints)

### Git & Deployment
- [ ] Git-Manager creates feature branch
- [ ] Git-Manager creates checkpoint commit
- [ ] Validator runs theme check
- [ ] User adds section to test page
- [ ] Tester runs complete test suite
- [ ] Fixer addresses any issues (if needed)
- [ ] Git-Manager merges to main after tests pass

---

## 8. Testing Scenarios

### Schema Settings Test
1. Change text content → Verify update in preview
2. Change background color → Verify color applies to section
3. Change text color → Verify color applies to text
4. Test with very long text → Verify overflow behavior
5. Test with very short text → Verify centering maintained

### Responsive Behavior Test
1. **1920px (Large Desktop)**
   - Container stays at 1440px max-width
   - Content centered on page

2. **1440px (Desktop)**
   - Text at 40px/45px
   - Content max-width 675px
   - Section height 605px

3. **1024px (Tablet)**
   - Text at 32px/38px
   - Content width 80vw
   - Section height 605px

4. **767px (Mobile)**
   - Text at 24px/30px
   - Content width 90vw
   - Section height 605px
   - Content fits in 5 lines

5. **375px (Small Mobile)**
   - Text at 20px/26px
   - Content width 95vw
   - Section height 605px
   - Content fits in 5 lines

### Visual Centering Test
- Text is vertically centered in 605px container
- Text is horizontally centered in viewport
- Centering maintained at all breakpoints
- Centering maintained with different content lengths

### Accessibility Test
- Color contrast: #183754 on #FFFAF5 meets WCAG AA
- Semantic HTML structure (section, p tags)
- Readable font sizes at all breakpoints
- No interactive elements requiring keyboard navigation

---

## 9. Common Issues & Solutions

### Issue: Text Overflows on Mobile
**Cause**: Content too long for 5-line constraint
**Solution**: Warn user in schema info text, suggest shorter content

### Issue: Section Height Too Tall/Short
**Cause**: Fixed 605px may not suit all use cases
**Solution**: This is by design - if user needs variable height, suggest different section type

### Issue: Font Not Loading
**Cause**: Font path incorrect or font file missing
**Solution**: Verify `assets/fonts/neue-haas-display/NeueHaasDisplay-Roman.woff2` exists

### Issue: Colors Not Applying
**Cause**: Inline styles missing or schema IDs incorrect
**Solution**: Verify schema IDs match Liquid variable names exactly

### Issue: Container Stretches Beyond 1440px
**Cause**: Missing max-width constraint
**Solution**: Verify `@media (min-width: 1441px)` media query is present

---

## 10. Performance Considerations

### CSS Optimization
- Single CSS file, minimal selectors
- No complex calculations or transforms
- No animations (static display)
- Estimated file size: ~1.5KB (minified)

### Render Performance
- Simple DOM structure (3 elements)
- No JavaScript execution
- No image loading
- Immediate paint, no layout shifts

### Accessibility Performance
- Semantic HTML improves screen reader performance
- High color contrast improves readability
- Large text sizes improve mobile usability

---

## 11. Handoff Notes for Developer Agent

### Critical Implementation Points

1. **Fixed Height Non-Negotiable**
   - 605px height at ALL breakpoints
   - Do not add responsive height adjustments
   - Do not add padding that affects total height

2. **Inline Styles Required**
   - Background color MUST be inline on `<section>`
   - Text color MUST be inline on `<p>`
   - This allows schema settings to override CSS defaults

3. **No JavaScript File**
   - Do not create `section-rich-text-centered-quote.js`
   - Section is entirely static

4. **Font Already Available**
   - Do not add @font-face rules
   - Font is loaded globally in theme

5. **BEM Naming Strict**
   - Follow exact class names in implementation guide
   - Maintains consistency with existing sections

### Files to Create

1. `sections/custom-section-rich-text-centered-quote.liquid` (required)
2. `assets/section-rich-text-centered-quote.css` (required)

### Expected Output

After implementation:
- Section appears in Shopify theme editor
- All three settings are functional
- Visual matches Figma at all breakpoints
- Passes `shopify theme check` validation
- Ready for Git checkpoint and Validator agent

---

## 12. Success Criteria Summary

Implementation is complete when:

- [x] Liquid file created with correct schema
- [x] CSS file created with all responsive breakpoints
- [x] Section height is 605px at all breakpoints
- [x] Typography scales: 40px → 32px → 24px → 20px
- [x] Container max-width: 1440px with centering
- [x] Content max-width: 675px → 80vw → 90vw → 95vw
- [x] All three schema settings work (text, background, text color)
- [x] Vertical and horizontal centering perfect
- [x] No JavaScript file created (not needed)
- [x] Font loads correctly (Neue Haas Grotesk Display Pro)
- [x] Shopify theme check passes with no errors
- [x] Visual regression tests pass at all 4 breakpoints
- [x] Mobile content fits in 5 lines with default text

---

**End of Implementation Guide**
