import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['lib/index.js'],
  format: ['cjs', 'esm'],
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  splitting: false,
  dts: false, // no TypeScript definitions
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.js'
    }
  }
})
