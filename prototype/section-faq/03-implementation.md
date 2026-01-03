# FAQ Section - Implementation Guide

**Technical implementation details for `custom-section-faq`**

---

## File Structure

### Theme Files to Create

```
📁 sections/
  └─ custom-section-faq.liquid          # Main section file

📁 blocks/
  ├─ faq-tab.liquid                     # Theme block: Tab container
  └─ faq-item.liquid                    # Theme block: FAQ question/answer

📁 assets/
  ├─ section-faq.css                    # Styles
  └─ section-faq.js                     # Tab navigation + accordion logic
```

---

## 1. Theme Block: FAQ Tab

**File:** `/blocks/faq-tab.liquid`

```liquid
{% comment %}
  FAQ Tab Block - Container for FAQ items
  Can contain nested faq-item blocks
{% endcomment %}

<div
  class="custom-section-faq__category"
  data-tab-id="{{ block.settings.tab_id }}"
  {{ block.shopify_attributes }}
>
  {%- comment -%} Category Heading {%- endcomment -%}
  {% if block.settings.tab_label != blank %}
    <h2 class="custom-section-faq__category-heading">
      {{ block.settings.tab_label | upcase }}
    </h2>
  {% endif %}

  {%- comment -%} FAQ Items (nested blocks) {%- endcomment -%}
  <div class="custom-section-faq__faq-list">
    {% for child_block in block.blocks %}
      {% render 'faq-item', block: child_block %}
    {% endfor %}
  </div>
</div>

{% schema %}
{
  "name": "FAQ Tab",
  "settings": [
    {
      "type": "text",
      "id": "tab_label",
      "label": "Tab Label",
      "default": "Orders Issues",
      "info": "Displayed in tab navigation"
    },
    {
      "type": "text",
      "id": "tab_id",
      "label": "Tab ID",
      "default": "orders",
      "info": "Unique identifier (lowercase, no spaces). e.g., 'orders', 'shipping', 'products'"
    }
  ],
  "blocks": [
    {
      "type": "@theme"
    },
    {
      "type": "@app"
    }
  ]
}
{% endschema %}
```

---

## 2. Theme Block: FAQ Item

**File:** `/blocks/faq-item.liquid`

```liquid
{% comment %}
  FAQ Item Block - Individual question/answer
  Nested inside faq-tab block
{% endcomment %}

<div
  class="custom-section-faq__faq-item"
  data-faq-item
  {{ block.shopify_attributes }}
>
  {%- comment -%} Question Row {%- endcomment -%}
  <button
    class="custom-section-faq__question-wrapper"
    aria-expanded="false"
    aria-controls="faq-answer-{{ block.id }}"
    data-faq-toggle
  >
    {% if block.settings.question != blank %}
      <h3 class="custom-section-faq__question">
        {{ block.settings.question | upcase }}
      </h3>
    {% endif %}

    {%- comment -%} Plus/Minus Icon {%- endcomment -%}
    <span class="custom-section-faq__icon" data-faq-icon>
      <svg class="custom-section-faq__icon-plus" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <svg class="custom-section-faq__icon-minus" width="24" height="24" viewBox="0 0 24 24" fill="none" style="display: none;">
        <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </span>
  </button>

  {%- comment -%} Answer Content {%- endcomment -%}
  <div
    class="custom-section-faq__answer"
    id="faq-answer-{{ block.id }}"
    data-faq-answer
  >
    {% if block.settings.answer != blank %}
      <div class="custom-section-faq__answer-content">
        {{ block.settings.answer }}
      </div>
    {% endif %}
  </div>

  {%- comment -%} Divider {%- endcomment -%}
  <div class="custom-section-faq__divider"></div>
</div>

{% schema %}
{
  "name": "FAQ Item",
  "settings": [
    {
      "type": "text",
      "id": "question",
      "label": "Question",
      "default": "What's your return policy?"
    },
    {
      "type": "richtext",
      "id": "answer",
      "label": "Answer",
      "default": "<p>For domestic orders, you may return most unworn or unused items within 10 business days of the delivery date for a full refund.</p>"
    }
  ]
}
{% endschema %}
```

