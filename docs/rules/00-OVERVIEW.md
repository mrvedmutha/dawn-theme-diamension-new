# Development Rules - Overview

**Version:** 3.0.0
**Last Updated:** 2025-12-05

## Major Changes in v3.0.0
- Direct Liquid development (no prototype phase)
- Playwright-only testing (no Vitest unless needed)
- Modular documentation for token efficiency
- Minimal asset documentation

---

## Navigation Guide

### Building a New Section (Full Workflow)
Read in order:
1. [01-WORKFLOW.md](./01-WORKFLOW.md) - Complete development process
2. [02-DESIGN-EXTRACTION.md](./02-DESIGN-EXTRACTION.md) - Figma extraction
3. [03-ASSET-MANAGEMENT.md](./03-ASSET-MANAGEMENT.md) - Asset collection
4. [04-LIQUID-DEVELOPMENT.md](./04-LIQUID-DEVELOPMENT.md) - Liquid coding standards
5. [05-CSS-STANDARDS.md](./05-CSS-STANDARDS.md) - CSS, BEM, breakpoints
6. [07-TESTING.md](./07-TESTING.md) - Playwright testing

### Quick Tasks

**Just need CSS help:**
- Read: [05-CSS-STANDARDS.md](./05-CSS-STANDARDS.md)

**Just need JavaScript help:**
- Read: [06-JAVASCRIPT-STANDARDS.md](./06-JAVASCRIPT-STANDARDS.md)

**Just writing tests:**
- Read: [07-TESTING.md](./07-TESTING.md)
- Use: [templates/playwright-test.js](../templates/playwright-test.js)

**Need asset checklist:**
- Use: [templates/ASSETS-NEEDED.md](../templates/ASSETS-NEEDED.md)

**File naming questions:**
- Read: [08-NAMING-CONVENTIONS.md](./08-NAMING-CONVENTIONS.md)

**Git/deployment help:**
- Read: [09-GIT-WORKFLOW.md](./09-GIT-WORKFLOW.md)

**Quick reference/cheat sheet:**
- Read: [10-QUICK-REFERENCE.md](./10-QUICK-REFERENCE.md)

---

## File Index

| File | Purpose | Lines | When to Read |
|------|---------|-------|--------------|
| 00-OVERVIEW.md | Navigation guide | ~50 | Start here |
| 01-WORKFLOW.md | Complete workflow | ~200 | Building new section |
| 02-DESIGN-EXTRACTION.md | Figma process | ~100 | Before starting design |
| 03-ASSET-MANAGEMENT.md | Asset collection | ~150 | After Figma extraction |
| 04-LIQUID-DEVELOPMENT.md | Liquid standards | ~300 | During development |
| 05-CSS-STANDARDS.md | CSS/BEM rules | ~250 | Writing styles |
| 06-JAVASCRIPT-STANDARDS.md | JS best practices | ~150 | Writing JavaScript |
| 07-TESTING.md | Playwright testing | ~350 | Writing tests |
| 08-NAMING-CONVENTIONS.md | File naming | ~100 | Creating files |
| 09-GIT-WORKFLOW.md | Git/deployment | ~100 | Committing code |
| 10-QUICK-REFERENCE.md | Cheat sheet | ~100 | Quick lookup |

---

## Philosophy

**Token Efficiency:**
- Read only what you need
- Use templates for repetitive tasks
- More tokens for code, less for docs

**Direct Liquid Development:**
- No HTML prototypes
- Build once in Liquid
- Test with Shopify CLI (localhost:9292)

**Playwright-Only Testing:**
- Visual regression against Figma
- Functional and interaction testing
- Add Vitest only if complex JS utilities needed

---

## Core Principles

1. Extract Figma design first
2. Collect all assets before coding
3. Build directly in Liquid
4. Test with Playwright
5. Never touch core theme files
6. Use BEM methodology
7. All tests must pass before commit
