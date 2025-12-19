# Product Collection Section - Implementation Guide

## 📌 Purpose
This document provides step-by-step implementation instructions for the Diamension custom product collection page. Follow these instructions sequentially to build the section from scratch.

**CRITICAL:** Before starting, you MUST have read:
1. `01-overview.md` - Section overview
2. `02-design-tokens.md` - Design specifications
3. All files in `docs/rules/` - Project standards
4. All Figma nodes listed in design tokens

---

## 🚀 Implementation Steps

### Phase 1: Setup and Structure

#### Step 1.1: Create Section File
**File:** `sections/section-product-collection-diamension.liquid`

**Initial Structure:**
```liquid
{% comment %}
  Section: Product Collection Diamension
  Purpose: Custom collection page with progressive loading and promotional image cards
  Author: Wings Design Team
  Version: 1.0
{% endcomment %}

{% liquid
  # Assign section settings
  assign breadcrumb_menu = section.settings.breadcrumb_menu
  assign products_per_page = section.settings.products_per_page | default: 20
  assign show_filter = section.settings.show_filter_button
  assign show_sort = section.settings.show_sort_button
  assign enable_ajax = section.settings.enable_ajax_loading

  # Assign collection metafields
  assign hero_image = collection.metafields.custom.collection_hero_image
  assign hero_caption = collection.metafields.custom.collection_caption
  assign first_image_card = collection.metafields.custom.collection_first_image
  assign second_image_card = collection.metafields.custom.collection_second_image

  # Calculate product counts
  assign total_products = collection.products.size
  assign has_enough_for_images = false
  if total_products >= 10
    assign has_enough_for_images = true
  endif
%}

{%- comment -%} Full-width wrapper {%- endcomment -%}
<div class="collection-diamension-wrapper" data-section-id="{{ section.id }}">

  {%- comment -%} Hero image section (full-width) {%- endcomment -%}
  {% if hero_image %}
    <div class="collection-diamension__hero">
      <!-- Hero implementation -->
    </div>
  {% endif %}

  {%- comment -%} Main container (1440px max-width) {%- endcomment -%}
  <div class="collection-diamension__container">

    {%- comment -%} Breadcrumb {%- endcomment -%}
    <div class="collection-diamension__breadcrumb">
      <!-- Breadcrumb implementation -->
    </div>

    {%- comment -%} Title + Filter/Sort {%- endcomment -%}
    <div class="collection-diamension__header">
      <!-- Header implementation -->
    </div>

    {%- comment -%} Product grid {%- endcomment -%}
    <div class="collection-diamension__grid" data-product-grid>
      <!-- Product grid implementation -->
    </div>

    {%- comment -%} Load more section {%- endcomment -%}
    <div class="collection-diamension__load-more">
      <!-- Load more implementation -->
    </div>

  </div>
</div>

{% schema %}
{
  "name": "Product Collection Diamension",
  "class": "section-collection-diamension",
  "settings": [
    {
      "type": "link_list",
      "id": "breadcrumb_menu",
      "label": "Breadcrumb Menu",
      "info": "Select menu for breadcrumb navigation"
    },
    {
      "type": "range",
      "id": "products_per_page",
      "label": "Products Per Page",
      "min": 12,
      "max": 40,
      "step": 4,
      "default": 20
    },
    {
      "type": "checkbox",
      "id": "show_filter_button",
      "label": "Show Filter Button",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_sort_button",
      "label": "Show Sort Button",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "enable_ajax_loading",
      "label": "Enable AJAX Loading",
      "default": true,
      "info": "Load more products without page refresh"
    }
  ],
  "presets": [
    {
      "name": "Product Collection Diamension"
    }
  ]
}
{% endschema %}
```

---

#### Step 1.2: Create CSS File
**File:** `assets/section-product-collection-diamension.css`

