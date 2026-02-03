/**
 * Lab-Grown Hero B2B Section JavaScript
 * Handles split heading text positioning and GSAP scroll animations
 * Figma Node: 620-78
 */

(function () {
  'use strict';

  /**
   * Initialize the section
   */
  function initLabGrownHeroB2B() {
    const sections = document.querySelectorAll('.custom-section-lab-grown-hero-b2b');

    sections.forEach((section) => {
      initSplitHeading(section);
      initScrollAnimations(section);
    });
  }

  /**
   * Split heading into 3 lines with specific positioning
   * @param {HTMLElement} section - The section element
   */
  function initSplitHeading(section) {
    const heading = section.querySelector('.custom-section-lab-grown-hero-b2b__heading');
    const headingWrapper = section.querySelector('.custom-section-lab-grown-hero-b2b__heading-wrapper');

    if (!heading || !headingWrapper) return;

    // Only split on desktop/tablet (above 767px)
    if (window.innerWidth <= 767) return;

    const text = heading.getAttribute('data-text');
    if (!text) return;

    // Split the text intelligently
    const lines = splitTextIntoLines(text);

    if (lines.length !== 3) {
      console.warn('Expected 3 lines for split heading, got:', lines.length);
      return;
    }

    // Clear existing split lines if any
    const existingLines = headingWrapper.querySelectorAll('.custom-section-lab-grown-hero-b2b__heading-line');
    existingLines.forEach((line) => line.remove());

    // Create and append the 3 split lines
    lines.forEach((lineText, index) => {
      const lineElement = document.createElement('span');
      lineElement.className = `custom-section-lab-grown-hero-b2b__heading-line custom-section-lab-grown-hero-b2b__heading-line--${index + 1}`;
      lineElement.textContent = lineText;
      lineElement.setAttribute('data-line', index + 1);

      headingWrapper.appendChild(lineElement);
    });
  }

  /**
   * Split text into 3 lines based on word count
   * Tries to match the pattern: "Leading The" / "Evolution of" / "Lab-Grown Brilliance"
   * @param {string} text - The heading text
   * @returns {string[]} Array of 3 line texts
   */
  function splitTextIntoLines(text) {
    const words = text.trim().split(/\s+/);

    // Default split logic:
    // Line 1: First 2 words
    // Line 2: Next 2 words
    // Line 3: Remaining words

    if (words.length <= 3) {
      // If too few words, just use them as-is
      return words;
    }

    const line1 = words.slice(0, 2).join(' ');
    const line2 = words.slice(2, 4).join(' ');
    const line3 = words.slice(4).join(' ');

    return [line1, line2, line3];
  }

  /**
   * Initialize GSAP ScrollTrigger animations
   * @param {HTMLElement} section - The section element
   */
  function initScrollAnimations(section) {
    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not loaded, animations will not run');
      return;
    }

    if (typeof ScrollTrigger === 'undefined') {
      console.warn('ScrollTrigger not loaded, animations will not run');
      return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Get animation elements
    const logo = section.querySelector('.custom-section-lab-grown-hero-b2b__logo');
    const headingLines = section.querySelectorAll('.custom-section-lab-grown-hero-b2b__heading-line');
    const mobileHeading = section.querySelector('.custom-section-lab-grown-hero-b2b__heading');
    const image = section.querySelector('.custom-section-lab-grown-hero-b2b__image');
    const richtext = section.querySelector('.custom-section-lab-grown-hero-b2b__richtext');
    const paragraphs = richtext ? richtext.querySelectorAll('p') : [];

    // Create a master timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%', // Start when section is 80% from top of viewport
        end: 'top 20%',
        toggleActions: 'play none none none',
        // markers: true, // Uncomment for debugging
      },
    });

    // 1. Logo watermark animation - slide in from right
    if (logo) {
      gsap.set(logo, {
        x: 100,
        opacity: 0,
      });

      tl.to(logo, {
        x: 0,
        opacity: 0.03,
        duration: 1.2,
        ease: 'power3.out',
      }, 0);
    }

    // 2. Heading lines animation - simple fade in from bottom with stagger
    if (headingLines.length === 3 && window.innerWidth > 767) {
      // Set initial state for all lines
      gsap.set(headingLines, {
        opacity: 0,
        y: 50, // Start 50px below
      });

      // Animate all lines with stagger
      tl.to(headingLines, {
        opacity: 1,
        y: 0, // Move to CSS-defined position
        duration: 1,
        stagger: 0.2, // 0.2s delay between each line
        ease: 'power2.out',
      }, 0.3);
    } else if (mobileHeading && window.innerWidth <= 767) {
      // Mobile heading animation - simple fade in
      gsap.set(mobileHeading, {
        opacity: 0,
        y: 30,
      });

      tl.to(mobileHeading, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      }, 0.3);
    }

    // 3. Image animation - opacity fade in
    if (image) {
      gsap.set(image, {
        opacity: 0,
      });

      tl.to(image, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }, 0.9); // Start after heading animations
    }

    // 4. Content paragraphs animation - fade in from top with stagger
    if (paragraphs.length > 0) {
      gsap.set(paragraphs, {
        opacity: 0,
        y: 30,
      });

      tl.to(paragraphs, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2, // 0.2s delay between each paragraph
        ease: 'power2.out',
      }, 1.2); // Start after image animation
    }
  }

  /**
   * Handle window resize - reinitialize
   */
  function handleResize() {
    // Debounce resize events
    clearTimeout(window.labGrownHeroResizeTimer);
    window.labGrownHeroResizeTimer = setTimeout(() => {
      // Kill existing ScrollTriggers for this section
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && trigger.vars.trigger.classList.contains('custom-section-lab-grown-hero-b2b')) {
          trigger.kill();
        }
      });

      // Reinitialize
      initLabGrownHeroB2B();
    }, 250);
  }

  /**
   * Initialize on DOM ready
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLabGrownHeroB2B);
  } else {
    initLabGrownHeroB2B();
  }

  /**
   * Reinitialize on window resize
   */
  window.addEventListener('resize', handleResize);

  /**
   * Reinitialize on Shopify section load (theme editor)
   */
  if (typeof Shopify !== 'undefined' && Shopify.designMode) {
    document.addEventListener('shopify:section:load', function (event) {
      if (event.target.classList.contains('custom-section-lab-grown-hero-b2b')) {
        // Kill existing ScrollTriggers
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === event.target) {
            trigger.kill();
          }
        });

        setTimeout(() => {
          initLabGrownHeroB2B();
        }, 100);
      }
    });
  }
})();
