import stylistic from '@stylistic/eslint-plugin';

export default [
  {
    files: ['assets/section-*.js', 'assets/snippet-*.js', 'assets/block-*.js', 'prototype/**/*.js'],
    plugins: {
      '@stylistic': stylistic
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        Promise: 'readonly',
        customElements: 'readonly',
        Shopify: 'readonly',
        HTMLElement: 'readonly'
      }
    },
    rules: {
      // Stylistic rules (formatting)
      '@stylistic/indent': ['error', 2],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/arrow-spacing': ['error', { 'before': true, 'after': true }],
      '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1 }],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/space-before-function-paren': ['error', {
        'anonymous': 'always',
        'named': 'never',
        'asyncArrow': 'always'
      }],
      '@stylistic/keyword-spacing': ['error', { 'before': true, 'after': true }],
      '@stylistic/space-infix-ops': ['error'],
      '@stylistic/no-trailing-spaces': ['error'],
      '@stylistic/brace-style': ['error', '1tbs', { 'allowSingleLine': true }],

      // Code quality rules
      'no-unused-vars': ['warn'],
      'no-console': ['warn'],
      'no-var': ['error'],
      'prefer-const': ['error'],
      'prefer-arrow-callback': ['error'],
      'curly': ['error', 'all']
    }
  },
  {
    ignores: [
      'node_modules/**',
      'assets/*.min.js'
    ]
  }
];
