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
  await expect(cta).not.toHaveAttribute("target", "_blank"); // same-tab first-party handoff
  await cta.click();
  await expect(page).toHaveURL(/octalve-console.*vercel\.app|console\.cloud\.octalve\.com/, {timeout: 30000});
  await page.screenshot({path:"test-results/14-review-console-landing.png",fullPage:true});
  // Distinguish Vercel's protected-access gateway from an application defect.
  // The actual navigation still occurs only through the public Get Started UI.
  const loginHeading = page.getByRole("heading", {name:/Welcome back/i});
  if (!(await loginHeading.isVisible())) {
    const currentUrl = new URL(page.url());
    if (currentUrl.hostname === "vercel.com" || currentUrl.hostname.endsWith(".vercel.com")) {
      throw new Error("Protected Console Preview redirected to Vercel Authentication. The journey needs an authorized Vercel viewer; deployment protection must not be silently disabled.");
    }
  }
  await expect(loginHeading).toBeVisible({timeout:20000});
});
