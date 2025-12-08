#!/bin/bash
# scripts/create-tag.sh

SECTION_NAME=$1
PHASE=$2
VERSION=$(git describe --tags --abbrev=0 | cut -d'-' -f1)  # Gets v1.0
TIMESTAMP=$(date -u +%Y%m%dT%H%M%SZ)

TAG_NAME="${VERSION}-${SECTION_NAME}-${PHASE}-${TIMESTAMP}"

# Create tag
git tag -a "$TAG_NAME" -m "Phase: $PHASE for $SECTION_NAME"

# Push tag
git push origin "$TAG_NAME"

# Update state
sqlite3 .opencoder/state/workflow.db "UPDATE projects SET git_tag = '$TAG_NAME' WHERE section_name = '$SECTION_NAME';"

echo "✅ Created tag: $TAG_NAME"