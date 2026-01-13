# Header Refactor - Implementation Guide

**Version:** 1.0.0
**Last Updated:** 2026-01-13

---

## Implementation Phases

### Phase 1: Schema Refactoring
### Phase 2: Desktop Mega Menu (New Custom Snippet)
### Phase 3: Mobile Navigation Drawer (New Custom Snippet)
### Phase 4: JavaScript Integration
### Phase 5: Testing & Validation

---

## Phase 1: Schema Refactoring

### 1.1 Update Section Settings

**File:** `sections/custom-section-diamension-header.liquid`

**Add mobile menu setting:**
```json
{
  "type": "link_list",
  "id": "mobile_menu",
  "label": "Mobile Menu",
  "default": "main-menu",
  "info": "Select menu for mobile navigation (can differ from desktop)"
}
```

### 1.2 Add `menu_id` to Existing Blocks

**Update `mega_menu_column` block:**
```json
{
  "type": "mega_menu_column",
  "name": "Mega Menu Column",
  "settings": [
    {
      "type": "text",
      "id": "menu_id",
      "label": "Assign to Menu (ID)",
      "default": "shop",
      "info": "Enter lowercase menu ID: shop, brand, customize, blog, etc."
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Column Heading"
    },
    {
      "type": "link_list",
      "id": "menu",
      "label": "Menu"
    }
  ]
}
```

**Update `mega_menu_featured_card` block:**
```json
{
  "type": "mega_menu_featured_card",
  "name": "Mega Menu Featured Card",
  "settings": [
    {
      "type": "text",
      "id": "menu_id",
      "label": "Assign to Menu (ID)",
      "default": "shop",
      "info": "Enter lowercase menu ID: shop, brand, customize, blog, etc."
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "Card Image"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Card Heading",
      "default": "NEW ARRIVALS"
    },
    {
      "type": "url",
      "id": "link",
      "label": "Card Link"
    }
  ]
}
```

**Update `mega_menu_card_item` block:**
```json
{
  "type": "mega_menu_card_item",
  "name": "Mega Menu Card",
  "settings": [
    {
      "type": "text",
      "id": "menu_id",
      "label": "Assign to Menu (ID)",
      "default": "brand",
      "info": "Enter lowercase menu ID: shop, brand, customize, blog, origins, etc."
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "Card Image"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Card Heading",
      "default": "OUR STORY"
    },
    {
      "type": "url",
      "id": "link",
      "label": "Card Link"
    }
  ]
}
```

### 1.3 Add New Mobile Featured Card Block

```json
{
  "type": "mobile_featured_card",
  "name": "Mobile Featured Card",
  "settings": [
    {
      "type": "image_picker",
      "id": "image",
      "label": "Card Image",
      "info": "Displays in Level 1 mobile menu (2x2 grid)"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Card Heading",
      "default": "NEW ARRIVALS"
    },
    {
      "type": "url",
      "id": "link",
      "label": "Card Link"
    }
  ]
}
```

---

## Phase 2: Desktop Mega Menu (Custom Snippet)

### 2.1 Create Snippet File

**File:** `snippets/custom-header-mega-menu.liquid`

**Purpose:** Consolidated desktop mega menu with adaptive layouts

**Accepts:**
- `blocks`: Section blocks
- `menu_id`: ID of menu to render (e.g., 'shop', 'brand')

### 2.2 Snippet Structure

