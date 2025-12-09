# Featured Category Hover Slider - Implementation Guide

**Following Development Rules v3.0.0 - Direct Liquid Development**

---

## 1. FILE STRUCTURE & NAMING CONVENTIONS

### Files to Create

```
sections/
  └── custom-section-featured-category-slider.liquid

assets/
  ├── section-featured-category-slider.css
  └── section-featured-category-slider.js

tests/liquid/
  └── section-featured-category-slider/
      └── featured-category-slider.spec.js
```

### Naming Standards Applied
- **Section File**: `custom-section-featured-category-slider.liquid` (custom-section-[name])
- **CSS File**: `section-featured-category-slider.css` (section-[name])
- **JS File**: `section-featured-category-slider.js` (section-[name])
- **Test File**: `featured-category-slider.spec.js` ([name].spec.js)
- **BEM Classes**: `.custom-section-featured-category-slider` (custom-[type]-[name])

---

## 2. LIQUID SECTION FILE

**File**: `sections/custom-section-featured-category-slider.liquid`

### Structure Overview
1. CSS link (top)
2. HTML markup with BEM classes
3. JavaScript link (defer)
4. Schema with settings and blocks
5. No inline styles (all in CSS file)

### Key Features
- **Schema Settings**: For merchant configuration
- **Blocks**: For adding categories dynamically
- **Asset Handling**: Uses section settings (image_picker, video_url)
- **Responsive**: Desktop and mobile layouts
- **Accessibility**: ARIA labels, semantic HTML

### Schema Configuration
```json
{
  "name": "Category Hover Slider",
  "settings": [
    {
      "type": "range",
      "id": "section_height",
      "label": "Section Height (vh)",
      "min": 50,
      "max": 100,
      "step": 10,
      "default": 100,
      "unit": "vh"
    },
    {
      "type": "checkbox",
      "id": "enable_animations",
      "label": "Enable Animations",
      "default": true
    }
  ],
  "blocks": [
    {
      "type": "category",
      "name": "Category",
      "settings": [
        {
          "type": "text",
          "id": "category_name",
          "label": "Category Name",
          "placeholder": "e.g., Earrings"
        },
        {
          "type": "collection",
          "id": "collection",
          "label": "Collection"
        },
        {
          "type": "video_url",
          "id": "video_url",
          "label": "Background Video URL",
          "accept": ["mp4", "webm"]
        },
        {
          "type": "textarea",
          "id": "description",
          "label": "Category Description (Mobile)"
        },
        {
          "type": "image_picker",
          "id": "fallback_image",
          "label": "Fallback Image (if video fails)"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Featured Category Hover Slider"
    }
  ]
}
```

### Liquid Logic
- **Desktop**: Show category names, hide mobile controls
- **Mobile**: Show mobile controls (counter, progress bar, NEXT button), hide category names
- **Dynamic Content**: Loop through blocks to render categories
- **Conditional Rendering**: Show/hide based on viewport

---

## 3. CSS FILE

**File**: `assets/section-featured-category-slider.css`

### BEM Methodology Applied
```css
/* Block */
.custom-section-featured-category-slider { }

/* Elements */
.custom-section-featured-category-slider__video-container { }
.custom-section-featured-category-slider__category-names { }
.custom-section-featured-category-slider__category-name { }
.custom-section-featured-category-slider__shop-now-btn { }
.custom-section-featured-category-slider__mobile-controls { }
.custom-section-featured-category-slider__progress-bar { }

/* Modifiers */
.custom-section-featured-category-slider__category-name--active { }
.custom-section-featured-category-slider__shop-now-btn--left { }
.custom-section-featured-category-slider__shop-now-btn--right { }
```

### Responsive Breakpoints
- **Base (1440px Desktop)**: Full desktop layout
- **Large Desktop (1441px+)**: Center content, max-width 1440px #[comment]: here the container and video will take full-width while the context having max-width container
- **Tablet (1024px)**: Adjust spacing and sizing
- **Mobile (767px)**: Full mobile layout with bottom controls
- **Small Mobile (375px)**: Fine-tune for small screens

