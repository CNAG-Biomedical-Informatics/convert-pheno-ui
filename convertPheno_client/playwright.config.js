import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './playwright/tests',
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:5181/',
    reuseExistingServer: true
  },
  use: {
    baseURL: 'http://127.0.0.1:5181',
  },
});

