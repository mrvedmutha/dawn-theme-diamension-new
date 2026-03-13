(function () {
  const trustBadgeAnimations = new Map();

  function initTrustBadgeLottie() {
    if (typeof lottie === 'undefined') {
      setTimeout(initTrustBadgeLottie, 100);
      return;
    }

    const lottieElements = document.querySelectorAll('.custom-section-trust-badge__lottie');

    if (lottieElements.length === 0) {
      return;
    }

    lottieElements.forEach((container) => {
      const lottieUrl = container.dataset.lottieUrl;
      const blockId = container.dataset.blockId;

      if (!lottieUrl) {
        return;
      }

      const isMobile = window.innerWidth <= 767;
      const containerSize = isMobile ? 60 : 80;

      container.style.width = containerSize + 'px';
      container.style.height = containerSize + 'px';

      const animation = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: lottieUrl,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet',
          progressiveLoad: true,
          hideOnTransparent: true,
        },
      });

      trustBadgeAnimations.set(blockId, {
        animation: animation,
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTrustBadgeLottie);
  } else {
    initTrustBadgeLottie();
  }

  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function (event) {
      trustBadgeAnimations.forEach((data) => {
        if (data.animation) {
          data.animation.destroy();
        }
      });
      trustBadgeAnimations.clear();
      setTimeout(initTrustBadgeLottie, 100);
    });
    document.addEventListener('shopify:section:reorder', initTrustBadgeLottie);
  }
})();