**Base Structure:**
```css
/* =============================================================================
   Product Collection Diamension - Base Styles
   ============================================================================= */

/* Wrapper (Full-width background) */
.collection-diamension-wrapper {
  background-color: #f0efea;
  width: 100%;
}

/* Container (1440px max-width, centered) */
.collection-diamension__container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 50px;
}

/* Hero Section (Full-width) */
.collection-diamension__hero {
  width: 100%;
  aspect-ratio: 1440 / 641.703;
  position: relative;
  overflow: hidden;
}

/* Breadcrumb */
.collection-diamension__breadcrumb {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 8px 0 0;
  margin-bottom: 24px;
}

/* Header (Title + Filter/Sort) */
.collection-diamension__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 24px;
}

/* Product Grid */
.collection-diamension__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px 10px;
  padding: 0 10px;
}

/* Load More */
.collection-diamension__load-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 60px 50px;
}

/* =============================================================================
   Responsive Styles
   ============================================================================= */

@media screen and (max-width: 1023px) {
  .collection-diamension__container {
    padding: 0 30px;
  }
}

@media screen and (max-width: 767px) {
  .collection-diamension__container {
    padding: 0 20px;
  }

  .collection-diamension__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 479px) {
  .collection-diamension__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

#### Step 1.3: Create JavaScript File
**File:** `assets/section-product-collection-diamension.js`

**Base Structure:**
```javascript
/**
 * Product Collection Diamension - JavaScript
 * Handles AJAX loading, wishlist, and dynamic grid behavior
 */

class CollectionDiamension {
  constructor(container) {
    this.container = container;
    this.sectionId = container.dataset.sectionId;
    this.productGrid = container.querySelector('[data-product-grid]');
    this.loadMoreBtn = container.querySelector('[data-load-more]');
    this.progressText = container.querySelector('[data-progress-text]');

    this.productsPerPage = 20;
    this.currentPage = 1;
    this.totalProducts = 0;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initWishlist();
  }

  setupEventListeners() {
    if (this.loadMoreBtn) {
      this.loadMoreBtn.addEventListener('click', this.loadMoreProducts.bind(this));
    }
  }

  loadMoreProducts() {
    // AJAX loading implementation
  }

  initWishlist() {
    // Wishlist functionality
  }

  updateProgress() {
    // Update progress indicator
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.collection-diamension-wrapper');
  sections.forEach(section => new CollectionDiamension(section));
});
```

---

### Phase 2: Component Implementation

#### Step 2.1: Hero Image Section

**Liquid Implementation:**
```liquid
{% if hero_image %}
  <div class="collection-diamension__hero">
    {% if hero_image.src %}
      <img
        src="{{ hero_image | image_url: width: 1440 }}"
        srcset="{{ hero_image | image_url: width: 768 }} 768w,
                {{ hero_image | image_url: width: 1024 }} 1024w,
                {{ hero_image | image_url: width: 1440 }} 1440w,
                {{ hero_image | image_url: width: 1920 }} 1920w"
        sizes="100vw"
        alt="{{ collection.title }}"
        loading="eager"
        class="collection-diamension__hero-image"
      >
    {% endif %}

    {% if hero_caption != blank %}
      <div class="collection-diamension__hero-caption">
        <p>{{ hero_caption }}</p>
      </div>
    {% endif %}
  </div>
{% endif %}
```

**CSS:**
```css
.collection-diamension__hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.collection-diamension__hero-caption {
  position: absolute;
  bottom: 32px;
  left: 50px;
  padding: 16px 24px;
  background: rgba(0, 0, 0, 0.5);
  color: #fffaf5;
  font-family: 'Neue Montreal', sans-serif;
  font-size: 16px;
  line-height: normal;
}
```

---

#### Step 2.2: Breadcrumb Navigation

**Liquid Implementation:**
```liquid
<nav class="collection-diamension__breadcrumb" aria-label="Breadcrumb">
  {% if breadcrumb_menu and linklists[breadcrumb_menu] %}
    {% for link in linklists[breadcrumb_menu].links %}
      <a href="{{ link.url }}" class="collection-diamension__breadcrumb-link">
        {{ link.title }}
      </a>
      {% unless forloop.last %}
        <span class="collection-diamension__breadcrumb-separator">
          <svg width="19" height="1" viewBox="0 0 19 1" fill="none">
            <line x1="0" y1="0.5" x2="19" y2="0.5" stroke="#183754"/>
          </svg>
        </span>
      {% endunless %}
    {% endfor %}
  {% endif %}

  {%- comment -%} Always show current collection {%- endcomment -%}
  {% if breadcrumb_menu and linklists[breadcrumb_menu].links.size > 0 %}
    <span class="collection-diamension__breadcrumb-separator">
      <svg width="19" height="1" viewBox="0 0 19 1" fill="none">
        <line x1="0" y1="0.5" x2="19" y2="0.5" stroke="#183754"/>
      </svg>
    </span>
  {% endif %}
  <span class="collection-diamension__breadcrumb-current">
    {{ collection.title }}
  </span>
