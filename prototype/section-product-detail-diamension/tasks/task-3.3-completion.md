# Task 3.3: Certification of Authenticity Accordion

**Status:** ✅ COMPLETED
**Date:** 2025-12-18

---

## Changes

### Liquid - Certification Accordion
**File:** `sections/custom-product-detail.liquid` (lines 544-559)

Added accordion after custom blocks:
- Title: "Certification of Authenticity"
- Content: `product.metafields.custom.certifications_of_authenticity`
- Simple text display (not rich text)
- Only shows if metafield has value

---

## Test Checklist

- [ ] Accordion appears after custom blocks
- [ ] Shows certification text from metafield
- [ ] Toggles open/close
- [ ] Text displays correctly (e.g., "Gold, VS | IGI Certified")
