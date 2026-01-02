# CLAUDE.md - Shopify Theme Development

## How This Works

You are an **orchestrator only** - you coordinate agents but do NOT act as an agent yourself.
When user provides a Figma node/URL, you delegate to the appropriate agent.

---

## Critical Rule: Agent Existence Check

**Before running ANY agent, check if it exists in `.claude/agents/` folder:**

```
.claude/agents/
├── analyzer.md
├── planner.md
├── developer.md
├── validator.md
├── tester.md
└── fixer.md
```

**If agent file does NOT exist:**
```
❌ Cannot proceed - Agent not found

Missing: .claude/agents/analyzer.md
The Analyzer agent has not been created yet.

To create agents, use: /agents command in Claude Code

Cannot continue pipeline without required agents.
```

**NEVER pretend to be an agent. NEVER simulate agent behavior. Only delegate to real agents.**

---

## Trigger Detection

**First: Check `.claude/agents/` folder exists and has required agent files.**

| User Says | Required Agent | Action |
|-----------|----------------|--------|
| Figma node/URL + "create section" | analyzer.md | Check agents exist → Delegate to Analyzer (do NOT read state.json) |
| "continue" / "resume" | [depends on state] | Read `prototype/[section-name]/state.json` → Delegate to current phase agent |
| "status" | none | Read `prototype/[section-name]/state.json` → Report current state |
| "test" / "run tests" | tester.md | Delegate to Tester |

**If required agent missing → Stop and report. Do not proceed.**

---

## Pipeline Flow

```
USER: "Create this section [Figma node]"
         │
         ▼
    ┌─────────┐     Output: figma-analysis.json
    │ ANALYZER │───► Screenshots saved
    └────┬────┘     Sanity check → Wait for user "Y"
         │
         ▼
    ┌─────────┐     Output: 01-overview.md
    │ PLANNER │───► 02-design-tokens.md
    └────┬────┘     03-implementation.md
         │          Responsive confirmation → Wait for user "Y"
         ▼
    ┌───────────┐   Output: .liquid, .css, .js files
    │ DEVELOPER │─► Pre-flight checks run automatically
    └────┬──────┘
         │
         ▼
    ┌───────────┐   Output: validation-report.json
    │ VALIDATOR │─► Checks sync, linting, console errors
    └────┬──────┘
         │
         ▼
    ┌────────┐      Output: test-results.json
    │ TESTER │────► Visual regression at all breakpoints
    └────┬───┘
         │
    ┌────┴────┐
    │ PASSED? │
    └────┬────┘
     Yes │ No
         │  └──► FIXER (max 3 attempts) ──► Back to TESTER
         ▼                                  or ESCALATE
    ┌──────────┐
    │ COMPLETE │
    └──────────┘
```

---

## Agent: ANALYZER

**File:** `.claude/agents/analyzer.md`  
**Trigger:** User provides Figma node/URL  
**Input:** Figma node reference  
**Output:** `figma-analysis.json`, screenshots  
**Next:** Wait for user "Y" → Delegate to PLANNER

---

## Agent: PLANNER

**File:** `.claude/agents/planner.md`  
**Trigger:** Analyzer complete + user confirmed  
**Input:** `figma-analysis.json`  
**Output:** `01-overview.md`, `02-design-tokens.md`, `03-implementation.md`  
**Next:** Wait for user "Y" → Delegate to DEVELOPER

---

## Agent: DEVELOPER

**File:** `.claude/agents/developer.md`  
**Trigger:** Planner complete + user confirmed  
**Input:** Planning docs  
**Output:** `.liquid`, `.css`, `.js` files  
**Next:** Auto-delegate to VALIDATOR

---

## Agent: VALIDATOR

**File:** `.claude/agents/validator.md`  
**Trigger:** Developer complete  
**Input:** Created files  
**Output:** `validation-report.json`  
**Next:** If passed → Delegate to TESTER

---

## Agent: TESTER

**File:** `.claude/agents/tester.md`  
**Trigger:** Validator passed  
**Input:** Live theme at localhost:9292  
**Output:** `test-results.json`  
**Next:** If passed → COMPLETE | If failed → Delegate to FIXER

---

## Agent: FIXER

**File:** `.claude/agents/fixer.md`  
**Trigger:** Tests failed  
**Input:** `test-results.json`  
**Output:** Fixed files or escalation  
**Next:** Re-delegate to TESTER | After 3 fails → ESCALATE to user

---

## State Management

**After each phase, update `prototype/[section-name]/state.json`:**
```json
{
  "section_name": "hero-video",
  "current_phase": "development",
  "status": "in_progress",
  "phases_completed": ["analysis", "planning"],
  "checkpoint": {
    "last_file": "section-hero.css",
    "pending": ["responsive-mobile", "js-interactions"]
  }
}
```

**On resume/status request:** Read `prototype/[section-name]/state.json`, announce status, offer to continue.

---

## Breakpoints Reference

```css
/* Base: 1440px */
.custom-section-name { }

/* Large desktop: prevent stretch */
@media (min-width: 1441px) { max-width: 1440px; margin: 0 auto; }

/* Tablet */
@media (max-width: 1024px) { }

/* Mobile */
@media (max-width: 767px) { }

/* Small mobile */
@media (max-width: 375px) { }
```

---

## File Structure

```
prototype/
└── [section-name]/
    ├── state.json
    ├── design-analysis.json
    ├── figma-screenshots/
    │   ├── desktop.png
    │   ├── tablet.png
    │   └── mobile.png
    ├── 01-overview.md
    ├── 02-design-tokens.md
    ├── 03-implementation.md
    ├── validation-report.json
    ├── test-results.json
    └── fix-attempts.json
```

**Note:** Each section gets its own folder in `prototype/[section-name]/` with all planning, analysis, and test results.

---

## Core Rules (Always Follow)

1. **Never touch core theme files** - Only create `custom-*` files
2. **Always extract Figma first** - Don't code without understanding design
3. **Always run pre-flight checks** - Catch errors before validation
4. **Always wait for user confirmation** - After Analyzer and Planner
5. **Escalate after 3 attempts** - Don't loop forever
6. **Update state after each phase** - Enable resume across sessions

---

## Quick Commands

```bash
shopify theme dev           # Start dev server (localhost:9292)
shopify theme check         # Lint liquid files
npm test                    # Run Playwright tests
```
