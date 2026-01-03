/**
 * Custom Section: Contact Page
 * Auto-hide success/error messages after 5 seconds
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Find success or error message
    const successMessage = document.getElementById('contact-page-success-message');
    const errorMessage = document.getElementById('contact-page-error-message');

    // Auto-hide success message after 5 seconds
    if (successMessage) {
      setTimeout(function() {
        hideMessage(successMessage);
      }, 5000);
    }

    // Auto-hide error message after 5 seconds
    if (errorMessage) {
      setTimeout(function() {
        hideMessage(errorMessage);
      }, 5000);
    }
  }

  /**
   * Hide message with fade out effect
   * @param {HTMLElement} element - Message element to hide
   */
  function hideMessage(element) {
    element.classList.add('hide');

    // Remove from DOM after transition completes
    setTimeout(function() {
      element.style.display = 'none';
    }, 300);
  }

})();
