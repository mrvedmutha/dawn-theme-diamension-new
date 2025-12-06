// Playwright Test Template
// Copy this template for new section tests

import { test, expect } from '@playwright/test';

test.describe('Section Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:9292');
  });

  // ==========================================
  // VISUAL REGRESSION TESTS
  // ==========================================

  test('visual - desktop matches Figma', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForSelector('.custom-section-name');

    await expect(page.locator('.custom-section-name')).toHaveScreenshot(
      'section-desktop.png',
      {
        threshold: 0.2, // Allow 20% difference
        maxDiffPixels: 100,
      }
    );
  });

  test('visual - tablet matches Figma', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForSelector('.custom-section-name');

    await expect(page.locator('.custom-section-name')).toHaveScreenshot(
      'section-tablet.png'
    );
  });

  test('visual - mobile matches Figma', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForSelector('.custom-section-name');

    await expect(page.locator('.custom-section-name')).toHaveScreenshot(
      'section-mobile.png'
    );
  });

  // ==========================================
  // FUNCTIONAL TESTS
  // ==========================================

  test('displays all content correctly', async ({ page }) => {
    await expect(page.locator('.custom-section-name__title')).toBeVisible();
    await expect(page.locator('.custom-section-name__description')).toBeVisible();
  });

  test('button click works', async ({ page }) => {
    const button = page.locator('.custom-section-name__button');
    await expect(button).toBeVisible();
    await button.click();

    // Add assertions for expected behavior
    // Example: await expect(page).toHaveURL(/\/expected-url/);
  });

  // ==========================================
  // RESPONSIVE TESTS
  // ==========================================

  test('layout changes on mobile', async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('.desktop-element')).toBeVisible();

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.mobile-element')).toBeVisible();
  });

  // ==========================================
  // INTERACTION TESTS
  // ==========================================

  test('mobile menu toggles correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const toggle = page.locator('.mobile-menu-toggle');
    const menu = page.locator('.mobile-menu');

    // Open menu
    await toggle.click();
    await expect(menu).toBeVisible();

    // Close menu
    const close = page.locator('.mobile-menu-close');
    await close.click();
    await expect(menu).not.toBeVisible();
  });

  // ==========================================
  // DYNAMIC CONTENT TESTS (if applicable)
  // ==========================================

  test('displays Shopify product data', async ({ page }) => {
    await page.goto('http://localhost:9292/products/test-product');

    // Test price
    const price = await page.locator('.product-price').textContent();
    expect(price).toContain('$');
    expect(price).toMatch(/\d+/);

    // Test image from CDN
    const image = page.locator('.product-image img');
    await expect(image).toHaveAttribute('src', /cdn\.shopify\.com/);

    // Test title
    const title = await page.locator('.product-title').textContent();
    expect(title.length).toBeGreaterThan(0);
  });
});
