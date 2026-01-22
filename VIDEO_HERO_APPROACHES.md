# Video Hero Animation - Two Approaches

## Overview
You now have **two different video hero animation approaches** ready to use:

1. **150vh Scrub Animation** (Current) - Less aggressive than old 500vh version
2. **Automated Timeline Animation** (Backup) - No scroll required, runs once

---

## Approach 1: 150vh Scrub Animation (CURRENT)

### Files
- `sections/custom-video-logo-animation-hero.liquid`
- `assets/section-video-logo-animation.js`
- `assets/homepage-header-animation.js`

### How It Works
- **Section height:** 150vh (was 500vh)
- **Animation completes:** At 50vh scroll (much less aggressive!)
- **Logo fade:** 50vh-51vh
- **User scrolls:** ~400px to complete animation (vs 3350px before)

### Animation Endpoints
```javascript
// Phase 1: Logo scales down
start: 'top top'
end: '50vh top'

// Phase 2 & 3: Fade transition
start: '50vh top'
end: '51vh top'
```

### Pros
✅ Scroll-based interaction (user controls pace)
✅ Much less aggressive than 500vh version
✅ Smooth scrub animation
✅ Works with existing header system

### Cons
⚠️ Still requires scrolling for animation
⚠️ User might scroll too fast and miss it

---

## Approach 2: Automated Timeline Animation (BACKUP)

### Files (Backed up in `backups/automated-animation-backup-20260122/`)
- `video-hero-automated-animation.liquid.backup`
- `section-video-hero-automated-animation.js.backup`

### How It Works
- **Section height:** 100vh (standard)
- **Animation:** Runs automatically on page load
- **Duration:** 3.5 seconds total (1s delay + 2.5s animation)
- **Scroll:** Locked during animation, unlocked after

### Animation Timeline
```
0s - 1s: Wait (logo visible)
1s - 1.8s: Header fades in (without logo)
1s - 3.5s: Logo scales down, moves to 100px, fades out
2.8s - 3.5s: Header logo appears
3.5s: Scroll unlocked
```

### Pros
✅ No scrolling required
✅ One-time intro animation
✅ Runs on every refresh
✅ Better for mobile users

### Cons
⚠️ User must wait for animation
⚠️ No interaction control

---

## Comparison Table

| Feature | 150vh Scrub | Automated Timeline |
|---------|-------------|-------------------|
| Section Height | 150vh | 100vh |
| Scroll Required | Yes (~400px) | No |
| User Control | Full control | Must wait |
| Animation Type | Scrub (scroll-linked) | Timeline (time-based) |
| Duration | User dependent | Fixed 3.5s |
| Playback | Every scroll | Every refresh |
| Mobile Experience | Scroll might be awkward | Smooth, no scroll |

---

## How to Switch Between Approaches

### Currently Active: 150vh Scrub Animation
Already configured and ready to use!

### To Switch to Automated Animation:

1. **Restore files:**
   ```bash
   cd backups/automated-animation-backup-20260122
   cp video-hero-automated-animation.liquid.backup ../../sections/video-hero-automated-animation.liquid
   cp section-video-hero-automated-animation.js.backup ../../assets/section-video-hero-automated-animation.js
   ```

2. **In Shopify Admin:**
   - Remove "Video Logo Animation Hero" section
   - Add "Video Automated Animation" section
   - Configure video URL and logo

### To Switch Back to 150vh Scrub:

Files are already active! Just:
1. Remove automated animation section (if added)
2. Add "Video Logo Animation Hero" section
3. Configure settings

---

## Backups

### Original 500vh Scrub Animation
**Location:** `backups/video-scrub-animation-backup-20260122/`
- All files have `.backup` suffix
- Full restoration instructions in README.md

### Automated Animation
**Location:** `backups/automated-animation-backup-20260122/`
- `video-hero-automated-animation.liquid.backup`
- `section-video-hero-automated-animation.js.backup`

---

## Recommendations

### Use **150vh Scrub** if:
- Client wants scroll interaction
- Users should control animation pace
- Prefer the scrub "feel"

### Use **Automated Timeline** if:
- Client dislikes ANY forced scrolling
- Want guaranteed animation playback
- Mobile experience is priority
- Prefer cinematic intro

---

## Testing Checklist

### 150vh Scrub Animation
- [ ] Animation completes within ~400px scroll
- [ ] Logo scales and moves smoothly
- [ ] Header appears without logo during scroll
- [ ] Header logo appears at end
- [ ] Sticky header works after animation
- [ ] Responsive on mobile/tablet

### Automated Timeline Animation
- [ ] 1 second delay before animation
- [ ] Logo scales and fades during animation
- [ ] Header appears without logo
- [ ] Header logo appears at end
- [ ] Scroll is locked during animation
- [ ] Scroll unlocks after animation
- [ ] Works on every refresh

---

**Updated:** January 22, 2026
**Current Approach:** 150vh Scrub Animation