### Key CSS Features
- **No !important** (unless absolutely necessary)
- **Low specificity**: Use BEM to avoid conflicts
- **Transitions**: Smooth animations (0.3s-0.6s)
- **Flexbox/Grid**: Modern layout techniques
- **Custom Properties**: CSS variables for colors/spacing (optional)

### Design Tokens Applied
```css
:root {
  /* Colors */
  --color-text-active: #e7e6d4;
  --color-text-inactive: rgba(231, 230, 212, 0.32);
  --color-button-text: #fffaf5;
  --color-progress-bar: #fffaf5;
  
  /* Spacing */
  --spacing-category-gap: 63px;
  --spacing-section-padding-desktop: 80px 40px;
  --spacing-section-padding-tablet: 60px 30px;
  --spacing-section-padding-mobile: 40px 20px;
  
  /* Typography */
  --font-display: 'Neue Haas Grotesk Display Pro', sans-serif;
  --font-body: 'Neue Montreal', sans-serif;
  --font-size-display: 60px;
  --font-size-button: 20px;
  
  /* Animations */
  --transition-video: 0.6s ease-in-out;
  --transition-text: 0.4s ease-in-out;
  --transition-button: 0.5s ease-in-out;
}
```

---

## 4. JAVASCRIPT FILE

**File**: `assets/section-featured-category-slider.js`

### Code Quality Standards Applied
- **ES6+ Syntax**: Arrow functions, const/let, async/await
- **Error Handling**: Try-catch blocks, graceful fallbacks
- **Small Functions**: Single responsibility principle
- **No Global Scope Pollution**: IIFE or module pattern
- **Comments**: For complex logic only
- **TODO Comments**: For any console.log statements

### Class-Based Architecture
```javascript
class FeaturedCategorySlider {
  constructor(sectionId) {
    this.section = document.querySelector(`[data-section-id="${sectionId}"]`);
    this.currentCategoryId = 1;
    this.isAnimating = false;
    this.init();
  }

  init() {
    // Initialize desktop and mobile functionality
  }

  // Desktop methods
  setupDesktopHover() { }
  setActiveCategory(categoryId) { }
  updateButtonPositions(categoryId) { }
  fadeOutVideo(callback) { }
  fadeInVideo() { }

  // Mobile methods
  setupMobileNavigation() { }
  goToNextSlide() { }
  updateProgressBar(currentSlide, totalSlides) { }
  updateCounter(currentSlide, totalSlides) { }

  // Utility methods
  getCategory(categoryId) { }
  updateVideoSource(videoUrl) { }
  updateMobileContent(category) { }
}
```

### GSAP Integration
- **Library**: GSAP 3.12+ for smooth animations
- **Animations**:
  - Video fade: 0.6s ease-in-out
  - Text fade: 0.4s ease-in-out
  - Button position: 0.5s ease-in-out
  - Progress bar: 0.6s ease-in-out

### Event Handling
- **Desktop**: `mouseenter` on category names
- **Mobile**: `click` on NEXT button
- **Responsive**: Detect viewport and apply appropriate handlers

### Data Management
```javascript
// Categories data passed from Liquid
window.categoriesData = [
  {
    id: 1,
    name: "Earrings",
    videoUrl: "/videos/earrings.mp4",
    collectionUrl: "/collections/earrings",
    description: "Category description",
    fallbackImage: "/images/earrings.jpg"
  },
  // ... more categories
];
```

---

## 5. TESTING WITH PLAYWRIGHT [comment]: WRITE AFTER MANUAL TESTING AND ONLY IF TOLD

**File**: `tests/liquid/section-featured-category-slider/featured-category-slider.spec.js`

### Test Coverage
1. **Visual Regression Tests**
   - Desktop layout (1440px)
   - Tablet layout (1024px)
   - Mobile layout (375px)
   - Compare with Figma screenshots

