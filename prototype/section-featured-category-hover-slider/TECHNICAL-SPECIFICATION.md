# Featured Category Hover Slider - Technical Specification

## 1. DESIGN TOKENS

### Typography
- **Primary Display Font**: Neue Haas Grotesk Display Pro, 60px, Light (weight: 300)
  - Used for: Category names (desktop)
  - Line height: 50px
  - Letter spacing: Normal
  - Text transform: Uppercase

- **Secondary Font**: Neue Montreal, Regular (weight: 400)
  - Used for: "SHOP NOW" buttons, "NEXT" button, counter text
  - Font size: 20px
  - Line height: 40px
  - Text decoration: Underline (for buttons)

- **Mobile Category Title**: Neue Haas Grotesk Display Pro, Large size
  - Used for: Category names on mobile
  - Text transform: Uppercase

- **Mobile Description Text**: Neue Montreal, Regular
  - Used for: Category descriptions on mobile
  - Font size: Responsive (body text)

### Colors
- **Active Text**: #e7e6d4 (Cream/Off-white, full opacity)
  - Used for: Active category name (desktop hover state)
  - Used for: "SHOP NOW" buttons text
  - Used for: "VIEW COLLECTION" button text (mobile)

- **Inactive Text**: rgba(231, 230, 212, 0.32) (Cream/Off-white, 32% opacity)
  - Used for: Inactive category names (desktop)

- **Button Underline**: #fffaf5 (Warm white)
  - Used for: Text decoration on "SHOP NOW" buttons

- **Progress Bar**: #fffaf5 (Warm white)
  - Used for: Horizontal line indicator (mobile)

- **Background**: Dark/transparent (video background)
  - Used for: Section background (video fills entire area)

### Spacing
- **Desktop**:
  - Gap between category names: 63px
  - Category text stack width: 345px
  - Category text stack left offset: calc(50% - 172.5px) (centered)
  - "SHOP NOW" left button: calc(50% - 534.31px)
  - "SHOP NOW" right button: calc(50% + 363.33px)
  - Vertical position of buttons: calc(50% - 205.8px)

- **Mobile**:
  - Bottom controls height: ~80-100px
  - Counter left padding: 20-30px
  - NEXT button right padding: 20-30px
  - Progress bar height: 2-3px
  - Vertical spacing between elements: Adjust based on viewport

### Animations (GSAP)
- **Video Fade Transition**: 
  - Duration: 0.6s
  - Easing: ease-in-out
  - Effect: Fade out current video, fade in new video

- **Text Fade Transition**:
  - Duration: 0.4s
  - Easing: ease-in-out
  - Effect: Fade out old category text, fade in new category text

- **Button Position Animation** (Desktop):
  - Duration: 0.5s
  - Easing: ease-in-out
  - Effect: Smooth transition of "SHOP NOW" buttons to new vertical position

- **Progress Bar Animation** (Mobile):
  - Duration: 0.6s
  - Easing: ease-in-out
  - Effect: Smooth expansion/contraction of horizontal line

---

## 2. COMPONENT STRUCTURE

### Data Schema
```javascript
const categories = [
  {
    id: 1,
    name: "Earrings",
    videoUrl: "/videos/earrings.mp4",
    collectionUrl: "/collections/earrings",
    description: "Category description text",
    image: "/images/earrings.jpg"
  },
  {
    id: 2,
    name: "Necklace",
    videoUrl: "/videos/necklace.mp4",
    collectionUrl: "/collections/necklace",
    description: "Category description text",
    image: "/images/necklace.jpg"
  },
  {
    id: 3,
    name: "Rings",
    videoUrl: "/videos/rings.mp4",
    collectionUrl: "/collections/rings",
    description: "Category description text",
    image: "/images/rings.jpg"
  },
  {
    id: 4,
    name: "Pendents",
    videoUrl: "/videos/pendents.mp4",
    collectionUrl: "/collections/pendents",
    description: "Category description text",
    image: "/images/pendents.jpg"
  },
  {
    id: 5,
    name: "Bracelets",
    videoUrl: "/videos/bracelets.mp4",
    collectionUrl: "/collections/bracelets",
    description: "Category description text",
    image: "/images/bracelets.jpg"
  }
];
```

### HTML Structure (Liquid Template)

