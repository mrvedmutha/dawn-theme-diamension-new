# Wishlist Button Implementation Overview

## Purpose
A standalone heart-shaped button that allows users to add/remove items to their wishlist with smooth animations and persistent storage.

---

## 1. HTML Structure

```html
<button
  [button-class]
  [liked-modifier-class]?
  [data-attribute-for-button]
  [data-attribute-for-product-id]="{PRODUCT_ID}"
  aria-label="Add to wishlist">

  <!-- Heart SVG Icon -->
  <svg width="19" height="19" viewBox="0 0 19 19">
    <!-- SVG path for heart shape -->
    <path d="...heart shape path..."
          stroke="#183754"
          stroke-width="1.25"
          fill="none"/>
  </svg>
</button>
```

**Key Attributes:**
- `[data-attribute-for-product-id]`: Stores the unique product identifier
- `[liked-modifier-class]`: Applied when item is in wishlist
- `aria-label`: Accessibility label for screen readers

---

## 2. CSS Styling

### Base Button Style
```css
[button-class] {
  position: absolute;
  top: 16px;
  right: 16px;

  /* Size */
  width: 26px;
  height: 26px;
  border-radius: 50%;

  /* Reset defaults */
  background: transparent;
  border: none;

  /* Flexbox centering */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Interaction */
  cursor: pointer;
  z-index: 10;

  /* Smooth transition */
  transition: background-color 0.3s ease;
}
```

### Hover State
```css
[button-class]:hover {
  opacity: 0.8;
}
```

### Liked State (Active/Selected)
```css
[button-class][liked-modifier-class] {
  background-color: #FFFCF9; /* Light cream background */
}
```

### SVG Styling
```css
[button-class] svg {
  width: 18px;
  height: 18px;
  display: block;
}
```

---

## 3. JavaScript Implementation

### 3.1 Configuration
```javascript
CONFIG = {
  STORAGE_KEY: 'project_wishlist_items',
  ANIMATION_LIBRARY: 'GSAP'  // or custom CSS animations
}
```

### 3.2 Storage Manager (LocalStorage)
```javascript
StorageManager = {

  // Get all wishlist items
  get() {
    try {
      data = localStorage.getItem(CONFIG.STORAGE_KEY)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error reading storage')
      return []
    }
  }

  // Add item to wishlist
  add(itemId) {
    wishlist = this.get()
    if (!wishlist.includes(itemId)) {
      wishlist.push(itemId)
      localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(wishlist))
    }
  }

  // Remove item from wishlist
  remove(itemId) {
    wishlist = this.get()
    filtered = wishlist.filter(id => id !== itemId)
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(filtered))
  }

  // Check if item exists in wishlist
  has(itemId) {
    return this.get().includes(itemId)
  }

  // Toggle item in/out of wishlist
  toggle(itemId) {
    if (this.has(itemId)) {
      this.remove(itemId)
      return false  // Not liked anymore
    } else {
      this.add(itemId)
      return true   // Now liked
    }
  }
}
```

### 3.3 Animation Function
```javascript
function animateButtonToggle(buttonElement) {

  // Check if animation library is available
  if (!window[CONFIG.ANIMATION_LIBRARY]) {
    console.error('Animation library not loaded')
    return
  }

  // Create animation timeline
  animationTimeline = ANIMATION_LIBRARY.timeline()

  // Step 1: Scale down (press effect)
  animationTimeline.to(buttonElement, {
    scale: 0.85,           // Shrink to 85%
    duration: 0.1,         // 100ms
    ease: 'power2.in'      // Accelerating easing
  })

  // Step 2: Scale back up with spring (bounce effect)
  animationTimeline.to(buttonElement, {
    scale: 1,              // Return to 100%
    duration: 0.15,        // 150ms
    ease: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)'  // Spring/bounce effect
  })
}
```

**Animation Breakdown:**
1. **Press Down**: Button scales to 85% in 100ms
2. **Spring Back**: Button bounces back to 100% in 150ms with overshoot
3. **Total Duration**: 250ms (0.25 seconds)

### 3.4 Click Event Handler
```javascript
function setupWishlistButtons() {

  // Get all wishlist buttons in the page
  wishlistButtons = document.querySelectorAll('[data-attribute-for-button]')

  // Attach click handler to each button
  wishlistButtons.forEach(button => {

    button.addEventListener('click', (event) => {

      // Get product ID from button attribute
      productId = button.dataset.productId

      // Toggle the wishlist state and get new state
      isNowLiked = StorageManager.toggle(productId)

      // Trigger animation
      animateButtonToggle(button)

      // Update button visual state
      if (isNowLiked) {
        button.classList.add('[liked-modifier-class]')
      } else {
        button.classList.remove('[liked-modifier-class]')
      }
    })
  })
}
```

