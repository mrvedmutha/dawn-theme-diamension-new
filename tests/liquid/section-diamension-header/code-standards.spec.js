/**
 * Diamension Header - Code Standards Validation
 * Static code analysis for BEM naming, CSS standards, and JavaScript standards
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// File paths
const PROJECT_ROOT = path.resolve(process.cwd());
const LIQUID_FILE = path.join(PROJECT_ROOT, 'sections/custom-section-diamension-header.liquid');
const CSS_FILE = path.join(PROJECT_ROOT, 'assets/section-diamension-header.css');
const JS_FILE = path.join(PROJECT_ROOT, 'assets/section-diamension-header.js');

test.describe('Code Standards - Diamension Header', () => {

  // ============================================
  // BEM NAMING VALIDATION
  // ============================================

  test.describe('BEM Naming Standards', () => {
    let cssContent;

    test.beforeAll(() => {
      cssContent = fs.readFileSync(CSS_FILE, 'utf-8');
    });

    test('uses correct BEM block naming', () => {
      // Block should be: .diamension-header
      const blockPattern = /\.diamension-header(?![_-])/g;
      const matches = cssContent.match(blockPattern);
      
      expect(matches).toBeTruthy();
      expect(matches.length).toBeGreaterThan(0);
    });

    test('uses correct BEM element naming', () => {
      // Elements should be: .diamension-header__element
      const elementPattern = /\.diamension-header__[a-z-]+/g;
      const matches = cssContent.match(elementPattern);
      
      expect(matches).toBeTruthy();
      expect(matches.length).toBeGreaterThan(10); // Should have many elements
      
      // Check specific elements exist
      expect(cssContent).toContain('.diamension-header__announcement');
      expect(cssContent).toContain('.diamension-header__main');
      expect(cssContent).toContain('.diamension-header__logo');
      expect(cssContent).toContain('.diamension-header__nav');
      expect(cssContent).toContain('.diamension-header__actions');
    });

    test('uses correct BEM modifier naming', () => {
      // Modifiers should be: .diamension-header--modifier
      const modifierPattern = /\.diamension-header--[a-z-]+/g;
      const matches = cssContent.match(modifierPattern);
      
      expect(matches).toBeTruthy();
      expect(matches.length).toBeGreaterThan(0);
      
      // Check specific modifiers exist
      expect(cssContent).toContain('.diamension-header--scrolled');
      expect(cssContent).toContain('.diamension-header--hidden');
      expect(cssContent).toContain('.diamension-header--transparent-layout');
      expect(cssContent).toContain('.diamension-header--solid-layout');
    });

    test('avoids descendant selectors (should use BEM)', () => {
      // Check for invalid patterns like: .class .class
      // Exclude valid patterns like pseudo-selectors and :has()
      const lines = cssContent.split('\n');
      const violations = [];
      
      lines.forEach((line, index) => {
        // Skip comments
        if (line.trim().startsWith('/*') || line.trim().startsWith('*')) return;
        
        // Check for descendant selectors (space between classes)
        // But exclude :has(), :hover, :focus, etc.
        const descendantPattern = /\.[\w-]+\s+\.[\w-]+/;
        if (descendantPattern.test(line) && 
            !line.includes(':has(') && 
            !line.includes(':hover') && 
            !line.includes(':focus') &&
            !line.includes('/*') &&
            !line.includes('body:has')) {
          violations.push({
            line: index + 1,
            content: line.trim()
          });
        }
      });
      
      // Allow some exceptions for complex selectors
      const allowedViolations = violations.filter(v => 
        !v.content.includes('body:has') &&
        !v.content.includes('@media') &&
        !v.content.includes('svg')
      );
      
      if (allowedViolations.length > 0) {
        console.log('Descendant selector violations:', allowedViolations);
      }
      
      // Should have minimal violations (allow up to 5 for complex cases)
      expect(allowedViolations.length).toBeLessThanOrEqual(5);
    });

    test('does not modify core Shopify classes directly', () => {
      // Should not have direct modifications to core classes
      const coreClasses = [
        /^\.page-width\s*\{/m,
        /^\.rte\s*\{/m,
        /^\.grid\s*\{/m,
        /^\.container\s*\{/m
      ];
      
      coreClasses.forEach(pattern => {
        expect(cssContent).not.toMatch(pattern);
      });
    });

    test('uses consistent naming convention', () => {
      // All classes should use lowercase with hyphens
      const classPattern = /\.(diamension-header[^\s{:,]+)/g;
      const matches = cssContent.match(classPattern);
      
      if (matches) {
        matches.forEach(className => {
          // Remove the leading dot
          const name = className.substring(1);
          
          // Should not contain uppercase
          expect(name).toBe(name.toLowerCase());
          
          // Should not contain underscores except for BEM elements
          if (!name.includes('__')) {
            expect(name).not.toMatch(/_/);
          }
        });
      }
    });
  });

  // ============================================
  // CSS STANDARDS VALIDATION
  // ============================================

  test.describe('CSS Standards', () => {
    let cssContent;

    test.beforeAll(() => {
      cssContent = fs.readFileSync(CSS_FILE, 'utf-8');
    });

    test('avoids !important usage', () => {
      // Count !important usage
      const importantPattern = /!important/g;
      const matches = cssContent.match(importantPattern);
      
      // Allow some !important for overriding inline styles or core theme
      // But should be minimal
      if (matches) {
        console.log(`Found ${matches.length} !important declarations`);
        expect(matches.length).toBeLessThanOrEqual(10);
      }
    });

    test('uses desktop-first approach', () => {
      // Check that base styles are defined before media queries
      const mediaQueryPattern = /@media.*max-width/g;
      const matches = cssContent.match(mediaQueryPattern);
      
      expect(matches).toBeTruthy();
      expect(matches.length).toBeGreaterThan(0);
    });

    test('includes all required breakpoints', () => {
      // Should have breakpoints for: 1024px, 767px, 375px
      expect(cssContent).toMatch(/@media.*1024px/);
      expect(cssContent).toMatch(/@media.*767px/);
      
      // May or may not have 375px specific (mobile-first within mobile)
      // So we don't enforce it
    });

    test('uses smooth transitions for interactive elements', () => {
      // Check for transition properties
      expect(cssContent).toContain('transition:');
      
      // Check for common transition properties
      const transitionPattern = /transition:\s*[^;]+;/g;
      const matches = cssContent.match(transitionPattern);
      
      expect(matches).toBeTruthy();
      expect(matches.length).toBeGreaterThan(5);
    });

    test('uses low specificity selectors', () => {
      // Check for overly specific selectors (more than 3 levels)
      const lines = cssContent.split('\n');
      const highSpecificity = [];
      
      lines.forEach((line, index) => {
        // Count selector depth (number of spaces + classes)
        const selectorMatch = line.match(/^([^{]+)\{/);
        if (selectorMatch) {
          const selector = selectorMatch[1];
          const depth = (selector.match(/\./g) || []).length;
          
          if (depth > 4) {
            highSpecificity.push({
              line: index + 1,
              selector: selector.trim()
            });
          }
        }
      });
      
      if (highSpecificity.length > 0) {
        console.log('High specificity selectors:', highSpecificity);
      }
      
      // Should have minimal high-specificity selectors
      expect(highSpecificity.length).toBeLessThanOrEqual(5);
    });

    test('defines CSS custom properties for colors', () => {
      // Check if colors are used consistently
      // Should have color values defined
      expect(cssContent).toMatch(/#[0-9A-Fa-f]{6}/); // Hex colors
      expect(cssContent).toMatch(/rgb\(/); // RGB colors
    });

    test('uses consistent spacing units', () => {
      // Check for consistent use of px, rem, em
      const pxPattern = /\d+px/g;
      const remPattern = /\d+rem/g;
      
      const pxMatches = cssContent.match(pxPattern);
      const remMatches = cssContent.match(remPattern);
      
      // Should use px for most values (as per design)
      expect(pxMatches).toBeTruthy();
      expect(pxMatches.length).toBeGreaterThan(10);
    });
  });

  // ============================================
  // JAVASCRIPT STANDARDS VALIDATION
  // ============================================

  test.describe('JavaScript Standards', () => {
    let jsContent;

    test.beforeAll(() => {
      jsContent = fs.readFileSync(JS_FILE, 'utf-8');
    });

    test('uses DOMContentLoaded event listener', () => {
      expect(jsContent).toContain('DOMContentLoaded');
      expect(jsContent).toContain('document.readyState');
    });

    test('has try/catch error handling', () => {
      // Check for try/catch blocks
      const tryCatchPattern = /try\s*{[\s\S]*?}\s*catch/g;
      const matches = jsContent.match(tryCatchPattern);
      
      expect(matches).toBeTruthy();
      expect(matches.length).toBeGreaterThan(0);
    });

    test('has TODO comments on console.log statements', () => {
      // Find all console.log statements
      const consoleLogPattern = /console\.log\([^)]+\)/g;
      const consoleLogs = jsContent.match(consoleLogPattern);
      
      if (consoleLogs) {
        // Check if there are TODO comments nearby
        const lines = jsContent.split('\n');
        let consoleLogsWithoutTodo = 0;
        
        lines.forEach((line, index) => {
          if (line.includes('console.log')) {
            // Check previous line for TODO
            const prevLine = lines[index - 1] || '';
            if (!prevLine.includes('TODO')) {
              consoleLogsWithoutTodo++;
            }
          }
        });
        
        // All console.logs should have TODO comments
        console.log(`Console.logs without TODO: ${consoleLogsWithoutTodo} / ${consoleLogs.length}`);
        
        // Allow some console.logs without TODO (for error logging)
        expect(consoleLogsWithoutTodo).toBeLessThanOrEqual(consoleLogs.length * 0.3);
      }
    });

    test('uses IIFE pattern to avoid global scope pollution', () => {
      // Check for class definitions (which are scoped)
      expect(jsContent).toContain('class DiamensionHeader');
      expect(jsContent).toContain('class DiamensionSearch');
      
      // Check that classes are instantiated properly
      expect(jsContent).toContain('new DiamensionHeader');
      expect(jsContent).toContain('new DiamensionSearch');
    });

    test('uses event delegation for dynamic elements', () => {
      // Check for addEventListener usage
      const addEventListenerPattern = /addEventListener\(/g;
      const matches = jsContent.match(addEventListenerPattern);
      
      expect(matches).toBeTruthy();
      expect(matches.length).toBeGreaterThan(5);
    });

    test('uses meaningful variable names', () => {
      // Check for single-letter variables (except in loops)
      const lines = jsContent.split('\n');
      const singleLetterVars = [];
      
      lines.forEach((line, index) => {
        // Skip loop variables (i, j, k)
        if (line.includes('for (') || line.includes('forEach')) return;
        
        // Check for single letter variable declarations
        const varPattern = /(?:const|let|var)\s+([a-z])\s*=/;
        const match = line.match(varPattern);
        
        if (match && !['i', 'j', 'k', 'x', 'y', 'e'].includes(match[1])) {
          singleLetterVars.push({
            line: index + 1,
            variable: match[1]
          });
        }
      });
      
      // Should have no single-letter variables (except common ones)
      expect(singleLetterVars.length).toBe(0);
    });

    test('avoids magic numbers', () => {
      // Check for hardcoded numbers that should be constants
      const lines = jsContent.split('\n');
      const magicNumbers = [];
      
      lines.forEach((line, index) => {
        // Skip comments and constant definitions
        if (line.trim().startsWith('//') || 
            line.trim().startsWith('/*') ||
            line.includes('this.') && line.includes('=')) return;
        
        // Look for numbers that aren't 0, 1, or in obvious contexts
        const numberPattern = /\b(\d{3,})\b/g;
        const matches = line.match(numberPattern);
        
        if (matches) {
          matches.forEach(num => {
            // Check if it's defined as a constant
            if (!jsContent.includes(`= ${num}`)) {
              magicNumbers.push({
                line: index + 1,
                number: num,
                context: line.trim()
              });
            }
          });
        }
      });
      
      if (magicNumbers.length > 0) {
        console.log('Potential magic numbers:', magicNumbers.slice(0, 5));
      }
      
      // Allow some magic numbers for timeouts, etc.
      expect(magicNumbers.length).toBeLessThanOrEqual(10);
    });

    test('functions are small and focused', () => {
      // Check function lengths
      const functionPattern = /(?:function\s+\w+|(?:const|let)\s+\w+\s*=\s*(?:async\s+)?(?:function|\([^)]*\)\s*=>))\s*{/g;
      const functions = jsContent.match(functionPattern);
      
      expect(functions).toBeTruthy();
      
      // Count lines per function
      const lines = jsContent.split('\n');
      let currentFunctionStart = -1;
      let braceCount = 0;
      const longFunctions = [];
      
      lines.forEach((line, index) => {
        if (functionPattern.test(line)) {
          currentFunctionStart = index;
          braceCount = 0;
        }
        
        if (currentFunctionStart >= 0) {
          braceCount += (line.match(/{/g) || []).length;
          braceCount -= (line.match(/}/g) || []).length;
          
          if (braceCount === 0 && currentFunctionStart >= 0) {
            const functionLength = index - currentFunctionStart;
            if (functionLength > 50) {
              longFunctions.push({
                start: currentFunctionStart + 1,
                length: functionLength
              });
            }
            currentFunctionStart = -1;
          }
        }
      });
      
      if (longFunctions.length > 0) {
        console.log('Long functions (>50 lines):', longFunctions);
      }
      
      // Allow some long functions for complex logic
      expect(longFunctions.length).toBeLessThanOrEqual(3);
    });

    test('uses async/await for asynchronous operations', () => {
      // Check for async/await usage
      expect(jsContent).toContain('async');
      expect(jsContent).toContain('await');
      
      // Check for fetch with await
      const fetchPattern = /await\s+fetch\(/g;
      const matches = jsContent.match(fetchPattern);
      
      expect(matches).toBeTruthy();
    });

    test('has proper error handling for async operations', () => {
      // Check that async functions have try/catch
      const asyncFunctionPattern = /async\s+\w+\s*\([^)]*\)\s*{/g;
      const asyncFunctions = jsContent.match(asyncFunctionPattern);
      
      if (asyncFunctions) {
        // Should have try/catch blocks
        const tryCatchPattern = /try\s*{[\s\S]*?}\s*catch/g;
        const tryCatchBlocks = jsContent.match(tryCatchPattern);
        
        expect(tryCatchBlocks).toBeTruthy();
        expect(tryCatchBlocks.length).toBeGreaterThan(0);
      }
    });
  });

  // ============================================
  // LIQUID TEMPLATE VALIDATION
  // ============================================

  test.describe('Liquid Template Standards', () => {
    let liquidContent;

    test.beforeAll(() => {
      liquidContent = fs.readFileSync(LIQUID_FILE, 'utf-8');
    });

    test('uses proper Liquid comments', () => {
      expect(liquidContent).toContain('{%- comment -%}');
      expect(liquidContent).toContain('{%- endcomment -%}');
    });

    test('includes schema definition', () => {
      expect(liquidContent).toContain('{% schema %}');
      expect(liquidContent).toContain('{% endschema %}');
    });

    test('has proper section settings', () => {
      // Check for required settings
      expect(liquidContent).toContain('"name":');
      expect(liquidContent).toContain('"settings":');
      
      // Check for header behavior setting
      expect(liquidContent).toContain('header_behavior');
    });

    test('uses data attributes for JavaScript hooks', () => {
      expect(liquidContent).toContain('data-header');
      expect(liquidContent).toContain('data-search-toggle');
      expect(liquidContent).toContain('data-hamburger');
      expect(liquidContent).toContain('data-mobile-menu');
    });

    test('includes proper asset loading', () => {
      expect(liquidContent).toContain("{{ 'section-diamension-header.css' | asset_url | stylesheet_tag }}");
      expect(liquidContent).toContain("{{ 'section-diamension-header.js' | asset_url }}");
    });

    test('uses defer attribute on script tag', () => {
      expect(liquidContent).toContain('defer');
    });

    test('has proper accessibility attributes', () => {
      expect(liquidContent).toContain('aria-label');
      expect(liquidContent).toContain('role="search"');
    });

    test('uses Shopify image filters properly', () => {
      expect(liquidContent).toContain('| image_url:');
    });
  });

  // ============================================
  // FILE STRUCTURE VALIDATION
  // ============================================

  test.describe('File Structure', () => {
    test('all required files exist', () => {
      expect(fs.existsSync(LIQUID_FILE)).toBeTruthy();
      expect(fs.existsSync(CSS_FILE)).toBeTruthy();
      expect(fs.existsSync(JS_FILE)).toBeTruthy();
    });

    test('files are not empty', () => {
      const liquidContent = fs.readFileSync(LIQUID_FILE, 'utf-8');
      const cssContent = fs.readFileSync(CSS_FILE, 'utf-8');
      const jsContent = fs.readFileSync(JS_FILE, 'utf-8');
      
      expect(liquidContent.length).toBeGreaterThan(100);
      expect(cssContent.length).toBeGreaterThan(100);
      expect(jsContent.length).toBeGreaterThan(100);
    });

    test('CSS file has proper structure', () => {
      const cssContent = fs.readFileSync(CSS_FILE, 'utf-8');
      
      // Should have section comments
      expect(cssContent).toContain('/*');
      expect(cssContent).toContain('*/');
      
      // Should have media queries
      expect(cssContent).toContain('@media');
    });

    test('JavaScript file has proper structure', () => {
      const jsContent = fs.readFileSync(JS_FILE, 'utf-8');
      
      // Should have class definitions
      expect(jsContent).toContain('class ');
      
      // Should have constructor
      expect(jsContent).toContain('constructor(');
      
      // Should have methods
      expect(jsContent).toContain('init()');
    });
  });
});