---

## 3. Main Section File

**File:** `/sections/custom-section-faq.liquid`

```liquid
{{ 'section-faq.css' | asset_url | stylesheet_tag }}

<div class="custom-section-faq">
  <div class="custom-section-faq__wrapper">
    <div class="custom-section-faq__container">

      {%- comment -%} Left Sidebar: Info Menu {%- endcomment -%}
      <aside class="custom-section-faq__sidebar">
        <div class="custom-section-faq__sidebar-sticky">

          {% if section.settings.menu_title != blank %}
            <h1 class="custom-section-faq__menu-title">
              {{ section.settings.menu_title }}
            </h1>
          {% endif %}

          <nav class="custom-section-faq__menu">
            {% for block in section.blocks %}
              {% if block.type == 'info_menu_item' %}
                <div class="custom-section-faq__menu-item-wrapper" {{ block.shopify_attributes }}>
                  {% if block.settings.menu_link != blank %}
                    <a
                      href="{{ block.settings.menu_link }}"
                      class="custom-section-faq__menu-link{% if block.settings.is_active %} custom-section-faq__menu-link--active{% endif %}"
                    >
                      {{ block.settings.menu_text }}
                    </a>
                  {% else %}
                    <span class="custom-section-faq__menu-link{% if block.settings.is_active %} custom-section-faq__menu-link--active{% endif %}">
                      {{ block.settings.menu_text }}
                    </span>
                  {% endif %}
                  <div class="custom-section-faq__menu-divider"></div>
                </div>
              {% endif %}
            {% endfor %}
          </nav>

        </div>
      </aside>

      {%- comment -%} Right Content: FAQ Content {%- endcomment -%}
      <main class="custom-section-faq__content">

        {%- comment -%} Page Title {%- endcomment -%}
        {% if section.settings.page_title != blank %}
          <h1 class="custom-section-faq__page-title">
            {{ section.settings.page_title }}
          </h1>
        {% endif %}

        {%- comment -%} Tab Navigation {%- endcomment -%}
        {% assign tab_blocks = section.blocks | where: "type", "faq-tab" %}
        {% if tab_blocks.size > 0 %}
          <div class="custom-section-faq__tabs-container">
            <div class="custom-section-faq__tabs" data-faq-tabs>
              {% for block in tab_blocks %}
                <button
                  class="custom-section-faq__tab{% if forloop.first %} custom-section-faq__tab--active{% endif %}"
                  data-tab="{{ block.settings.tab_id }}"
                  aria-label="Show {{ block.settings.tab_label }} FAQs"
                >
                  {{ block.settings.tab_label }}
                </button>
              {% endfor %}
            </div>
            <div class="custom-section-faq__tabs-underline"></div>
          </div>
        {% endif %}

        {%- comment -%} FAQ Categories {%- endcomment -%}
        <div class="custom-section-faq__categories" data-faq-categories>
          {% for block in section.blocks %}
            {% if block.type == 'faq-tab' %}
              {% render block %}
            {% endif %}
          {% endfor %}
        </div>

      </main>

    </div>
  </div>
</div>

<script src="{{ 'section-faq.js' | asset_url }}" defer></script>

{% schema %}
{
  "name": "FAQ Page",
  "settings": [
    {
      "type": "header",
      "content": "Info Menu Settings"
    },
    {
      "type": "text",
      "id": "menu_title",
      "label": "Menu Title",
      "default": "INFO"
    },
    {
      "type": "header",
      "content": "FAQ Settings"
    },
    {
      "type": "text",
      "id": "page_title",
      "label": "Page Title",
      "default": "Frequently Asked Questions"
    }
  ],
  "blocks": [
    {
      "type": "info_menu_item",
      "name": "Menu Item",
      "settings": [
        {
          "type": "text",
          "id": "menu_text",
          "label": "Menu Text",
          "default": "FAQS"
        },
        {
          "type": "url",
          "id": "menu_link",
          "label": "Menu Link"
        },
        {
          "type": "checkbox",
          "id": "is_active",
          "label": "Is Active/Current Page",
          "default": false,
          "info": "Check this to highlight as the current page"
        }
      ]
    },
    {
      "type": "@theme"
    },
    {
      "type": "@app"
    }
  ],
  "presets": [
    {
      "name": "FAQ Page"
    }
  ]
}
{% endschema %}
```

