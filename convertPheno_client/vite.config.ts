import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin as html } from "vite-plugin-html";
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
  server: {
    port: 5173,
  },
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),
    html({
      entry: "/src/main.jsx",
      template: "index.html",
    }),
    istanbul({
      exclude: ['node_modules', 'test/'],
      extension: [ '.js', '.jsx', '.tsx' ],
      requireEnv: true,
      cypress: true,
    }),
  ],
});
