# Diamension Dawn Theme - Development Rules

**Version:** 3.0.0
**Last Updated:** 2025-12-05

---

## 📁 Documentation is Now Modular

This file has been split into modular documentation for **better token efficiency**.

**Start here:** [`docs/rules/00-OVERVIEW.md`](docs/rules/00-OVERVIEW.md)

---

## Quick Links

### Core Rules
- [📖 Overview & Navigation](docs/rules/00-OVERVIEW.md)
- [🔄 Complete Workflow](docs/rules/01-WORKFLOW.md)
- [🎨 Design Extraction (Figma)](docs/rules/02-DESIGN-EXTRACTION.md)
- [📦 Asset Management](docs/rules/03-ASSET-MANAGEMENT.md)
- [💧 Liquid Development](docs/rules/04-LIQUID-DEVELOPMENT.md)
- [🎨 CSS Standards](docs/rules/05-CSS-STANDARDS.md)
- [⚡ JavaScript Standards](docs/rules/06-JAVASCRIPT-STANDARDS.md)
- [🧪 Testing (Playwright)](docs/rules/07-TESTING.md)
- [📝 Naming Conventions](docs/rules/08-NAMING-CONVENTIONS.md)
- [🔀 Git Workflow](docs/rules/09-GIT-WORKFLOW.md)
- [⚡ Quick Reference](docs/rules/10-QUICK-REFERENCE.md)

### Templates
- [Playwright Test Template](docs/templates/playwright-test.js)
- [Section Schema Template](docs/templates/section-schema.liquid)
- [Assets Checklist Template](docs/templates/ASSETS-NEEDED.md)

---

## Major Changes in v3.0.0

### ✅ Direct Liquid Development
- No HTML/CSS/JS prototype phase
- Build directly in Liquid
- Test with `shopify theme dev` (localhost:9292)
- **50% faster, 50% token savings**

### ✅ Playwright-Only Testing
- Visual regression against Figma
- Functional and interaction testing
- Add Vitest only if complex JS utilities needed

### ✅ Modular Documentation
- Read only what you need
- Token-efficient approach
- More tokens for code, less for docs

### ✅ Minimal Asset Documentation
- Simple checklists
- Just file names, no explanations

---

## Quick Start

### Building a New Section

1. **Read:**
   - [01-WORKFLOW.md](docs/rules/01-WORKFLOW.md)
   - [04-LIQUID-DEVELOPMENT.md](docs/rules/04-LIQUID-DEVELOPMENT.md)
   - [05-CSS-STANDARDS.md](docs/rules/05-CSS-STANDARDS.md)
   - [07-TESTING.md](docs/rules/07-TESTING.md)

2. **Use Templates:**
   - Copy `docs/templates/section-schema.liquid`
   - Copy `docs/templates/playwright-test.js`
   - Copy `docs/templates/ASSETS-NEEDED.md`

3. **Follow Workflow:**
   - Extract Figma design
   - Collect all assets
   - Build Liquid section
   - Write Playwright tests
   - Run tests: `npm test`
   - Git commit
   - Deploy to unpublished theme

---

## Core Principles

1. **Extract Figma design first** (using Figma MCP)
2. **Collect all assets before coding** (no placeholder assets)
3. **Build directly in Liquid** (no prototype conversion)
4. **Test with Playwright** (visual + functional)
5. **Never touch core theme files**
6. **Use BEM methodology** for CSS
7. **All tests must pass before commit**
8. **Test on unpublished theme first**

---

## Common Commands

```bash
# Start Shopify dev server
shopify theme dev

# Run all tests
npm test

# Run Playwright tests
npx playwright test

# Update screenshots
npx playwright test --update-snapshots

# Git commit
git commit -m "[Feature] Add header section"

# Push to unpublished theme
shopify theme push --unpublished
```

---

## File Structure

```
diamension-shopify-dawn/
├── docs/
│   ├── rules/                 # Modular documentation
│   │   ├── 00-OVERVIEW.md
│   │   ├── 01-WORKFLOW.md
│   │   ├── 02-DESIGN-EXTRACTION.md
│   │   ├── 03-ASSET-MANAGEMENT.md
│   │   ├── 04-LIQUID-DEVELOPMENT.md
│   │   ├── 05-CSS-STANDARDS.md
│   │   ├── 06-JAVASCRIPT-STANDARDS.md
│   │   ├── 07-TESTING.md
│   │   ├── 08-NAMING-CONVENTIONS.md
│   │   ├── 09-GIT-WORKFLOW.md
│   │   └── 10-QUICK-REFERENCE.md
│   │
│   └── templates/             # Code templates
│       ├── playwright-test.js
│       ├── section-schema.liquid
│       └── ASSETS-NEEDED.md
│
├── prototype/                 # Local development (not in git)
│   ├── assets/                # Global assets
│   └── [section-name]/        # Section-specific files
│       ├── design/            # Figma exports
│       └── assets/            # Section assets
│
├── sections/                  # Liquid sections
├── snippets/                  # Liquid snippets
├── assets/                    # CSS/JS files
├── tests/                     # Playwright tests
│   ├── liquid/
│   └── screenshots/figma/
│
└── DEVELOPMENT-RULES.md       # This file (pointer)
```

---

## DO ✓

- ✓ Extract Figma design first
- ✓ Collect ALL assets before coding
- ✓ Build directly in Liquid
- ✓ Write Playwright tests
- ✓ Use BEM methodology
- ✓ Create separate CSS/JS files
- ✓ Test all breakpoints
- ✓ Run tests before commit

## DON'T ✗

- ✗ Start coding without assets
- ✗ Touch core theme files
- ✗ Skip writing tests
- ✗ Commit without running tests
- ✗ Push to live without testing
- ✗ Use inline styles
- ✗ Hardcode asset paths

---

## Need Help?

**Read the relevant modular documentation file:**
- Building a section? → [01-WORKFLOW.md](docs/rules/01-WORKFLOW.md)
- CSS help? → [05-CSS-STANDARDS.md](docs/rules/05-CSS-STANDARDS.md)
- Testing? → [07-TESTING.md](docs/rules/07-TESTING.md)
- Quick lookup? → [10-QUICK-REFERENCE.md](docs/rules/10-QUICK-REFERENCE.md)

**Start with:** [`docs/rules/00-OVERVIEW.md`](docs/rules/00-OVERVIEW.md)

---

**Philosophy:** Read only what you need. More tokens for code, less for docs. Build once, test well, deploy confidently.