---

## 4. CSS Stylesheet

**File:** `/assets/section-faq.css`

```css
/* ============================================
   FAQ Section Styles
   ============================================ */

/* Variables */
:root {
  --faq-bg-primary: #FFFAF5;
  --faq-text-primary: #183754;
  --faq-text-secondary: #9A9A9A;
  --faq-text-active: #212121;
  --faq-text-body: rgba(62, 98, 130, 0.71);
  --faq-tab-active: #183754;
  --faq-tab-inactive: #8AA8C4;
  --faq-divider: #CCCCCC;
  --faq-font-primary: 'Neue Haas Grotesk Display Pro', sans-serif;
}

/* Section Container */
.custom-section-faq {
  background-color: var(--faq-bg-primary);
  width: 100%;
}

.custom-section-faq__wrapper {
  max-width: 1440px;
  margin: 0 auto;
}

.custom-section-faq__container {
  display: flex;
  gap: 128px;
  padding: 145px 40px 80px;
}

/* ============================================
   Sidebar - Info Menu
   ============================================ */

.custom-section-faq__sidebar {
  width: 238px;
  flex-shrink: 0;
}

.custom-section-faq__sidebar-sticky {
  position: sticky;
  top: 40px;
}

.custom-section-faq__menu-title {
  font-family: var(--faq-font-primary);
  font-weight: 300;
  font-size: 40px;
  line-height: 45px;
  text-align: center;
  text-transform: uppercase;
  color: var(--faq-text-primary);
  margin: 0 0 96px 0;
}

.custom-section-faq__menu {
  display: flex;
  flex-direction: column;
}

.custom-section-faq__menu-item-wrapper {
  margin-bottom: 0;
}

.custom-section-faq__menu-link {
  display: block;
  font-family: var(--faq-font-primary);
  font-weight: 400;
  font-size: 16px;
  line-height: normal;
  color: var(--faq-text-secondary);
  text-decoration: none;
  padding: 10px 0;
  transition: color 0.3s ease;
}

.custom-section-faq__menu-link:hover {
  color: var(--faq-text-active);
}

.custom-section-faq__menu-link--active {
  color: var(--faq-text-active);
}

.custom-section-faq__menu-divider {
  height: 1px;
  background-color: var(--faq-divider);
  margin: 20px 0;
}

/* ============================================
   Main Content Area
   ============================================ */

.custom-section-faq__content {
  flex: 1;
  max-width: 655px;
}

.custom-section-faq__page-title {
  font-family: var(--faq-font-primary);
  font-weight: 300;
  font-size: 40px;
  line-height: 45px;
  text-transform: uppercase;
  color: var(--faq-text-primary);
  margin: 0 0 51px 0;
}

/* ============================================
   Tab Navigation
   ============================================ */

.custom-section-faq__tabs-container {
  margin-bottom: 51px;
  position: relative;
}

.custom-section-faq__tabs {
  display: flex;
  gap: 60px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  padding: 0 40px 0 0; /* Right padding for scroll hint */

  /* Hide scrollbar but keep scrolling */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.custom-section-faq__tabs::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

/* Scroll hint: Show partial next tab */
.custom-section-faq__tabs::after {
  content: '';
  flex-shrink: 0;
  width: 20px;
}

.custom-section-faq__tab {
  font-family: var(--faq-font-primary);
  font-weight: 400;
  font-size: 18px;
  line-height: 1;
  color: var(--faq-tab-inactive);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color 0.3s ease;
  position: relative;
}

.custom-section-faq__tab:hover {
  color: var(--faq-tab-active);
}

.custom-section-faq__tab--active {
  color: var(--faq-tab-active);
}

.custom-section-faq__tabs-underline {
  height: 0.5px;
  background-color: var(--faq-divider);
  margin-top: 30.5px;
  position: relative;
}

.custom-section-faq__tabs-underline::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 0.5px;
  background-color: var(--faq-tab-active);
  width: 0;
  transition: all 0.3s ease;
}

/* ============================================
   FAQ Categories
   ============================================ */

.custom-section-faq__categories {
  display: flex;
  flex-direction: column;
  gap: 82px;
}

.custom-section-faq__category {
  display: flex;
  flex-direction: column;
}

.custom-section-faq__category-heading {
  font-family: var(--faq-font-primary);
  font-weight: 400;
  font-size: 20px;
  line-height: 1.2;
  letter-spacing: -0.2px;
  color: var(--faq-text-primary);
  margin: 0 0 56px 0;
  text-transform: uppercase;
}

/* ============================================
   FAQ Items (Accordion)
   ============================================ */

.custom-section-faq__faq-list {
  display: flex;
  flex-direction: column;
}

.custom-section-faq__faq-item {
  display: flex;
  flex-direction: column;
}

.custom-section-faq__question-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
  width: 100%;
}

.custom-section-faq__question {
  font-family: var(--faq-font-primary);
  font-weight: 400;
  font-size: 20px;
  line-height: 1.2;
  letter-spacing: -0.2px;
  color: var(--faq-text-primary);
  margin: 0;
  flex: 1;
}

.custom-section-faq__icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  color: var(--faq-text-primary);
}

.custom-section-faq__icon svg {
  display: block;
  width: 100%;
  height: 100%;
}

/* Answer Content */
.custom-section-faq__answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
}

.custom-section-faq__faq-item--expanded .custom-section-faq__answer {
  max-height: 2000px;
}

.custom-section-faq__answer-content {
  font-family: var(--faq-font-primary);
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 0.42px;
  color: var(--faq-text-body);
  padding-top: 46px;
  padding-right: 44px;
}

.custom-section-faq__answer-content p {
  margin: 0 0 1em 0;
}

.custom-section-faq__answer-content p:last-child {
  margin-bottom: 0;
}

/* Divider */
.custom-section-faq__divider {
  height: 1px;
  background-color: var(--faq-divider);
  margin: 45px 0;
}

/* ============================================
   Responsive Design
   ============================================ */

/* Large Desktop - Center content */
@media (min-width: 1441px) {
  .custom-section-faq__wrapper {
    max-width: 1440px;
    margin: 0 auto;
  }
}

/* Tablet */
@media (max-width: 1024px) {
  .custom-section-faq__container {
    gap: 64px;
    padding: 100px 30px 60px;
  }

  .custom-section-faq__page-title,
  .custom-section-faq__menu-title {
    font-size: 32px;
    line-height: 38px;
  }

  .custom-section-faq__question {
    font-size: 18px;
  }

  .custom-section-faq__tab {
    font-size: 16px;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .custom-section-faq__container {
    flex-direction: column;
    gap: 40px;
    padding: 60px 20px 40px;
  }

  .custom-section-faq__sidebar {
    width: 100%;
  }

  .custom-section-faq__sidebar-sticky {
    position: relative;
    top: 0;
  }

  .custom-section-faq__content {
    max-width: 100%;
  }

  .custom-section-faq__page-title,
  .custom-section-faq__menu-title {
    font-size: 28px;
    line-height: 32px;
    margin-bottom: 40px;
  }

  .custom-section-faq__menu-title {
    text-align: left;
    margin-bottom: 30px;
  }

  .custom-section-faq__tabs {
    gap: 40px;
    padding-right: 30px;
  }

  .custom-section-faq__tab {
    font-size: 16px;
  }

  .custom-section-faq__question {
    font-size: 16px;
  }

  .custom-section-faq__answer-content {
    font-size: 13px;
    padding-right: 0;
  }

  .custom-section-faq__categories {
    gap: 60px;
  }
}

/* Small Mobile */
@media (max-width: 375px) {
  .custom-section-faq__container {
    padding: 40px 15px 30px;
  }

  .custom-section-faq__tabs {
    gap: 30px;
    padding-right: 20px;
  }
}
```

