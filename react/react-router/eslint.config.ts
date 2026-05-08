import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import eslintReact from '@eslint-react/eslint-plugin';
// @ts-expect-error ignore plugin type
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { importX, createNodeResolver } from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
// @ts-expect-error ignore plugin type
import pluginPromise from 'eslint-plugin-promise';

// eslint-disable-next-line import-x/no-named-as-default
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import { configs, parser } from 'typescript-eslint';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, './.gitignore');

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      '**/*.d.ts',
      '*.js',
      'src/tsconfig.json',
      'src/next-env.d.ts',
      'src/stories',
      'node_modules/**/*',
      './.next/*',
    ],
  },
  eslint.configs.recommended,
  ...configs.strict,
  ...configs.stylistic,
  pluginPromise.configs['flat/recommended'],
  reactRefresh.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    plugins: {
      '@stylistic': stylistic,
    },
    extends: [
      eslintReact.configs['recommended-typescript'],
    ],
    settings: {
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
        }),
        createNodeResolver(),
      ],
    },
    rules: {
      '@stylistic/semi': 'error',
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],

      'react-refresh/only-export-components': 'off',

      'import-x/order': [
        'error',
        {
          'groups': [
            // Imports of builtins are first
            'builtin',
            // Then sibling and parent imports. They can be mingled together
            ['sibling', 'parent'],
            // Then index file imports
            'index',
            // Then any arcane TypeScript imports
            'object',
            // Then the omitted imports: internal, external, type, unknown
          ],
        },
      ],
    },
  },
);
