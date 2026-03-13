(function() {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const successMessage = document.getElementById('contact-page-success-message');
    const errorMessage = document.getElementById('contact-page-error-message');

    if (successMessage) {
      setTimeout(function() {
        hideMessage(successMessage);
      }, 5000);
    }

    if (errorMessage) {
      setTimeout(function() {
        hideMessage(errorMessage);
      }, 5000);
    }
  }

  function hideMessage(element) {
    element.classList.add('hide');

    setTimeout(function() {
      element.style.display = 'none';
    }, 300);
  }

})();
