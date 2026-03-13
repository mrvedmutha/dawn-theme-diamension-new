/**
 * Profile Reset Password Section JavaScript
 * Handles password visibility toggle functionality for password and confirm password fields
 */

(function() {
  'use strict';

  // Initialize password toggle functionality
  function initPasswordToggle() {
    const passwordToggles = document.querySelectorAll('[data-password-toggle]');

    passwordToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();

        const toggleType = this.getAttribute('data-password-toggle');
        let passwordField;

        // Find the correct password field based on toggle type
        if (toggleType === 'password') {
          passwordField = document.getElementById('customer-password');
        } else if (toggleType === 'confirm') {
          passwordField = document.getElementById('customer-password-confirm');
        }

        if (!passwordField) return;

        // Toggle input type
        const isPassword = passwordField.type === 'password';
        passwordField.type = isPassword ? 'text' : 'password';

        // Toggle button state
        this.classList.toggle('is-visible', isPassword);

        // Update aria-label
        const label = isPassword ? 'Hide password' : 'Show password';
        this.setAttribute('aria-label', label);
      });
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPasswordToggle);
  } else {
    initPasswordToggle();
  }

  // Re-initialize when section is loaded in theme editor
  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function(event) {
      if (event.target.querySelector('.custom-section-profile-reset-password')) {
        initPasswordToggle();
      }
    });
  }
})();
