class DiamensionHeader {
  constructor() {
    this.header = document.querySelector('[data-header]');
    this.behavior = this.header?.dataset.headerBehavior || 'auto';
    this.hamburger = document.querySelector('[data-hamburger]');
    this.mobileMenu = document.querySelector('[data-mobile-menu]');
    this.scrollThreshold = 820;
    this.lastScrollPosition = 0;
    this.isScrolled = false;
    this.isMenuOpen = false;

    this.transparentSticky = document.querySelector('[data-transparent-sticky]');
    this.stickyHamburger = document.querySelector('[data-hamburger-sticky]');

    if (this.header) {
      this.init();
    }
  }

  init() {
    this.setInitialState();
    this.handleScroll();
    this.attachEventListeners();
    this.updateCartCount();
    this.initNavigationUnderlines();
  }

  attachEventListeners() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    document.addEventListener('cart:updated', () => {
      this.updateCartCount();
    });

    if (this.hamburger && this.mobileMenu) {
      this.hamburger.addEventListener('click', () => {
        this.toggleMobileMenu();
      });

      const closeButton = document.querySelector('[data-mobile-close]');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          this.closeMobileMenu();
        });
      }

      const mobileLinks = this.mobileMenu.querySelectorAll('a');
      mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
          this.closeMobileMenu();
        });
      });
    }

    if (this.stickyHamburger && this.mobileMenu) {
      this.stickyHamburger.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      this.openMobileMenu();
    } else {
      this.closeMobileMenu();
    }
  }

  openMobileMenu() {
    this.mobileMenu.classList.add('is-open');
    this.header.classList.add('diamension-header--menu-open');
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    this.mobileMenu.classList.remove('is-open');
    this.header.classList.remove('diamension-header--menu-open');
    document.body.style.overflow = '';
  }

  setInitialState() {
    if (this.behavior === 'solid') {
      this.header.classList.add('diamension-header--scrolled');
      this.header.classList.add('diamension-header--solid-layout');
      this.header.classList.remove('diamension-header--transparent-layout');
      this.isScrolled = true;
    } else {
      this.header.classList.remove('diamension-header--solid-layout');
      this.header.classList.add('diamension-header--transparent-layout');
    }
  }

  handleScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const scrollingDown = scrollPosition > this.lastScrollPosition;
    const scrollingUp = scrollPosition < this.lastScrollPosition;

    if (this.behavior === 'solid') {
      if (scrollPosition > 10) {
        this.header.classList.add('diamension-header--scrolling');
      } else {
        this.header.classList.remove('diamension-header--scrolling');
      }

      if (scrollingDown && scrollPosition > this.scrollThreshold) {
        this.header.classList.add('diamension-header--hidden');
      }

      if (scrollingUp) {
        this.header.classList.remove('diamension-header--hidden');
      }
    }

    if (this.behavior === 'auto') {
      if (scrollPosition <= this.scrollThreshold) {
        this.header.classList.remove('diamension-header--hidden');
        if (this.transparentSticky) {
          this.transparentSticky.classList.remove('is-visible');
        }
      } else {
        if (scrollingDown) {
          this.header.classList.add('diamension-header--hidden');
          if (this.transparentSticky) {
            this.transparentSticky.classList.remove('is-visible');
          }
        } else if (scrollingUp) {
          this.header.classList.add('diamension-header--hidden');
          if (this.transparentSticky) {
            this.transparentSticky.classList.add('is-visible');
          }
        }
      }
    }

    this.lastScrollPosition = scrollPosition;
  }

  async updateCartCount() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      const cartCountElement = document.querySelector('[data-cart-count]');
      const cartCountStickyElement = document.querySelector('[data-cart-count-sticky]');

      if (cartCountElement) {
        cartCountElement.textContent = cart.item_count > 0 ? cart.item_count : '';
      }

      if (cartCountStickyElement) {
        cartCountStickyElement.textContent = cart.item_count > 0 ? cart.item_count : '';
      }
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  }

  initNavigationUnderlines() {
    const mainNavLinks = this.header.querySelectorAll('.diamension-header__nav-link');
    const stickyNavLinks = this.transparentSticky?.querySelectorAll('.diamension-header__nav-link') || [];
    const mobileNavLinks = document.querySelectorAll('.diamension-header__mobile-nav-link');

    const currentPath = window.location.pathname;

    const isActiveLink = (link) => {
      const linkHref = link.getAttribute('href');

      if (!linkHref || linkHref === '#' || linkHref.startsWith('#')) {
        return false;
      }

      const linkPath = new URL(link.href).pathname;
      return currentPath === linkPath || (linkPath !== '/' && currentPath.startsWith(linkPath));
    };

    const setupHoverAnimation = (link) => {
      if (typeof gsap === 'undefined') {
        console.warn('GSAP is not loaded. Underline animations will not work.');
        return;
      }

      link.addEventListener('mouseenter', () => {
        if (link.classList.contains('is-active')) return;

        gsap.fromTo(
          link,
          {
            '--after-left': '0%',
            '--after-width': '0%',
          },
          {
            '--after-left': '0%',
            '--after-width': '100%',
            duration: 0.3,
            ease: 'power2.out',
          },
        );
      });

      link.addEventListener('mouseleave', () => {
        if (link.classList.contains('is-active')) return;

        gsap.to(link, {
          '--after-left': '100%',
          '--after-width': '0%',
          duration: 0.3,
          ease: 'power2.in',
        });
      });
    };

    mainNavLinks.forEach((link) => {
      if (isActiveLink(link)) {
        link.classList.add('is-active');
      }
      setupHoverAnimation(link);
    });

    stickyNavLinks.forEach((link) => {
      if (isActiveLink(link)) {
        link.classList.add('is-active');
      }
      setupHoverAnimation(link);
    });

    mobileNavLinks.forEach((link) => {
      if (isActiveLink(link)) {
        link.classList.add('is-active');
      }
      setupHoverAnimation(link);
    });
  }
}