```liquid
{% comment %}
  Custom Header Mega Menu
  Consolidated desktop mega menu with adaptive layouts

  Accepts:
  - blocks: array of blocks from parent section
  - menu_id: which menu to render (e.g., 'shop', 'brand', 'customize')

  Usage:
  {% render 'custom-header-mega-menu', blocks: section.blocks, menu_id: 'shop' %}
{% endcomment %}

{{ 'custom-header-mega-menu.css' | asset_url | stylesheet_tag }}

{%- liquid
  assign menu_id = menu_id | default: 'shop'

  # Filter blocks by menu_id
  assign columns = ''
  assign featured_cards = ''
  assign card_items = ''

  for block in blocks
    case block.type
      when 'mega_menu_column'
        if block.settings.menu_id == menu_id
          assign columns = columns | append: block.id | append: ','
        endif
      when 'mega_menu_featured_card'
        if block.settings.menu_id == menu_id
          assign featured_cards = featured_cards | append: block.id | append: ','
        endif
      when 'mega_menu_card_item'
        if block.settings.menu_id == menu_id
          assign card_items = card_items | append: block.id | append: ','
        endif
    endcase
  endfor

  assign columns_array = columns | split: ','
  assign featured_cards_array = featured_cards | split: ','
  assign card_items_array = card_items | split: ','

  # Determine layout
  assign has_columns = false
  assign has_cards = false

  if columns_array.size > 0
    assign has_columns = true
  endif

  if featured_cards_array.size > 0 or card_items_array.size > 0
    assign has_cards = true
  endif

  # Layout modes:
  # 1. columns-cards: columns left, cards right
  # 2. centered: only columns OR only cards, centered
  # 3. left-aligned: only columns, left-aligned

  assign layout_mode = 'centered'

  if has_columns and has_cards
    assign layout_mode = 'columns-cards'
  elsif has_columns and card_items_array.size == 0
    assign layout_mode = 'left-aligned'
  endif
-%}

<div class="custom-header-mega-menu" data-mega-menu="{{ menu_id }}" data-layout="{{ layout_mode }}">
  <div class="custom-header-mega-menu__wrapper">
    <div class="custom-header-mega-menu__container custom-header-mega-menu__container--{{ layout_mode }}">

      {%- if has_columns -%}
        <div class="custom-header-mega-menu__columns">
          {%- for block in blocks -%}
            {%- if block.type == 'mega_menu_column' and block.settings.menu_id == menu_id -%}
              <div class="custom-header-mega-menu__column" {{ block.shopify_attributes }}>
                {%- if block.settings.heading != blank -%}
                  <h3 class="custom-header-mega-menu__column-heading">
                    {{ block.settings.heading }}
                  </h3>
                {%- endif -%}

                {%- if block.settings.menu != blank -%}
                  <ul class="custom-header-mega-menu__links">
                    {%- for link in block.settings.menu.links -%}
                      <li class="custom-header-mega-menu__link-item">
                        <a href="{{ link.url }}" class="custom-header-mega-menu__link">
                          {{ link.title }}
                        </a>
                      </li>
                    {%- endfor -%}
                  </ul>
                {%- endif -%}
              </div>
            {%- endif -%}
          {%- endfor -%}
        </div>
      {%- endif -%}

      {%- if has_cards -%}
        <div class="custom-header-mega-menu__cards">
          {%- comment -%} Featured Cards {%- endcomment -%}
          {%- for block in blocks -%}
            {%- if block.type == 'mega_menu_featured_card' and block.settings.menu_id == menu_id -%}
              <div class="custom-header-mega-menu__card" {{ block.shopify_attributes }}>
                {%- if block.settings.image != blank -%}
                  <div class="custom-header-mega-menu__card-image">
                    {%- if block.settings.link != blank -%}
                      <a href="{{ block.settings.link }}">
                    {%- endif -%}
                    {{
                      block.settings.image
                      | image_url: width: 306
                      | image_tag:
                        loading: 'lazy',
                        widths: '153, 306',
                        sizes: '153px',
                        class: 'custom-header-mega-menu__card-img'
                    }}
                    {%- if block.settings.link != blank -%}
                      </a>
                    {%- endif -%}
                  </div>
                {%- endif -%}

                {%- if block.settings.heading != blank -%}
                  <h4 class="custom-header-mega-menu__card-heading">
                    {%- if block.settings.link != blank -%}
                      <a href="{{ block.settings.link }}">{{ block.settings.heading }}</a>
                    {%- else -%}
                      {{ block.settings.heading }}
                    {%- endif -%}
                  </h4>
                {%- endif -%}
              </div>
            {%- endif -%}
          {%- endfor -%}

          {%- comment -%} Card Items {%- endcomment -%}
          {%- for block in blocks -%}
            {%- if block.type == 'mega_menu_card_item' and block.settings.menu_id == menu_id -%}
              <div class="custom-header-mega-menu__card" {{ block.shopify_attributes }}>
                {%- if block.settings.image != blank -%}
                  <div class="custom-header-mega-menu__card-image">
                    {%- if block.settings.link != blank -%}
                      <a href="{{ block.settings.link }}">
                    {%- endif -%}
                    {{
                      block.settings.image
                      | image_url: width: 306
                      | image_tag:
                        loading: 'lazy',
                        widths: '153, 306',
                        sizes: '153px',
                        class: 'custom-header-mega-menu__card-img'
                    }}
                    {%- if block.settings.link != blank -%}
                      </a>
                    {%- endif -%}
                  </div>
                {%- endif -%}

                {%- if block.settings.heading != blank -%}
                  <h4 class="custom-header-mega-menu__card-heading">
                    {%- if block.settings.link != blank -%}
                      <a href="{{ block.settings.link }}">{{ block.settings.heading }}</a>
                    {%- else -%}
                      {{ block.settings.heading }}
                    {%- endif -%}
                  </h4>
                {%- endif -%}
              </div>
            {%- endif -%}
          {%- endfor -%}
        </div>
      {%- endif -%}

    </div>
  </div>
</div>
```

