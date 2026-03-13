(function() {
  'use strict';

  const initEditorialHero = () => {
    const sections = document.querySelectorAll('.custom-section-editorial-hero');

    if (!sections.length) return;

    const observerOptions = {
      root: null,
      threshold: 0.2,
      rootMargin: '0px'
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;

          const heading = section.querySelector('.custom-section-editorial-hero__heading');
          const tagline = section.querySelector('.custom-section-editorial-hero__tagline');
          const cta = section.querySelector('.custom-section-editorial-hero__cta');

          if (heading) heading.classList.add('is-visible');
          if (tagline) tagline.classList.add('is-visible');
          if (cta) cta.classList.add('is-visible');

          observer.unobserve(section);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEditorialHero);
  } else {
    initEditorialHero();
  }

})();
