module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@next/next/recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
  ],
  plugins: ['prettier'],

  ignorePatterns: ['**/*.js'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['function-declaration', 'arrow-function'],
        unnamedComponents: 'arrow-function',
      },
    ],
    'no-console': 'error',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'error',
    'no-case-declarations': 'error',
    // approved by Dani above
    'react/require-default-props': 'warn',
    '@typescript-eslint/no-misused-promises': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'react/no-unstable-nested-components': 'warn',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    // TODO: FIX THIS WARNINGS
    '@typescript-eslint/no-unsafe-return': 'off',
  },
};
