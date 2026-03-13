(function () {
  'use strict';

  function initLabGrownHeroB2B() {
    const sections = document.querySelectorAll('.custom-section-lab-grown-hero-b2b');

    sections.forEach((section) => {
      initSplitHeading(section);
      initScrollAnimations(section);
    });
  }

  function initSplitHeading(section) {
    const heading = section.querySelector('.custom-section-lab-grown-hero-b2b__heading');
    const headingWrapper = section.querySelector('.custom-section-lab-grown-hero-b2b__heading-wrapper');

    if (!heading || !headingWrapper) return;

    if (window.innerWidth <= 767) return;

    const text = heading.getAttribute('data-text');
    if (!text) return;

    const lines = splitTextIntoLines(text);

    if (lines.length !== 3) {
      console.warn('Expected 3 lines for split heading, got:', lines.length);
      return;
    }

    const existingLines = headingWrapper.querySelectorAll('.custom-section-lab-grown-hero-b2b__heading-line');
    existingLines.forEach((line) => line.remove());

    lines.forEach((lineText, index) => {
      const lineElement = document.createElement('span');
      lineElement.className = `custom-section-lab-grown-hero-b2b__heading-line custom-section-lab-grown-hero-b2b__heading-line--${index + 1}`;
      lineElement.textContent = lineText;
      lineElement.setAttribute('data-line', index + 1);

      headingWrapper.appendChild(lineElement);
    });
  }

  function splitTextIntoLines(text) {
    const words = text.trim().split(/\s+/);

    if (words.length <= 3) {
      return words;
    }

    const line1 = words.slice(0, 2).join(' ');
    const line2 = words.slice(2, 4).join(' ');
    const line3 = words.slice(4).join(' ');

    return [line1, line2, line3];
  }

  function initScrollAnimations(section) {
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not loaded, animations will not run');
      return;
    }

    if (typeof ScrollTrigger === 'undefined') {
      console.warn('ScrollTrigger not loaded, animations will not run');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const logo = section.querySelector('.custom-section-lab-grown-hero-b2b__logo');
    const headingLines = section.querySelectorAll('.custom-section-lab-grown-hero-b2b__heading-line');
    const mobileHeading = section.querySelector('.custom-section-lab-grown-hero-b2b__heading');
    const image = section.querySelector('.custom-section-lab-grown-hero-b2b__image');
    const richtext = section.querySelector('.custom-section-lab-grown-hero-b2b__richtext');
    const paragraphs = richtext ? richtext.querySelectorAll('p') : [];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none none',
      },
    });

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

    if (headingLines.length === 3 && window.innerWidth > 767) {
      gsap.set(headingLines, {
        opacity: 0,
        y: 50,
      });

      tl.to(headingLines, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
      }, 0.3);
    } else if (mobileHeading && window.innerWidth <= 767) {
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

    if (image) {
      gsap.set(image, {
        opacity: 0,
      });

      tl.to(image, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }, 0.9);
    }

    if (paragraphs.length > 0) {
      gsap.set(paragraphs, {
        opacity: 0,
        y: 30,
      });

      tl.to(paragraphs, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      }, 1.2);
    }
  }

  function handleResize() {
    clearTimeout(window.labGrownHeroResizeTimer);
    window.labGrownHeroResizeTimer = setTimeout(() => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && trigger.vars.trigger.classList.contains('custom-section-lab-grown-hero-b2b')) {
          trigger.kill();
        }
      });

      initLabGrownHeroB2B();
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLabGrownHeroB2B);
  } else {
    initLabGrownHeroB2B();
  }

  window.addEventListener('resize', handleResize);

  if (typeof Shopify !== 'undefined' && Shopify.designMode) {
    document.addEventListener('shopify:section:load', function (event) {
      if (event.target.classList.contains('custom-section-lab-grown-hero-b2b')) {
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
