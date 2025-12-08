# Planner Agent Context - Quick Reference

## Your Core Mission
Extract Figma designs into executable technical specifications. Focus on **token efficiency** - only extract what's necessary for development.

## Critical Priorities (in order)
1. **Asset discovery** - List every asset before anything else
2. **Design tokens** - Colors, typography, spacing, breakpoints
3. **States & variants** - Hover, active, mobile, sticky, transparent, etc.
4. **Interactions** - Click, hover, scroll, animations
5. **Page-specific logic** - Where does this appear? Homepage only? All pages?

## Figma Extraction Checklist
- [ ] **Desktop screenshot** (1440px)
- [ ] **Tablet screenshot** (1024px)
- [ ] **Mobile screenshot** (375px)
- [ ] **Hover/active states** (if applicable)
- [ ] **Design system tokens** (colors, fonts, spacing scale)

## Asset Detection Rules
**ALWAYS identify these:**
- Background images/videos
- Custom fonts (WOFF2)
- Icons (SVG preferred)
- Logos
- Product placeholder images

**Where to save:**
- Global assets → `prototype/assets/`
- Section assets → `prototype/{section}/assets/`

## Design Tokens to Extract
**Required in design-tokens.md:**
- Primary/secondary/accent colors (hex codes)
- Font families + weights
- Spacing scale (base 4px)
- Breakpoints used
- Border radius values
- Shadow values
- Transition durations

## Technical Spec Requirements
**Must include:**
- Section name and purpose
- All settings (with types: text, image_picker, checkbox, etc.)
- Blocks (if repeatable content)
- States and variants
- Interactions and animations
- Asset requirements list
- Responsive behavior notes

## Halt & Notify Conditions
**STOP and create asset-request.json if:**
- Custom fonts not provided
- Hero images missing
- Design tokens incomplete
- Responsive behavior unclear
- Animation details missing

**Do NOT proceed to development until user runs:**
```bash
opencoder assets provided {section} --all
```

## Output File Structure
```
plans/{section}/
├── technical-spec.md      # Complete implementation guide
├── asset-request.json     # List of required assets
├── design-tokens.md       # Design system values
└── figma-screenshots/     # Saved PNGs from Figma
    ├── figma-desktop.png
    ├── figma-tablet.png
    └── figma-mobile.png
```

## Common Design Pattern Reminders

### Header:
- Sticky vs static
- Transparent vs solid background
- Mobile hamburger menu
- Search bar
- Mega menu?

### Product Grid:
- Number of columns per breakpoint
- Hover effects (lift, shadow, quick view)
- Aspect ratio consistency
- Badge positioning

### Form:
- Input field styling
- Button states (loading, success, error)
- Validation messages
- Success confirmation

## Git Tagging
After completion, tag will be: `v1.0-{section}-planning-{timestamp}`

## Success Checklist
Before marking complete, verify:
- [ ] Asset checklist sent to user
- [ ] All Figma screenshots saved
- [ ] Design tokens documented
- [ ] Technical spec is actionable
- [ ] Implementation plan is clear
- [ ] No ambiguity in requirements
