# JavaScript Optimization Report
**Diamension Shopify Dawn Theme**
_Generated: 2026-03-11 | Files Analyzed: 83_

---

## Executive Summary

| Category | Count |
|---|---|
| Total JS files | 83 |
| High Priority | 22 |
| Medium Priority | 35 |
| Low Priority | 26 |
| Critical cross-file issues | 6 |

### Top Critical Issues Across Codebase
1. **50+ `console.log`/`console.error` statements** left in production code
2. **Memory leaks** — IntersectionObservers, MutationObservers, and event listeners never cleaned up
3. **Global `ScrollTrigger.getAll()` cleanup** in 4+ files kills ALL scroll triggers, not just current section
4. **Infinite retry loops** — `setInterval`/`setTimeout` polling for GSAP/Lottie with no max retry limit
5. **DOM queries inside loops** — `querySelectorAll` called repeatedly without caching
6. **Unthrottled scroll/resize listeners** — missing debounce causing layout thrashing

---

## HIGH PRIORITY FILES

### global.js
- **Lines:** 1332
- **Issues:**
  - Massive monolithic file — should be split into modules
  - Multiple `Array.from()` calls without caching throughout
  - No request deduplication in `HTMLUpdateUtility`
  - Memory leaks from callback storage without cleanup
  - Multiple `setTimeout` calls without debounce/throttle
  - Inefficient element swapping via `innerHTML` assignment
  - `fetch` operations without error boundaries
- **Priority:** High
- **Notes:** Foundation utility file — performance issues here affect the entire theme

---

### section-custom-product-detail.js
- **Lines:** 1760
- **Issues:**
  - **13 `console.error`/`warn` statements** left in production (lines 18, 52-53, 192, 259, 322, 404, 980, 1347, 1378, 1391, 1443, 1587)
  - Heavy DOM queries inside loops — `querySelectorAll` in variant filtering and image gallery init
  - `addEventListener` on multiple elements with no cleanup/unload handler
  - Inline event handlers on buttons instead of delegated listeners
  - `setInterval`/`setTimeout` without cleanup references
  - No debounce on resize handlers
  - Monolithic 1760-line structure — extremely difficult to maintain
- **Priority:** High
- **Notes:** Largest file in codebase. Significant refactor needed. High memory leak risk on collection pages.

---

### section-diamension-header.js
- **Lines:** 1253
- **Issues:**
  - 4 `console.log` statements left (lines 225, 228-229, 244, 1002)
  - `ticking` flag for RAF is local — doesn't prevent full scroll cascade
  - Multiple `addEventListener` on `document` with no cleanup (lines 48, 54, 59-72, 76-80, 314, 350, 353-365, 819-840, 1016, 1222-1233)
  - Mega menu scroll listener (line 819) fires on every scroll — no debounce
  - No GSAP availability check before usage (lines 238, 259)
  - Multiple animation classes and menu systems tangled in one file
  - No cleanup on page navigation
- **Priority:** High
- **Notes:** Second-largest file. Memory leak risk from ~20 unremoved event listeners.

---

### process-hero.js
- **Lines:** 726
- **Issues:**
  - `console.log`/`console.error` throughout + `performance.now()` logging (should be dev-only)
  - Preloads 30+ image frames upfront regardless of viewport
  - Canvas rendering runs every frame with no optimisation
  - Debug overlay created and never removed (lines 616-619)
  - `requestAnimationFrame` loop with no cleanup mechanism
  - `setTimeout` hardcoded delays blocking execution
- **Priority:** High
- **Notes:** Heavy 3D animation system. Aggressive frame preloading will hurt LCP on slow connections.

---

### section-brillance-3d.js
- **Lines:** 414
- **Issues:**
  - Extensive `console.log`/`console.error` throughout — **logs on every ScrollTrigger frame update** (line 186), tanking scroll performance
  - Canvas snapshot to `sessionStorage` for page transitions — extremely memory-heavy
  - `requestAnimationFrame` loop runs indefinitely
  - `setTimeout` chains without Promise-based flow
  - No error handling for `canvas.toDataURL()` beyond basic try-catch
- **Priority:** High
- **Notes:** Per-frame scroll logging alone will cause visible jank. Must be removed before production.

---

