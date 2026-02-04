/**
 * Two-Column Image Customiser - Modal Functionality
 * Handles Virtual Appointment (WhatsApp) and Request A Callback (Shopify Form) modals
 */

(function () {
  'use strict';

  // Country codes data
  const countryCodes = [
    { code: '+1', name: 'United States' },
    { code: '+1', name: 'Canada' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+91', name: 'India' },
    { code: '+61', name: 'Australia' },
    { code: '+971', name: 'United Arab Emirates' },
    { code: '+966', name: 'Saudi Arabia' },
    { code: '+974', name: 'Qatar' },
    { code: '+965', name: 'Kuwait' },
    { code: '+968', name: 'Oman' },
    { code: '+973', name: 'Bahrain' },
    { code: '+20', name: 'Egypt' },
    { code: '+27', name: 'South Africa' },
    { code: '+33', name: 'France' },
    { code: '+49', name: 'Germany' },
    { code: '+39', name: 'Italy' },
    { code: '+34', name: 'Spain' },
    { code: '+31', name: 'Netherlands' },
    { code: '+41', name: 'Switzerland' },
    { code: '+46', name: 'Sweden' },
    { code: '+47', name: 'Norway' },
    { code: '+45', name: 'Denmark' },
    { code: '+358', name: 'Finland' },
    { code: '+32', name: 'Belgium' },
    { code: '+43', name: 'Austria' },
    { code: '+351', name: 'Portugal' },
    { code: '+30', name: 'Greece' },
    { code: '+48', name: 'Poland' },
    { code: '+420', name: 'Czech Republic' },
    { code: '+36', name: 'Hungary' },
    { code: '+40', name: 'Romania' },
    { code: '+86', name: 'China' },
    { code: '+81', name: 'Japan' },
    { code: '+82', name: 'South Korea' },
    { code: '+65', name: 'Singapore' },
    { code: '+60', name: 'Malaysia' },
    { code: '+66', name: 'Thailand' },
    { code: '+63', name: 'Philippines' },
    { code: '+84', name: 'Vietnam' },
    { code: '+62', name: 'Indonesia' },
    { code: '+64', name: 'New Zealand' },
    { code: '+92', name: 'Pakistan' },
    { code: '+880', name: 'Bangladesh' },
    { code: '+94', name: 'Sri Lanka' },
    { code: '+98', name: 'Iran' },
    { code: '+90', name: 'Turkey' },
    { code: '+972', name: 'Israel' },
    { code: '+7', name: 'Russia' },
    { code: '+380', name: 'Ukraine' },
    { code: '+55', name: 'Brazil' },
    { code: '+52', name: 'Mexico' },
    { code: '+54', name: 'Argentina' },
    { code: '+56', name: 'Chile' },
    { code: '+57', name: 'Colombia' },
    { code: '+51', name: 'Peru' },
    { code: '+58', name: 'Venezuela' },
  ];

  /**
   * Initialize all modals on page load
   */
  function initModals() {
    // Get all section instances
    const sections = document.querySelectorAll('.custom-section-two-column-image-customiser');

    sections.forEach(section => {
      const sectionId = section.dataset.sectionId;

      // Get buttons
      const virtualBtn = section.querySelector('.custom-section-two-column-image-customiser__button--primary');
      const callbackBtn = section.querySelector('.custom-section-two-column-image-customiser__button--secondary');

      // Get modals
      const virtualModal = document.getElementById(`modal-virtual-${sectionId}`);
      const callbackModal = document.getElementById(`modal-callback-${sectionId}`);

      if (virtualBtn && virtualModal) {
        // Open modal on button click
        virtualBtn.addEventListener('click', () => {
          openModal(`modal-virtual-${sectionId}`);
        });

        // Setup virtual appointment modal
        setupVirtualAppointmentModal(sectionId);
      }

      if (callbackBtn && callbackModal) {
        // Open modal on button click
        callbackBtn.addEventListener('click', () => {
          openModal(`modal-callback-${sectionId}`);
        });

        // Setup callback modal
        setupCallbackModal(sectionId);
      }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
          closeModal(activeModal.id);
        }
      }
    });
  }

  /**
   * Open modal by ID
   */
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add('active');
    document.body.classList.add('modal-open');

    // Focus first input
    setTimeout(() => {
      const firstInput = modal.querySelector('input, textarea');
      if (firstInput) firstInput.focus();
    }, 100);
  }

  /**
   * Close modal by ID
   */
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove('active');
    document.body.classList.remove('modal-open');

    // Reset form after closing
    setTimeout(() => {
      const form = modal.querySelector('.modal-form');
      if (form) {
        form.reset();
        form.classList.remove('hidden');

        // Reapply default date and time values
        setDefaultDateTime(form);
      }

      // Reset submit button state
      const submitBtn = modal.querySelector('.modal-submit');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
      }

      // Hide error/success messages
      const error = modal.querySelector('.modal-error');
      const success = modal.querySelector('.modal-success');
      if (error) error.classList.remove('active');
      if (success) success.classList.remove('active');
    }, 300);
  }

  /**
   * Set default date and time values for a form
   */
  function setDefaultDateTime(form) {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentHour = now.getHours();
    const nextHour = (currentHour + 1) % 24;
    const defaultTime = `${String(nextHour).padStart(2, '0')}:00`;

    const dateInput = form.querySelector('input[type="date"]');
    const timeInput = form.querySelector('input[type="time"]');

    if (dateInput) {
      dateInput.value = today;
    }

    if (timeInput) {
      timeInput.value = defaultTime;
    }
  }

  /**
   * Setup Virtual Appointment Modal
   */
  function setupVirtualAppointmentModal(sectionId) {
    const modalId = `modal-virtual-${sectionId}`;
    const modal = document.getElementById(modalId);
    if (!modal) return;

    // Close button
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modalId));
    }

    // Overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modalId);
      }
    });

    // Form submit
    const form = modal.querySelector('.modal-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleVirtualAppointment(sectionId);
      });
    }
  }

  /**
   * Setup Callback Modal
   */
  function setupCallbackModal(sectionId) {
    const modalId = `modal-callback-${sectionId}`;
    const modal = document.getElementById(modalId);
    if (!modal) return;

    // Close button
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modalId));
    }

    // Overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modalId);
      }
    });

    // Setup country code dropdown
    setupCountryCodeDropdown(sectionId);

    // Set default country code to +91
    const countryCodeInput = modal.querySelector('.country-code-input');
    const hiddenCountryCode = modal.querySelector('input[name="country_code"]');
    if (countryCodeInput && hiddenCountryCode) {
      countryCodeInput.value = '+91';
      hiddenCountryCode.value = '+91';
    }

    // Form submit
    const form = modal.querySelector('.modal-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleCallbackRequest(sectionId);
      });
    }
  }

  /**
   * Setup Country Code Dropdown with Search
   */
  function setupCountryCodeDropdown(sectionId) {
    const modalId = `modal-callback-${sectionId}`;
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const input = modal.querySelector('.country-code-input');
    const resultsContainer = modal.querySelector('.country-code-results');
    const hiddenInput = modal.querySelector('input[name="country_code"]');

    if (!input || !resultsContainer || !hiddenInput) return;

    // Show all results on focus
    input.addEventListener('focus', () => {
      showCountryResults(resultsContainer, countryCodes, input, hiddenInput);
    });

    // Filter results on input
    input.addEventListener('input', () => {
      const query = input.value.toLowerCase().trim();
      if (query === '') {
        showCountryResults(resultsContainer, countryCodes, input, hiddenInput);
      } else {
        const filtered = countryCodes.filter(country =>
          country.code.toLowerCase().includes(query) ||
          country.name.toLowerCase().includes(query)
        );
        showCountryResults(resultsContainer, filtered, input, hiddenInput);
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !resultsContainer.contains(e.target)) {
        resultsContainer.classList.remove('active');
      }
    });
  }

  /**
   * Show country code results
   */
  function showCountryResults(container, results, input, hiddenInput) {
    container.innerHTML = '';

    if (results.length === 0) {
      container.innerHTML = '<div class="country-code-item">No results found</div>';
      container.classList.add('active');
      return;
    }

    results.forEach(country => {
      const item = document.createElement('div');
      item.className = 'country-code-item';
      item.textContent = country.code;
      item.dataset.code = country.code;
      item.dataset.name = country.name;

      item.addEventListener('click', () => {
        input.value = country.code;
        hiddenInput.value = country.code;
        container.classList.remove('active');
      });

      container.appendChild(item);
    });

    container.classList.add('active');
  }

  /**
   * Handle Virtual Appointment Form Submission (WhatsApp)
   */
  function handleVirtualAppointment(sectionId) {
    const modalId = `modal-virtual-${sectionId}`;
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const submitBtn = modal.querySelector('.modal-submit');

    // Get form data
    const firstName = modal.querySelector('input[name="first_name"]').value.trim();
    const lastName = modal.querySelector('input[name="last_name"]').value.trim();
    const date = modal.querySelector('input[name="date"]').value;
    const time = modal.querySelector('input[name="time"]').value;
    const message = modal.querySelector('textarea[name="message"]').value.trim();

    // Validate
    if (!firstName || !lastName || !date || !time) {
      showError(modalId, 'Please fill in all required fields.');
      return;
    }

    // Validate date/time is in the future
    if (!isDateTimeInFuture(date, time)) {
      showError(modalId, 'Please select a future date and time. The selected time has already passed.');
      return;
    }

    clearMessages(modalId);

    // Show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
    }

    // Format date for message
    const dateObj = new Date(date + 'T' + time);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    // Construct WhatsApp message for VIRTUAL APPOINTMENT
    let whatsappMessage = `*VIRTUAL APPOINTMENT REQUEST*\n\n`;
    whatsappMessage += `Hello Team,\n\n`;
    whatsappMessage += `My name is *${firstName} ${lastName}* and I would like to book an immediate virtual appointment.\n\n`;
    whatsappMessage += `*Preferred Date & Time:*\n`;
    whatsappMessage += `${formattedDate} at ${formattedTime}`;

    if (message) {
      whatsappMessage += `\n\n*My Requirements:*\n${message}`;
    }

    // Get WhatsApp number from data attribute
    const whatsappNumber = modal.dataset.whatsappNumber || '';

    if (!whatsappNumber) {
      showError(modalId, 'WhatsApp number not configured. Please contact support.');
      return;
    }

    // Construct WhatsApp URL
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');

    // Close modal after short delay
    setTimeout(() => {
      closeModal(modalId);
    }, 500);
  }

  /**
   * Handle Callback Request Form Submission (WhatsApp)
   */
  function handleCallbackRequest(sectionId) {
    const modalId = `modal-callback-${sectionId}`;
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const submitBtn = modal.querySelector('.modal-submit');

    // Get form data
    const firstName = modal.querySelector('input[name="first_name"]').value.trim();
    const lastName = modal.querySelector('input[name="last_name"]').value.trim();
    const email = modal.querySelector('input[name="email"]').value.trim();
    const countryCode = modal.querySelector('input[name="country_code"]').value.trim();
    const phone = modal.querySelector('input[name="phone"]').value.trim();
    const date = modal.querySelector('input[name="date"]').value;
    const time = modal.querySelector('input[name="time"]').value;
    const message = modal.querySelector('textarea[name="message"]').value.trim();

    // Validate
    if (!firstName || !lastName || !email || !countryCode || !phone || !date || !time) {
      showError(modalId, 'Please fill in all required fields.');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError(modalId, 'Please enter a valid email address.');
      return;
    }

    // Validate phone
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phone)) {
      showError(modalId, 'Please enter a valid phone number (numbers only).');
      return;
    }

    // Validate date/time is in the future
    if (!isDateTimeInFuture(date, time)) {
      showError(modalId, 'Please select a future date and time. The selected time has already passed.');
      return;
    }

    clearMessages(modalId);

    // Show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
    }

    // Format date for message
    const dateObj = new Date(date + 'T' + time);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    // Construct WhatsApp message for CALLBACK REQUEST
    let whatsappMessage = `*CALLBACK REQUEST*\n\n`;
    whatsappMessage += `Hello Team,\n\n`;
    whatsappMessage += `I would like to schedule a future appointment for a callback.\n\n`;
    whatsappMessage += `*My Details:*\n`;
    whatsappMessage += `Name: ${firstName} ${lastName}\n`;
    whatsappMessage += `Email: ${email}\n`;
    whatsappMessage += `Phone: ${countryCode}${phone}\n\n`;
    whatsappMessage += `*Preferred Date & Time:*\n`;
    whatsappMessage += `${formattedDate} at ${formattedTime}`;

    if (message) {
      whatsappMessage += `\n\n*Additional Details:*\n${message}`;
    }

    // Get WhatsApp number from data attribute
    const whatsappNumber = modal.dataset.whatsappNumber || '';

    if (!whatsappNumber) {
      showError(modalId, 'WhatsApp number not configured. Please contact support.');
      return;
    }

    // Construct WhatsApp URL
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');

    // Close modal after short delay
    setTimeout(() => {
      closeModal(modalId);
    }, 500);
  }

  /**
   * Show error message
   */
  function showError(modalId, message) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const errorBox = modal.querySelector('.modal-error');
    const errorText = modal.querySelector('.modal-error-text');

    if (errorBox && errorText) {
      errorText.textContent = message;
      errorBox.classList.add('active');

      // Scroll to top of modal
      const modalBody = modal.querySelector('.modal-body');
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
    }
  }

  /**
   * Show success message
   */
  function showSuccess(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const form = modal.querySelector('.modal-form');
    const success = modal.querySelector('.modal-success');

    if (form && success) {
      form.classList.add('hidden');
      success.classList.add('active');
    }
  }

  /**
   * Clear error and success messages
   */
  function clearMessages(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const errorBox = modal.querySelector('.modal-error');
    const success = modal.querySelector('.modal-success');

    if (errorBox) errorBox.classList.remove('active');
    if (success) success.classList.remove('active');
  }

  /**
   * Set minimum date to today and default values
   */
  function setMinimumDate() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const timeInputs = document.querySelectorAll('input[type="time"]');
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    dateInputs.forEach(input => {
      input.setAttribute('min', today);

      // Add change listener to validate time when date changes
      input.addEventListener('change', function() {
        const timeInput = this.closest('.modal-form').querySelector('input[type="time"]');
        if (timeInput) {
          validateDateTime(this, timeInput);
        }
      });
    });

    timeInputs.forEach(input => {
      // Add change listener to validate when time changes
      input.addEventListener('change', function() {
        const dateInput = this.closest('.modal-form').querySelector('input[type="date"]');
        if (dateInput) {
          validateDateTime(dateInput, this);
        }
      });
    });

    // Set default values for all forms
    document.querySelectorAll('.modal-form').forEach(form => {
      setDefaultDateTime(form);
    });
  }

  /**
   * Check if date/time is in the future
   */
  function isDateTimeInFuture(date, time) {
    if (!date || !time) return false;

    const now = new Date();
    const selectedDateTime = new Date(date + 'T' + time);

    // Add a small buffer (1 minute) to account for form submission time
    return selectedDateTime.getTime() > now.getTime() + (60 * 1000);
  }

  /**
   * Validate that selected date/time is in the future
   */
  function validateDateTime(dateInput, timeInput) {
    if (!dateInput.value || !timeInput.value) return;

    const selectedDate = dateInput.value;
    const selectedTime = timeInput.value;
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    // If selected date is today, check if time is in the future
    if (selectedDate === today) {
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const [selectedHour, selectedMinute] = selectedTime.split(':').map(Number);

      // Calculate total minutes for comparison
      const currentTotalMinutes = currentHour * 60 + currentMinute;
      const selectedTotalMinutes = selectedHour * 60 + selectedMinute;

      if (selectedTotalMinutes <= currentTotalMinutes) {
        // Time has passed, show error
        const modal = dateInput.closest('.modal-overlay');
        if (modal) {
          showError(modal.id, 'Please select a future time. The selected time has already passed.');
        }

        // Reset time to next hour
        const nextHour = (currentHour + 1) % 24;
        timeInput.value = `${String(nextHour).padStart(2, '0')}:00`;
      }
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initModals();
      setMinimumDate();
    });
  } else {
    initModals();
    setMinimumDate();
  }
})();
