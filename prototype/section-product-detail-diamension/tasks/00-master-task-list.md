# Product Detail Section - Master Task List

**Project:** Diamension Custom Product Detail Page
**Section:** sections/custom-product-detail.liquid
**Status:** In Progress
**Last Updated:** 2025-01-18

---

## 🎯 Task Workflow

1. ✅ Each task will be completed ONE AT A TIME
2. ✅ User will manually test after each task
3. ✅ User must approve before proceeding to next task
4. ✅ Tasks are numbered and organized by priority

---

## 📊 Task Status Legend

- `[ ]` Not Started
- `[IN PROGRESS]` Currently Working
- `[TESTING]` Waiting for User Approval
- `[✓]` Completed & Approved
- `[BLOCKED]` Blocked/On Hold

---

## 🔴 PHASE 1: CRITICAL FIXES (Breaking Errors)

### Task 1.1: Remove Judge.me Integration Error
**Status:** `[ ]`
**Priority:** CRITICAL
**File:** `sections/custom-product-detail.liquid`
**Line:** 72
**Description:** Remove Judge.me snippet call causing Liquid error
**Impact:** Visible error message on product page
**Estimated Time:** 5 minutes

**Changes Required:**
- Remove lines 70-78 (Judge.me rating widget)
- Remove any associated CSS for `.custom-product-detail__rating`

**Success Criteria:**
- No Liquid error message visible on page
- No console errors related to Judge.me

---

### Task 1.2: Fix Font File Loading Errors
**Status:** `[ ]`
**Priority:** CRITICAL
**File:** `assets/section-custom-product-detail.css`
**Description:** Fix font file 404 errors (typo in filename)
**Impact:** Wrong fonts displaying on page

**Changes Required:**
1. Check actual font filenames in `assets/fonts/neue-haas-display/`
2. Update @font-face declarations with correct filenames
3. Ensure all three weights load correctly:
   - Light (300)
   - Roman (400)
   - Medium (500)

**Success Criteria:**
- No 404 errors for font files in console
- Neue Haas Grotesk Display Pro loads correctly
- All text displays in correct font family

---

### Task 1.3: Add Tax Info Text
**Status:** `[ ]`
**Priority:** HIGH
**File:** `sections/custom-product-detail.liquid`
**Line:** ~82 (after price)
**Description:** Add "(Inclusive of all taxes)" text below price
**Figma Reference:** Node 206-269

**Changes Required:**
```liquid
<p class="custom-product-detail__tax-info">
  (Inclusive of all taxes)
</p>
```

**CSS Required:**
```css
.custom-product-detail__tax-info {
  font-size: 14px;
  font-weight: 400;
  color: #3e6282;
  line-height: normal;
  margin: 0;
}
```

**Success Criteria:**
- Tax info text appears below price
- Styling matches Figma exactly

---

## 🔴 PHASE 2: MISSING MAJOR COMPONENTS

### Task 2.1: Add Product Details Accordion (Three-Column Cards)
**Status:** `[ ]`
**Priority:** HIGH
**File:** `sections/custom-product-detail.liquid`
**Description:** Add first accordion with three cards showing product specs with icons
**Figma Reference:** Node 206-314, 206-320
**Location:** Before Price Breakup accordion

**Changes Required:**
1. Add new accordion item in Liquid (see implementation guide Step 2.5)
2. Three cards layout:
   - Total Weight (gross_weight metafield) - magic-star icon
   - Metal Details (option1 + option2 + metal_weight) - magicpen icon
   - Diamond Details (LAB GROWN text + diamond_in_ct) - ai-tools icon
3. Add CSS for three-column card layout
4. Add data attributes for dynamic updates

**Assets Needed:**
- `magic-star-icon.svg`
- `magic-pen-icon.svg`
- `magic-hammer-icon.svg` (ai-tools)

**Success Criteria:**
- Accordion appears first (before Price Breakup)
- Three cards display side-by-side
- Icons show correctly
- Border separates cards
- Values update when variant changes
- Matches Figma design exactly

---

### Task 2.2: Implement Metal Type Image Swatches
**Status:** `[ ]`
**Priority:** HIGH
**File:** `sections/custom-product-detail.liquid`
**Lines:** 126-159
**Description:** Replace text labels with circular image swatches for metal types
**Figma Reference:** Node 206-285-289

**Changes Required:**
1. Update Liquid template with case statement (see implementation guide Step 2.2)
2. Map variant option values to hardcoded images:
   - "Yellow Gold" → `image-yellow-gold.png`
   - "Rose Gold" → `image-rose-gold.png`
   - "White Gold" → `image-white-gold.png`
