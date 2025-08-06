module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  extends: [
    '@nuxt/eslint-config',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // Vue specific rules
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    
    // TypeScript rules
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // General rules
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    
    // Nuxt specific
    'no-undef': 'off' // Nuxt provides global functions
  },
  ignorePatterns: [
    'dist',
    '.output',
    '.nuxt',
    'node_modules'
  ]
}
