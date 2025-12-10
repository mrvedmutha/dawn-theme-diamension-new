# Shop Collection Arch - Design Tokens

**Version:** 1.0.0  
**Last Updated:** 2025-12-10  
**Section Name:** Radiance Collection  

---

## 📐 Layout & Dimensions

### Container

| Token | Value | Unit | Notes |
|-------|-------|------|-------|
| `--container-max-width` | 1440 | px | Maximum container width |
| `--container-margin` | 0 auto | - | Center alignment |
| `--container-padding-desktop` | 40 | px | Desktop padding |
| `--container-padding-tablet` | 30 | px | Tablet padding |
| `--container-padding-mobile` | 20 | px | Mobile padding |

### Wrapper

| Token | Value | Unit | Notes |
|-------|-------|------|-------|
| `--wrapper-background-color` | #FFFAF5 | hex | Beige background |
| `--wrapper-width` | 100% | - | Full width |

### Center Frame

| Token | Value | Unit | Notes |
|-------|-------|------|-------|
| `--frame-width` | 1260 | px | Frame width |
| `--frame-height` | 420 | px | Frame height |
| `--frame-rotation` | -16 | deg | CSS rotation |
| `--frame-background` | #FFFFFF | hex | White background |
| `--frame-border-radius` | 12 | px | Rounded corners |

### Decorative Ellipse

| Token | Value | Unit | Notes |
|-------|-------|------|-------|
| `--ellipse-rotation` | -16.823 | deg | CSS rotation |
| `--ellipse-visibility` | visible (desktop only) | - | Hidden on tablet/mobile |

### Spacing

| Token | Value | Unit | Notes |
|-------|-------|------|-------|
| `--spacing-xs` | 8 | px | Extra small |
| `--spacing-sm` | 16 | px | Small (gap between images) |
| `--spacing-md` | 24 | px | Medium |
| `--spacing-lg` | 40 | px | Large |
| `--spacing-xl` | 80 | px | Extra large |

---

## 🎨 Colors

### Primary Colors

| Token | Color Name | Hex Code | RGB | Usage |
|-------|-----------|----------|-----|-------|
| `--color-background` | White | #FFFFFF | rgb(255, 255, 255) | Section background |
| `--color-wrapper-bg` | Beige | #FFFAF5 | rgb(255, 250, 245) | Wrapper background |
| `--color-text-primary` | Dark Blue | #183754 | rgb(24, 55, 84) | Heading text |
| `--color-text-light` | White | #FFFFFF | rgb(255, 255, 255) | CTA link text |
| `--color-lines` | Blue | #3E82C9 | rgb(62, 130, 201) | Connecting lines (locked) |

### Secondary Colors

| Token | Color Name | Hex Code | Usage |
|-------|-----------|----------|-------|
| `--color-overlay` | Black 50% | rgba(0, 0, 0, 0.5) | Optional overlay |
| `--color-border` | Light Gray | #E0E0E0 | Optional borders |

---

## 🔤 Typography

### Font Families

| Token | Font Name | File Path | Usage |
|-------|-----------|-----------|-------|
| `--font-heading` | Neue Haas Grotesk Display Pro | `prototype/assets/fonts/neue-haas-display/` | Headings |
| `--font-body` | Neue Montreal | `prototype/assets/fonts/neue-montreal/` | Body text |

### Heading Styles

| Token | Font Size | Font Weight | Line Height | Letter Spacing | Notes |
|-------|-----------|-------------|-------------|-----------------|-------|
| `--heading-size` | 40px / 2.5rem | 45 Light | 50px / 1.25 | normal | Section heading |
| `--heading-size-mobile` | 32px / 2rem | 45 Light | 40px / 1.25 | normal | Mobile heading |

### CTA Link Styles

| Token | Font Size | Font Weight | Line Height | Text Decoration | Notes |
|-------|-----------|-------------|-------------|-----------------|-------|
| `--cta-size` | 20px / 1.25rem | 55 Roman | 40px / 2 | underline | "Shop the Collection" |
| `--cta-size-mobile` | 16px / 1rem | 55 Roman | 32px / 2 | underline | Mobile CTA |

### Body Text Styles

