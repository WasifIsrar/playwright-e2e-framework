import { test as setup, expect } from "@playwright/test";
import path from "path";
import { LoginPage } from "../pages/LoginPage.ts";
import { SetupPage } from "../pages/SetupPage.ts";

const authFile = path.join(
  __dirname,
  "../playwright/.auth/onboarding-user.json",
);

setup("authenticate onboarding user", async ({ page }) => {
  const email = process.env.ONBOARDING_EMAIL ?? "";
  const password = process.env.ONBOARDING_PASSWORD ?? "";

  await page.goto("/");
  const loginPage = new LoginPage(page);
  await loginPage.login(email, password);

  // The onboarding user lands on the SetupPage, not MyApisPage.
  const setupPage = new SetupPage(page);
  expect(await setupPage.isPageDisplayed()).toBe(true);

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
