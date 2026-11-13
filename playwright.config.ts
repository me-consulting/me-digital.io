import { defineConfig, devices } from '@playwright/test';

// E2E suite for the me-digital.io Angular SPA (GitHub Pages).
// Tests the dev server (pnpm start -> ng serve :4444). Set CI=1 for GitHub Actions.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4444',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    // iPhone viewport under Chromium. WebKit-for-Linux-ARM isn't installable here,
    // and the layout/CSS is engine-independent — the test comment notes the
    // WebKit-only :host collapse can't be reproduced in headless Chromium anyway.
    {
      name: 'iphone',
      use: { ...devices['iPhone 13'], browserName: 'chromium' },
    },
  ],
  webServer: {
    command: 'pnpm start',
    url: 'http://localhost:4444',
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