### section-featured-category-slider.js
- **Lines:** 591
- **Issues:**
  - Multiple `console.log` debug statements (lines 16, 73)
  - `setInterval`/`setTimeout` for hover delays without proper cleanup (lines 179, 309)
  - `querySelector()` for form elements called on every validation instead of caching
  - `getBoundingClientRect()` called on every button position update (lines 449, 450, 458) without debounce
  - TODO comments indicating unfinished work (lines 72-73, 517-520)
  - 40+ methods in one class — needs splitting
- **Priority:** High
- **Notes:** Layout thrashing likely on button positioning. Incomplete work markers still present.

---

### section-shop-collection-arch.js
- **Lines:** 392
- **Issues:**
  - `ScrollTrigger.getAll()` in `ParallaxHandler.destroy()` kills ALL scroll triggers globally
  - `LottieHandler` retry `setTimeout` has **no max retry limit** — could loop indefinitely (line 261)
  - CTA animation `setTimeout` to remove classes instead of `animationend` listener (lines 221, 235)
  - Button `mouseenter`/`mouseleave` recreated every hover causing class churn
  - `console.log` statements left in (lines 269, 289, 294)
  - No cleanup of event listeners in `CTAAnimationHandler`
- **Priority:** High
- **Notes:** Lottie infinite retry is the most dangerous issue here.

---

### section-faq.js
- **Lines:** 240
- **Issues:**
  - Window resize listener has **no debounce** (line 48) — fires on every pixel change
  - Scroll listener (line 39) has no debounce — fires constantly
  - Multiple `querySelector` calls per item in loops (lines 143, 172-174, 193-195)
  - Direct style mutations for toggle state instead of CSS classes
  - `array.find()` called on every tab activation instead of caching
  - Observer never unobserves — memory leak
- **Priority:** High
- **Notes:** Unthrottled scroll + resize will cause layout thrashing on low-end devices.

---

### section-image-marquee.js
- **Lines:** 157
- **Issues:**
  - **GSAP loading via `setInterval` polling** (lines 119-128) — wasteful 100ms checks
  - Hardcoded 5-second timeout for GSAP load failure — clunky
  - `cloneNode(true)` inside a loop-within-loop creates O(n²) clones (lines 34-40)
  - `console.error` left in production (line 134)
  - Global `resizeTimeout` not scoped — conflicts with multiple instances
  - Kills and re-inits animations on every resize — very heavy
- **Priority:** High
- **Notes:** O(n²) clone pattern is a significant performance bug.

---

### section-video-hero-automated-animation.js
- **Lines:** 193
- **Issues:**
  - Runs animation on **every** page load in design mode (lines 183-184)
  - 20+ `setProperty()` calls with `!important` flag — fighting CSS specificity
  - Hardcoded timing values (1000ms wait, 2500ms, 600ms) with no configurability
  - Prevents scroll aggressively with `wheel` + `touchmove` listeners (`passive: false`)
  - No guard against animation being triggered twice
  - `getBoundingClientRect()` called during active animation
- **Priority:** High
- **Notes:** `!important` spam signals CSS architecture conflict that should be resolved at the CSS level.

---

### section-video-logo-animation.js
- **Lines:** 113
- **Issues:**
  - `setProperty()` with `!important` flag used to override other scripts — architectural conflict
  - No animation state guard — can re-run if triggered multiple times
  - Hardcoded homepage-only check limits reusability
  - No `prefers-reduced-motion` check despite heavy animation
  - Early returns without warning if GSAP not loaded
- **Priority:** High
- **Notes:** Companion file to video-hero-automated-animation with the same CSS conflict pattern.

---

### section-profile-login.js
- **Lines:** 263
- **Issues:**
  - Multiple `console.log` with TODO comments (lines 43, 53, 135, 146)
  - Recovery success banner code **duplicated across 3 profile files** — should be a shared utility
  - `classList` operations on 6 elements per toggle instead of delegating
  - Multiple DOM queries not cached (lines 63-69)
  - Hardcoded timeout values: 2000ms redirect, 3000ms error display
  - Hash-based routing implemented manually, inconsistently
  - `hashchange` event listener not cleaned up
- **Priority:** High
- **Notes:** Most complex profile file. Significant deduplication opportunity across all 4 profile files.

---

### section-profile-signup.js
- **Lines:** 284
- **Issues:**
  - **10+ `console.log` debug statements** (lines 91, 102-105, 110, 123, 126, 133, 173, 180)
  - `showSuccessInSection` and `showSuccessAndRedirect` are 90% duplicate — should be one function
  - Complex nested `setTimeout` chains for control flow
  - Progress bar animation via inline `style.width` instead of CSS class
  - Repeated DOM queries in `initSuccessHandling()` (lines 242-244)
  - Multiple fallback newsletter lookups without proper error handling
  - Heavy inline styles in created DOM elements
