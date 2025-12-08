# Developer Agent Context - Critical Rules

## START HERE - Asset Verification
**CRITICAL: Before writing any code, run:**
```sql
SELECT COUNT(*) FROM assets WHERE project_id = (SELECT id FROM projects WHERE section_name = '{section}') AND required = true AND provided = false;
```
If result > 0: HALT immediately and notify user.

## Code Generation Rules

### 1. Liquid Files
- **File path:** `sections/custom-section-{section}.liquid`
- **Namespace:** `.custom-section-{section}`
- **Schema:** Must include all settings from technical spec
- **Asset handling:** Use `section.settings.{asset}` only, never hardcode
- **Link CSS/JS:**
```liquid
{{ 'section-{section}.css' | asset_url | stylesheet_tag }}
<script src="{{ 'section-{section}.js' | asset_url }}" defer></script>
```

### 2. CSS Files
- **File path:** `assets/section-{section}.css`
- **Methodology:** Strict BEM - `.block__element--modifier`
- **Desktop-first:** Base styles at 1440px
- **Breakpoints (in order):**
  - Large Desktop: `@media (min-width: 1441px)`
  - Tablet: `@media (max-width: 1024px)`
  - Mobile: `@media (max-width: 767px)`
  - Small Mobile: `@media (max-width: 375px)`
- **Banned patterns:** `!important` (unless extreme case), direct core class modification
- **Core class override:** Always namespace: `.custom-section-{section} .page-width`

### 3. JavaScript Files
- **File path:** `assets/section-{section}.js`
- **Loading:** Always use `defer` attribute
- **Event listener:** Wrap in `DOMContentLoaded`
- **Error handling:** All logic in `try/catch`
- **console.log:** Only for debugging with `// TODO: debugging [reason]`
- **Global scope:** Use IIFE pattern
- **Variables:** camelCase - no single letters
- **Constants:** UPPERCASE_SNAKE
- **Functions:** verbFirstCamelCase
- **Event delegation:** For dynamic elements

### 4. Test Placeholder
Create minimal file: `tests/liquid/section-{section}/{section}.spec.js`
```javascript
import { test, expect } from '@playwright/test';
test.describe('Section: {Section}', () => {
  test('exists', async ({ page }) => {
    await page.goto('http://localhost:9292');
    await expect(page.locator('.custom-section-{section}')).toBeVisible();
  });
});
```

## Pre-Development Checklist (mandatory)
- [ ] All assets verified via state DB query (0 missing)
- [ ] Technical spec is complete and clear
- [ ] Design tokens documented
- [ ] File paths and naming confirmed

## Halt Conditions (do not proceed if any are true)
- ❌ Any required asset missing
- ❌ Technical spec incomplete
- ❌ Design tokens unclear
- ❌ File naming ambiguous

## Success Checklist (before marking complete)
- [ ] Liquid file created with schema
- [ ] CSS file created (desktop-first, BEM, all breakpoints)
- [ ] JS file created (if needed, with defer and error handling)
- [ ] Test placeholder created
- [ ] BEM naming validated (regex scan)
- [ ] Core files untouched
- [ ] State DB updated to 'testing' phase
