# Design Extraction from Figma

**Use Figma MCP to extract design specifications before development.**

---

## Process

### Step 1: Receive Figma File

Get from client:
- Figma file URL or direct access
- Specific frame/page to extract
- Any design system documentation

---

### Step 2: Extract with Figma MCP

**What to extract:**
1. **Design context:**
   - Layout structure
   - Spacing/padding values
   - Color palette
   - Typography (font families, sizes, weights)
   - Component hierarchy

2. **Screenshots:**
   - Desktop view (1440px)
   - Tablet view (1024px)
   - Mobile view (375px)
   - Hover states
   - Active states
   - Any animations/transitions

3. **Design tokens:**
   - Colors (hex codes)
   - Font families and weights
   - Spacing scale
   - Border radius values
   - Shadow values
   - Transition durations

---

### Step 3: Save Design Assets

**Folder structure:**
```
prototype/[section-name]/design/
├── figma-desktop.png
├── figma-tablet.png
├── figma-mobile.png
├── figma-hover-state.png (if applicable)
└── design-tokens.md
```

---

### Step 4: Document Design Tokens

**File:** `prototype/[section-name]/design/design-tokens.md`

**Template:**
```markdown
# [Section Name] - Design Tokens

## Colors
- Primary: #000000
- Secondary: #FFFFFF
- Accent: #FF5733

## Typography
- Font Family: Neue Haas Display
- Heading Size: 48px / 3rem
- Body Size: 16px / 1rem
- Line Height: 1.5

## Spacing
- Section Padding: 80px (desktop), 40px (mobile)
- Element Margin: 24px
- Grid Gap: 16px

## Layout
- Max Width: 1440px
- Container Padding: 40px (desktop), 20px (mobile)
- Columns: 12 (desktop), 6 (tablet), 4 (mobile)

## Breakpoints Used
- Desktop: 1440px
- Tablet: 1024px
- Mobile: 375px

## Components
- Button Height: 48px
- Input Height: 56px
- Border Radius: 4px

## Transitions
- Hover: 0.3s ease
- Fade: 0.5s ease-in-out
```

---

## Design Analysis

### Questions to Answer

Before starting development, analyze:

1. **Responsiveness:**
   - How does layout change on mobile?
   - Are there tablet-specific designs?
   - Any elements that hide/show on different screens?

2. **Interactions:**
   - Hover effects?
   - Click animations?
   - Transitions?
   - Scroll effects?

3. **Dynamic Content:**
   - Will this use Shopify products/collections?
   - How many items shown?
   - Is content repeating (blocks)?

4. **Assets Needed:**
   - Custom fonts?
   - Images/videos?
   - Icons?
   - SVG graphics?

---

## Common Design Patterns

### Hero Sections
- Background image/video
- Text overlay
- CTA buttons
- Full viewport height or fixed height?

### Product Cards
- Image aspect ratio
- Title/price layout
- Badge positioning
- Hover effects

### Navigation
- Sticky header?
- Mega menu?
- Mobile hamburger menu?
- Search bar?

### Forms
- Input styles
- Button styles
- Validation states
- Error messages

---

## Design Red Flags

**Watch out for:**
- ❌ Designs wider than 1440px (will need centering)
- ❌ Custom fonts not provided
- ❌ Images/videos not available
- ❌ Unclear hover/active states
- ❌ Missing mobile designs
- ❌ Complex animations (may need JavaScript)
- ❌ Unrealistic content amounts (text overflow issues)

**Ask client for clarification on any red flags.**

---

## Output Checklist

Before moving to asset collection:

- [ ] Figma screenshots saved
- [ ] Design tokens documented
- [ ] Layout structure understood
- [ ] Interactions identified
- [ ] Dynamic content requirements clear
- [ ] Asset requirements list created
- [ ] Design red flags addressed
