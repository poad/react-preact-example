import { signalsVite } from "@preact/signals-agent-vite";
import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import pages from "vite-plugin-pages";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
    pages({
      dirs: "src",
    }),
    signalsVite({ framework: "react" }),
  ],
});
