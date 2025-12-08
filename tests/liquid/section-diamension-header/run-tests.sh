#!/bin/bash

# Diamension Header - Test Runner Script
# Runs all tests and generates comprehensive report

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BASE_URL="http://localhost:9292"
TEST_DIR="tests/liquid/section-diamension-header"
REPORT_DIR="test-results/diamension-header"
TIMESTAMP=$(date +"%Y%m%dT%H%M%SZ")

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Diamension Header - Test Suite${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if Shopify dev server is running
echo -e "${YELLOW}Checking if Shopify dev server is running...${NC}"
if curl -s --head --request GET "$BASE_URL" | grep "200 OK" > /dev/null; then 
   echo -e "${GREEN}✓ Shopify dev server is running${NC}"
else
   echo -e "${RED}✗ Shopify dev server is not running${NC}"
   echo -e "${YELLOW}Please start the dev server with: shopify theme dev${NC}"
   exit 1
fi

echo ""

# Create report directory
mkdir -p "$REPORT_DIR"

# Function to run tests and capture results
run_test_suite() {
    local suite_name=$1
    local test_pattern=$2
    local output_file="$REPORT_DIR/${suite_name}-${TIMESTAMP}.txt"
    
    echo -e "${BLUE}Running: ${suite_name}${NC}"
    
    if npx playwright test "$TEST_DIR" -g "$test_pattern" > "$output_file" 2>&1; then
        echo -e "${GREEN}✓ ${suite_name} - PASSED${NC}"
        return 0
    else
        echo -e "${RED}✗ ${suite_name} - FAILED${NC}"
        echo -e "${YELLOW}  See report: ${output_file}${NC}"
        return 1
    fi
}

# Track overall results
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Running Test Suites${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 1. Visual Regression Tests
if run_test_suite "Visual Regression" "Visual Regression"; then
    ((PASSED_TESTS++))
else
    ((FAILED_TESTS++))
fi
((TOTAL_TESTS++))
echo ""

# 2. Functional Tests - Header Structure
if run_test_suite "Header Structure" "Functional - Header Structure"; then
    ((PASSED_TESTS++))
else
    ((FAILED_TESTS++))
fi
((TOTAL_TESTS++))
echo ""

# 3. Functional Tests - Auto Mode
if run_test_suite "Auto Mode Behavior" "Functional - Auto Mode"; then
    ((PASSED_TESTS++))
else
    ((FAILED_TESTS++))
fi
((TOTAL_TESTS++))
echo ""

# 4. Functional Tests - Search Overlay
if run_test_suite "Search Overlay" "Functional - Search Overlay"; then
    ((PASSED_TESTS++))
else
    ((FAILED_TESTS++))
fi
((TOTAL_TESTS++))
echo ""

# 5. Functional Tests - Mobile Menu
if run_test_suite "Mobile Menu" "Functional - Mobile Menu"; then
    ((PASSED_TESTS++))
else
    ((FAILED_TESTS++))
fi
((TOTAL_TESTS++))
echo ""

# 6. Functional Tests - Cart
if run_test_suite "Cart" "Functional - Cart"; then
    ((PASSED_TESTS++))
else
    ((FAILED_TESTS++))
fi
((TOTAL_TESTS++))
echo ""

# 7. Functional Tests - Hover Effects
if run_test_suite "Hover Effects" "Functional - Hover Effects"; then
    ((PASSED_TESTS++))
else
    ((FAILED_TESTS++))
fi
((TOTAL_TESTS++))
echo ""

# 8. Responsive Tests
if run_test_suite "Responsive Tests" "Responsive"; then
    ((PASSED_TESTS++))
else
    ((FAILED_TESTS++))
fi
((TOTAL_TESTS++))
echo ""

# 9. JavaScript Behavior Tests
if run_test_suite "JavaScript Behavior" "JavaScript Behavior"; then
    ((PASSED_TESTS++))
else
    ((FAILED_TESTS++))
fi
((TOTAL_TESTS++))
echo ""

# 10. Console Error Checks
if run_test_suite "Console Errors" "Console Errors"; then
    ((PASSED_TESTS++))
else
    ((FAILED_TESTS++))
fi
((TOTAL_TESTS++))
echo ""

# 11. Accessibility Tests
if run_test_suite "Accessibility" "Accessibility"; then
    ((PASSED_TESTS++))
else
    ((FAILED_TESTS++))
fi
((TOTAL_TESTS++))
echo ""

# 12. Performance Tests
if run_test_suite "Performance" "Performance"; then
    ((PASSED_TESTS++))
else
    ((FAILED_TESTS++))
fi
((TOTAL_TESTS++))
echo ""

# 13. Code Standards - BEM Naming
if run_test_suite "BEM Naming Standards" "BEM Naming"; then
    ((PASSED_TESTS++))
else
    ((FAILED_TESTS++))
fi
((TOTAL_TESTS++))
echo ""

# 14. Code Standards - CSS
if run_test_suite "CSS Standards" "CSS Standards"; then
    ((PASSED_TESTS++))
else
    ((FAILED_TESTS++))
fi
((TOTAL_TESTS++))
echo ""

# 15. Code Standards - JavaScript
if run_test_suite "JavaScript Standards" "JavaScript Standards"; then
    ((PASSED_TESTS++))
else
    ((FAILED_TESTS++))
fi
((TOTAL_TESTS++))
echo ""

# 16. Code Standards - Liquid Template
if run_test_suite "Liquid Template Standards" "Liquid Template"; then
    ((PASSED_TESTS++))
else
    ((FAILED_TESTS++))
fi
((TOTAL_TESTS++))
echo ""

# Generate HTML report
echo -e "${BLUE}Generating HTML report...${NC}"
npx playwright show-report --host 127.0.0.1 &
REPORT_PID=$!

# Summary
echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Test Summary${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "Total Test Suites: ${TOTAL_TESTS}"
echo -e "${GREEN}Passed: ${PASSED_TESTS}${NC}"
echo -e "${RED}Failed: ${FAILED_TESTS}${NC}"
echo ""

# Calculate pass rate
PASS_RATE=$((PASSED_TESTS * 100 / TOTAL_TESTS))
echo -e "Pass Rate: ${PASS_RATE}%"
echo ""

# Final result
if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}✓ ALL TESTS PASSED${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "${GREEN}The Diamension Header is ready for manual review!${NC}"
    echo ""
    echo -e "${YELLOW}Next Steps:${NC}"
    echo "1. Review test results and screenshots"
    echo "2. Update state database with test results"
    echo "3. Create git tag: v1.0-diamension-header-testing-passed-${TIMESTAMP}"
    echo "4. Move to manual review phase"
    echo ""
    exit 0
else
    echo -e "${RED}========================================${NC}"
    echo -e "${RED}✗ TESTS FAILED${NC}"
    echo -e "${RED}========================================${NC}"
    echo ""
    echo -e "${RED}${FAILED_TESTS} test suite(s) failed.${NC}"
    echo ""
    echo -e "${YELLOW}Next Steps:${NC}"
    echo "1. Review failed test reports in: ${REPORT_DIR}"
    echo "2. Fix issues in code"
    echo "3. Re-run tests"
    echo "4. Create issue file with error details"
    echo ""
    exit 1
fi
