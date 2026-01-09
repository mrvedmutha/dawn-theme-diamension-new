# Header Debugging Guide

## Issue Description
On transparent header pages (behavior='auto'), when scrolling down to around 820px, the solid header state briefly flashes/appears for a split second before the header hides. This creates an undesirable visual glitch.

## Debugging Features Added

All debugging code is marked with `TODO:` comments so it can be easily found and removed later.

### 1. Console Logging (JavaScript)

#### Initialization Logs
- `🚀 HEADER INITIALIZED` - Shows behavior mode and scroll threshold on page load

#### Scroll Position Logs
- `🔍 SCROLL DEBUG` - Logs scroll position, threshold, and direction when near the 820px threshold (±50px)
- `🙈 HIDING HEADER` - Logs when header gets hidden
- `👁️ SHOWING HEADER` - Logs when header becomes visible again

#### State Transition Logs
- `🎨 AUTO MODE` - Shows current class states when near threshold
- `🟦 TRANSITIONING TO SOLID` - Logs when header changes from transparent to solid
- `🔲 TRANSITIONING TO TRANSPARENT` - Logs when header changes from solid to transparent
- `🟦 STAYING SOLID` - Logs when scrolling up but still above threshold
- `🔝 RESET TO TOP` - Logs when scrolling back to the very top

#### Flash Detection
- `⚠️ FLASH DETECTED` - **Critical warning** when solid state is visible when it should be hidden

### 2. Visual Indicators (CSS)

#### Header State Labels
- **Green badge** "TRANSPARENT MODE" - Appears at top center when header is in transparent layout
- **Blue badge** "SOLID MODE" - Appears at top center when header is in solid layout
- **Orange badge** "SCROLLED STATE" - Appears below the first badge when header has scrolled state
- **Red outline** - Appears around header when it's hidden

#### Real-Time Scroll Position Indicator
Fixed indicator at top-right showing:
- Current scroll position in pixels
- Threshold value (820px)
- Difference from threshold (e.g., +50px or -30px)
- Current header behavior mode

#### Flash Warning
- **Red alert popup** appears in center of screen if solid state flash is detected

## Testing Instructions

### Step 1: Open Developer Console
1. Open your browser's DevTools (F12 or Cmd+Option+I)
2. Go to the Console tab
3. Clear the console for a fresh start

### Step 2: Test Transparent Header Page
1. Navigate to a page with transparent header (e.g., index or blog page)
2. Make sure you're at the top (scroll to 0)
3. Watch the console for the initialization log

### Step 3: Scroll Down Slowly
1. Scroll down slowly from the top
2. Watch the scroll position indicator (top-right corner)
3. Pay close attention when approaching 820px:
   - Look for the visual state badges changing
   - Check console logs for state transitions
   - Watch for the red flash warning popup

### Step 4: Identify the Issue
Look for this sequence:
1. At ~820px: Console shows "🟦 TRANSITIONING TO SOLID"
2. Immediately after: Console shows "🙈 HIDING HEADER"
3. **Problem**: If you see "⚠️ FLASH DETECTED" warning, this confirms:
   - The solid state was applied
   - The header was NOT hidden yet
   - The solid state was briefly visible

### Step 5: Document Findings
In the console, you should see:
- Exact scroll position when transition happens
- Class states before and after transition
- Whether the flash warning appears
- Timing of hide vs. solid transition

## Expected Behavior

### For Transparent Header (auto mode):
1. **0-820px**: Header is transparent, visible
2. **820px (scrolling down)**: Header should become solid AND hidden **simultaneously**
3. **820px+ (scrolling up)**: Header should show as solid
4. **Below 820px (scrolling up)**: Header should transition back to transparent

### Current Bug:
At 820px when scrolling down:
1. Header transitions to solid state ✓
2. Header hides ✓
3. **BUT**: There's a brief moment where solid state is visible before hiding ✗

## What to Look For

### In Console:
```
🔍 SCROLL DEBUG - Position: 820 Threshold: 820 Direction: ⬇️ DOWN
🟦 TRANSITIONING TO SOLID at position: 821
🟦 SOLID STATE APPLIED - Classes: {scrolled: true, solid: true, transparent: false, hidden: false}
🙈 HIDING HEADER at position: 821
⚠️ FLASH DETECTED: Solid state is VISIBLE at 821 px (should be hidden!)
```

### On Screen:
1. **Scroll indicator** should show values around 820
2. **State badges** should flash from green (transparent) to blue (solid)
3. **Red flash warning** might appear if timing issue is detected
4. **Visual glitch** - brief appearance of solid header before it hides

## Next Steps After Debugging

Once we identify the exact sequence of events, we can:
1. Adjust the timing of when classes are applied
2. Possibly apply both solid and hidden classes simultaneously
3. Or change the threshold values to prevent the flash
4. Or use CSS transitions differently to hide the flash

## Removing Debug Code

After debugging, search for `TODO:` in these files:
- `/assets/section-diamension-header.js` - Remove console.logs and debug functions
- `/assets/section-diamension-header.css` - Remove visual indicator styles
- Remove this file: `HEADER-DEBUG-GUIDE.md`

Use your editor's search feature to find all `TODO:` markers and clean them up.
