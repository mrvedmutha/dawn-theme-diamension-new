(function () {
  'use strict';

  function checkRecoverySuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const recoverSuccess = urlParams.get('recover_success');

    if (recoverSuccess === 'true') {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);

      const hasErrors = document.querySelector('.custom-section-profile-forgot-password__errors');
      const formContainer = document.querySelector('.custom-section-profile-forgot-password__form');

      if (!hasErrors && formContainer) {
        showRecoverySuccessBanner(formContainer);
      }
    }
  }

  function showRecoverySuccessBanner(formContainer) {
    const oldErrors = formContainer.querySelector('.custom-section-profile-forgot-password__errors');
    const oldInfo = formContainer.querySelector('.custom-section-profile-forgot-password__info');
    if (oldErrors) oldErrors.remove();
    if (oldInfo) oldInfo.remove();

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

    formContainer.insertBefore(infoMessage, formContainer.firstChild);

    const submitBtn = formContainer.querySelector('.custom-section-profile-forgot-password__button');
    if (submitBtn) {
      submitBtn.disabled = true;
      setTimeout(function () {
        submitBtn.disabled = false;
      }, 5000);
    }
  }

  function init() {
    checkRecoverySuccess();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function (event) {
      if (event.target.querySelector('.custom-section-profile-forgot-password')) {
        init();
      }
    });
  }
})();
