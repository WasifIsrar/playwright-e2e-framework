import { test, expect } from "@playwright/test";
import { MyApisPage } from "../pages/MyApisPage";
import { DocsEditorPage } from "../pages/DocsEditorPage";

let apiEntityId: string | null = null;

test.afterEach(async ({ page }) => {
  if (apiEntityId) {
    const myApisPage = new MyApisPage(page);
    await myApisPage.deleteApiEntity(apiEntityId);
    apiEntityId = null;
  }
});

test.describe("API Playground Settings", () => {
  test("PE01 - LegacyApiPlayground set to false ", async ({ page }) => {
    const myApisPage = new MyApisPage(page);

    apiEntityId = await myApisPage.createApiEntity(
      "https://petstore.swagger.io/v2/swagger.json",
    );

    await page.goto(`/api-docs-editor/${apiEntityId}`);
    const docsEditorPage = new DocsEditorPage(page);

    expect(await docsEditorPage.isPageDisplayed()).toBe(true);

    const [apiPlaygroundOptions, apiPlaygroundSettingsPage] = await Promise.all(
      [
        docsEditorPage.waitForApiPlaygroundOptionsResponse(),
        docsEditorPage.navigateToApiPlayground(),
      ],
    );

    await apiPlaygroundSettingsPage.waitForContentVisible();
    // Verify UI toggle reflects the same (check while API Playground content is visible)
    expect(await apiPlaygroundSettingsPage.isLegacyToggleChecked()).toBe(false);

    // Verify API response returns useLegacyApiPlayground as false
    expect(apiPlaygroundOptions.useLegacyApiPlayground).toBe(false);

    await page.goto(`/api-docs-preview/portal-editor/${apiEntityId}`);
    const config = await docsEditorPage.getConfig();
    expect(config.useLegacyApiPlayground).toBe(false);
  });

  test("PE02 - Saved without changes keeps LegacyApiPlayground false", async ({
    page,
  }) => {
    await page.goto("/");
    const myApisPage = new MyApisPage(page);
    apiEntityId = await myApisPage.createApiEntity(
      "https://petstore.swagger.io/v2/swagger.json",
    );

    await page.goto(`/api-docs-editor/${apiEntityId}`);

    const docsEditorPage = new DocsEditorPage(page);

    expect(await docsEditorPage.isPageDisplayed()).toBe(true);

    const [apiPlaygroundOptions, apiPlaygroundSettingsPage] = await Promise.all(
      [
        docsEditorPage.waitForApiPlaygroundOptionsResponse(),
        docsEditorPage.navigateToApiPlayground(),
      ],
    );

    await apiPlaygroundSettingsPage.waitForContentVisible();

    // Do not change anything, just save
    await docsEditorPage.clickSave();

    await page.goto(`/api-docs-preview/portal-editor/${apiEntityId}`);
    const config = await docsEditorPage.getConfig();
    expect(config.useLegacyApiPlayground).toBe(false);
  });

  test("PE03 - LegacyApiPlayground set to true ", async ({ page }) => {
    const myApisPage = new MyApisPage(page);

    apiEntityId = await myApisPage.createApiEntity(
      "https://petstore.swagger.io/v2/swagger.json",
    );

    await page.goto(`/api-docs-editor/${apiEntityId}`);
    const docsEditorPage = new DocsEditorPage(page);

    expect(await docsEditorPage.isPageDisplayed()).toBe(true);

    const [apiPlaygroundOptions, apiPlaygroundSettingsPage] = await Promise.all(
      [
        docsEditorPage.waitForApiPlaygroundOptionsResponse(),
        docsEditorPage.navigateToApiPlayground(),
      ],
    );

    await apiPlaygroundSettingsPage.waitForContentVisible();

    // Click the visual toggle to enable the legacy API Playground
    await apiPlaygroundSettingsPage.clickLegacyToggleVisual();

    // Save the Docs editor to persist the setting
    await docsEditorPage.clickSave();

    // Verify the toggle is now checked and the visual shows the enabled color
    expect(await apiPlaygroundSettingsPage.isLegacyToggleChecked()).toBe(true);
    const bg = await apiPlaygroundSettingsPage.getLegacyToggleBackgroundColor();
    expect(bg).toBe("rgb(40, 195, 151)");

    await page.goto(`/api-docs-preview/portal-editor/${apiEntityId}`);
    const config = await docsEditorPage.getConfig();
    expect(config.useLegacyApiPlayground).toBe(true);
  });
});

