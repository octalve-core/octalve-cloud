import { test, expect } from "@playwright/test";

/**
 * Browser acceptance of the actual live link behavior; never assume whether
 * Get Started opens in the same tab or a new tab. No route shortcuts.
 */
test("live Cloud homepage → Get Started → actual Console destination", async ({ page, context }) => {
  test.skip(process.env.OCTALVE_LIVE_BROWSER_SMOKE !== "true", "Only enable for existing live public Cloud observation.");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const getStarted = page.getByRole("link", { name: "Get Started", exact: true });
  await expect(getStarted).toBeVisible();
  const target = await getStarted.getAttribute("target");
  let destination = page;

  if (target === "_blank") {
    const [newPage] = await Promise.all([
      context.waitForEvent("page", { timeout: 15000 }),
      getStarted.click(),
    ]);
    destination = newPage;
  } else {
    await Promise.all([
      page.waitForURL(url => url.toString() !== "https://cloud.octalve.com/" && url.toString() !== "https://cloud.octalve.com", { timeout: 15000 }),
      getStarted.click(),
    ]);
  }

  await destination.waitForLoadState("domcontentloaded", { timeout: 15000 });
  console.log("Visible Get Started destination:", destination.url());
  await destination.screenshot({ path: "test-results/13-live-get-started-destination.png", fullPage: true });
  await expect(destination.getByRole("heading", { name: /Welcome back/i })).toBeVisible({ timeout: 12000 });
  await expect(destination.getByRole("link", { name: "Create account" })).toBeVisible();
});
