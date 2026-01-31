/**
 * Two Image Hero B2B Section - GSAP Animations
 * Description: Stagger text reveal animations on page load
 * Dependencies: GSAP (loaded from CDN)
 */

(function() {
  'use strict';

  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
      console.warn('GSAP is not loaded. Loading from CDN...');
      loadGSAP();
      return;
    }

    initAnimations();
  }

  function loadGSAP() {
    // Load GSAP from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';
    script.onload = function() {
      console.log('GSAP loaded successfully');
      initAnimations();
    };
    script.onerror = function() {
      console.error('Failed to load GSAP');
    };
    document.head.appendChild(script);
  }

  function initAnimations() {
    const section = document.querySelector('.custom-two-image-hero-b2b');
    if (!section) return;

    // Animation elements
    const leftHeading = section.querySelector('.custom-two-image-hero-b2b__left-heading');
    const rightDescription = section.querySelector('.custom-two-image-hero-b2b__right-description');
    const cta = section.querySelector('.custom-two-image-hero-b2b__cta');

    // Set initial states
    gsap.set([leftHeading, rightDescription, cta], {
      opacity: 0,
      y: 30
    });

    // Create timeline with stagger animations
    const timeline = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'power3.out'
      }
    });

    // Animate elements in sequence with stagger
    timeline
      .to(leftHeading, {
        opacity: 1,
        y: 0,
        duration: 1.2
      }, 0.3) // Start after 0.3s
      .to(rightDescription, {
        opacity: 1,
        y: 0,
        duration: 1
      }, 0.5) // Start after 0.5s
      .to(cta, {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, 0.7); // Start after 0.7s

    // Optional: Add hover animation to CTA
    if (cta) {
      cta.addEventListener('mouseenter', function() {
        gsap.to(cta, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      cta.addEventListener('mouseleave', function() {
        gsap.to(cta, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }
  }
})();