---

## 5. JavaScript (Tab Navigation + Accordion)

**File:** `/assets/section-faq.js`

```javascript
/**
 * FAQ Section Controller
 * Handles tab navigation and accordion functionality
 */

class FaqSection {
  constructor(sectionElement) {
    this.section = sectionElement;
    this.tabs = this.section.querySelectorAll('[data-tab]');
    this.categories = this.section.querySelectorAll('[data-tab-id]');
    this.faqItems = this.section.querySelectorAll('[data-faq-item]');
    this.activeTab = null;
    this.activeFaq = null;

    this.init();
  }

  init() {
    this.setupTabs();
    this.setupAccordion();

    // Activate first tab on load
    if (this.tabs.length > 0) {
      this.activateTab(this.tabs[0].dataset.tab, false);
    }
  }

  /**
   * Setup tab navigation
   */
  setupTabs() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = tab.dataset.tab;
        this.activateTab(tabId, true);
      });
    });
  }

  /**
   * Activate a tab and scroll to its category
   */
  activateTab(tabId, shouldScroll = true) {
    // Update active tab styling
    this.tabs.forEach(tab => {
      if (tab.dataset.tab === tabId) {
        tab.classList.add('custom-section-faq__tab--active');
        this.activeTab = tab;
      } else {
        tab.classList.remove('custom-section-faq__tab--active');
      }
    });

    // Find the corresponding category
    const category = Array.from(this.categories).find(
      cat => cat.dataset.tabId === tabId
    );

    if (category && shouldScroll) {
      // Scroll to category
      category.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Open first FAQ in this category after scroll
      setTimeout(() => {
        const firstFaq = category.querySelector('[data-faq-item]');
        if (firstFaq) {
          this.openFaq(firstFaq);
        }
      }, 500); // Wait for scroll to complete
    }
  }

  /**
   * Setup accordion functionality
   */
  setupAccordion() {
    this.faqItems.forEach(item => {
      const toggle = item.querySelector('[data-faq-toggle]');

      if (toggle) {
        toggle.addEventListener('click', () => {
          this.toggleFaq(item);
        });
      }
    });
  }

  /**
   * Toggle FAQ item (expand/collapse)
   */
  toggleFaq(item) {
    const isExpanded = item.classList.contains('custom-section-faq__faq-item--expanded');

    if (isExpanded) {
      this.closeFaq(item);
    } else {
      // Close all other FAQs first (only one open at a time)
      this.closeAllFaqs();
      this.openFaq(item);
    }
  }

  /**
   * Open a specific FAQ item
   */
  openFaq(item) {
    const toggle = item.querySelector('[data-faq-toggle]');
    const answer = item.querySelector('[data-faq-answer]');
    const iconPlus = item.querySelector('.custom-section-faq__icon-plus');
    const iconMinus = item.querySelector('.custom-section-faq__icon-minus');

    item.classList.add('custom-section-faq__faq-item--expanded');

    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
    }

    // Toggle icons
    if (iconPlus) iconPlus.style.display = 'none';
    if (iconMinus) iconMinus.style.display = 'block';

    this.activeFaq = item;
  }

  /**
   * Close a specific FAQ item
   */
  closeFaq(item) {
    const toggle = item.querySelector('[data-faq-toggle]');
    const answer = item.querySelector('[data-faq-answer]');
    const iconPlus = item.querySelector('.custom-section-faq__icon-plus');
    const iconMinus = item.querySelector('.custom-section-faq__icon-minus');

    item.classList.remove('custom-section-faq__faq-item--expanded');

    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }

    // Toggle icons
    if (iconPlus) iconPlus.style.display = 'block';
    if (iconMinus) iconMinus.style.display = 'none';

    if (this.activeFaq === item) {
      this.activeFaq = null;
    }
  }

  /**
   * Close all FAQ items
   */
  closeAllFaqs() {
    this.faqItems.forEach(item => {
      this.closeFaq(item);
    });
  }
}

// Initialize FAQ sections when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const faqSections = document.querySelectorAll('.custom-section-faq');

  faqSections.forEach(section => {
    new FaqSection(section);
  });
});

// Reinitialize for Shopify theme editor
if (Shopify && Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    const section = event.target.querySelector('.custom-section-faq');
    if (section) {
      new FaqSection(section);
    }
  });
}
```

