# Header State Configuration - Testing Guide

## Quick Test Steps

### 1. Access Theme Editor
1. Go to Shopify Admin → Online Store → Themes
2. Click "Customize" on your theme
3. Navigate to any page template

### 2. Locate Header Settings
1. Click on the header section
2. Scroll down to find "Header Behavior" section
3. You should see a dropdown with three options:
   - Auto (Transparent → Solid on Scroll)
   - Always Transparent
   - Always Solid

### 3. Test Each Mode

#### Test "Auto" Mode (Default)
**Expected Behavior:**
- [ ] Header starts transparent with light logos/icons
- [ ] Scroll down past 820px → header hides
- [ ] Scroll up → header shows and becomes solid with dark logos/icons
- [ ] Scroll to top (≤10px) → header becomes transparent again
- [ ] Hover on header → temporarily becomes solid
- [ ] Open search → header becomes solid
- [ ] Close search → header returns to scroll-based state

**Layout:**
- [ ] Content starts at top of page (header overlays content)
- [ ] Image banner/hero section starts at top

#### Test "Always Transparent" Mode
**Expected Behavior:**
- [ ] Header stays transparent with light logos/icons at all times
- [ ] Scrolling does NOT change header appearance
- [ ] Hover on header → temporarily becomes solid
- [ ] Open search → header becomes solid
- [ ] Close search → header returns to transparent

**Layout:**
- [ ] Content starts at top of page (header overlays content)
- [ ] Image banner/hero section starts at top

#### Test "Always Solid" Mode
**Expected Behavior:**
- [ ] Header stays solid with dark logos/icons at all times
- [ ] Scrolling does NOT change header appearance
- [ ] Hover on header → no visual change (already solid)
- [ ] Open search → header stays solid
- [ ] Close search → header stays solid

**Layout:**
- [ ] Content starts BELOW header (header pushes content down)
- [ ] No content is hidden behind header

### 4. Test Search Overlay in All Modes

#### Auto Mode:
1. Open search → header becomes solid
2. Close search → header returns to scroll-based state
3. If scrolled down, header should be solid
4. If at top, header should be transparent

#### Transparent Mode:
1. Open search → header becomes solid
2. Close search → header returns to transparent

#### Solid Mode:
1. Open search → header stays solid
2. Close search → header stays solid

### 5. Test Mobile Menu in All Modes

**All modes should:**
- [ ] Open mobile menu → header becomes solid
- [ ] Close mobile menu → header returns to configured state
- [ ] Mobile menu overlay appears correctly

### 6. Test on Different Page Templates

Test each mode on:
- [ ] Homepage
- [ ] Product page
- [ ] Collection page
- [ ] Blog page
- [ ] Custom landing page

### 7. Test Responsive Behavior

**Desktop (1440px+):**
- [ ] All modes work correctly
- [ ] Layout is correct for each mode

**Tablet (1024px):**
- [ ] All modes work correctly
- [ ] Layout is correct for each mode

**Mobile (767px and below):**
- [ ] All modes work correctly
- [ ] Layout is correct for each mode
- [ ] Mobile menu works in all modes

## Common Issues to Check

### Issue: Content hidden behind header in "Solid" mode
**Expected:** Content should start below header
**Fix:** Verify `diamension-header--solid-layout` class is applied

### Issue: Header not changing on scroll in "Auto" mode
**Expected:** Header should change based on scroll position
**Fix:** Check browser console for JavaScript errors

### Issue: Search overlay doesn't restore correct state
**Expected:** After closing search, header should return to configured behavior
**Fix:** Verify `originalBehavior` is being stored and restored correctly

### Issue: Layout classes not applying
**Expected:** Either `diamension-header--transparent-layout` or `diamension-header--solid-layout` should be present
**Fix:** Check `setInitialState()` method is being called

## Browser Console Checks

Open browser console (F12) and check:

1. **No JavaScript errors** should appear
2. **Header element** should have `data-header-behavior` attribute:
   ```javascript
   document.querySelector('[data-header]').dataset.headerBehavior
   // Should return: "auto", "transparent", or "solid"
   ```

3. **Layout classes** should be present:
   ```javascript
   document.querySelector('[data-header]').classList
   // Should contain either:
   // - diamension-header--transparent-layout
   // - diamension-header--solid-layout
   ```

## Success Criteria

✅ All three modes work as expected
✅ Search overlay correctly handles all modes
✅ Mobile menu works in all modes
✅ Layout is correct for each mode (transparent = overlay, solid = pushes content)
✅ No JavaScript errors in console
✅ Smooth transitions between states
✅ Backward compatible (existing sites default to "auto" mode)

## Recommended Configuration by Page Type

| Page Type | Recommended Setting | Reason |
|-----------|-------------------|---------|
| Homepage | Auto | Transparent hero that becomes solid on scroll |
| Product | Solid | Always readable, no distraction |
| Collection | Solid | Always readable, consistent navigation |
| Blog | Solid | Better readability for content |
| About/Contact | Solid | Professional, consistent |
| Landing Pages | Transparent or Auto | Depends on hero design |

---

**Last Updated**: December 8, 2025
