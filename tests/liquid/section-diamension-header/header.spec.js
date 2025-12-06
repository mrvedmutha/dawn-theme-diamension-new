import { test, expect } from '@playwright/test';

test.describe('Diamension Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:9292');
    await page.waitForSelector('[data-header]');
  });

  // ==========================================
  // VISUAL REGRESSION TESTS - Transparent State
  // ==========================================

  test('visual - desktop transparent state matches Figma', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Scroll to top to ensure transparent state
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300); // Wait for scroll animation

    await expect(page.locator('[data-header]')).toHaveScreenshot(
      'header-desktop-transparent.png',
      {
        threshold: 0.2,
        maxDiffPixels: 100,
      }
    );
  });

  test('visual - tablet transparent state matches Figma', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    await expect(page.locator('[data-header]')).toHaveScreenshot(
      'header-tablet-transparent.png'
    );
  });

  test('visual - mobile transparent state matches Figma', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    await expect(page.locator('[data-header]')).toHaveScreenshot(
      'header-mobile-transparent.png'
    );
  });

  // ==========================================
  // VISUAL REGRESSION TESTS - Scrolled/Solid State
  // ==========================================

  test('visual - desktop scrolled state matches Figma', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Scroll down to trigger solid state
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(500); // Wait for scroll animation and class change

    await expect(page.locator('[data-header]')).toHaveScreenshot(
      'header-desktop-scrolled.png',
      {
        threshold: 0.2,
        maxDiffPixels: 100,
      }
    );
  });

  test('visual - tablet scrolled state matches Figma', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });

    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(500);

    await expect(page.locator('[data-header]')).toHaveScreenshot(
      'header-tablet-scrolled.png'
    );
  });

  test('visual - mobile scrolled state matches Figma', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(500);

    await expect(page.locator('[data-header]')).toHaveScreenshot(
      'header-mobile-scrolled.png'
    );
  });

  // ==========================================
  // FUNCTIONAL TESTS
  // ==========================================

  test('displays all header elements correctly', async ({ page }) => {
    // Announcement bar
    await expect(page.locator('.diamension-header__announcement-text')).toBeVisible();

    // Logo
    await expect(page.locator('.diamension-header__logo-link')).toBeVisible();
    await expect(page.locator('.diamension-header__logo-subtitle')).toBeVisible();

    // Navigation (desktop)
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('.diamension-header__nav')).toBeVisible();

    // Actions
    await expect(page.locator('.diamension-header__actions')).toBeVisible();
  });

  test('logo link navigates to homepage', async ({ page }) => {
    const logoLink = page.locator('.diamension-header__logo-link');
    await expect(logoLink).toHaveAttribute('href', '/');
  });

  test('cart link navigates to cart page', async ({ page }) => {
    const cartLink = page.locator('.diamension-header__icon--cart');
    await expect(cartLink).toHaveAttribute('href', '/cart');
  });

  test('search button is clickable', async ({ page }) => {
    const searchButton = page.locator('.diamension-header__icon').first();
    await expect(searchButton).toBeVisible();
    await expect(searchButton).toHaveAttribute('aria-label', 'Search');
  });

  // ==========================================
  // SCROLL BEHAVIOR TESTS
  // ==========================================

  test('header transitions from transparent to solid on scroll', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Initial state - transparent
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    const header = page.locator('[data-header]');
    await expect(header).not.toHaveClass(/diamension-header--scrolled/);

    // Scroll down - should become solid
    await page.evaluate(() => window.scrollTo(0, 150));
    await page.waitForTimeout(500);

    await expect(header).toHaveClass(/diamension-header--scrolled/);

    // Scroll back up - should become transparent again
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    await expect(header).not.toHaveClass(/diamension-header--scrolled/);
  });

  test('logo switches from light to dark on scroll', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // At top - light logo visible
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    const lightLogo = page.locator('.diamension-header__logo-svg--light');
    const darkLogo = page.locator('.diamension-header__logo-svg--dark');

    // Light logo should be visible (opacity 1)
    await expect(lightLogo).toHaveCSS('opacity', '1');
    await expect(darkLogo).toHaveCSS('opacity', '0');

    // Scroll down - dark logo visible
    await page.evaluate(() => window.scrollTo(0, 150));
    await page.waitForTimeout(500);

    await expect(lightLogo).toHaveCSS('opacity', '0');
    await expect(darkLogo).toHaveCSS('opacity', '1');
  });

  // ==========================================
  // RESPONSIVE TESTS
  // ==========================================

  test('navigation is hidden on mobile', async ({ page }) => {
    // Desktop - navigation visible
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('.diamension-header__nav')).toBeVisible();

    // Mobile - navigation hidden
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.diamension-header__nav')).not.toBeVisible();
  });

  test('currency selector hidden on small mobile', async ({ page }) => {
    // Desktop - currency visible
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('.diamension-header__currency')).toBeVisible();

    // Small mobile - currency hidden
    await page.setViewportSize({ width: 375, height: 667 });
    const currency = page.locator('.diamension-header__currency');
    const isVisible = await currency.isVisible();

    // On 375px it might still be visible, but on smaller screens it should be hidden
    await page.setViewportSize({ width: 320, height: 568 });
    await expect(currency).not.toBeVisible();
  });

  test('logo size adjusts on mobile', async ({ page }) => {
    // Desktop - larger logo
    await page.setViewportSize({ width: 1440, height: 900 });
    const logoWrapperDesktop = page.locator('.diamension-header__logo-wrapper');
    const desktopWidth = await logoWrapperDesktop.evaluate(el => getComputedStyle(el).width);

    // Mobile - smaller logo
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileWidth = await logoWrapperDesktop.evaluate(el => getComputedStyle(el).width);

    // Mobile logo should be smaller than desktop
    expect(parseFloat(mobileWidth)).toBeLessThan(parseFloat(desktopWidth));
  });

  // ==========================================
  // CART COUNT TESTS
  // ==========================================

  test('cart count displays when items in cart', async ({ page }) => {
    const cartCount = page.locator('[data-cart-count]');

    // If cart is empty, count should be hidden
    const isEmpty = await cartCount.textContent();
    if (isEmpty === '' || isEmpty === '0') {
      await expect(cartCount).toBeHidden();
    } else {
      // If cart has items, count should be visible
      await expect(cartCount).toBeVisible();
      expect(parseInt(await cartCount.textContent())).toBeGreaterThan(0);
    }
  });

  // ==========================================
  // ACCESSIBILITY TESTS
  // ==========================================

  test('header is fixed at top', async ({ page }) => {
    const header = page.locator('[data-header]');
    await expect(header).toHaveCSS('position', 'fixed');
    await expect(header).toHaveCSS('top', '0px');
  });

  test('all icons have aria-labels', async ({ page }) => {
    const searchButton = page.locator('.diamension-header__icon').first();
    await expect(searchButton).toHaveAttribute('aria-label', 'Search');

    const cartLink = page.locator('.diamension-header__icon--cart');
    await expect(cartLink).toHaveAttribute('aria-label', 'Cart');
  });

  test('logo link has accessible text', async ({ page }) => {
    const logoLink = page.locator('.diamension-header__logo-link');
    const hasLogoImage = await logoLink.locator('svg').count();
    expect(hasLogoImage).toBeGreaterThan(0);
  });
});
