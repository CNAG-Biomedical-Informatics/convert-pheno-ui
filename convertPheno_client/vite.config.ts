import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import istanbul from 'vite-plugin-istanbul';
import ViteYaml from '@modyfi/vite-plugin-yaml';

export default defineConfig({
  build: {
    sourcemap: true
  },
  server: {
    host: true,
    port: 5173,
  },
  plugins: [
    react(),
    istanbul({
      exclude: ['node_modules', 'test/'],
      extension: [ '.js', '.jsx', '.tsx' ],
      cypress: true,
      requireEnv: false,
    }),
    ViteYaml(),
  ],
  // rollupOptions: {
  //   output: {
  //     manualChunks: () => 'bundle',
  //   }
  // }
});
