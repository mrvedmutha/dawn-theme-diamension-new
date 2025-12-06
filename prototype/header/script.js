/**
 * HEADER PROTOTYPE - DIAMENSION
 *
 * Functionality:
 * 1. Scroll detection - Transform header from transparent to filled
 * 2. Currency dropdown toggle
 * 3. Mobile menu toggle (placeholder for future implementation)
 */

// ============================================
// CONFIGURATION
// ============================================

const SCROLL_THRESHOLD = 50; // Pixels scrolled before header transforms

// ============================================
// DOM ELEMENTS
// ============================================

const header = document.getElementById('main-header');
const currencyToggle = document.querySelector('.header__currency-toggle');
const currencyDropdown = document.getElementById('currency-dropdown');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

// ============================================
// SCROLL DETECTION - Header Transform
// ============================================

/**
 * Handles scroll events to toggle header state
 */
function handleScroll() {
  const scrollPosition = window.scrollY;

  if (scrollPosition > SCROLL_THRESHOLD) {
    // Add filled state
    header.classList.remove('header--transparent');
    header.classList.add('header--filled');
  } else {
    // Revert to transparent state
    header.classList.remove('header--filled');
    header.classList.add('header--transparent');
  }
}

// Throttle scroll event for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  scrollTimeout = window.requestAnimationFrame(() => {
    handleScroll();
  });
});

// ============================================
// CURRENCY DROPDOWN TOGGLE
// ============================================

/**
 * Toggles currency dropdown visibility
 */
function toggleCurrencyDropdown(event) {
  event.stopPropagation();
  currencyDropdown.classList.toggle('is-active');
}

/**
 * Closes currency dropdown when clicking outside
 */
function closeCurrencyDropdown(event) {
  if (!event.target.closest('.header__currency')) {
    currencyDropdown.classList.remove('is-active');
  }
}

// Event listeners for currency dropdown
if (currencyToggle && currencyDropdown) {
  currencyToggle.addEventListener('click', toggleCurrencyDropdown);
  document.addEventListener('click', closeCurrencyDropdown);

  // Handle currency selection
  const currencyOptions = document.querySelectorAll('.header__currency-option');
  currencyOptions.forEach((option) => {
    option.addEventListener('click', (event) => {
      const currency = event.target.dataset.currency;
      const currencyText = event.target.textContent;

      // Update currency toggle text
      currencyToggle.textContent = currencyText;

      // Close dropdown
      currencyDropdown.classList.remove('is-active');

      // Log selection (replace with actual currency change logic)
      console.log(`Currency changed to: ${currency}`);
    });
  });
}

// ============================================
// MOBILE MENU TOGGLE (Placeholder)
// ============================================

/**
 * Toggles mobile menu (to be implemented)
 */
function toggleMobileMenu() {
  // TODO: Implement mobile menu slide-in functionality
  console.log('Mobile menu toggle clicked');
  // Add class to show/hide mobile menu
  // Example: mobileMenu.classList.toggle('is-active');
}

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize header on page load
 */
function initHeader() {
  // Set initial header state based on scroll position
  handleScroll();

  console.log('Header initialized');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeader);
} else {
  initHeader();
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export functions for testing (if using modules)
// export { handleScroll, toggleCurrencyDropdown, toggleMobileMenu };
