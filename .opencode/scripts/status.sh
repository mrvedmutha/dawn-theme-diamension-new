#!/bin/bash

# .opencoder/scripts/status.sh

SECTION="$1"

# Check if section name provided
if [ -z "$SECTION" ]; then
  echo "Usage: .opencoder/scripts/status.sh <section_name>"
  echo "Example: .opencoder/scripts/status.sh header"
  exit 1
fi

# Check if database exists
if [ ! -f ".opencoder/state/workflow.db" ]; then
  echo "❌ Error: Database not found at .opencoder/state/workflow.db"
  echo "Run: sqlite3 .opencoder/state/workflow.db < .opencoder/state/schema.sql"
  exit 1
fi

# Check if section exists in database
EXISTS=$(sqlite3 .opencoder/state/workflow.db "SELECT COUNT(*) FROM projects WHERE section_name = '$SECTION';")
if [ "$EXISTS" -eq 0 ]; then
  echo "❌ Error: Section '$SECTION' not found in database"
  echo "Available sections:"
  sqlite3 .opencoder/state/workflow.db "SELECT section_name FROM projects ORDER BY section_name;"
  exit 1
fi

echo "═══════════════════════════════════════════════════════════"
echo "📊 PROJECT STATUS: $SECTION"
echo "═══════════════════════════════════════════════════════════"

# Project Overview
sqlite3 -column -header .opencoder/state/workflow.db "
SELECT 
  section_name,
  current_phase,
  status,
  git_tag,
  datetime(created_at, 'localtime') as created,
  datetime(updated_at, 'localtime') as updated
FROM projects 
WHERE section_name = '$SECTION';
"

echo ""
echo "📦 ASSETS STATUS:"
echo "───────────────────────────────────────────────────────────"

sqlite3 -column -header .opencoder/state/workflow.db "
SELECT 
  asset_name,
  asset_type,
  CASE WHEN provided = 1 THEN '✅' ELSE '❌' END as provided,
  COALESCE(location, 'not uploaded') as location
FROM assets 
WHERE project_id = (SELECT id FROM projects WHERE section_name = '$SECTION')
ORDER BY provided, asset_type, asset_name;
" | column -t -s '|'

echo ""
echo "🧪 LATEST TEST RESULTS:"
echo "───────────────────────────────────────────────────────────"

TEST_EXISTS=$(sqlite3 .opencoder/state/workflow.db "SELECT COUNT(*) FROM test_results WHERE project_id = (SELECT id FROM projects WHERE section_name = '$SECTION');")

if [ "$TEST_EXISTS" -gt 0 ]; then
  sqlite3 -column -header .opencoder/state/workflow.db "
  SELECT 
    result,
    CASE WHEN visual_tests_passed = 1 THEN '✅' ELSE '❌' END as visual,
    CASE WHEN functional_tests_passed = 1 THEN '✅' ELSE '❌' END as functional,
    CASE WHEN css_standards_passed = 1 THEN '✅' ELSE '❌' END as css,
    CASE WHEN js_standards_passed = 1 THEN '✅' ELSE '❌' END as js,
    datetime(timestamp, 'localtime') as tested_at
  FROM test_results 
  WHERE project_id = (SELECT id FROM projects WHERE section_name = '$SECTION')
  ORDER BY timestamp DESC LIMIT 1;
  " | column -t -s '|'
else
  echo "No test results yet"
fi

echo ""
echo "✅ APPROVALS:"
echo "───────────────────────────────────────────────────────────"

APPROVAL_EXISTS=$(sqlite3 .opencoder/state/workflow.db "SELECT COUNT(*) FROM approvals WHERE project_id = (SELECT id FROM projects WHERE section_name = '$SECTION');")

if [ "$APPROVAL_EXISTS" -gt 0 ]; then
  sqlite3 -column -header .opencoder/state/workflow.db "
  SELECT 
    approval_type,
    approved_by,
    datetime(timestamp, 'localtime') as approved_at
  FROM approvals 
  WHERE project_id = (SELECT id FROM projects WHERE section_name = '$SECTION')
  ORDER BY timestamp DESC;
  " | column -t -s '|'
else
  echo "No approvals yet"
fi

echo ""
echo "🚀 DEPLOYMENTS:"
echo "───────────────────────────────────────────────────────────"

DEPLOY_EXISTS=$(sqlite3 .opencoder/state/workflow.db "SELECT COUNT(*) FROM deployments WHERE project_id = (SELECT id FROM projects WHERE section_name = '$SECTION');")

if [ "$DEPLOY_EXISTS" -gt 0 ]; then
  sqlite3 -column -header .opencoder/state/workflow.db "
  SELECT 
    theme_type,
    theme_id,
    datetime(deployed_at, 'localtime') as deployed_at
  FROM deployments 
  WHERE project_id = (SELECT id FROM projects WHERE section_name = '$SECTION')
  ORDER BY deployed_at DESC;
  " | column -t -s '|'
else
  echo "No deployments yet"
fi

echo ""
echo "📋 PHASE HISTORY:"
echo "───────────────────────────────────────────────────────────"

sqlite3 -column -header .opencoder/state/workflow.db "
SELECT 
  phase_name,
  agent_used,
  model_used,
  result,
  COALESCE(error_message, 'none') as error,
  datetime(timestamp, 'localtime') as completed_at
FROM phases 
WHERE project_id = (SELECT id FROM projects WHERE section_name = '$SECTION')
ORDER BY timestamp DESC;
" | column -t -s '|'

echo ""
echo "═══════════════════════════════════════════════════════════"