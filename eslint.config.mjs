import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
  {
    ignores: [
      'dist/**',
      '.wrangler/**',
      '.astro/**',
      'node_modules/**',
      'worker-configuration.d.ts',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,ts,astro}'],
    languageOptions: {
      globals: {
        URL: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
      },
    },
  },
];
