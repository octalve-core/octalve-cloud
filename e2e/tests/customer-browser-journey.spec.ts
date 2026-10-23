import { test, expect } from "@playwright/test";

/**
 * End-user browser journey only:
 * - Enter the homepage via the public root.
 * - Follow VISIBLE navigation to Domains and Hosting.
 * - Type into visible input and submit using the visible button.
 * - Follow a plan CTA to Contact and examine mobile nav.
 * Never use page.request, route mocking, database commands, or goto(deep URL).
 *
 * Full Console -> OPanel journey is blocked until a protected preview and
 * persistent Django backend are available. Never fake that completion.
 */
test("homepage → domains → domain query → hosting plan → enquiry → mobile menu", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const desktopNav = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(desktopNav).toBeVisible();
  await page.screenshot({ path: "test-results/01-home-desktop.png", fullPage: true });

  await desktopNav.getByRole("link", { name: "Domains", exact: true }).click();
  await expect(page).toHaveURL(/\/domains\/?$/);
  await page.locator("input").first().fill("octalve-test-example.com");
  await page.getByRole("button", { name: "Search Domain" }).click();
  await expect(
    page.getByText("Live domain verification is not connected. We cannot confirm availability or current prices yet.")
  ).toBeVisible();
  await page.screenshot({ path: "test-results/02-domains-no-fabrication.png", fullPage: true });

  await desktopNav.getByRole("link", { name: "Hosting", exact: true }).click();
  await expect(page).toHaveURL(/\/hosting\/?$/);
  await expect(page.getByText("Web Hosting Packages", { exact: true })).toBeVisible();
  await page.screenshot({ path: "test-results/03-hosting-plans.png", fullPage: true });

  await page.getByRole("link", { name: "Choose plan", exact: true }).first().click();
  await expect(page).toHaveURL(/\/contact\/?\?interest=/);
  await expect(page.getByRole("heading", { name: "Choose the right contact channel." })).toBeVisible();
  await page.screenshot({ path: "test-results/04-contact-enquiry.png", fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeVisible();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.screenshot({ path: "test-results/05-mobile-menu.png", fullPage: true });
  await page.getByRole("button", { name: "Close navigation" }).click();
});
