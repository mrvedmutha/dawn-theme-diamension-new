# Brand Story About Us - Design Tokens

## Color Tokens

| Token Name | Hex Value | Usage | Editable |
|------------|-----------|-------|----------|
| `background` | `#FFFAF5` | Section background color | No (hardcoded) |
| `heading-text` | `#183754` | Heading text color | No (hardcoded) |
| `body-text` | `#3E6282` | Rich text content color | No (hardcoded) |

**Note:** All colors are hardcoded in CSS and NOT configurable via section settings.

---

## Typography

### Font Family
**Primary Font:** Neue Haas Grotesk Display Pro

**Font Path:** `assets/fonts/neue-haas-display/`

**Font Files:**
- `NeueHaasDisplay-Light.woff2` (Weight: 300)
- `NeueHaasDisplay-Roman.woff2` (Weight: 400)
- `NeueHaasDisplay-Bold.woff2` (Weight: 700)

**Font-Face Declaration:**
```css
@font-face {
  font-family: 'Neue Haas Grotesk Display Pro';
  src: url('NeueHaasDisplay-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Neue Haas Grotesk Display Pro';
  src: url('NeueHaasDisplay-Roman.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

**Fallback Stack:**
```css
font-family: 'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

---

## Typography Scale - Responsive

### Heading

| Breakpoint | Font Size | Line Height | Font Weight | Transform | Color |
|------------|-----------|-------------|-------------|-----------|-------|
| Desktop (1440px) | `40px` | `45px` | Light (300) | uppercase | #183754 |
| Tablet (1024px) | `32px` | `36px` | Light (300) | uppercase | #183754 |
| Mobile (767px) | `28px` | `32px` | Light (300) | uppercase | #183754 |
| Small Mobile (375px) | `24px` | `28px` | Light (300) | uppercase | #183754 |

**CSS Implementation:**
```css
.heading {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-weight: 300;
  font-size: 40px;
  line-height: 45px;
  text-transform: uppercase;
  color: #183754;
}

@media (max-width: 1024px) {
  .heading {
    font-size: 32px;
    line-height: 36px;
  }
}

@media (max-width: 767px) {
  .heading {
    font-size: 28px;
    line-height: 32px;
  }
}

@media (max-width: 375px) {
  .heading {
    font-size: 24px;
    line-height: 28px;
  }
}
```

---

### Body / Rich Text Content

| Breakpoint | Font Size | Line Height | Font Weight | Color |
|------------|-----------|-------------|-------------|-------|
| Desktop (1440px) | `20px` | `30px` | Roman (400) | #3E6282 |
| Tablet (1024px) | `18px` | `27px` | Roman (400) | #3E6282 |
| Mobile (767px) | `16px` | `24px` | Roman (400) | #3E6282 |
| Small Mobile (375px) | `15px` | `22px` | Roman (400) | #3E6282 |

**CSS Implementation:**
```css
.content {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #3E6282;
}

@media (max-width: 1024px) {
  .content {
    font-size: 18px;
    line-height: 27px;
  }
}

@media (max-width: 767px) {
  .content {
    font-size: 16px;
    line-height: 24px;
  }
}

@media (max-width: 375px) {
  .content {
    font-size: 15px;
    line-height: 22px;
  }
}
```

---

## Spacing Tokens - Responsive

### Section Height

| Breakpoint | Value | Notes |
|------------|-------|-------|
| Desktop (1440px) | `800px` | Fixed height |
| Tablet (1024px) | `800px` | Fixed height |
| Mobile (767px and below) | `75vh` | Viewport-relative, adapts to screen |
| Small Mobile (375px) | `75vh` | Same as mobile |

---

### Content Container Spacing

#### Desktop (1440px)

| Element | Property | Value |
|---------|----------|-------|
| Left column | `padding-left` | `56px` |
| Left column | `padding-top` | `192px` |
| Content | `max-width` | `498px` |
| Heading + Content | `gap` | `24px` |

#### Tablet (1024px)

| Element | Property | Value |
|---------|----------|-------|
| Left column | `padding-left` | `40px` |
| Left column | `padding-top` | `140px` |
| Content | `max-width` | `420px` |
| Heading + Content | `gap` | `20px` |

#### Mobile (767px)

