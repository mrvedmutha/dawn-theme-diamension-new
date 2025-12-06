# Complete Development Workflow

**Direct Liquid Development - No Prototype Phase**

---

## Phase 0: Design Extraction & Asset Collection

### Step 1: Extract Figma Design

1. Receive Figma file/URL from client
2. Use Figma MCP to extract:
   - Design context (layout, spacing, colors, typography)
   - Variable definitions (design tokens)
   - Screenshots for visual reference
3. Save screenshots to `prototype/[section-name]/design/`
4. Document design specifications in `design-tokens.md`

**Output:**
- Figma screenshots saved
- Design tokens documented
- Understanding of layout and requirements

---

### Step 2: Identify & Request Assets

**See:** [03-ASSET-MANAGEMENT.md](./03-ASSET-MANAGEMENT.md) for details

1. Analyze Figma design for ALL required assets
2. Create asset checklist using template
3. Send checklist to user
4. **WAIT for all assets**
5. **DO NOT PROCEED** without assets

**Output:**
- Asset checklist sent to user
- All assets received and verified

---

### Step 3: Verify & Organize Assets

1. Verify all assets provided
2. Check quality (format, dimensions, optimization)
3. Organize into:
   - Global: `prototype/assets/`
   - Section-specific: `prototype/[section-name]/assets/`
4. Confirm ready to build

**Output:**
- Assets organized
- Quality verified
- Ready for development

---

## Phase 1: Direct Liquid Development

### Step 1: Create File Structure

```bash
# Create Liquid file
sections/custom-section-[name].liquid

# Create CSS file
assets/section-[name].css

# Create JS file (if needed)
assets/section-[name].js
```

---

### Step 2: Build Liquid Section

1. **Create section schema** with settings:
   - Image pickers for images
   - Video URL for videos
   - Text/richtext for content
   - Color settings
   - Blocks (if needed)

2. **Write Liquid markup:**
   - Use BEM class naming
   - Reference section settings
   - Use Shopify filters for assets
   - Keep logic minimal

3. **Link CSS/JS files:**
   ```liquid
   {{ 'section-[name].css' | asset_url | stylesheet_tag }}
   <script src="{{ 'section-[name].js' | asset_url }}" defer></script>
   ```

4. **Asset handling:**
   - Images: `{{ section.settings.image | image_url }}`
   - Videos: `{{ section.settings.video_url | video_tag }}`
   - Inline SVG: Copy directly from prototype assets
   - Fonts: Google Fonts or theme font settings

**See:** [04-LIQUID-DEVELOPMENT.md](./04-LIQUID-DEVELOPMENT.md) for detailed standards

---

### Step 3: Write CSS

1. Create `assets/section-[name].css`
2. Use BEM methodology
3. Write for 1440px desktop first
4. Add responsive breakpoints
5. Never touch core theme files

**See:** [05-CSS-STANDARDS.md](./05-CSS-STANDARDS.md) for details

---

### Step 4: Write JavaScript (if needed)

1. Create `assets/section-[name].js`
2. Use modern ES6+ syntax
3. Keep functions small and focused
4. Handle errors gracefully
5. Avoid console.log (or add TODO comments)

**See:** [06-JAVASCRIPT-STANDARDS.md](./06-JAVASCRIPT-STANDARDS.md) for details

---

### Step 5: Test Locally with Shopify CLI

```bash
# Start dev server
shopify theme dev

# Open in browser
# http://localhost:9292

# Test:
# - Desktop (1440px)
# - Tablet (1024px)
# - Mobile (375px)
# - All interactions
# - Section settings in theme editor
```

**Verify:**
- Layout matches Figma
- All interactions work
- Responsive on all breakpoints
- No console errors
- Section settings work in theme customizer

---

## Phase 2: Testing with Playwright

**See:** [07-TESTING.md](./07-TESTING.md) for complete guide

### Step 1: Write Tests

Create: `tests/liquid/section-[name]/[name].spec.js`

**Test coverage:**
1. Visual regression (compare with Figma screenshots)
2. Responsive design (all breakpoints)
3. User interactions (clicks, hovers, toggles)
4. Shopify dynamic content (if applicable)

Use template: `docs/templates/playwright-test.js`

---

### Step 2: Run Tests

```bash
# Run all tests
npm test

# Run specific section tests
npx playwright test tests/liquid/section-[name]

# Update screenshots (if design changed)
npx playwright test --update-snapshots
```

**Fix issues until all tests pass.**

---

### Step 3: Manual Testing Checklist

- [ ] Test on Chrome, Firefox, Safari
- [ ] Test all breakpoints (1441px+, 1440px, 1024px, 767px, 375px)
- [ ] Test all interactions
- [ ] Test in theme editor (add/remove/configure section)
- [ ] No console errors
- [ ] No layout breaking
- [ ] Core theme unaffected

---

## Phase 3: Code Review & Quality Check

### Code Quality

- [ ] BEM methodology used
- [ ] File naming conventions followed
- [ ] No core theme files modified
- [ ] No inline styles (unless necessary)
- [ ] No console.log without TODO comments
- [ ] Comments added for complex logic
- [ ] Code is DRY (Don't Repeat Yourself)

### Performance

- [ ] Images optimized
- [ ] CSS minified (if large)
- [ ] JavaScript minimal and efficient
- [ ] No unused code

---

## Phase 4: Deployment

### Step 1: Final Test Run

```bash
# All tests must pass
npm test
```

---

### Step 2: Git Commit

```bash
# Add files
git add sections/custom-section-[name].liquid
git add assets/section-[name].css
git add assets/section-[name].js
git add tests/liquid/section-[name]/

# Commit with clear message
git commit -m "[Feature] Add custom [name] section with tests"
```

**See:** [09-GIT-WORKFLOW.md](./09-GIT-WORKFLOW.md) for commit standards

---

### Step 3: Push to Unpublished Theme

```bash
# Push to Shopify
shopify theme push --unpublished
```

**Test on unpublished theme before going live.**

---

### Step 4: Final Manual Testing

- [ ] Test on actual Shopify theme
- [ ] Test with real products/collections/data
- [ ] Test in theme editor
- [ ] Test all breakpoints
- [ ] Get client approval (if needed)

---

### Step 5: Push to Live

```bash
# Only after approval and all tests pass
shopify theme push --theme [live-theme-id]
```

---

## Summary Checklist

Before marking section as complete:

**Phase 0:**
- [ ] Figma design extracted
- [ ] All assets collected and organized

**Phase 1:**
- [ ] Liquid file created
- [ ] CSS file created
- [ ] JS file created (if needed)
- [ ] Local testing done with `shopify theme dev`
- [ ] Section works in theme editor

**Phase 2:**
- [ ] Playwright tests written
- [ ] All tests pass
- [ ] Manual testing checklist complete

**Phase 3:**
- [ ] Code quality verified
- [ ] Performance checked

**Phase 4:**
- [ ] Git commit complete
- [ ] Pushed to unpublished theme
- [ ] Final testing done
- [ ] Live deployment (when approved)

---

## Time Estimates

**Per section (approximate):**
- Phase 0: 30-60 min (design extraction + assets)
- Phase 1: 2-4 hours (development + local testing)
- Phase 2: 1-2 hours (testing)
- Phase 3: 30 min (code review)
- Phase 4: 30 min (deployment)

**Total:** 4.5-8 hours per section

**Note:** Complex sections may take longer. Simple sections may be faster.
