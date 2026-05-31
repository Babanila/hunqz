import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/client.ts', 'src/server.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  publicDir: 'src',
  treeshake: true,
  splitting: false,
  outDir: 'dist',
});
