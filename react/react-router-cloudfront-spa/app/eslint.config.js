// @ts-check

import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';

import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    ignores: [
      '**/*.d.ts',
      '*.{js,jsx}',
      'app/tsconfig.json',
      'app/stories',
      '**/*.css',
      'node_modules/**/*',
      './.next/*',
      'out',
      '.storybook',
    ],
    files: ['app/**/*.{ts,tsx}'],
    ...importPlugin.flatConfigs.recommended,
    ...importPlugin.flatConfigs.typescript,
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@stylistic': stylistic,
      '@stylistic/ts': stylistic,
      '@stylistic/jsx': stylistic,
      'jsx-a11y': jsxA11yPlugin,
    },
    extends: [
      ...compat.config(reactHooksPlugin.configs.recommended),
      ...compat.config(jsxA11yPlugin.configs.recommended),
    ],
    settings: {
      react: {
        version: 'detect',
      },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
      'import/resolver': {
        node: true,
        typescript: true,
      },
    },
    rules: {
      '@stylistic/semi': 'error',
      // '@stylistic/indent': ['error', 2],
      'react/display-name': 'off',
      'import/namespace': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'comma-dangle': ["error", "always-multiline"],
      quotes: ["error", "single"],
      semi: ["error", "always"],
    },
  },
);