| Element | Property | Value |
|---------|----------|-------|
| Content block | `padding` | `40px 20px` |
| Content block | `max-width` | `90%` |
| Content block | `margin` | `0 auto` |
| Text alignment | `text-align` | `left` |
| Heading + Content | `gap` | `16px` |

#### Small Mobile (375px)

| Element | Property | Value |
|---------|----------|-------|
| Content block | `padding` | `32px 16px` |
| Content block | `max-width` | `90%` |
| Content block | `margin` | `0 auto` |
| Text alignment | `text-align` | `left` |
| Heading + Content | `gap` | `16px` |

---

### Image Container

| Breakpoint | Width | Height | Object-fit |
|------------|-------|--------|------------|
| Desktop (1440px) | `50vw` | `800px` | cover |
| Tablet (1024px) | `50vw` | `800px` | cover |
| Mobile (767px) | `100%` | `~60% of 75vh` | cover |
| Small Mobile (375px) | `100%` | `~60% of 75vh` | cover |

---

### Logo Overlay

| Property | Value | Notes |
|----------|-------|-------|
| Position | `absolute` | Centered on image |
| Transform | `translate(-50%, -50%)` | Perfect centering |
| Top | `50%` | Vertical center |
| Left | `50%` | Horizontal center |
| Max-width | `200px` (desktop), `150px` (mobile) | Responsive sizing |

---

## Breakpoint Definitions

| Breakpoint Name | Media Query | Purpose |
|-----------------|-------------|---------|
| Large Desktop | `@media (min-width: 1441px)` | Prevent stretch, center content with max-width 1440px |
| Desktop (Base) | `1440px` | Default design specs (matches Figma) |
| Tablet | `@media (max-width: 1024px)` | Scale fonts, reduce spacing, maintain two-column |
| Mobile | `@media (max-width: 767px)` | Stack layout, 75vh height, disable animations |
| Small Mobile | `@media (max-width: 375px)` | Further font scaling, tighter spacing |

---

## Animation Timing Tokens (Desktop Only)

| Element | Delay | Duration | Easing |
|---------|-------|----------|--------|
| Heading | `0ms` | `600ms` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Content | `200ms` | `600ms` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Logo Overlay | `400ms` | `600ms` | `cubic-bezier(0.4, 0, 0.2, 1)` |

**Transform:** `translateY(30px)` → `translateY(0)`
**Opacity:** `0` → `1`

**Note:** Animations only active on desktop (1025px and above). Disabled on tablet and mobile.

---

## Z-Index Layering

| Element | Z-Index | Purpose |
|---------|---------|---------|
| Background | `1` | Base layer |
| Image | `2` | Above background |
| Logo Overlay | `3` | Above image |
| Content | `4` | Above all (for readability) |

---

## Asset References

### Logo SVG
**Path:** `assets/custom-section-diamension-quote/logo/diamension-logo.svg`
**Usage:** Reused from existing Diamension Quote section
**Color:** Inherits SVG fill (likely white/light for contrast on image)

### Background Image
**Source:** User upload via `image_picker` setting
**Fallback:** Placeholder background or solid color if no image uploaded
**Format:** Shopify image filter with responsive srcset

---

## Accessibility Tokens

| Property | Value | Purpose |
|----------|-------|---------|
| Focus outline | `2px solid #183754` | Keyboard navigation visibility |
| Focus offset | `4px` | Spacing around focus ring |
| Min touch target | `44px` | Mobile accessibility (if interactive elements added) |
| Reduced motion | `prefers-reduced-motion: reduce` | Disable animations for users who prefer it |

**Reduced Motion CSS:**
```css
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

---

## Performance Tokens

| Optimization | Implementation |
|--------------|----------------|
| Font loading | `font-display: swap` |
| Image loading | `loading="lazy"` on img tag |
| Animation trigger | Intersection Observer (not scroll listener) |
| GPU acceleration | `will-change: transform, opacity` (on animated elements) |

---

## Summary of Token Usage

1. **Colors:** All hardcoded (not editable via settings)
2. **Typography:** Neue Haas Display (Light for heading, Roman for body)
3. **Spacing:** Responsive scaling from desktop to mobile
4. **Heights:** 800px fixed (desktop/tablet), 75vh (mobile)
5. **Animations:** Desktop only, scroll-triggered, sequential delays
6. **Breakpoints:** 1441px, 1024px, 767px, 375px

All tokens are implemented in `custom-section-brand-story-about-us.css`.
