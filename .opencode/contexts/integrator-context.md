# Integrator Agent Context - Git & Deployment Rules

## Core Mission
Handle git commits and Shopify deployments with precision. Follow workflow rules exactly.

## Git Operations

### Commit Format
- **Pattern:** `[Type] Description`
- **Types:** `[Feature]`, `[Fix]`, `[Style]`, `[Refactor]`, `[Test]`
- **Example:** `[Feature] Add custom header section with tests`

### Staging Rules
**Include:**
- `sections/custom-section-{section}.liquid`
- `assets/section-{section}.css`
- `assets/section-{section}.js`
- `tests/liquid/section-{section}/`
- Config, layout, template files

**Exclude:**
- `.shopify/`, `prototype/`, `node_modules/`, `test-results/`, `*.log`

### Tagging Strategy
- **Format:** `v1.0-{section}-{phase}-{timestamp}`
- **Phases:** planning, development, testing, manual-review, integration, deployed-{type}
- **Example:** `v1.0-header-integration-20251208T140000Z`
- **Action:** Create tag after deployment, push immediately

## Shopify Deployment

### Unpublished Theme (Auto)
1. Wait for manual-testing approval in state DB
2. Create commit & tag
3. Run: `shopify theme push --unpublished`
4. Capture theme ID from output
5. Update state DB with deployment info
6. Provide admin URL to user

### Live Theme (Manual)
1. Wait for explicit `approve deployment --type live` command
2. Require `--theme-id` parameter
3. Confirm with user (print summary)
4. Run: `shopify theme push --theme <id>`
5. Update tag: `v1.0-{section}-deployed-live-{timestamp}`
6. Verify live site within 30 seconds

## State Database Queries

### Check Manual Approval
```sql
SELECT COUNT(*) FROM approvals 
WHERE project_id = (SELECT id FROM projects WHERE section_name = '{section}')
  AND approval_type = 'manual-testing';
```
If result = 0: HALT and notify user

### Log Deployment
```sql
INSERT INTO deployments (project_id, theme_type, theme_id, deployment_url)
VALUES (1, 'unpublished', '123456789', 'https://admin.shopify.com/...');

UPDATE projects SET current_phase = 'deployed' WHERE section_name = '{section}';
```

## Post-Deployment Notification
Print this exact format to terminal:
```
═══════════════════════════════════════════════════════════
✅ DEPLOYED TO UNPUBLISHED THEME: {section}
═══════════════════════════════════════════════════════════
Commit: a1b2c3d4 [Feature] Add custom {section} section with tests
Tag: v1.0-{section}-deployed-unpublished-20251208T1400Z

Test URL: https://my-store.myshopify.com/?preview_theme_id=123456789
Editor: https://admin.shopify.com/store/.../themes/123456789/editor

MANUAL TESTING CHECKLIST:
□ Test on Chrome, Firefox, Safari
□ Test all breakpoints
□ Test with real data
□ Test in theme editor
□ Verify interactions
□ No console errors
□ Get client approval

TO DEPLOY TO LIVE:
opencoder approve deployment --section {section} --type live --theme-id 123456789

TO ROLLBACK:
./scripts/rollback.sh {section} manual-review
═══════════════════════════════════════════════════════════
```

## Halt Conditions
- ❌ No manual-testing approval in state DB
- ❌ Files missing (sections/, assets/, tests/)
- ❌ Git status not clean (uncommitted changes)
- ❌ Shopify CLI not authenticated

## Success Checklist
- [ ] Commit created with proper format
- [ ] Tag created and pushed
- [ ] Only relevant files staged
- [ ] Deployed to unpublished successfully
- [ ] Deployment URL provided
- [ ] State DB updated
- [ ] Manual testing checklist displayed
- [ ] Next steps documented
