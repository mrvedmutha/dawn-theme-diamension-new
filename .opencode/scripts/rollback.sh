#!/bin/bash
# scripts/rollback.sh

SECTION_NAME=$1
TARGET_PHASE=$2  # e.g., "development"

# Find last tag for that phase
LAST_TAG=$(git tag -l | grep "${SECTION_NAME}-${TARGET_PHASE}" | tail -1)

if [ -z "$LAST_TAG" ]; then
  echo "❌ No tag found for $SECTION_NAME at $TARGET_PHASE"
  exit 1
fi

# Confirm rollback
echo "🔄 Rolling back $SECTION_NAME to $LAST_TAG"
read -p "Are you sure? (y/N): " confirm

if [ "$confirm" = "y" ]; then
  # Checkout files from that tag
  git checkout $LAST_TAG -- sections/custom-section-${SECTION_NAME}.liquid
  git checkout $LAST_TAG -- assets/section-${SECTION_NAME}.css
  git checkout $LAST_TAG -- assets/section-${SECTION_NAME}.js
  git checkout $LAST_TAG -- tests/liquid/section-${SECTION_NAME}/
  
  # Reset state
  sqlite3 .opencoder/state/workflow.db "UPDATE projects SET current_phase = '$TARGET_PHASE', status = 'halted' WHERE section_name = '$SECTION_NAME';"
  
  echo "✅ Rolled back to $LAST_TAG"
  echo "📝 State updated. Run 'opencoder resume $SECTION_NAME' to continue from $TARGET_PHASE"
fi