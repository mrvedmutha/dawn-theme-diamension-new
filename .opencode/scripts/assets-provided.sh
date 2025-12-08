#!/bin/bash
# scripts/assets-provided.sh

SECTION_NAME=$1
ASSET_NAME=$2

if [ "$ASSET_NAME" = "--all" ]; then
  # Mark all as provided
  sqlite3 .opencoder/state/workflow.db "UPDATE assets SET provided = true WHERE project_id = (SELECT id FROM projects WHERE section_name = '$SECTION_NAME');"
else
  # Mark specific asset as provided
  sqlite3 .opencoder/state/workflow.db "UPDATE assets SET provided = true WHERE asset_name = '$ASSET_NAME' AND project_id = (SELECT id FROM projects WHERE section_name = '$SECTION_NAME');"
fi

# Check if all assets now provided
REMAINING=$(sqlite3 .opencoder/state/workflow.db "SELECT COUNT(*) FROM assets WHERE project_id = (SELECT id FROM projects WHERE section_name = '$SECTION_NAME') AND required = true AND provided = false;")

if [ "$REMAINING" -eq 0 ]; then
  echo "✅ All assets provided for $SECTION_NAME"
  echo "🔄 Resuming development phase..."
  opencoder resume $SECTION_NAME
else
  echo "⏳ Still waiting for $REMAINING assets"
fi