(function () {
  'use strict';

  function initPasswordToggle() {
    const passwordToggles = document.querySelectorAll('[data-password-toggle]');

    passwordToggles.forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();

        const passwordField = this.closest('.custom-section-profile-signup__field--password').querySelector(
          '.custom-section-profile-signup__input--password'
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

  function initNewsletterLink() {
    const newsletterLinks = document.querySelectorAll('[data-newsletter-link]');

    newsletterLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        const newsletterSection = document.querySelector('.custom-diamension-footer__newsletter');

        if (newsletterSection) {
          newsletterSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });

          newsletterSection.classList.add('newsletter-highlight');

          setTimeout(function () {
            newsletterSection.classList.remove('newsletter-highlight');
          }, 2000);

          setTimeout(function () {
            const newsletterInput = newsletterSection.querySelector('input[type="email"]');
            if (newsletterInput) {
              newsletterInput.focus();
            }
          }, 600);
        } else {
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

  function checkSignupSuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const signupSuccess = urlParams.get('signup_success');

    if (signupSuccess === 'true') {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);

      const form = document.querySelector('.custom-section-profile-signup form[action*="customer"]');
      const formContainer = form ? form.querySelector('.custom-section-profile-signup__form') : null;
      const hasErrors = document.querySelector('.custom-section-profile-signup__errors');
      const sectionWrapper = document.querySelector('.custom-section-profile-signup__form-section');

      if (!form || !formContainer) {
        if (sectionWrapper) {
          showSuccessInSection(sectionWrapper);
        } else {
          window.location.href = '/account';
        }
        return;
      }

      if (formContainer && !hasErrors) {
        showSuccessAndRedirect(formContainer, null);
      }
    }
  }

  function showSuccessInSection(sectionWrapper) {
    const formContainer = sectionWrapper.querySelector('.custom-section-profile-signup__form-container');

    if (formContainer) {
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

      const header = formContainer.querySelector('.custom-section-profile-signup__header');
      if (header && header.nextSibling) {
        formContainer.insertBefore(successBanner, header.nextSibling);
      } else {
        formContainer.appendChild(successBanner);
      }

      setTimeout(function () {
        const progressBar = successBanner.querySelector('.custom-section-profile-signup__progress-bar');
        if (progressBar) {
          progressBar.style.width = '100%';
        }
      }, 100);
    }

    setTimeout(function () {
      window.location.href = '/account';
    }, 3000);
  }

  function showSuccessAndRedirect(formContainer, submitButton) {
    const oldErrors = formContainer.querySelector('.custom-section-profile-signup__errors');
    const oldSuccess = formContainer.querySelector('.custom-section-profile-signup__success');
    const oldInfo = formContainer.querySelector('.custom-section-profile-signup__info');
    if (oldErrors) oldErrors.remove();
    if (oldSuccess) oldSuccess.remove();
    if (oldInfo) oldInfo.remove();

    const formWrapper = document.querySelector('.custom-section-profile-signup__form-wrapper');
    const successText =
      formWrapper && formWrapper.dataset.successText
        ? formWrapper.dataset.successText + ' Redirecting to your account...'
        : 'Account created successfully! Redirecting to your account...';

    const successMessage = document.createElement('div');
    successMessage.className = 'custom-section-profile-signup__success';
    successMessage.style.cssText = 'animation: slideDown 0.3s ease-out;';
    successMessage.innerHTML = `
      <div class="custom-section-profile-signup__progress-bar"></div>
      <div class="custom-section-profile-signup__success-text">
        ${successText}
      </div>
    `;

    formContainer.insertBefore(successMessage, formContainer.firstChild);

    const progressBar = successMessage.querySelector('.custom-section-profile-signup__progress-bar');
    setTimeout(function () {
      progressBar.classList.add('active');
    }, 100);

    const submitBtn = formContainer.querySelector('.custom-section-profile-signup__button');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Redirecting...';
    }

    const inputs = formContainer.querySelectorAll('input, button, a');
    inputs.forEach(function (input) {
      input.disabled = true;
    });

    setTimeout(function () {
      window.location.href = '/account';
    }, 3000);
  }

  function initSuccessHandling() {
    checkSignupSuccess();

    const successMessage = document.querySelector('[data-success-message]');
    const progressBar = document.querySelector('[data-progress-bar]');
    const infoMessage = document.querySelector('.custom-section-profile-signup__info');

    if (successMessage && progressBar && !infoMessage) {
      setTimeout(function () {
        progressBar.classList.add('active');
      }, 100);

      setTimeout(function () {
        window.location.href = '/account';
      }, 3000);
    }
  }

  function init() {
    initPasswordToggle();
    initNewsletterLink();
    initSuccessHandling();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function (event) {
      if (event.target.querySelector('.custom-section-profile-signup')) {
        init();
      }
    });
  }
})();
