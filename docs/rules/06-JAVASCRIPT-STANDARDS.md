# JavaScript Standards

**Modern ES6+, clean code, debug to understand root causes before solving.**

---

## File Creation

**Create separate JS files:**
```
assets/section-[name].js
assets/snippet-[name].js
```

**Link in Liquid:**
```liquid
<script src="{{ 'section-[name].js' | asset_url }}" defer></script>
```

**Use `defer` for performance.**

---

## Code Quality

### Use Modern ES6+ Syntax
```javascript
// ✓ GOOD - Arrow functions, const/let
const toggleMenu = () => {
  const menu = document.querySelector('.mobile-menu');
  menu.classList.toggle('is-active');
};

// ✗ BAD - Old ES5 syntax
var toggleMenu = function() {
  var menu = document.querySelector('.mobile-menu');
  menu.classList.toggle('is-active');
};
```

### Keep Functions Small and Focused
```javascript
// ✓ GOOD - Single Responsibility
const showMenu = () => {
  const menu = document.querySelector('.mobile-menu');
  menu.classList.add('is-active');
};

const hideMenu = () => {
  const menu = document.querySelector('.mobile-menu');
  menu.classList.remove('is-active');
};

// ✗ BAD - Too many responsibilities
const handleMenu = (action, element, className) => {
  // ... complex logic
};
```

### Handle Errors Gracefully
```javascript
// ✓ GOOD - Error handling
const fetchProduct = async (id) => {
  try {
    const response = await fetch(`/products/${id}.js`);
    if (!response.ok) throw new Error('Product not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

// ✗ BAD - No error handling
const fetchProduct = async (id) => {
  const response = await fetch(`/products/${id}.js`);
  return await response.json();
};
```

### Avoid Global Scope Pollution
```javascript
// ✓ GOOD - IIFE or module pattern
(function() {
  const initSlider = () => {
    // ...
  };

  document.addEventListener('DOMContentLoaded', initSlider);
})();

// ✗ BAD - Global functions
function initSlider() {
  // ...
}
```

---

## Debugging & Console Logging

### Debug First, Understand Root Causes, Then Solve

**Console.log is ENCOURAGED during debugging to understand what's happening.**

```javascript
// ✗ BAD - No explanation
console.log('Cart data:', cartData);

// ✓ GOOD - With TODO comment explaining why
// TODO: debugging cart calculation - checking line item totals
console.log('Cart data:', cartData);

// TODO: checking if event fires on mobile devices
console.log('Button clicked:', event.target);

// TODO: verifying API response structure
console.log('Product data:', productData);
```

**Rules:**
1. **Always prefix with `// TODO:`** and brief reason when adding console.log
2. **Use console.log freely** to understand issues during development
3. **Remove before pushing to production** - the TODO prefix makes them easy to find
4. **console.error()** for caught errors is fine to keep (see error handling examples)

**Format:** `// TODO: [brief but clear reason]`

**Strategy:** Debug → Understand → Solve → Clean up console logs before production.

---

## Common Patterns

### DOM Manipulation
```javascript
// Query selectors
const header = document.querySelector('.custom-section-header');
const buttons = document.querySelectorAll('.custom-section-header__button');

// Add/remove classes
header.classList.add('is-sticky');
header.classList.remove('is-hidden');
header.classList.toggle('is-active');

// Event listeners
buttons.forEach(button => {
  button.addEventListener('click', handleClick);
});
```

### Event Handling
```javascript
const handleClick = (event) => {
  event.preventDefault();
  const target = event.currentTarget;
  // ... logic
};

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => btn.addEventListener('click', handleClick));
});
```

### Mobile Menu Toggle
```javascript
const initMobileMenu = () => {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  const close = document.querySelector('.mobile-menu-close');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.add('is-active');
    document.body.classList.add('menu-open');
  });

  close?.addEventListener('click', () => {
    menu.classList.remove('is-active');
    document.body.classList.remove('menu-open');
  });
};

document.addEventListener('DOMContentLoaded', initMobileMenu);
```

### Fetch API
```javascript
const addToCart = async (variantId, quantity = 1) => {
  try {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: variantId,
        quantity: quantity,
      }),
    });

    if (!response.ok) throw new Error('Failed to add to cart');

    const data = await response.json();
    updateCartCount(data.item_count);
    return data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    showError('Could not add item to cart');
    return null;
  }
};
```

### Debounce
```javascript
const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Usage
const handleSearch = debounce((query) => {
  // Perform search
}, 500);

searchInput.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});
```

### Throttle
```javascript
const throttle = (func, limit = 100) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Usage
const handleScroll = throttle(() => {
  // Handle scroll
}, 200);

window.addEventListener('scroll', handleScroll);
```

