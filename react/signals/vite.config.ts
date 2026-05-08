import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import pages from 'vite-plugin-pages';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
      plugins: [["module:@preact/signals-react-transform"]]
    }),
    pages({
      dirs: 'src',
    }),
  ],
})
