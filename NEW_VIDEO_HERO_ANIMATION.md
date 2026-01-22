# New Video Hero Automated Animation

## Overview
This is a **one-time intro animation** that provides a better UX compared to the aggressive scrub-based animation.

### Key Improvements
✅ **No aggressive scrolling** - Animation runs once automatically
✅ **100vh section** - Not 500vh like the old scrub version
✅ **Scroll prevention** - Users can't scroll during animation
✅ **One-time playback** - Uses sessionStorage to play only once per session
✅ **Clean & simple** - No complex scroll triggers

---

## Files Created

### 1. Section File
**Location:** `sections/video-hero-automated-animation.liquid`

**Schema Settings:**
- `video_url` - Direct MP4 video URL
- `video_poster` - Poster image (shown while video loads)
- `logo` - Logo image (starts at 40vw, animates to header size)

### 2. JavaScript Animation
**Location:** `assets/section-video-hero-automated-animation.js`

**Animation Flow:**
1. **Start (0s):**
   - Logo at 40vw, centered on screen
   - Header hidden
   - Scroll locked

2. **Animation (0.5s - 3s):**
   - Logo scales down to header logo size
   - Logo moves up to header position
   - Header fades in (without logo)
   - Duration: 2.5 seconds

3. **Complete (3s+):**
   - Header logo appears
   - Animated logo fades out
   - Scroll unlocked
   - User can browse

---

## How to Use

### Step 1: Add Section to Homepage
1. Go to Shopify Admin → Themes → Customize
2. Click "Add section" at the top of the homepage
3. Select **"Video Hero Automated Animation"**
4. Position it as the first section

### Step 2: Configure Settings
- **Video URL:** `https://cdn.shopify.com/videos/c/o/v/ac50b32abc5e4c97815b8a3791bddcfb.mp4`
- **Poster Image:** Upload a fallback image
- **Logo:** Upload your white logo (same as current)

### Step 3: Remove Old Section
- Remove the old "Video Logo Animation Hero" section
- The old scrub-based animation will no longer run

---

## Technical Details

### Animation Timeline (GSAP)
```javascript
timeline
  .to({}, { duration: 0.5 })                    // Initial delay
  .to(header, { opacity: 1, duration: 0.8 })    // Fade in header
  .to(logoWrapper, {                            // Animate logo
    width: targetWidth,
    y: targetY,
    duration: 2.5,
    ease: 'power3.inOut'
  })
```

### Scroll Prevention
```javascript
// During animation
document.body.style.overflow = 'hidden';

// After animation
document.body.style.overflow = '';
```

### Session-based Playback
```javascript
// Check if already animated this session
const hasAnimated = sessionStorage.getItem('video-hero-animation-completed');

// Only run once per session
if (!hasAnimated) {
  runAnimation();
  sessionStorage.setItem('video-hero-animation-completed', 'true');
}
```

---

## Comparison: Old vs New

| Feature | Old (Scrub-based) | New (Automated) |
|---------|-------------------|-----------------|
| Section Height | 500vh | 100vh |
| Animation Type | Scroll-triggered scrub | One-time timeline |
| Scroll Required | Yes (3350px) | No |
| Scroll Prevention | No | Yes |
| User Experience | Aggressive scrolling | Smooth intro |
| Playback | On every scroll | Once per session |

---

## Testing Checklist

- [ ] Logo starts at 40vw and scales to header size
- [ ] Logo moves to header position smoothly
- [ ] Header fades in without logo during animation
- [ ] Header logo appears after animation completes
- [ ] Scroll is locked during animation
- [ ] Scroll unlocks after animation
- [ ] Animation runs only once per session
- [ ] Video autoplays and loops
- [ ] Responsive on mobile/tablet

---

## Troubleshooting

### Animation doesn't run
- Check browser console for GSAP errors
- Ensure GSAP library is loaded
- Verify section is on homepage only

### Animation runs every time
- Clear sessionStorage: `sessionStorage.removeItem('video-hero-animation-completed')`
- This is expected behavior - clears on browser close

### Logo doesn't align with header
- Check if `.diamension-header__logo` exists
- Verify header structure hasn't changed

---

## Restore Old Animation

If client wants the old scrub-based animation back:

1. Go to backup directory:
   ```bash
   cd backups/video-scrub-animation-backup-20260122
   ```

2. Restore files:
   ```bash
   cp custom-video-logo-animation-hero.liquid.backup ../../../sections/custom-video-logo-animation-hero.liquid
   cp section-video-logo-animation.js.backup ../../../assets/section-video-logo-animation.js
   cp homepage-header-animation.js.backup ../../../assets/homepage-header-animation.js
   ```

3. Add section back in Shopify admin

---

## Dependencies

- GSAP library (already loaded in theme)
- Shopify theme structure
- Header with `.diamension-header__logo` class

---

**Created:** January 22, 2026
**Version:** 1.0
**Status:** Ready for testing
