# Header State Configuration - Implementation Plan

## Current Behavior Analysis

The existing header (`custom-section-diamension-header.liquid`) automatically transitions between transparent and solid states based on scroll position:
- **Default**: Transparent header with light logos/icons
- **Scroll down past 820px**: Adds `diamension-header--scrolled` class → solid background, dark logos/icons
- **Scroll up**: Shows header but keeps solid state if below threshold
- **At top (<=10px)**: Forces transparent state
- **Hover on header**: Makes it solid temporarily
- **Search open**: Makes it solid temporarily

## Required Enhancement

Allow merchants to configure header behavior per page with two modes:

1. **Auto Mode** (Default): 
   - Transparent at top of page (header overlays content)
   - Becomes solid when scrolling down past 800px viewport
   - Hides when scrolling down past threshold
   - Shows when scrolling up
   - Content starts at top (under header)

2. **Always Solid Mode**:
   - Header is always in solid state (never transparent)
   - Main content is pushed down below header (header is relative positioned)
   - Maintains scroll behavior: hides when scrolling down, shows when scrolling up
   - The only difference from auto mode is it never becomes transparent

**Note**: The "Always Transparent" option is NOT needed and should be removed.

## Implementation Strategy

### 1. Schema Settings Update

Add a new setting in `custom-section-diamension-header.liquid` schema:

```json
{
  "type": "select",
  "id": "header_behavior",
  "label": "Header Behavior",
  "options": [
    {
      "value": "auto",
      "label": "Auto (Transparent → Solid on Scroll)"
    },
    {
      "value": "solid",
      "label": "Always Solid"
    }
  ],
  "default": "auto",
  "info": "Control header appearance behavior for this page"
}
```

### 2. Data Attribute for JavaScript

In the header liquid file, add a data attribute to pass the setting to JavaScript:

```liquid
<header class="diamension-header" data-header data-header-behavior="{{ section.settings.header_behavior }}">
```

### 3. JavaScript Modifications (`section-diamension-header.js`)

#### Update DiamensionHeader class:

```javascript
constructor() {
  this.header = document.querySelector('[data-header]');
  this.behavior = this.header?.dataset.headerBehavior || 'auto'; // 'auto', 'transparent', 'solid'
  // ... existing code
}

init() {
  this.setInitialState();
  this.handleScroll();
  this.attachEventListeners();
  this.updateCartCount();
}

setInitialState() {
  // Apply initial state based on behavior setting
  if (this.behavior === 'solid') {
    this.header.classList.add('diamension-header--scrolled');
    this.isScrolled = true;
  } else if (this.behavior === 'transparent') {
    this.header.classList.remove('diamension-header--scrolled');
    this.isScrolled = false;
  }
  // 'auto' behavior doesn't need initial changes
}

handleScroll() {
  // Skip scroll handling if behavior is not 'auto'
  if (this.behavior !== 'auto') {
    return;
  }
  
  // ... existing scroll logic remains unchanged
}
```

#### Update DiamensionSearch class:

The search functionality should respect the behavior setting:

```javascript
openSearch() {
  // ... existing code
  
  // Make header solid when search opens (respect behavior)
  const header = document.querySelector('[data-header]');
  if (header) {
    header.classList.add('diamension-header--search-open');
    // Store original behavior to restore later
    this.originalBehavior = header.dataset.headerBehavior;
    // Temporarily treat as 'auto' for search overlay
    header.dataset.headerBehavior = 'auto';
  }
}

closeSearch() {
  // ... existing code
  
  // Restore original behavior
  const header = document.querySelector('[data-header]');
  if (header && this.originalBehavior) {
    header.classList.remove('diamension-header--search-open');
    header.dataset.headerBehavior = this.originalBehavior;
    
    // Re-apply initial state based on restored behavior
    if (this.originalBehavior === 'solid') {
      header.classList.add('diamension-header--scrolled');
    } else if (this.originalBehavior === 'transparent') {
      header.classList.remove('diamension-header--scrolled');
    }
  }
}
```

### 4. CSS Modifications for Content Positioning

**Important**: The current CSS forces content to start at the top (transparent overlay behavior) for all pages. We need to make this conditional based on header behavior.

#### Current CSS (lines 39-59 in section-diamension-header.css):
These styles force content to start at the top, which is correct for transparent mode but incorrect for solid mode.

#### Updated CSS Approach:

Add new CSS classes to control content positioning:

```css
/* ============================================
   Layout: Content Positioning Based on Header State
   ============================================ */

/* Transparent mode: Content starts at top, header overlays */
.diamension-header--transparent-layout {
  position: fixed;
}

.diamension-header--transparent-layout + * {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

body:has(.diamension-header--transparent-layout) .shopify-section:first-of-type {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

body:has(.diamension-header--transparent-layout) main {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

body:has(.diamension-header--transparent-layout) .shopify-section--image-banner,
body:has(.diamension-header--transparent-layout) [id*='shopify-section'] .image-banner {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

/* Solid mode: Header pushes content down */
.diamension-header--solid-layout {
  position: relative;
}

.diamension-header--solid-layout + * {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

/* Remove the old global styles that apply to all headers */
/* DELETE these old rules: */
/*
body:has([data-header]) .shopify-section:first-of-type {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

body:has([data-header]) main {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

body:has([data-header]) .shopify-section--image-banner,
body:has([data-header]) [id*='shopify-section'] .image-banner {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
*/
```

#### JavaScript Updates for Layout:

Update the `setInitialState()` method to apply layout classes:

