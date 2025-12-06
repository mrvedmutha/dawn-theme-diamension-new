# Testing with Playwright

**Playwright-only testing. Add Vitest only if complex JavaScript utilities exist.**

---

## Testing Strategy

**Playwright tests cover:**
- Visual regression (compare with Figma)
- Responsive design (all breakpoints)
- User interactions
- Shopify dynamic content
- JavaScript behavior

**Add Vitest only if:**
- Complex utility functions exist
- Business logic calculations
- Data transformations

---

## Folder Structure

```
tests/
├── liquid/
│   ├── section-header/
│   │   └── header.spec.js
│   ├── section-product-card/
│   │   └── product-card.spec.js
│   └── snippet-testimonial/
│       └── testimonial.spec.js
│
├── screenshots/
│   └── figma/                    # Figma screenshots as baseline
│       ├── header-desktop.png
│       ├── header-tablet.png
│       └── header-mobile.png
│
└── config/
    └── playwright.config.js
```

---

## Playwright Config

**File:** `tests/config/playwright.config.js`

```javascript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '../liquid',
  use: {
    baseURL: 'http://localhost:9292', // Shopify CLI dev server
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
});
```

---

## Test Template

**Use:** `docs/templates/playwright-test.js`

```javascript
import { test, expect } from '@playwright/test';

test.describe('Section Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:9292');
  });

  // Visual Regression Tests
  test('visual - desktop matches Figma', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('.custom-section-name'))
      .toHaveScreenshot('section-desktop.png', {
        threshold: 0.2,
      });
  });

  test('visual - tablet matches Figma', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(page.locator('.custom-section-name'))
      .toHaveScreenshot('section-tablet.png');
  });

  test('visual - mobile matches Figma', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.custom-section-name'))
      .toHaveScreenshot('section-mobile.png');
  });

  // Functional Tests
  test('displays content correctly', async ({ page }) => {
    await expect(page.locator('.custom-section-name__title')).toBeVisible();
  });
});
```

---

## Running Tests

```bash
# Run all tests
npm test

# Run specific section
npx playwright test tests/liquid/section-header

# UI mode (interactive)
npx playwright test --ui

# Update screenshots
npx playwright test --update-snapshots

# Debug mode
npx playwright test --debug
```

---

## Test Coverage Checklist

**Every section MUST have:**

- [ ] Visual regression tests (desktop, tablet, mobile)
- [ ] Functional tests (all interactions work)
- [ ] Responsive tests (layout changes correctly)
- [ ] Dynamic content tests (if using Shopify data)
- [ ] All tests pass before commit
