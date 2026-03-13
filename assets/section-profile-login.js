(function () {
  'use strict';

  function initPasswordToggle() {
    const passwordToggles = document.querySelectorAll('[data-password-toggle]');

    passwordToggles.forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();

        const passwordField = this.closest('.custom-section-profile-login__field--password').querySelector(
          '.custom-section-profile-login__input--password'
        );

        if (!passwordField) return;

        const isPassword = passwordField.type === 'password';
        passwordField.type = isPassword ? 'text' : 'password';

        this.classList.toggle('is-visible', isPassword);

        const label = isPassword ? 'Hide password' : 'Show password';
        this.setAttribute('aria-label', label);
      });
    });
  }

  function checkLoginSuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const loginSuccess = urlParams.get('login_success');

    if (loginSuccess === 'true') {
      const hasErrors = document.querySelector('.custom-section-profile-login__errors');

      if (!hasErrors) {
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);

        setTimeout(function () {
          window.location.href = '/account';
        }, 2000);
      }
    }
  }

  function initFormSwitching() {
    const loginForm = document.querySelector('[data-login-form]');
    const recoverForm = document.querySelector('[data-recover-form]');
    const loginHeader = document.querySelector('[data-login-header]');
    const recoverHeader = document.querySelector('[data-recover-header]');
    const createAccountLink = document.querySelector('[data-create-account]');
    const forgotTrigger = document.querySelector('[data-forgot-trigger]');
    const backToLoginTrigger = document.querySelector('[data-back-to-login]');

    if (!loginForm || !recoverForm || !loginHeader || !recoverHeader) return;

    function showLoginForm() {
      loginForm.classList.remove('custom-section-profile-login__form-wrapper--hidden');
      recoverForm.classList.add('custom-section-profile-login__form-wrapper--hidden');
      loginHeader.classList.remove('custom-section-profile-login__header--hidden');
      recoverHeader.classList.add('custom-section-profile-login__header--hidden');
      if (createAccountLink) {
        createAccountLink.classList.remove('custom-section-profile-login__create-account--hidden');
      }
    }

    function showRecoverForm() {
      loginForm.classList.add('custom-section-profile-login__form-wrapper--hidden');
      recoverForm.classList.remove('custom-section-profile-login__form-wrapper--hidden');
      loginHeader.classList.add('custom-section-profile-login__header--hidden');
      recoverHeader.classList.remove('custom-section-profile-login__header--hidden');
      if (createAccountLink) {
        createAccountLink.classList.add('custom-section-profile-login__create-account--hidden');
      }
    }

    function checkHash() {
      if (window.location.hash === '#recover') {
        showRecoverForm();
      } else {
        showLoginForm();
      }
    }

    if (forgotTrigger) {
      forgotTrigger.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.hash = 'recover';
        showRecoverForm();
      });
    }

    if (backToLoginTrigger) {
      backToLoginTrigger.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.hash = '';
        showLoginForm();
      });
    }

    window.addEventListener('hashchange', checkHash);

    checkHash();
  }

  function checkRecoverySuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const recoverSuccess = urlParams.get('recover_success');

    if (recoverSuccess === 'true') {
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, newUrl);

      const hasErrors = document.querySelector('.custom-section-profile-login__errors');
      const recoverForm = document.querySelector('[data-recover-form]');
      const formContainer = recoverForm ? recoverForm.querySelector('.custom-section-profile-login__form') : null;

      if (!hasErrors && formContainer) {
        if (recoverForm.classList.contains('custom-section-profile-login__form-wrapper--hidden')) {
          window.location.hash = 'recover';
        }

        showRecoverySuccessBanner(formContainer);
      }
    }
  }

  function showRecoverySuccessBanner(formContainer) {
    const oldErrors = formContainer.querySelector('.custom-section-profile-login__errors');
    const oldInfo = formContainer.querySelector('.custom-section-profile-login__info');
    if (oldErrors) oldErrors.remove();
    if (oldInfo) oldInfo.remove();

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

    formContainer.insertBefore(infoMessage, formContainer.firstChild);

    const submitBtn = formContainer.querySelector('.custom-section-profile-login__button');
    if (submitBtn) {
      submitBtn.disabled = true;
      setTimeout(function () {
        submitBtn.disabled = false;
      }, 3000);
    }
  }

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

    toggleSections();

    window.addEventListener('hashchange', toggleSections);

    const forgotLinks = document.querySelectorAll('[data-forgot-trigger]');
    forgotLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.hash = 'recover';
      });
    });

    const backLinks = forgotPasswordSection.querySelectorAll('a[href*="login"]');
    backLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  function init() {
    initPasswordToggle();
    initFormSwitching();
    initSectionVisibility();
    checkLoginSuccess();
    checkRecoverySuccess();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function (event) {
      if (event.target.querySelector('.custom-section-profile-login')) {
        init();
      }
    });
  }
})();
