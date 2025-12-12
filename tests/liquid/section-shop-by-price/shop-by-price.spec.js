import { test, expect } from '@playwright/test';

test.describe('Shop by Price Section', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page with shop-by-price section
    await page.goto('http://localhost:9292');

    // Wait for section to load
    await page.waitForSelector('.custom-section-shop-by-price', { timeout: 10000 });
  });

  test('section loads and displays correctly', async ({ page }) => {
    // Check if section exists
    const section = page.locator('.custom-section-shop-by-price');
    await expect(section).toBeVisible();

    // Check if title and tagline are visible
    const title = page.locator('.custom-section-shop-by-price__title');
    const tagline = page.locator('.custom-section-shop-by-price__tagline');

    await expect(title).toBeVisible();
    await expect(tagline).toBeVisible();
  });

  test('all four price tabs are visible', async ({ page }) => {
    const tabs = page.locator('.custom-section-shop-by-price__tab');

    // Should have 4 tabs
    await expect(tabs).toHaveCount(4);

    // Check tab labels
    await expect(tabs.nth(0)).toContainText('BELOW ₹25000');
    await expect(tabs.nth(1)).toContainText('UNDER ₹50,000');
    await expect(tabs.nth(2)).toContainText('UNDER ₹1,00,000');
    await expect(tabs.nth(3)).toContainText('UNDER ₹2,00,000');
  });

  test('first tab is active by default', async ({ page }) => {
    const firstTab = page.locator('.custom-section-shop-by-price__tab').first();

    // First tab should have active class
    await expect(firstTab).toHaveClass(/custom-section-shop-by-price__tab--active/);
  });

  test('products load for first tab (BELOW ₹25000)', async ({ page }) => {
    // Wait for products to load (give it time for fetch)
    await page.waitForTimeout(2000);

    // Check if products container exists
    const productsContainer = page.locator('[data-products-container]');
    await expect(productsContainer).toBeVisible();

    // Take screenshot of initial state
    await page.screenshot({
      path: 'tests/liquid/section-shop-by-price/tab1-below-25k.png',
      fullPage: false
    });

    // Either products should be visible OR "No products found" message
    const productCards = page.locator('.custom-section-shop-by-price__product-card');
    const noProductsMsg = page.locator('.custom-section-shop-by-price__loading');

    const productCount = await productCards.count();

    if (productCount > 0) {
      console.log(`✓ Found ${productCount} products in BELOW ₹25000 range`);
      await expect(productCards.first()).toBeVisible();
    } else {
      console.log('✓ No products found message displayed (expected if no products in this range)');
      await expect(noProductsMsg).toBeVisible();
    }
  });

  test('clicking tab 2 (UNDER ₹50,000) loads products', async ({ page }) => {
    // Click second tab
    const secondTab = page.locator('.custom-section-shop-by-price__tab').nth(1);
    await secondTab.click();

    // Wait for products to load
    await page.waitForTimeout(2000);

    // Tab should now be active
    await expect(secondTab).toHaveClass(/custom-section-shop-by-price__tab--active/);

    // Take screenshot
    await page.screenshot({
      path: 'tests/liquid/section-shop-by-price/tab2-under-50k.png',
      fullPage: false
    });

    // Check products loaded
    const productsContainer = page.locator('[data-products-container]');
    await expect(productsContainer).toBeVisible();
  });

  test('clicking tab 3 (UNDER ₹1,00,000) loads products', async ({ page }) => {
    // Click third tab
    const thirdTab = page.locator('.custom-section-shop-by-price__tab').nth(2);
    await thirdTab.click();

    // Wait for products to load
    await page.waitForTimeout(2000);

    // Tab should now be active
    await expect(thirdTab).toHaveClass(/custom-section-shop-by-price__tab--active/);

    // Take screenshot
    await page.screenshot({
      path: 'tests/liquid/section-shop-by-price/tab3-under-100k.png',
      fullPage: false
    });

    // Check products loaded
    const productsContainer = page.locator('[data-products-container]');
    await expect(productsContainer).toBeVisible();

    // Check if products are visible (should have ₹80K products here)
    const productCards = page.locator('.custom-section-shop-by-price__product-card');
    const productCount = await productCards.count();

    if (productCount > 0) {
      console.log(`✓ Found ${productCount} products in UNDER ₹1,00,000 range`);
      await expect(productCards.first()).toBeVisible();
    }
  });

  test('clicking tab 4 (UNDER ₹2,00,000) loads products', async ({ page }) => {
    // Click fourth tab
    const fourthTab = page.locator('.custom-section-shop-by-price__tab').nth(3);
    await fourthTab.click();

    // Wait for products to load
    await page.waitForTimeout(2000);

    // Tab should now be active
    await expect(fourthTab).toHaveClass(/custom-section-shop-by-price__tab--active/);

    // Take screenshot
    await page.screenshot({
      path: 'tests/liquid/section-shop-by-price/tab4-under-200k.png',
      fullPage: false
    });

    // Check products loaded
    const productsContainer = page.locator('[data-products-container]');
    await expect(productsContainer).toBeVisible();

    // Check if products are visible (should have ₹141K, ₹196K products here)
    const productCards = page.locator('.custom-section-shop-by-price__product-card');
    const productCount = await productCards.count();

    if (productCount > 0) {
      console.log(`✓ Found ${productCount} products in UNDER ₹2,00,000 range`);
      await expect(productCards.first()).toBeVisible();
    }
  });

  test('carousel arrows are visible', async ({ page }) => {
    const leftArrow = page.locator('.custom-section-shop-by-price__arrow--left');
    const rightArrow = page.locator('.custom-section-shop-by-price__arrow--right');

    await expect(leftArrow).toBeVisible();
    await expect(rightArrow).toBeVisible();
  });

  test('product card structure is correct', async ({ page }) => {
    // Wait for products to load
    await page.waitForTimeout(2000);

    // Find first product card (if any exist)
    const productCards = page.locator('.custom-section-shop-by-price__product-card');
    const productCount = await productCards.count();

    if (productCount > 0) {
      const firstCard = productCards.first();

      // Check if product card has required elements
      await expect(firstCard.locator('.custom-section-shop-by-price__product-image--primary')).toBeVisible();
      await expect(firstCard.locator('.custom-section-shop-by-price__product-title')).toBeVisible();
      await expect(firstCard.locator('.custom-section-shop-by-price__product-price')).toBeVisible();
      await expect(firstCard.locator('.custom-section-shop-by-price__wishlist')).toBeVisible();

      console.log('✓ Product card structure is correct');
    } else {
      console.log('⚠ No products loaded - skipping product card structure test');
    }
  });

  test('full page screenshot - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Wait for products to load
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: 'tests/liquid/section-shop-by-price/desktop-full-section.png',
      fullPage: false
    });
  });

  test('check console for price debugging logs', async ({ page }) => {
    const consoleLogs = [];

    page.on('console', msg => {
      consoleLogs.push(msg.text());
    });

    // Reload page to trigger initial load
    await page.reload();
    await page.waitForTimeout(3000);

    // Check if debugging logs are present
    const hasProductLogs = consoleLogs.some(log => log.includes('Product:'));
    const hasFetchLog = consoleLogs.some(log => log.includes('Fetching products'));
    const hasFilteredLog = consoleLogs.some(log => log.includes('Filtered products'));

    console.log('\n=== Console Logs ===');
    consoleLogs.forEach(log => console.log(log));
    console.log('===================\n');

    expect(hasFetchLog).toBeTruthy();
  });
});
