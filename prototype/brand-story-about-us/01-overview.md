# Brand Story About Us - Overview

## Section Purpose
A two-column brand story section featuring editable heading and rich text content on the left, with a decorative background image and optional logo overlay on the right. Designed to communicate company heritage and vision with scroll-triggered animations on desktop.

---

## Component Type Classification
**Two-Column Brand Story Layout**
- Left column: Text content (heading + rich text)
- Right column: Background image with centered logo overlay
- Desktop: Side-by-side 50-50vw split
- Mobile: Stacked vertical layout (image first, content below)

---

## File Structure

### Files to Create

```
sections/
└── custom-section-brand-story-about-us.liquid

assets/
├── custom-section-brand-story-about-us.css
└── custom-section-brand-story-about-us.js
```

### Asset Dependencies

**Fonts (Existing):**
```
assets/fonts/neue-haas-display/
├── NeueHaasDisplay-Light.woff2
├── NeueHaasDisplay-Roman.woff2
└── NeueHaasDisplay-Bold.woff2
```

**Logo SVG (Existing - Reused):**
```
assets/custom-section-diamension-quote/logo/diamension-logo.svg
```

**Background Image:**
- Uploaded via section settings (image_picker)
- Placeholder shown if no image uploaded

---

## Component Breakdown

### 1. Section Wrapper
- Full viewport width container
- Background color: #FFFAF5 (hardcoded)
- Height: 800px (desktop/tablet), 75vh (mobile)

### 2. Layout Container
- Max-width: 1440px (desktop 1441px+)
- Flexbox: Two equal columns (50vw each on desktop)
- Responsive: Stack on mobile (767px and below)

### 3. Left Column - Text Content
**Elements:**
- Heading (text input)
  - Font: Neue Haas Display Light
  - Size: 40px desktop → 32px tablet → 28px mobile → 24px small
  - Color: #183754 (hardcoded)
  - Transform: uppercase

- Rich Text Content (richtext input)
  - Font: Neue Haas Display Roman
  - Size: 20px desktop → 18px tablet → 16px mobile → 15px small
  - Color: #3E6282 (hardcoded)
  - Max-width: 498px desktop → 420px tablet → 90% mobile

**Layout:**
- Desktop: 56px left padding, content starts ~192px from top
- Tablet: 40px left padding, ~140px from top
- Mobile: Centered block with 40px vertical, 20px horizontal padding

### 4. Right Column - Image with Overlay
**Background Image:**
- Width: Full width of 50vw container (desktop)
- Height: 800px (desktop/tablet), part of 75vh (mobile)
- Object-fit: cover
- Position: Right column of flexbox

**Logo Overlay:**
- Asset: diamension-logo.svg (reused from quote section)
- Position: Absolute centered on image
- Visibility: Controlled by checkbox setting
- Default: Visible

### 5. Animations (Desktop Only)
**Scroll-Triggered Sequence:**
1. Heading fades in from bottom (first)
2. Content fades in from bottom (second)
3. Logo overlay fades in from bottom (third)

**Disabled on:**
- Tablet (1024px and below)
- Mobile (767px and below)

---

## Functional Requirements Checklist

### Content Management
- [ ] Editable heading (text input)
- [ ] Editable rich text content (richtext input)
- [ ] Image upload capability (image_picker)
- [ ] Logo overlay show/hide toggle (checkbox)

### Responsive Behavior
- [ ] Desktop: 50-50vw two-column layout, 800px height
- [ ] Tablet: Maintain two-column, 800px height, scaled fonts
- [ ] Mobile: Stack vertically (image first), 75vh height
- [ ] Small mobile: Same as mobile with further font scaling

### Visual Effects
- [ ] Scroll-triggered animations on desktop only
- [ ] Sequential fade-in: heading → content → logo
- [ ] No animations on tablet/mobile
- [ ] Smooth transitions and easing

### Layout Constraints
- [ ] Section max-width 1440px centered on large screens (1441px+)
- [ ] Image stays within 50vw flexbox column (no full viewport breakout)
- [ ] Content alignment: LEFT within centered block on mobile
- [ ] Maintain hardcoded colors (not editable)

### Asset Integration
- [ ] Load Neue Haas Display fonts (Light, Roman)
- [ ] Reference existing logo SVG from quote section
- [ ] Handle missing image with placeholder

---

## Schema Settings Structure

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
      "default": "<p>Diamensions was born with a singular vision: to make brilliance better...</p>"
    },
    {
      "type": "image_picker",
      "id": "background_image",
      "label": "Background Image"
    },
    {
      "type": "checkbox",
      "id": "show_logo_overlay",
      "label": "Show Logo Overlay",
      "default": true
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

## Assets Needed Checklist

### Fonts
- [x] Neue Haas Display Light (existing in assets/fonts/neue-haas-display/)
- [x] Neue Haas Display Roman (existing in assets/fonts/neue-haas-display/)

### Images
- [x] Logo SVG (existing: assets/custom-section-diamension-quote/logo/diamension-logo.svg)
- [ ] Background image (merchant upload via settings)

### Fallbacks
- [ ] Placeholder for missing background image
- [ ] Graceful degradation if fonts fail to load

---

## Development Notes

### Critical Implementation Details

1. **Flexbox Layout:**
   - Use 50vw width for each column on desktop
   - Image must stay within its 50vw container (no viewport width breakout)
   - Mobile: flex-direction: column with image first

2. **Height Management:**
   - Desktop/Tablet: Fixed 800px
   - Mobile (767px and below): 75vh
   - Image: object-fit: cover to maintain aspect ratio

3. **Animation Strategy:**
   - Desktop only: Use Intersection Observer API
   - Trigger on scroll (not page load)
   - Sequential timing: 0ms → 200ms → 400ms
   - Disable completely below 1024px

4. **Color Hardcoding:**
   - Background: #FFFAF5
   - Heading: #183754
   - Body text: #3E6282
   - NOT editable in schema settings

5. **Font Loading:**
   - Reference existing @font-face declarations
   - Use font-display: swap for performance
   - System font fallback: -apple-system, sans-serif

---

## File Naming Conventions

All files follow the project's custom section naming pattern:

- Section: `custom-section-brand-story-about-us.liquid`
- CSS: `custom-section-brand-story-about-us.css`
- JS: `custom-section-brand-story-about-us.js`

---

## Next Steps for Developer

1. Create Liquid file with schema and markup structure
2. Implement responsive CSS for all breakpoints
3. Add JavaScript for desktop scroll animations
4. Test responsive behavior at all breakpoints
5. Verify animations work on desktop only
6. Validate font loading and fallbacks
7. Ensure logo overlay positioning is pixel-perfect