class DiamensionSearch {
  constructor() {
    this.overlay = document.querySelector('[data-search-overlay]');
    this.toggleButton = document.querySelector('[data-search-toggle]');
    this.toggleButtonSticky = document.querySelector('[data-search-toggle-sticky]');
    this.backdrop = document.querySelector('[data-search-backdrop]');
    this.searchInput = document.querySelector('[data-search-input]');
    this.searchForm = document.querySelector('[data-search-form]');
    this.resultsContainer = document.querySelector('[data-search-products]');
    this.loadingElement = document.querySelector('[data-search-loading]');
    this.noResultsElement = document.querySelector('[data-search-no-results]');
    this.viewMoreElement = document.querySelector('[data-search-view-more]');
    this.viewMoreLink = document.querySelector('[data-search-view-more-link]');

    this.isOpen = false;
    this.isTransitioning = false;
    this.minSearchLength = 3;
    this.debounceDelay = 500;
    this.debounceTimer = null;
    this.currentQuery = '';
    this.totalResults = 0;

    this.getMaxResults = () => {
      return window.innerWidth < 768 ? 2 : 5;
    };

    if (this.overlay && this.toggleButton) {
      this.init();
    }
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.toggleButton.addEventListener('click', () => {
      this.toggleSearch();
    });

    if (this.toggleButtonSticky) {
      this.toggleButtonSticky.addEventListener('click', () => {
        this.toggleSearch();
      });
    }

    this.backdrop.addEventListener('click', () => {
      this.closeSearch();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeSearch();
      }
    });

    this.searchInput.addEventListener('input', (e) => {
      this.handleSearchInput(e.target.value);
    });

