import { test, expect } from "@playwright/test";

/**
 * Read-only observation of the owner's already-live public .com website.
 * Never send direct API calls, change DNS, upload files or manipulate state.
 * This is distinct from the review-branch local static-export test.
 */
test("live public Cloud browser navigation via visible links only", async ({ page }) => {
  test.skip(process.env.OCTALVE_LIVE_BROWSER_SMOKE !== "true", "Only enabled for browser observation of the owner's public site.");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(nav).toBeVisible();
  await page.screenshot({ path: "test-results/10-current-live-home.png", fullPage: true });

  await nav.getByRole("link", { name: "Domains", exact: true }).click();
  await expect(page).toHaveURL(/\/domains\/?$/);
  await page.screenshot({ path: "test-results/11-current-live-domains.png", fullPage: true });

  await nav.getByRole("link", { name: "Hosting", exact: true }).click();
  await expect(page).toHaveURL(/\/hosting\/?$/);
  await page.screenshot({ path: "test-results/12-current-live-hosting.png", fullPage: true });
});
