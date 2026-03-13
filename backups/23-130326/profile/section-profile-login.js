/**
 * Profile Login Section JavaScript
 * Handles password visibility toggle and form switching functionality
 */

(function () {
  'use strict';

  // Initialize password toggle functionality
  function initPasswordToggle() {
    const passwordToggles = document.querySelectorAll('[data-password-toggle]');

    passwordToggles.forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();

        const passwordField = this.closest('.custom-section-profile-login__field--password').querySelector(
          '.custom-section-profile-login__input--password'
        );

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

  // TODO: Check URL parameters for login success from Shopify redirect
  function checkLoginSuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const loginSuccess = urlParams.get('login_success');

    if (loginSuccess === 'true') {
      console.log('TODO: Login success detected via URL parameter');

      const hasErrors = document.querySelector('.custom-section-profile-login__errors');

      if (!hasErrors) {
        // TODO: Remove the URL parameter so refresh doesn't retrigger
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);

        // TODO: Show success message and redirect to account
        console.log('Login successful! Redirecting to account page...');
        setTimeout(function () {
          window.location.href = '/account';
        }, 2000);
      }
    }
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
      forgotTrigger.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.hash = 'recover';
        showRecoverForm();
      });
    }

    // Handle back to login click
    if (backToLoginTrigger) {
      backToLoginTrigger.addEventListener('click', function (e) {
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

  // TODO: Check URL parameters for password recovery success
  function checkRecoverySuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const recoverSuccess = urlParams.get('recover_success');

    if (recoverSuccess === 'true') {
      console.log('TODO: Password recovery success detected via URL parameter');

      // TODO: Remove the URL parameter first
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, newUrl);

      const hasErrors = document.querySelector('.custom-section-profile-login__errors');
      const recoverForm = document.querySelector('[data-recover-form]');
      const formContainer = recoverForm ? recoverForm.querySelector('.custom-section-profile-login__form') : null;

      if (!hasErrors && formContainer) {
        console.log('TODO: Showing password recovery success notification');

        // TODO: Show recovery form if it's hidden
        if (recoverForm.classList.contains('custom-section-profile-login__form-wrapper--hidden')) {
          window.location.hash = 'recover';
        }

        showRecoverySuccessBanner(formContainer);
      }
    }
  }

  // TODO: Show password recovery success notification banner
  function showRecoverySuccessBanner(formContainer) {
    // Remove old messages
    const oldErrors = formContainer.querySelector('.custom-section-profile-login__errors');
    const oldInfo = formContainer.querySelector('.custom-section-profile-login__info');
    if (oldErrors) oldErrors.remove();
    if (oldInfo) oldInfo.remove();

    // Create info notification banner
    const infoMessage = document.createElement('div');
    infoMessage.className = 'custom-section-profile-login__info';
    infoMessage.style.cssText = 'animation: slideDown 0.3s ease-out;';
    infoMessage.innerHTML = `
      <div class="custom-section-profile-login__info-title">
        Email sent successfully!
      </div>
      <div class="custom-section-profile-login__info-text">
        We've sent you an email with a link to reset your password.
      </div>
      <div class="custom-section-profile-login__info-text">
        Please check your email and click the link to continue. Don't forget to check your spam folder.
      </div>
    `;

    // Insert at top of form
    formContainer.insertBefore(infoMessage, formContainer.firstChild);

    // Disable submit button temporarily
    const submitBtn = formContainer.querySelector('.custom-section-profile-login__button');
    if (submitBtn) {
      submitBtn.disabled = true;
      setTimeout(function () {
        submitBtn.disabled = false;
      }, 3000);
    }
  }

  // Initialize section visibility based on URL hash
  function initSectionVisibility() {
    const loginSection = document.querySelector('.custom-section-profile-login');
    const forgotPasswordSection = document.querySelector('.custom-section-profile-forgot-password');

    if (!loginSection || !forgotPasswordSection) return;

    function toggleSections() {
      if (window.location.hash === '#recover') {
        loginSection.classList.add('is-hidden');
        forgotPasswordSection.classList.add('is-active');
      } else {
        loginSection.classList.remove('is-hidden');
        forgotPasswordSection.classList.remove('is-active');
      }
    }

    // Toggle sections on page load
    toggleSections();

    // Listen to hash changes
    window.addEventListener('hashchange', toggleSections);

    // Handle forgot password link clicks
    const forgotLinks = document.querySelectorAll('[data-forgot-trigger]');
    forgotLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.hash = 'recover';
      });
    });

    // Handle back to login link clicks in forgot password section
    const backLinks = forgotPasswordSection.querySelectorAll('a[href*="login"]');
    backLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  // Initialize all functionality
  function init() {
    initPasswordToggle();
    initFormSwitching();
    initSectionVisibility();
    // TODO: Check URL parameters instead of session storage
    checkLoginSuccess();
    checkRecoverySuccess();
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize when section is loaded in theme editor
  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function (event) {
      if (event.target.querySelector('.custom-section-profile-login')) {
        init();
      }
    });
  }
})();