#### Desktop Layout
```html
<section class="featured-category-slider" data-section-id="{{ section.id }}">
  <!-- Video Background Container -->
  <div class="slider-video-container">
    <video 
      class="slider-video" 
      autoplay 
      muted 
      loop 
      playsinline
      data-video-url="">
    </video>
  </div>

  <!-- Category Names Stack (Desktop) -->
  <div class="category-names-desktop">
    {% for category in categories %}
      <p class="category-name" data-category-id="{{ category.id }}" data-collection-url="{{ category.collectionUrl }}">
        {{ category.name }}
      </p>
    {% endfor %}
  </div>

  <!-- Shop Now Buttons (Desktop) -->
  <a href="#" class="shop-now-btn shop-now-left" data-collection-url="">SHOP NOW</a>
  <a href="#" class="shop-now-btn shop-now-right" data-collection-url="">SHOP NOW</a>

  <!-- Mobile Controls -->
  <div class="mobile-controls">
    <div class="slider-counter">
      <span class="current-slide">01</span> / <span class="total-slides">05</span>
    </div>
    
    <div class="progress-bar-container">
      <div class="progress-bar-fill"></div>
    </div>
    
    <button class="next-btn">NEXT</button>
  </div>

  <!-- Mobile Category Content -->
  <div class="category-content-mobile">
    <h2 class="category-title-mobile">{{ activeCategory.name }}</h2>
    <p class="category-description-mobile">{{ activeCategory.description }}</p>
    <a href="{{ activeCategory.collectionUrl }}" class="view-collection-btn">VIEW COLLECTION</a>
  </div>
</section>
```

---

## 3. DESKTOP BEHAVIOR