- **Priority:** High
- **Notes:** Most verbose debug logging in codebase. Extensive refactoring needed.

---

### section-product-collection-diamension.js
- **Lines:** 575
- **Issues:**
  - **Extensive `console.log` with emoji debugging** throughout (lines 355, 401, 409-411, 430, 442, 481, 497-498) — incomplete dev work
  - `MutationObserver` created at line 552-574 observes all product grids **forever — no cleanup**
  - Client-side price filter duplicates Shopify's native filter — double processing
  - `setupAreaBasedScrolling()` hijacks `wheel` + `touchmove` with `passive: false` — disables browser scroll optimization
  - `addEventListener('DOMContentLoaded')` inside observer callback (line 568)
- **Priority:** High
- **Notes:** Wheel event hijacking is both a performance and UX concern on mobile.

---

### section-two-column-image-customiser-modal.js
- **Lines:** 676
- **Issues:**
  - **67-entry hardcoded country codes array** (lines 10-67) — should be externalized or lazy-loaded
  - `document.addEventListener('click')` added globally per modal instance (line 301)
  - Date/time formatting logic duplicated between two handlers (lines 376-388 and 478-489)
  - `querySelectorAll()` called on every resize for date inputs (line 584)
  - `setTimeout()` used extensively without cleanup (lines 130, 147, 418, 523)
  - Country dropdown rebuilds full DOM on every keystroke — no debounce
- **Priority:** High
- **Notes:** Country codes array alone adds ~3KB of hardcoded data to the bundle.

---

### homepage-header-animation.js
- **Lines:** 207
- **Issues:**
  - **12+ `console.log`/`console.error` statements** (lines 14, 18, 24, 44, 58, 64, 71, 101, 109, 111, 127, 133)
  - 30+ `setProperty()` calls instead of CSS class toggles
  - `getScrollThresholds()` recalculated on every scroll event — should be memoised
  - `ticking` RAF flag logic duplicated (lines 186-192)
  - No cleanup of RAF handler or scroll listeners on navigation
  - Hardcoded magic numbers: `10vh`, `50vh`, `51vh`, `150vh`, `820px`
- **Priority:** High
- **Notes:** Threshold calculations + 30+ inline style mutations on every scroll = guaranteed jank.

---

### section-product-related.js
- **Lines:** 125
- **Issues:**
  - **Empty `forEach` loop (line 122) — dead code**
  - `MutationObserver` created without cleanup (lines 101-119)
  - `setTimeout(2000ms)` as a fallback trigger — brittle
  - `observer.disconnect()` not guaranteed to run if no containers found
  - Scroll event listener without debounce (lines 41-42)
- **Priority:** High
- **Notes:** Dead code should be removed immediately. Observer disconnect not guaranteed.

---

### cart.js
- **Lines:** 298
- **Issues:**
  - Heavy DOM queries inside loops (lines 185-193, 255-272) — `querySelectorAll` called per iteration
  - Multiple `DOMParser` instantiations for single HTML parsing
  - `setCustomValidity()` + `reportValidity()` called sequentially — expensive DOM operations
  - `fetch` error handler logs silently without proper handling
  - Missing index validation in `updateQuantity`
- **Priority:** High
- **Notes:** Performance bottleneck in `updateQuantity` method.

---

### quick-order-list.js
- **Lines:** 484
- **Issues:**
  - Multiple `addEventListener` in `initVariantEventListeners` without cleanup (lines 81-95)
  - No `disconnectedCallback` for resize listener cleanup
  - Expensive DOM operations in `renderSections` (lines 197-244)
  - Multiple `querySelectorAll` in loops without caching
  - Array `slice`/spread creating unnecessary copies (line 79)
  - `setTimeout` in `updateLiveRegions` without debounce (line 428)
  - Missing `fetch` error handling
- **Priority:** High
- **Notes:** Second-largest Dawn core file. Needs splitting and memory leak fixes.

---

### product-info.js
- **Lines:** 430
- **Issues:**
  - Multiple `fetch` operations without error boundaries
  - Inefficient media gallery diffing algorithm (lines 258-298)
  - `requestUrl` state can cause race conditions
  - `querySelectorAll` repeated for same selectors (lines 215, 360)
  - `updateQuantityRules` performs multiple sequential DOM updates (lines 353-389)
  - No caching of frequently queried DOM elements
