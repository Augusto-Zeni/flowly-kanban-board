import antfu from '@antfu/eslint-config'

const eslintConfig = antfu({
  typescript: true,

  react: true,

  nextjs: true,

  ignores: [
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ],

  stylistic: {
    indent: 2,
    quotes: 'single',
  },
}, {
  rules: {
    'no-console': 'warn',
  },
})

export default eslintConfig
