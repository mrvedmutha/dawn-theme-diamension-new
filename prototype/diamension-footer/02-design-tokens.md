# Diamension Footer - Design Tokens

**Extracted from Figma:** 2025-12-17
**Desktop Node:** 12:4842
**Mobile Node:** 196:112

---

## Colors

### Background
```css
--footer-bg: #fffaf5;
```

### Text Colors
```css
--footer-text-primary: #183754;    /* Menu items, body text */
--footer-text-secondary: #3e6282;  /* Menu headings, newsletter heading */
```

---

## Typography

### Font Families

**Neue Montreal (Regular):**
- **File Location:** `assets/fonts/neue-montreal/NeueMontreal-Regular.woff2`
- **Usage:** Menu headings, newsletter heading
- **Weight:** 400 (Regular)

**Neue Haas Grotesk Display Pro 55 Roman:**
- **File Location:** `assets/fonts/neue-haas-display/`
- **Usage:** Newsletter description, copyright
- **Weight:** 400 (Roman/Regular)

**Neue Haas Grotesk Display Pro 45 Light:**
- **File Location:** `assets/fonts/neue-haas-display/`
- **Usage:** Legal links
- **Weight:** 300 (Light)

**Inter Regular:**
- **Usage:** Logo subtitle "JEWELLERY"
- **Weight:** 400 (Regular)
- **Note:** May need to load from Google Fonts or add to assets

### Font Sizes

#### Desktop (≥1025px)
```css
/* Menu Headings */
--menu-heading-size: 14px;
--menu-heading-transform: uppercase;

/* Menu Items */
--menu-item-size: 14px;
--menu-item-tracking: 0.7px;
--menu-item-transform: uppercase;

/* Newsletter Heading */
--newsletter-heading-size: 14px;
--newsletter-heading-transform: uppercase;

/* Newsletter Description */
--newsletter-desc-size: 14px;
--newsletter-desc-transform: capitalize;

/* Email Input Label */
--email-label-size: 16px;
--email-label-transform: uppercase;

/* Logo Subtitle (JEWELLERY) */
--logo-subtitle-size: 12.016px;
--logo-subtitle-tracking: 36.0472px;  /* Very wide spacing */
--logo-subtitle-transform: uppercase;

/* Copyright & Legal Links */
--footer-bottom-size: 14px;
--footer-bottom-transform: capitalize;

/* Legal Links (Light weight) */
--legal-link-size: 14px;
```

#### Mobile (≤1024px)
```css
/* Logo Subtitle (JEWELLERY) */
--logo-subtitle-size-mobile: 8.358px;
--logo-subtitle-tracking-mobile: 25.0735px;

/* Copyright */
--footer-bottom-size-mobile: 12px;

/* Other sizes remain 14px */
```

---

## Spacing & Layout

### Desktop Layout (≥1025px)

#### Wrapper
```css
--footer-wrapper-bg: #fffaf5;
--footer-wrapper-height: 656px;
--footer-container-max-width: 1440px;
```

#### Padding
```css
--footer-padding-top: 152px;
--footer-padding-right: 48px;
--footer-padding-bottom: 24px;
--footer-padding-left: 48px;
```

#### Logo Positioning (Desktop)
```css
/* Logo positioned top right, above newsletter */
--logo-position: absolute;
--logo-right: 48px;  /* Aligns with container padding */
--logo-top: 0;       /* Will be offset by padding-top */
```

#### Logo Sizing
```css
--logo-width-desktop: 368px;
--logo-height-desktop: 43.728px;  /* From Figma */
--logo-subtitle-margin-top: /* TBD from Figma spacing */
```

#### Newsletter Section (Desktop Right Side)
```css
--newsletter-width: 299.926px;
--newsletter-gap: 47px;  /* Gap between heading/desc and form */
--newsletter-desc-width: 282.699px;
--newsletter-heading-gap: 20px;  /* Between heading and description */
```

#### Menu Columns Spacing
```css
/* SHOP Column */
--shop-left: 49.61px;
--shop-top: 165.88px;
--shop-width: 78px;

/* SUPPORT Column */
--support-left: 219.44px;
--support-top: 165.88px;
--support-width: 172px;

/* DIAMENSIONS Column */
--diamensions-left: 471.68px;
--diamensions-top: 165.88px;
--diamensions-width: 145px;

/* CONNECT Column */
--connect-left: 702.2px;
--connect-top: 165.88px;
--connect-width: 89px;
```

#### Menu Item Gaps
```css
--menu-heading-gap: 20px;     /* Between heading and items */
--menu-item-gap-shop: 16px;   /* SHOP, SUPPORT items */
--menu-item-gap-other: 18px;  /* DIAMENSIONS, CONNECT items */
```

#### Bottom Bar
```css
--bottom-bar-top: 615.23px;   /* From wrapper top */
--bottom-copyright-left: 51px;
--bottom-center-left: 374px;
--bottom-legal-left: 847.89px;
--bottom-legal-gap: 30px;     /* Gap between legal links */
```

### Mobile Layout (<1025px)

#### Padding
```css
--footer-padding-top-mobile: 48px;
--footer-padding-right-mobile: 24px;
--footer-padding-bottom-mobile: 32px;
--footer-padding-left-mobile: 24px;
```

#### Logo
```css
--logo-width-mobile: 256.653px;
--logo-height-mobile: 30.416px;
--logo-position-mobile: relative;  /* Left aligned at top */
--logo-top-mobile: 45.83px;
--logo-align-mobile: left;
```

