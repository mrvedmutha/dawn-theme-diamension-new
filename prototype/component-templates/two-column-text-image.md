# Responsive Pattern: Two-Column Text-Image Layout

## Component Type
Two-column layout with text content on one side and image on the other, designed to stack vertically on mobile.

## When to Use
- Brand story sections
- About us content
- Feature descriptions with visual support
- Any content requiring equal emphasis on text and imagery

---

## Responsive Strategy

### Desktop (1440px)
- **Layout:** 50-50vw flexbox split (side-by-side columns)
- **Height:** Fixed pixel height (typically 600px-800px)
- **Text Column:**
  - Padding from edge (typically 40-60px)
  - Max-width constraint for readability (400-500px)
  - Vertical alignment: flex-start or centered
- **Image Column:**
  - Full width of 50vw container
  - Object-fit: cover
  - Stays within flexbox column (no viewport breakout)
- **Animations:** Optional scroll-triggered effects (desktop only)

### Large Desktop (1441px+)
- **Container:** max-width 1440px, centered with `margin: 0 auto`
- **Columns:** Adjust to 50% each (not 50vw) to respect container width
- **Prevents:** Excessive stretching on ultra-wide screens

### Tablet (1024px)
- **Layout:** Maintain two-column layout
- **Height:** Same fixed height as desktop (if appropriate)
- **Adjustments:**
  - Reduce padding (typically -30% from desktop)
  - Scale fonts down proportionally (~80% of desktop size)
  - Reduce content max-width (~85% of desktop)
- **Animations:** Disabled

### Mobile (767px and below)
- **Layout:** Stack vertically with `flex-direction: column`
- **Height:** Switch to viewport-relative (typically 75vh or 80vh)
- **Image:**
  - Order: First (if image is primary) or second (if text is primary)
  - Height: 50-60% of total section height
  - Full width (100%)
- **Content:**
  - Height: 40-50% of total section height
  - Centered block with `margin: 0 auto`
  - Text alignment: LEFT within centered block
  - Padding: 30-40px vertical, 20px horizontal
  - Overflow: auto (allows scrolling if content exceeds space)
- **Animations:** Disabled

### Small Mobile (375px)
- **Layout:** Same as mobile
- **Adjustments:**
  - Further font scaling (~60% of desktop)
  - Tighter padding (typically 32px 16px)
  - Image height may reduce slightly for better content visibility

---

## Key Implementation Details

### Flexbox Structure
```css
.container {
  display: flex;
  flex-direction: row; /* Desktop */
}

.text-column {
  flex: 0 0 50vw;
  width: 50vw;
}

.image-column {
  flex: 0 0 50vw;
  width: 50vw;
}

@media (min-width: 1441px) {
  .container {
    max-width: 1440px;
    margin: 0 auto;
  }

  .text-column,
  .image-column {
    flex: 0 0 50%;
    width: 50%;
  }
}

@media (max-width: 767px) {
  .container {
    flex-direction: column;
    height: 75vh; /* or other vh value */
  }

  .image-column {
    flex: 0 0 60%;
    width: 100%;
    order: 1; /* Adjust based on content priority */
  }

  .text-column {
    flex: 0 0 40%;
    width: 100%;
    order: 2;
    overflow-y: auto;
  }
}
```

### Height Management
- **Desktop/Tablet:** Use fixed pixel heights for consistency
- **Mobile:** Use viewport units (vh) for better adaptation to different screen sizes
- **Typical mobile height:** 75vh (allows some scroll context, doesn't dominate screen)

### Animation Pattern (Desktop Only)
- **Trigger:** Intersection Observer (scroll-based)
- **Disable:** Below 1025px width
- **Elements:** Sequential fade-in from bottom
- **Timing:** 200-400ms delays between elements
- **Accessibility:** Respect `prefers-reduced-motion`

---

## Typography Scaling Pattern

| Breakpoint | Heading Scale | Body Scale | Line Height Ratio |
|------------|---------------|------------|-------------------|
| Desktop (1440px) | 100% (baseline) | 100% | 1.1-1.2x for headings, 1.5x for body |
| Tablet (1024px) | 80% | 90% | Maintain same ratios |
| Mobile (767px) | 70% | 80% | Maintain same ratios |
| Small Mobile (375px) | 60% | 75% | Maintain same ratios |

---

## Spacing Reduction Pattern

| Breakpoint | Padding Reduction | Gap Reduction |
|------------|-------------------|---------------|
| Desktop (1440px) | Baseline | Baseline |
| Tablet (1024px) | -30% | -15% |
| Mobile (767px) | -40% | -30% |
| Small Mobile (375px) | -50% | -35% |

---

## Common Pitfalls to Avoid

1. **Image Breakout:** Don't let image span full viewport width on desktop (keep it within 50vw column)
2. **Mobile Text Centering:** Center the content block, but keep text left-aligned within
3. **Fixed Heights on Mobile:** Use vh units instead of fixed pixels for better adaptability
4. **Animation on Mobile:** Always disable animations below 1025px for performance
5. **Overflow Handling:** Add `overflow-y: auto` to mobile content area in case of long text

---

## Accessibility Considerations

1. Use semantic HTML (`<section>`, `<h2>`, etc.)
2. Ensure sufficient color contrast on all backgrounds
3. Respect `prefers-reduced-motion` for animations
4. Provide alt text for images
5. Maintain readable font sizes at all breakpoints

---

## Performance Optimizations

1. Use `transform` and `opacity` for animations (GPU-accelerated)
2. Implement lazy loading for images
3. Use Intersection Observer instead of scroll listeners
4. Add `will-change` sparingly (only on animating elements)
5. Consider responsive image srcsets for different screen sizes

---

## Example Usage

This pattern was successfully used in:
- Brand Story About Us section (brand-story-about-us)

Future sections with similar two-column layouts should reference this pattern for consistency.