3. Update CSS for circular image swatches (32×32px)
4. Add selected state border (0.8px solid #183754)

**Assets Used:**
- `assets/custom-product-detail/image/image-yellow-gold.png`
- `assets/custom-product-detail/image/image-rose-gold.png`
- `assets/custom-product-detail/image/image-white-gold.png`

**Success Criteria:**
- Images display in circular swatches
- Selected state shows border
- Click switches between options
- Matches Figma node 206-285

---

### Task 2.3: Add Quantity Selector
**Status:** `[ ]`
**Priority:** HIGH
**File:** `sections/custom-product-detail.liquid`
**Location:** After size selection, before divider
**Description:** Add quantity stepper with - / number / + buttons
**Figma Reference:** Node 206-306-312

**Changes Required:**
1. Add HTML structure (see implementation guide Step 2.3)
2. Add CSS styling:
   - Button size: 42×42px
   - Background: #f1f1f1
   - Font size: 20px
   - Buttons flush together (no gap)
3. Add JavaScript functionality:
   - Increment/decrement
   - Minimum value: 1
   - Update hidden form input

**Success Criteria:**
- Three buttons display (-, 1, +)
- Buttons are 42×42px each
- Click increments/decrements value
- Minimum value enforced (1)
- Matches Figma design

---

### Task 2.4: Convert Size Selection to Dropdown
**Status:** `[ ]`
**Priority:** MEDIUM
**File:** `sections/custom-product-detail.liquid`
**Lines:** ~161-186
**Description:** Replace size buttons with dropdown
**Figma Reference:** Node 206-296-300

**Changes Required:**
1. Replace button group with dropdown
2. Dropdown specs:
   - Width: 88px
   - Height: 42px
   - Background: #f1f1f1
   - Font size: 18px
   - Show down arrow icon
3. Keep "Size Guide" link on right

**Success Criteria:**
- Shows as dropdown (not buttons)
- Displays current size value
- Arrow icon on right side
- Size Guide link remains visible
- Matches Figma exactly

---

## 🟡 PHASE 3: MISSING ACCORDIONS

### Task 3.1: Convert Product Description to Accordion
**Status:** `[ ]`
**Priority:** MEDIUM
**File:** `sections/custom-product-detail.liquid`
**Lines:** ~200-239
**Description:** Wrap Product Description in accordion structure
**Figma Reference:** Node 206-390-431

**Changes Required:**
1. Add accordion header with toggle
2. Wrap existing content in accordion body
3. Keep feature cards inside accordion content
4. Make sure it's collapsed by default (unlike current)

**Success Criteria:**
- Product Description is collapsible
- Contains description text + feature cards
- Opens/closes on click
- Collapsed by default

---

### Task 3.2: Add Icons to Feature Cards
**Status:** `[ ]`
**Priority:** MEDIUM
**File:** `sections/custom-product-detail.liquid`
**Lines:** ~208-238
**Description:** Add icons to the three feature cards
**Figma Reference:** Node 206-396-431

**Changes Required:**
1. Add icon images above titles for each card:
   - Sparkle That Lasts - magic-star icon
   - Crafted With Care - magicpen icon
   - Make It Yours - ai-tools icon
2. Update CSS for icon sizing (28×28px)
3. Update block settings to accept icon uploads

**Assets Used:**
- Same icons as Product Details cards

**Success Criteria:**
- Icons display above titles
- Icon size: 28×28px
- 8px gap below icon
- Matches Figma layout

---

### Task 3.3: Add Certification of Authenticity Accordion
**Status:** `[ ]`
**Priority:** MEDIUM
**File:** `sections/custom-product-detail.liquid`
**Location:** After custom block accordions
**Description:** Add accordion showing certification text
**Figma Reference:** Node 206-432-437

**Changes Required:**
1. Add accordion item (see implementation guide Step 2.6 - item #5)
2. Display metafield: `product.metafields.custom.certifications_of_authenticity`
3. Show as simple text (not rich text)
4. Example: "Gold, VS | IGI Certified"

**Success Criteria:**
- Accordion appears in correct order
- Shows certification text from metafield
- Toggles open/close
- Matches Figma styling

---

### Task 3.4: Add Book your Appointment Accordion
**Status:** `[ ]`
**Priority:** MEDIUM
**File:** `sections/custom-product-detail.liquid`
**Location:** After Certification accordion
**Description:** Add appointment booking accordion with button
**Figma Reference:** Node 206-438-447

**Changes Required:**
1. Add hardcoded accordion (see implementation guide Step 2.6 - item #6)
2. Content:
   - Heading: "Book an Appointment Today"
   - Description paragraph (from Figma)
   - "Book Now" button (dark background #183754)
3. Add section setting for appointment booking URL
4. Button links to setting URL or disabled if empty

**Success Criteria:**
- Accordion shows correct content
- "Book Now" button styled correctly
- Links to URL from section settings
- Matches Figma design

---

### Task 3.5: Add Craft and Care Instructions Accordion
**Status:** `[ ]`
**Priority:** MEDIUM
**File:** `sections/custom-product-detail.liquid`
**Location:** Last accordion
**Description:** Add rich text accordion for care instructions
**Figma Reference:** Node 206-448-450

**Changes Required:**
1. Add accordion item (see implementation guide Step 2.6 - item #7)
2. Display metafield: `product.metafields.custom.craft_and_care_instructions`
3. Use rich text wrapper class
4. Collapsed by default

**Success Criteria:**
- Last accordion in list
- Shows rich text from metafield
- Renders HTML properly
- Toggles open/close

---

## 🟢 PHASE 4: STYLING & REFINEMENT

### Task 4.1: Update Price Breakup Table Styling
**Status:** `[ ]`
**Priority:** LOW
**File:** `assets/section-custom-product-detail.css`
**Description:** Match exact Figma styling for price table
**Figma Reference:** Node 206-363

**Changes Required:**
1. Cell padding: exactly 10px
2. Border: 1px solid #cbcbcb (all sides)
3. Label column: font-weight 400, color #3e6282
4. Value column: font-weight 500, color #3e6282
5. Total row value: color #183754 (darker)
6. Line height: 1.2 throughout

**Success Criteria:**
- Table matches Figma pixel-perfect
- All borders aligned
- Font weights correct
- Colors exact

---

### Task 4.2: Verify Accordion Arrow Rotation
**Status:** `[ ]`
**Priority:** LOW
**File:** `assets/section-custom-product-detail.js`
**Description:** Ensure arrows rotate 180° when accordion opens

**Changes Required:**
1. Verify CSS transition exists
2. Test rotation on all accordions
3. Ensure smooth animation (0.3s ease)

**Success Criteria:**
- Arrows point down when closed
- Arrows point up when open
- Smooth rotation animation

---

### Task 4.3: Verify Three-Column Layout Spacing
**Status:** `[ ]`
**Priority:** LOW
**File:** `assets/section-custom-product-detail.css`
**Description:** Verify exact spacing matches design tokens

**Measurements to Check:**
- Column gap: 34px
- Thumbnail gap: 16px
- Section gap: 48px
- Main image: 500×800px
- Thumbnails: 40×40px

**Success Criteria:**
- All measurements match tokens exactly
- Layout matches Figma

---

### Task 4.4: Test Sticky Behavior
**Status:** `[ ]`
**Priority:** LOW
**File:** `assets/section-custom-product-detail.js`
**Description:** Verify sticky columns work correctly

**Test Cases:**
1. Thumbnails stick until bottom of info column
2. Main image sticks until bottom of info column
3. No overlapping issues
4. Works on different screen heights

**Success Criteria:**
- Sticky behavior works as designed
- No visual glitches

---

### Task 4.5: Test Wishlist Functionality
**Status:** `[ ]`
**Priority:** LOW
**File:** `assets/section-custom-product-detail.js`
**Description:** Test wishlist localStorage persistence

**Test Cases:**
1. Click wishlist button
2. Verify localStorage saves product ID
3. Refresh page - button should stay active
4. Click again - should remove from wishlist
5. Test GSAP animation

**Success Criteria:**
- Wishlist persists across sessions
- Animation plays smoothly
- Background color changes correctly

---

## 📝 Additional Tasks (If Needed)

### Task X.1: Add Short Description Display
**Status:** `[ ]`
**Priority:** LOW
**File:** `sections/custom-product-detail.liquid`
**Description:** Display short description metafield if populated

**Changes Required:**
```liquid
{% if product.metafields.custom.short_description != blank %}
  <p class="custom-product-detail__description">
    {{ product.metafields.custom.short_description }}
  </p>
{% endif %}
```

**Success Criteria:**
- Shows when metafield has value
- Hidden when empty
- Positioned between title and price

---

### Task X.2: Fix Related Products Section Error
**Status:** `[ ]`
**Priority:** LOW
**File:** `assets/section-custom-product-detail.js`
**Description:** Fix console error for related products section

**Issue:**
```
❌ No product data found for section: template--25261160595729__related-products
```

**Success Criteria:**
- No console error
- Related products section works (if applicable)

---

## 📊 Progress Tracking

**Total Tasks:** 24
**Completed:** 0
**In Progress:** 0
**Remaining:** 24

**Phase 1 (Critical):** 0/3
**Phase 2 (Major Components):** 0/5
**Phase 3 (Accordions):** 0/5
**Phase 4 (Refinement):** 0/5
**Additional:** 0/2

---

## 🚦 Next Task to Execute

**TASK 1.1: Remove Judge.me Integration Error**

Waiting for user approval to begin...

---

## 📅 Task Execution Log

| Date | Task | Status | Notes |
|------|------|--------|-------|
| - | - | - | Awaiting start |

---

**Notes:**
- Each task includes specific file paths and line numbers
- Success criteria are clearly defined
- Tasks are ordered by priority and dependency
- User must approve each task before proceeding to next
