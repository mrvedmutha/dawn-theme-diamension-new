(function () {
  'use strict';

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

  function initModals() {
    const sections = document.querySelectorAll('.custom-section-two-column-image-customiser');

    sections.forEach(section => {
      const sectionId = section.dataset.sectionId;

      const virtualBtn = section.querySelector('.custom-section-two-column-image-customiser__button--primary');
      const callbackBtn = section.querySelector('.custom-section-two-column-image-customiser__button--secondary');

      const virtualModal = document.getElementById(`modal-virtual-${sectionId}`);
      const callbackModal = document.getElementById(`modal-callback-${sectionId}`);

      if (virtualBtn && virtualModal) {
        virtualBtn.addEventListener('click', () => {
          openModal(`modal-virtual-${sectionId}`);
        });

        setupVirtualAppointmentModal(sectionId);
      }

      if (callbackBtn && callbackModal) {
        callbackBtn.addEventListener('click', () => {
          openModal(`modal-callback-${sectionId}`);
        });

        setupCallbackModal(sectionId);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
          closeModal(activeModal.id);
        }
      }
    });
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add('active');
    document.body.classList.add('modal-open');

    setTimeout(() => {
      const firstInput = modal.querySelector('input, textarea');
      if (firstInput) firstInput.focus();
    }, 100);
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove('active');
    document.body.classList.remove('modal-open');

    setTimeout(() => {
      const form = modal.querySelector('.modal-form');
      if (form) {
        form.reset();
        form.classList.remove('hidden');

        setDefaultDateTime(form);
      }

      const submitBtn = modal.querySelector('.modal-submit');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
      }

      const error = modal.querySelector('.modal-error');
      const success = modal.querySelector('.modal-success');
      if (error) error.classList.remove('active');
      if (success) success.classList.remove('active');
    }, 300);
  }

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

  function setupVirtualAppointmentModal(sectionId) {
    const modalId = `modal-virtual-${sectionId}`;
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modalId));
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modalId);
      }
    });

    const form = modal.querySelector('.modal-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleVirtualAppointment(sectionId);
      });
    }
  }

  function setupCallbackModal(sectionId) {
    const modalId = `modal-callback-${sectionId}`;
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modalId));
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modalId);
      }
    });

    setupCountryCodeDropdown(sectionId);

    const countryCodeInput = modal.querySelector('.country-code-input');
    const hiddenCountryCode = modal.querySelector('input[name="country_code"]');
    if (countryCodeInput && hiddenCountryCode) {
      countryCodeInput.value = '+91';
      hiddenCountryCode.value = '+91';
    }

    const form = modal.querySelector('.modal-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleCallbackRequest(sectionId);
      });
    }
  }

  function setupCountryCodeDropdown(sectionId) {
    const modalId = `modal-callback-${sectionId}`;
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const input = modal.querySelector('.country-code-input');
    const resultsContainer = modal.querySelector('.country-code-results');
    const hiddenInput = modal.querySelector('input[name="country_code"]');

    if (!input || !resultsContainer || !hiddenInput) return;

    input.addEventListener('focus', () => {
      showCountryResults(resultsContainer, countryCodes, input, hiddenInput);
    });

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

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !resultsContainer.contains(e.target)) {
        resultsContainer.classList.remove('active');
      }
    });
  }

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

  function handleVirtualAppointment(sectionId) {
    const modalId = `modal-virtual-${sectionId}`;
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const submitBtn = modal.querySelector('.modal-submit');

    const firstName = modal.querySelector('input[name="first_name"]').value.trim();
    const lastName = modal.querySelector('input[name="last_name"]').value.trim();
    const date = modal.querySelector('input[name="date"]').value;
    const time = modal.querySelector('input[name="time"]').value;
    const message = modal.querySelector('textarea[name="message"]').value.trim();

    if (!firstName || !lastName || !date || !time) {
      showError(modalId, 'Please fill in all required fields.');
      return;
    }

    if (!isDateTimeInFuture(date, time)) {
      showError(modalId, 'Please select a future date and time. The selected time has already passed.');
      return;
    }

    clearMessages(modalId);

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
    }

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

    let whatsappMessage = `*VIRTUAL APPOINTMENT REQUEST*\n\n`;
    whatsappMessage += `Hello Team,\n\n`;
    whatsappMessage += `My name is *${firstName} ${lastName}* and I would like to book an immediate virtual appointment.\n\n`;
    whatsappMessage += `*Preferred Date & Time:*\n`;
    whatsappMessage += `${formattedDate} at ${formattedTime}`;

    if (message) {
      whatsappMessage += `\n\n*My Requirements:*\n${message}`;
    }

    const whatsappNumber = modal.dataset.whatsappNumber || '';

    if (!whatsappNumber) {
      showError(modalId, 'WhatsApp number not configured. Please contact support.');
      return;
    }

    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      closeModal(modalId);
    }, 500);
  }

  function handleCallbackRequest(sectionId) {
    const modalId = `modal-callback-${sectionId}`;
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const submitBtn = modal.querySelector('.modal-submit');

    const firstName = modal.querySelector('input[name="first_name"]').value.trim();
    const lastName = modal.querySelector('input[name="last_name"]').value.trim();
    const email = modal.querySelector('input[name="email"]').value.trim();
    const countryCode = modal.querySelector('input[name="country_code"]').value.trim();
    const phone = modal.querySelector('input[name="phone"]').value.trim();
    const date = modal.querySelector('input[name="date"]').value;
    const time = modal.querySelector('input[name="time"]').value;
    const message = modal.querySelector('textarea[name="message"]').value.trim();

    if (!firstName || !lastName || !email || !countryCode || !phone || !date || !time) {
      showError(modalId, 'Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError(modalId, 'Please enter a valid email address.');
      return;
    }

    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phone)) {
      showError(modalId, 'Please enter a valid phone number (numbers only).');
      return;
    }

    if (!isDateTimeInFuture(date, time)) {
      showError(modalId, 'Please select a future date and time. The selected time has already passed.');
      return;
    }

    clearMessages(modalId);

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
    }

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

    const whatsappNumber = modal.dataset.whatsappNumber || '';

    if (!whatsappNumber) {
      showError(modalId, 'WhatsApp number not configured. Please contact support.');
      return;
    }

    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      closeModal(modalId);
    }, 500);
  }

  function showError(modalId, message) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const errorBox = modal.querySelector('.modal-error');
    const errorText = modal.querySelector('.modal-error-text');

    if (errorBox && errorText) {
      errorText.textContent = message;
      errorBox.classList.add('active');

      const modalBody = modal.querySelector('.modal-body');
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
    }
  }

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

  function clearMessages(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const errorBox = modal.querySelector('.modal-error');
    const success = modal.querySelector('.modal-success');

    if (errorBox) errorBox.classList.remove('active');
    if (success) success.classList.remove('active');
  }

  function setMinimumDate() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const timeInputs = document.querySelectorAll('input[type="time"]');
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    dateInputs.forEach(input => {
      input.setAttribute('min', today);

      input.addEventListener('change', function() {
        const timeInput = this.closest('.modal-form').querySelector('input[type="time"]');
        if (timeInput) {
          validateDateTime(this, timeInput);
        }
      });
    });

    timeInputs.forEach(input => {
      input.addEventListener('change', function() {
        const dateInput = this.closest('.modal-form').querySelector('input[type="date"]');
        if (dateInput) {
          validateDateTime(dateInput, this);
        }
      });
    });

    document.querySelectorAll('.modal-form').forEach(form => {
      setDefaultDateTime(form);
    });
  }

  function isDateTimeInFuture(date, time) {
    if (!date || !time) return false;

    const now = new Date();
    const selectedDateTime = new Date(date + 'T' + time);

    return selectedDateTime.getTime() > now.getTime() + (60 * 1000);
  }

  function validateDateTime(dateInput, timeInput) {
    if (!dateInput.value || !timeInput.value) return;

    const selectedDate = dateInput.value;
    const selectedTime = timeInput.value;
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    if (selectedDate === today) {
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const [selectedHour, selectedMinute] = selectedTime.split(':').map(Number);

      const currentTotalMinutes = currentHour * 60 + currentMinute;
      const selectedTotalMinutes = selectedHour * 60 + selectedMinute;

      if (selectedTotalMinutes <= currentTotalMinutes) {
        const modal = dateInput.closest('.modal-overlay');
        if (modal) {
          showError(modal.id, 'Please select a future time. The selected time has already passed.');
        }

        const nextHour = (currentHour + 1) % 24;
        timeInput.value = `${String(nextHour).padStart(2, '0')}:00`;
      }
    }
  }

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
