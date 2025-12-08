# Diamension Header - Test Execution Checklist

Use this checklist when running tests to ensure all steps are completed.

## Pre-Test Setup

- [ ] Shopify dev server is running (`shopify theme dev`)
- [ ] Server is accessible at `http://localhost:9292`
- [ ] Node modules are installed (`npm install`)
- [ ] Playwright browsers are installed (`npx playwright install`)
- [ ] Store has products for search testing
- [ ] Git working directory is clean (optional but recommended)

## Test Execution

### 1. Visual Regression Tests
- [ ] Run: `npx playwright test tests/liquid/section-diamension-header/ -g "Visual Regression"`
- [ ] All 4 tests pass
- [ ] Screenshots match Figma designs (within 0.2 threshold)
- [ ] If failed: Review diffs in `test-results/`
- [ ] If design changed: Update with `--update-snapshots`

### 2. Functional Tests - Header Structure
- [ ] Run: `npx playwright test tests/liquid/section-diamension-header/ -g "Header Structure"`
- [ ] All 3 tests pass
- [ ] All elements display correctly
- [ ] Data attributes are set properly

### 3. Functional Tests - Auto Mode Behavior
- [ ] Run: `npx playwright test tests/liquid/section-diamension-header/ -g "Auto Mode"`
- [ ] All 5 tests pass
- [ ] Header starts transparent
- [ ] Hides on scroll down past 820px
- [ ] Shows solid on scroll up
- [ ] Returns to transparent at top

### 4. Functional Tests - Search Overlay
- [ ] Run: `npx playwright test tests/liquid/section-diamension-header/ -g "Search Overlay"`
- [ ] All 7 tests pass
- [ ] Opens/closes correctly
- [ ] Search functionality works
- [ ] Header state restores properly

### 5. Functional Tests - Mobile Menu
- [ ] Run: `npx playwright test tests/liquid/section-diamension-header/ -g "Mobile Menu"`
- [ ] All 3 tests pass
- [ ] Opens/closes correctly
- [ ] Body scroll is prevented when open

### 6. Functional Tests - Cart
- [ ] Run: `npx playwright test tests/liquid/section-diamension-header/ -g "Cart"`
- [ ] All 2 tests pass
- [ ] Cart icon displays
- [ ] Cart count updates

### 7. Functional Tests - Hover Effects
- [ ] Run: `npx playwright test tests/liquid/section-diamension-header/ -g "Hover Effects"`
- [ ] All 2 tests pass
- [ ] Announcement bar hover works
- [ ] Main header hover works

### 8. Responsive Tests
- [ ] Run: `npx playwright test tests/liquid/section-diamension-header/ -g "Responsive"`
- [ ] All 7 tests pass
- [ ] Desktop layout correct (1440px)
- [ ] Tablet layout correct (1024px)
- [ ] Mobile layout correct (375px)

### 9. JavaScript Behavior Tests
- [ ] Run: `npx playwright test tests/liquid/section-diamension-header/ -g "JavaScript Behavior"`
- [ ] All 4 tests pass
- [ ] Classes initialize properly
- [ ] Scroll handling uses requestAnimationFrame
- [ ] Cart count updates dynamically

### 10. Console Error Checks
- [ ] Run: `npx playwright test tests/liquid/section-diamension-header/ -g "Console Errors"`
- [ ] All 3 tests pass
- [ ] No errors on page load
- [ ] No errors during search interaction
- [ ] No errors during scrolling

### 11. Accessibility Tests
- [ ] Run: `npx playwright test tests/liquid/section-diamension-header/ -g "Accessibility"`
- [ ] All 3 tests pass
- [ ] ARIA labels present
- [ ] Search form has proper role
- [ ] Logo has alt text

### 12. Performance Tests
- [ ] Run: `npx playwright test tests/liquid/section-diamension-header/ -g "Performance"`
- [ ] All 2 tests pass
- [ ] Header loads within 3 seconds
- [ ] Scroll performance is smooth

### 13. Code Standards - BEM Naming
- [ ] Run: `npx playwright test tests/liquid/section-diamension-header/code-standards.spec.js -g "BEM Naming"`
- [ ] All 6 tests pass
- [ ] Block naming correct
- [ ] Element naming correct
- [ ] Modifier naming correct
- [ ] No descendant selectors
- [ ] No core class modifications

### 14. Code Standards - CSS
- [ ] Run: `npx playwright test tests/liquid/section-diamension-header/code-standards.spec.js -g "CSS Standards"`
- [ ] All 7 tests pass
- [ ] Minimal !important usage
- [ ] Desktop-first approach
- [ ] All breakpoints present
- [ ] Smooth transitions
- [ ] Low specificity

### 15. Code Standards - JavaScript
- [ ] Run: `npx playwright test tests/liquid/section-diamension-header/code-standards.spec.js -g "JavaScript Standards"`
- [ ] All 10 tests pass
- [ ] DOMContentLoaded used
- [ ] Try/catch error handling
- [ ] TODO comments on console.logs
- [ ] No global scope pollution
- [ ] Meaningful variable names

