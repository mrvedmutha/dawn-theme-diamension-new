# Figma Reference Guide - Image Hero with Text Section

## 📌 Figma Node Information

**Node ID:** `12:4725`
**Node Name:** `LAB09697 1`
**Figma URL:** `https://www.figma.com/design/xGtEw0s7Uqxnux92qSegX8/Diamension---Dev--FINAL-?node-id=12-4725`

**Dimensions:** 1440px W × 1037.8px H (use 1040px for implementation)

---

## ⚠️ CRITICAL: What to Extract vs. What to Ignore

### ✅ EXTRACT FROM FIGMA

#### 1. Background Image
- **What:** The main lifestyle/product photography showing model with jewelry
- **How:** Use as reference for image aspect ratio and styling
- **Implementation:** Merchant will upload their own image via theme settings

#### 2. Text Content & Positioning
Extract these text elements:

**Heading:**
- Text: "INTO THE RED"
- Position: Top 216px, Left 56px (from container)
- Font Family: (Extract from Figma - appears to be Neue Haas Grotesk Display Pro)
- Font Size: 40px
- Font Weight: Light (appears thin/light weight)
- Text Transform: UPPERCASE
- Color: White (#FFFFFF)
- Line Height: (Extract from Figma)

**Caption:**
- Text: "Jewelry that feels as good as it looks."
- Position: 6px gap below heading
- Font Family: (Extract from Figma - same as heading)
- Font Size: 20px
- Font Weight: Light
- Color: White (#FFFFFF)
- Line Height: (Extract from Figma)

**CTA (Call-to-Action):**
- Text: "Shop the Collection"
- Position: 64px gap below caption
- Font Family: (Extract from Figma - same as heading)
- Font Size: 20px
- Font Weight: Light or Regular
- Color: White (#FFFFFF)
- Text Decoration: Underline
- Line Height: (Extract from Figma)

#### 3. Layout Structure
- **Container Width:** 1440px (desktop base)
- **Container Height:** 1040px
- **Text Alignment:** Left-aligned
- **Image Behavior:** Fill container (object-fit: cover)

#### 4. Typography Details
Use Figma to extract:
- Exact font family name
- Font weights (numeric values if available)
- Line heights (in px or unitless)
- Letter spacing (if any)

#### 5. Color Palette
- **Text Color:** White (#FFFFFF) or extract exact hex
- **Overlay Color:** Appears to have dark overlay for text readability
- **Background:** Dark brown/black tones from image

---

### ❌ IGNORE IN FIGMA (NOT PART OF THIS SECTION)

#### 1. Product Spotlight Card (Right Side)
**DO NOT IMPLEMENT:**
- White product card on right side
- Product image (necklace on white background)
- Product title: "14K GOLD MAGIC WITH BIRTHSTONE DIAMOND"
- "View Now" link
- Product card styling

**Reason:** This is a different feature. Current implementation is ONLY the hero image with text overlay.

#### 2. Numbered Product Indicators (01, 02, 03)
**DO NOT IMPLEMENT:**
- Any numbered indicators visible in the design
- Product spotlight functionality
- Product switching/carousel features

**Reason:** Not part of this simple hero section.

#### 3. Any Interactive Product Elements
**DO NOT IMPLEMENT:**
- Product selection
- Product quick view
- Product navigation

**Reason:** This section only has one interactive element: the CTA link.

---

## 🎨 Extracting Typography from Figma

### How to Extract Font Details

1. **Select the text layer** in Figma
2. **Check the right panel** for typography details:
   - Font family (e.g., "Neue Haas Grotesk Display Pro")
   - Font weight (e.g., Light, Regular, Medium with numeric value)
   - Font size (in pixels)
   - Line height (in pixels or %)
   - Letter spacing (if any)
   - Text transform (uppercase/lowercase/none)

3. **Record these values** in design-tokens.md

### Expected Typography (Verify in Figma)

Based on the screenshot, the typography likely uses:
- **Font Family:** Neue Haas Grotesk Display Pro (or similar sans-serif)
- **Heading Weight:** Light (45 or 300)
- **Caption/CTA Weight:** Light or Regular (45 or 400)
- **Heading Transform:** UPPERCASE
- **Caption/CTA Transform:** None (sentence case)

**Action Required:** Developer must verify these details in Figma before implementing.

---

## 📏 Extracting Spacing from Figma

### How to Measure Spacing

1. **Select the heading text layer**
2. **Hold Option/Alt** and hover over container edges
3. **Record distances:**
   - Top edge to heading: Should be 216px
   - Left edge to heading: Should be 56px

4. **Measure gaps between elements:**
   - Heading bottom to caption top: Should be 6px
   - Caption bottom to CTA top: Should be 64px

### Verification Checklist
- [ ] Heading top position: 216px ✓
- [ ] Heading left position: 56px ✓
- [ ] Heading-to-caption gap: 6px ✓
- [ ] Caption-to-CTA gap: 64px ✓

**If measurements don't match:** Ask human for clarification - do NOT assume or approximate.

---

## 🖼️ Extracting Image Details

### Background Image Characteristics

**From Figma:**
- Image shows model from behind wearing jewelry
- Dark, moody tones (brown/black background)
- High contrast with white text
- Professional product photography style

**Implementation Notes:**
- Image will be uploaded by merchant
- Use `object-fit: cover` to maintain aspect ratio
- Recommend minimum image size: 1440×1040px
- Recommend image format: JPG or WebP for photography

### Image Overlay

**Observation from Figma:**
- Appears to have subtle dark overlay for text readability
- Overlay color: Likely black with low opacity (10-30%)

**Implementation:**
- Add overlay color setting in schema
- Add overlay opacity setting (0-100%)
- Default: Transparent or low opacity black

---

## 🎨 Extracting Colors from Figma

### How to Extract Exact Colors

1. **Select text layer** in Figma
2. **Check Fill color** in right panel
3. **Copy hex code** (e.g., #FFFFFF)

### Expected Colors (Verify in Figma)

**Text Color:**
- Appears to be white or near-white
- Verify exact hex code in Figma
- Document in design-tokens.md

**Overlay Color:**
- Appears to be black with low opacity
- Extract exact rgba value if available
- Or document as customizable setting

---

## 🔍 Figma Inspector Workflow

### Step-by-Step Extraction Process

1. **Open Figma file** at node 12:4725
2. **Disable product card layers** to focus on hero
3. **Extract heading:**
   - Select heading text layer
   - Copy: font family, size, weight, color, position
   - Document in design-tokens.md

4. **Extract caption:**
   - Select caption text layer
   - Copy: font family, size, weight, color
   - Measure gap from heading

5. **Extract CTA:**
   - Select CTA text layer
   - Copy: font family, size, weight, color, decoration
   - Measure gap from caption

6. **Verify container:**
   - Measure container dimensions
   - Verify: 1440×1040px

7. **Extract image properties:**
   - Note image positioning
   - Note any overlay effects
   - Note overall color scheme

---

## 📝 Documentation Template

Use this template when extracting from Figma:

```markdown
## Typography Extraction

### Heading "INTO THE RED"
- Font Family: [EXTRACT FROM FIGMA]
- Font Size: 40px ✓
- Font Weight: [EXTRACT FROM FIGMA] (appears Light)
- Line Height: [EXTRACT FROM FIGMA]
- Letter Spacing: [EXTRACT FROM FIGMA]
- Color: [EXTRACT HEX FROM FIGMA] (appears #FFFFFF)
- Text Transform: UPPERCASE ✓
- Position: Top 216px ✓, Left 56px ✓

### Caption "Jewelry that feels as good as it looks."
- Font Family: [EXTRACT FROM FIGMA]
- Font Size: 20px ✓
- Font Weight: [EXTRACT FROM FIGMA] (appears Light)
- Line Height: [EXTRACT FROM FIGMA]
- Letter Spacing: [EXTRACT FROM FIGMA]
- Color: [EXTRACT HEX FROM FIGMA] (appears #FFFFFF)
- Gap from Heading: 6px ✓

### CTA "Shop the Collection"
- Font Family: [EXTRACT FROM FIGMA]
- Font Size: 20px ✓
- Font Weight: [EXTRACT FROM FIGMA]
- Line Height: [EXTRACT FROM FIGMA]
- Color: [EXTRACT HEX FROM FIGMA] (appears #FFFFFF)
- Text Decoration: Underline ✓
- Gap from Caption: 64px ✓
```

---

## ⚠️ Common Extraction Mistakes

### ❌ Mistake 1: Including Product Cards
**Wrong:** Extracting product card dimensions, styling, or functionality
**Right:** Only extract hero background and text overlay

### ❌ Mistake 2: Approximating Measurements
**Wrong:** "Looks like about 60px from the left"
**Right:** Use Figma's measurement tools to get exact 56px

### ❌ Mistake 3: Assuming Font Weights
**Wrong:** Assuming "Light" means font-weight: 300
**Right:** Check Figma for exact weight value (could be 45, 275, 300, etc.)

### ❌ Mistake 4: Ignoring Line Heights
**Wrong:** Not documenting line height
**Right:** Extract exact line height value from Figma

### ❌ Mistake 5: Guessing Colors
**Wrong:** "Looks white so probably #FFFFFF"
**Right:** Extract exact hex code from Figma (could be #FAFAFA, #F5F5F5, etc.)

---

## ✅ Extraction Checklist

Before moving to implementation, verify you have extracted:

### Typography
- [ ] Heading font family (exact name)
- [ ] Heading font size (40px)
- [ ] Heading font weight (exact value)
- [ ] Heading line height
- [ ] Heading color (exact hex)
- [ ] Caption font family
- [ ] Caption font size (20px)
- [ ] Caption font weight
- [ ] Caption line height
- [ ] Caption color (exact hex)
- [ ] CTA font family
- [ ] CTA font size (20px)
- [ ] CTA font weight
- [ ] CTA line height
- [ ] CTA color (exact hex)

### Spacing
- [ ] Heading top position (216px)
- [ ] Heading left position (56px)
- [ ] Heading-to-caption gap (6px)
- [ ] Caption-to-CTA gap (64px)
- [ ] Container dimensions (1440×1040px)

### Colors & Effects
- [ ] Text color(s) (exact hex)
- [ ] Overlay color (if any)
- [ ] Overlay opacity (if any)

---

## 🚫 If Something Doesn't Match

**If your measurements don't match the specifications:**

1. **Double-check Figma node:** Ensure you're on node 12:4725
2. **Verify measurement tool:** Use Figma's built-in measurement (Option/Alt + hover)
3. **Check parent containers:** Make sure you're measuring from the right reference point
4. **Ask human:** If still unclear, ask for clarification - do NOT assume or approximate

**Never implement based on assumptions. Always ask if unclear.**

---

## 📞 When to Ask for Clarification

Ask human if:
- ❓ Measurements in Figma don't match specification
- ❓ Typography details are unclear or inconsistent
- ❓ You can't find a specific element mentioned
- ❓ Figma node appears different from description
- ❓ Multiple font weights are used and it's unclear which to use
- ❓ Color values are inconsistent across text elements

**Remember:** It's better to ask than to implement incorrectly.

---

**Last Updated:** 2025-12-15
**Figma Node:** `12:4725`
**Status:** Ready for extraction
