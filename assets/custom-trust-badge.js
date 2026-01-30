(function() {
  const trustBadgeAnimations = new Map();

  function initTrustBadgeLottie() {
    // Check if Lottie is loaded
    if (typeof lottie === 'undefined') {
      console.error('Lottie library not loaded');
      // Retry after a short delay
      setTimeout(initTrustBadgeLottie, 100);
      return;
    }

    const lottieElements = document.querySelectorAll('.custom-section-trust-badge__lottie');

    if (lottieElements.length === 0) {
      console.log('No trust badge lottie elements found');
      return;
    }

    lottieElements.forEach((container) => {
      const lottieUrl = container.dataset.lottieUrl;
      const blockId = container.dataset.blockId;

      if (!lottieUrl) {
        console.log('No lottie URL found for block:', blockId);
        return;
      }

      // Get container size based on viewport
      const isMobile = window.innerWidth <= 767;
      const containerSize = isMobile ? 60 : 80;

      // Set container dimensions
      container.style.width = containerSize + 'px';
      container.style.height = containerSize + 'px';

      console.log('Loading Lottie animation:', lottieUrl);

      const animation = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: lottieUrl,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet',
          progressiveLoad: true,
          hideOnTransparent: true
        }
      });

      // Store animation reference
      trustBadgeAnimations.set(blockId, {
        animation: animation
      });

      // Log when animation is loaded
      animation.addEventListener('DOMLoaded', () => {
        console.log('Lottie animation loaded and playing for block:', blockId);
      });

      // Handle errors
      animation.addEventListener('data_failed', (error) => {
        console.error('Failed to load Lottie animation:', lottieUrl, error);
      });

      animation.addEventListener('config_ready', () => {
        console.log('Lottie config ready for block:', blockId);
      });
    });
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTrustBadgeLottie);
  } else {
    initTrustBadgeLottie();
  }

  // Reinitialize for Shopify theme editor
  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function(event) {
      // Clear existing animations
      trustBadgeAnimations.forEach((data) => {
        if (data.animation) {
          data.animation.destroy();
        }
      });
      trustBadgeAnimations.clear();
      // Reinitialize
      setTimeout(initTrustBadgeLottie, 100);
    });
    document.addEventListener('shopify:section:reorder', initTrustBadgeLottie);
  }
})();
