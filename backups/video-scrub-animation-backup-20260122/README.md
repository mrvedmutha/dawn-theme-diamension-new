# Video Scrub Animation - Original Implementation Backup
**Backup Date:** January 22, 2026

## Overview
This backup contains the original scrub-based video hero animation implementation for the homepage.

## System Architecture

### 1. Preloader System
- **File:** `preloader.liquid`
- **CSS:** `section-preloader.css`
- **Purpose:** Shows loading progress (0-100%) and slides up when complete
- **Trigger:** Only on homepage when `settings.preloader_enabled` is true

### 2. Video Logo Animation Hero
- **Section:** `custom-video-logo-animation-hero.liquid`
- **Script:** `section-video-logo-animation.js`
- **Behavior:**
  - Creates a 500vh tall section with sticky positioning
  - Logo starts at 40vw width
  - Three-phase GSAP ScrollTrigger animation with `scrub: 1`:
    - **Phase 1** (0-3350px): Logo scales down to header logo size
    - **Phase 2** (3350-3360px): Video logo fades out
    - **Phase 3** (3350-3360px): Header logo fades in

### 3. Header Animation Controller
- **Script:** `homepage-header-animation.js`
- **Purpose:** Controls header visibility during video animation
- **Logic:**
  - 0-25vh: Header hidden
  - 25vh-3360px: Transparent header visible, logo hidden
  - 3360px+: Header logo becomes visible
  - After video section: Releases control to default sticky header

## Key Configuration

### Video Settings (index.json)
```json
"custom_video_logo_animation_hero_iGRzPa": {
  "type": "custom-video-logo-animation-hero",
  "settings": {
    "video_url": "https://cdn.shopify.com/videos/c/o/v/ac50b32abc5e4c97815b8a3791bddcfb.mp4",
    "logo": "shopify://shop_images/diamesnion-new-logo-white.svg"
  }
}
```

### Preloader Settings (settings_data.json)
```json
{
  "preloader_logo": "shopify://shop_images/diamesnion-new-logo-dark.svg",
  "preloader_image": "shopify://shop_images/ring-image.png"
}
```

## Files Included
1. `preloader.liquid.backup` - Preloader snippet
2. `section-preloader.css.backup` - Preloader styles
3. `custom-video-logo-animation-hero.liquid.backup` - Video hero section
4. `section-video-logo-animation.js.backup` - GSAP scrub animations
5. `homepage-header-animation.js.backup` - Header visibility controller
6. `index.json.backup` - Homepage template configuration
7. `settings_data.json.backup` - Theme settings

## To Restore Original Implementation

1. Copy all files back to their original locations (removing .backup suffix):
   ```bash
   cp preloader.liquid.backup ../../../snippets/preloader.liquid
   cp section-preloader.css.backup ../../../assets/section-preloader.css
   cp custom-video-logo-animation-hero.liquid.backup ../../../sections/custom-video-logo-animation-hero.liquid
   cp section-video-logo-animation.js.backup ../../../assets/section-video-logo-animation.js
   cp homepage-header-animation.js.backup ../../../assets/homepage-header-animation.js
   cp index.json.backup ../../../templates/index.json
   cp settings_data.json.backup ../../../config/settings_data.json
   ```

2. Ensure the section is added to homepage:
   - Go to Shopify Admin > Themes > Customize
   - Add "Video Logo Animation Hero" section at the top
   - Configure video URL and logo

3. Enable preloader in theme settings (if needed):
   - Theme settings > Preloader settings
   - Enable preloader checkbox

## Dependencies
- GSAP library
- ScrollTrigger plugin
- Shopify theme structure

## Notes
- The scrub animation is tied to scroll position with `scrub: 1` parameter
- Section height is 500vh to provide enough scroll distance
- Animation endpoints: 3350px (scale complete), 3360px (fade transition)
- Header animation only runs when video logo section exists
