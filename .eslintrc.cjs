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
    ecmaVersion: 'latest',
    sourceType: 'module'
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended'
  ],

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
      }
    }
  },

  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^~/', '^@/']
      }
    ],
    'import/order': [
      'warn',
      {
        'newlines-between': 'always'
      }
    ]
  }
};
