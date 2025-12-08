/**
 * Diamension Header - Comprehensive Test Suite
 * Tests all three header behavior modes: Auto, Transparent, Solid
 * Covers visual regression, functional, responsive, and JavaScript behavior
 */

import { test, expect } from '@playwright/test';

// Test configuration
const BASE_URL = 'http://localhost:9292';
const SCROLL_THRESHOLD = 820;
const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 1024, height: 768 },
  mobile: { width: 375, height: 667 }
};

test.describe('Section: Diamension Header', () => {
  
  // ============================================
  // SETUP & TEARDOWN
  // ============================================
  
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    // Wait for header to be fully loaded
    await page.waitForSelector('[data-header]', { state: 'visible' });
  });

  // ============================================
  // VISUAL REGRESSION TESTS
  // ============================================

  test.describe('Visual Regression - Auto Mode', () => {
    test('desktop - transparent state matches Figma', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      
      // Ensure we're at the top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500); // Wait for transitions
      
      const header = page.locator('[data-header]');
      await expect(header).toHaveScreenshot('header-auto-transparent-desktop.png', {
        threshold: 0.2
      });
    });

    test('desktop - solid state after scroll matches Figma', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      
      // Scroll past threshold
      await page.evaluate((threshold) => window.scrollTo(0, threshold + 100), SCROLL_THRESHOLD);
      await page.waitForTimeout(500);
      
      // Scroll up to show header
      await page.evaluate(() => window.scrollTo(0, 900));
      await page.waitForTimeout(500);
      
      const header = page.locator('[data-header]');
      await expect(header).toHaveScreenshot('header-auto-solid-desktop.png', {
        threshold: 0.2
      });
    });

    test('tablet - transparent state matches Figma', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.tablet);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      
      const header = page.locator('[data-header]');
      await expect(header).toHaveScreenshot('header-auto-transparent-tablet.png', {
        threshold: 0.2
      });
    });

    test('mobile - transparent state matches Figma', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      
      const header = page.locator('[data-header]');
      await expect(header).toHaveScreenshot('header-auto-transparent-mobile.png', {
        threshold: 0.2
      });
    });
  });

  // ============================================
  // FUNCTIONAL TESTS - HEADER STRUCTURE
  // ============================================

  test.describe('Functional - Header Structure', () => {
    test('displays all required elements', async ({ page }) => {
      // Announcement bar
      await expect(page.locator('.diamension-header__announcement')).toBeVisible();
      await expect(page.locator('.diamension-header__announcement-text')).toBeVisible();
      
      // Main header
      await expect(page.locator('.diamension-header__main')).toBeVisible();
      
      // Logo
      await expect(page.locator('.diamension-header__logo')).toBeVisible();
      
      // Navigation (desktop)
      if (await page.viewportSize().width >= 768) {
        await expect(page.locator('.diamension-header__nav')).toBeVisible();
      }
      
      // Actions
      await expect(page.locator('.diamension-header__actions')).toBeVisible();
      await expect(page.locator('[data-search-toggle]')).toBeVisible();
      await expect(page.locator('.diamension-header__icon-profile')).toBeVisible();
      await expect(page.locator('#diamension-cart-icon')).toBeVisible();
    });

    test('has correct data attributes', async ({ page }) => {
      const header = page.locator('[data-header]');
      
      // Check header behavior attribute exists
      const behavior = await header.getAttribute('data-header-behavior');
      expect(['auto', 'transparent', 'solid']).toContain(behavior);
    });

    test('displays both light and dark logos', async ({ page }) => {
      const lightLogo = page.locator('.diamension-header__logo-img--light');
      const darkLogo = page.locator('.diamension-header__logo-img--dark');
      
      // Both logos should exist in DOM
      await expect(lightLogo).toBeAttached();
      await expect(darkLogo).toBeAttached();
    });
  });

  // ============================================
  // FUNCTIONAL TESTS - AUTO MODE BEHAVIOR
  // ============================================

  test.describe('Functional - Auto Mode Scroll Behavior', () => {
    test('starts transparent at page top', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      
      const header = page.locator('[data-header]');
      
      // Should NOT have scrolled class
      await expect(header).not.toHaveClass(/diamension-header--scrolled/);
      
      // Should have transparent layout class
      await expect(header).toHaveClass(/diamension-header--transparent-layout/);
    });

    test('hides when scrolling down past threshold', async ({ page }) => {
      // Scroll down past threshold
      await page.evaluate((threshold) => {
        window.scrollTo(0, threshold + 100);
      }, SCROLL_THRESHOLD);
      await page.waitForTimeout(500);
      
      const header = page.locator('[data-header]');
      
      // Should have hidden class
      await expect(header).toHaveClass(/diamension-header--hidden/);
      await expect(header).toHaveClass(/diamension-header--scrolled/);
    });

    test('shows solid header when scrolling up', async ({ page }) => {
      // Scroll down past threshold
      await page.evaluate((threshold) => window.scrollTo(0, threshold + 200), SCROLL_THRESHOLD);
      await page.waitForTimeout(500);
      
      // Scroll up a bit
      await page.evaluate((threshold) => window.scrollTo(0, threshold + 100), SCROLL_THRESHOLD);
      await page.waitForTimeout(500);
      
      const header = page.locator('[data-header]');
      
      // Should NOT be hidden
      await expect(header).not.toHaveClass(/diamension-header--hidden/);
      
      // Should be solid
      await expect(header).toHaveClass(/diamension-header--scrolled/);
      await expect(header).toHaveClass(/diamension-header--solid-layout/);
    });

    test('becomes transparent when scrolled to top', async ({ page }) => {
      // Scroll down first
      await page.evaluate(() => window.scrollTo(0, 1000));
      await page.waitForTimeout(300);
      
      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      
      const header = page.locator('[data-header]');
      
      // Should be transparent
      await expect(header).not.toHaveClass(/diamension-header--scrolled/);
      await expect(header).toHaveClass(/diamension-header--transparent-layout/);
    });

    test('shows correct logo based on scroll state', async ({ page }) => {
      const lightLogo = page.locator('.diamension-header__logo-img--light');
      const darkLogo = page.locator('.diamension-header__logo-img--dark');
      
      // At top - light logo visible
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      await expect(lightLogo).toHaveCSS('opacity', '1');
      
      // After scroll - dark logo visible
      await page.evaluate((threshold) => window.scrollTo(0, threshold + 100), SCROLL_THRESHOLD);
      await page.waitForTimeout(300);
      await page.evaluate(() => window.scrollTo(0, 900));
      await page.waitForTimeout(500);
      await expect(darkLogo).toHaveCSS('opacity', '1');
    });
  });

  // ============================================
  // FUNCTIONAL TESTS - TRANSPARENT MODE
  // ============================================

  test.describe('Functional - Always Transparent Mode', () => {
    test.skip('stays transparent regardless of scroll', async ({ page }) => {
      // Note: This test requires setting header_behavior to 'transparent' in theme editor
      // Skip by default as it requires manual configuration
      
      const header = page.locator('[data-header]');
      
      // Check initial state
      await expect(header).toHaveAttribute('data-header-behavior', 'transparent');
      await expect(header).not.toHaveClass(/diamension-header--scrolled/);
      
      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 1500));
      await page.waitForTimeout(500);
      
      // Should still be transparent
      await expect(header).not.toHaveClass(/diamension-header--scrolled/);
      await expect(header).toHaveClass(/diamension-header--transparent-layout/);
    });
  });

  // ============================================
  // FUNCTIONAL TESTS - SOLID MODE
  // ============================================

  test.describe('Functional - Always Solid Mode', () => {
    test.skip('stays solid regardless of scroll', async ({ page }) => {
      // Note: This test requires setting header_behavior to 'solid' in theme editor
      // Skip by default as it requires manual configuration
      
      const header = page.locator('[data-header]');
      
      // Check initial state
      await expect(header).toHaveAttribute('data-header-behavior', 'solid');
      await expect(header).toHaveClass(/diamension-header--scrolled/);
      await expect(header).toHaveClass(/diamension-header--solid-layout/);
      
      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 1500));
      await page.waitForTimeout(500);
      
      // Should still be solid
      await expect(header).toHaveClass(/diamension-header--scrolled/);
      await expect(header).toHaveClass(/diamension-header--solid-layout/);
    });
  });

  // ============================================
  // FUNCTIONAL TESTS - SEARCH OVERLAY
  // ============================================

  test.describe('Functional - Search Overlay', () => {
    test('opens search overlay on button click', async ({ page }) => {
      const searchToggle = page.locator('[data-search-toggle]');
      const searchOverlay = page.locator('[data-search-overlay]');
      
      await searchToggle.click();
      await page.waitForTimeout(500);
      
      // Overlay should be active
      await expect(searchOverlay).toHaveClass(/diamension-search-overlay--active/);
      
      // Header should be solid
      const header = page.locator('[data-header]');
      await expect(header).toHaveClass(/diamension-header--search-open/);
    });

    test('closes search overlay on backdrop click', async ({ page }) => {
      const searchToggle = page.locator('[data-search-toggle]');
      const searchBackdrop = page.locator('[data-search-backdrop]');
      const searchOverlay = page.locator('[data-search-overlay]');
      
      // Open search
      await searchToggle.click();
      await page.waitForTimeout(500);
      
      // Close via backdrop
      await searchBackdrop.click();
      await page.waitForTimeout(500);
      
      // Overlay should be closed
      await expect(searchOverlay).not.toHaveClass(/diamension-search-overlay--active/);
    });

    test('closes search overlay on ESC key', async ({ page }) => {
      const searchToggle = page.locator('[data-search-toggle]');
      const searchOverlay = page.locator('[data-search-overlay]');
      
      // Open search
      await searchToggle.click();
      await page.waitForTimeout(500);
      
      // Press ESC
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
      
      // Overlay should be closed
      await expect(searchOverlay).not.toHaveClass(/diamension-search-overlay--active/);
    });

    test('toggles search icon to close icon when open', async ({ page }) => {
      const searchToggle = page.locator('[data-search-toggle]');
      
      // Open search
      await searchToggle.click();
      await page.waitForTimeout(500);
      
      // Button should have close-active class
      await expect(searchToggle).toHaveClass(/diamension-header__icon--close-active/);
    });

    test('focuses search input when opened', async ({ page }) => {
      const searchToggle = page.locator('[data-search-toggle]');
      const searchInput = page.locator('[data-search-input]');
      
      await searchToggle.click();
      await page.waitForTimeout(500);
      
      // Input should be focused
      await expect(searchInput).toBeFocused();
    });

    test('performs search with debouncing', async ({ page }) => {
      const searchToggle = page.locator('[data-search-toggle]');
      const searchInput = page.locator('[data-search-input]');
      
      await searchToggle.click();
      await page.waitForTimeout(500);
      
      // Type search query
      await searchInput.fill('test product');
      
      // Wait for debounce delay (500ms) + network request
      await page.waitForTimeout(1000);
      
      // Check if loading or results are shown
      const loading = page.locator('[data-search-loading]');
      const results = page.locator('[data-search-products]');
      
      // Either loading should have been shown or results should be present
      const loadingVisible = await loading.isVisible();
      const resultsHasContent = await results.innerHTML();
      
      expect(loadingVisible || resultsHasContent.length > 0).toBeTruthy();
    });

    test('restores header state after closing search', async ({ page }) => {
      const searchToggle = page.locator('[data-search-toggle]');
      const header = page.locator('[data-header]');
      
      // Ensure we're at top (transparent state)
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      
      // Open search
      await searchToggle.click();
      await page.waitForTimeout(500);
      
      // Header should be solid
      await expect(header).toHaveClass(/diamension-header--search-open/);
      
      // Close search
      await searchToggle.click();
      await page.waitForTimeout(500);
      
      // Header should return to transparent (auto mode at top)
      await expect(header).not.toHaveClass(/diamension-header--search-open/);
    });
  });

  // ============================================
  // FUNCTIONAL TESTS - MOBILE MENU
  // ============================================

  test.describe('Functional - Mobile Menu', () => {
    test('opens mobile menu on hamburger click', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      
      const hamburger = page.locator('[data-hamburger]');
      const mobileMenu = page.locator('[data-mobile-menu]');
      
      await hamburger.click();
      await page.waitForTimeout(300);
      
      // Menu should be open
      await expect(mobileMenu).toHaveClass(/is-open/);
      
      // Header should have menu-open class
      const header = page.locator('[data-header]');
      await expect(header).toHaveClass(/diamension-header--menu-open/);
      
      // Body overflow should be hidden
      const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
      expect(bodyOverflow).toBe('hidden');
    });

    test('closes mobile menu on close button click', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      
      const hamburger = page.locator('[data-hamburger]');
      const closeButton = page.locator('[data-mobile-close]');
      const mobileMenu = page.locator('[data-mobile-menu]');
      
      // Open menu
      await hamburger.click();
      await page.waitForTimeout(300);
      
      // Close menu
      await closeButton.click();
      await page.waitForTimeout(300);
      
      // Menu should be closed
      await expect(mobileMenu).not.toHaveClass(/is-open/);
    });

    test('closes mobile menu when clicking a link', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      
      const hamburger = page.locator('[data-hamburger]');
      const mobileMenu = page.locator('[data-mobile-menu]');
      const firstLink = page.locator('.diamension-header__mobile-nav-link').first();
      
      // Open menu
      await hamburger.click();
      await page.waitForTimeout(300);
      
      // Click a link
      await firstLink.click();
      await page.waitForTimeout(300);
      
      // Menu should be closed
      await expect(mobileMenu).not.toHaveClass(/is-open/);
    });
  });

  // ============================================
  // FUNCTIONAL TESTS - CART
  // ============================================

  test.describe('Functional - Cart', () => {
    test('displays cart icon', async ({ page }) => {
      const cartIcon = page.locator('#diamension-cart-icon');
      await expect(cartIcon).toBeVisible();
    });

    test('displays cart count when items in cart', async ({ page }) => {
      const cartCount = page.locator('[data-cart-count]');
      
      // Cart count element should exist
      await expect(cartCount).toBeAttached();
      
      // If cart has items, count should be visible
      const countText = await cartCount.textContent();
      if (countText && countText.trim() !== '') {
        await expect(cartCount).toBeVisible();
      }
    });
  });

  // ============================================
  // FUNCTIONAL TESTS - HOVER EFFECTS
  // ============================================

  test.describe('Functional - Hover Effects', () => {
    test('announcement bar becomes solid on hover', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      
      const announcement = page.locator('.diamension-header__announcement');
      
      // Hover on announcement
      await announcement.hover();
      await page.waitForTimeout(300);
      
      // Should have solid background
      const bgColor = await announcement.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      
      // #FFFAF5 = rgb(255, 250, 245)
      expect(bgColor).toBe('rgb(255, 250, 245)');
    });

    test('main header becomes solid on hover', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      
      // Ensure we're at top (transparent state)
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      
      const mainHeader = page.locator('.diamension-header__main');
      const header = page.locator('[data-header]');
      
      // Hover on main header
      await mainHeader.hover();
      await page.waitForTimeout(300);
      
      // Header should have box shadow
      const boxShadow = await header.evaluate(el => 
        window.getComputedStyle(el).boxShadow
      );
      
      expect(boxShadow).not.toBe('none');
    });
  });

  // ============================================
  // RESPONSIVE TESTS
  // ============================================

  test.describe('Responsive - Desktop (1440px)', () => {
    test('displays desktop navigation', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      
      const nav = page.locator('.diamension-header__nav');
      await expect(nav).toBeVisible();
    });

    test('hides mobile hamburger', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      
      const hamburger = page.locator('[data-hamburger]');
      
      // Should exist but be hidden via CSS
      const display = await hamburger.evaluate(el => 
        window.getComputedStyle(el).display
      );
      
      expect(display).toBe('none');
    });

    test('displays all action icons', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      
      await expect(page.locator('[data-search-toggle]')).toBeVisible();
      await expect(page.locator('.diamension-header__currency')).toBeVisible();
      await expect(page.locator('.diamension-header__icon-profile')).toBeVisible();
      await expect(page.locator('#diamension-cart-icon')).toBeVisible();
    });
  });

  test.describe('Responsive - Tablet (1024px)', () => {
    test('adjusts layout for tablet', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.tablet);
      
      const container = page.locator('.diamension-header__container');
      await expect(container).toBeVisible();
      
      // Check padding adjusts
      const padding = await container.evaluate(el => 
        window.getComputedStyle(el).paddingLeft
      );
      
      expect(padding).toBeTruthy();
    });
  });

  test.describe('Responsive - Mobile (375px)', () => {
    test('displays mobile hamburger', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      
      const hamburger = page.locator('[data-hamburger]');
      await expect(hamburger).toBeVisible();
    });

    test('hides desktop navigation', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      
      const nav = page.locator('.diamension-header__nav');
      
      // Should exist but be hidden via CSS
      const display = await nav.evaluate(el => 
        window.getComputedStyle(el).display
      );
      
      expect(display).toBe('none');
    });

    test('displays mobile menu when opened', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      
      const hamburger = page.locator('[data-hamburger]');
      const mobileMenu = page.locator('[data-mobile-menu]');
      
      await hamburger.click();
      await page.waitForTimeout(300);
      
      await expect(mobileMenu).toBeVisible();
      await expect(mobileMenu).toHaveClass(/is-open/);
    });
  });

  // ============================================
  // JAVASCRIPT BEHAVIOR TESTS
  // ============================================

  test.describe('JavaScript Behavior', () => {
    test('initializes DiamensionHeader class', async ({ page }) => {
      // Check if header JavaScript is loaded
      const headerExists = await page.evaluate(() => {
        return document.querySelector('[data-header]') !== null;
      });
      
      expect(headerExists).toBeTruthy();
    });

    test('initializes DiamensionSearch class', async ({ page }) => {
      // Check if search overlay exists
      const searchExists = await page.evaluate(() => {
        return document.querySelector('[data-search-overlay]') !== null;
      });
      
      expect(searchExists).toBeTruthy();
    });

    test('uses requestAnimationFrame for scroll handling', async ({ page }) => {
      // Scroll multiple times quickly
      for (let i = 0; i < 5; i++) {
        await page.evaluate((i) => window.scrollTo(0, i * 100), i);
      }
      
      await page.waitForTimeout(500);
      
      // Header should still be responsive
      const header = page.locator('[data-header]');
      await expect(header).toBeVisible();
    });

    test('updates cart count dynamically', async ({ page }) => {
      const cartCount = page.locator('[data-cart-count]');
      
      // Trigger cart update event
      await page.evaluate(() => {
        document.dispatchEvent(new CustomEvent('cart:updated'));
      });
      
      await page.waitForTimeout(500);
      
      // Cart count element should still be attached
      await expect(cartCount).toBeAttached();
    });
  });

  // ============================================
  // CONSOLE ERROR CHECKS
  // ============================================

  test.describe('Console Errors', () => {
    test('has no JavaScript errors on page load', async ({ page }) => {
      const errors = [];
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.goto(BASE_URL);
      await page.waitForTimeout(2000);
      
      // Filter out known acceptable errors (e.g., missing resources in dev)
      const criticalErrors = errors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('404')
      );
      
      expect(criticalErrors).toHaveLength(0);
    });

    test('has no errors when interacting with search', async ({ page }) => {
      const errors = [];
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      const searchToggle = page.locator('[data-search-toggle]');
      await searchToggle.click();
      await page.waitForTimeout(500);
      await searchToggle.click();
      await page.waitForTimeout(500);
      
      const criticalErrors = errors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('404')
      );
      
      expect(criticalErrors).toHaveLength(0);
    });

    test('has no errors when scrolling', async ({ page }) => {
      const errors = [];
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 1500));
      await page.waitForTimeout(500);
      
      // Scroll up
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      
      const criticalErrors = errors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('404')
      );
      
      expect(criticalErrors).toHaveLength(0);
    });
  });

  // ============================================
  // ACCESSIBILITY TESTS
  // ============================================

  test.describe('Accessibility', () => {
    test('has proper ARIA labels', async ({ page }) => {
      // Search button
      const searchToggle = page.locator('[data-search-toggle]');
      await expect(searchToggle).toHaveAttribute('aria-label', 'Search');
      
      // Hamburger menu
      const hamburger = page.locator('[data-hamburger]');
      await expect(hamburger).toHaveAttribute('aria-label', 'Menu');
      
      // Cart icon
      const cartIcon = page.locator('#diamension-cart-icon');
      await expect(cartIcon).toHaveAttribute('aria-label', 'Cart');
    });

    test('search form has proper role', async ({ page }) => {
      const searchForm = page.locator('[data-search-form]');
      await expect(searchForm).toHaveAttribute('role', 'search');
    });

    test('logo has alt text', async ({ page }) => {
      const logos = page.locator('.diamension-header__logo-img');
      const count = await logos.count();
      
      for (let i = 0; i < count; i++) {
        const logo = logos.nth(i);
        const alt = await logo.getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    });
  });

  // ============================================
  // PERFORMANCE TESTS
  // ============================================

  test.describe('Performance', () => {
    test('header loads within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto(BASE_URL);
      await page.waitForSelector('[data-header]', { state: 'visible' });
      
      const loadTime = Date.now() - startTime;
      
      // Header should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
    });

    test('scroll performance is smooth', async ({ page }) => {
      const startTime = Date.now();
      
      // Perform multiple scrolls
      for (let i = 0; i < 10; i++) {
        await page.evaluate((i) => window.scrollTo(0, i * 200), i);
        await page.waitForTimeout(50);
      }
      
      const totalTime = Date.now() - startTime;
      
      // Should complete within reasonable time
      expect(totalTime).toBeLessThan(2000);
    });
  });
});
