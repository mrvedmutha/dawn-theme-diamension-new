# Liquid Development Standards

**Direct Liquid development - build once, no prototype conversion.**

---

## File Creation

### Section File
```
sections/custom-section-[name].liquid
```

### CSS File
```
assets/section-[name].css
```

### JavaScript File
```
assets/section-[name].js
```

**See:** [08-NAMING-CONVENTIONS.md](./08-NAMING-CONVENTIONS.md)

---

## Section Structure

```liquid
{{ 'section-[name].css' | asset_url | stylesheet_tag }}

<div class="custom-section-[name]">
  <!-- Markup here -->
</div>

<script src="{{ 'section-[name].js' | asset_url }}" defer></script>

{% schema %}
{
  "name": "Section Name",
  "settings": [
    {
      "type": "image_picker",
      "id": "background_image",
      "label": "Background Image"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Default Heading"
    }
  ],
  "presets": [
    {
      "name": "Section Name"
    }
  ]
}
{% endschema %}
```

---

## Schema Settings - Common Types

### Image Picker
```json
{
  "type": "image_picker",
  "id": "image",
  "label": "Image"
}
```

Usage:
```liquid
<img src="{{ section.settings.image | image_url: width: 1920 }}" alt="{{ section.settings.image.alt }}">
```

---

### Video URL
```json
{
  "type": "video_url",
  "id": "video",
  "label": "Video URL",
  "accept": ["youtube", "vimeo"]
}
```

Usage:
```liquid
{% if section.settings.video %}
  {{ section.settings.video | video_tag: autoplay: true, loop: true, muted: true }}
{% endif %}
```

---

### Text & Richtext
```json
{
  "type": "text",
  "id": "heading",
  "label": "Heading",
  "default": "Default Heading"
},
{
  "type": "richtext",
  "id": "description",
  "label": "Description"
}
```

Usage:
```liquid
<h2>{{ section.settings.heading }}</h2>
<div>{{ section.settings.description }}</div>
```

---

### Color
```json
{
  "type": "color",
  "id": "background_color",
  "label": "Background Color",
  "default": "#ffffff"
}
```

Usage:
```liquid
<div style="background-color: {{ section.settings.background_color }}">
```

---

### Range
```json
{
  "type": "range",
  "id": "padding",
  "label": "Padding",
  "min": 0,
  "max": 100,
  "step": 10,
  "unit": "px",
  "default": 40
}
```

Usage:
```liquid
<div style="padding: {{ section.settings.padding }}px">
```

---

### Select
```json
{
  "type": "select",
  "id": "layout",
  "label": "Layout",
  "options": [
    { "value": "left", "label": "Left" },
    { "value": "center", "label": "Center" },
    { "value": "right", "label": "Right" }
  ],
  "default": "center"
}
```

Usage:
```liquid
<div class="custom-section-[name]--{{ section.settings.layout }}">
```

---

### Checkbox
```json
{
  "type": "checkbox",
  "id": "show_arrows",
  "label": "Show Navigation Arrows",
  "default": true
}
```

Usage:
```liquid
{% if section.settings.show_arrows %}
  <button class="arrow-prev">←</button>
  <button class="arrow-next">→</button>
{% endif %}
```

---

## Blocks (Repeatable Content)

```liquid
{% schema %}
{
  "name": "Product Grid",
  "blocks": [
    {
      "type": "product",
      "name": "Product",
      "settings": [
        {
          "type": "product",
          "id": "product",
          "label": "Product"
        }
      ]
    }
  ]
}
{% endschema %}

{% for block in section.blocks %}
  {% case block.type %}
    {% when 'product' %}
      {% assign product = block.settings.product %}
      <div class="product-card">
        <img src="{{ product.featured_image | image_url: width: 600 }}" alt="{{ product.title }}">
        <h3>{{ product.title }}</h3>
        <p>{{ product.price | money }}</p>
      </div>
  {% endcase %}
{% endfor %}
```

---

## Shopify Objects - Common Usage

### Product
```liquid
{{ product.title }}
{{ product.price | money }}
{{ product.featured_image | image_url: width: 600 }}
{{ product.description }}
{{ product.url }}
```

### Collection
```liquid
{{ collection.title }}
{{ collection.image | image_url: width: 1200 }}

{% for product in collection.products limit: 8 %}
  {{ product.title }}
{% endfor %}
```

### Cart
```liquid
{{ cart.item_count }}
{{ cart.total_price | money }}

{% for item in cart.items %}
  {{ item.product.title }}
  {{ item.quantity }}
  {{ item.line_price | money }}
{% endfor %}
```

---

## Asset Handling in Liquid

### Images from Section Settings
```liquid
{% if section.settings.image %}
  <img
    src="{{ section.settings.image | image_url: width: 1920 }}"
    srcset="{{ section.settings.image | image_url: width: 600 }} 600w,
            {{ section.settings.image | image_url: width: 1200 }} 1200w,
            {{ section.settings.image | image_url: width: 1920 }} 1920w"
    sizes="100vw"
    alt="{{ section.settings.image.alt | escape }}"
  >
{% endif %}
```