### Hover Interaction
1. **User hovers over a category name**:
   - Category text becomes bright (#e7e6d4, full opacity)
   - All other categories remain faded (32% opacity)
   - Background video fades out and switches to the hovered category's video
   - New video fades in with GSAP animation (0.6s ease-in-out)

2. **"SHOP NOW" Button Positioning**:
   - Both left and right buttons move vertically to align with the active category
   - Movement is smooth (0.5s ease-in-out animation)
   - Both buttons link to the active category's collection page
   - Buttons remain underlined and in #fffaf5 color

3. **Initial State**:
   - First category (Earrings) is active by default
   - Video plays on loop automatically
   - Other categories show faded text

### CSS Classes (Desktop)
```css
.featured-category-slider {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.slider-video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.slider-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-names-desktop {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 63px;
  text-align: center;
}

.category-name {
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  font-size: 60px;
  font-weight: 300;
  line-height: 50px;
  text-transform: uppercase;
  color: rgba(231, 230, 212, 0.32);
  cursor: pointer;
  transition: color 0.4s ease-in-out;
}

.category-name.active {
  color: #e7e6d4;
}

.shop-now-btn {
  position: absolute;
  font-family: 'Neue Montreal', sans-serif;
  font-size: 20px;
  line-height: 40px;
  color: #fffaf5;
  text-decoration: underline;
  text-underline-offset: 25%;
  cursor: pointer;
  z-index: 10;
  transition: top 0.5s ease-in-out;
}

.shop-now-left {
  left: calc(50% - 534.31px);
}

.shop-now-right {
  right: calc(50% - 363.33px);
}
```

---

## 4. MOBILE BEHAVIOR

### NEXT Button Interaction
1. **User clicks "NEXT" button**:
   - Current category video fades out
   - Next category video fades in (0.6s ease-in-out)
   - Category title and description update
   - Counter increments (01 → 02 → 03, etc.)
   - Progress bar expands to next segment
   - When reaching the last slide, clicking NEXT loops back to first slide

2. **Progress Bar Calculation**:
   - Total slides: 5 (or dynamic based on categories count)
   - Each slide segment: 100% / total slides
   - **Slide 1**: Progress bar shows 0-20% width (for 5 slides)
   - **Slide 2**: Progress bar shows 20-40% width
   - **Slide 3**: Progress bar shows 40-60% width
   - **Slide 4**: Progress bar shows 60-80% width
   - **Slide 5**: Progress bar shows 80-100% width
   - Formula: `(currentSlide / totalSlides) * 100%`

3. **Counter Update**:
   - Displays current slide number and total slides
   - Format: "01 / 05", "02 / 05", etc.
   - Left-aligned in bottom controls

4. **"VIEW COLLECTION" Button**:
   - Centered CTA that links to active category's collection page
   - Positioned in the middle/lower portion of the screen
   - Same styling as desktop "SHOP NOW" buttons

### CSS Classes (Mobile)
```css
@media (max-width: 768px) {
  .featured-category-slider {
    height: 100vh;
  }

  .category-names-desktop {
    display: none;
  }

  .shop-now-btn {
    display: none;
  }

  .mobile-controls {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background: rgba(0, 0, 0, 0.3);
    z-index: 20;
  }

  .slider-counter {
    font-family: 'Neue Montreal', sans-serif;
    font-size: 16px;
    color: #fffaf5;
    white-space: nowrap;
  }

  .progress-bar-container {
    flex: 1;
    height: 2px;
    background: rgba(255, 250, 245, 0.2);
    margin: 0 20px;
    position: relative;
  }

  .progress-bar-fill {
    height: 100%;
    background: #fffaf5;
    width: 0%;
    transition: width 0.6s ease-in-out;
  }

  .next-btn {
    font-family: 'Neue Montreal', sans-serif;
    font-size: 16px;
    color: #fffaf5;
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: underline;
    white-space: nowrap;
  }

  .category-content-mobile {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 10;
    width: 90%;
  }

  .category-title-mobile {
    font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
    font-size: 48px;
    font-weight: 300;
    text-transform: uppercase;
    color: #e7e6d4;
    margin-bottom: 20px;
  }

  .category-description-mobile {
    font-family: 'Neue Montreal', sans-serif;
    font-size: 14px;
    color: #fffaf5;
    margin-bottom: 30px;
    line-height: 1.6;
  }

  .view-collection-btn {
    font-family: 'Neue Montreal', sans-serif;
    font-size: 14px;
    color: #fffaf5;
    text-decoration: underline;
    cursor: pointer;
    display: inline-block;
  }
}
```

---

## 5. IMPLEMENTATION DETAILS

### File Structure
```
sections/
  featured-category-hover-slider.liquid (Main section file)

assets/
  featured-category-hover-slider.js (JavaScript logic)
  featured-category-hover-slider.css (Styling)

prototype/
  section-featured-category-hover-slider/
    TECHNICAL-SPECIFICATION.md (This file)
    responsive-samples/
      01.png
      02.png
      03.png
      04.png
```

### JavaScript Logic (featured-category-hover-slider.js)

#### Desktop Functionality
```javascript
class FeaturedCategorySlider {
  constructor(sectionId) {
    this.section = document.querySelector(`[data-section-id="${sectionId}"]`);
    this.video = this.section.querySelector('.slider-video');
    this.categoryNames = this.section.querySelectorAll('.category-name');
    this.shopNowBtns = this.section.querySelectorAll('.shop-now-btn');
    this.currentCategoryId = 1;
    this.categories = window.categoriesData || [];
    
    this.init();
  }

  init() {
    this.setupDesktopHover();
    this.setupMobileNavigation();
    this.setActiveCategory(1);
  }

  setupDesktopHover() {
    this.categoryNames.forEach(name => {
      name.addEventListener('mouseenter', (e) => {
        const categoryId = parseInt(e.target.dataset.categoryId);
        this.setActiveCategory(categoryId);
      });
    });
  }

  setActiveCategory(categoryId) {
    this.currentCategoryId = categoryId;
    const category = this.categories.find(c => c.id === categoryId);
    
    if (!category) return;

    // Update active category styling
    this.categoryNames.forEach(name => {
      name.classList.remove('active');
      if (parseInt(name.dataset.categoryId) === categoryId) {
        name.classList.add('active');
      }
    });

    // Update video with fade animation
    this.fadeOutVideo(() => {
      this.video.src = category.videoUrl;
      this.video.play();
      this.fadeInVideo();
    });

    // Update SHOP NOW button links
    this.shopNowBtns.forEach(btn => {
      btn.href = category.collectionUrl;
    });

    // Update button positions (calculate based on active category index)
    this.updateButtonPositions(categoryId);
  }

  fadeOutVideo(callback) {
    gsap.to(this.video, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: callback
    });
  }

  fadeInVideo() {
    gsap.to(this.video, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.inOut'
    });
  }

  updateButtonPositions(categoryId) {
    const categoryIndex = this.categories.findIndex(c => c.id === categoryId);
    const categoryElement = this.section.querySelector(`[data-category-id="${categoryId}"]`);
    
    if (categoryElement) {
      const categoryTop = categoryElement.offsetTop;
      this.shopNowBtns.forEach(btn => {
        gsap.to(btn, {
          top: categoryTop,
          duration: 0.5,
          ease: 'power2.inOut'
        });
      });
    }
  }

  setupMobileNavigation() {
    const nextBtn = this.section.querySelector('.next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.goToNextSlide());
    }
  }

  goToNextSlide() {
    const nextId = this.currentCategoryId % this.categories.length + 1;
    this.setActiveCategoryMobile(nextId);
  }

  setActiveCategoryMobile(categoryId) {
    const category = this.categories.find(c => c.id === categoryId);
    if (!category) return;

    this.currentCategoryId = categoryId;

    // Update video
    this.fadeOutVideo(() => {
      this.video.src = category.videoUrl;
      this.video.play();
      this.fadeInVideo();
    });

    // Update mobile content
    this.section.querySelector('.category-title-mobile').textContent = category.name;
    this.section.querySelector('.category-description-mobile').textContent = category.description;
    this.section.querySelector('.view-collection-btn').href = category.collectionUrl;

    // Update counter
    const currentSlide = categoryId;
    const totalSlides = this.categories.length;
    this.section.querySelector('.current-slide').textContent = String(currentSlide).padStart(2, '0');

    // Update progress bar
    const progressPercentage = (currentSlide / totalSlides) * 100;
    gsap.to(this.section.querySelector('.progress-bar-fill'), {
      width: progressPercentage + '%',
      duration: 0.6,
      ease: 'power2.inOut'
    });
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('[data-section-id]');
  sliders.forEach(slider => {
    new FeaturedCategorySlider(slider.dataset.sectionId);
  });
});
```

### Liquid Section Configuration (featured-category-hover-slider.liquid)

```liquid
{% comment %} Featured Category Hover Slider Section {% endcomment %}

<section 
  class="featured-category-slider" 
  data-section-id="{{ section.id }}"
  data-categories="{{ categories | json | escape }}">
  
  <!-- Video Background -->
  <div class="slider-video-container">
    <video 
      class="slider-video" 
      autoplay 
      muted 
      loop 
      playsinline>
      <source src="{{ first_category_video }}" type="video/mp4">
    </video>
  </div>

  <!-- Desktop Category Names -->
  <div class="category-names-desktop">
    {% for category in section.settings.categories %}
      <p class="category-name" data-category-id="{{ forloop.index }}" data-collection-url="{{ category.collection.url }}">
        {{ category.name }}
      </p>
    {% endfor %}
  </div>

  <!-- Desktop Shop Now Buttons -->
  <a href="#" class="shop-now-btn shop-now-left">SHOP NOW</a>
  <a href="#" class="shop-now-btn shop-now-right">SHOP NOW</a>

  <!-- Mobile Controls -->
  <div class="mobile-controls">
    <div class="slider-counter">
      <span class="current-slide">01</span> / <span class="total-slides">{{ section.settings.categories | size }}</span>
    </div>
    
    <div class="progress-bar-container">
      <div class="progress-bar-fill"></div>
    </div>
    
    <button class="next-btn">NEXT</button>
  </div>

  <!-- Mobile Category Content -->
  <div class="category-content-mobile">
    <h2 class="category-title-mobile">{{ first_category_name }}</h2>
    <p class="category-description-mobile">{{ first_category_description }}</p>
    <a href="{{ first_category_url }}" class="view-collection-btn">VIEW COLLECTION</a>
  </div>
</section>

<script>
  window.categoriesData = {{ categories_json }};
</script>

{% stylesheet %}
  {% include 'featured-category-hover-slider.css' %}
{% endstylesheet %}

{% javascript %}
  {% include 'featured-category-hover-slider.js' %}
{% endjavascript %}

{% schema %}
{
  "name": "Featured Category Hover Slider",
  "settings": [
    {
      "type": "text",
      "id": "section_title",
      "label": "Section Title",
      "default": "Featured Categories"
    },
    {
      "type": "range",
      "id": "section_height",
      "label": "Section Height (vh)",
      "min": 50,
      "max": 100,
      "step": 10,
      "default": 100,
      "unit": "vh"
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
          "label": "Category Name"
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
          "id": "category_image",
          "label": "Category Image (Fallback)"
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
{% endschema %}
```

---

## 6. ASSETS REQUIRED

### Videos
| Asset | Type | Destination | Required | Notes |
|-------|------|-------------|----------|-------|
| earrings.mp4 | Video | `/videos/categories/` | Yes | Background video for Earrings category |
| necklace.mp4 | Video | `/videos/categories/` | Yes | Background video for Necklace category |
| rings.mp4 | Video | `/videos/categories/` | Yes | Background video for Rings category |
| pendents.mp4 | Video | `/videos/categories/` | Yes | Background video for Pendents category |
| bracelets.mp4 | Video | `/videos/categories/` | Yes | Background video for Bracelets category |

### Images (Fallback/Mobile)
| Asset | Type | Destination | Required | Notes |
|-------|------|-------------|----------|-------|
| earrings.jpg | Image | `/images/categories/` | Optional | Fallback image if video fails to load |
| necklace.jpg | Image | `/images/categories/` | Optional | Fallback image if video fails to load |
| rings.jpg | Image | `/images/categories/` | Optional | Fallback image if video fails to load |
| pendents.jpg | Image | `/images/categories/` | Optional | Fallback image if video fails to load |
| bracelets.jpg | Image | `/images/categories/` | Optional | Fallback image if video fails to load |

### Fonts
| Font | Type | Destination | Required | Notes |
|------|------|-------------|----------|-------|
| Neue Haas Grotesk Display Pro | TTF/WOFF2 | `/fonts/` | Yes | Primary display font (60px, Light weight) |
| Neue Montreal | TTF/WOFF2 | `/fonts/` | Yes | Secondary font (20px, Regular weight) |

### External Libraries
| Library | Version | Purpose | CDN/Local |
|---------|---------|---------|-----------|
| GSAP | 3.12+ | Animation library for smooth transitions | CDN or local |

---

## 7. FIGMA & SAMPLE REFERENCES

### Figma Design File
- **URL**: https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12:4707&m=dev
- **Node ID**: 12:4707
- **Component Name**: "Component 5"

### Figma Element Node IDs
| Element | Node ID | Description |
|---------|---------|-------------|
| Video Background Container | I12:4707;2033:79 | Full-width video background |
| Category Text Stack | I12:4707;2033:89 | Container for all category names |
| Earrings (Active) | I12:4707;2033:84 | First category, bright text |
| Necklace | I12:4707;2033:85 | Second category, faded text |
| Rings | I12:4707;2033:86 | Third category, faded text |
| Pendents | I12:4707;2033:87 | Fourth category, faded text |
| Bracelets | I12:4707;2033:88 | Fifth category, faded text |
| Left "SHOP NOW" Button | I12:4707;2033:106 | Left-side CTA button |
| Right "SHOP NOW" Button | I12:4707;2033:104 | Right-side CTA button |

### Responsive Design Samples
- **Location**: `/prototype/section-featured-category-hover-slider/responsive-samples/`
- **Sample 01** (01.png): Slide 1 - "Essential" (01/05) - Progress bar 0-20%
- **Sample 02** (02.png): Slide 2 - "Clear" (02/05) - Progress bar 20-40%
- **Sample 03** (03.png): Slide 3 - "Pro Age" (03/05) - Progress bar 40-60%
- **Sample 04** (04.png): Slide 4 - "Sensitive" (04/05) - Progress bar 60-80%

### Design Specifications from Samples
- **Mobile Layout**: Full-width, full-height video background
- **Content Position**: Centered title, description, and "VIEW COLLECTION" button
- **Bottom Controls**: Fixed position with counter (left), progress bar (center), NEXT button (right)
- **Progress Bar Behavior**: Expands from 0-100% based on slide position
- **Typography**: Same fonts as Figma design (Neue Haas Grotesk Display Pro, Neue Montreal)
- **Animations**: Subtle fade in/out on slide transitions

---

## 8. INTERACTION FLOW SUMMARY

### Desktop Flow
1. Page loads → First category (Earrings) is active
2. User hovers over category name → Category becomes active (bright text)
3. Background video fades out → New video fades in
4. "SHOP NOW" buttons move to align with active category
5. User clicks "SHOP NOW" → Navigates to category collection page

### Mobile Flow
1. Page loads → First category (Earrings) is active
2. Video plays in full-width/full-height container
3. Category title, description, and "VIEW COLLECTION" button displayed
4. Progress bar shows 0-20% (slide 1 of 5)
5. User clicks "NEXT" button → Video fades out
6. Next category video fades in
7. Title, description, and counter update
8. Progress bar expands to next segment (20-40%)
9. Repeat until last slide, then loop back to first

---

## 9. NOTES & CONSIDERATIONS

- **Video Optimization**: Ensure videos are optimized for web (compressed, appropriate format)
- **Fallback Images**: Provide fallback images for browsers that don't support video
- **Accessibility**: Add ARIA labels and keyboard navigation support
- **Performance**: Use lazy loading for videos on mobile
- **Browser Support**: Test on Chrome, Firefox, Safari, Edge
- **Mobile Responsiveness**: Test on various screen sizes (320px - 1440px+)
- **GSAP Library**: Ensure GSAP is loaded before the slider script
- **Collection URLs**: Verify all collection URLs are correct and accessible
- **Video Loop**: Ensure videos loop seamlessly without visible gaps

