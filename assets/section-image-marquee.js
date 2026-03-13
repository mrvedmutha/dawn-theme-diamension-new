(function() {
  'use strict';

  const initMarquee = (section) => {
    if (!section || typeof gsap === 'undefined') return;

    if (window.innerWidth <= 1024) {
      return;
    }

    const track = section.querySelector('.custom-section-image-marquee__track');
    if (!track) return;

    const items = Array.from(track.children);
    if (items.length === 0) return;

    const pauseOnHover = section.dataset.pauseOnHover === 'true';

    const cloneCount = Math.ceil(window.innerWidth / track.offsetWidth) + 2;

    for (let i = 0; i < cloneCount; i++) {
      items.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
    }

    const itemWidth = items[0].offsetWidth;
    const gap = 60;
    const totalWidth = (itemWidth + gap) * items.length;

    const pixelsPerSecond = 30;
    const duration = totalWidth / pixelsPerSecond;

    const animation = gsap.to(track, {
      x: -totalWidth,
      duration: duration,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    });

    if (pauseOnHover) {
      section.addEventListener('mouseenter', () => {
        gsap.to(animation, {
          timeScale: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      section.addEventListener('mouseleave', () => {
        gsap.to(animation, {
          timeScale: 1,
          duration: 0.3,
          ease: 'power2.in'
        });
      });
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const shouldAnimate = window.innerWidth > 1024;
        const hasAnimation = animation && animation.isActive !== undefined;

        if (!shouldAnimate && hasAnimation) {
          animation.kill();
          const allItems = Array.from(track.children);
          allItems.forEach((item, index) => {
            if (index >= items.length) {
              item.remove();
            }
          });
        } else if (shouldAnimate) {
          animation.kill();
          const allItems = Array.from(track.children);
          allItems.forEach((item, index) => {
            if (index >= items.length) {
              item.remove();
            }
          });
          initMarquee(section);
        }
      }, 250);
    });
  };

  const initAllMarquees = () => {
    const checkGSAP = setInterval(() => {
      if (typeof gsap !== 'undefined') {
        clearInterval(checkGSAP);

        const sections = document.querySelectorAll('.custom-section-image-marquee');
        sections.forEach(section => {
          initMarquee(section);
        });
      }
    }, 100);

    setTimeout(() => {
      clearInterval(checkGSAP);
      if (typeof gsap === 'undefined') {
        console.error('GSAP library failed to load. Marquee animation will not work.');
      }
    }, 5000);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllMarquees);
  } else {
    initAllMarquees();
  }

  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', (event) => {
      const section = event.target.querySelector('.custom-section-image-marquee');
      if (section) {
        setTimeout(() => initMarquee(section), 100);
      }
    });
  }

})();
