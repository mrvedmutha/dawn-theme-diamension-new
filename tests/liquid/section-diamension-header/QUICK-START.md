# Diamension Header Tests - Quick Start Guide

## Prerequisites

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Start Shopify dev server
shopify theme dev
# Server should be running on http://localhost:9292
```

## Run All Tests (Recommended)

```bash
# Option 1: Use the test runner script (recommended)
./tests/liquid/section-diamension-header/run-tests.sh

# Option 2: Use Playwright directly
npx playwright test tests/liquid/section-diamension-header/
```

## Run Specific Test Categories

```bash
# Visual regression tests only
npx playwright test tests/liquid/section-diamension-header/ -g "Visual Regression"

# Functional tests only
npx playwright test tests/liquid/section-diamension-header/ -g "Functional"

# Code standards only
npx playwright test tests/liquid/section-diamension-header/code-standards.spec.js

# Responsive tests only
npx playwright test tests/liquid/section-diamension-header/ -g "Responsive"

# Search overlay tests only
npx playwright test tests/liquid/section-diamension-header/ -g "Search Overlay"

# Mobile menu tests only
npx playwright test tests/liquid/section-diamension-header/ -g "Mobile Menu"
```

## Debug Mode

```bash
# Run with Playwright Inspector (step through tests)
npx playwright test tests/liquid/section-diamension-header/ --debug

# Run with UI mode (visual test runner)
npx playwright test tests/liquid/section-diamension-header/ --ui

# Run in headed mode (see browser)
npx playwright test tests/liquid/section-diamension-header/ --headed
```

## Update Screenshots

```bash
# Update all screenshots (after design changes)
npx playwright test tests/liquid/section-diamension-header/ --update-snapshots

# Update specific test screenshots
npx playwright test tests/liquid/section-diamension-header/ -g "desktop - transparent" --update-snapshots
```

## View Test Report

```bash
# Generate and view HTML report
npx playwright show-report
```

## Expected Results

### ✅ All Tests Pass
```
Total Test Suites: 16
Passed: 16
Failed: 0
Pass Rate: 100%

✓ ALL TESTS PASSED
The Diamension Header is ready for manual review!
```

### ❌ Tests Fail
```
Total Test Suites: 16
Passed: 14
Failed: 2
Pass Rate: 87%

✗ TESTS FAILED
2 test suite(s) failed.

Next Steps:
1. Review failed test reports
2. Fix issues in code
3. Re-run tests
```

## Common Commands

```bash
# Run tests and show results in terminal
npx playwright test tests/liquid/section-diamension-header/ --reporter=list

# Run tests with verbose output
npx playwright test tests/liquid/section-diamension-header/ --reporter=line

# Run specific test file
npx playwright test tests/liquid/section-diamension-header/diamension-header.spec.js

# Run specific test by name
npx playwright test tests/liquid/section-diamension-header/ -g "opens search overlay"

# Run tests in parallel (faster)
npx playwright test tests/liquid/section-diamension-header/ --workers=4

# Run tests in a specific browser
npx playwright test tests/liquid/section-diamension-header/ --project=chromium
npx playwright test tests/liquid/section-diamension-header/ --project=firefox
npx playwright test tests/liquid/section-diamension-header/ --project=webkit
```

## Troubleshooting

### Tests Won't Run
```bash
# Check if Shopify dev server is running
curl http://localhost:9292

# If not running, start it
shopify theme dev
```

### Tests Timeout
```bash
# Increase timeout (add to test file)
test.setTimeout(60000); // 60 seconds
```

### Visual Tests Fail
```bash
# View screenshot diffs
open test-results/

# Update screenshots if design changed
npx playwright test tests/liquid/section-diamension-header/ --update-snapshots
```

### Need to Install Playwright Browsers
```bash
npx playwright install
```

## Test File Locations

```
tests/liquid/section-diamension-header/
├── diamension-header.spec.js    # Main functional tests
├── code-standards.spec.js       # Code quality tests
├── README.md                    # Full documentation
├── TEST-SUMMARY.md              # Test overview
├── QUICK-START.md               # This file
└── run-tests.sh                 # Test runner script
```

## Success Criteria

All tests must pass:
- ✅ Visual regression (4 tests)
- ✅ Functional tests (27 tests)
- ✅ Responsive tests (7 tests)
- ✅ JavaScript behavior (4 tests)
- ✅ Console errors (3 tests)
- ✅ Accessibility (3 tests)
- ✅ Performance (2 tests)
- ✅ Code standards (35 tests)

**Total: 80+ tests**

## Next Steps After Tests Pass

1. Review test results
2. Update state database
3. Create git tag: `v1.0-diamension-header-testing-passed-[timestamp]`
4. Move to manual review phase

## Need Help?

- Full documentation: `README.md`
- Test summary: `TEST-SUMMARY.md`
- Playwright docs: https://playwright.dev
- Contact development team

---

**Quick Tip**: Run `./tests/liquid/section-diamension-header/run-tests.sh` for the best experience with colored output and detailed reporting!
