# Quick Reference

**Cheat sheet for common tasks and standards.**

---

## DO ✓

- ✓ Extract Figma design first
- ✓ Collect ALL assets before coding
- ✓ Build directly in Liquid (no prototype)
- ✓ Write tests with Playwright
- ✓ Use BEM methodology
- ✓ Create separate CSS/JS files
- ✓ Use custom naming (`custom-section-*`)
- ✓ Test all breakpoints (1441px+, 1440px, 1024px, 767px, 375px)
- ✓ Run tests before commit
- ✓ Test on unpublished theme first
- ✓ Use section settings for assets
- ✓ Handle errors gracefully

---

## DON'T ✗

- ✗ Start coding without assets
- ✗ Touch core theme files
- ✗ Use core class names directly
- ✗ Write CSS in Liquid (unless necessary)
- ✗ Skip writing tests
- ✗ Commit without running tests
- ✗ Push to live without testing
- ✗ Stretch elements beyond 1440px
- ✗ Use inline styles
- ✗ Use console.log without TODO
- ✗ Hardcode asset paths
- ✗ Use magic numbers

---

## File Naming

| Type | Pattern | Example |
|------|---------|---------|
| Section | `custom-section-[name].liquid` | `custom-section-header.liquid` |
| Snippet | `custom-snippet-[name].liquid` | `custom-snippet-product-card.liquid` |
| CSS | `section-[name].css` | `section-header.css` |
| JS | `section-[name].js` | `section-header.js` |
| Test | `[name].spec.js` | `header.spec.js` |

---

## BEM Classes

```css
.custom-section-header                      /* Block */
.custom-section-header__logo                /* Element */
.custom-section-header--sticky              /* Modifier */
.custom-section-header__nav-item--active    /* Element + Modifier */
```

---

## Breakpoints

```css
/* Base: 1440px Desktop */
.element { }

/* Large Desktop: 1441px+ */
@media (min-width: 1441px) {
  .element { max-width: 1440px; margin: 0 auto; }
}

/* Tablet: 1024px */
@media (max-width: 1024px) {
  .element { }
}

/* Mobile: 767px */
@media (max-width: 767px) {
  .element { }
}

/* Small Mobile: 375px */
@media (max-width: 375px) {
  .element { }
}
```

---

## Common Liquid Patterns

### Image Picker
```liquid
{% schema %}
{
  "settings": [
    {
      "type": "image_picker",
      "id": "image",
      "label": "Image"
    }
  ]
}
{% endschema %}

<img src="{{ section.settings.image | image_url: width: 1920 }}">
```

### Video URL
```liquid
{% schema %}
{
  "settings": [
    {
      "type": "video_url",
      "id": "video",
      "label": "Video"
    }
  ]
}
{% endschema %}

{{ section.settings.video | video_tag }}
```

### Text
```liquid
{% schema %}
{
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading"
    }
  ]
}
{% endschema %}

<h2>{{ section.settings.heading }}</h2>
```

---

## Common JavaScript Patterns

### Fetch Product
```javascript
const fetchProduct = async (id) => {
  try {
    const response = await fetch(`/products/${id}.js`);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
```

### Add to Cart
```javascript
const addToCart = async (variantId, quantity = 1) => {
  const response = await fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: variantId, quantity }),
  });
  return await response.json();
};
```

### Toggle Menu
```javascript
const toggleMenu = () => {
  const menu = document.querySelector('.mobile-menu');
  menu.classList.toggle('is-active');
};
```

---

## Testing Commands

```bash
# Run all tests
npm test

# Run specific section
npx playwright test tests/liquid/section-header

# UI mode
npx playwright test --ui

# Update screenshots
npx playwright test --update-snapshots

# Debug
npx playwright test --debug
```

---

## Git Commands

```bash
# Status
git status

# Add files
git add .

# Commit
git commit -m "[Feature] Add header section"

# Push
git push origin main

# View log
git log --oneline
```

---

## Shopify CLI Commands

```bash
# Start dev server
shopify theme dev

# List themes
shopify theme list

# Push to unpublished
shopify theme push --unpublished

# Push to specific theme
shopify theme push --theme [theme-id]

# Pull theme
shopify theme pull --theme [theme-id]
```

---

## Workflow Summary

1. **Extract Figma** → Get design + screenshots
2. **Collect Assets** → Request all assets from user
3. **Build Liquid** → Create .liquid + CSS + JS
4. **Test Locally** → `shopify theme dev`
5. **Write Tests** → Playwright tests
6. **Run Tests** → `npm test`
7. **Git Commit** → `git commit -m "[Feature] ..."`
8. **Deploy Unpublished** → `shopify theme push --unpublished`
9. **Test Live** → Manual testing
10. **Deploy Live** → `shopify theme push`

---

## Section Schema Template

```liquid
{% schema %}
{
  "name": "Section Name",
  "settings": [
    {
      "type": "image_picker",
      "id": "image",
      "label": "Image"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Default Heading"
    },
    {
      "type": "richtext",
      "id": "description",
      "label": "Description"
    },
    {
      "type": "url",
      "id": "link",
      "label": "Link"
    },
    {
      "type": "checkbox",
      "id": "show_feature",
      "label": "Show Feature",
      "default": true
    }
  ],
  "presets": [
    {
      "name": "Section Name"
    }
  ]
}
{% endschema %}
```

---

## Test Template

```javascript
import { test, expect } from '@playwright/test';

test.describe('Section Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:9292');
  });

  test('visual - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('.custom-section-name'))
      .toHaveScreenshot('section-desktop.png');
  });

  test('displays content', async ({ page }) => {
    await expect(page.locator('.custom-section-name__title')).toBeVisible();
  });
});
```

---

## Common Filters

```liquid
<!-- Price -->
{{ product.price | money }}

<!-- Image URL -->
{{ image | image_url: width: 600 }}

<!-- Escape -->
{{ text | escape }}

<!-- Truncate -->
{{ text | truncate: 150 }}

<!-- Capitalize -->
{{ text | capitalize }}

<!-- Default -->
{{ setting | default: "Default Value" }}
```

---

## Checklist Before Commit

- [ ] All tests pass (`npm test`)
- [ ] BEM methodology used
- [ ] File naming correct
- [ ] No core files modified
- [ ] No console.log without TODO
- [ ] Responsive on all breakpoints
- [ ] Works in theme editor
- [ ] Clear git commit message