- **Priority:** High
- **Notes:** Core product page component — optimising here directly impacts product page performance.

---

### facets.js
- **Lines:** 366
- **Issues:**
  - Heavy DOM manipulation in `renderFilters` with complex conditional rendering (lines 111-177)
  - Multiple `DOMParser` instantiations throughout
  - `querySelectorAll` in loops without caching (lines 121-122, 135-154)
  - Expensive `Array.from()` conversions called multiple times
  - Missing `fetch` error handling
  - Complex nested conditionals make optimisation difficult
- **Priority:** High
- **Notes:** `renderFilters` method is the main bottleneck — needs targeted refactoring.

---

## MEDIUM PRIORITY FILES

### section-shop-by-price.js
- **Lines:** 504
- **Issues:**
  - `setTimeout` inside loops (lines 167, 272, 393, 413) without cleanup
  - Multiple `setTimeout(..., 0)` used instead of `requestAnimationFrame`
  - `updateVisibleCards()` → `updateCardWidth()` → `setTimeout` cascade of delays
  - `console.log` with emoji left at line 355
  - No error boundaries around `fetch` operations beyond try-catch
- **Priority:** Medium

### section-dynamic-hero-studio.js
- **Lines:** 69
- **Issues:**
  - Global `resizeTimeout` variable — conflicts with multiple instances
  - Re-inits observer on every resize instead of checking breakpoint only
  - Observer never `unobserve`s after animation — infinite memory leak
  - `setTimeout` inside observer callback creates nested timers
- **Priority:** Medium

### section-blog-journal.js
- **Lines:** 185
- **Issues:**
  - Global `resizeTimeout` not scoped to instance — will conflict with multiple instances
  - DOM style mutations in loop (lines 138-140)
  - Missing debounce cleanup on unmount
  - Filter iterates array twice to find hidden elements
- **Priority:** Medium

### section-brand-story.js
- **Lines:** 76
- **Issues:**
  - Global resize timer not scoped
  - `unobserve` call commented out — observer stays active indefinitely
  - `querySelectorAll()` called twice with same selector (lines 19, 49)
  - `prefersReducedMotion()` called every time instead of caching result
- **Priority:** Medium

### section-glamor-collection-studio.js
- **Lines:** 155
- **Issues:**
  - Global `resizeTimeout`/`lastWidth` variables — conflicts possible
  - GSAP `setTimeout` fallback only tries once — if GSAP loads late, animations silently fail
  - `setViewportHeight()` called multiple times without caching
  - Orientation change listener doesn't clear previous timeouts
- **Priority:** Medium

### section-hero-five-product.js
- **Lines:** 144
- **Issues:**
  - `getCardWidth()` called on every scroll — multiple `window.innerWidth` checks without memoisation
  - `gap` value hardcoded as `10` — not synced with CSS
  - Observer never cleaned up on destroy
- **Priority:** Medium

### section-image-hero-corporate.js
- **Lines:** 63
- **Issues:**
  - N observers created for N sections — each independent
  - Global resize timer not scoped
  - `setTimeout` inside observer with hardcoded 400ms delay
  - `querySelectorAll` result not cached — called fresh on every resize
- **Priority:** Medium

### section-jewel-care-accordion.js
- **Lines:** 130
- **Issues:**
  - `querySelectorAll` in loop retrieves all active items on every resize
  - Direct `maxHeight` style mutation instead of CSS transitions
  - Shopify event listeners (lines 125-126) without cleanup
- **Priority:** Medium
- **Notes:** Good — implements debounce correctly, unlike most files.

### section-founders-vision.js
- **Lines:** 54
- **Issues:**
  - Observer never `unobserve`s — memory leak
  - Complex CSS selector (line 13) — inefficient traversal
  - No error handling if animated elements don't exist
- **Priority:** Medium

### section-editorial-hero.js
- **Lines:** 65
- **Issues:**
  - Observer never unobserves (line 42 commented out)
  - Multiple `querySelector` calls per element instead of caching
- **Priority:** Medium

### section-sustainability-hero.js
- **Lines:** 173
- **Issues:**
  - `ScrollTrigger.getAll()` cleanup is global — affects other sections
  - `resizeTimer` not cleaned up on destroy
  - `is-visible` class added twice in different code paths
  - `IntersectionObserver` in `initAnimations` never cleaned up
  - `wasDesktop` at module scope — breaks multiple instances
  - Hardcoded `1025px` breakpoint scattered instead of centralised
