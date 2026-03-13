(function() {
  'use strict';

  const initScrollAnimation = () => {
    const animatedElements = document.querySelectorAll('.custom-section-founders-vision__heading[data-animate], .custom-section-founders-vision__description[data-animate]');

    if (!animatedElements.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    animatedElements.forEach(element => {
      observer.observe(element);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimation);
  } else {
    initScrollAnimation();
  }

})();
