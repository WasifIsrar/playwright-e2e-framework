import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.ts";
import { SetupPage } from "../pages/SetupPage.ts";
import { PricingPlansPage } from "../pages/PricingPlansPage.ts";

let setupPage: SetupPage;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const loginPage = new LoginPage(page);
  await loginPage.login("", "");
  await page.waitForLoadState("networkidle");
  setupPage = new SetupPage(page);
  expect(await setupPage.isPageDisplayed()).toBe(true);
});

test("It Verifies navigations to/from legacy dashboard screens", async () => {
  const accountSettingsPage = await setupPage.openAccountSettings();
  expect(await accountSettingsPage.isPageDisplayed()).toBe(true);

  await accountSettingsPage.clickLogo();
  const setupPageAfterNav = new SetupPage(accountSettingsPage.page);
  expect(await setupPageAfterNav.isPageDisplayed()).toBe(true);
});

test("It Verifies navigation to Pricing Plans and back to setup screen", async () => {
  const pricingPlansPage = await setupPage.openPricingPlans();
  expect(await pricingPlansPage.isPageDisplayed()).toBe(true);

  await pricingPlansPage.clickLogo();
  const setupPageAfterNav = new SetupPage(pricingPlansPage.page);
  expect(await setupPageAfterNav.isPageDisplayed()).toBe(true);
});

test("It Verifies sign out and sign back in lands on setup screen", async () => {
  const loginPage = await setupPage.signOut();
  await loginPage.login("", "");
  await loginPage.page.waitForLoadState("networkidle");
  expect(await new SetupPage(loginPage.page).isPageDisplayed()).toBe(true);
});

test("It Verifies sign out from Account Settings and sign back in lands on setup screen", async () => {
  const accountSettingsPage = await setupPage.openAccountSettings();
  expect(await accountSettingsPage.isPageDisplayed()).toBe(true);

  const loginPage = await accountSettingsPage.signOut();
  await loginPage.login("", "");
  expect(await new SetupPage(loginPage.page).isPageDisplayed()).toBe(true);
});

test("It Verifies Links in Cards", async () => {
  test.setTimeout(60000);
  const cards = [
    {
      open: () => setupPage.openThemeCard(),
      liveExampleUrl:
        "https://docs.worldpay.com/api-specification/reporting/authorization-research#/net-standard-library/api-endpoints/authorizations/search-authorizations",
      documentationUrl:
        "https://docs.apimatic.io/platform-api/#/http/guides/generating-on-prem-api-portal/build-file-reference/generateportal-portalsettings-theme",
    },
    {
      open: () => setupPage.openDocumentationCard(),
      liveExampleUrl:
        "https://docs.payquicker.io/current/v/2026.02.01/#/net-standard-library/start-here/welcome",
      documentationUrl:
        "https://docs.apimatic.io/platform-api/#/http/guides/generating-on-prem-api-portal/custom-content",
    },
    {
      open: () => setupPage.openRecipeCard(),
      liveExampleUrl:
        "https://developers.maxio.com/http/guided-walkthroughs/create-product-catalog",
      documentationUrl:
        "https://docs.apimatic.io/platform-api/#/http/guides/generating-on-prem-api-portal/api-recipes/getting-started-guide",
    },
    {
      open: () => setupPage.openCustomizedSDKCard(),
      liveExampleUrl: "https://github.com/paypal/PayPal-TypeScript-Server-SDK",
      documentationUrl:
        "https://docs.apimatic.io/generate-sdks/customize-sdks/codegen-settings/codegen-settings-overview/",
    },
    {
      open: () => setupPage.openPublishSDKCard(),
      liveExampleUrl: "https://www.npmjs.com/package/@paypal/paypal-server-sdk",
      documentationUrl:
        "https://docs.apimatic.io/apimatic-cli/commands/#publish-an-sdk",
    },
    {
      open: () => setupPage.openCopilotCard(),
      liveExampleUrl:
        "https://developers.maxio.com/typescript/getting-started/how-to-get-started",
      documentationUrl:
        "https://docs.apimatic.io/platform-api/#/http/guides/generating-on-prem-api-portal/api-copilot",
    },
  ];

  for (const card of cards) {
    await card.open();

    const liveTab = await setupPage.clickCardLiveExample();
    expect(liveTab.url()).toBe(card.liveExampleUrl);
    await liveTab.close();

    const docTab = await setupPage.clickCardDocumentation();
    expect(docTab.url()).toBe(card.documentationUrl);
    await docTab.close();

    await setupPage.closeCardDialog();
  }
});
