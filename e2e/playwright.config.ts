import { defineConfig, devices } from "@playwright/test";

const externalBrowserOrigin = process.env.OCTALVE_BROWSER_BASE_URL;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"], ["html", { outputFolder: "report", open: "never" }]],
  outputDir: "test-results",
  use: {
    baseURL: externalBrowserOrigin || "http://127.0.0.1:4173",
    ...devices["Desktop Chrome"],
    trace: "on",
    screenshot: "on",
    video: "retain-on-failure",
  },
  webServer: externalBrowserOrigin ? undefined : {
    command: "python3 -m http.server 4173 --directory ../out",
    port: 4173,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