2. **Functional Tests**
   - Category hover (desktop)
   - NEXT button click (mobile)
   - Video switching
   - Progress bar updates
   - Counter updates

3. **Responsive Tests**
   - Layout changes at breakpoints
   - Elements show/hide correctly
   - Spacing adjusts properly

4. **Interaction Tests**
   - Hover effects work
   - Click handlers fire
   - Animations complete
   - No console errors

### Test Structure
```javascript
test.describe('Featured Category Hover Slider', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to page with section
  });

  test.describe('Desktop', () => {
    // Desktop-specific tests
  });

  test.describe('Mobile', () => {
    // Mobile-specific tests
  });

  test.describe('Responsive', () => {
    // Breakpoint tests
  });
});
```

### Screenshot Baselines
Store Figma screenshots in: `tests/screenshots/figma/`
- `featured-category-slider-desktop.png`
- `featured-category-slider-tablet.png`
- `featured-category-slider-mobile.png`

---

## 6. DEVELOPMENT WORKFLOW

### Phase 1: Setup
1. Create file structure
2. Create Liquid section with schema
3. Create CSS file with base styles
4. Create JS file with class structure
5. Link CSS and JS in Liquid

### Phase 2: Desktop Development
1. Build category names markup
2. Build SHOP NOW buttons
3. Implement hover event listeners
4. Add video switching logic
5. Add button position animation
6. Test locally with `shopify theme dev`

### Phase 3: Mobile Development
1. Build mobile controls markup
2. Build category content section
3. Implement NEXT button logic
4. Add progress bar calculation
5. Add counter updates
6. Test responsive behavior

### Phase 4: Animations
1. Import GSAP library
2. Add video fade animations
3. Add text fade animations
4. Add button position animations
5. Add progress bar animations
6. Test animation smoothness

### Phase 5: Testing
1. Write Playwright tests
2. Run visual regression tests
3. Run functional tests
4. Run responsive tests
5. Fix any failures
6. Update screenshots if needed

### Phase 6: Quality Check
1. Verify BEM methodology
2. Check file naming conventions
3. Verify no core theme files modified
4. Check for console.log statements
5. Verify code is DRY
6. Check performance

### Phase 7: Deployment
1. Run all tests: `npm test`
2. Commit with clear message: `[Feature] Add featured category hover slider`
3. Push to unpublished theme: `shopify theme push --unpublished`
4. Manual testing on unpublished
5. Get approval
6. Push to live: `shopify theme push --theme [live-theme-id]`

---

## 7. LOCAL TESTING

### Start Development Server
```bash
shopify theme dev
```

Opens at: `http://localhost:9292`

### Test Checklist
- [ ] Desktop (1440px): Hover over categories, videos switch, buttons move
- [ ] Tablet (1024px): Layout adjusts, spacing changes
- [ ] Mobile (375px): NEXT button works, progress bar updates, counter increments
- [ ] All interactions smooth (no jank)
- [ ] No console errors
- [ ] Section settings work in theme editor
- [ ] Videos play and loop
- [ ] Buttons link to correct collections

### Theme Editor Testing
1. Open: `http://localhost:9292/admin/themes/current/editor`
2. Add custom section
3. Configure settings:
   - Upload videos
   - Select collections
   - Add category descriptions
   - Toggle animations
4. Test all settings
5. Verify changes reflect immediately

---

## 8. ASSET REQUIREMENTS [comment]: ALL SECTIONS MADE HERE ARE MERCHANT UPLOAD BASED ONLY FONTS ARE APLOADED IN `./assets/fonts/` FOLDER

### Videos Required
| Asset | Location | Format | Size | Notes |
|-------|----------|--------|------|-------|
| earrings.mp4 | `/videos/` | MP4 | <5MB | Optimized for web |
| necklace.mp4 | `/videos/` | MP4 | <5MB | Optimized for web |
| rings.mp4 | `/videos/` | MP4 | <5MB | Optimized for web |
| pendents.mp4 | `/videos/` | MP4 | <5MB | Optimized for web |
| bracelets.mp4 | `/videos/` | MP4 | <5MB | Optimized for web |