| Token | Font Size | Font Weight | Line Height | Notes |
|-------|-----------|-------------|-------------|-------|
| `--body-size` | 16px / 1rem | 400 Regular | 1.6 | Standard body text |
| `--body-size-small` | 14px / 0.875rem | 400 Regular | 1.5 | Small text |

---

## ✨ Animations

### Parallax Float Effect

| Token | Value | Notes |
|-------|-------|-------|
| `--parallax-duration` | scroll-based | Triggered on scroll |
| `--parallax-easing` | ease-out | Smooth easing |
| `--parallax-movement-range` | subtle | Experiment with subtle movement |
| `--parallax-direction` | same (up/down) | Both images move together |
| `--parallax-enabled-desktop` | true | Desktop only |
| `--parallax-enabled-tablet` | false | Disabled on tablet |
| `--parallax-enabled-mobile` | false | Disabled on mobile |

### Star Rotation Animation

| Token | Value | Notes |
|-------|-------|-------|
| `--star-rotation-duration` | 8s | 8 seconds per full rotation |
| `--star-rotation-direction` | clockwise | Clockwise rotation |
| `--star-rotation-easing` | linear | Continuous rotation |
| `--star-size` | xs (very small) | Fixed size |
| `--star-enabled-desktop` | true | Desktop only |
| `--star-enabled-tablet` | false | Disabled on tablet |
| `--star-enabled-mobile` | false | Disabled on mobile |

### Transitions

| Token | Value | Notes |
|-------|-------|-------|
| `--transition-default` | 0.3s ease | Standard transition |
| `--transition-slow` | 0.5s ease-in-out | Slow transition |
| `--transition-fast` | 0.2s ease | Fast transition |

---

## 📱 Breakpoints

| Token | Breakpoint | Width | Notes |
|-------|-----------|-------|-------|
| `--breakpoint-large-desktop` | min-width | 1441px | Large desktop |
| `--breakpoint-desktop` | base | 1440px | Desktop base |
| `--breakpoint-tablet` | max-width | 1024px | Tablet |
| `--breakpoint-mobile` | max-width | 767px | Mobile |
| `--breakpoint-small-mobile` | max-width | 375px | Small mobile |

---

## 🎯 Z-Index Layering

| Token | Layer | Z-Index | Element |
|-------|-------|---------|---------|
| `--z-lines` | 1 | 1 | CSS Connecting Lines |
| `--z-star` | 2 | 2 | Rotating Star |
| `--z-images` | 3 | 3 | Side Product Images |
| `--z-center` | 4 | 4 | Center Frame |

---

## 🖼️ Image & Media

### Image Sizes

| Token | Width | Height | Aspect Ratio | Notes |
|-------|-------|--------|--------------|-------|
| `--image-left-width` | auto | auto | varies | Left product image |
| `--image-right-width` | auto | auto | varies | Right product image |
| `--image-bottom-width` | auto | auto | varies | Bottom product image |
| `--center-frame-width` | 1260 | 420 | 3:1 | Center frame |

### Video Settings

| Token | Value | Notes |
|-------|-------|-------|
| `--video-autoplay` | true | Auto-play on load |
| `--video-loop` | true | Loop continuously |
| `--video-muted` | true | Muted by default |
| `--video-controls` | false | No controls shown |

---

## 🎨 SVG & Icons

### Star SVG

| Token | Value | Notes |
|-------|-------|-------|
| `--star-size` | xs (very small) | Fixed size |
| `--star-color` | inherit | Uses text color |
| `--star-fill` | currentColor | Dynamic color |
| `--star-path` | connecting lines | Rotates along path |

### Default Star Fallback

| Token | Value | Notes |
|-------|-------|-------|
| `--star-default-path` | `prototype/section-shop-collection-arch/assets/icons/star-default.svg` | Fallback SVG |
| `--star-custom-upload` | image_picker | Merchant can upload custom |

---

## 🎭 States & Variants

### Link States

| State | Color | Text Decoration | Cursor | Notes |
|-------|-------|-----------------|--------|-------|
| Default | #FFFFFF | underline | pointer | Normal state |
| Hover | #FFFFFF | underline | pointer | Hover state |
| Active | #FFFFFF | underline | pointer | Active state |