---

## Accordion Behavior Details

### Auto-close Logic
```javascript
// When opening a new FAQ
toggleFaq(item) {
  const isExpanded = item.classList.contains('--expanded');

  if (!isExpanded) {
    // CLOSE ALL OTHER FAQs first
    this.closeAllFaqs();
    // Then open the clicked one
    this.openFaq(item);
  } else {
    // Just close this one
    this.closeFaq(item);
  }
}
```

### Tab Click Behavior
```javascript
// When clicking a tab
activateTab(tabId, shouldScroll = true) {
  // 1. Update tab styling
  // 2. Scroll to category section
  // 3. Wait for scroll to complete (500ms)
  // 4. Auto-open first FAQ in that category

  setTimeout(() => {
    const firstFaq = category.querySelector('[data-faq-item]');
    if (firstFaq) {
      this.openFaq(firstFaq);
    }
  }, 500);
}
```

### Horizontal Tab Scroll Hints
```css
/* Padding creates space for scroll hint */
.custom-section-faq__tabs {
  padding: 0 40px 0 0;
  overflow-x: auto;
  scrollbar-width: none; /* Hide scrollbar */
}

/* Pseudo-element adds spacing at end */
.custom-section-faq__tabs::after {
  content: '';
  flex-shrink: 0;
  width: 20px; /* Creates peek/offset effect */
}
```

