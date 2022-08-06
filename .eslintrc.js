module.exports = {
  plugins: ['react', '@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/jsx-runtime'
  ],
  rules: {
    // JS/TS RULES
    quotes: ['error', 'single'],
    camelcase: 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-dupe-else-if': 'off',
    'no-setter-return': 'off',
    'import/no-unresolved': 'off',
    'import/newline-after-import': ['error', { count: 1 }],
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0, maxEOF: 1 }],
    'no-trailing-spaces': 'error',
    '@typescript-eslint/type-annotation-spacing': ['error'],
    'object-curly-spacing': ['error', 'always'],
    'key-spacing': ['error', { beforeColon: false }],
    'object-shorthand': ['error', 'always'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    // JSX RULES
    'jsx-quotes': ['off', 'prefer-single'],
    'react/jsx-boolean-value': 'error',
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-equals-spacing': 'error',
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-indent': ['error', 2],
    'react/jsx-max-props-per-line': ['error', { maximum: 4 }],
    'react/jsx-no-bind': 'off',
    'react/jsx-no-literals': 'off',
    'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }]
  },
  settings: {
    'import/ignore': ['node_modules/react-native/index\\.js$']
  },

  env: {
    browser: true,
    amd: true,
    node: true
  }
};