- **Priority:** Medium

### section-bespoke-creations.js
- **Lines:** 213
- **Issues:**
  - `ScrollTrigger.getAll()` in `destroy()` kills ALL triggers globally
  - Redundant regex + `includes()` check for video URL detection (lines 56)
  - `resizeTimer` not cleaned up on destroy
- **Priority:** Medium

### section-diamension-quote-gallery.js
- **Lines:** 151
- **Issues:**
  - `ScrollTrigger.getAll()` cleanup is global
  - `resizeTimer` not cleaned up
  - `parallaxEnabled` checks a dataset attribute not defined in HTML
- **Priority:** Medium

### section-lab-grown-hero-b2b.js
- **Lines:** 254
- **Issues:**
  - Multiple `console.warn`/`console.log` statements (lines 42, 94, 99, 121, 127, 237, 241, 248)
  - `ScrollTrigger.getAll()` iterates all triggers even when filtering by section
  - Repeated `querySelectorAll` in loops without caching
- **Priority:** Medium

### section-two-image-hero-b2b.js
- **Lines:** 105
- **Issues:**
  - Dynamic GSAP loading via script injection — race condition potential, no timeout handling
  - `setTimeout` for CTA animation cleanup not cancelled on unmount
  - Animation timers leak if element removed during animation
- **Priority:** Medium

### process-page-header.js
- **Lines:** 139
- **Issues:**
  - 10+ emoji-heavy `console.log` statements
  - 20+ `style.setProperty()` calls instead of CSS class toggling
  - Complex scroll threshold logic hard to maintain
  - No cleanup of scroll listeners on navigation
- **Priority:** Medium

### section-image-with-product-hero.js
- **Lines:** 366
- **Issues:**
  - `getBoundingClientRect()` called frequently in `positionCard()` without debounce
  - Clone and replace pattern to remove listeners is inefficient (lines 234-235)
  - RAF flag naming inconsistency: `scrollRAFPending` vs `scrollRAF`
  - `IntersectionObserver` never removed (line 300)
- **Priority:** Medium

### wishlist-manager.js
- **Lines:** 400
- **Issues:**
  - Multiple `console.log` statements (lines 28, 47, 52, 79, 126, 219, 228, 331)
  - `keydown` event on `document` added on every init — duplicate listeners if re-initted
  - `animateButton()` uses `setTimeout` instead of `requestAnimationFrame` for CSS transitions
  - No `IntersectionObserver` for lazy initialisation
- **Priority:** Medium

### section-feature-slider-with-left-image.js
- **Lines:** 338
- **Issues:**
  - Event listeners added in loop without cleanup on destroy
  - TODO comments left (lines 146-147, 313-314)
  - `WishlistManager.initializeButtons()` called multiple times without deduplication check
  - No GSAP availability check before usage
- **Priority:** Medium

### section-wishlist.js
- **Lines:** 250
- **Issues:**
  - `console.log` left at line 36
  - Price conversion hardcoded (`/100`) — inconsistent with rest of codebase
  - `Promise.all()` without reject handling — can silently fail
  - Multiple DOM queries per product render cycle
- **Priority:** Medium

### cart-drawer.js
- **Lines:** 137
- **Issues:**
  - Event listener added on overlay multiple times (lines 6, 87) without removing previous
  - `setTimeout` without debounce for animation triggers (line 33)
  - Repeated `querySelector` calls for same selectors
  - No cleanup in `disconnectedCallback`
- **Priority:** Medium

### predictive-search.js
- **Lines:** 278
- **Issues:**
  - `queryKey` transformation with `replace` instead of `encodeURIComponent`
  - `querySelectorAll` filtering in `switchOption` — expensive
  - Manual loop to find index instead of `findIndex`
  - Multiple `DOMParser` calls
  - `regex.match()` creates array then checks length — should use `test()`
  - `setTimeout` in `onFocusOut` without debounce
- **Priority:** Medium

### localization-form.js
- **Lines:** 207
- **Issues:**
  - Multiple `addEventListener` in constructor without cleanup
  - `normalize()` called repeatedly in `filterCountries` — should be memoised
  - Inefficient string searching with `indexOf`
  - Multiple `classList` operations not batched
  - Direct `innerHTML` assignment without sanitisation (line 172)
