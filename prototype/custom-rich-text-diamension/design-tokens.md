### Design Plan for "Custom Rich Text Diamension" Section

#### Overview
The "Custom Rich Text Diamension" section will display a headline and subtext with customizable colors and responsive typography. The design follows the desktop-first approach and adheres to the CSS standards outlined in the project's rules file.

---

### Technical Specification

#### Design Details
1. **Headline Text**
   - Content: "Luxury Within Reach. Brilliance Beyond Measure"
   - Font Style: Uppercase, light-weight font (`Neue Haas Grotesk Display Pro:45 Light`)
   - Font Size: **40px** (Desktop, 1440px base)
   - Line Height: **45px**
   - Color: Customizable via theme settings (default: `#183754`)
   - Alignment: Centered horizontally and vertically
   - Width: **619.228px**

2. **Subtext**
   - Content: "Backed by HVK Diamonds’ 25-year heritage, we merge mastery in craftsmanship with next-gen innovation. Every piece is crafted in 14K gold, IGI certified, and designed to be cherished for a lifetime."
   - Font Style: Regular-weight font (`Neue Haas Grotesk Display Pro:55 Roman`)
   - Font Size: **20px** (Desktop, 1440px base)
   - Line Height: **30px**
   - Color: Customizable via theme settings (default: `#3e6282`)
   - Alignment: Centered horizontally and vertically
   - Width: **477.15px**

3. **Background**
   - Default: Light beige (`#FAF7F5`)
   - Customizable via theme settings (default applied if not overridden).

---

#### Responsive Behavior
The section will scale typography and spacing based on breakpoints defined in the CSS standards file:
- **Desktop (1440px)**: Base styles.
- **Tablet (1024px)**:
  - Headline Font Size: **32px**
  - Subtext Font Size: **18px**
  - Adjust padding and spacing.
- **Mobile (767px)**:
  - Headline Font Size: **28px**
  - Subtext Font Size: **16px**
  - Adjust padding and spacing.
- **Small Mobile (375px)**:
  - Headline Font Size: **24px**
  - Subtext Font Size: **14px**
  - Adjust padding and spacing.

---

#### Implementation Rules
1. **CSS Standards**
   - Use **BEM methodology** for class naming:
     - Block: `.custom-section-rich-text`
     - Element: `.custom-section-rich-text__headline`, `.custom-section-rich-text__subtext`
     - Modifier: `.custom-section-rich-text--default-bg`, `.custom-section-rich-text--custom-color`
   - Create a separate CSS file: `assets/section-custom-rich-text.css`
   - Link CSS in Liquid:
     ```liquid
     {{ 'section-custom-rich-text.css' | asset_url | stylesheet_tag }}
     ```

2. **Typography Scaling**
   - Use `rem` units for font sizes to ensure scalability.
   - Define responsive font sizes using media queries:
     ```css
     @media (max-width: 1024px) {
       .custom-section-rich-text__headline {
         font-size: 2rem; /* 32px */
       }
       .custom-section-rich-text__subtext {
         font-size: 1.125rem; /* 18px */
       }
     }
     @media (max-width: 767px) {
       .custom-section-rich-text__headline {
         font-size: 1.75rem; /* 28px */
       }
       .custom-section-rich-text__subtext {
         font-size: 1rem; /* 16px */
       }
     }
     @media (max-width: 375px) {
       .custom-section-rich-text__headline {
         font-size: 1.5rem; /* 24px */
       }
       .custom-section-rich-text__subtext {
         font-size: 0.875rem; /* 14px */
       }
     }
     ```

3. **Color Customization**
   - Use CSS variables for color customization:
     ```css
     :root {
       --custom-rich-text-headline-color: #183754;
       --custom-rich-text-subtext-color: #3e6282;
       --custom-rich-text-bg-color: #FAF7F5;
     }
     .custom-section-rich-text {
       background-color: var(--custom-rich-text-bg-color);
     }
     .custom-section-rich-text__headline {
       color: var(--custom-rich-text-headline-color);
     }
     .custom-section-rich-text__subtext {
       color: var(--custom-rich-text-subtext-color);
     }
     ```

4. **Responsive Layout**
   - Center content using flexbox:
     ```css
     .custom-section-rich-text {
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       text-align: center;
       padding: 80px 40px;
     }
     ```

5. **Performance**
   - Minimize reflows by using `transform` for animations if needed.
   - Avoid `!important` unless absolutely necessary.

---

#### Developer Notes
1. **Follow the CSS Standards File**
   - Ensure compliance with BEM methodology and responsive design principles.
   - Use the provided breakpoints and scaling rules.

2. **No Theme Schema Settings**
   - Hardcode default colors and background in the CSS file.
   - Allow customization via CSS variables.

3. **Testing**
   - Test across all breakpoints (1441px+, 1024px, 767px, 375px).
   - Ensure readability and alignment on all devices.

4. **Assets**
   - No additional assets are required for this section.

---

### Asset Checklist
```json
{
  "section": "custom-rich-text-diamension",
  "assets": [
    {
      "type": "css",
      "name": "section-custom-rich-text.css",
      "required": true,
      "destination": "assets/"
    }
  ]
}
```

---

### Final Markdown File
```markdown
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
```

Let me know if anything needs adjustment or clarification!