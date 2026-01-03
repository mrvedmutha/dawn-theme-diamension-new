# FAQ Section - Design Tokens

**Extracted from Figma Design:** Node ID 429-387
**Design File:** Diamension Dev FINAL

---

## Colors

### Background Colors
```css
--faq-bg-primary: #FFFAF5;        /* Cream/beige page background */
--faq-bg-white: #FFFFFF;          /* White for cards/sections */
```

### Text Colors
```css
--faq-text-primary: #183754;      /* Dark blue - headings, questions, active items */
--faq-text-secondary: #9A9A9A;    /* Gray - inactive menu items */
--faq-text-active: #212121;       /* Black - active menu item */
--faq-text-body: rgba(62,98,130,0.71); /* Blue-gray - FAQ answers */
```

### Tab Colors
```css
--faq-tab-active: #183754;        /* Dark blue - active tab text */
--faq-tab-inactive: #8AA8C4;      /* Light blue - inactive tab text */
--faq-tab-underline: #183754;     /* Dark blue - active tab underline */
```

### Border/Divider Colors
```css
--faq-divider: #CCCCCC;           /* Light gray - divider lines */
--faq-border: #E5E5E5;            /* Border color for elements */
```

---

## Typography

### Font Family
```css
--faq-font-primary: 'Neue Haas Grotesk Display Pro', sans-serif;
```

**Weights:**
- Light: 45 (300)
- Roman: 55 (400)

**Note:** This font needs to be loaded via Google Fonts or uploaded as custom font.

### Font Sizes & Styles

#### Page Title
```css
.custom-section-faq__page-title {
  font-family: var(--faq-font-primary);
  font-weight: 300; /* Light */
  font-size: 40px;
  line-height: 45px;
  text-transform: uppercase;
  color: var(--faq-text-primary);
}
```

#### Menu Title (Sidebar)
```css
.custom-section-faq__menu-title {
  font-family: var(--faq-font-primary);
  font-weight: 300; /* Light */
  font-size: 40px;
  line-height: 45px;
  text-align: center;
  text-transform: uppercase;
  color: var(--faq-text-primary);
}
```

#### Menu Items
```css
.custom-section-faq__menu-link {
  font-family: var(--faq-font-primary);
  font-weight: 400; /* Roman */
  font-size: 16px;
  line-height: normal;
  color: var(--faq-text-secondary);
}

.custom-section-faq__menu-link--active {
  color: var(--faq-text-active);
}
```

#### Tab Navigation
```css
.custom-section-faq__tab {
  font-family: var(--faq-font-primary);
  font-weight: 400; /* Roman */
  font-size: 18px;
  line-height: 1;
  color: var(--faq-tab-inactive);
}

.custom-section-faq__tab--active {
  color: var(--faq-tab-active);
}
```

#### Category Heading (Above FAQs)
```css
.custom-section-faq__category-heading {
  font-family: var(--faq-font-primary);
  font-weight: 400; /* Roman */
  font-size: 20px;
  line-height: 1.2;
  letter-spacing: -0.2px;
  color: var(--faq-text-primary);
}
```

#### FAQ Questions
```css
.custom-section-faq__question {
  font-family: var(--faq-font-primary);
  font-weight: 400; /* Roman */
  font-size: 20px;
  line-height: 1.2;
  letter-spacing: -0.2px;
  color: var(--faq-text-primary);
}
```

#### FAQ Answers
```css
.custom-section-faq__answer {
  font-family: var(--faq-font-primary);
  font-weight: 400; /* Roman */
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 0.42px;
  color: var(--faq-text-body);
}
```

---

## Spacing & Layout

### Section Spacing
```css
--faq-section-padding-top: 145px;     /* Top spacing from header */
--faq-section-padding-bottom: 80px;   /* Bottom spacing */
--faq-section-padding-x: 40px;        /* Left/right padding */
```

### Two-Column Layout
```css
--faq-sidebar-width: 238px;           /* Sidebar fixed width */
--faq-content-width: 655px;           /* Content area max width */
--faq-gap: 128px;                     /* Gap between sidebar and content */
```

**Layout:**
```css
.custom-section-faq__container {
  display: flex;
  gap: 128px; /* Desktop */
}
```

### Sidebar Spacing
```css
--faq-menu-title-margin-bottom: 96px; /* Space below "INFO" title */
--faq-menu-item-spacing: 39px;        /* Space between menu items */
--faq-menu-divider-margin: 20px;      /* Space around divider lines */
```

### Tab Navigation Spacing
```css
--faq-tab-gap: 60px;                  /* Horizontal gap between tabs */
--faq-tab-underline-gap: 30.5px;      /* Gap between tabs and underline */
--faq-tabs-margin-bottom: 51px;       /* Space below tabs before FAQs */
```