### 2.3 Update Header Section

**File:** `sections/custom-section-diamension-header.liquid`

**Replace old mega menu renders with:**

```liquid
{%- comment -%} Mega Menu - SHOP {%- endcomment -%}
{% render 'custom-header-mega-menu', blocks: section.blocks, menu_id: 'shop' %}

{%- comment -%} Mega Menu - BRAND {%- endcomment -%}
{% render 'custom-header-mega-menu', blocks: section.blocks, menu_id: 'brand' %}

{%- comment -%} Mega Menu - CUSTOMIZE {%- endcomment -%}
{% render 'custom-header-mega-menu', blocks: section.blocks, menu_id: 'customize' %}

{%- comment -%} Mega Menu - ORIGINS {%- endcomment -%}
{% render 'custom-header-mega-menu', blocks: section.blocks, menu_id: 'origins' %}

{%- comment -%} Mega Menu - BLOG (if needed) {%- endcomment -%}
{% render 'custom-header-mega-menu', blocks: section.blocks, menu_id: 'blog' %}
```

---

## Phase 3: Mobile Navigation Drawer

### 3.1 Create Snippet File

**File:** `snippets/custom-mobile-nav-drawer.liquid`

**Purpose:** 3-level drill-down mobile navigation

**Accepts:**
- `blocks`: Section blocks
- `mobile_menu`: Mobile menu from section settings

### 3.2 Snippet Structure

