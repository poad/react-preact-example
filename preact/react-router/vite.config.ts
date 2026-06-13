import alias from '@rollup/plugin-alias';
import { reactRouter } from '@react-router/dev/vite';
import { preact } from '@preact/preset-vite';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    alias({
      entries: [
        { find: 'react', replacement: 'preact/compat' },
        { find: 'react-dom', replacement: 'preact/compat' },
      ],
    }),
    preact(),
    reactRouter(),
  ],
});