### Fonts Required
| Font | Format | Location | Notes |
|------|--------|----------|-------|
| Neue Haas Grotesk Display Pro | WOFF2 | `/fonts/` | Light weight (300) |
| Neue Montreal | WOFF2 | `/fonts/` | Regular weight (400) |

### Fallback Images (Optional)
| Asset | Location | Format | Notes |
|-------|----------|--------|-------|
| earrings.jpg | `/images/` | JPEG | If video fails |
| necklace.jpg | `/images/` | JPEG | If video fails |
| rings.jpg | `/images/` | JPEG | If video fails |
| pendents.jpg | `/images/` | JPEG | If video fails |
| bracelets.jpg | `/images/` | JPEG | If video fails |

---

## 9. PERFORMANCE CONSIDERATIONS

### Video Optimization
- Use MP4 format (H.264 codec)
- Compress to <5MB per video
- Use appropriate resolution (1920x1080 or lower)
- Enable autoplay with muted attribute
- Add loop attribute for continuous playback
- Add CDN input as fallback 

### JavaScript Performance
- Use `defer` attribute on script tag
- Minimize DOM queries (cache selectors)
- Use event delegation where possible
- Debounce/throttle resize events
- Remove console.log before production

### CSS Performance
- Avoid deep nesting
- Use transform instead of top/left for animations
- Minimize repaints/reflows
- Use will-change sparingly
- Keep specificity low

### Lazy Loading
- Load videos only when section is visible
- Use Intersection Observer for lazy loading
- Defer non-critical JavaScript

---

## 10. ACCESSIBILITY

### ARIA Labels
```html
<button aria-label="Next category" class="next-btn">NEXT</button>
<div role="region" aria-live="polite" aria-label="Category slider">
  <!-- Content -->
</div>
```

### Semantic HTML
- Use `<button>` for interactive elements
- Use `<video>` tag with proper attributes
- Use `<section>` for main container
- Use `<h2>` for category titles

### Keyboard Navigation
- All buttons accessible via Tab key
- Enter/Space to activate buttons
- Escape to close menus (if applicable)

### Color Contrast
- Ensure text meets WCAG AA standards
- Test with accessibility tools
- Provide fallback for color-only information

---

## 11. BROWSER COMPATIBILITY

### Tested Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fallbacks
- Video fallback to image
- CSS Grid fallback to Flexbox
- ES6 transpilation (if needed)

---

## 12. COMMON ISSUES & SOLUTIONS

### Issue: Videos not playing on mobile
**Solution**: Add `playsinline` attribute to video tag

### Issue: Progress bar not updating
**Solution**: Ensure progress bar width is calculated correctly: `(currentSlide / totalSlides) * 100`

### Issue: Animations stuttering
**Solution**: Use `transform` instead of `top/left`, enable GPU acceleration with `will-change`

### Issue: GSAP not loading
**Solution**: Ensure GSAP is loaded before section JS, add to theme.liquid if needed [comment]: ALREADY ADDED!!!

### Issue: Section settings not showing in editor
**Solution**: Verify schema JSON is valid, check for syntax errors

---

## 13. GIT WORKFLOW

### Commit Message
```
[Feature] Add featured category hover slider with desktop hover and mobile navigation
```

### Files to Commit [comment]: ONLY DO WHEN IT IS ASKED
```bash
git add sections/custom-section-featured-category-slider.liquid
git add assets/section-featured-category-slider.css
git add assets/section-featured-category-slider.js
git add tests/liquid/section-featured-category-slider/
git commit -m "[Feature] Add featured category hover slider with tests"
git push origin main
```