```liquid
{% comment %}
  Custom Mobile Navigation Drawer
  3-level drill-down navigation for mobile devices

  Accepts:
  - blocks: array of blocks from parent section
  - mobile_menu: mobile menu setting from section

  Usage:
  {% render 'custom-mobile-nav-drawer', blocks: section.blocks, mobile_menu: section.settings.mobile_menu %}
{% endcomment %}

{{ 'custom-mobile-nav-drawer.css' | asset_url | stylesheet_tag }}

{%- liquid
  assign mobile_menu = mobile_menu | default: linklists['main-menu']
  assign mobile_featured_cards = blocks | where: 'type', 'mobile_featured_card'
-%}

<div class="custom-mobile-nav-drawer" data-mobile-nav-drawer>
  {%- comment -%} Close Button {%- endcomment -%}
  <button type="button" class="custom-mobile-nav-drawer__close" aria-label="Close Menu" data-mobile-nav-close>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke="#183754" stroke-width="2" stroke-linecap="round"/>
      <path d="M6 6L18 18" stroke="#183754" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </button>

  {%- comment -%} Level 1: Main Menu {%- endcomment -%}
  <div class="custom-mobile-nav-drawer__level custom-mobile-nav-drawer__level--1" data-nav-level="1">
    <nav class="custom-mobile-nav-drawer__nav">
      {%- for link in mobile_menu.links -%}
        {%- liquid
          # Check if this link has associated blocks (columns/cards)
          assign link_id = link.title | downcase | strip
          assign has_submenu = false

          for block in blocks
            if block.settings.menu_id == link_id
              assign has_submenu = true
              break
            endif
          endfor
        -%}

        <div class="custom-mobile-nav-drawer__item" data-menu-id="{{ link_id }}">
          {% if has_submenu %}
            <button type="button" class="custom-mobile-nav-drawer__link custom-mobile-nav-drawer__link--has-submenu" data-nav-trigger="{{ link_id }}">
              {{ link.title }}
              <svg class="custom-mobile-nav-drawer__chevron" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          {% else %}
            <a href="{{ link.url }}" class="custom-mobile-nav-drawer__link">
              {{ link.title }}
            </a>
          {% endif %}
          <div class="custom-mobile-nav-drawer__divider"></div>
        </div>
      {%- endfor -%}
    </nav>

    {%- comment -%} Featured Cards {%- endcomment -%}
    {%- if mobile_featured_cards.size > 0 -%}
      <div class="custom-mobile-nav-drawer__featured">
        {%- for block in mobile_featured_cards limit: 4 -%}
          <div class="custom-mobile-nav-drawer__card" {{ block.shopify_attributes }}>
            {%- if block.settings.image != blank -%}
              <div class="custom-mobile-nav-drawer__card-image">
                {%- if block.settings.link != blank -%}
                  <a href="{{ block.settings.link }}">
                {%- endif -%}
                {{
                  block.settings.image
                  | image_url: width: 306
                  | image_tag:
                    loading: 'lazy',
                    widths: '153, 306',
                    sizes: '153px'
                }}
                {%- if block.settings.link != blank -%}
                  </a>
                {%- endif -%}
              </div>
            {%- endif -%}

            {%- if block.settings.heading != blank -%}
              <p class="custom-mobile-nav-drawer__card-heading">
                {%- if block.settings.link != blank -%}
                  <a href="{{ block.settings.link }}">{{ block.settings.heading }}</a>
                {%- else -%}
                  {{ block.settings.heading }}
                {%- endif -%}
              </p>
            {%- endif -%}
          </div>
        {%- endfor -%}
      </div>
    {%- endif -%}

    {%- comment -%} Login/Signup {%- endcomment -%}
    <div class="custom-mobile-nav-drawer__footer">
      <a href="{{ routes.account_url }}" class="custom-mobile-nav-drawer__login">
        LOGIN/SIGNUP
      </a>
    </div>
  </div>

  {%- comment -%} Level 2: Submenu (dynamically generated) {%- endcomment -%}
  {%- for link in mobile_menu.links -%}
    {%- liquid
      assign link_id = link.title | downcase | strip
      assign menu_columns = ''

      for block in blocks
        if block.type == 'mega_menu_column' and block.settings.menu_id == link_id
          assign menu_columns = menu_columns | append: block.id | append: ','
        endif
      endfor

      assign columns_array = menu_columns | split: ','
    -%}

    {%- if columns_array.size > 0 -%}
      <div class="custom-mobile-nav-drawer__level custom-mobile-nav-drawer__level--2" data-nav-level="2" data-parent-id="{{ link_id }}" style="display: none;">
        <div class="custom-mobile-nav-drawer__header">
          <button type="button" class="custom-mobile-nav-drawer__back" data-nav-back>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ link.title }}</span>
          </button>
        </div>

        <nav class="custom-mobile-nav-drawer__nav">
          {%- for block in blocks -%}
            {%- if block.type == 'mega_menu_column' and block.settings.menu_id == link_id -%}
              <div class="custom-mobile-nav-drawer__item" data-column-id="{{ block.id }}">
                <button type="button" class="custom-mobile-nav-drawer__link custom-mobile-nav-drawer__link--has-submenu" data-nav-trigger="{{ block.id }}">
                  {{ block.settings.heading }}
                  <svg class="custom-mobile-nav-drawer__chevron" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div class="custom-mobile-nav-drawer__divider"></div>
              </div>
            {%- endif -%}
          {%- endfor -%}
        </nav>
      </div>
    {%- endif -%}
  {%- endfor -%}

  {%- comment -%} Level 3: Column Links (dynamically generated) {%- endcomment -%}
  {%- for block in blocks -%}
    {%- if block.type == 'mega_menu_column' -%}
      <div class="custom-mobile-nav-drawer__level custom-mobile-nav-drawer__level--3" data-nav-level="3" data-column-id="{{ block.id }}" style="display: none;">
        <div class="custom-mobile-nav-drawer__header">
          <button type="button" class="custom-mobile-nav-drawer__back" data-nav-back>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ block.settings.heading }}</span>
          </button>
        </div>

        <nav class="custom-mobile-nav-drawer__nav">
          {%- if block.settings.menu != blank -%}
            {%- for link in block.settings.menu.links -%}
              <div class="custom-mobile-nav-drawer__item">
                <a href="{{ link.url }}" class="custom-mobile-nav-drawer__link">
                  {{ link.title }}
                </a>
                <div class="custom-mobile-nav-drawer__divider"></div>
              </div>
            {%- endfor -%}
          {%- endif -%}
        </nav>
      </div>
    {%- endif -%}
  {%- endfor -%}
</div>
```

### 3.3 Add to Header Section

**File:** `sections/custom-section-diamension-header.liquid`

**Add after closing `</header>` tag:**

```liquid
{%- comment -%} Mobile Navigation Drawer {%- endcomment -%}
{% render 'custom-mobile-nav-drawer', blocks: section.blocks, mobile_menu: linklists[section.settings.mobile_menu] %}
```

---

## Phase 4: JavaScript Integration