### Inline SVG
```liquid
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M..." stroke="currentColor"/>
</svg>
```

### Background Images
```liquid
<div style="background-image: url('{{ section.settings.bg_image | image_url: width: 1920 }}');">
```

### Fonts (Google Fonts)
Add to `theme.liquid` `<head>`:
```liquid
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Neue+Haas+Display:wght@400;700&display=swap" rel="stylesheet">
```

---

## BEM Class Naming

```liquid
<!-- Block -->
<div class="custom-section-header">

  <!-- Element -->
  <div class="custom-section-header__container">
    <h1 class="custom-section-header__title">{{ section.settings.title }}</h1>
    <p class="custom-section-header__description">{{ section.settings.description }}</p>
  </div>

  <!-- Modifier -->
  <div class="custom-section-header__cta custom-section-header__cta--primary">
    <a href="{{ section.settings.cta_link }}">{{ section.settings.cta_text }}</a>
  </div>

</div>
```

**See:** [05-CSS-STANDARDS.md](./05-CSS-STANDARDS.md) for BEM details

---

## Liquid Best Practices

### Keep Logic Minimal
```liquid
<!-- ✓ GOOD -->
{% assign show_section = true %}
{% if section.settings.image == blank %}
  {% assign show_section = false %}
{% endif %}

{% if show_section %}
  <div>...</div>
{% endif %}

<!-- ✗ BAD - Too complex -->
{% if section.settings.image != blank and section.settings.title != blank and section.blocks.size > 0 %}
  <!-- nested logic -->
{% endif %}
```

### Use Filters Correctly
```liquid
<!-- Price -->
{{ product.price | money }}

<!-- Image URL -->
{{ image | image_url: width: 600 }}

<!-- Escape text -->
{{ product.title | escape }}

<!-- Truncate -->
{{ product.description | truncate: 150 }}

<!-- Capitalize -->
{{ product.title | capitalize }}
```

### Default Values
```liquid
{% assign heading = section.settings.heading | default: "Default Heading" %}
```

### Check for Blank
```liquid
{% if section.settings.image != blank %}
  <img src="{{ section.settings.image | image_url }}">
{% endif %}
```

---

## Core Theme Protection

### NEVER Modify Core Files
```
❌ sections/header.liquid
❌ snippets/card-product.liquid
❌ assets/base.css
❌ layout/theme.liquid (unless adding global assets)
```

### Override Core Classes with Namespacing
```css
/* ✓ GOOD - Namespaced override */
.custom-section-header .page-width {
  max-width: 1440px;
}

/* ✗ BAD - Direct core class modification */
.page-width {
  max-width: 1440px;
}
```

---

## Performance Tips

### Lazy Load Images
```liquid
<img
  src="{{ image | image_url: width: 1920 }}"
  loading="lazy"
  alt="{{ image.alt }}"
>
```

### Defer JavaScript
```liquid
<script src="{{ 'section-[name].js' | asset_url }}" defer></script>
```

### Minimize Liquid Loops
```liquid
<!-- Limit products rendered -->
{% for product in collection.products limit: 8 %}
  ...
{% endfor %}
```

---

## Common Patterns

### Hero Section
```liquid
<div class="custom-section-hero" style="background-image: url('{{ section.settings.bg_image | image_url: width: 1920 }}');">
  <div class="custom-section-hero__content">
    <h1>{{ section.settings.heading }}</h1>
    <p>{{ section.settings.subheading }}</p>
    <a href="{{ section.settings.cta_link }}" class="btn">{{ section.settings.cta_text }}</a>
  </div>
</div>
```

### Product Grid
```liquid
<div class="custom-section-products">
  {% for product in section.settings.collection.products limit: section.settings.products_to_show %}
    <div class="product-card">
      <img src="{{ product.featured_image | image_url: width: 600 }}">
      <h3>{{ product.title }}</h3>
      <p>{{ product.price | money }}</p>
      <a href="{{ product.url }}">View Product</a>
    </div>
  {% endfor %}
</div>
```

### Testimonial Slider (with Blocks)
```liquid
<div class="custom-section-testimonials">
  {% for block in section.blocks %}
    <div class="testimonial-card">
      <p>"{{ block.settings.quote }}"</p>
      <p>— {{ block.settings.author }}</p>
    </div>
  {% endfor %}
</div>
```

---

## Testing in Theme Editor

After creating section:

1. Run `shopify theme dev`
2. Open theme editor: http://localhost:9292/admin/themes/current/editor
3. Add your custom section
4. Test all settings:
   - Upload images
   - Change text
   - Toggle checkboxes
   - Test blocks (add/remove/reorder)
5. Verify changes reflect immediately
6. Check responsive views
7. Save and preview

---

## Checklist Before Committing

- [ ] Section schema complete with all settings
- [ ] All assets use section settings (not hardcoded paths)
- [ ] BEM class naming used
- [ ] CSS/JS files linked correctly
- [ ] Tested in theme editor
- [ ] Works on all breakpoints
- [ ] No core theme files modified
- [ ] Code is clean and readable