- **Priority:** Medium

### section-profile-forgot-password.js
- **Lines:** 92
- **Issues:**
  - `console.log` with TODO comments (lines 18, 28)
  - Same error element queried twice (lines 24, 37)
  - `setTimeout` with hardcoded delays instead of CSS `animationend` callback
  - Recovery banner logic duplicated across 3 profile files
- **Priority:** Medium

### section-sleek-minimal-hero.js / section-two-column-hero-diamension.js
- **Lines:** 62 / 62
- **Issues:**
  - **These two files are near-identical** — should be consolidated into one component
  - Observer never cleaned up on section remove
  - No `prefers-reduced-motion` support
  - `setTimeout` inside `IntersectionObserver` callback — should use CSS `animation-delay`
- **Priority:** Medium
- **Notes:** Merge into a single file, saving ~62 lines.

### section-diamension-follow-insta.js
- **Lines:** 209
- **Issues:**
  - Inconsistent breakpoint (1024px) vs other files (768px)
  - CTA animations reattached on every `mouseenter`/`mouseleave` instead of single setup
  - Missing instance cleanup on unload
  - Parallax runs even when section is off-screen
- **Priority:** Medium

### pubsub.js
- **Lines:** 26
- **Issues:**
  - Array spread `[...subscribers[eventName], callback]` creates unnecessary copy
  - No maximum subscriber limit — memory leak risk with many listeners
  - Missing error handling in `Promise.all`
- **Priority:** Medium

### details-disclosure.js / details-modal.js / cart-notification.js
- **Lines:** 54 / 48 / 84
- **Issues:**
  - Event listeners added without cleanup (`disconnectedCallback` missing)
  - `setTimeout` without debounce
  - `querySelector` called multiple times for same elements
- **Priority:** Medium

### media-gallery.js
- **Lines:** 118
- **Issues:**
  - Multiple `querySelectorAll` for same selector in `setActiveMedia` (lines 38, 68)
  - `getBoundingClientRect()` calls (lines 59, 62) — expensive
  - `querySelectorAll` in multiple loops (lines 76-78, 89)
- **Priority:** Medium

### quantity-popover.js
- **Lines:** 90
- **Issues:**
  - `matchMedia` listeners added without cleanup
  - `addEventListener` inside `togglePopover` — listener added repeatedly on each toggle
  - `event.preventDefault()` called unconditionally in `closePopover`
- **Priority:** Medium

### quick-add-bulk.js / quick-add.js
- **Lines:** 198 / 123
- **Issues:**
  - Event listeners added in `listenForActiveInput` without cleanup — memory leak
  - `replaceAll` on `innerHTML` — expensive
  - `DOMParser` instantiation per fetch call
  - Commented-out error handling left in (quick-add-bulk lines 134-140)
- **Priority:** Medium

---

## LOW PRIORITY FILES

### section-profile-reset-password.js
- **Lines:** 58
- **Issues:** None significant — cleanest profile file, good reference pattern
- **Priority:** Low

### section-jewel-care-accordion.js *(already listed above)*

### custom-trust-badge.js
- **Lines:** 96
- **Issues:**
  - `setTimeout` retry loop for Lottie with **no max retry limit**
  - Multiple `console.log` statements (lines 16, 25, 37, 59, 68)
  - Animation references stored in `Map` but never removed on cleanup
  - Hardcoded `767px` breakpoint duplicating other files
- **Priority:** Low

### section-six-diamond-shape-b2b.js
- **Lines:** 117
- **Issues:**
  - `console.log` left in (lines 48, 71)
  - TODO comments indicating incomplete Lottie implementation (lines 60-70)
  - `IntersectionObserver` never cleaned up
  - `setTimeout` in CTA handlers without cleanup
- **Priority:** Low

### section-four-collection-arch.js
- **Lines:** 228
- **Issues:**
  - `isDesktop()` called on every `mouseenter`/`mouseleave` instead of caching viewport state
  - Event handler functions recreated per card instead of shared
  - Private property pattern (`card._hoverHandlers`) should use `WeakMap` or class property
- **Priority:** Low

### lenis-router.js
- **Lines:** 121
- **Issues:**
  - `console.log`/`console.warn` throughout (lines 72, 89, 101, 111)
  - `requestAnimationFrame` loop runs indefinitely — no stop mechanism even if Lenis disabled