    this.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (this.currentQuery) {
          this.performSearch(this.currentQuery);
        }
      }, 250);
    });
  }

  toggleSearch() {
    if (this.isOpen) {
      this.closeSearch();
    } else {
      this.openSearch();
    }
  }

  openSearch() {
    this.isOpen = true;
    this.overlay.classList.add('diamension-search-overlay--active');
    document.body.style.overflow = 'hidden';

    if (window.lenis && typeof window.lenis.stop === 'function') {
      window.lenis.stop();
    }

    const header = document.querySelector('[data-header]');
    if (header) {
      header.classList.add('diamension-header--search-open');
      header.classList.remove('diamension-header--hidden');
      this.originalBehavior = header.dataset.headerBehavior;
    }

    const transparentSticky = document.querySelector('[data-transparent-sticky]');
    if (transparentSticky) {
      transparentSticky.classList.remove('is-visible');
    }

    this.toggleSearchIcons(true);

    const content = this.overlay.querySelector('.diamension-search-overlay__content');

    if (typeof gsap !== 'undefined') {
      gsap.set(content, { height: 0, opacity: 0 });

      gsap.to(this.overlay, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(content, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    } else {
      this.overlay.style.opacity = '1';
      content.style.height = 'auto';
      content.style.opacity = '1';
    }

    setTimeout(() => {
      this.searchInput.focus();
    }, 400);
  }

  closeSearch() {
    this.isOpen = false;

    const header = document.querySelector('[data-header]');
    const transparentSticky = document.querySelector('[data-transparent-sticky]');

    if (header && this.originalBehavior) {
      header.classList.remove('diamension-header--search-open');

      if (this.originalBehavior === 'solid') {
        header.classList.add('diamension-header--scrolled');
        header.classList.add('diamension-header--solid-layout');
        header.classList.remove('diamension-header--transparent-layout');
      } else {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollPosition <= 820) {
          header.classList.remove('diamension-header--hidden');
          if (transparentSticky) {
            transparentSticky.classList.remove('is-visible');
          }
        } else {
          header.style.transition = 'none';
          header.classList.add('diamension-header--hidden');

          setTimeout(() => {
            header.style.transition = '';
          }, 50);

          if (transparentSticky) {
            transparentSticky.classList.remove('is-visible');

            setTimeout(() => {
              const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
              if (scrollPosition > 820 && !this.isOpen) {
                transparentSticky.classList.add('is-visible');
              }
            }, 100);
          }
        }
      }
    }

    this.toggleSearchIcons(false);

    const content = this.overlay.querySelector('.diamension-search-overlay__content');

    if (typeof gsap !== 'undefined') {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          this.overlay.classList.remove('diamension-search-overlay--active');
          document.body.style.overflow = '';

          if (window.lenis && typeof window.lenis.start === 'function') {
            window.lenis.start();
          }

          this.searchInput.value = '';
          this.currentQuery = '';
          this.clearResults();
        },
      });
    } else {
      content.style.height = '0';
      content.style.opacity = '0';

      setTimeout(() => {
        this.overlay.classList.remove('diamension-search-overlay--active');
        document.body.style.overflow = '';

        if (window.lenis && typeof window.lenis.start === 'function') {
          window.lenis.start();
        }

        this.searchInput.value = '';
        this.currentQuery = '';
        this.clearResults();
      }, 300);
    }
  }

  toggleSearchIcons(showClose) {
    if (showClose) {
      this.toggleButton.classList.add('diamension-header__icon--close-active');
    } else {
      this.toggleButton.classList.remove('diamension-header__icon--close-active');
    }
  }

  handleSearchInput(query) {
    clearTimeout(this.debounceTimer);

    query = query.trim();

    if (query.length < this.minSearchLength) {
      this.clearResults();
      return;
    }

    this.debounceTimer = setTimeout(() => {
      this.performSearch(query);
    }, this.debounceDelay);
  }

  async performSearch(query) {
    this.currentQuery = query;
    this.showLoading();

    try {
      const response = await fetch(
        `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=10`,
      );

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      const products = data.resources.results.products || [];

      this.displayResults(products, query);
    } catch (error) {
      console.error('Search error:', error);
      this.showNoResults();
    }
  }

  displayResults(products, query) {
    this.hideLoading();

    if (products.length === 0) {
      this.showNoResults();
      return;
    }

    const maxResults = this.getMaxResults();
    const displayProducts = products.slice(0, maxResults);
    this.totalResults = products.length;

    const productsHTML = displayProducts.map((product) => this.createProductCard(product)).join('');

    this.resultsContainer.innerHTML = productsHTML;

    if (products.length > maxResults) {
      this.viewMoreLink.href = `/search?q=${encodeURIComponent(query)}&type=product`;
      this.viewMoreElement.style.display = 'block';
    } else {
      this.viewMoreElement.style.display = 'none';
    }

    this.noResultsElement.style.display = 'none';
  }

  createProductCard(product) {
    const price = this.formatPrice(product.price);

    let imageUrl = '';
    if (product.featured_image) {
      imageUrl = typeof product.featured_image === 'object' ? product.featured_image.url : product.featured_image;
    } else if (product.image) {
      imageUrl = typeof product.image === 'object' ? product.image.url : product.image;
    }

    if (imageUrl && imageUrl.startsWith('//')) {
      imageUrl = `https:${imageUrl}`;
    }

    return `
      <a href="${product.url}" class="diamension-search-overlay__product-card">
        <div class="diamension-search-overlay__product-image-wrapper">
          ${
            imageUrl
              ? `<img src="${imageUrl}" alt="${this.escapeHtml(
                  product.title,
                )}" class="diamension-search-overlay__product-image" loading="lazy">`
              : ''
          }
        </div>
        <div class="diamension-search-overlay__product-info">
          <h3 class="diamension-search-overlay__product-title">${this.escapeHtml(product.title)}</h3>
          <p class="diamension-search-overlay__product-price">₹${price}</p>
        </div>
      </a>
    `;
  }

  formatPrice(price) {
    return new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  showLoading() {
    this.loadingElement.style.display = 'flex';
    this.noResultsElement.style.display = 'none';
    this.resultsContainer.innerHTML = '';
    this.viewMoreElement.style.display = 'none';
  }

  hideLoading() {
    this.loadingElement.style.display = 'none';
  }

  showNoResults() {
    this.hideLoading();
    this.noResultsElement.style.display = 'block';
    this.resultsContainer.innerHTML = '';
    this.viewMoreElement.style.display = 'none';
  }

  clearResults() {
    this.resultsContainer.innerHTML = '';
    this.noResultsElement.style.display = 'none';
    this.viewMoreElement.style.display = 'none';
    this.hideLoading();
  }
}

class DiamensionMegaMenu {
  constructor() {
    this.megaMenus = document.querySelectorAll('[data-mega-menu]');
    this.mainHeader = document.querySelector('[data-header]');
    this.stickyHeader = document.querySelector('[data-transparent-sticky]');
    this.navLinks = document.querySelectorAll('.diamension-header__nav-link');
    this.activeMegaMenu = null;
    this.hideTimeout = null;
    this.hideDelay = 100;
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    this.lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (this.megaMenus.length > 0 && this.navLinks.length > 0) {
      this.init();
    }
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.navLinks.forEach((link) => {
      const megaMenuId = this.getMegaMenuId(link);
      const parentHeader = link.closest('[data-header], [data-transparent-sticky]');
      const megaMenu = parentHeader ? parentHeader.querySelector(`[data-mega-menu="${megaMenuId}"]`) : null;

      if (!megaMenu) return;

      if (this.isTouchDevice) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          if (this.activeMegaMenu === megaMenu) {
            this.hideMegaMenu(megaMenu);
            this.activeMegaMenu = null;
          } else {
            if (this.activeMegaMenu) {
              this.hideMegaMenu(this.activeMegaMenu);
            }
            this.showMegaMenu(megaMenu);
            this.activeMegaMenu = megaMenu;
          }
        });
      } else {
        link.addEventListener('mouseenter', () => {
          clearTimeout(this.hideTimeout);
          if (this.activeMegaMenu && this.activeMegaMenu !== megaMenu) {
            this.hideMegaMenu(this.activeMegaMenu);
          }
          this.showMegaMenu(megaMenu);
          this.activeMegaMenu = megaMenu;
        });

        link.addEventListener('mouseleave', () => {
          this.hideTimeout = setTimeout(() => {
            if (this.activeMegaMenu === megaMenu) {
              this.hideMegaMenu(megaMenu);
              this.activeMegaMenu = null;
            }
          }, this.hideDelay);
        });

        megaMenu.addEventListener('mouseenter', () => {
          clearTimeout(this.hideTimeout);
        });

        megaMenu.addEventListener('mouseleave', () => {
          this.hideTimeout = setTimeout(() => {
            this.hideMegaMenu(megaMenu);
            this.activeMegaMenu = null;
          }, this.hideDelay);
        });
      }
    });

    if (this.isTouchDevice) {
      document.addEventListener('click', (e) => {
        if (!this.activeMegaMenu) return;

        const isClickInsideMegaMenu = this.activeMegaMenu.contains(e.target);
        const isClickOnNavLink = Array.from(this.navLinks).some((link) => link.contains(e.target));

        if (!isClickInsideMegaMenu && !isClickOnNavLink) {
          this.hideMegaMenu(this.activeMegaMenu);
          this.activeMegaMenu = null;
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeMegaMenu) {
        this.hideMegaMenu(this.activeMegaMenu);
        this.activeMegaMenu = null;
      }
    });

    window.addEventListener('scroll', () => {
      if (!this.activeMegaMenu) return;

      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      const scrollingDown = currentScrollPosition > this.lastScrollPosition;

      if (scrollingDown) {
        this.hideMegaMenu(this.activeMegaMenu);
        this.activeMegaMenu = null;

        this.megaMenus.forEach((menu) => {
          if (menu.classList.contains('is-active')) {
            menu.classList.remove('is-active');
          }
        });
      }

      this.lastScrollPosition = currentScrollPosition;
    });
  }

  getMegaMenuId(link) {
    const linkText = link.textContent.trim().toLowerCase();
    return linkText;
  }

  showMegaMenu(megaMenu) {
    const isStickyVisible = this.stickyHeader && this.stickyHeader.classList.contains('is-visible');

    let targetMegaMenu = megaMenu;
    if (isStickyVisible) {
      const megaMenuId = megaMenu.dataset.megaMenu;
      const stickyMegaMenu = this.stickyHeader.querySelector(`[data-mega-menu="${megaMenuId}"]`);
      if (stickyMegaMenu) {
        targetMegaMenu = stickyMegaMenu;
      }
    } else {
      const megaMenuId = megaMenu.dataset.megaMenu;
      const mainMegaMenu = this.mainHeader.querySelector(`[data-mega-menu="${megaMenuId}"]`);
      if (mainMegaMenu) {
        targetMegaMenu = mainMegaMenu;
      }
    }

    this.megaMenus.forEach((menu) => {
      if (menu !== targetMegaMenu) {
        this.hideMegaMenu(menu);
      }
    });

    targetMegaMenu.classList.add('is-active');

    if (typeof gsap !== 'undefined') {
      const columns = targetMegaMenu.querySelectorAll('.custom-header-mega-menu__column');
      const cards = targetMegaMenu.querySelectorAll('.custom-header-mega-menu__card');

      const elementsToAnimate = [...columns, ...cards];

      if (elementsToAnimate.length > 0) {
        gsap.fromTo(
          elementsToAnimate,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05 },
        );
      }
    } else {
      const allAnimatableElements = targetMegaMenu.querySelectorAll(
        '.custom-header-mega-menu__column, .custom-header-mega-menu__card',
      );

      allAnimatableElements.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }

    this.activeMegaMenu = targetMegaMenu;
  }

  hideMegaMenu(megaMenu) {
    if (typeof gsap !== 'undefined') {
      const allAnimatableElements = megaMenu.querySelectorAll(
        '.custom-header-mega-menu__column, .custom-header-mega-menu__card',
      );

      if (allAnimatableElements.length > 0) {
        gsap.to(allAnimatableElements, {
          opacity: 0,
          y: -20,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            megaMenu.classList.remove('is-active');
          },
        });
      } else {
        megaMenu.classList.remove('is-active');
      }
    } else {
      megaMenu.classList.remove('is-active');
    }
  }
}

class DiamensionMobileNav {
  constructor() {
    this.drawer = document.querySelector('[data-mobile-nav-drawer]');
    this.hamburger = document.querySelector('[data-hamburger]');
    this.hamburgerSticky = document.querySelector('[data-hamburger-sticky]');
    this.closeButton = document.querySelector('[data-mobile-nav-close]');
    this.backButtons = document.querySelectorAll('[data-nav-back]');
    this.isOpen = false;
    this.currentLevel = 1;
    this.currentLevelElement = null;
    this.navigationHistory = [];

    if (this.drawer && this.hamburger) {
      this.init();
    }
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.hamburger.addEventListener('click', () => {
      this.openDrawer();
    });

    if (this.hamburgerSticky) {
      this.hamburgerSticky.addEventListener('click', () => {
        this.openDrawer();
      });
    }

    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => {
        this.closeDrawer();
      });
    }

    this.backButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.navigateBack();
      });
    });

    const level1Triggers = this.drawer.querySelectorAll('[data-nav-level="1"] [data-nav-trigger]');
    level1Triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const targetId = trigger.dataset.navTrigger;
        this.navigateToLevel2(targetId);
      });
    });

    const level2Triggers = this.drawer.querySelectorAll('[data-nav-level="2"] [data-nav-trigger]');
    level2Triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const columnId = trigger.dataset.navTrigger;
        const parentId = trigger.closest('[data-nav-level="2"]').dataset.parentId;
        this.navigateToLevel3(columnId, parentId);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeDrawer();
      }
    });
  }

  openDrawer() {
    this.isOpen = true;
    this.drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    if (!this.currentLevelElement) {
      this.currentLevelElement = this.drawer.querySelector('[data-nav-level="1"]');
    }

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(
        this.drawer,
        { x: '-100%' },
        {
          x: 0,
          duration: 0.4,
          ease: 'power2.out',
        },
      );
    } else {
      this.drawer.style.transform = 'translateX(0)';
    }
  }

  closeDrawer() {
    this.isOpen = false;
    document.body.style.overflow = '';

    if (typeof gsap !== 'undefined') {
      gsap.to(this.drawer, {
        x: '-100%',
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          this.drawer.classList.remove('is-open');
          this.resetToLevel1();
        },
      });
    } else {
      this.drawer.style.transform = 'translateX(-100%)';
      setTimeout(() => {
        this.drawer.classList.remove('is-open');
        this.resetToLevel1();
      }, 400);
    }
  }

  navigateToLevel2(parentId) {
    const level1 = this.drawer.querySelector('[data-nav-level="1"]');
    const level2 = this.drawer.querySelector(`[data-nav-level="2"][data-parent-id="${parentId}"]`);

    if (!level2) return;

    this.navigationHistory.push({ level: 1, id: null, element: level1 });
    this.currentLevel = 2;
    this.currentLevelElement = level2;

    level2.style.display = 'block';

    if (typeof gsap !== 'undefined') {
      gsap.to(level1, {
        x: '100%',
        duration: 0.4,
        ease: 'power2.out',
      });

      gsap.fromTo(
        level2,
        { x: '-100%' },
        {
          x: 0,
          duration: 0.4,
          ease: 'power2.out',
        },
      );
    }
  }

  navigateToLevel3(columnId, parentId) {
    const level2 = this.currentLevelElement;
    const level3 = this.drawer.querySelector(`[data-nav-level="3"][data-column-id="${columnId}"]`);

    if (!level3 || !level2) return;

    this.navigationHistory.push({ level: 2, id: parentId, element: level2 });
    this.currentLevel = 3;
    this.currentLevelElement = level3;

    level3.style.display = 'block';

    if (typeof gsap !== 'undefined') {
      gsap.to(level2, {
        x: '100%',
        duration: 0.4,
        ease: 'power2.out',
      });

      gsap.fromTo(
        level3,
        { x: '-100%' },
        {
          x: 0,
          duration: 0.4,
          ease: 'power2.out',
        },
      );
    }
  }

  navigateBack() {
    if (this.navigationHistory.length === 0) return;

    const previous = this.navigationHistory.pop();
    const currentLevelEl = this.currentLevelElement;
    const previousLevelEl = previous.element;

    if (!previousLevelEl || !currentLevelEl) return;

    this.currentLevel = previous.level;
    this.currentLevelElement = previousLevelEl;

    previousLevelEl.style.display = previous.level === 1 ? 'flex' : 'block';

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(
        previousLevelEl,
        { x: '100%' },
        {
          x: 0,
          duration: 0.4,
          ease: 'power2.out',
        },
      );

      gsap.to(currentLevelEl, {
        x: '-100%',
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          currentLevelEl.style.display = 'none';
          gsap.set(currentLevelEl, { x: 0 });
        },
      });
    }
  }

  resetToLevel1() {
    const level1 = this.drawer.querySelector('[data-nav-level="1"]');
    const allLevels = this.drawer.querySelectorAll('[data-nav-level]');

    if (typeof gsap !== 'undefined') {
      gsap.set(allLevels, { x: 0 });
    }

    allLevels.forEach((level) => {
      if (level !== level1) {
        level.style.display = 'none';
      } else {
        level.style.display = 'flex';
      }

      if (typeof gsap !== 'undefined') {
        gsap.set(level, { clearProps: 'transform' });
      }
    });

    this.currentLevel = 1;
    this.currentLevelElement = level1;
    this.navigationHistory = [];
  }
}

function initCartDrawer() {
  const cartLink = document.querySelector('#diamension-cart-icon');
  const cartLinkSticky = document.querySelector('#diamension-cart-icon-sticky');
  const cartDrawer = document.querySelector('cart-drawer');

  if (cartLink && cartDrawer) {
    cartLink.addEventListener('click', (event) => {
      event.preventDefault();
      cartDrawer.open(cartLink);
    });
  }

  if (cartLinkSticky && cartDrawer) {
    cartLinkSticky.addEventListener('click', (event) => {
      event.preventDefault();
      cartDrawer.open(cartLinkSticky);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new DiamensionHeader();
    new DiamensionSearch();
    new DiamensionMegaMenu();
    new DiamensionMobileNav();
    initCartDrawer();
  });
} else {
  new DiamensionHeader();
  new DiamensionSearch();
  new DiamensionMegaMenu();
  new DiamensionMobileNav();
  initCartDrawer();
}
