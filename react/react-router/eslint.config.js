// @ts-check

import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

import { includeIgnoreFile } from '@eslint/compat';
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, "./.gitignore");

const compat = new FlatCompat();

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  {
    files: ['app/**/*.{jsx,ts,tsx}'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
      '@stylistic/ts': stylistic,
      '@stylistic/jsx': stylistic,
    },
    rules: {
      '@stylistic/semi': 'error',
      // '@stylistic/indent': ['error', 2],
    },
  },
  {
    files: ['app/**/*.{jsx,tsx}'],
    plugins: {
      ['jsx-a11y']: jsxA11yPlugin,
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
        typescript: {},
      },
    },
  },
  {
    files: ['app/**/*.{ts,tsx}'],
    plugins: {
      import: importPlugin,
    },
    extends: [
      ...tseslint.configs.recommended,
      ...compat.config(importPlugin.configs.recommended),
      ...compat.config(importPlugin.configs.typescript),
    ],
    settings: {
      'import/internal-regex': '^~/',
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
  {
    rules: {
      'react/display-name': 'off',
      'import/namespace': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
    },
  },
);
