import js from '@eslint/js';
import imports from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    ignores: ['dist/**'],
    languageOptions: {
      ecmaVersion: 2024,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': imports,
      'unused-imports': unusedImports
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "off",
      "import/order": [
        "warn",
        {
          "groups": ["builtin", "external", "internal"],
          "alphabetize": { "order": "asc", "caseInsensitive": true },
          "newlines-between": "never"
        }
      ],
      "unused-imports/no-unused-imports": "warn",
      "no-multiple-empty-lines": ['warn', {
        max: 1,          // max number of consecutive empty lines allowed
        maxEOF: 0,       // max empty lines at the end of file
        maxBOF: 0        // max empty lines at the beginning of file
      }],
    },
  },
);
