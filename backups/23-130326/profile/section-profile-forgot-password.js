/**
 * Profile Forgot Password Section JavaScript
 * Handles password recovery form with URL parameter detection
 */

(function () {
  'use strict';

  // TODO: Removed initRecoveryFormTracking - No longer needed with return_to parameter approach

  // TODO: Check for password recovery success on page load
  function checkRecoverySuccess() {
    // TODO: Check URL parameters instead of session storage
    const urlParams = new URLSearchParams(window.location.search);
    const recoverSuccess = urlParams.get('recover_success');

    if (recoverSuccess === 'true') {
      console.log('TODO: Password recovery success detected via URL parameter');

      // TODO: Remove the URL parameter so refresh doesn't retrigger
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);

      const hasErrors = document.querySelector('.custom-section-profile-forgot-password__errors');
      const formContainer = document.querySelector('.custom-section-profile-forgot-password__form');

      if (!hasErrors && formContainer) {
        console.log('TODO: Showing password recovery success notification');
        showRecoverySuccessBanner(formContainer);
      }
    }
  }

  // TODO: Show password recovery success notification banner
  function showRecoverySuccessBanner(formContainer) {
    // Remove old messages
    const oldErrors = formContainer.querySelector('.custom-section-profile-forgot-password__errors');
    const oldInfo = formContainer.querySelector('.custom-section-profile-forgot-password__info');
    if (oldErrors) oldErrors.remove();
    if (oldInfo) oldInfo.remove();

    // Create info notification banner
    const infoMessage = document.createElement('div');
    infoMessage.className = 'custom-section-profile-forgot-password__info';
    infoMessage.style.cssText = 'animation: slideDown 0.3s ease-out;';
    infoMessage.innerHTML = `
      <div class="custom-section-profile-forgot-password__info-title">
        Email sent successfully!
      </div>
      <div class="custom-section-profile-forgot-password__info-text">
        We've sent you an email with a link to reset your password.
      </div>
      <div class="custom-section-profile-forgot-password__info-text">
        Please check your email and click the link to continue. Don't forget to check your spam folder.
      </div>
    `;

    // Insert at top of form
    formContainer.insertBefore(infoMessage, formContainer.firstChild);

    // Disable submit button temporarily
    const submitBtn = formContainer.querySelector('.custom-section-profile-forgot-password__button');
    if (submitBtn) {
      submitBtn.disabled = true;
      setTimeout(function () {
        submitBtn.disabled = false;
      }, 5000);
    }
  }

  // Initialize all functionality
  function init() {
    // TODO: Removed initRecoveryFormTracking - using URL parameters instead
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
      if (event.target.querySelector('.custom-section-profile-forgot-password')) {
        init();
      }
    });
  }
})();
