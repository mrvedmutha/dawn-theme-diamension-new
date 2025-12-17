# Diamension Footer - Implementation Guide

**This document provides step-by-step implementation instructions for developers.**

---

## Table of Contents

1. [Font Setup](#font-setup)
2. [Main Footer Section](#main-footer-section)
3. [Footer Image Section](#footer-image-section)
4. [CSS Implementation](#css-implementation)
5. [JavaScript Implementation](#javascript-implementation)
6. [Testing](#testing)

---

## Font Setup

### Step 1: Create Font Face Declarations

Create font-face declarations in your CSS file to import fonts from `assets/fonts/`.

**File:** `assets/section-custom-diamension-footer.css`

```css
/* Neue Montreal Regular */
@font-face {
  font-family: 'Neue Montreal';
  src: url('fonts/neue-montreal/NeueMontreal-Regular.woff2') format('woff2'),
       url('fonts/neue-montreal/NeueMontreal-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Neue Haas Grotesk Display Pro - Check available weights in assets/fonts/neue-haas-display/ */
@font-face {
  font-family: 'Neue Haas Grotesk Display Pro';
  src: url('fonts/neue-haas-display/[filename].woff2') format('woff2');
  font-weight: 400;  /* 55 Roman */
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Neue Haas Grotesk Display Pro';
  src: url('fonts/neue-haas-display/[filename].woff2') format('woff2');
  font-weight: 300;  /* 45 Light */
  font-style: normal;
  font-display: swap;
}

/* Inter from Google Fonts (for logo subtitle) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');
```

**Note:** Check `assets/fonts/neue-haas-display/` directory to find exact filenames for Roman and Light weights.

---

## Main Footer Section

### Step 1: Create Section File

**File:** `sections/custom-diamension-footer.liquid`

```liquid
{{ 'section-custom-diamension-footer.css' | asset_url | stylesheet_tag }}

<footer class="custom-diamension-footer {% if template.name == 'product' %}custom-diamension-footer--product-page{% endif %}">
  <div class="custom-diamension-footer__container">

    {%- comment -%} Logo - Top Right Desktop, Top Left Mobile {%- endcomment -%}
    {% if section.settings.logo != blank %}
      <div class="custom-diamension-footer__logo">
        <img
          src="{{ section.settings.logo | image_url: width: 736 }}"
          srcset="{{ section.settings.logo | image_url: width: 368 }} 368w,
                  {{ section.settings.logo | image_url: width: 736 }} 736w"
          sizes="(min-width: 1025px) 368px, 256px"
          alt="{{ shop.name }}"
          width="368"
          height="auto"
          loading="lazy"
        >
        <p class="custom-diamension-footer__logo-subtitle">JEWELLERY</p>
      </div>
    {% endif %}

    {%- comment -%} Main Content Grid {%- endcomment -%}
    <div class="custom-diamension-footer__content">

      {%- comment -%} Menu Columns {%- endcomment -%}
      <div class="custom-diamension-footer__menus">
        {% for block in section.blocks %}
          {% case block.type %}
            {% when 'menu_column' %}
              <div class="custom-diamension-footer__menu" {{ block.shopify_attributes }}>
                {% if block.settings.heading != blank %}
                  <h3 class="custom-diamension-footer__menu-title">{{ block.settings.heading }}</h3>
                {% endif %}

                {% if block.settings.menu != blank %}
                  <ul class="custom-diamension-footer__menu-list">
                    {% for link in block.settings.menu.links %}
                      <li class="custom-diamension-footer__menu-item">
                        <a href="{{ link.url }}" class="custom-diamension-footer__menu-link">
                          {{ link.title }}
                        </a>
                      </li>
                    {% endfor %}
                  </ul>
                {% endif %}
              </div>
          {% endcase %}
        {% endfor %}
      </div>

      {%- comment -%} Newsletter Section {%- endcomment -%}
      {% if section.settings.newsletter_enable %}
        <div class="custom-diamension-footer__newsletter">
          {%- form 'customer', id: 'ContactFooter', class: 'custom-diamension-footer__newsletter-form' -%}
            <input type="hidden" name="contact[tags]" value="newsletter">

            {%- comment -%} Newsletter Heading {%- endcomment -%}
            {% if section.settings.newsletter_heading != blank %}
              <h3 class="custom-diamension-footer__newsletter-heading">{{ section.settings.newsletter_heading }}</h3>
            {% endif %}

            {%- comment -%} Success/Error Messages - Display at top {%- endcomment -%}
            {%- if form.posted_successfully? -%}
              <p class="custom-diamension-footer__newsletter-message custom-diamension-footer__newsletter-message--success">
                Signed Up Successfully!
              </p>
            {%- elsif form.errors -%}
              <p class="custom-diamension-footer__newsletter-message custom-diamension-footer__newsletter-message--error">
                Signed Up Failed!
              </p>
            {%- endif -%}

            {%- comment -%} Newsletter Description {%- endcomment -%}
            {% if section.settings.newsletter_description != blank %}
              <p class="custom-diamension-footer__newsletter-description">{{ section.settings.newsletter_description }}</p>
            {% endif %}

            {%- comment -%} Email Input with Arrow Button {%- endcomment -%}
            <div class="custom-diamension-footer__newsletter-input-wrapper">
              <label for="NewsletterFooter" class="custom-diamension-footer__newsletter-label">EMAIL</label>
              <div class="custom-diamension-footer__newsletter-input-group">
                <input
                  id="NewsletterFooter"
                  type="email"
                  name="contact[email]"
                  class="custom-diamension-footer__newsletter-input"
                  value="{{ form.email }}"
                  aria-required="true"
                  autocorrect="off"
                  autocapitalize="off"
                  autocomplete="email"
                  {% if form.errors %}
                    aria-invalid="true"
                  {% endif %}
                  required
                >
                <button
                  type="submit"
                  class="custom-diamension-footer__newsletter-submit"
                  aria-label="Subscribe to newsletter"
                >
                  <svg class="custom-diamension-footer__newsletter-arrow" width="13" height="9" viewBox="0 0 13 9" fill="none">
                    <path d="M1 8L6.5 1L12 8" stroke="currentColor" stroke-width="1"/>
                  </svg>
                </button>
              </div>
              <div class="custom-diamension-footer__newsletter-underline"></div>
            </div>
          {%- endform -%}
        </div>
      {% endif %}
    </div>

    {%- comment -%} Bottom Bar {%- endcomment -%}
    <div class="custom-diamension-footer__bottom">
      {%- comment -%} Designed by Wings - HARDCODED {%- endcomment -%}
      <p class="custom-diamension-footer__bottom-credit">
        Designed by <a href="https://wings.design" target="_blank" rel="noopener" class="custom-diamension-footer__bottom-link">Wings</a>
      </p>

      {%- comment -%} Copyright - HARDCODED with auto year {%- endcomment -%}
      <p class="custom-diamension-footer__bottom-copyright">
        © {{ 'now' | date: '%Y' }}, DIAMENSIONS. All rights reserved.
      </p>

      {%- comment -%} Legal Links Menu {%- endcomment -%}
      {% if section.settings.legal_menu != blank %}
        <nav class="custom-diamension-footer__bottom-legal">
          <ul class="custom-diamension-footer__bottom-legal-list">
            {% for link in section.settings.legal_menu.links %}
              <li class="custom-diamension-footer__bottom-legal-item">
                <a href="{{ link.url }}" class="custom-diamension-footer__bottom-legal-link">
                  {{ link.title }}
                </a>
              </li>
            {% endfor %}
          </ul>
        </nav>
      {% endif %}
    </div>

  </div>
</footer>

<script src="{{ 'section-custom-diamension-footer.js' | asset_url }}" defer></script>

{% schema %}
{
  "name": "Diamension Footer",
  "settings": [
    {
      "type": "header",
      "content": "Logo"
    },
    {
      "type": "image_picker",
      "id": "logo",
      "label": "Footer Logo",
      "info": "Upload DIAMENSION JEWELLERY logo. Desktop: 368px, Mobile: 256px"
    },
    {
      "type": "header",
      "content": "Newsletter"
    },
    {
      "type": "checkbox",
      "id": "newsletter_enable",
      "label": "Enable Newsletter",
      "default": true
    },
    {
      "type": "text",
      "id": "newsletter_heading",
      "label": "Newsletter Heading",
      "default": "NEWSLETTER"
    },
    {
      "type": "textarea",
      "id": "newsletter_description",
      "label": "Newsletter Description",
      "default": "Subscribe to the newsletter and uncover more about Diamensions creations patrimony, and craftsmanship stories."
    },
    {
      "type": "header",
      "content": "Legal Links"
    },
    {
      "type": "link_list",
      "id": "legal_menu",
      "label": "Legal Links Menu",
      "info": "Select menu for Terms & Conditions, Privacy Policy, etc."
    }
  ],
  "blocks": [
    {
      "type": "menu_column",
      "name": "Menu Column",
      "settings": [
        {
          "type": "text",
          "id": "heading",
          "label": "Heading",
          "default": "Menu"
        },
        {
          "type": "link_list",
          "id": "menu",
          "label": "Menu",
          "info": "Select menu to display in this column"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Diamension Footer",
      "blocks": [
        {
          "type": "menu_column",
          "settings": {
            "heading": "SHOP"
          }
        },
        {
          "type": "menu_column",
          "settings": {
            "heading": "SUPPORT"
          }
        },
        {
          "type": "menu_column",
          "settings": {
            "heading": "DIAMENSIONS"
          }
        },
        {
          "type": "menu_column",
          "settings": {
            "heading": "CONNECT"
          }
        }
      ]
    }
  ]
}
{% endschema %}
```

---

## Footer Image Section

### Step 2: Create Footer Image Section

**File:** `sections/custom-diamension-footer-image.liquid`

```liquid
{{ 'section-custom-diamension-footer-image.css' | asset_url | stylesheet_tag }}

{% if template.name == 'index' %}
  {%- comment -%} Only show on homepage {%- endcomment -%}
  {% if section.settings.footer_image != blank %}
    <div class="custom-diamension-footer-image">
      <img
        src="{{ section.settings.footer_image | image_url: width: 1920 }}"
        srcset="{{ section.settings.footer_image | image_url: width: 768 }} 768w,
                {{ section.settings.footer_image | image_url: width: 1440 }} 1440w,
                {{ section.settings.footer_image | image_url: width: 1920 }} 1920w"
        sizes="100vw"
        alt="{{ section.settings.footer_image.alt | escape }}"
        class="custom-diamension-footer-image__img"
        loading="lazy"
      >
    </div>
  {% endif %}
{% else %}
  {%- comment -%} Add spacing on non-homepage pages {%- endcomment -%}
  <div class="custom-diamension-footer-image custom-diamension-footer-image--spacer"></div>
{% endif %}

{% schema %}
{
  "name": "Diamension Footer Image",
  "settings": [
    {
      "type": "image_picker",
      "id": "footer_image",
      "label": "Footer Image",
      "info": "Displays only on homepage. Desktop: 448px height, scales down on mobile."
    }
  ],
  "presets": [
    {
      "name": "Diamension Footer Image"
    }
  ]
}
{% endschema %}
```

---

## CSS Implementation

### Step 3: Main Footer CSS

**File:** `assets/section-custom-diamension-footer.css`

```css
/* ============================================
   Font Imports
   ============================================ */

@font-face {
  font-family: 'Neue Montreal';
  src: url('fonts/neue-montreal/NeueMontreal-Regular.woff2') format('woff2'),
       url('fonts/neue-montreal/NeueMontreal-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* TODO: Add Neue Haas Grotesk Display Pro font-face declarations */
/* Check assets/fonts/neue-haas-display/ for exact filenames */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');

/* ============================================
   CSS Variables
   ============================================ */

:root {
  --footer-bg: #fffaf5;
  --footer-text-primary: #183754;
  --footer-text-secondary: #3e6282;

  /* Desktop Spacing */
  --footer-padding-top: 152px;
  --footer-padding-right: 48px;
  --footer-padding-bottom: 24px;
  --footer-padding-left: 48px;
  --footer-height-desktop: 656px;

  /* Mobile Spacing */
  --footer-padding-top-mobile: 48px;
  --footer-padding-right-mobile: 24px;
  --footer-padding-bottom-mobile: 32px;
  --footer-padding-left-mobile: 24px;
}

/* ============================================
   Footer Wrapper - Desktop Base (≥1025px)
   ============================================ */

.custom-diamension-footer {
  background-color: var(--footer-bg);
  min-height: var(--footer-height-desktop);
  position: relative;
}

.custom-diamension-footer__container {
  max-width: 1440px;
  margin: 0 auto;
  padding: var(--footer-padding-top) var(--footer-padding-right) var(--footer-padding-bottom) var(--footer-padding-left);
  position: relative;
}

/* Product Page Modifier - Extra bottom spacing for sticky CTA */
.custom-diamension-footer--product-page {
  margin-bottom: 100px;
}

/* ============================================
   Logo - Top Right Desktop, Top Left Mobile
   ============================================ */

.custom-diamension-footer__logo {
  position: absolute;
  top: var(--footer-padding-top);
  right: var(--footer-padding-right);
  text-align: right;
}

.custom-diamension-footer__logo img {
  width: 368px;
  height: auto;
  display: block;
  margin-left: auto;
}

.custom-diamension-footer__logo-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 12.016px;
  letter-spacing: 36.0472px;
  text-transform: uppercase;
  color: var(--footer-text-primary);
  margin-top: 8px;
  font-weight: 400;
}

/* ============================================
   Main Content Grid - Desktop
   ============================================ */

.custom-diamension-footer__content {
  display: grid;
  grid-template-columns: 1fr 300px;  /* Menus left, Newsletter right */
  gap: 48px;
  margin-top: 165px;  /* Offset from top */
}

.custom-diamension-footer__menus {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 48px;
  justify-content: start;
}

/* ============================================
   Menu Columns
   ============================================ */

.custom-diamension-footer__menu {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.custom-diamension-footer__menu-title {
  font-family: 'Neue Montreal', sans-serif;
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--footer-text-secondary);
  margin: 0;
  line-height: normal;
}

.custom-diamension-footer__menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.custom-diamension-footer__menu-item {
  margin: 0;
}

.custom-diamension-footer__menu-link {
  font-family: 'Neue Montreal', sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.7px;
  text-transform: uppercase;
  color: var(--footer-text-primary);
  text-decoration: none;
  line-height: normal;
  transition: opacity 0.3s ease;
}

.custom-diamension-footer__menu-link:hover {
  opacity: 0.7;
}

/* ============================================
   Newsletter Section
   ============================================ */

.custom-diamension-footer__newsletter {
  display: flex;
  flex-direction: column;
  gap: 47px;
  max-width: 300px;
}

.custom-diamension-footer__newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.custom-diamension-footer__newsletter-heading {
  font-family: 'Neue Montreal', sans-serif;
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--footer-text-secondary);
  margin: 0;
  line-height: normal;
}

/* Success/Error Messages */
.custom-diamension-footer__newsletter-message {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: var(--footer-text-primary);
  margin: 0 0 20px 0;
  padding: 12px 16px;
  border-radius: 4px;
}

.custom-diamension-footer__newsletter-message--success {
  background-color: rgba(62, 98, 130, 0.1);
}

.custom-diamension-footer__newsletter-message--error {
  background-color: rgba(183, 117, 84, 0.1);
}

.custom-diamension-footer__newsletter-description {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;
  text-transform: capitalize;
  color: var(--footer-text-primary);
  margin: 0;
  line-height: 1.6;
}

/* Email Input */
.custom-diamension-footer__newsletter-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.custom-diamension-footer__newsletter-label {
  font-family: 'Neue Montreal', sans-serif;
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--footer-text-primary);
  line-height: normal;
}

.custom-diamension-footer__newsletter-input-group {
  position: relative;
}

.custom-diamension-footer__newsletter-input {
  font-family: 'Neue Montreal', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: var(--footer-text-primary);
  background: transparent;
  border: none;
  outline: none;  /* CRITICAL: No focus outline */
  padding: 8px 40px 8px 0;
  width: 100%;
}

.custom-diamension-footer__newsletter-input:focus {
  outline: none;  /* Ensure no outline on focus */
}

.custom-diamension-footer__newsletter-underline {
  width: 100%;
  height: 1px;
  background-color: var(--footer-text-primary);
  margin-top: -1px;
}

/* Submit Arrow Button */
.custom-diamension-footer__newsletter-submit {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  transition: opacity 0.3s ease;
}

.custom-diamension-footer__newsletter-submit:hover {
  opacity: 0.7;
}

.custom-diamension-footer__newsletter-arrow {
  width: 12px;
  height: 12px;
  transform: rotate(315deg);  /* Diagonal arrow */
  color: var(--footer-text-primary);
}

/* ============================================
   Bottom Bar - Desktop
   ============================================ */

.custom-diamension-footer__bottom {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  margin-top: 100px;
}

.custom-diamension-footer__bottom-credit {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;
  text-transform: capitalize;
  color: var(--footer-text-secondary);
  margin: 0;
  justify-self: start;
}

.custom-diamension-footer__bottom-link {
  color: var(--footer-text-secondary);
  text-decoration: underline;
  text-decoration-skip-ink: none;
  text-underline-position: from-font;
  transition: opacity 0.3s ease;
}

.custom-diamension-footer__bottom-link:hover {
  opacity: 0.7;
}

.custom-diamension-footer__bottom-copyright {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;
  text-transform: capitalize;
  color: var(--footer-text-secondary);
  margin: 0;
  justify-self: center;
}

.custom-diamension-footer__bottom-legal {
  justify-self: end;
}

.custom-diamension-footer__bottom-legal-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.custom-diamension-footer__bottom-legal-item {
  margin: 0;
}

.custom-diamension-footer__bottom-legal-link {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-size: 14px;
  font-weight: 300;  /* Light weight */
  text-transform: capitalize;
  color: var(--footer-text-secondary);
  text-decoration: none;
  line-height: normal;
  transition: opacity 0.3s ease;
}

.custom-diamension-footer__bottom-legal-link:hover {
  opacity: 0.7;
}

/* ============================================
   Responsive Breakpoints
   ============================================ */

/* Large Desktop - Center container beyond 1440px */
@media (min-width: 1441px) {
  .custom-diamension-footer__container {
    max-width: 1440px;
    margin: 0 auto;
  }
}

/* Small Desktop: 1024px - 900px */
@media (max-width: 1024px) and (min-width: 900px) {
  .custom-diamension-footer__container {
    padding: 120px 40px 24px 40px;
  }

  .custom-diamension-footer__logo {
    top: 120px;
    right: 40px;
  }

  .custom-diamension-footer__content {
    margin-top: 140px;
    gap: 32px;
  }

  .custom-diamension-footer__menus {
    gap: 32px;
  }
}

/* Tablet & Below: <1025px - SWITCH TO MOBILE LAYOUT */
@media (max-width: 1024px) {
  .custom-diamension-footer {
    min-height: auto;
  }

  .custom-diamension-footer__container {
    padding: var(--footer-padding-top-mobile) var(--footer-padding-right-mobile) var(--footer-padding-bottom-mobile) var(--footer-padding-left-mobile);
  }

  /* Logo - Top, Left Aligned */
  .custom-diamension-footer__logo {
    position: static;
    text-align: left;
    margin-bottom: 48px;
  }

  .custom-diamension-footer__logo img {
    width: 256px;
    margin-left: 0;
  }

  .custom-diamension-footer__logo-subtitle {
    font-size: 8.358px;
    letter-spacing: 25.0735px;
    text-align: left;
  }

  /* Content - Stacked Vertically, Left Aligned */
  .custom-diamension-footer__content {
    display: flex;
    flex-direction: column;
    gap: 48px;
    margin-top: 0;
    align-items: flex-start;  /* Left align all content */
  }

  /* Newsletter First on Mobile, Left Aligned */
  .custom-diamension-footer__newsletter {
    order: -1;
    max-width: 100%;
    align-self: flex-start;  /* Left align */
  }

  /* Menus - Two Column Grid, Left Aligned */
  .custom-diamension-footer__menus {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 24px;
    width: 100%;
    justify-items: start;  /* Left align menu items */
  }

  /* Bottom Bar - Centered and Stacked (ONLY SECTION THAT'S CENTERED) */
  .custom-diamension-footer__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;  /* Center bottom bar */
    text-align: center;   /* Center text */
    gap: 16px;
    margin-top: 48px;
    width: 100%;
  }

  .custom-diamension-footer__bottom-credit,
  .custom-diamension-footer__bottom-copyright {
    justify-self: center;
  }

  .custom-diamension-footer__bottom-legal {
    justify-self: center;
  }

  .custom-diamension-footer__bottom-legal-list {
    justify-content: center;
    gap: 10px;
  }
}

/* Mid Mobile: 767px - 480px */
@media (max-width: 767px) {
  .custom-diamension-footer__bottom-copyright,
  .custom-diamension-footer__bottom-credit {
    font-size: 12px;
  }
}

/* Small Mobile: 479px - 376px */
@media (max-width: 479px) {
  .custom-diamension-footer__container {
    padding: 40px 20px 28px 20px;
  }

  .custom-diamension-footer__menus {
    gap: 32px 16px;
  }
}

/* XS Mobile: ≤375px */
@media (max-width: 375px) {
  .custom-diamension-footer__menus {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .custom-diamension-footer__bottom-legal-list {
    flex-direction: column;
    gap: 8px;
  }
}
```

---

### Step 4: Footer Image Section CSS

**File:** `assets/section-custom-diamension-footer-image.css`

```css
/* ============================================
   Footer Image Section
   ============================================ */

.custom-diamension-footer-image {
  background-color: #fffaf5;
  width: 100%;
  overflow: hidden;
}

.custom-diamension-footer-image__img {
  width: 100%;
  height: 448px;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* Spacer for non-homepage pages */
.custom-diamension-footer-image--spacer {
  height: 0;
  background-color: #fffaf5;
}

/* Product page - Add gap for sticky CTA */
.template-product .custom-diamension-footer-image--spacer {
  height: 100px;
}

/* ============================================
   Responsive Heights (8-division rule)
   ============================================ */

/* Small Desktop: 1024px - 900px */
@media (max-width: 1024px) and (min-width: 900px) {
  .custom-diamension-footer-image__img {
    height: 384px;
  }
}

/* Tablet: 899px - 768px */
@media (max-width: 899px) and (min-width: 768px) {
  .custom-diamension-footer-image__img {
    height: 320px;
  }
}

/* Mid Mobile: 767px - 480px */
@media (max-width: 767px) and (min-width: 480px) {
  .custom-diamension-footer-image__img {
    height: 288px;
  }
}

/* Small Mobile: 479px - 376px */
@media (max-width: 479px) and (min-width: 376px) {
  .custom-diamension-footer-image__img {
    height: 256px;
  }
}

/* XS Mobile: ≤375px */
@media (max-width: 375px) {
  .custom-diamension-footer-image__img {
    height: 224px;
  }
}
```

---

## JavaScript Implementation

### Step 5: Newsletter Message Handling (Optional Enhancement)

**File:** `assets/section-custom-diamension-footer.js`

```javascript
/**
 * Diamension Footer - Newsletter Message Handling
 *
 * This script adds optional enhancements to the newsletter form.
 * The core functionality works without JavaScript using Shopify's
 * native form handling, but this adds smooth transitions.
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', initFooterNewsletter);

  function initFooterNewsletter() {
    const newsletterForm = document.querySelector('.custom-diamension-footer__newsletter-form');
    const messageElement = document.querySelector('.custom-diamension-footer__newsletter-message');

    if (!newsletterForm) return;

    // Add smooth fade-in animation to success/error messages
    if (messageElement) {
      fadeInMessage(messageElement);
    }

    // Optional: Smooth scroll to message on form submission
    newsletterForm.addEventListener('submit', handleFormSubmit);
  }

  /**
   * Fade in success/error message
   */
  function fadeInMessage(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(-10px)';
    element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    // Trigger animation
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 100);
  }

  /**
   * Handle form submission (optional smooth scroll)
   */
  function handleFormSubmit(event) {
    // Let Shopify handle the actual submission
    // This just adds smooth scroll behavior
    const newsletterSection = document.querySelector('.custom-diamension-footer__newsletter');

    if (newsletterSection) {
      setTimeout(() => {
        newsletterSection.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }, 100);
    }
  }

})();
```

---

## Testing

### Step 6: Testing Checklist

**Test in Shopify Theme Editor:**

1. **Start Shopify CLI:**
   ```bash
   shopify theme dev
   ```

2. **Open Theme Editor:**
   ```
   http://localhost:9292/admin/themes/current/editor
   ```

3. **Add Footer Sections:**
   - Add "Diamension Footer" section
   - Add "Diamension Footer Image" section below footer

4. **Test Theme Editor Settings:**
   - [ ] Upload logo - verify it appears top right (desktop), top left (mobile)
   - [ ] Add menu blocks (SHOP, SUPPORT, DIAMENSIONS, CONNECT)
   - [ ] Configure each menu with links
   - [ ] Test newsletter heading/description fields
   - [ ] Upload footer image
   - [ ] Configure legal links menu

5. **Test Newsletter Functionality:**
   - [ ] Submit valid email - verify "Signed Up Successfully!" appears
   - [ ] Submit invalid email - verify "Signed Up Failed!" appears
   - [ ] Check messages display at top of newsletter section
   - [ ] Verify email input has no focus outline

6. **Test Responsive Breakpoints:**
   - [ ] Desktop (≥1025px) - horizontal layout
   - [ ] Small Desktop (1024-900px)
   - [ ] Tablet (899-768px) - mobile layout
   - [ ] Mid Mobile (767-480px)
   - [ ] Small Mobile (479-376px)
   - [ ] XS Mobile (≤375px)

7. **Test Template Conditionals:**
   - [ ] Homepage - footer image displays
   - [ ] Product page - footer has extra bottom spacing
   - [ ] Collection page - no footer image
   - [ ] Other pages - no footer image

8. **Test Links:**
   - [ ] "Designed by Wings" links to https://wings.design
   - [ ] Copyright year displays current year
   - [ ] Legal menu links work correctly
   - [ ] Menu column links work correctly

9. **Visual Testing:**
   - [ ] Logo sizing correct (368px desktop, 256px mobile)
   - [ ] Footer image height correct (448px desktop, scales down)
   - [ ] Colors match Figma (#fffaf5 bg, #183754 text, #3e6282 headings)
   - [ ] Typography matches design (Neue Montreal, Neue Haas, Inter)
   - [ ] Spacing matches Figma specifications
   - [ ] Bottom bar layout correct (3-column desktop, stacked mobile)

10. **Performance Testing:**
    - [ ] Images lazy load
    - [ ] JavaScript defers
    - [ ] Fonts load efficiently
    - [ ] No console errors

---

## Common Issues & Solutions

### Issue: Fonts not loading
**Solution:** Check font file paths in @font-face declarations. Ensure files exist in `assets/fonts/` directory.

### Issue: Newsletter success message not displaying
**Solution:** Verify Shopify form conditional `{% if form.posted_successfully? %}` is correctly placed.

### Issue: Logo not positioned correctly
**Solution:** Check absolute positioning on desktop, ensure static positioning on mobile.

### Issue: Footer image showing on non-homepage
**Solution:** Verify `{% if template.name == 'index' %}` conditional is correctly wrapping the image.

### Issue: Email input showing focus outline
**Solution:** Ensure CSS has `outline: none` on both `.custom-diamension-footer__newsletter-input` and `:focus` state.

---

## Deployment

1. Test all functionality locally
2. Verify all Playwright tests pass
3. Commit with message: `[Feature] Add custom Diamension footer section`
4. Push to development branch
5. Test on staging environment
6. Deploy to production

---

## Next Steps

After completing implementation:
1. Write Playwright tests (see 07-TESTING.md in docs/rules)
2. Document any custom configurations
3. Update theme documentation if needed