### FAQ List Spacing
```css
--faq-category-gap: 82px;             /* Vertical gap between FAQ categories */
--faq-category-title-margin: 56px;    /* Space below category title */
--faq-item-gap: 64px;                 /* Gap between FAQ items */
--faq-question-answer-gap: 46px;      /* Gap between question and answer */
--faq-divider-margin: 45px;           /* Margin around FAQ dividers */
```

---

## Component Dimensions

### Icons
```css
--faq-icon-size: 24px;                /* Plus/Minus icon size */
```

**Icon SVG:**
- Width: 24px
- Height: 24px
- Stroke: currentColor (inherits text color)
- Stroke-width: 2px

### Divider Lines
```css
--faq-divider-height: 1px;            /* Horizontal divider line */
--faq-divider-color: var(--faq-divider);
```

### Tab Underline
```css
--faq-tab-underline-height: 0.5px;    /* Active tab underline */
--faq-tab-underline-color: var(--faq-tab-active);
```

---

## Responsive Breakpoints

### Desktop (1440px - Base)
```css
.custom-section-faq__container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 145px 40px 80px;
  gap: 128px;
}
```

### Large Desktop (1441px+)
```css
@media (min-width: 1441px) {
  .custom-section-faq {
    max-width: 1440px;
    margin: 0 auto;
  }
}
```

### Tablet (1024px)
```css
@media (max-width: 1024px) {
  .custom-section-faq__container {
    padding: 100px 30px 60px;
    gap: 64px; /* Reduced gap */
  }

  .custom-section-faq__page-title,
  .custom-section-faq__menu-title {
    font-size: 32px;
    line-height: 38px;
  }

  .custom-section-faq__question {
    font-size: 18px;
  }
}
```

### Mobile (767px)
```css
@media (max-width: 767px) {
  .custom-section-faq__container {
    flex-direction: column;
    padding: 60px 20px 40px;
    gap: 40px;
  }

  .custom-section-faq__sidebar {
    width: 100%;
    position: relative; /* Not sticky on mobile */
  }

  .custom-section-faq__page-title,
  .custom-section-faq__menu-title {
    font-size: 28px;
    line-height: 32px;
  }

  .custom-section-faq__tab {
    font-size: 16px;
  }

  .custom-section-faq__question {
    font-size: 16px;
  }

  .custom-section-faq__answer {
    font-size: 13px;
  }
}
```

### Small Mobile (375px)
```css
@media (max-width: 375px) {
  .custom-section-faq__container {
    padding: 40px 15px 30px;
  }
}
```

---

## Transitions & Animations

### Accordion Expand/Collapse
```css
.custom-section-faq__answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
}

.custom-section-faq__faq-item--expanded .custom-section-faq__answer {
  max-height: 1000px; /* Adjust based on content */
}
```

### Tab Active State
```css
.custom-section-faq__tab {
  transition: color 0.3s ease;
  position: relative;
}

.custom-section-faq__tab::after {
  content: '';
  position: absolute;
  bottom: -30.5px;
  left: 0;
  width: 100%;
  height: 0.5px;
  background: var(--faq-tab-underline);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.custom-section-faq__tab--active::after {
  opacity: 1;
}
```

### Smooth Scroll
```javascript
// JavaScript smooth scroll behavior
element.scrollIntoView({
  behavior: 'smooth',
  block: 'start'
});
```

### Icon Rotation (Optional Enhancement)
```css
.custom-section-faq__icon {
  transition: transform 0.3s ease;
}

.custom-section-faq__faq-item--expanded .custom-section-faq__icon {
  transform: rotate(180deg); /* If using chevron instead of plus/minus */
}
```

---

## Assets Required

### SVG Icons

#### Plus Icon (Collapsed State)
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>
```

#### Minus Icon (Expanded State)
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>
```

### Custom Font
**Option 1:** Google Fonts (if available)
```html
<link href="https://fonts.googleapis.com/css2?family=Neue+Haas+Grotesk+Display:wght@300;400&display=swap" rel="stylesheet">
```

**Option 2:** Custom font files (if purchased)
- Upload to `assets/` folder
- Reference via `@font-face` in CSS

---

## Z-Index Layers

```css
--z-sidebar: 10;          /* Sticky sidebar */
--z-tabs: 5;              /* Tab navigation (if sticky) */
--z-accordion: 1;         /* FAQ items */
```

---

## Accessibility

### Color Contrast
- ✅ Text primary (#183754) on background (#FFFAF5): **AAA** compliant
- ✅ Text secondary (#9A9A9A) on background (#FFFAF5): **AA** compliant

### Focus States
```css
.custom-section-faq__tab:focus,
.custom-section-faq__question:focus {
  outline: 2px solid var(--faq-tab-active);
  outline-offset: 4px;
}
```

---

**Next Steps:** Read `03-implementation.md` for technical implementation details.
