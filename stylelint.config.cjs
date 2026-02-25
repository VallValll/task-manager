module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
  plugins: [
    'stylelint-scss',
    'stylelint-order',
    'stylelint-declaration-block-no-ignored-properties'
  ],
  customSyntax: 'postcss-scss',
  overrides: [
    {
      files: ['**/*.{vue,html}'],
      customSyntax: 'postcss-html'
    }
  ],
  rules: {
    'declaration-block-no-duplicate-properties': true,
    'order/properties-alphabetical-order': true,
    'plugin/declaration-block-no-ignored-properties': true,

    // Use SCSS-aware rules instead of vanilla CSS variants.
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'layer', 'config', 'theme', 'screen']
      }
    ],
    'function-no-unknown': null,
    'scss/function-no-unknown': [
      true,
      {
        ignoreFunctions: ['vc', 'vw', 'vm', 'css-nth', 'rad', 'sprite-str-replace', 'str-replace']
      }
    ],

    // Too strict for SCSS expressions and custom helpers.
    'declaration-property-value-no-unknown': null,
    'at-rule-empty-line-before': null,
    'media-query-no-invalid': null,
    'media-feature-range-notation': null,
    'no-invalid-position-declaration': null,
    'at-rule-descriptor-value-no-unknown': null,
    'nesting-selector-no-missing-scoping-root': null,
    'property-no-deprecated': null,
    'color-function-alias-notation': null,
    'color-function-notation': null,
    'alpha-value-notation': null,
    'number-max-precision': null
  }
};