#### Newsletter Section (Mobile Top, Full Width, Left Aligned)
```css
--newsletter-top-mobile: 147px;
--newsletter-width-mobile: 343px;  /* Full width minus padding */
--newsletter-gap-mobile: 47px;
--newsletter-align-mobile: left;
```

#### Menu Grid (Two Columns)
```css
/* Row 1 */
--shop-top-mobile: 346px;
--shop-left-mobile: 20px;
--support-top-mobile: 346px;
--support-left-mobile: 191.67px;

/* Row 2 */
--diamensions-top-mobile: 683.5px;
--diamensions-left-mobile: 20px;
--connect-top-mobile: 683.5px;
--connect-left-mobile: 191.67px;
```

#### Bottom Bar (Stacked, Centered)
```css
--bottom-bar-top-mobile: 924px;
--bottom-links-gap-mobile: 10px;  /* Between stacked items */
--bottom-bar-align-mobile: center;  /* Only bottom bar is centered */
```

---

## Email Input & Newsletter Form

### Email Input
```css
--email-input-size: 16px;
--email-input-transform: uppercase;
--email-input-border: none;
--email-input-border-bottom: 1px solid currentColor;  /* Line from Figma */
--email-input-padding: 8px 0;  /* Top/bottom spacing */
--email-input-outline: none;  /* CRITICAL: No focus outline */
```

### Submit Arrow Button
```css
--arrow-button-size: 8.87px;  /* Icon size */
--arrow-button-rotation: rotate(315deg);  /* Diagonal arrow */
--arrow-button-position: absolute;
--arrow-button-right: 0;
--arrow-button-top: 9.01px;  /* Aligned with input */
```

### Success/Error Messages
```css
/* Display at top of newsletter section, above description */
--message-font-family: 'Neue Haas Grotesk Display Pro';
--message-font-size: 14px;
--message-color-success: #183754;
--message-color-error: #183754;
--message-margin-bottom: 20px;
```

---

## Homepage Footer Image

### Dimensions
```css
--footer-image-width: 100%;  /* Full viewport width */
--footer-image-height-desktop: 448px;
--footer-image-object-fit: cover;
--footer-image-object-position: center;
```

### Responsive Heights (8-division rule)
```css
--footer-image-height-small-desktop: 384px;  /* 1024px - 900px */
--footer-image-height-tablet: 320px;         /* 899px - 768px */
--footer-image-height-mid-mobile: 288px;     /* 767px - 480px */
--footer-image-height-small-mobile: 256px;   /* 479px - 376px */
--footer-image-height-xs-mobile: 224px;      /* ≤375px */
```

### Background Color (for gap on non-homepage)
```css
--footer-image-bg: #fffaf5;
--footer-image-gap-product-page: 100px;  /* Spacing for sticky CTA */
```

---

## Breakpoints

```css
/* Desktop (Base) */
--breakpoint-desktop: 1025px;

/* Small Desktop */
--breakpoint-small-desktop: 1024px;
--breakpoint-small-desktop-min: 900px;

/* Tablet */
--breakpoint-tablet: 899px;
--breakpoint-tablet-min: 768px;

/* Mid Mobile */
--breakpoint-mid-mobile: 767px;
--breakpoint-mid-mobile-min: 480px;

/* Small Mobile */
--breakpoint-small-mobile: 479px;
--breakpoint-small-mobile-min: 376px;

/* XS Mobile */
--breakpoint-xs-mobile: 375px;
```

---

## Figma Asset References

### Icons/SVG
- **Line underline:** `imgLine3` (from Figma localhost server)
- **Arrow icon:** `imgArrow1` (from Figma localhost server)
- **Logo:** `imgDiamension` (from Figma localhost server, replace with merchant upload)

**Note:** SVG icons should be recreated or extracted from Figma and added to assets/icons/ directory.

---

## Grid Layout Specifications

### Desktop Menu Grid
```css
display: grid;
grid-template-columns: [shop] 78px [support] 172px [diamensions] 145px [connect] 89px [newsletter] 299.926px;
gap: /* Calculate from Figma positions */
```

### Mobile Menu Grid
```css
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 20px;
```

---

## Transitions & Animations

### Hover States
```css
--link-transition: color 0.3s ease;
--button-transition: transform 0.2s ease, opacity 0.3s ease;
```

### Newsletter Message Animation
```css
--message-fade-in: fadeIn 0.3s ease-in-out;
```

---

## Design Notes from Figma

1. **Logo Positioning:** Desktop - top right corner above newsletter. Mobile - left aligned at top
2. **Newsletter Success/Error:** Display at top of newsletter section, above description text
3. **Email Input:** Underlined style, no box, no focus outline
4. **Arrow Button:** Diagonal (315deg rotation), positioned at right edge of input underline
5. **Menu Item Alignment:** Left-aligned on both desktop and mobile, uppercase, consistent spacing
6. **Bottom Bar:** Three-part layout (left/center/right) on desktop, centered and stacked on mobile
7. **Typography:** All uppercase for headings/labels, capitalize for body text
8. **Footer Image:** Separate section, homepage conditional, maintains bg color on other pages
9. **Mobile Alignment:** All content left-aligned EXCEPT bottom bar which is centered

---

## Implementation Priority

1. Typography setup (font imports)
2. Color variables
3. Spacing/layout structure
4. Newsletter form styling
5. Menu columns layout
6. Bottom bar layout
7. Responsive breakpoints
8. Homepage footer image section
9. Success/error message handling
10. Product page spacing modifier
