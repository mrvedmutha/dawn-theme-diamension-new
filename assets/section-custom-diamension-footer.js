/**
 * Diamension Footer - Newsletter Message Handling
 *
 * This script adds optional enhancements to the newsletter form.
 * The core functionality works without JavaScript using Shopify's
 * native form handling, but this adds smooth transitions.
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', initFooterNewsletter);

  function initFooterNewsletter() {
    const newsletterForm = document.querySelector('.custom-diamension-footer__newsletter-form');
    const messageElement = document.querySelector('.custom-diamension-footer__newsletter-message');

    if (!newsletterForm) return;

    // Add smooth fade-in animation to success/error messages
    if (messageElement) {
      fadeInMessage(messageElement);
    }

    // Optional: Smooth scroll to message on form submission
    newsletterForm.addEventListener('submit', handleFormSubmit);
  }

  /**
   * Fade in success/error message
   */
  function fadeInMessage(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(-10px)';
    element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    // Trigger animation
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 100);
  }

  /**
   * Handle form submission (optional smooth scroll)
   */
  function handleFormSubmit(event) {
    // Let Shopify handle the actual submission
    // This just adds smooth scroll behavior
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
