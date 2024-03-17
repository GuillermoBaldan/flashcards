import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/shared/components"),
      "@utils": path.resolve(__dirname, "./src/shared/utils/"),
      "@types": path.resolve(__dirname, "./src/shared/types/index.ts"),
      "@scss": path.resolve(__dirname, "./src/index.scss"),
      "@services": path.resolve(__dirname, "./src/shared/services/"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        prependData: `@import "./src/index.scss";`,
      },
    },
  },
});
