import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

try {
  dotenv.config();
} catch (e) {
  // Ignore if .env doesn't exist (in CI environments)
}

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  // fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",

  snapshotPathTemplate:
    "dx-portal-snapshots/{projectName}/{testFileDir}/{arg}{ext}",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    baseURL: process.env.baseUrl,
  },

  /* Configure projects for major browsers */
  projects: [
    { name: "setup", testMatch: /auth\.setup\.ts/ },
    { name: "onboarding-setup", testMatch: /onboarding\.setup\.ts/ },
    {
      name: "chromium",
      testIgnore: [
        /.*dx-visual-regression\/.*/,
        /.*deleteEntities\.test\.ts/,
        /.*package-publishing\.test\.ts/,
        /.*post-onboarding\.test\.ts/,
        /.*onboarding-visual-test\.ts/,
      ], // exclude visual tests and standalone scripts
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },

      dependencies: ["setup"],
    },
    {
      name: "cleanup",
      testMatch: /.*deleteEntities\.test\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "package-publishing",
      testMatch: /.*package-publishing\.test\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "onboarding",
      testMatch: /.*post-onboarding\.test\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "onboarding-visual",
      testMatch: /.*onboarding-visual-test\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
        storageState: "playwright/.auth/onboarding-user.json",
      },
      dependencies: ["onboarding-setup"],
    },
    {
      name: "dx-portal-visual-regression",
      testDir: "./tests/dx-visual-regression",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:4546",
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
