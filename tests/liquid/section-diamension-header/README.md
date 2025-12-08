# Diamension Header - Test Suite

Comprehensive Playwright test suite for the custom Diamension Header section.

## Test Coverage

### 1. Visual Regression Tests
- ✅ Desktop (1440px) - Transparent state
- ✅ Desktop (1440px) - Solid state after scroll
- ✅ Tablet (1024px) - Transparent state
- ✅ Mobile (375px) - Transparent state

### 2. Functional Tests

#### Header Structure
- ✅ All required elements display correctly
- ✅ Data attributes are properly set
- ✅ Both light and dark logos exist

#### Auto Mode Behavior
- ✅ Starts transparent at page top
- ✅ Hides when scrolling down past 820px threshold
- ✅ Shows solid header when scrolling up
- ✅ Becomes transparent when scrolled to top
- ✅ Shows correct logo based on scroll state

#### Transparent Mode
- ✅ Stays transparent regardless of scroll (requires manual config)

#### Solid Mode
- ✅ Stays solid regardless of scroll (requires manual config)

#### Search Overlay
- ✅ Opens on button click
- ✅ Closes on backdrop click
- ✅ Closes on ESC key
- ✅ Toggles search icon to close icon
- ✅ Focuses search input when opened
- ✅ Performs search with debouncing
- ✅ Restores header state after closing

#### Mobile Menu
- ✅ Opens on hamburger click
- ✅ Closes on close button click
- ✅ Closes when clicking a link
- ✅ Prevents body scrolling when open

#### Cart
- ✅ Displays cart icon
- ✅ Displays cart count when items in cart

#### Hover Effects
- ✅ Announcement bar becomes solid on hover
- ✅ Main header becomes solid on hover

### 3. Responsive Tests
- ✅ Desktop (1440px) - Navigation visible, hamburger hidden
- ✅ Tablet (1024px) - Layout adjusts properly
- ✅ Mobile (375px) - Hamburger visible, navigation hidden

### 4. JavaScript Behavior Tests
- ✅ DiamensionHeader class initializes
- ✅ DiamensionSearch class initializes
- ✅ Uses requestAnimationFrame for scroll handling
- ✅ Updates cart count dynamically

### 5. Console Error Checks
- ✅ No JavaScript errors on page load
- ✅ No errors when interacting with search
- ✅ No errors when scrolling

### 6. Accessibility Tests
- ✅ Proper ARIA labels on interactive elements
- ✅ Search form has proper role
- ✅ Logo has alt text

### 7. Performance Tests
- ✅ Header loads within 3 seconds
- ✅ Scroll performance is smooth

### 8. Code Standards Validation

#### BEM Naming
- ✅ Correct block naming (`.diamension-header`)
- ✅ Correct element naming (`.diamension-header__element`)
- ✅ Correct modifier naming (`.diamension-header--modifier`)
- ✅ Avoids descendant selectors
- ✅ Does not modify core Shopify classes
- ✅ Uses consistent naming convention

#### CSS Standards
- ✅ Minimal !important usage
- ✅ Desktop-first approach
- ✅ All required breakpoints present
- ✅ Smooth transitions for interactive elements
- ✅ Low specificity selectors
- ✅ Consistent spacing units

#### JavaScript Standards
- ✅ Uses DOMContentLoaded event listener
- ✅ Has try/catch error handling
- ✅ TODO comments on console.log statements
- ✅ Uses classes to avoid global scope pollution
- ✅ Event delegation for dynamic elements
- ✅ Meaningful variable names
- ✅ Avoids magic numbers
- ✅ Functions are small and focused
- ✅ Uses async/await for asynchronous operations
- ✅ Proper error handling for async operations

#### Liquid Template Standards
- ✅ Proper Liquid comments
- ✅ Schema definition included
- ✅ Proper section settings
- ✅ Data attributes for JavaScript hooks
- ✅ Proper asset loading
- ✅ Defer attribute on script tag
- ✅ Accessibility attributes
- ✅ Shopify image filters used properly

## Running Tests

### Prerequisites
```bash
# Install dependencies
npm install

# Ensure Shopify theme is running locally
shopify theme dev
# Should be running on http://localhost:9292
```

### Run All Tests
```bash
# Run all header tests
npx playwright test tests/liquid/section-diamension-header/

# Run with UI mode (recommended for debugging)
npx playwright test tests/liquid/section-diamension-header/ --ui

# Run in headed mode (see browser)
npx playwright test tests/liquid/section-diamension-header/ --headed
```