---

## Shopify-Specific JavaScript

### Cart API
```javascript
// Get cart
const getCart = async () => {
  const response = await fetch('/cart.js');
  return await response.json();
};

// Update cart item
const updateCartItem = async (lineItemKey, quantity) => {
  const response = await fetch('/cart/change.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      line: lineItemKey,
      quantity: quantity,
    }),
  });
  return await response.json();
};

// Clear cart
const clearCart = async () => {
  const response = await fetch('/cart/clear.js', { method: 'POST' });
  return await response.json();
};
```

### Product Recommendations
```javascript
const getProductRecommendations = async (productId) => {
  try {
    const response = await fetch(
      `/recommendations/products.json?product_id=${productId}&limit=4`
    );
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
};
```

### Section Rendering
```javascript
const fetchSection = async (sectionId) => {
  const response = await fetch(`/?section_id=${sectionId}`);
  return await response.text();
};
```

---

## Best Practices

### Use Meaningful Variable Names
```javascript
// ✓ GOOD
const productPrice = 1999;
const formattedPrice = formatPrice(productPrice);

// ✗ BAD
const p = 1999;
const fp = formatPrice(p);
```

### No Magic Numbers
```javascript
// ✓ GOOD
const MAX_CART_ITEMS = 10;
const ANIMATION_DURATION = 300;

if (cart.items.length >= MAX_CART_ITEMS) {
  // ...
}

// ✗ BAD
if (cart.items.length >= 10) {
  // ...
}
```

### DRY Principle
```javascript
// ✓ GOOD - Reusable function
const updateElement = (selector, content) => {
  const element = document.querySelector(selector);
  if (element) element.textContent = content;
};

updateElement('.cart-count', cartCount);
updateElement('.total-price', totalPrice);

// ✗ BAD - Repeated code
const cartCountEl = document.querySelector('.cart-count');
if (cartCountEl) cartCountEl.textContent = cartCount;

const totalPriceEl = document.querySelector('.total-price');
if (totalPriceEl) totalPriceEl.textContent = totalPrice;
```

### Avoid Deep Nesting
```javascript
// ✓ GOOD - Early returns
const processCart = (cart) => {
  if (!cart) return;
  if (!cart.items.length) return;

  cart.items.forEach(item => {
    // ...
  });
};

// ✗ BAD - Deep nesting
const processCart = (cart) => {
  if (cart) {
    if (cart.items.length) {
      cart.items.forEach(item => {
        // ...
      });
    }
  }
};
```

### Comment Complex Logic
```javascript
// Calculate discount percentage based on original and sale prices
const calculateDiscount = (originalPrice, salePrice) => {
  // Round to nearest integer for cleaner display
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

// Intersection Observer for lazy loading images
const observeImages = () => {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
};
```

---

## Performance Tips

### Use Event Delegation
```javascript
// ✓ GOOD - Single listener on parent
document.querySelector('.product-grid').addEventListener('click', (e) => {
  if (e.target.matches('.add-to-cart')) {
    handleAddToCart(e);
  }
});

// ✗ BAD - Multiple listeners
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', handleAddToCart);
});
```

### Defer Non-Critical JavaScript
```liquid
<!-- Load after page content -->
<script src="{{ 'section-[name].js' | asset_url }}" defer></script>
```

### Lazy Load Images
```javascript
const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

document.addEventListener('DOMContentLoaded', lazyLoadImages);
```

---

## Testing Functions (if using Vitest)

**Only if complex utility functions exist.**

```javascript
// assets/section-product-card.js
export const formatPrice = (cents) => {
  return `$${(cents / 100).toFixed(2)}`;
};

export const calculateDiscount = (originalPrice, salePrice) => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

// tests/unit/product-card.test.js
import { test, expect } from 'vitest';
import { formatPrice, calculateDiscount } from '../../assets/section-product-card.js';

test('formats price correctly', () => {
  expect(formatPrice(1999)).toBe('$19.99');
  expect(formatPrice(5000)).toBe('$50.00');
});

test('calculates discount percentage', () => {
  expect(calculateDiscount(100, 80)).toBe(20);
  expect(calculateDiscount(50, 25)).toBe(50);
});
```

---

## Checklist

- [ ] Separate JS file created
- [ ] Modern ES6+ syntax used
- [ ] Functions are small and focused
- [ ] Error handling in place
- [ ] No global scope pollution
- [ ] All console.log statements have TODO comments (or removed before production)
- [ ] Meaningful variable names
- [ ] No magic numbers
- [ ] DRY principle followed
- [ ] Comments for complex logic
- [ ] Performance optimized
- [ ] ESLint warnings addressed
