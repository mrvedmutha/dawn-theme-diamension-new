/**
 * Profile Login Section JavaScript
 * Handles password visibility toggle and form switching functionality
 */

(function() {
  'use strict';

  // Initialize password toggle functionality
  function initPasswordToggle() {
    const passwordToggles = document.querySelectorAll('[data-password-toggle]');

    passwordToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();

        const passwordField = this.closest('.custom-section-profile-login__field--password')
          .querySelector('.custom-section-profile-login__input--password');

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

  // Initialize form switching functionality
  function initFormSwitching() {
    const loginForm = document.querySelector('[data-login-form]');
    const recoverForm = document.querySelector('[data-recover-form]');
    const loginHeader = document.querySelector('[data-login-header]');
    const recoverHeader = document.querySelector('[data-recover-header]');
    const createAccountLink = document.querySelector('[data-create-account]');
    const forgotTrigger = document.querySelector('[data-forgot-trigger]');
    const backToLoginTrigger = document.querySelector('[data-back-to-login]');

    if (!loginForm || !recoverForm || !loginHeader || !recoverHeader) return;

    // Function to show login form
    function showLoginForm() {
      loginForm.classList.remove('custom-section-profile-login__form-wrapper--hidden');
      recoverForm.classList.add('custom-section-profile-login__form-wrapper--hidden');
      loginHeader.classList.remove('custom-section-profile-login__header--hidden');
      recoverHeader.classList.add('custom-section-profile-login__header--hidden');
      if (createAccountLink) {
        createAccountLink.classList.remove('custom-section-profile-login__create-account--hidden');
      }
    }

    // Function to show forgot password form
    function showRecoverForm() {
      loginForm.classList.add('custom-section-profile-login__form-wrapper--hidden');
      recoverForm.classList.remove('custom-section-profile-login__form-wrapper--hidden');
      loginHeader.classList.add('custom-section-profile-login__header--hidden');
      recoverHeader.classList.remove('custom-section-profile-login__header--hidden');
      if (createAccountLink) {
        createAccountLink.classList.add('custom-section-profile-login__create-account--hidden');
      }
    }

    // Check URL hash on load
    function checkHash() {
      if (window.location.hash === '#recover') {
        showRecoverForm();
      } else {
        showLoginForm();
      }
    }

    // Handle forgot password click
    if (forgotTrigger) {
      forgotTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.hash = 'recover';
        showRecoverForm();
      });
    }

    // Handle back to login click
    if (backToLoginTrigger) {
      backToLoginTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.hash = '';
        showLoginForm();
      });
    }

    // Listen to hash changes
    window.addEventListener('hashchange', checkHash);

    // Check hash on initialization
    checkHash();
  }

  // Initialize all functionality
  function init() {
    initPasswordToggle();
    initFormSwitching();
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize when section is loaded in theme editor
  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function(event) {
      if (event.target.querySelector('.custom-section-profile-login')) {
        init();
      }
    });
  }
})();
