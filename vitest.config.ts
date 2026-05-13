import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@flowly': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'node',
  },
})
