# Custom Rich Text Diamension Section - Developer Guidelines

## Overview
This section displays a headline and subtext with customizable colors and responsive typography. The design follows desktop-first principles and adheres to the project's CSS standards.

## Implementation Rules
1. **CSS Standards**
   - Use BEM methodology for class naming.
   - Create a separate CSS file: `assets/section-custom-rich-text.css`.
   - Link CSS in Liquid:
     ```liquid
     {{ 'section-custom-rich-text.css' | asset_url | stylesheet_tag }}
     ```

2. **Typography Scaling**
   - Use `rem` units for font sizes.
   - Define responsive font sizes using media queries.

3. **Color Customization**
   - Use CSS variables for color customization.

4. **Responsive Layout**
   - Center content using flexbox.

5. **Performance**
   - Minimize reflows by using `transform` for animations if needed.
   - Avoid `!important` unless absolutely necessary.

## Testing
- Test across all breakpoints (1441px+, 1024px, 767px, 375px).
- Ensure readability and alignment on all devices.

## Assets
- CSS file: `section-custom-rich-text.css`.

## Notes
- No theme schema settings are allowed.
- Default colors and background are hardcoded in the CSS file.