### Image States

| State | Opacity | Transform | Notes |
|-------|---------|-----------|-------|
| Default | 1 | none | Normal state |
| Hover (desktop) | 1 | scale(1.05) | Subtle zoom |
| Active | 1 | none | Active state |

---

## 📊 Responsive Adjustments

### Desktop (1440px)

| Element | Value | Notes |
|---------|-------|-------|
| Container Padding | 40px | Standard padding |
| Heading Size | 40px | Full size |
| CTA Size | 20px | Full size |
| Parallax | Enabled | Active |
| Star Rotation | Enabled | Active |
| Ellipse | Visible | Decorative element |

### Tablet (1024px)

| Element | Value | Notes |
|---------|-------|-------|
| Container Padding | 30px | Reduced padding |
| Heading Size | 36px | Slightly smaller |
| CTA Size | 18px | Slightly smaller |
| Parallax | Disabled | Static |
| Star Rotation | Disabled | Static |
| Ellipse | Hidden | Not visible |
| Layout | Stacked | Vertical layout |
| Image Gap | 16px | Between side images |

### Mobile (767px)

| Element | Value | Notes |
|---------|-------|-------|
| Container Padding | 20px | Minimal padding |
| Heading Size | 32px | Mobile size |
| CTA Size | 16px | Mobile size |
| Parallax | Disabled | Static |
| Star Rotation | Disabled | Static |
| Ellipse | Hidden | Not visible |
| Layout | Stacked | Vertical layout |
| Image Gap | 16px | Between side images |

### Small Mobile (375px)

| Element | Value | Notes |
|---------|-------|-------|
| Container Padding | 15px | Extra minimal |
| Heading Size | 28px | Small mobile size |
| CTA Size | 14px | Small mobile size |
| Parallax | Disabled | Static |
| Star Rotation | Disabled | Static |
| Ellipse | Hidden | Not visible |
| Layout | Stacked | Vertical layout |
| Image Gap | 16px | Between side images |

---

## 🔗 CSS Variables (Implementation)

```css
:root {
  /* Layout */
  --container-max-width: 1440px;
  --container-padding-desktop: 40px;
  --container-padding-tablet: 30px;
  --container-padding-mobile: 20px;

  /* Colors */
  --color-background: #FFFFFF;
  --color-wrapper-bg: #FFFAF5;
  --color-text-primary: #183754;
  --color-text-light: #FFFFFF;
  --color-lines: #3E82C9;

  /* Typography */
  --heading-size: 40px;
  --heading-weight: 300;
  --heading-line-height: 50px;
  --cta-size: 20px;
  --cta-weight: 400;
  --cta-line-height: 40px;

  /* Spacing */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 40px;
  --spacing-xl: 80px;

  /* Animations */
  --parallax-duration: scroll-based;
  --star-rotation-duration: 8s;
  --transition-default: 0.3s ease;

  /* Z-Index */
  --z-lines: 1;
  --z-star: 2;
  --z-images: 3;
  --z-center: 4;

  /* Breakpoints */
  --breakpoint-tablet: 1024px;
  --breakpoint-mobile: 767px;
  --breakpoint-small-mobile: 375px;
}
```

---

## 📋 Token Usage Examples

### Heading
```css
.custom-section-shop-collection-arch__heading {
  font-size: var(--heading-size);
  font-weight: var(--heading-weight);
  line-height: var(--heading-line-height);
  color: var(--color-text-primary);
}
```

### CTA Link
```css
.custom-section-shop-collection-arch__cta {
  font-size: var(--cta-size);
  font-weight: var(--cta-weight);
  color: var(--color-text-light);
  text-decoration: underline;
  transition: var(--transition-default);
}
```

### Container
```css
.custom-section-shop-collection-arch__container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--container-padding-desktop);
}

@media (max-width: 1024px) {
  .custom-section-shop-collection-arch__container {
    padding: var(--container-padding-tablet);
  }
}

@media (max-width: 767px) {
  .custom-section-shop-collection-arch__container {
    padding: var(--container-padding-mobile);
  }
}
```

---

**Status:** ✅ Complete  
**Last Updated:** 2025-12-10  
**Version:** 1.0.0
