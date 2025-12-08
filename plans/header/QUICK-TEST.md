# Quick Test Guide - Header Behavior

## How to Test

### 1. Open Browser DevTools
Press F12 or right-click → Inspect

### 2. Check Header Classes

In the console, run:
```javascript
document.querySelector('[data-header]').classList
```

**Expected Results:**

#### Auto Mode (default):
- Should see: `diamension-header--transparent-layout`
- Header position: `fixed`
- Content starts at top (header overlays)

#### Solid Mode:
- Should see: `diamension-header--solid-layout`
- Header position: `relative !important`
- Content pushed down below header

### 3. Visual Check

#### Auto Mode:
✅ Header is transparent at top
✅ Content (hero/banner) starts at very top of page
✅ Header overlays the content
✅ When you scroll down, header becomes solid

#### Solid Mode:
✅ Header is solid (white background) at top
✅ Content starts BELOW the header
✅ There's a gap between top of page and content
✅ Header never becomes transparent

### 4. Test Scroll Behavior

#### Both Modes Should:
✅ Hide header when scrolling down past 820px
✅ Show header when scrolling up
✅ Mobile menu works
✅ Search overlay works

## Quick Fix Verification

Run this in console to check if solid mode is working:

```javascript
const header = document.querySelector('[data-header]');
const hasClass = header.classList.contains('diamension-header--solid-layout');
const position = window.getComputedStyle(header).position;

console.log('Has solid-layout class:', hasClass);
console.log('Position:', position);
console.log('Expected: position should be "relative" when solid-layout class is present');
```

**Expected Output for Solid Mode:**
```
Has solid-layout class: true
Position: relative
Expected: position should be "relative" when solid-layout class is present
```

## Common Issues

### Issue: Content still at top in Solid mode
**Check**: Does header have `position: relative` in computed styles?
**Fix**: The CSS now has `!important` to override base `position: fixed`

### Issue: Header behavior setting not applying
**Check**: Does header element have `data-header-behavior` attribute?
**Fix**: Verify in theme editor that setting is saved

---

**Last Updated**: December 8, 2025
**Fix Applied**: Added `!important` to `.diamension-header--solid-layout` position
