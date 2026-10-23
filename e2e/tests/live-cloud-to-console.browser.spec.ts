import { test, expect } from "@playwright/test";

/**
 * Current live customer route only. We explicitly do NOT assume the
 * undeployed Console exists. This test provides precise browser evidence
 * about where the actual public Get Started link leads.
 */
test("live Cloud homepage → Get Started → actual Console destination", async ({ page, context }) => {
  test.skip(process.env.OCTALVE_LIVE_BROWSER_SMOKE !== "true", "Only enable for existing live public Cloud observation.");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Get Started", exact: true })).toBeVisible();
  const [consoleTab] = await Promise.all([
    context.waitForEvent("page", { timeout: 15000 }),
    page.getByRole("link", { name: "Get Started", exact: true }).click()
  ]);
  await consoleTab.waitForLoadState("domcontentloaded", { timeout: 15000 });
  console.log("Visible Get Started destination:", consoleTab.url());
  await consoleTab.screenshot({ path: "test-results/13-live-get-started-destination.png", fullPage: true });
  await expect(consoleTab.getByRole("heading", { name: /Welcome back/i })).toBeVisible({ timeout: 12000 });
  await expect(consoleTab.getByRole("link", { name: "Create account" })).toBeVisible();
});
