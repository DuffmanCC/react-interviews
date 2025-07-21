import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // necesario para React
    globals: true, // para no importar describe, it, expect
    setupFiles: "./vitest.setup.ts", // para cargar jest-dom manualmente
    reporters: ["default"],
  },
});