</nav>
```

**CSS:**
```css
.collection-diamension__breadcrumb-link,
.collection-diamension__breadcrumb-current {
  font-family: 'Neue Montreal', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #183754;
  line-height: normal;
  text-decoration: none;
  white-space: nowrap;
}

.collection-diamension__breadcrumb-link:hover {
  opacity: 0.8;
}

.collection-diamension__breadcrumb-separator {
  display: flex;
  align-items: center;
  height: 19px;
  transform: rotate(90deg);
}
```

---

#### Step 2.3: Collection Header (Title + Filter/Sort)

**Liquid Implementation:**
```liquid
<div class="collection-diamension__header">
  <div class="collection-diamension__title-wrapper">
    <h1 class="collection-diamension__title">{{ collection.title | upcase }}</h1>
    {% if collection.description != blank %}
      <div class="collection-diamension__description">
        {{ collection.description }}
      </div>
    {% endif %}
  </div>

  <div class="collection-diamension__controls">
    {% if show_filter %}
      <button class="collection-diamension__filter-btn" type="button" aria-label="Filter products">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <!-- Filter icon SVG -->
          <path d="M..." stroke="#183754" stroke-width="1.5"/>
        </svg>
        <span>Filter</span>
      </button>
    {% endif %}

    {% if show_sort %}
      <button class="collection-diamension__sort-btn" type="button" aria-label="Sort products">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <!-- Sort icon SVG -->
          <path d="M..." stroke="#183754" stroke-width="1.5"/>
        </svg>
        <span>Sort</span>
      </button>
    {% endif %}
  </div>
</div>
```

**CSS:**
```css
.collection-diamension__title {
  font-family: 'Neue Montreal', sans-serif;
  font-size: 32px;
  font-weight: 400;
  color: #183754;
  line-height: normal;
  text-transform: uppercase;
  margin: 0 0 10px 0;
}

.collection-diamension__description {
  font-family: 'Neue Montreal', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #3e6282;
}

.collection-diamension__controls {
  display: flex;
  gap: 24px;
  align-items: center;
}

.collection-diamension__filter-btn,
.collection-diamension__sort-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #183754;
}

.collection-diamension__filter-btn:hover,
.collection-diamension__sort-btn:hover {
  opacity: 0.8;
}
```

---

#### Step 2.4: Product Card Component

**Create Snippet:** `snippets/product-card-collection-diamension.liquid`

```liquid
{% comment %}
  Parameters:
  - product: Product object
  - index: Card index (for image card logic)
{% endcomment %}

{% liquid
  assign product_url = product.url
  assign product_title = product.title
  assign product_price = product.price | money
  assign product_image = product.featured_image
  assign is_new = product.metafields.custom.is_new_arrival
  assign product_id = product.id
%}

<div class="product-card-collection" data-product-id="{{ product_id }}">
  <a href="{{ product_url }}" class="product-card-collection__link">
    <div class="product-card-collection__image-wrapper">
      {% if product_image %}
        <img
          src="{{ product_image | image_url: width: 400 }}"
          srcset="{{ product_image | image_url: width: 200 }} 200w,
                  {{ product_image | image_url: width: 400 }} 400w,
                  {{ product_image | image_url: width: 600 }} 600w"
          sizes="(min-width: 1024px) 348px, (min-width: 768px) 25vw, (min-width: 480px) 33vw, 50vw"
          alt="{{ product_title }}"
          loading="lazy"
          class="product-card-collection__image"
        >
      {% endif %}
    </div>

    <div class="product-card-collection__info">
      <h3 class="product-card-collection__title">{{ product_title }}</h3>
      <p class="product-card-collection__price">From {{ product_price }}</p>
    </div>
  </a>

  {%- comment -%} Wishlist button {%- endcomment -%}
  <button
    class="product-card-collection__wishlist"
    data-wishlist-toggle
    data-product-id="{{ product_id }}"
    aria-label="Add to wishlist"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="wishlist-icon">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            stroke="#183754"
            stroke-width="1.25"
            fill="none"
            class="wishlist-icon__path"/>
    </svg>
  </button>

  {%- comment -%} NEW ARRIVAL badge {%- endcomment -%}
  {% if is_new %}
    <div class="product-card-collection__badge">
      NEW ARRIVAL
    </div>
  {% endif %}
