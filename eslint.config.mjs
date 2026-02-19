import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import nextConfig from 'eslint-config-next'
import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  // eslint-config-next@16 exports flat config arrays natively for ESLint 9+
  ...nextConfig,
  ...coreWebVitals,
  ...typescript,
  // Prettier config uses FlatCompat (eslint-plugin-prettier is not yet flat-native)
  ...compat.extends('plugin:prettier/recommended'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'test-results/**',
      'playwright-report/**',
    ],
  },
  {
    // Downgrade new React 19.2 strict rules to warnings until code is updated
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
    },
  },
  {
    // Allow require() in CJS config files (Jest, commitlint)
    files: ['*.config.js', '*.config.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]

export default eslintConfig