test.describe("AI Configuaration Tab Settings", () => {
  test("PE01 - API Copilot and Context plugin tab visibility", async ({
    page,
  }) => {
    await page.goto("/");
    const myApisPage = new MyApisPage(page);
    expect(await myApisPage.isPageDisplayed()).toBe(true);

    const docsEditorPage = new DocsEditorPage(page);
    await myApisPage.clickEditDocs();
    expect(await docsEditorPage.isPageDisplayed()).toBe(true);

    const [, apiPlaygroundSettingsPage] = await Promise.all([
      docsEditorPage.waitForApiPlaygroundOptionsResponse(),
      docsEditorPage.navigateToApiPlayground(),
    ]);

    await apiPlaygroundSettingsPage.waitForContentVisible();

    // Open AI Configuration tab
    await apiPlaygroundSettingsPage.clickAiConfigurationTab();

    // Verify headings visible
    expect(
      await apiPlaygroundSettingsPage.isSectionHeadingVisible("API Copilot"),
    ).toBe(true);
    expect(
      await apiPlaygroundSettingsPage.isSectionHeadingVisible(
        "Context Plugins",
      ),
    ).toBe(true);

    // Verify both toggles are enabled (visual background color)
    const copilotBg =
      await apiPlaygroundSettingsPage.getToggleBackgroundColorForSection(
        "API Copilot",
      );
    expect(copilotBg).toBe("rgb(40, 195, 151)");
  });

  test("PE02 - Context Plugins action card visibility", async ({ page }) => {
    await page.goto("/");
    const myApisPage = new MyApisPage(page);
    expect(await myApisPage.isPageDisplayed()).toBe(true);

    const docsEditorPage = new DocsEditorPage(page);
    await myApisPage.clickEditDocs();
    expect(await docsEditorPage.isPageDisplayed()).toBe(true);

    const [, apiPlaygroundSettingsPage] = await Promise.all([
      docsEditorPage.waitForApiPlaygroundOptionsResponse(),
      docsEditorPage.navigateToApiPlayground(),
    ]);

    await apiPlaygroundSettingsPage.waitForContentVisible();
    await apiPlaygroundSettingsPage.clickAiConfigurationTab();
    await apiPlaygroundSettingsPage.scrollToContextPluginsInActionCard();

    expect(
      await apiPlaygroundSettingsPage.isContextPluginsInActionCardVisible(),
    ).toBe(true);
    expect(await apiPlaygroundSettingsPage.isViewLiveExamplesButtonVisible()).toBe(
      true,
    );
  });

  test("PE03 - Let Us Handle the Setup card visibility", async ({ page }) => {
    await page.goto("/");
    const myApisPage = new MyApisPage(page);
    expect(await myApisPage.isPageDisplayed()).toBe(true);

    const docsEditorPage = new DocsEditorPage(page);
    await myApisPage.clickEditDocs();
    expect(await docsEditorPage.isPageDisplayed()).toBe(true);

    const [, apiPlaygroundSettingsPage] = await Promise.all([
      docsEditorPage.waitForApiPlaygroundOptionsResponse(),
      docsEditorPage.navigateToApiPlayground(),
    ]);

    await apiPlaygroundSettingsPage.waitForContentVisible();
    await apiPlaygroundSettingsPage.clickAiConfigurationTab();

    // Scroll up first, then to the target card before assertions.
    await apiPlaygroundSettingsPage.scrollToLetUsHandleSetupCard();

    expect(await apiPlaygroundSettingsPage.isLetUsHandleSetupCardVisible()).toBe(
      true,
    );
    expect(await apiPlaygroundSettingsPage.isSetThemUpForMeButtonVisible()).toBe(
      true,
    );
  });

  test("PE04 - Set Up Context Plugins section visibility", async ({ page }) => {
    await page.goto("/");
    const myApisPage = new MyApisPage(page);
    expect(await myApisPage.isPageDisplayed()).toBe(true);

    const docsEditorPage = new DocsEditorPage(page);
    await myApisPage.clickEditDocs();
    expect(await docsEditorPage.isPageDisplayed()).toBe(true);

    const [, apiPlaygroundSettingsPage] = await Promise.all([
      docsEditorPage.waitForApiPlaygroundOptionsResponse(),
      docsEditorPage.navigateToApiPlayground(),
    ]);

    await apiPlaygroundSettingsPage.waitForContentVisible();
    await apiPlaygroundSettingsPage.clickAiConfigurationTab();

    // Scroll to top first, then to the setup section before assertions.
    await apiPlaygroundSettingsPage.scrollToSetUpContextPluginsSection();

    expect(
      await apiPlaygroundSettingsPage.isSetUpContextPluginsHeaderVisible(),
    ).toBe(true);
    expect(await apiPlaygroundSettingsPage.isContextPluginsSetupStepsVisible()).toBe(
      true,
    );
  });

  test("PE05 - Set Up Context Plugins dropdown collapses card", async ({
    page,
  }) => {
    await page.goto("/");
    const myApisPage = new MyApisPage(page);
    expect(await myApisPage.isPageDisplayed()).toBe(true);

    const docsEditorPage = new DocsEditorPage(page);
    await myApisPage.clickEditDocs();
    expect(await docsEditorPage.isPageDisplayed()).toBe(true);

    const [, apiPlaygroundSettingsPage] = await Promise.all([
      docsEditorPage.waitForApiPlaygroundOptionsResponse(),
      docsEditorPage.navigateToApiPlayground(),
    ]);

    await apiPlaygroundSettingsPage.waitForContentVisible();
    await apiPlaygroundSettingsPage.clickAiConfigurationTab();
    await apiPlaygroundSettingsPage.scrollToSetUpContextPluginsSection();

    await apiPlaygroundSettingsPage.clickSetUpContextPluginsDropdown();

    expect(await apiPlaygroundSettingsPage.isSetUpContextPluginsChevronUp()).toBe(
      true,
    );
    expect(await apiPlaygroundSettingsPage.isContextPluginsSetupStepsCollapsed()).toBe(
      true,
    );
  });

  test("PE06 - Toggle API Copilot and Context Plugins then save", async ({
    page,
  }) => {
    const myApisPage = new MyApisPage(page);

    apiEntityId = await myApisPage.createApiEntity(
      "https://petstore.swagger.io/v2/swagger.json",
    );

    await page.goto(`/api-docs-editor/${apiEntityId}`);
    const docsEditorPage = new DocsEditorPage(page);

    expect(await docsEditorPage.isPageDisplayed()).toBe(true);

    const [, apiPlaygroundSettingsPage] = await Promise.all([
      docsEditorPage.waitForApiPlaygroundOptionsResponse(),
      docsEditorPage.navigateToApiPlayground(),
    ]);

    await apiPlaygroundSettingsPage.waitForContentVisible();
    await apiPlaygroundSettingsPage.clickAiConfigurationTab();

    const apiCopilotBgBefore =
      await apiPlaygroundSettingsPage.getToggleBackgroundColorForSection(
        "API Copilot",
      );
    const contextPluginsBgBefore =
      await apiPlaygroundSettingsPage.getToggleBackgroundColorForSection(
        "Context Plugins",
      );

    if (apiCopilotBgBefore !== "rgb(40, 195, 151)") {
      await apiPlaygroundSettingsPage.clickSectionToggleVisual("API Copilot");
    }

    if (contextPluginsBgBefore !== "rgb(40, 195, 151)") {
      await apiPlaygroundSettingsPage.clickSectionToggleVisual("Context Plugins");
    }

    // Save the Docs editor to persist the setting
    await docsEditorPage.clickSave();

    // Verify toggles are checked and the visuals show enabled color
    expect(await apiPlaygroundSettingsPage.isSectionToggleChecked("API Copilot")).toBe(
      true,
    );
    expect(
      await apiPlaygroundSettingsPage.isSectionToggleChecked("Context Plugins"),
    ).toBe(true);

    const apiCopilotBg =
      await apiPlaygroundSettingsPage.getToggleBackgroundColorForSection(
        "API Copilot",
      );
    const contextPluginsBg =
      await apiPlaygroundSettingsPage.getToggleBackgroundColorForSection(
        "Context Plugins",
      );

    expect(apiCopilotBg).toBe("rgb(40, 195, 151)");
    expect(contextPluginsBg).toBe("rgb(40, 195, 151)");

    await page.goto(`/api-docs-preview/portal-editor/${apiEntityId}`);
    const config = await docsEditorPage.getConfig();
    expect(config.showMarketingContentForContextPlugins).toBe(true);
  });
});

