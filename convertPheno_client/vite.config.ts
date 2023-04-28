import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin as html } from "vite-plugin-html";

export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [
    react(),
    html({
      entry: "/src/main.jsx",
      template: "index.html",
    }),
  ],
});
