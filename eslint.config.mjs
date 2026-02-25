import antfu from '@antfu/eslint-config'

const eslintConfig = antfu({
  typescript: true,
  react: true,
  nextjs: true,
  tailwindcss: true,
  ignores: [
    'node_modules/**',
    '.next/**',
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
    'style/max-len': ['warn', { code: 120 }],
  },
})

export default eslintConfig