- **Priority:** Low

### section-search-results.js
- **Lines:** 148
- **Issues:**
  - `console.error` left at line 100
  - `showError()` creates DOM elements with inline `cssText` on every call
  - `setTimeout(3000ms)` hardcoded for error removal
- **Priority:** Low

### headline-ring-collection.js
- **Lines:** 366
- **Issues:**
  - No debounce on window resize (lines 350-364)
  - Desktop check via `matchMedia` only on init — doesn't respond to changes
- **Priority:** Low
- **Notes:** Best-implemented GSAP file in codebase — good reference.

### animations.js, customer.js, main-search.js, password-modal.js, price-per-item.js, product-modal.js, product-model.js, pubsub.js, recipient-form.js, search-form.js, share.js, show-more.js, theme-editor.js, constants.js
- **Priority:** Low
- **Notes:** Minor issues — unused variable cleanup, missing `disconnectedCallback`, single `querySelector` caching opportunities.

---

## Cross-File Patterns to Fix

### 1. `console.log` Cleanup
**Affects:** 30+ files
Remove all `console.log`, `console.warn`, `console.error` before production push. Minimum files needing immediate cleanup:
`section-brillance-3d.js`, `section-product-collection-diamension.js`, `section-profile-signup.js`, `homepage-header-animation.js`, `process-hero.js`, `section-custom-product-detail.js`, `wishlist-manager.js`, `section-diamension-header.js`

---

### 2. Global `ScrollTrigger.getAll()` Bug
**Affects:** `section-bespoke-creations.js`, `section-diamension-quote-gallery.js`, `section-shop-collection-arch.js`, `section-sustainability-hero.js`, `section-lab-grown-hero-b2b.js`
**Fix:** Store references to your own triggers and kill only those:
```js
// Instead of:
ScrollTrigger.getAll().forEach(t => t.kill());

// Do this:
this.triggers = [];
// when creating: this.triggers.push(ScrollTrigger.create({...}))
// on destroy:
this.triggers.forEach(t => t.kill());
this.triggers = [];
```

---

### 3. Infinite Retry Loops (No Max Limit)
**Affects:** `section-image-marquee.js`, `custom-trust-badge.js`, `section-shop-collection-arch.js` (Lottie)
**Fix:**
```js
let attempts = 0;
const maxAttempts = 20;
const interval = setInterval(() => {
  if (window.gsap || ++attempts >= maxAttempts) {
    clearInterval(interval);
    if (window.gsap) init();
  }
}, 100);
```

---

### 4. IntersectionObserver / MutationObserver Memory Leaks
**Affects:** 15+ files
After animation triggers, `unobserve` the element:
```js
observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // Add this
    }
  });
});
```

---

### 5. Missing Debounce on Resize/Scroll
**Affects:** `section-faq.js`, `section-diamension-header.js`, `section-product-collection-diamension.js`, `homepage-header-animation.js`, many more
**Fix:** Use a shared debounce utility:
```js
function debounce(fn, delay = 250) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
window.addEventListener('resize', debounce(handleResize));
```

---

### 6. Duplicate Profile Section Logic
**Affects:** `section-profile-login.js`, `section-profile-forgot-password.js`, `section-profile-signup.js`
Recovery/success banner code is copy-pasted across all three files. Extract into a shared `profile-utils.js`.

---

### 7. `!important` Inline Style Spam
**Affects:** `section-video-hero-automated-animation.js`, `section-video-logo-animation.js`, `homepage-header-animation.js`
Indicates CSS specificity wars. Fix the underlying CSS instead of fighting it with `!important` in JavaScript.

---

## Quick Wins (High Impact, Low Effort)

| Task | Files | Impact |
|---|---|---|
| Remove all `console.log` | 30+ files | Removes debug noise, minor perf gain |
| Add `unobserve` after animation | 15+ files | Fixes memory leaks |
| Fix `ScrollTrigger.getAll()` | 5 files | Prevents animations breaking cross-section |
| Add max retry to Lottie/GSAP polls | 3 files | Prevents infinite loops |
| Merge `sleek-minimal-hero` + `two-column-hero` | 2 files | Removes duplicate file |
| Remove dead `forEach` in `section-product-related.js` | 1 file | Remove dead code |
| Remove debug overlay in `process-hero.js` | 1 file | Remove never-cleaned DOM node |
| Externalise country codes array in customiser modal | 1 file | ~3KB bundle reduction |
