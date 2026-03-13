/**
 * Profile Signup Section JavaScript
 * Handles password visibility toggle and newsletter link functionality
 */

(function () {
  'use strict';

  // Initialize password toggle functionality
  function initPasswordToggle() {
    const passwordToggles = document.querySelectorAll('[data-password-toggle]');

    passwordToggles.forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();

        const passwordField = this.closest('.custom-section-profile-signup__field--password').querySelector(
          '.custom-section-profile-signup__input--password'
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

  // Initialize newsletter link smooth scroll
  function initNewsletterLink() {
    const newsletterLinks = document.querySelectorAll('[data-newsletter-link]');

    newsletterLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        // Try to find the newsletter section in the footer
        const newsletterSection = document.querySelector('.custom-diamension-footer__newsletter');

        if (newsletterSection) {
          // Smooth scroll to newsletter section
          newsletterSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });

          // Add temporary highlight effect
          newsletterSection.classList.add('newsletter-highlight');

          // Remove highlight after animation
          setTimeout(function () {
            newsletterSection.classList.remove('newsletter-highlight');
          }, 2000);

          // Focus on the newsletter input
          setTimeout(function () {
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
              block: 'start',
            });
          }
        }
      });
    });
  }

  // TODO: Check URL parameters for success redirect from Shopify
  // After successful signup, Shopify redirects back with ?signup_success=true
  function checkSignupSuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const signupSuccess = urlParams.get('signup_success');

    if (signupSuccess === 'true') {
      console.log('TODO: Signup success detected via URL parameter');

      // TODO: Remove the URL parameter first
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);

      const form = document.querySelector('.custom-section-profile-signup form[action*="customer"]');
      const formContainer = form ? form.querySelector('.custom-section-profile-signup__form') : null;
      const hasErrors = document.querySelector('.custom-section-profile-signup__errors');
      const sectionWrapper = document.querySelector('.custom-section-profile-signup__form-section');

      console.log('TODO: Debug - form found:', !!form);
      console.log('TODO: Debug - formContainer found:', !!formContainer);
      console.log('TODO: Debug - hasErrors:', !!hasErrors);
      console.log('TODO: Debug - sectionWrapper:', !!sectionWrapper);

      // If user is logged in after successful signup, form might not exist
      // So we create success UI in the section wrapper instead
      if (!form || !formContainer) {
        console.log('TODO: User likely logged in - form not found, showing success in section wrapper');
        if (sectionWrapper) {
          showSuccessInSection(sectionWrapper);
        } else {
          // Fallback - just redirect immediately
          console.log('TODO: Section wrapper not found, redirecting immediately');
          window.location.href = '/account';
        }
        return;
      }

      // Only show success if no errors are present
      if (formContainer && !hasErrors) {
        console.log('TODO: Showing success message in form');
        showSuccessAndRedirect(formContainer, null);
      } else {
        console.log('TODO: Not showing success - has errors or no container');
      }
    }
  }

  // TODO: Show success message in section when form doesn't exist (user logged in)
  function showSuccessInSection(sectionWrapper) {
    console.log('TODO: Creating success notification banner');

    // Find the form container or create a placeholder for the message
    const formContainer = sectionWrapper.querySelector('.custom-section-profile-signup__form-container');

    if (formContainer) {
      // Create success notification banner (similar to error messages)
      const successBanner = document.createElement('div');
      successBanner.className = 'custom-section-profile-signup__success';
      successBanner.style.cssText = `
        margin-bottom: 24px;
        animation: slideDown 0.3s ease-out;
      `;

      successBanner.innerHTML = `
        <div class="custom-section-profile-signup__progress-bar" style="width: 0%; transition: width 3s linear;"></div>
        <div class="custom-section-profile-signup__success-text">
          Account created successfully! Redirecting to your account...
        </div>
      `;

      // Insert after the header
      const header = formContainer.querySelector('.custom-section-profile-signup__header');
      if (header && header.nextSibling) {
        formContainer.insertBefore(successBanner, header.nextSibling);
      } else {
        formContainer.appendChild(successBanner);
      }

      // Start progress animation
      setTimeout(function () {
        const progressBar = successBanner.querySelector('.custom-section-profile-signup__progress-bar');
        if (progressBar) {
          progressBar.style.width = '100%';
        }
      }, 100);
    }

    // TODO: Redirect after 3 seconds
    setTimeout(function () {
      console.log('TODO: Redirecting to /account');
      window.location.href = '/account';
    }, 3000);
  }

  // Show success message and redirect
  function showSuccessAndRedirect(formContainer, submitButton) {
    console.log('TODO: Showing success notification banner in form');

    // Remove old messages
    const oldErrors = formContainer.querySelector('.custom-section-profile-signup__errors');
    const oldSuccess = formContainer.querySelector('.custom-section-profile-signup__success');
    const oldInfo = formContainer.querySelector('.custom-section-profile-signup__info');
    if (oldErrors) oldErrors.remove();
    if (oldSuccess) oldSuccess.remove();
    if (oldInfo) oldInfo.remove();

    // Get success text from data attribute
    const formWrapper = document.querySelector('.custom-section-profile-signup__form-wrapper');
    const successText =
      formWrapper && formWrapper.dataset.successText
        ? formWrapper.dataset.successText + ' Redirecting to your account...'
        : 'Account created successfully! Redirecting to your account...';

    // TODO: Create success notification banner (like error messages, but green)
    const successMessage = document.createElement('div');
    successMessage.className = 'custom-section-profile-signup__success';
    successMessage.style.cssText = 'animation: slideDown 0.3s ease-out;';
    successMessage.innerHTML = `
      <div class="custom-section-profile-signup__progress-bar"></div>
      <div class="custom-section-profile-signup__success-text">
        ${successText}
      </div>
    `;

    // Insert at top of form (like error messages)
    formContainer.insertBefore(successMessage, formContainer.firstChild);

    // Start progress bar animation
    const progressBar = successMessage.querySelector('.custom-section-profile-signup__progress-bar');
    setTimeout(function () {
      progressBar.classList.add('active');
    }, 100);

    // TODO: Keep form visible, just disable it
    const submitBtn = formContainer.querySelector('.custom-section-profile-signup__button');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Redirecting...';
    }

    // Disable all inputs
    const inputs = formContainer.querySelectorAll('input, button, a');
    inputs.forEach(function (input) {
      input.disabled = true;
    });

    // TODO: Redirect to account page after 3 seconds
    setTimeout(function () {
      window.location.href = '/account';
    }, 3000);
  }

  // Initialize success message handling (for page loads with form.posted_successfully?)
  function initSuccessHandling() {
    // TODO: Check for Liquid-rendered success messages OR URL parameter
    checkSignupSuccess();

    // Original logic for Liquid-rendered success messages
    const successMessage = document.querySelector('[data-success-message]');
    const progressBar = document.querySelector('[data-progress-bar]');
    const infoMessage = document.querySelector('.custom-section-profile-signup__info');

    // Only redirect if it's a success message (not an info/verification message)
    if (successMessage && progressBar && !infoMessage) {
      // Start progress bar animation
      setTimeout(function () {
        progressBar.classList.add('active');
      }, 100);

      // TODO: Redirect to account page after 3 seconds
      setTimeout(function () {
        window.location.href = '/account';
      }, 3000);
    }
  }

  // Initialize all functionality
  function init() {
    initPasswordToggle();
    initNewsletterLink();
    // TODO: No longer preventing form submission - let Shopify handle it with return_to parameter
    // initFormSubmission(); // REMOVED - Using native Shopify redirect flow
    initSuccessHandling();
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
      if (event.target.querySelector('.custom-section-profile-signup')) {
        init();
      }
    });
  }
})();
