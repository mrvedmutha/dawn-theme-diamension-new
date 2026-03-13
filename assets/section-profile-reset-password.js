(function() {
  'use strict';

  function initPasswordToggle() {
    const passwordToggles = document.querySelectorAll('[data-password-toggle]');

    passwordToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();

        const toggleType = this.getAttribute('data-password-toggle');
        let passwordField;

        if (toggleType === 'password') {
          passwordField = document.getElementById('customer-password');
        } else if (toggleType === 'confirm') {
          passwordField = document.getElementById('customer-password-confirm');
        }

        if (!passwordField) return;

        const isPassword = passwordField.type === 'password';
        passwordField.type = isPassword ? 'text' : 'password';

        this.classList.toggle('is-visible', isPassword);

        const label = isPassword ? 'Hide password' : 'Show password';
        this.setAttribute('aria-label', label);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPasswordToggle);
  } else {
    initPasswordToggle();
  }

  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function(event) {
      if (event.target.querySelector('.custom-section-profile-reset-password')) {
        initPasswordToggle();
      }
    });
  }
})();
