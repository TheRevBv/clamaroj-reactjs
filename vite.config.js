import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@styles": "/src/styles",
      "@app": "/src/app",
      "@slices": "/src/slices",
      "@hooks": "/src/hooks",
      "@services": "/src/services",
      "@assets": "/src/assets",
      "@routes": "/src/routes",
      "@layouts": "/src/layouts",
      "@models": "/src/models",
      "@context": "/src/context",
    },
  },
});
