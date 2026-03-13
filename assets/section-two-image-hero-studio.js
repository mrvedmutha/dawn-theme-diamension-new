document.addEventListener('DOMContentLoaded', function () {
  if (window.innerWidth < 768) return;

  const section = document.querySelector('.custom-section-two-image-hero-studio');
  if (!section) return;

  const tagline = section.querySelector('.custom-section-two-image-hero-studio__tagline');
  const cta = section.querySelector('.custom-section-two-image-hero-studio__cta');
  const heading = section.querySelector('.custom-section-two-image-hero-studio__heading');

  const elementsToAnimate = [tagline, cta, heading].filter(Boolean);

  if (elementsToAnimate.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          elementsToAnimate.forEach((element) => {
            element.classList.add('animate-in');
          });
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  observer.observe(section);
});