### Before Committing
- [ ] All tests pass: `npm test`
- [ ] No console errors
- [ ] BEM methodology used
- [ ] File naming correct
- [ ] No core files modified
- [ ] Responsive on all breakpoints
- [ ] Works in theme editor

---

## 14. DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] All Playwright tests pass
- [ ] Manual testing complete (all breakpoints)
- [ ] No console errors
- [ ] Section works in theme editor
- [ ] Videos play correctly
- [ ] Buttons link to correct collections
- [ ] Animations smooth
- [ ] Code reviewed
- [ ] Git commit created

### Push to Unpublished
```bash
shopify theme push --unpublished [theme-]id
```
- [ ] Test on unpublished theme
- [ ] Verify all functionality
- [ ] Get client approval

### Push to Live [comment]: ONLY DO IF IT IS ASKED
```bash
shopify theme push --theme [live-theme-id]
```
- [ ] Final manual testing
- [ ] Backup current live theme
- [ ] Monitor for errors

---

## 15. DOCUMENTATION REFERENCES

### Design Specifications
- **Technical Spec**: `TECHNICAL-SPECIFICATION.md`
- **Figma File**: https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12:4707&m=dev
- **Responsive Samples**: `prototype/section-featured-category-hover-slider/responsive-samples/`

### Development Rules
- **Liquid Standards**: `docs/rules/04-LIQUID-DEVELOPMENT.md`
- **CSS Standards**: `docs/rules/05-CSS-STANDARDS.md`
- **JavaScript Standards**: `docs/rules/06-JAVASCRIPT-STANDARDS.md`
- **Testing Guide**: `docs/rules/07-TESTING.md`
- **Naming Conventions**: `docs/rules/08-NAMING-CONVENTIONS.md`
- **Git Workflow**: `docs/rules/09-GIT-WORKFLOW.md`

---

## 16. QUICK REFERENCE

### File Locations
```
sections/custom-section-featured-category-slider.liquid
assets/section-featured-category-slider.css
assets/section-featured-category-slider.js
tests/liquid/section-featured-category-slider/featured-category-slider.spec.js
```

### BEM Classes
```
.custom-section-featured-category-slider
.custom-section-featured-category-slider__video-container
.custom-section-featured-category-slider__category-names
.custom-section-featured-category-slider__category-name
.custom-section-featured-category-slider__category-name--active
.custom-section-featured-category-slider__shop-now-btn
.custom-section-featured-category-slider__shop-now-btn--left
.custom-section-featured-category-slider__shop-now-btn--right
.custom-section-featured-category-slider__mobile-controls
.custom-section-featured-category-slider__progress-bar
```

### Key Commands
```bash
# Start dev server
shopify theme dev

# Run tests
npm test

# Update screenshots
npx playwright test --update-snapshots

# Push to unpublished
shopify theme push --unpublished [theme-id] [comment]: PLEASE ASK IF NOT PROVIDED

# Push to live
shopify theme push --theme [theme-id]
```

### Design Tokens
- **Active Text**: #e7e6d4
- **Inactive Text**: rgba(231, 230, 212, 0.32)
- **Button Text**: #fffaf5
- **Progress Bar**: #fffaf5
- **Category Gap**: 63px
- **Video Fade**: 0.6s ease-in-out
- **Text Fade**: 0.4s ease-in-out
- **Button Animation**: 0.5s ease-in-out

---

## 17. NEXT STEPS

1. **Create Liquid Section** - Build markup with schema
2. **Create CSS File** - Add responsive styles with BEM
3. **Create JavaScript File** - Implement desktop and mobile logic
4. **Test Locally** - Run `shopify theme dev` and verify
5. **Write Tests** - Create Playwright test suite
6. **Run Tests** - Execute `npm test` and fix failures
7. **Code Review** - Verify all standards followed
8. **Git Commit** - Commit with clear message
9. **Deploy** - Push to unpublished, then live

---

**Status**: Ready for implementation ✅

All standards from `docs/rules/` have been applied. Follow this guide step-by-step for successful development.