**Result:** Last tab is partially visible, hinting at more content. Scrollbar hidden but scrolling works.

---

## Testing Checklist

### Manual Testing
- [ ] Click each tab - scrolls to category
- [ ] First FAQ in category opens automatically
- [ ] Clicking another FAQ closes the previous one
- [ ] Plus/minus icons toggle correctly
- [ ] Tab navigation scrolls horizontally
- [ ] Last tab shows partial peek (scroll hint)
- [ ] Scrollbar is hidden
- [ ] Responsive on all breakpoints
- [ ] Sidebar is sticky on desktop
- [ ] Sidebar stacks on mobile

### Playwright Tests
```javascript
test('Tab navigation and accordion', async ({ page }) => {
  // Click second tab
  await page.click('[data-tab="shipping"]');

  // Wait for scroll
  await page.waitForTimeout(600);

  // Verify first FAQ opened
  const firstFaq = page.locator('[data-tab-id="shipping"] [data-faq-item]').first();
  await expect(firstFaq).toHaveClass(/--expanded/);

  // Click another FAQ
  const secondFaq = page.locator('[data-tab-id="shipping"] [data-faq-item]').nth(1);
  await secondFaq.click();

  // Verify first FAQ closed
  await expect(firstFaq).not.toHaveClass(/--expanded/);
  // Verify second FAQ opened
  await expect(secondFaq).toHaveClass(/--expanded/);
});
```

---

## Deployment Steps

1. **Create theme block files:**
   ```bash
   touch blocks/faq-tab.liquid
   touch blocks/faq-item.liquid
   ```

2. **Create section and assets:**
   ```bash
   touch sections/custom-section-faq.liquid
   touch assets/section-faq.css
   touch assets/section-faq.js
   ```

3. **Copy code** from this implementation guide

4. **Test locally:**
   ```bash
   shopify theme dev
   ```

5. **Add test content** in theme editor

6. **Verify all behaviors** work correctly

7. **Write Playwright tests**

8. **Deploy:**
   ```bash
   shopify theme push --unpublished
   ```

---

**Implementation Complete!** 🎉

You now have a fully functional FAQ section with theme blocks, tab navigation, and accordion functionality.
