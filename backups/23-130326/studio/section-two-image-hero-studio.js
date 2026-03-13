/**
 * Two Image Hero - Studio Section
 * Scroll-triggered animations for desktop
 */

document.addEventListener('DOMContentLoaded', function () {
  // Only run animations on desktop (min-width: 768px)
  if (window.innerWidth < 768) return;

  const section = document.querySelector('.custom-section-two-image-hero-studio');
  if (!section) return;

  const tagline = section.querySelector('.custom-section-two-image-hero-studio__tagline');
  const cta = section.querySelector('.custom-section-two-image-hero-studio__cta');
  const heading = section.querySelector('.custom-section-two-image-hero-studio__heading');

  const elementsToAnimate = [tagline, cta, heading].filter(Boolean);

  if (elementsToAnimate.length === 0) return;

  // Intersection Observer to detect when section enters viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animate-in class to trigger animations
          elementsToAnimate.forEach((element) => {
            element.classList.add('animate-in');
          });
          // Unobserve after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // Trigger when 20% of section is visible
      rootMargin: '0px 0px -50px 0px', // Trigger slightly before section is fully in view
    }
  );

  observer.observe(section);
});
