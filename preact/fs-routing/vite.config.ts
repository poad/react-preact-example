import { defineConfig } from 'vite';
import * as path from 'path';
import preact from '@preact/preset-vite';
import pages from 'vite-plugin-react-pages';

export default defineConfig({
  plugins: [
    preact(),
    pages({
      pagesDir: path.join(__dirname, 'src', 'pages'),
    }),
  ],
});