### 4.1 Update DiamensionMegaMenu Class

**File:** `assets/section-diamension-header.js`

**Update `getMegaMenuId()` method:**

```javascript
getMegaMenuId(link) {
  // First check for data-menu-id attribute
  if (link.dataset.menuId) {
    return link.dataset.menuId;
  }

  // Fallback to extracting from link text (lowercase)
  return link.textContent.trim().toLowerCase();
}
```

**Update `showMegaMenu()` to use new custom snippet:**

```javascript
showMegaMenu(megaMenu) {
  // Use custom-header-mega-menu selector
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

  // Hide all other mega menus
  this.megaMenus.forEach((menu) => {
    if (menu !== targetMegaMenu) {
      this.hideMegaMenu(menu);
    }
  });

  // Show target mega menu
  targetMegaMenu.classList.add('is-active');

  // GSAP Animation
  if (typeof gsap !== 'undefined') {
    const columns = targetMegaMenu.querySelectorAll('.custom-header-mega-menu__column');
    const cards = targetMegaMenu.querySelectorAll('.custom-header-mega-menu__card');

    if (columns.length > 0 || cards.length > 0) {
      gsap.fromTo(
        [...columns, ...cards],
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05 }
      );
    }
  }

  this.activeMegaMenu = targetMegaMenu;
}
```

### 4.2 Create DiamensionMobileNav Class

**File:** `assets/section-diamension-header.js`

**Add new class after DiamensionMegaMenu:**

```javascript
/**
 * Mobile Navigation Drawer
 * 3-level drill-down navigation
 */
class DiamensionMobileNav {
  constructor() {
    this.drawer = document.querySelector('[data-mobile-nav-drawer]');
    this.hamburger = document.querySelector('[data-hamburger]');
    this.hamburgerSticky = document.querySelector('[data-hamburger-sticky]');
    this.closeButton = document.querySelector('[data-mobile-nav-close]');
    this.isOpen = false;
    this.currentLevel = 1;
    this.levelStack = []; // Track navigation history

    if (this.drawer) {
      this.init();
    }
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Hamburger toggles
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.open());
    }

    if (this.hamburgerSticky) {
      this.hamburgerSticky.addEventListener('click', () => this.open());
    }

    // Close button
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.close());
    }

    // Level triggers (accordion buttons)
    const triggers = this.drawer.querySelectorAll('[data-nav-trigger]');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        const targetId = trigger.dataset.navTrigger;
        this.navigateToLevel(targetId, parseInt(trigger.closest('[data-nav-level]').dataset.navLevel));
      });
    });

    // Back buttons
    const backButtons = this.drawer.querySelectorAll('[data-nav-back]');
    backButtons.forEach(btn => {
      btn.addEventListener('click', () => this.navigateBack());
    });

    // Close on link click
    const links = this.drawer.querySelectorAll('a:not([data-nav-trigger])');
    links.forEach(link => {
      link.addEventListener('click', () => this.close());
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  open() {
    this.isOpen = true;
    this.drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // GSAP: Slide in from right + fade
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(
        this.drawer,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }

    // Reset to level 1
    this.resetToLevel1();
  }

  close() {
    this.isOpen = false;

    if (typeof gsap !== 'undefined') {
      gsap.to(this.drawer, {
        x: '100%',
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          this.drawer.classList.remove('is-open');
          document.body.style.overflow = '';
          this.resetToLevel1();
        }
      });
    } else {
      this.drawer.classList.remove('is-open');
      document.body.style.overflow = '';
      this.resetToLevel1();
    }
  }

  navigateToLevel(targetId, currentLevel) {
    // Find target level
    let targetLevel;

    if (currentLevel === 1) {
      // Level 1 → Level 2
      targetLevel = this.drawer.querySelector(`[data-nav-level="2"][data-parent-id="${targetId}"]`);
    } else if (currentLevel === 2) {
      // Level 2 → Level 3
      targetLevel = this.drawer.querySelector(`[data-nav-level="3"][data-column-id="${targetId}"]`);
    }

    if (!targetLevel) return;

    const currentLevelEl = this.drawer.querySelector(`[data-nav-level="${currentLevel}"]`);

    // Push to stack
    this.levelStack.push({
      level: currentLevel,
      element: currentLevelEl
    });

    // GSAP Animation: Current slides left, new slides in from right
    if (typeof gsap !== 'undefined') {
      // Current level slides left and fades
      gsap.to(currentLevelEl, {
        x: '-20%',
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          currentLevelEl.style.display = 'none';
        }
      });

      // New level slides in from right
      targetLevel.style.display = 'block';
      gsap.fromTo(
        targetLevel,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.1 }
      );
    } else {
      currentLevelEl.style.display = 'none';
      targetLevel.style.display = 'block';
    }

    this.currentLevel = currentLevel + 1;
  }

  navigateBack() {
    if (this.levelStack.length === 0) return;

    const previous = this.levelStack.pop();
    const currentLevelEl = this.drawer.querySelector(`[data-nav-level="${this.currentLevel}"]`);

    // GSAP Animation: Current fades out, previous appears
    if (typeof gsap !== 'undefined') {
      // Current level fades out
      gsap.to(currentLevelEl, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          currentLevelEl.style.display = 'none';
        }
      });

      // Previous level appears
      previous.element.style.display = 'block';
      gsap.to(previous.element, {
        x: '0%',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        delay: 0.1
      });
    } else {
      currentLevelEl.style.display = 'none';
      previous.element.style.display = 'block';
    }

    this.currentLevel = previous.level;
  }

  resetToLevel1() {
    // Hide all levels except level 1
    const allLevels = this.drawer.querySelectorAll('[data-nav-level]');
    allLevels.forEach(level => {
      if (level.dataset.navLevel === '1') {
        level.style.display = 'block';
        level.style.opacity = '1';
        level.style.transform = 'translateX(0)';
      } else {
        level.style.display = 'none';
      }
    });

    this.currentLevel = 1;
    this.levelStack = [];
  }
}
```

