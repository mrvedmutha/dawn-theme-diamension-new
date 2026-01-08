/**
 * Profile Signup Section JavaScript
 * Handles password visibility toggle and newsletter link functionality
 */

(function() {
  'use strict';

  // Initialize password toggle functionality
  function initPasswordToggle() {
    const passwordToggles = document.querySelectorAll('[data-password-toggle]');

    passwordToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();

        const passwordField = this.closest('.custom-section-profile-signup__field--password')
          .querySelector('.custom-section-profile-signup__input--password');

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

  // Initialize newsletter link smooth scroll
  function initNewsletterLink() {
    const newsletterLinks = document.querySelectorAll('[data-newsletter-link]');

    newsletterLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();

        // Try to find the newsletter section in the footer
        const newsletterSection = document.querySelector('.custom-diamension-footer__newsletter');

        if (newsletterSection) {
          // Smooth scroll to newsletter section
          newsletterSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });

          // Add temporary highlight effect
          newsletterSection.classList.add('newsletter-highlight');

          // Remove highlight after animation
          setTimeout(function() {
            newsletterSection.classList.remove('newsletter-highlight');
          }, 2000);

          // Focus on the newsletter input
          setTimeout(function() {
            const newsletterInput = newsletterSection.querySelector('input[type="email"]');
            if (newsletterInput) {
              newsletterInput.focus();
            }
          }, 600);
        } else {
          // Fallback: scroll to footer if newsletter section not found
          const footer = document.querySelector('footer');
          if (footer) {
            footer.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  // Initialize all functionality
  function init() {
    initPasswordToggle();
    initNewsletterLink();
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
      if (event.target.querySelector('.custom-section-profile-signup')) {
        init();
      }
    });
  }
})();
