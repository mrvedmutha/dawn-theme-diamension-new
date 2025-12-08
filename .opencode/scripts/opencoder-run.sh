#!/bin/bash

# .opencode/scripts/opencoder-run.sh
# Main orchestrator script for OpenCoder multi-agent workflow

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"

# Database path
DB_PATH="$PROJECT_ROOT/.opencoder/state/workflow.db"

# Helper functions
log_info() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

log_phase() {
  echo -e "${MAGENTA}[PHASE]${NC} $1"
}

check_database() {
  if [ ! -f "$DB_PATH" ]; then
    log_error "Database not found at $DB_PATH"
    log_info "Run: sqlite3 $DB_PATH < .opencoder/state/schema.sql"
    exit 1
  fi
}

section_exists() {
  local section="$1"
  local count=$(sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM projects WHERE section_name = '$section';")
  if [ "$count" -eq 0 ]; then
    log_error "Section '$section' not found. Available sections:"
    sqlite3 "$DB_PATH" "SELECT section_name FROM projects ORDER BY section_name;" | sed 's/^/  - /'
    exit 1
  fi
}

get_project_id() {
  sqlite3 "$DB_PATH" "SELECT id FROM projects WHERE section_name = '$1';"
}

# Main command dispatcher
case "$1" in
  # ─────────────────────────────────────────────────────────────
  # RUN: Execute agent workflow
  # ─────────────────────────────────────────────────────────────
  run)
    PHASE="$2"
    SECTION="$3"
    
    if [ -z "$PHASE" ] || [ -z "$SECTION" ]; then
      echo "Usage: $0 run <phase> <section> [args...]"
      echo "Phases: planner, developer, tester, integrator"
      exit 1
    fi
    
    check_database
    
    case "$PHASE" in
      # ─────────────────────────────────────────────────────────
      # PLANNER
      # ─────────────────────────────────────────────────────────
      planner)
        FigmaURL="$4"
        if [ -z "$FigmaURL" ]; then
          log_error "Figma URL required"
          echo "Usage: $0 run planner <section> <figma_url>"
          exit 1
        fi
        
        log_phase "Starting Planner Agent for $SECTION"
        log_info "Extracting design from $FigmaURL"
        
        # Check if project already exists
        EXISTS=$(sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM projects WHERE section_name = '$SECTION';")
        if [ "$EXISTS" -eq 0 ]; then
          sqlite3 "$DB_PATH" "INSERT INTO projects (section_name, figma_url, current_phase, status) VALUES ('$SECTION', '$FigmaURL', 'planning', 'in-progress');"
        else
          sqlite3 "$DB_PATH" "UPDATE projects SET current_phase = 'planning', status = 'in-progress', figma_url = '$FigmaURL', updated_at = CURRENT_TIMESTAMP WHERE section_name = '$SECTION';"
        fi
        
        PROJECT_ID=$(get_project_id "$SECTION")
        
        # Log phase start
        sqlite3 "$DB_PATH" "INSERT INTO phases (project_id, phase_name, agent_used, model_used, result) VALUES ($PROJECT_ID, 'planning', 'planner', 'kimi-k2', 'in-progress');"
        
        # Execute planner agent (OpenCoder command)
        # This will read from agents/planner.md and execute
        log_info "Running OpenCoder with planner agent..."
        
        # OpenCoder would be called here to execute the planner
        # Example: opencoder execute planner --section $SECTION --figma-url $FigmaURL
        
        # After completion (success):
        sqlite3 "$DB_PATH" "UPDATE phases SET result = 'success' WHERE project_id = $PROJECT_ID AND phase_name = 'planning' ORDER BY timestamp DESC LIMIT 1;"
        sqlite3 "$DB_PATH" "UPDATE projects SET current_phase = 'awaiting-assets', updated_at = CURRENT_TIMESTAMP WHERE section_name = '$SECTION';"
        
        # Log completion
        log_success "Planning complete for $SECTION"
        log_info "Next: Check for asset requirements"
        
        # Run status to show asset requirements
        "$SCRIPT_DIR/status.sh" "$SECTION"
        ;;
        
      # ─────────────────────────────────────────────────────────
      # DEVELOPER
      # ─────────────────────────────────────────────────────────
      developer)
        section_exists "$SECTION"
        PROJECT_ID=$(get_project_id "$SECTION")
        
        # Check if assets are all provided
        MISSING=$(sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM assets WHERE project_id = $PROJECT_ID AND required = true AND provided = false;")
        
        if [ "$MISSING" -gt 0 ]; then
          log_error "Cannot start development: $MISSING assets still required"
          log_info "Upload assets and run: $0 assets provided $SECTION --all"
          "$SCRIPT_DIR/status.sh" "$SECTION"
          exit 1
        fi
        
        log_phase "Starting Developer Agent for $SECTION"
        sqlite3 "$DB_PATH" "UPDATE projects SET current_phase = 'development', status = 'in-progress', updated_at = CURRENT_TIMESTAMP WHERE section_name = '$SECTION';"
        sqlite3 "$DB_PATH" "INSERT INTO phases (project_id, phase_name, agent_used, model_used, result) VALUES ($PROJECT_ID, 'development', 'developer', 'claude-sonnet-3-5', 'in-progress');"
        
        # Execute developer agent
        log_info "Running OpenCoder with developer agent..."
        
        # After completion:
        sqlite3 "$DB_PATH" "UPDATE phases SET result = 'success' WHERE project_id = $PROJECT_ID AND phase_name = 'development' ORDER BY timestamp DESC LIMIT 1;"
        sqlite3 "$DB_PATH" "UPDATE projects SET current_phase = 'testing', updated_at = CURRENT_TIMESTAMP WHERE section_name = '$SECTION';"
        
        log_success "Development complete for $SECTION"
        log_info "Next: Automated testing"
        ;;
        
      # ─────────────────────────────────────────────────────────
      # TESTER
      # ─────────────────────────────────────────────────────────
      tester)
        section_exists "$SECTION"
        PROJECT_ID=$(get_project_id "$SECTION")
        
        log_phase "Starting Tester Agent for $SECTION"
        sqlite3 "$DB_PATH" "UPDATE projects SET current_phase = 'testing', status = 'in-progress', updated_at = CURRENT_TIMESTAMP WHERE section_name = '$SECTION';"
        sqlite3 "$DB_PATH" "INSERT INTO phases (project_id, phase_name, agent_used, model_used, result) VALUES ($PROJECT_ID, 'testing', 'tester', 'claude-sonnet-3-5', 'in-progress');"
        
        # Execute tester agent
        log_info "Running OpenCoder with tester agent..."
        
        # Check test results
        TEST_RESULT=$(sqlite3 "$DB_PATH" "SELECT result FROM test_results WHERE project_id = $PROJECT_ID ORDER BY timestamp DESC LIMIT 1;")
        
        if [ "$TEST_RESULT" = "passed" ]; then
          log_success "All tests passed for $SECTION"
          sqlite3 "$DB_PATH" "UPDATE phases SET result = 'success' WHERE project_id = $PROJECT_ID AND phase_name = 'testing' ORDER BY timestamp DESC LIMIT 1;"
          sqlite3 "$DB_PATH" "UPDATE projects SET current_phase = 'manual-review', status = 'passed', updated_at = CURRENT_TIMESTAMP WHERE section_name = '$SECTION';"
          
          echo ""
          echo "═══════════════════════════════════════════════════════════"
          echo "✅ TESTS PASSED: $SECTION"
          echo "═══════════════════════════════════════════════════════════"
          echo "Next: Manual testing required"
          echo "→ shopify theme dev"
          echo "→ Test on http://localhost:9292"
          echo ""
          echo "When ready: $0 approve manual-testing $SECTION"
          echo "═══════════════════════════════════════════════════════════"
        else
          log_error "Tests failed for $SECTION"
          sqlite3 "$DB_PATH" "UPDATE phases SET result = 'failure' WHERE project_id = $PROJECT_ID AND phase_name = 'testing' ORDER BY timestamp DESC LIMIT 1;"
          sqlite3 "$DB_PATH" "UPDATE projects SET status = 'failed', updated_at = CURRENT_TIMESTAMP WHERE section_name = '$SECTION';"
          
          echo ""
          echo "═══════════════════════════════════════════════════════════"
          echo "❌ TESTS FAILED: $SECTION"
          echo "═══════════════════════════════════════════════════════════"
          echo "Review issues: issues/${SECTION}-*.md"
          echo "Rollback: $0 rollback $SECTION development"
          echo "Fix and resume: $0 resume $SECTION"
          echo "═══════════════════════════════════════════════════════════"
        fi
        
        "$SCRIPT_DIR/status.sh" "$SECTION"
        ;;
        
      # ─────────────────────────────────────────────────────────
      # INTEGRATOR
      # ─────────────────────────────────────────────────────────
      integrator)
        section_exists "$SECTION"
        PROJECT_ID=$(get_project_id "$SECTION")
        
        # Check for manual approval
        APPROVED=$(sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM approvals WHERE project_id = $PROJECT_ID AND approval_type = 'manual-testing';")
        
        if [ "$APPROVED" -eq 0 ]; then
          log_error "Manual approval required before deployment"
          echo "Run: $0 approve manual-testing $SECTION"
          exit 1
        fi
        
        log_phase "Starting Integrator Agent for $SECTION"
        sqlite3 "$DB_PATH" "UPDATE projects SET current_phase = 'integration', status = 'in-progress', updated_at = CURRENT_TIMESTAMP WHERE section_name = '$SECTION';"
        sqlite3 "$DB_PATH" "INSERT INTO phases (project_id, phase_name, agent_used, model_used, result) VALUES ($PROJECT_ID, 'integration', 'integrator', 'claude-3-5-haiku', 'in-progress');"
        
        # Execute integrator agent
        log_info "Running OpenCoder with integrator agent..."
        log_info "Creating git commit and tagging..."
        
        # Create tag
        "$SCRIPT_DIR/create-tag.sh" "$SECTION" "integration"
        
        # After deployment:
        sqlite3 "$DB_PATH" "UPDATE phases SET result = 'success' WHERE project_id = $PROJECT_ID AND phase_name = 'integration' ORDER BY timestamp DESC LIMIT 1;"
        sqlite3 "$DB_PATH" "UPDATE projects SET current_phase = 'deployed', status = 'approved', updated_at = CURRENT_TIMESTAMP WHERE section_name = '$SECTION';"
        
        log_success "Integration complete for $SECTION"
        log_info "Deployed to unpublished theme"
        
        # Show status and next steps
        "$SCRIPT_DIR/status.sh" "$SECTION"
        
        echo ""
        echo "═══════════════════════════════════════════════════════════"
        echo "🚀 DEPLOYED: $SECTION"
        echo "═══════════════════════════════════════════════════════════"
        echo "Deployed to unpublished theme."
        echo "Next: Test unpublished theme and approve for live:"
        echo "$0 approve deployment $SECTION --type live --theme-id <theme-id>"
        echo "═══════════════════════════════════════════════════════════"
        ;;
        
      *)
        log_error "Unknown phase: $PHASE"
        echo "Available phases: planner, developer, tester, integrator"
        exit 1
        ;;
    esac
    ;;
    
  # ─────────────────────────────────────────────────────────────
  # APPROVE: Manual approval commands
  # ─────────────────────────────────────────────────────────────
  approve)
    APPROVAL_TYPE="$2"
    SECTION="$3"
    
    if [ -z "$APPROVAL_TYPE" ] || [ -z "$SECTION" ]; then
      echo "Usage: $0 approve <type> <section> [args...]"
      echo "Types: manual-testing, deployment"
      exit 1
    fi
    
    check_database
    section_exists "$SECTION"
    PROJECT_ID=$(get_project_id "$SECTION")
    
    case "$APPROVAL_TYPE" in
      # ─────────────────────────────────────────────────────────
      # MANUAL-TESTING APPROVAL
      # ─────────────────────────────────────────────────────────
      manual-testing)
        # Check current phase
        PHASE=$(sqlite3 "$DB_PATH" "SELECT current_phase FROM projects WHERE section_name = '$SECTION';")
        
        if [ "$PHASE" != "manual-review" ]; then
          log_error "Cannot approve: current phase is '$PHASE', expected 'manual-review'"
          exit 1
        fi
        
        log_info "Recording manual testing approval for $SECTION"
        
        sqlite3 "$DB_PATH" "INSERT INTO approvals (project_id, approval_type, approved_by, approval_command) VALUES ($PROJECT_ID, 'manual-testing', 'human', '$0 $*');"
        
        # Transition to integration phase
        sqlite3 "$DB_PATH" "UPDATE projects SET current_phase = 'integration', status = 'approved', updated_at = CURRENT_TIMESTAMP WHERE section_name = '$SECTION';"
        
        log_success "Manual testing approved for $SECTION"
        log_info "Starting integration phase..."
        
        # Auto-start integrator
        "$0" run integrator "$SECTION"
        ;;
        
      # ─────────────────────────────────────────────────────────
      # DEPLOYMENT APPROVAL
      # ─────────────────────────────────────────────────────────
      deployment)
        TYPE="$4"
        THEME_ID="$6"
        
        if [ -z "$TYPE" ]; then
          echo "Usage: $0 approve deployment $SECTION --type <unpublished|live> --theme-id <id>"
          exit 1
        fi
        
        if [ "$TYPE" != "unpublished" ] && [ "$TYPE" != "live" ]; then
          log_error "Invalid deployment type: $TYPE"
          echo "Must be 'unpublished' or 'live'"
          exit 1
        fi
        
        if [ "$TYPE" = "live" ] && [ -z "$THEME_ID" ]; then
          log_error "Theme ID required for live deployment"
          exit 1
        fi
        
        # Check current phase
        PHASE=$(sqlite3 "$DB_PATH" "SELECT current_phase FROM projects WHERE section_name = '$SECTION';")
        
        if [ "$PHASE" != "integration" ] && [ "$PHASE" != "deployed" ]; then
          log_error "Cannot deploy: current phase is '$PHASE', expected 'integration' or 'deployed'"
          exit 1
        fi
        
        log_info "Recording deployment approval for $SECTION to $TYPE theme"
        
        sqlite3 "$DB_PATH" "INSERT INTO approvals (project_id, approval_type, approved_by, approval_command) VALUES ($PROJECT_ID, 'deployment', 'human', '$0 $*');"
        
        # Execute deployment
        if [ "$TYPE" = "unpublished" ]; then
          log_info "Deploying to unpublished theme..."
          # shopify theme push --unpublished
          THEME_ID="123456789"  # Would get from Shopify CLI
          DEPLOY_URL="https://admin.shopify.com/store/.../themes/$THEME_ID/editor"
        else
          log_info "Deploying to LIVE theme $THEME_ID..."
          # shopify theme push --theme $THEME_ID
          DEPLOY_URL="https://admin.shopify.com/store/.../themes/$THEME_ID/editor"
        fi
        
        # Record deployment
        sqlite3 "$DB_PATH" "INSERT INTO deployments (project_id, theme_type, theme_id, deployment_url) VALUES ($PROJECT_ID, '$TYPE', '$THEME_ID', '$DEPLOY_URL');"
        
        # Update project
        sqlite3 "$DB_PATH" "UPDATE projects SET current_phase = 'deployed', status = 'approved', updated_at = CURRENT_TIMESTAMP WHERE section_name = '$SECTION';"
        
        # Create tag
        "$SCRIPT_DIR/create-tag.sh" "$SECTION" "deployed-$TYPE"
        
        log_success "Deployed $SECTION to $TYPE theme"
        log_info "URL: $DEPLOY_URL"
        
        "$SCRIPT_DIR/status.sh" "$SECTION"
        ;;
        
      *)
        log_error "Unknown approval type: $APPROVAL_TYPE"
        echo "Types: manual-testing, deployment"
        exit 1
        ;;
    esac
    ;;
    
  # ─────────────────────────────────────────────────────────────
  # ASSETS: Asset management
  # ─────────────────────────────────────────────────────────────
  assets)
    ACTION="$2"
    SECTION="$3"
    ASSET_NAME="$5"
    
    if [ -z "$ACTION" ] || [ -z "$SECTION" ]; then
      echo "Usage: $0 assets <action> <section> [--asset <name>]"
      echo "Actions: status, provided"
      exit 1
    fi
    
    check_database
    section_exists "$SECTION"
    PROJECT_ID=$(get_project_id "$SECTION")
    
    case "$ACTION" in
      # ─────────────────────────────────────────────────────────
      # ASSET STATUS
      # ─────────────────────────────────────────────────────────
      status)
        "$SCRIPT_DIR/status.sh" "$SECTION"
        ;;
        
      # ─────────────────────────────────────────────────────────
      # MARK AS PROVIDED
      # ─────────────────────────────────────────────────────────
      provided)
        if [ "$4" = "--all" ]; then
          # Mark all assets as provided
          sqlite3 "$DB_PATH" "UPDATE assets SET provided = true WHERE project_id = $PROJECT_ID AND required = true;"
          log_success "Marked all assets as provided for $SECTION"
        elif [ "$4" = "--asset" ] && [ -n "$ASSET_NAME" ]; then
          # Mark specific asset as provided
          sqlite3 "$DB_PATH" "UPDATE assets SET provided = true WHERE project_id = $PROJECT_ID AND asset_name = '$ASSET_NAME';"
          log_success "Marked asset '$ASSET_NAME' as provided for $SECTION"
        else
          log_error "Invalid arguments"
          echo "Usage: $0 assets provided $SECTION --all"
          echo "       $0 assets provided $SECTION --asset <asset_name>"
          exit 1
        fi
        
        # Check if all assets are now provided
        MISSING=$(sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM assets WHERE project_id = $PROJECT_ID AND required = true AND provided = false;")
        
        if [ "$MISSING" -eq 0 ]; then
          log_success "All assets provided for $SECTION"
          log_info "Starting development phase..."
          
          # Auto-advance to development
          "$0" run developer "$SECTION"
        else
          log_info "Still waiting for $MISSING assets"
          "$SCRIPT_DIR/status.sh" "$SECTION"
        fi
        ;;
        
      *)
        log_error "Unknown asset action: $ACTION"
        echo "Actions: status, provided"
        exit 1
        ;;
    esac
    ;;
    
  # ─────────────────────────────────────────────────────────────
  # RESUME: Resume after fix
  # ─────────────────────────────────────────────────────────────
  resume)
    SECTION="$2"
    
    if [ -z "$SECTION" ]; then
      echo "Usage: $0 resume <section>"
      exit 1
    fi
    
    check_database
    section_exists "$SECTION"
    PROJECT_ID=$(get_project_id "$SECTION")
    
    # Get current phase
    PHASE=$(sqlite3 "$DB_PATH" "SELECT current_phase FROM projects WHERE section_name = '$SECTION';")
    STATUS=$(sqlite3 "$DB_PATH" "SELECT status FROM projects WHERE section_name = '$SECTION';")
    
    log_info "Resuming $SECTION from phase: $PHASE (status: $STATUS)"
    
    # Determine next action based on phase and status
    if [ "$STATUS" = "failed" ]; then
      case "$PHASE" in
        "testing")
          log_info "Re-running tests for $SECTION"
          "$0" run tester "$SECTION"
          ;;
        *)
          log_error "Cannot auto-resume from failed phase: $PHASE"
          log_info "Manual intervention required. Check issues/ folder."
          exit 1
          ;;
      esac
    else
      log_info "Current phase does not require resume"
      "$SCRIPT_DIR/status.sh" "$SECTION"
    fi
    ;;
    
  # ─────────────────────────────────────────────────────────────
  # ROLLBACK: Rollback to previous phase
  # ─────────────────────────────────────────────────────────────
  rollback)
    SECTION="$2"
    TARGET_PHASE="$3"
    
    if [ -z "$SECTION" ] || [ -z "$TARGET_PHASE" ]; then
      echo "Usage: $0 rollback <section> <target_phase>"
      echo "Phases: planning, awaiting-assets, development, testing, manual-review"
      exit 1
    fi
    
    "$SCRIPT_DIR/rollback.sh" "$SECTION" "$TARGET_PHASE"
    ;;
    
  # ─────────────────────────────────────────────────────────────
  # LOGS: View logs
  # ─────────────────────────────────────────────────────────────
  logs)
    SECTION="$2"
    
    if [ -z "$SECTION" ]; then
      echo "Usage: $0 logs <section>"
      exit 1
    fi
    
    section_exists "$SECTION"
    
    LOG_DIR="$PROJECT_ROOT/.opencoder/logs"
    if [ -f "$LOG_DIR/$SECTION.log" ]; then
      tail -f "$LOG_DIR/$SECTION.log"
    else
      log_error "No log file found for $SECTION"
      log_info "Available logs:"
      ls -la "$LOG_DIR"/*.log 2>/dev/null || echo "No log files found"
      exit 1
    fi
    ;;
    
  # ─────────────────────────────────────────────────────────────
  # STATUS: View project status
  # ─────────────────────────────────────────────────────────────
  status)
    SECTION="$2"
    
    if [ -z "$SECTION" ]; then
      # Show all projects
      check_database
      echo "═══════════════════════════════════════════════════════════"
      echo "📊 ALL PROJECTS"
      echo "═══════════════════════════════════════════════════════════"
      sqlite3 -column -header "$DB_PATH" "
      SELECT 
        section_name,
        current_phase,
        status,
        COALESCE(git_tag, 'none') as tag,
        datetime(updated_at, 'localtime') as updated
      FROM projects 
      ORDER BY updated_at DESC;
      "
    else
      # Show specific project
      "$SCRIPT_DIR/status.sh" "$SECTION"
    fi
    ;;
    
  *)
    echo "Usage: $0 <command> [args...]"
    echo ""
    echo "Commands:"
    echo "  run <phase> <section> [args]    Execute agent workflow"
    echo "                                  Phases: planner, developer, tester, integrator"
    echo "  approve <type> <section> [args] Provide manual approval"
    echo "                                  Types: manual-testing, deployment"
    echo "  assets <action> <section>       Manage assets"
    echo "                                  Actions: status, provided"
    echo "  resume <section>                Resume after fix"
    echo "  rollback <section> <phase>      Rollback to previous phase"
    echo "  logs <section>                  View logs for section"
    echo "  status [section]                View project status"
    echo ""
    echo "Examples:"
    echo "  $0 run planner header --figma https://figma.com/abc123"
    echo "  $0 run developer header"
    echo "  $0 assets provided header --all"
    echo "  $0 approve manual-testing header"
    echo "  $0 status header"
    echo "  $0 rollback header development"
    echo "  $0 logs header"
    exit 1
    ;;
esac

exit 0