### 4.3 Initialize New Class

**File:** `assets/section-diamension-header.js`

**Update initialization:**

```javascript
// Initialize header, search, mega menu, mobile nav, and cart drawer when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new DiamensionHeader();
    new DiamensionSearch();
    new DiamensionMegaMenu();
    new DiamensionMobileNav(); // NEW
    initCartDrawer();
  });
} else {
  new DiamensionHeader();
  new DiamensionSearch();
  new DiamensionMegaMenu();
  new DiamensionMobileNav(); // NEW
  initCartDrawer();
}
```

---

## Phase 5: Testing & Validation

### 5.1 Desktop Testing

- [ ] Hover mega menus on desktop
- [ ] Click mega menus on tablet
- [ ] Close on scroll down
- [ ] Close on mouse leave
- [ ] All menu items show correct mega menus
- [ ] Adaptive layouts work (columns+cards, centered, left-aligned)
- [ ] GSAP animations smooth
- [ ] No JavaScript errors

### 5.2 Mobile Testing

- [ ] Drawer opens from hamburger
- [ ] Drawer closes from X button
- [ ] Drawer closes from ESC key
- [ ] Level 1 → Level 2 navigation works
- [ ] Level 2 → Level 3 navigation works
- [ ] Back button works (all levels)
- [ ] Terminal links navigate correctly
- [ ] Featured cards display (2x2 grid)
- [ ] LOGIN/SIGNUP link works
- [ ] Animations smooth on real devices
- [ ] No layout shifts

### 5.3 Cross-Browser Testing

- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox
- [ ] Edge

### 5.4 Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] ARIA attributes correct
- [ ] Focus states visible
- [ ] Tab order logical

---

## Troubleshooting

### Issue: Mega menu not showing

**Check:**
1. `menu_id` in block settings matches link ID
2. Blocks are assigned to correct menu
3. JavaScript console for errors
4. `data-mega-menu` attribute on menu div

### Issue: Mobile drawer not animating

**Check:**
1. GSAP loaded globally
2. JavaScript console for errors
3. CSS transitions not conflicting
4. `data-nav-level` attributes correct

### Issue: Back button not working

**Check:**
1. `data-nav-back` attribute present
2. `levelStack` not empty
3. Previous level exists in DOM
4. JavaScript console for errors

---

## Performance Optimization

1. **Lazy load featured card images**
2. **Minimize DOM queries** (cache selectors)
3. **Debounce resize handlers**
4. **Use requestAnimationFrame for scroll handlers**
5. **Remove console.log statements before production**

---

## Next Steps After Implementation

1. Test on real devices
2. Run Playwright visual regression tests
3. Review with design team
4. QA on staging environment
5. Deploy to production

---

## Resources

- **GSAP Docs:** https://greensock.com/docs/
- **Shopify Liquid Docs:** https://shopify.dev/docs/api/liquid
- **BEM Methodology:** http://getbem.com/
- **Accessibility Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
