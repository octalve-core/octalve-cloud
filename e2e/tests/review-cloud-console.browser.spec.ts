import { test, expect } from "@playwright/test";

/**
 * Tested review build, from public root via visible link only.
 * Explicitly use the protected review Console URL (in NEXT_PUBLIC_CLOUD_CONSOLE_URL)
 * until the owner authorizes mapping console.cloud.octalve.com.
 * No DB mutation or API shortcuts.
 */
test("review Cloud → Get Started → actual Console login screen", async ({page}) => {
  test.skip(process.env.OCTALVE_REVIEW_CONSOLE_BROWSER !== "true", "Cross-origin review Console smoke requires authorized preview access.");
  await page.setViewportSize({width: 1440, height: 900});
  await page.goto("/");
  const cta = page.getByRole("link", {name:"Get Started", exact:true});
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("target", /^(?!_blank).*$/); // same-tab first-party handoff
  await cta.click();
  await expect(page).toHaveURL(/octalve-console.*vercel\.app|console\.cloud\.octalve\.com/, {timeout: 30000});
  await page.screenshot({path:"test-results/14-review-console-landing.png",fullPage:true});
  await expect(page.getByRole("heading", {name:/Welcome back/i})).toBeVisible({timeout:20000});
});
