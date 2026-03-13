(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', initFooterNewsletter);

  function initFooterNewsletter() {
    const newsletterForm = document.querySelector('.custom-diamension-footer__newsletter-form');
    const messageElement = document.querySelector('.custom-diamension-footer__newsletter-message');

    if (!newsletterForm) return;

    if (messageElement) {
      fadeInMessage(messageElement);
    }

    newsletterForm.addEventListener('submit', handleFormSubmit);
  }

  function fadeInMessage(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(-10px)';
    element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 100);
  }

  function handleFormSubmit(event) {
    const newsletterSection = document.querySelector('.custom-diamension-footer__newsletter');

    if (newsletterSection) {
      setTimeout(() => {
        newsletterSection.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }, 100);
    }
  }

})();
