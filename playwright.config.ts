import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 3 : undefined,
  reporter: [['html'], ['json', { outputFile: 'test-results.json' }]],
  timeout: isCI ? 5000 : 10000,


  use: {
    baseURL: isCI ? process.env.PLAYWRIGHT_TEST_BASE_URL : 'http://localhost:3000',
    trace: 'on-first-retry',
    extraHTTPHeaders: isCI ? {
      'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET!,
    } : {},
    video: isCI ? {
      mode: 'retain-on-failure',
      size: { width: 1920, height: 1080 }
    } : {
      mode: 'off'
    }
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'iphone',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'android',
      use: { ...devices['Pixel 5'] },
    },
  ],

  ...(isCI
    ? {}
    : {
      webServer: {
        command: 'bun dev',
        url: 'http://localhost:3000',
        reuseExistingServer: true,
      },
    }),
});