### Run Specific Test Suites
```bash
# Visual regression only
npx playwright test tests/liquid/section-diamension-header/diamension-header.spec.js -g "Visual Regression"

# Functional tests only
npx playwright test tests/liquid/section-diamension-header/diamension-header.spec.js -g "Functional"

# Code standards only
npx playwright test tests/liquid/section-diamension-header/code-standards.spec.js

# Responsive tests only
npx playwright test tests/liquid/section-diamension-header/diamension-header.spec.js -g "Responsive"
```

### Update Screenshots
```bash
# Update all screenshots (after design changes)
npx playwright test tests/liquid/section-diamension-header/diamension-header.spec.js --update-snapshots

# Update specific test screenshots
npx playwright test tests/liquid/section-diamension-header/diamension-header.spec.js -g "desktop - transparent" --update-snapshots
```

### Debug Mode
```bash
# Run in debug mode with Playwright Inspector
npx playwright test tests/liquid/section-diamension-header/diamension-header.spec.js --debug

# Debug specific test
npx playwright test tests/liquid/section-diamension-header/diamension-header.spec.js -g "opens search overlay" --debug
```

### Generate HTML Report
```bash
# Run tests and generate report
npx playwright test tests/liquid/section-diamension-header/

# View report
npx playwright show-report
```

## Test Configuration

Tests are configured to run against:
- **Base URL**: `http://localhost:9292`
- **Scroll Threshold**: `820px`
- **Viewports**:
  - Desktop: 1440x900
  - Tablet: 1024x768
  - Mobile: 375x667

## Testing Different Header Behaviors

### Auto Mode (Default)
No configuration needed. This is the default behavior.

### Transparent Mode
1. Go to Shopify Admin → Themes → Customize
2. Click on the header section
3. Set "Header Behavior" to "Always Transparent"
4. Save
5. Run tests with transparent mode enabled

### Solid Mode
1. Go to Shopify Admin → Themes → Customize
2. Click on the header section
3. Set "Header Behavior" to "Always Solid"
4. Save
5. Run tests with solid mode enabled

## Known Issues & Limitations

### Skipped Tests
Some tests are skipped by default because they require specific theme editor configuration:
- `Functional - Always Transparent Mode` - Requires header_behavior = 'transparent'
- `Functional - Always Solid Mode` - Requires header_behavior = 'solid'

To run these tests:
1. Configure the header behavior in theme editor
2. Remove `.skip` from the test
3. Run the specific test

### Screenshot Threshold
Visual regression tests use a threshold of `0.2` (20%) to account for:
- Font rendering differences across systems
- Anti-aliasing variations
- Minor browser rendering differences

Adjust threshold if needed in test file.

## Continuous Integration

### GitHub Actions Example
```yaml
name: Diamension Header Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run tests
        run: npx playwright test tests/liquid/section-diamension-header/
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

## Troubleshooting

### Tests Failing Due to Timeout
- Increase timeout in test file: `test.setTimeout(60000)`
- Check if Shopify theme dev server is running
- Ensure localhost:9292 is accessible

### Visual Regression Failures
- Review screenshot diffs in test results
- Update screenshots if design intentionally changed
- Check for font loading issues
- Verify GSAP library is loaded

### Search Tests Failing
- Ensure Shopify store has products
- Check network tab for API errors
- Verify search API endpoint is accessible

### Mobile Menu Tests Failing
- Check viewport size is correctly set
- Verify CSS media queries are working
- Ensure JavaScript is not blocked

## Success Criteria

All tests must pass for the header to be considered production-ready:

- ✅ All visual regression tests pass (within 0.2 threshold)
- ✅ All functional tests pass
- ✅ All responsive tests pass
- ✅ BEM naming validated
- ✅ CSS standards validated
- ✅ JavaScript standards validated
- ✅ No console errors
- ✅ Accessibility requirements met
- ✅ Performance benchmarks met

## Next Steps

After all tests pass:
1. Review test results and screenshots
2. Update state database with test results
3. Create git tag: `v1.0-diamension-header-testing-passed-[timestamp]`
4. Move to manual review phase
5. Deploy to staging environment
6. Perform final QA testing

## Contact

For questions or issues with the test suite, contact the development team.
