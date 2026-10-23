import { test, expect } from "@playwright/test";

/**
 * One linked customer-facing browser journey, without backend short-circuits.
 * Only runs once an authorized, protected Console deployment and test account
 * actually exist; skip is explicitly reported as a live-deployment BLOCKER.
 * No APIRequestContext, DB mutation, session injection or goto(deep route).
 */
test("Cloud homepage → Get Started → Console signup view → login → workspace", async ({ page, context }) => {
  test.skip(process.env.OCTALVE_CLOUD_CONSOLE_E2E !== "true", "Live Console deployment/test identity not configured; no substitute API test is counted.");
  const email = process.env.OCTALVE_CLOUD_TEST_EMAIL;
  const password = process.env.OCTALVE_CLOUD_TEST_PASSWORD;
  if (!email || !password) throw new Error("Configure dedicated development test account in runner secrets.");

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Get Started" })).toBeVisible();

  // SmartLink intentionally opens a separate tab for cross-origin links.
  const [consolePage] = await Promise.all([
    context.waitForEvent("page"),
    page.getByRole("link", { name: "Get Started" }).click(),
  ]);
  await consolePage.waitForLoadState("domcontentloaded");
  await expect(consolePage.getByRole("heading", { name: "Welcome back" })).toBeVisible();
  await consolePage.screenshot({ path: "test-results/06-console-login.png", fullPage: true });

  await consolePage.getByRole("link", { name: "Create account" }).click();
  await expect(consolePage.getByLabel("Email address")).toBeVisible();
  await consolePage.screenshot({ path: "test-results/07-console-signup.png", fullPage: true });

  await consolePage.getByRole("link", { name: "Login" }).click();
  await consolePage.getByLabel("Email address").fill(email);
  await consolePage.getByLabel("Password", { exact: true }).fill(password);
  await consolePage.getByRole("button", { name: "Login", exact: true }).click();
  await expect(consolePage).toHaveURL(/\/(client|staff|admin)(\/|$)/, { timeout: 30_000 });
  await consolePage.screenshot({ path: "test-results/08-console-workspace.png", fullPage: true });

  // Remaining workflows must be reached by visible buttons/menus in subsequent
  // gated acceptance: no route shortcuts for services, orders or OPanel.
});