test.describe("Regression Tests", () => {
  test("Verifies Navigation is successful to Publish Portal if no changes made and saved", async ({
    page,
  }) => {
    await page.goto("/");
    const myApisPage = new MyApisPage(page);
    expect(await myApisPage.isPageDisplayed()).toBe(true);
    const apiEntityId = await myApisPage.getFirstEntityIdFromDashboard();
    await page.goto(`/api-docs-editor/${apiEntityId}`);
    const docsEditorPage = new DocsEditorPage(page);
    expect(await docsEditorPage.isPageDisplayed()).toBe(true);

    const apiPlaygroundSettingsPage =
      await docsEditorPage.navigateToApiPlayground();
    await apiPlaygroundSettingsPage.clickAiConfigurationTab();
    await docsEditorPage.clickSave();
    await docsEditorPage.clickPublishPortalBtn();

    //verify navigation is successful
    await expect(page).toHaveURL(/\/publishing-wizard$/);
  });

  test("Verifies Navigation is successful to Publish Portal on saving changes", async ({
    page,
  }) => {
    const myApisPage = new MyApisPage(page);

    apiEntityId = await myApisPage.createApiEntity(
      "https://petstore.swagger.io/v2/swagger.json",
    );

    await page.goto(`/api-docs-editor/${apiEntityId}`);
    const docsEditorPage = new DocsEditorPage(page);

    expect(await docsEditorPage.isPageDisplayed()).toBe(true);

    const apiPlaygroundSettingsPage =
      await docsEditorPage.navigateToApiPlayground();
    await apiPlaygroundSettingsPage.clickAiConfigurationTab();
    await apiPlaygroundSettingsPage.checkCopliot();

    await docsEditorPage.clickSave();
    await docsEditorPage.clickPublishPortalBtn();

    //verify navigation is successful
    await expect(page).toHaveURL(/\/publishing-wizard$/);
  });
});