```javascript
setInitialState() {
  // Apply initial state based on behavior setting
  if (this.behavior === 'solid') {
    this.header.classList.add('diamension-header--scrolled');
    this.header.classList.add('diamension-header--solid-layout');
    this.header.classList.remove('diamension-header--transparent-layout');
    this.isScrolled = true;
  } else if (this.behavior === 'transparent') {
    this.header.classList.remove('diamension-header--scrolled');
    this.header.classList.add('diamension-header--transparent-layout');
    this.header.classList.remove('diamension-header--solid-layout');
    this.isScrolled = false;
  } else { // 'auto' behavior
    this.header.classList.remove('diamension-header--solid-layout');
    this.header.classList.add('diamension-header--transparent-layout');
    // Auto starts as transparent but can become solid on scroll
  }
}
```

Update the `handleScroll()` method to manage layout classes:

```javascript
handleScroll() {
  // Skip scroll handling if behavior is not 'auto'
  if (this.behavior !== 'auto') {
    return;
  }
  
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  const scrollingDown = scrollPosition > this.lastScrollPosition;
  const scrollingUp = scrollPosition < this.lastScrollPosition;

  // Scrolling down past threshold → hide header
  if (scrollingDown && scrollPosition > this.scrollThreshold) {
    this.header.classList.add('diamension-header--hidden');
    this.header.classList.add('diamension-header--scrolled');
  }

  // Scrolling up → show header
  if (scrollingUp) {
    this.header.classList.remove('diamension-header--hidden');

    // If above threshold → transparent, if below → solid
    if (scrollPosition <= this.scrollThreshold) {
      this.header.classList.remove('diamension-header--scrolled');
      this.header.classList.add('diamension-header--transparent-layout');
      this.header.classList.remove('diamension-header--solid-layout');
    } else {
      this.header.classList.add('diamension-header--scrolled');
      this.header.classList.add('diamension-header--solid-layout');
      this.header.classList.remove('diamension-header--transparent-layout');
    }
  }

  // At the very top → always transparent and visible
  if (scrollPosition <= 10) {
    this.header.classList.remove('diamension-header--hidden');
    this.header.classList.remove('diamension-header--scrolled');
    this.header.classList.add('diamension-header--transparent-layout');
    this.header.classList.remove('diamension-header--solid-layout');
  }

  this.lastScrollPosition = scrollPosition;
}
```

Update the search close method to restore correct layout:

```javascript
closeSearch() {
  this.isOpen = false;

  // Restore original behavior
  const header = document.querySelector('[data-header]');
  if (header && this.originalBehavior) {
    header.classList.remove('diamension-header--search-open');
    header.dataset.headerBehavior = this.originalBehavior;
    
    // Re-apply initial state based on restored behavior
    if (this.originalBehavior === 'solid') {
      header.classList.add('diamension-header--scrolled');
      header.classList.add('diamension-header--solid-layout');
      header.classList.remove('diamension-header--transparent-layout');
    } else if (this.originalBehavior === 'transparent') {
      header.classList.remove('diamension-header--scrolled');
      header.classList.add('diamension-header--transparent-layout');
      header.classList.remove('diamension-header--solid-layout');
    } else { // 'auto'
      header.classList.remove('diamension-header--solid-layout');
      header.classList.add('diamension-header--transparent-layout');
      // Scroll position will determine if it should be solid
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollPosition > this.scrollThreshold) {
        header.classList.add('diamension-header--scrolled');
        header.classList.add('diamension-header--solid-layout');
        header.classList.remove('diamension-header--transparent-layout');
      }
    }
  }

  // ... rest of close logic
}
```

### 5. Template-Level Configuration

Merchants can configure this in their theme editor:
- **Homepage**: Set to "Auto" (transparent hero that becomes solid)
- **Product pages**: Set to "Solid" (always solid for readability)
- **Collection pages**: Set to "Solid" (always solid)
- **Blog pages**: Set to "Solid" (always solid)
- **Special landing pages**: Set to "Transparent" (maintain hero effect)

### 6. Backward Compatibility

- Default value is "auto" which matches current behavior
- Existing installations will continue working unchanged
- No breaking changes to existing functionality

## Files to Modify

1. `/Users/wingsdino/Documents/Wings Shopify Projects/diamension/diamension-dawn-theme-new/diamension-shopify-dawn/sections/custom-section-diamension-header.liquid`
   - Add schema setting
   - Add data attribute to header element

2. `/Users/wingsdino/Documents/Wings Shopify Projects/diamension/diamension-dawn-theme-new/diamension-shopify-dawn/assets/section-diamension-header.js`
   - Modify DiamensionHeader class constructor and methods
   - Modify DiamensionSearch class to handle behavior restoration
   - Add setInitialState() method

## Testing Checklist

- [ ] "Auto" behavior works as before (transparent → solid on scroll)
- [ ] "Transparent" behavior stays transparent regardless of scroll
- [ ] "Solid" behavior stays solid regardless of scroll
- [ ] Hover effects work in all modes
- [ ] Search overlay works in all modes and restores correct state after closing
- [ ] Mobile menu works in all modes
- [ ] Cart count updates work in all modes
- [ ] Setting persists after save in theme editor
- [ ] Different pages can have different settings

## Edge Cases Handled

1. **Search in "solid" mode**: Header stays solid during search, returns to solid after
2. **Search in "transparent" mode**: Header becomes solid during search (for readability), returns to transparent after
3. **Mobile menu**: Works consistently across all behavior modes
4. **Hover effects**: Work in all modes but don't permanently change state
5. **Page transitions**: Each page respects its own behavior setting

## Implementation Notes

- Use `dataset` for passing behavior setting from Liquid to JavaScript (cleaner than global variables)
- Store original behavior in search class to properly restore after search closes
- The `isScrolled` flag should reflect actual scroll state only in "auto" mode
- Consider adding a console warning if data-header-behavior attribute is missing