### 16. Code Standards - Liquid Template
- [ ] Run: `npx playwright test tests/liquid/section-diamension-header/code-standards.spec.js -g "Liquid Template"`
- [ ] All 8 tests pass
- [ ] Proper Liquid comments
- [ ] Schema definition present
- [ ] Data attributes used
- [ ] Defer attribute on script

## Post-Test Verification

### Test Results
- [ ] All 80+ tests passed
- [ ] Pass rate: 100%
- [ ] No critical errors in console
- [ ] HTML report generated

### Visual Review
- [ ] Review all screenshots in `test-results/`
- [ ] Compare with Figma designs
- [ ] Verify all states captured correctly
- [ ] Check for any visual regressions

### Code Review
- [ ] BEM naming conventions followed
- [ ] CSS standards met
- [ ] JavaScript standards met
- [ ] Liquid template standards met

### Documentation
- [ ] Test results documented
- [ ] Any issues logged
- [ ] Screenshots archived
- [ ] Report generated

## State Database Update

If all tests pass:

```sql
INSERT INTO test_results (
  project_id, 
  test_file, 
  visual_tests_passed, 
  functional_tests_passed,
  css_standards_passed, 
  js_standards_passed, 
  result,
  test_date
) VALUES (
  (SELECT id FROM projects WHERE section_name = 'diamension-header'),
  'tests/liquid/section-diamension-header/diamension-header.spec.js',
  true, 
  true, 
  true, 
  true, 
  'passed',
  CURRENT_TIMESTAMP
);

UPDATE projects SET 
  current_phase = 'manual-review',
  status = 'passed',
  git_tag = 'v1.0-diamension-header-testing-passed-' || strftime('%Y%m%dT%H%M%SZ'),
  updated_at = CURRENT_TIMESTAMP
WHERE section_name = 'diamension-header';
```

- [ ] Test results inserted into database
- [ ] Project status updated to 'passed'
- [ ] Current phase updated to 'manual-review'
- [ ] Git tag created

## Git Operations

- [ ] Create git tag: `git tag v1.0-diamension-header-testing-passed-[timestamp]`
- [ ] Push tag: `git push origin v1.0-diamension-header-testing-passed-[timestamp]`
- [ ] Commit test results (if needed)

## Next Steps

- [ ] Schedule manual review session
- [ ] Prepare demo for stakeholders
- [ ] Plan staging deployment
- [ ] Update project documentation
- [ ] Notify team of test completion

## If Tests Fail

### Immediate Actions
- [ ] Review failed test output
- [ ] Check browser console for errors
- [ ] Verify Shopify dev server is running
- [ ] Check if code changes were made

### Investigation
- [ ] Identify root cause of failure
- [ ] Determine if it's a test issue or code issue
- [ ] Check if environment is set up correctly
- [ ] Review recent code changes

### Resolution
- [ ] Fix code issues
- [ ] Update tests if needed
- [ ] Re-run failed tests
- [ ] Verify fix doesn't break other tests

### Documentation
- [ ] Create issue file with error details
- [ ] Update state database with failure status
- [ ] Create git tag with `-testing-failed` suffix
- [ ] Notify team of failure

```sql
-- If tests fail
INSERT INTO test_results (
  project_id, 
  test_file, 
  result, 
  screenshot_diffs, 
  console_errors,
  test_date
) VALUES (
  (SELECT id FROM projects WHERE section_name = 'diamension-header'),
  'tests/liquid/section-diamension-header/diamension-header.spec.js',
  'failed',
  '["path/to/diff1.png", "path/to/diff2.png"]',
  '["Error message 1", "Error message 2"]',
  CURRENT_TIMESTAMP
);

UPDATE projects SET 
  status = 'failed',
  git_tag = 'v1.0-diamension-header-testing-failed-' || strftime('%Y%m%dT%H%M%SZ'),
  updated_at = CURRENT_TIMESTAMP
WHERE section_name = 'diamension-header';
```

- [ ] Failure logged in database
- [ ] Issue file created
- [ ] Team notified
- [ ] Rollback plan prepared

## Sign-Off

**Tester Name**: ___________________________

**Date**: ___________________________

**Test Run Duration**: ___________________________

**Overall Result**: [ ] PASS  [ ] FAIL

**Notes**:
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

**Approved for Manual Review**: [ ] YES  [ ] NO

**Signature**: ___________________________

---

## Quick Commands Reference

```bash
# Run all tests
./tests/liquid/section-diamension-header/run-tests.sh

# Run specific category
npx playwright test tests/liquid/section-diamension-header/ -g "[CATEGORY]"

# Debug mode
npx playwright test tests/liquid/section-diamension-header/ --debug

# Update screenshots
npx playwright test tests/liquid/section-diamension-header/ --update-snapshots

# View report
npx playwright show-report
```

---

**Last Updated**: December 8, 2025  
**Version**: 1.0