</div>
```

**CSS:**
```css
.product-card-collection {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: clip;
}

.product-card-collection__link {
  text-decoration: none;
  color: inherit;
}

.product-card-collection__image-wrapper {
  width: 100%;
  height: 500px;
  background: #f0efea;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: clip;
  position: relative;
}

.product-card-collection__image {
  width: 400px;
  height: 400px;
  object-fit: cover;
  object-position: 50% 50%;
}

.product-card-collection__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.product-card-collection__title {
  font-family: 'Neue Montreal', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #183754;
  line-height: normal;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-card-collection__price {
  font-family: 'Neue Montreal', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #3e6282;
  line-height: normal;
  margin: 0;
}

/* Wishlist Button */
.product-card-collection__wishlist {
  position: absolute;
  top: 24px;
  right: 12px;
  width: 30px;
  height: 30px;
  border-radius: 100px;
  padding: 2px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.product-card-collection__wishlist.is-active {
  background: #fffcf9;
}

.product-card-collection__wishlist.is-active .wishlist-icon__path {
  fill: #183754;
}

/* Badge */
.product-card-collection__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 10px;
  background: #fffaf5;
  font-family: 'Neue Montreal', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #183754;
  line-height: normal;
  z-index: 10;
}
```

---

#### Step 2.5: Image Card Component

**Create Snippet:** `snippets/image-card-collection-diamension.liquid`

```liquid
{% comment %}
  Parameters:
  - image_card: Metaobject with image, caption, button_text, button_link
{% endcomment %}

{% if image_card %}
  {% liquid
    assign card_image = image_card.image
    assign card_caption = image_card.caption
    assign card_button_text = image_card.button_text
    assign card_button_link = image_card.button_link
  %}

  <div class="image-card-collection">
    <div class="image-card-collection__media">
      {% if card_image.src contains '.mp4' or card_image.src contains 'video' %}
        <video autoplay loop muted playsinline class="image-card-collection__video">
          <source src="{{ card_image.src }}" type="video/mp4">
        </video>
      {% else %}
        <img
          src="{{ card_image | image_url: width: 704 }}"
          srcset="{{ card_image | image_url: width: 704 }} 704w,
                  {{ card_image | image_url: width: 1408 }} 1408w"
          sizes="(min-width: 1024px) 704px, 100vw"
          alt="{{ card_caption | strip_html | truncate: 50 }}"
          loading="lazy"
          class="image-card-collection__image"
        >
      {% endif %}
    </div>

    {% if card_caption != blank or card_button_text != blank %}
      <div class="image-card-collection__overlay">
        {% if card_caption != blank %}
          <div class="image-card-collection__caption">
            {{ card_caption }}
          </div>
        {% endif %}

        {% if card_button_text != blank and card_button_link != blank %}
          <a href="{{ card_button_link }}" class="image-card-collection__cta">
            {{ card_button_text | upcase }}
          </a>
        {% endif %}
      </div>
    {% endif %}
  </div>
{% endif %}
```

**CSS:**
```css
.image-card-collection {
  grid-column: span 2;
  height: 500px;
  position: relative;
  overflow: clip;
}

.image-card-collection__media {
  width: 100%;
  height: 100%;
  position: relative;
}

.image-card-collection__image,
.image-card-collection__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.image-card-collection__overlay {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding: 24px 146px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  background: linear-gradient(
    to bottom,
    rgba(197, 188, 160, 0) 12.016%,
    rgba(0, 0, 0, 0.3) 61.954%
  );
}

.image-card-collection__caption {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-size: 16px;
  line-height: normal;
  color: #e7e6d4;
  text-align: center;
  min-width: 100%;
  width: min-content;
}

.image-card-collection__cta {
  border: 1px solid #e7e6d4;
  padding: 10px 60px;
  background: transparent;
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #e7e6d4;
  text-transform: uppercase;
  text-decoration: none;
  line-height: normal;
  cursor: pointer;
}

.image-card-collection__cta:hover {
  background: rgba(255, 255, 255, 0.1);
}
```

---

### Phase 3: Grid Logic and AJAX Loading

#### Step 3.1: Product Grid with Image Card Insertion

**Liquid Implementation:**
```liquid
<div class="collection-diamension__grid" data-product-grid>
  {% paginate collection.products by products_per_page %}
    {% for product in collection.products %}
      {% assign index = forloop.index %}

      {%- comment -%} First image card after products 9-10 {%- endcomment -%}
      {% if index == 10 and has_enough_for_images and first_image_card %}
        {% render 'image-card-collection-diamension', image_card: first_image_card %}
      {% endif %}

      {%- comment -%} Render product card {%- endcomment -%}
      {% render 'product-card-collection-diamension', product: product, index: index %}

      {%- comment -%} Second image card before products 19-20 {%- endcomment -%}
      {% if index == 18 and has_enough_for_images and second_image_card %}
        {% render 'image-card-collection-diamension', image_card: second_image_card %}
      {% endif %}
    {% endfor %}
  {% endpaginate %}
</div>
```

---

#### Step 3.2: Load More Section

**Liquid Implementation:**
```liquid
<div class="collection-diamension__load-more">
  {% paginate collection.products by products_per_page %}
    {% if paginate.pages > 1 %}
      <div class="collection-diamension__progress">
        <p class="collection-diamension__progress-text" data-progress-text>
          Showing {{ paginate.current_offset | plus: paginate.page_size }} of {{ paginate.items }} products
        </p>
        <div class="collection-diamension__progress-line">
          <svg width="110" height="1" viewBox="0 0 110 1" fill="none">
            <line x1="0" y1="0.5" x2="110" y2="0.5" stroke="#183754"/>
          </svg>
        </div>
      </div>

      {% unless paginate.next %}
        <button
          class="collection-diamension__load-more-btn"
          data-load-more
          data-next-url="{{ paginate.next.url }}"
        >
          Load More
        </button>
      {% endunless %}
    {% endif %}
  {% endpaginate %}
</div>
```

**CSS:**
```css
.collection-diamension__progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.collection-diamension__progress-text {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #183754;
  text-align: center;
  margin: 0;
}

.collection-diamension__load-more-btn {
  padding: 16px 120px;
  border: 1px solid #183754;
  background: transparent;
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #183754;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.collection-diamension__load-more-btn:hover {
  background: #183754;
  color: #fffaf5;
}

.collection-diamension__load-more-btn:disabled {
  opacity: 0.6;
  cursor: wait;
}
```

---

#### Step 3.3: AJAX Loading JavaScript

**JavaScript Implementation:**
```javascript
loadMoreProducts() {
  const nextUrl = this.loadMoreBtn.dataset.nextUrl;
  if (!nextUrl) return;

  this.loadMoreBtn.disabled = true;
  this.loadMoreBtn.textContent = 'Loading...';

  fetch(nextUrl)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Get new products
      const newProducts = doc.querySelectorAll('[data-product-grid] > *');
      newProducts.forEach(product => {
        this.productGrid.appendChild(product.cloneNode(true));
      });

      // Update progress
      const newProgressText = doc.querySelector('[data-progress-text]');
      if (newProgressText && this.progressText) {
        this.progressText.textContent = newProgressText.textContent;
      }

      // Update next URL or hide button
      const newLoadMoreBtn = doc.querySelector('[data-load-more]');
      if (newLoadMoreBtn && newLoadMoreBtn.dataset.nextUrl) {
        this.loadMoreBtn.dataset.nextUrl = newLoadMoreBtn.dataset.nextUrl;
        this.loadMoreBtn.disabled = false;
        this.loadMoreBtn.textContent = 'Load More';
      } else {
        this.loadMoreBtn.style.display = 'none';
      }

      // Reinitialize wishlist for new products
      this.initWishlist();
    })
    .catch(error => {
      console.error('Error loading products:', error);
      this.loadMoreBtn.disabled = false;
      this.loadMoreBtn.textContent = 'Load More';
    });
}
```

---

#### Step 3.4: Wishlist Functionality

**JavaScript Implementation:**
```javascript
initWishlist() {
  const wishlistButtons = this.container.querySelectorAll('[data-wishlist-toggle]');

  wishlistButtons.forEach(btn => {
    const productId = btn.dataset.productId;

    // Check if in wishlist
    if (this.isInWishlist(productId)) {
      btn.classList.add('is-active');
    }

    // Add click handler
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleWishlist(btn, productId);
    });
  });
}

