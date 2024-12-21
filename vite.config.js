import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import process from "process";

export default defineConfig(({ mode }) => {
  process.env.NODE_ENV = mode === "production" ? "production" : "development";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": "/",
      },
    },
    server: {
      port: 5173,
    },
    build: {
      outDir: "dist",
      sourcemap: mode !== "production",
    },
  };
});
