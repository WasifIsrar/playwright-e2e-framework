import { test as setup, expect } from "@playwright/test";
import path from "path";
import { LoginPage } from "../pages/LoginPage.ts";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  const email = process.env.PACKAGE_PUBLISHING_EMAIL ?? "";
  const password = process.env.PACKAGE_PUBLISHING_PASSWORD ?? "";

  await page.goto("/");
  const loginPage = new LoginPage(page);
  const myApisPage = await loginPage.login(email, password);
  expect(await myApisPage.isPageDisplayed()).toBe(true);

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
