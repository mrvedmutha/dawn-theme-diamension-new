# Responsive Pattern: Centered Text Content Section

**Component Type**: Centered text content section / Brand statement block

**Use Cases**:
- Brand mission statements
- Key messaging blocks
- Quote displays
- Centered text announcements

**Examples**:
- `rich-text-centered-quote`
- `diamension-quote`

---

## Pattern Characteristics

### Layout Strategy
- Fixed or flexible height container
- Flexbox centering (vertical + horizontal)
- Container max-width constraint (1440px)
- Responsive content width (fixed → viewport-based)

### Typography Strategy
- Progressive scaling: ~20-50% reduction from desktop to mobile
- Line-height ratios maintain text density
- Text alignment: center (hardcoded)
- Single font weight throughout

### Responsive Width Strategy
- Desktop: Fixed max-width (optimal line length)
- Tablet: 80vw (breathing room)
- Mobile: 90vw (maximize space)
- Small Mobile: 95vw (edge-to-edge)

---

## Responsive Breakpoints Template

### Desktop (1440px)
```css
.custom-section-[name] {
  width: 100%;
  height: [fixed or auto];
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-section-[name]__container {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-section-[name]__text {
  max-width: [600-800px]; /* Optimal line length */
  font-size: [base-size];
  line-height: [1.1-1.3 ratio];
  text-align: center;
}
```

### Large Desktop (1441px+)
```css
@media (min-width: 1441px) {
  .custom-section-[name]__container {
    max-width: 1440px; /* Prevent ultra-wide stretch */
  }
}
```

### Tablet (1024px)
```css
@media (max-width: 1024px) {
  .custom-section-[name]__text {
    max-width: 80vw;
    font-size: [~80% of desktop]; /* 20% reduction */
    line-height: [maintain ratio];
  }
}
```

### Mobile (767px)
```css
@media (max-width: 767px) {
  .custom-section-[name]__text {
    max-width: 90vw;
    font-size: [~60% of desktop]; /* 40% reduction */
    line-height: [maintain ratio];
  }
}
```

### Small Mobile (375px)
```css
@media (max-width: 375px) {
  .custom-section-[name]__text {
    max-width: 95vw;
    font-size: [~50% of desktop]; /* 50% reduction */
    line-height: [maintain ratio];
  }
}
```

---

## Typography Scaling Examples

### Example 1: Large Text (40px base)
- Desktop: 40px/45px (1.125 ratio)
- Tablet: 32px/38px (1.1875 ratio) - 20% smaller
- Mobile: 24px/30px (1.25 ratio) - 40% smaller
- Small Mobile: 20px/26px (1.3 ratio) - 50% smaller

### Example 2: Medium Text (20px base)
- Desktop: 20px/28px (1.4 ratio)
- Tablet: 18px/26px (1.44 ratio) - 10% smaller
- Mobile: 16px/24px (1.5 ratio) - 20% smaller
- Small Mobile: 15px/22px (1.47 ratio) - 25% smaller

---

## Common Variations

### Fixed Height Version
```css
.custom-section-[name] {
  height: [fixed-px]; /* e.g., 605px */
}

@media (max-width: 1024px) {
  .custom-section-[name] {
    height: [same-fixed-px]; /* Maintain across breakpoints */
  }
}
```

### Flexible Height Version
```css
.custom-section-[name] {
  min-height: [min-px];
  padding: [vertical] 0;
}

@media (max-width: 1024px) {
  .custom-section-[name] {
    padding: [reduced-vertical] 0; /* ~25% reduction */
  }
}
```

---

## Schema Settings Pattern

```liquid
{
  "settings": [
    {
      "type": "textarea",
      "id": "text_content",
      "label": "Text Content",
      "default": "[Default text]",
      "info": "[Usage guidance]"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background Color",
      "default": "[hex-value]"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text Color",
      "default": "[hex-value]"
    }
  ]
}
```

---

## Markup Pattern

```liquid
<section
  class="custom-section-[name]"
  style="background-color: {{ section.settings.background_color }};"
>
  <div class="custom-section-[name]__container">
    <p
      class="custom-section-[name]__text"
      style="color: {{ section.settings.text_color }};"
    >
      {{ section.settings.text_content }}
    </p>
  </div>
</section>
```

---

## Key Principles

1. **Centering Strategy**: Flexbox with `align-items: center` + `justify-content: center`
2. **Container Constraint**: Max-width 1440px prevents ultra-wide stretch
3. **Width Progression**: Fixed → 80vw → 90vw → 95vw
4. **Typography Scaling**: 20-50% reduction from desktop to mobile
5. **Line-height Ratios**: Slightly increase on smaller screens for readability
6. **Text Alignment**: Always center (hardcoded, not customizable)
7. **Color Application**: Inline styles for schema customization
8. **No Padding**: Width-based spacing, not padding

---

## When to Use This Pattern

- Single centered text block
- No complex layout requirements
- Minimal schema customization
- Static display (no interactions)
- Brand messaging or quotes
- Mission statements or taglines

---

## Pattern Created From
- Section: `rich-text-centered-quote`
- Reference: `diamension-quote`
- Date: 2025-12-31
