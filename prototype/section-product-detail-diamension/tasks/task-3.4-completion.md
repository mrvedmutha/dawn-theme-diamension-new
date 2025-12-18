# Task 3.4: Book your Appointment Accordion

**Status:** ✅ COMPLETED
**Date:** 2025-12-18

---

## Changes

### 1. Liquid - Appointment Accordion
**File:** `sections/custom-product-detail.liquid` (lines 538-563)

Added accordion after Certification:
- Title: "Book your Appointment"
- Heading: "Book an Appointment Today" (16px, #183754)
- Description paragraph (16px, #3e6282)
- "Book Now" button (20px, #fffaf5 on #183754)
- Button links to section setting URL or disabled if empty

### 2. CSS - Button Styling
**File:** `assets/section-custom-product-detail.css` (lines 726-774)

- Appointment body: 16px gap
- Button: #183754 background, #fffaf5 text, 10px padding
- Hover: opacity 0.9
- Disabled: opacity 0.5

### 3. Schema - Section Setting
**File:** `sections/custom-product-detail.liquid` (lines 709-714)

Added `appointment_url` setting for booking link.

---

## Test Checklist

- [ ] Accordion displays after Certification
- [ ] Heading and text show correctly
- [ ] "Book Now" button styled correctly
- [ ] Button links to URL from settings
- [ ] Button disabled when no URL set