### 3.5 Initial State Loading
```javascript
function loadInitialWishlistState() {

  // Get all wishlist buttons
  wishlistButtons = document.querySelectorAll('[data-attribute-for-button]')

  // Check each button against stored wishlist
  wishlistButtons.forEach(button => {

    productId = button.dataset.productId

    // If product is in wishlist, mark button as liked
    if (StorageManager.has(productId)) {
      button.classList.add('[liked-modifier-class]')
    }
  })
}
```

### 3.6 Initialization
```javascript
// Run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadInitialWishlistState()  // Set initial button states
  setupWishlistButtons()      // Attach event handlers
})
```

---

## 4. User Interaction Flow

```
┌─────────────────────────────────────────────────────────┐
│ 1. User clicks wishlist button                         │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 2. Get product ID from button attribute                │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 3. Check current state in localStorage                 │
│    - Is product in wishlist?                           │
└────────┬───────────────────────────────┬────────────────┘
         │                               │
    YES  │                               │  NO
         ▼                               ▼
┌──────────────────────┐      ┌──────────────────────────┐
│ Remove from wishlist │      │ Add to wishlist          │
│ Return: false        │      │ Return: true             │
└──────────┬───────────┘      └───────────┬──────────────┘
           │                              │
           └──────────────┬───────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│ 4. Trigger scale animation                              │
│    - Scale down to 85% (100ms)                         │
│    - Spring back to 100% (150ms)                       │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 5. Update button visual state                          │
│    - Add/Remove liked modifier class                   │
│    - Background changes to cream (#FFFCF9) if liked    │
└─────────────────────────────────────────────────────────┘
```

---

## 5. State Management

### LocalStorage Data Structure
```javascript
// Stored as JSON string in localStorage
{
  key: CONFIG.STORAGE_KEY,
  value: ["product_id_1", "product_id_2", "product_id_3"]
}

// Example:
{
  key: "project_wishlist_items",
  value: ["7234567890", "7234567891", "7234567892"]
}
```

### State Persistence
- **Add to Wishlist**: Product ID appended to array
- **Remove from Wishlist**: Product ID filtered out of array
- **Check Status**: Array searched for product ID
- **Storage**: Automatic via localStorage (persists across sessions)

---

## 6. Animation Details

### Animation Timeline
```
Time:     0ms          100ms         250ms
          │             │             │
Scale:    1.0 ────────▶ 0.85 ───────▶ 1.0
          │             │             │
Effect:   [Normal] ─▶ [Pressed] ─▶ [Spring Back]
                      (squeeze)    (bounce)
```

### Easing Curves
- **Scale Down**: `power2.in` - Accelerating compression
- **Scale Up**: `cubic-bezier(0.68, -0.55, 0.27, 1.55)` - Spring with overshoot

### Visual Feedback
1. **Click**: Button immediately shrinks
2. **Release**: Button bounces back with slight overshoot
3. **Background**: Fades to cream color if liked (300ms transition)

---

## 7. Accessibility Features

- **aria-label**: "Add to wishlist" for screen readers
- **Keyboard Support**: Button is focusable and clickable via Enter/Space
- **Visual Feedback**: Background color change provides clear state indication
- **High Contrast**: SVG stroke color (#183754) ensures visibility

---

## 8. Performance Considerations

- **LocalStorage**: Synchronous read/write (fast for small arrays)
- **Animation**: Hardware-accelerated (transform: scale)
- **Event Delegation**: Individual listeners per button (manageable for reasonable counts)
- **Error Handling**: try-catch blocks prevent storage errors from breaking functionality

---

## 9. Browser Compatibility

### Required Features
- `localStorage` API (IE8+)
- `JSON.parse/stringify` (IE8+)
- `querySelector/querySelectorAll` (IE9+)
- `classList` API (IE10+)
- `addEventListener` (IE9+)

### Optional Enhancements
- GSAP animation library (graceful degradation if unavailable)
- CSS transitions (supported in all modern browsers)

---

## 10. Summary

The wishlist button is a **self-contained component** with:

1. **Visual Design**: Circular button with heart SVG icon
2. **Interaction**: Click to toggle wishlist state
3. **Animation**: Smooth scale animation using GSAP
4. **Persistence**: localStorage for cross-session state
5. **Feedback**: Background color change when liked
6. **Accessibility**: ARIA labels and keyboard support

**Total Interaction Time**: ~250ms from click to completion
**State Persistence**: Permanent (until cleared by user)
**Dependencies**: GSAP library for animations (optional)
