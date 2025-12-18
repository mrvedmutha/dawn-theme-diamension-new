# Task 3.5: Craft and Care Instructions Accordion

**Status:** ✅ COMPLETED
**Date:** 2025-12-18

---

## Changes

### Liquid - Care Instructions Accordion
**File:** `sections/custom-product-detail.liquid` (lines 565-580)

Added last accordion:
- Title: "Craft and Care Instructions"
- Content: `product.metafields.custom.craft_and_care_instructions`
- Rich text wrapper class for HTML rendering
- Collapsed by default
- Only shows if metafield has value

---

## Test Checklist

- [ ] Last accordion in list
- [ ] Shows rich text from metafield
- [ ] Renders HTML properly
- [ ] Toggles open/close
- [ ] Collapsed by default