toggleWishlist(btn, productId) {
  const wishlist = this.getWishlist();
  const index = wishlist.indexOf(productId);

  if (index > -1) {
    // Remove from wishlist
    wishlist.splice(index, 1);
    btn.classList.remove('is-active');
  } else {
    // Add to wishlist
    wishlist.push(productId);
    btn.classList.add('is-active');
  }

  this.saveWishlist(wishlist);
  this.animateWishlist(btn);
}

getWishlist() {
  const stored = localStorage.getItem('diamension_wishlist');
  return stored ? JSON.parse(stored) : [];
}

saveWishlist(wishlist) {
  localStorage.setItem('diamension_wishlist', JSON.stringify(wishlist));
}

isInWishlist(productId) {
  const wishlist = this.getWishlist();
  return wishlist.includes(productId);
}

animateWishlist(btn) {
  btn.style.transform = 'scale(0.85)';
  setTimeout(() => {
    btn.style.transform = 'scale(1)';
  }, 150);
}
```

---

### Phase 4: Testing and Validation

#### Step 4.1: Testing Checklist

**Functionality Tests:**
- [ ] Hero image displays when metafield populated
- [ ] Breadcrumb shows dynamic menu links
- [ ] Product grid displays correctly (4/4/3/2 columns)
- [ ] Image cards only show when collection has 10+ products
- [ ] Image cards position correctly (after products 9-10 and 18-19)
- [ ] AJAX loading works without page refresh
- [ ] Progress indicator updates correctly
- [ ] Wishlist persists across page reloads
- [ ] Filter/Sort buttons display (non-functional)

**Responsive Tests:**
- [ ] Desktop: 4 columns, image cards take 2 spaces
- [ ] Tablet: 4 columns, image cards take 2 spaces
- [ ] Big mobile: 3 columns, image after 12 products
- [ ] Small mobile: 2 columns, image after 10 products

**Edge Case Tests:**
- [ ] Collection with 0 products
- [ ] Collection with 5 products (no image cards)
- [ ] Collection with exactly 10 products (show image cards)
- [ ] Collection with 100+ products (multiple batches)
- [ ] Missing metafields (hero, captions, etc.)
- [ ] Empty breadcrumb menu
- [ ] Video vs. image in image cards

---

#### Step 4.2: Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

#### Step 4.3: Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Focus states visible
- [ ] ARIA labels present
- [ ] Semantic HTML used
- [ ] Color contrast passes WCAG AA

---

### Phase 5: Optimization

#### Step 5.1: Performance Optimization
- Use lazy loading for images
- Optimize image sizes with srcset
- Minify CSS and JavaScript
- Defer non-critical JavaScript
- Use CSS Grid for layout (not Flexbox)

#### Step 5.2: SEO Optimization
- Proper heading hierarchy (H1 for title)
- Semantic HTML structure
- Alt text for images
- Structured data (JSON-LD)

---

## 📚 Final Steps

1. Test all Figma nodes match implementation
2. Validate HTML/CSS/JavaScript
3. Run accessibility audit
4. Test on real Shopify store
5. Get client approval
6. Deploy to production

---

**Version:** 1.0
**Last Updated:** 2025-01-19
**Developer:** Follow this guide sequentially
