import fs from "fs/promises";
import path from "path";
import { preact } from "@preact/preset-vite";
import { defineConfig } from "vite";
import ssr from "vite-plugin-ssr/plugin";

// vite 8 ではプラグインの writeBundle フックが各ビルド環境（client/server）
// で呼ばれず、vite-plugin-ssr が dist/client/_temp_manifest.json を
// dist/assets.json にリネームする処理が実行されない。
// closeBundle はすべてのファイルがディスクに書き出された後に呼ばれるため、
// ここでリネームを行い、プリレンダリング用のアセットマニフェストを用意する。
function renameClientManifest() {
  return {
    name: "rename-client-manifest",
    closeBundle: async () => {
      const root = import.meta.dirname;
      const from = path.join(root, "dist", "client", "_temp_manifest.json");
      const to = path.join(root, "dist", "assets.json");
      try {
        await fs.rename(from, to);
      } catch {
        // 既にリネーム済み、またはファイルが存在しない場合は無視
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), ssr({ prerender: true }), renameClientManifest()],
});
