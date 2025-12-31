# Rich Text Centered Quote - Section Overview

## Section Purpose

A static centered text block designed to display brand mission statements or key messaging with elegant typography on a warm background. The section maintains a fixed 605px height across all devices, creating a consistent visual anchor point.

## Component Type Classification

**Centered Text Content Section / Brand Statement Block**

- Static text display with no interactions
- Fixed-height container with responsive typography
- Minimal customization (text content and colors only)
- Follows existing "diamension-quote" pattern architecture

## Files to Create

### Required Files

1. **sections/custom-section-rich-text-centered-quote.liquid**
   - Shopify section file with schema settings
   - Minimal markup structure (section > container > text)
   - Three customizable settings: text content, background color, text color

2. **assets/section-rich-text-centered-quote.css**
   - Complete responsive styles for all breakpoints
   - Fixed 605px height implementation
   - Typography scaling: 40px → 32px → 24px → 20px
   - Container max-width constraint: 1440px

3. **assets/section-rich-text-centered-quote.js**
   - NOT REQUIRED (no JavaScript interactions)

## Functional Requirements Checklist

### Layout Requirements
- [x] Fixed section height: 605px across all breakpoints
- [x] Container max-width: 1440px with centered alignment
- [x] Content max-width: 675px at desktop
- [x] Responsive content width: 80vw (tablet), 90vw (mobile), 95vw (small mobile)
- [x] Vertical and horizontal centering using flexbox
- [x] Text alignment: center (hardcoded, not customizable)

### Typography Requirements
- [x] Font: Neue Haas Grotesk Display Pro Roman (400) - existing asset
- [x] Desktop (1440px): 40px / 45px line-height
- [x] Tablet (1024px): 32px / 38px line-height
- [x] Mobile (767px): 24px / 30px line-height
- [x] Small Mobile (375px): 20px / 26px line-height
- [x] Mobile constraint: Content fits within 5 lines maximum

### Color Requirements
- [x] Default background: #FFFAF5 (warm off-white)
- [x] Default text color: #183754 (deep blue)
- [x] Both colors customizable via schema settings

### Schema Settings Requirements
- [x] Textarea setting for text content
- [x] Color picker for background color
- [x] Color picker for text color
- [x] Default values match Figma design

### Responsive Requirements
- [x] Base styles: 1440px
- [x] Large desktop (1441px+): Container constraint with max-width
- [x] Tablet (1024px): Typography scale-down (~20%)
- [x] Mobile (767px): Typography scale-down with width adjustment
- [x] Small mobile (375px): Final typography fine-tuning

### Interaction Requirements
- [x] NO animations
- [x] NO hover effects
- [x] NO scroll effects
- [x] Static display only

## Assets Needed Checklist

### Fonts
- [x] **READY** - Neue Haas Grotesk Display Pro Roman (400)
  - Path: `assets/fonts/neue-haas-display/NeueHaasDisplay-Roman.woff2`
  - Already available in theme assets
  - No additional font files needed

### Images
- [x] **NOT APPLICABLE** - Text-only section, no images required

### Icons
- [x] **NOT APPLICABLE** - No icons needed

## Design Reference

- **Figma URL**: https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-5036&m=dev
- **Figma Node ID**: 12:5036
- **Component Type**: Centered text content section / Brand statement block

## Special Considerations

### Critical Implementation Notes

1. **Fixed Height Constraint**
   - Section height MUST be 605px at ALL breakpoints
   - No height adjustments for mobile devices
   - Content must be vertically centered within this fixed container

2. **Text Alignment**
   - Text alignment is CENTER ONLY
   - Hardcoded in CSS, NOT customizable via schema
   - No left/right alignment options

3. **Font Usage**
   - Use existing font from `assets/fonts/neue-haas-display/`
   - Do NOT add font-size override controls
   - Responsive sizes are predefined and fixed

4. **Container Behavior**
   - Container max-width: 1440px
   - Prevents stretching on ultra-wide displays
   - Uses `margin: 0 auto` for centering

5. **Mobile Constraint**
   - Content MUST fit within 5 lines maximum on mobile
   - Achieved through precise font-size/line-height ratios
   - Users should be aware of this limitation when editing content

6. **CSS Naming Convention**
   - Section wrapper: `.custom-section-rich-text-centered-quote`
   - Container: `.custom-section-rich-text-centered-quote__container`
   - Text element: `.custom-section-rich-text-centered-quote__text`
   - Follow BEM naming pattern

## Pattern Reference

This section follows the existing **diamension-quote** pattern:
- Fixed-height centered text container
- Responsive typography scaling
- Minimal schema customization
- Static display with no interactions

## Success Criteria

The section will be considered complete when:

1. Section renders at exactly 605px height on all devices
2. Text is perfectly centered vertically and horizontally
3. Typography scales correctly at all four breakpoints
4. Container does not exceed 1440px width on large displays
5. All three schema settings work correctly (text, background, text color)
6. Section passes Shopify theme check validation
7. Visual regression tests pass at all breakpoints
8. Content fits within 5 lines on mobile devices

## Next Steps

After planning approval:
1. Developer agent creates `.liquid` and `.css` files
2. Git-Manager creates checkpoint commit
3. Validator runs theme check and file sync verification
4. User adds section to test page
5. Tester runs visual regression and functional tests
