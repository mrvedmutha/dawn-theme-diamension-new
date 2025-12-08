# Tester Agent Context - Testing Standards

## Core Testing Mission
Generate comprehensive Playwright tests and validate code meets ALL standards. **Fail fast** if anything is wrong.

## Test Coverage Requirements

### 1. Visual Regression Tests (3 mandatory)
- **Desktop (1440x900):** Compare to `figma-desktop.png`
- **Tablet (1024x768):** Compare to `figma-tablet.png`  
- **Mobile (375x667):** Compare to `figma-mobile.png`
- **Threshold:** 0.2 (20% pixel difference allowed)
- **Screenshots:** Save to `tests/screenshots/${section}/`

### 2. Functional Tests
- All clickable elements work (buttons, links)
- All hover states trigger
- Form submissions work
- Mobile menu toggles
- Any dynamic content loads
- Section settings in theme editor work

### 3. Responsive Tests
Verify layout changes correctly at:
- 1441px+ (large desktop - centered)
- 1440px (desktop - base)
- 1024px (tablet - adjustments)
- 767px (mobile - layout change)
- 375px (small mobile - fine-tuning)

### 4. JavaScript Behavior Tests
- Events fire correctly (click, hover, scroll)
- No console errors
- API calls succeed (cart, product)
- State changes work (menu open/close)
- Animations play smoothly

### 5. Shopify Dynamic Content
- Products render correctly
- Collections display
- Prices format properly
- Images load
- Metafields accessible

## Code Standards Validation

### BEM Naming Checks (regex)
**Scan Liquid, CSS, JS for violations:**
- ❌ Descendant selectors: `\..*\..*`
- ❌ Direct core class modification: `^\.page-width\s*{`
- ✅Must match pattern: `^\.custom-section-\w+(__\w+|--\w+)*$`

### CSS Standards Checks
- ❌ `!important` usage (unless overriding inline styles)
- ❌ Direct core class modification (`.page-width`, `.rte`)
- ✅ All breakpoints present in order (1441px+, 1024px, 767px, 375px)
- ✅ BEM naming consistent
- ✅ Transitions use `transition: property duration ease;`
- ✅ Desktop-first approach

### JavaScript Standards Checks
- ✅ `defer` attribute present on script tag
- ✅ `DOMContentLoaded` event listener wraps logic
- ✅ Try/catch around all logic
- ✅ `// TODO: debugging [reason]` prefix on console.log
- ✅ No global variables (IIFE or module pattern)
- ✅ Event delegation for dynamic elements: `e.target.matches('.class')`
- ✅ Meaningful variable names (no single letters)

## Test File Template Structure
```javascript
tests/liquid/section-${section}/${section}.spec.js

1. Import and setup (beforeEach)
2. Visual regression tests (3 breakpoints)
3. Functional tests (all interactions)
4. Responsive tests (4 breakpoints)
5. Dynamic content tests (if applicable)
6. JavaScript behavior tests
7. Console error test
```

## Execution Commands
```bash
# Execute
npx playwright test tests/liquid/section-${section}/${section}.spec.js

# Update screenshots (if design intentionally changed)
npx playwright test tests/liquid/section-${section}/${section}.spec.js --update-snapshots

# Debug mode
npx playwright test tests/liquid/section-${section}/${section}.spec.js --debug

# UI mode
npx playwright test tests/liquid/section-${section}/${section}.spec.js --ui
```

## State Database Updates

### On Success (all tests pass)
```sql
INSERT INTO test_results (project_id, test_file, visual_tests_passed, functional_tests_passed, css_standards_passed, js_standards_passed, result)
VALUES (1, 'tests/liquid/section-header/header.spec.js', true, true, true, true, 'passed');

UPDATE projects SET current_phase = 'manual-review', status = 'passed' WHERE section_name = 'header';
```

### On Failure (any test fails)
```sql
INSERT INTO test_results (project_id, test_file, result, screenshot_diffs, console_errors)
VALUES (1, 'tests/liquid/section-header/header.spec.js', 'failed', '["...diff.png"]', '["TypeError:..."]');

UPDATE projects SET status = 'failed' WHERE section_name = 'header';

CREATE FILE: issues/header-testing-failed-{timestamp}.md
```

## Halt Conditions (stop immediately if any occur)
- ❌ Any visual regression test fails (beyond threshold)
- ❌ Functional test fails (element not visible, clickable)
- ❌ BEM naming violations found
- ❌ CSS standards violations (!important, core modifications)
- ❌ JavaScript lacks error handling
- ❌ Console errors detected

## Success Checklist (all must be true)
- [ ] All visual regression tests pass
- [ ] All functional tests pass
- [ ] All responsive tests pass
- [ ] BEM naming validated (0 violations)
- [ ] CSS standards validated (0 violations)
- [ ] JavaScript standards validated (0 violations)
- [ ] No console errors
- [ ] State DB updated to 'manual-review' phase
