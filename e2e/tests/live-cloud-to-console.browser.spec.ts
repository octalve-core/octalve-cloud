import { test, expect } from "@playwright/test";

/**
 * Live end-user journey only; interaction starts at the public homepage.
 * Use visible click and inspect the resulting browser navigation. Never
 * navigate straight to a Console route or invoke the API.
 */
test("live Cloud homepage → Get Started → actual Console destination", async ({ page, context }) => {
  test.skip(process.env.OCTALVE_LIVE_BROWSER_SMOKE !== "true", "Only enabled for live public-site observation.");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const cta = page.getByRole("link", { name: "Get Started", exact: true });
  await expect(cta).toBeVisible();
  const href = await cta.getAttribute("href");
  const target = await cta.getAttribute("target");
  const beforeURL = page.url();
  const beforeTabs = context.pages().length;
  console.log("Get Started displayed href:", href, "target:", target);
  await cta.click();
  await expect.poll(
    () => context.pages().length > beforeTabs || page.url() !== beforeURL,
    { timeout: 15000, message: "Clicking Get Started must open a destination using ordinary browser navigation" },
  ).toBeTruthy();
  const pages = context.pages();
  const destination = pages.length > beforeTabs ? pages[pages.length - 1] : page;
  await destination.waitForLoadState("domcontentloaded", { timeout: 15000 }).catch(() => undefined);
  console.log("Get Started browser destination:", destination.url());
  await destination.screenshot({ path: "test-results/13-live-get-started-destination.png", fullPage: true });
  await expect(destination.getByRole("heading", { name: /Welcome back/i })).toBeVisible({ timeout: 12000 });
  await expect(destination.getByRole("link", { name: "Create account" })).toBeVisible();
});
