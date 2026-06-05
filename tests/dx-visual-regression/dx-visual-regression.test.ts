import { test, expect } from "@playwright/test";
import {
  updatePortalJsProperty,
  createTempPortalJs,
} from "../../utils/dx-utils";

test.describe("Generated Portal @generated_portal", () => {
  test("Checks Getting Started Page - cosmos - light", async ({ page }) => {
    await page.goto("/", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot("gettting-started-page.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Recipe - cosmos - light - legacy", async ({ page }) => {
    await page.goto("#/rest/api-recipes/how-to-get-pet", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot("recipe_content.png", {
      maxDiffPixelRatio: 0.03,
    });
    await page.getByText("NEXT", { exact: true }).click();
    await expect(page).toHaveScreenshot("recipe_endpoint.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Endpoint Page - cosmos - light - legacy", async ({ page }) => {
    await page.goto("#/rest/api-endpoints/pet/update-pet", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot("endpoint_page.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Getting Started Page - cosmos - dark", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "defaultMode",
      newValue: "dark",
      page,
    });

    await page.goto("/", {
      waitUntil: "domcontentloaded",
    });

    await expect(page).toHaveScreenshot("gettting-started-page-dark.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Getting Started Page - standard - light", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "baseTheme",
      newValue: "standard",
      page,
    });

    await page.goto("/", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot("gettting-started-standard-light.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Endpoint Page - cosmos - dark - legacy", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "defaultMode",
      newValue: "dark",
      page,
    });

    await page.goto("#/rest/api-endpoints/pet/update-pet", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot("endpoint_page-cosmos-dark.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Recipe - cosmos - dark - legacy", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "defaultMode",
      newValue: "dark",
      page,
    });

    await page.goto("#/rest/api-recipes/how-to-get-pet", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot("recipe_content-cosmos-dark.png", {
      maxDiffPixelRatio: 0.03,
    });
    await page.getByText("NEXT", { exact: true }).click();
    await expect(page).toHaveScreenshot("recipe_endpoint-cosmos-dark.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Endpoint Page - standard - light - legacy", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "baseTheme",
      newValue: "standard",
      page,
    });

    await page.goto("#/rest/api-endpoints/pet/update-pet", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot("endpoint_page-standard-light.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Recipe - standard - light - legacy", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "baseTheme",
      newValue: "standard",
      page,
    });

    await page.goto("#/rest/api-recipes/how-to-get-pet", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot("recipe_content-standard-light.png", {
      maxDiffPixelRatio: 0.03,
    });
    await page.getByText("NEXT", { exact: true }).click();
    await expect(page).toHaveScreenshot("recipe_endpoint-standard-light.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Getting Started Page - standard - dark", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "defaultMode",
      newValue: "dark",
      page,
    });

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "baseTheme",
      newValue: "standard",
    });

    await page.goto("/", {
      waitUntil: "domcontentloaded",
    });

    await expect(page).toHaveScreenshot("gettting-started-standard-dark.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Endpoint Page - standard - dark - legacy", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "baseTheme",
      newValue: "standard",
      page,
    });

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "defaultMode",
      newValue: "dark",
    });

    await page.goto("#/rest/api-endpoints/pet/update-pet", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot("endpoint_page-standard-dark.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Recipe - standard - dark - legacy", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "baseTheme",
      newValue: "standard",
      page,
    });

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "defaultMode",
      newValue: "dark",
    });

    await page.goto("#/rest/api-recipes/how-to-get-pet", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot("recipe_content-standard-dark.png", {
      maxDiffPixelRatio: 0.03,
    });
    await page.getByText("NEXT", { exact: true }).click();
    await expect(page).toHaveScreenshot("recipe_endpoint-standard-dark.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Endpoint Page - cosmos - light - drawer", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );
    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "useLegacyApiPlayground",
      newValue: "false",
      page,
    });

    await page.goto("#/rest/api-endpoints/test/test-request-body", {
      //capture screenshot for request body
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot(
      "endpoint_page-cosmos-light-drawer.png",
      { maxDiffPixelRatio: 0.03 },
    );

    await page.goto(
      "#/rest/api-endpoints/test/test-request-body?isPopup=true",
      {
        //capture screenshot for drawer opened state
        waitUntil: "domcontentloaded",
      },
    );
    await expect(page).toHaveScreenshot(
      "endpoint_page-cosmos-light-drawer-opened.png",
      { maxDiffPixelRatio: 0.03 },
    );
  });

  test("Checks Endpoint Page - cosmos - dark - drawer", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "useLegacyApiPlayground",
      newValue: "false",
      page,
    });

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "defaultMode",
      newValue: "dark",
    });

    await page.goto(
      "#/rest/api-endpoints/test/test-request-body?isPopup=true",
      {
        //capture screenshot for drawer opened state
        waitUntil: "domcontentloaded",
      },
    );
    await expect(page).toHaveScreenshot(
      "endpoint_page-cosmos-dark-drawer.png",
      {
        maxDiffPixelRatio: 0.03,
      },
    );
  });

  test("Checks Endpoint Page - standard - light - drawer", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "useLegacyApiPlayground",
      newValue: "false",
      page,
    });

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "baseTheme",
      newValue: "standard",
    });

    await page.goto("#/rest/api-endpoints/pet/get-pet-by-id", {
      //capture screenshot for drawer closed state
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot(
      "endpoint_page-standard-light-drawer.png",
      { maxDiffPixelRatio: 0.03 },
    );

    await page.goto("#/rest/api-endpoints/pet/get-pet-by-id?isPopup=true", {
      //capture screenshot for drawer opened state
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot(
      "endpoint_page-standard-light-drawer-opened.png",
      { maxDiffPixelRatio: 0.03 },
    );
  });

  test("Checks Endpoint Page - standard - dark - drawer", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "useLegacyApiPlayground",
      newValue: "false",
      page,
    });

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "baseTheme",
      newValue: "standard",
    });

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "defaultMode",
      newValue: "dark",
    });

    await page.goto("#/rest/api-endpoints/pet/get-pet-by-id?isPopup=true", {
      //capture screenshot for drawer opened state
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot(
      "endpoint_page-standard-dark-drawer-opened.png",
      { maxDiffPixelRatio: 0.03 },
    );
  });

  test("Checks Deprecated Tag on all levels - Legacy", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 2000 });
    await page.goto("#/rest/api-endpoints/pagination/create-page-number", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot("deprecated-tag-legacy.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Deprecated Tag on all levels - Drawer", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "useLegacyApiPlayground",
      newValue: "false",
      page,
    });

    await page.setViewportSize({ width: 1280, height: 2000 });
    await page.goto(
      "#/rest/api-endpoints/pagination/create-page-number?isPopup=true",
      {
        waitUntil: "domcontentloaded",
      },
    );
    await expect(page).toHaveScreenshot("deprecated-tag-drawer.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Only Get SDK and Search button", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "enableExport",
      newValue: "false",
      page,
    });

    await page.goto("#/rest/getting-started/how-to-get-started", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot("get-sdk-search-button.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Get SDK button Clicked for Published Package - light", async ({
    page,
  }) => {
    await page.goto(
      "#/net-standard-library/getting-started/how-to-get-started",
      {
        waitUntil: "domcontentloaded",
      },
    );
    await page.getByTestId("get-sdk-button").click();

    await expect(page).toHaveScreenshot("get-sdk-published-light.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Get SDK button Clicked for Published Package - dark", async ({
    page,
  }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "defaultMode",
      newValue: "dark",
      page,
    });

    await page.goto(
      "#/net-standard-library/getting-started/how-to-get-started",
      {
        waitUntil: "domcontentloaded",
      },
    );
    await page.getByTestId("get-sdk-button").click();

    await expect(page).toHaveScreenshot("get-sdk-published-dark.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Getting Started Page - mode dropdown - variation basic", async ({
    page,
  }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "mode",
      newValue: "dropdown",
      page,
    });

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "variation",
      newValue: "basic",
    });

    await page.goto("#/rest/custom-content/api-reference", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot(
      "sidebar-mode-dropdown-variation-basic.png",
      { maxDiffPixelRatio: 0.03 },
    );
  });

  test("Checks Getting Started Page - mode standard - variation expanded", async ({
    page,
  }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "mode",
      newValue: "standard",
      page,
    });

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "variation",
      newValue: "expanded",
    });

    await page.goto("/", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot(
      "sidebar-mode-standard-variation-expanded.png",
      { maxDiffPixelRatio: 0.03 },
    );
  });

  test("Checks Getting Started Page - mode dropdown - variation expanded", async ({
    page,
  }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "mode",
      newValue: "dropdown",
      page,
    });

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "variation",
      newValue: "expanded",
    });

    await page.goto("#/rest/custom-content/api-reference", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot(
      "sidebar-mode-dropdown-variation-expanded.png",
      { maxDiffPixelRatio: 0.03 },
    );
  });

  test("Checks Getting Started Page - mode standard - variation collapsed", async ({
    page,
  }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/generated_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "mode",
      newValue: "standard",
      page,
    });

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "variation",
      newValue: "collapsed",
    });

    await page.goto("/", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot(
      "sidebar-mode-standard-variation-collapsed.png",
      { maxDiffPixelRatio: 0.03 },
    );
  });
});

test.describe("Thoughtspot Portal @thoughtspot_portal", () => {
  test("Checks Getting Started Page - themeoverrides - legacy", async ({
    page,
  }) => {
    await page.goto("/", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot(
      "gettting-started-page-themeoverrides.png",
      { maxDiffPixelRatio: 0.03 },
    );
  });

  test("Checks Recipe - themeoverrides - legacy", async ({ page }) => {
    await page.goto("#/http/api-recipes/my-test-api-recipe", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot("recipe_content_themeoverrides.png", {
      maxDiffPixelRatio: 0.03,
    });
    await page.getByText("NEXT", { exact: true }).click();
    await expect(page).toHaveScreenshot("recipe_endpoint_themeoverrides.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Endpoint Page - themeoverrides - legacy", async ({ page }) => {
    await page.goto("#/http/api-endpoints/connections/search-connection", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot(
      "endpoint_page_themeoverrides_legacy.png",
      { maxDiffPixelRatio: 0.03 },
    );
  });

  test("Checks Endpoint Page - themeoverrides - drawer", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/thoughtspot_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "useLegacyApiPlayground",
      newValue: "false",
      page,
    });

    await page.goto(
      "#/http/api-endpoints/connections/search-connection?isPopup=true",
      {
        waitUntil: "domcontentloaded",
      },
    );
    await expect(page).toHaveScreenshot(
      "endpoint_page_themeoverrides_drawer.png",
      { maxDiffPixelRatio: 0.03 },
    );
  });

  test("Checks API Spec button and Search button", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/thoughtspot_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "enableExport",
      newValue: "true",
      page,
    });

    await page.goto("/", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot("download-api-spec-search-button.png", {
      maxDiffPixelRatio: 0.03,
    });
  });
});

test.describe("Generated Portal @custom_components", () => {
  test("Checks accordion collapsed ", async ({ page }) => {
    await page.goto("#/typescript/developer-guides/sample-guide", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveScreenshot("accordion_collapsed.png", {
      maxDiffPixelRatio: 0.03,
    });
  });
  test("checks mermaid diagram", async ({ page }) => {
    await page.goto("#/typescript/developer-guides/sample-guide", {
      waitUntil: "domcontentloaded",
    });
    const mermaidDiagram = page.locator(".mermaid-wrapper").first();
    await mermaidDiagram.locator("svg").first().waitFor({ state: "visible" });
    await mermaidDiagram.scrollIntoViewIfNeeded();
    await expect(page).toHaveScreenshot("mermaid_diagram.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("checks errored mermaid diagram", async ({ page }) => {
    await page.goto("#/typescript/developer-guides/sample-guide", {
      waitUntil: "domcontentloaded",
    });
    const erroredMermaidDiagram = page
      .locator(".mermaid-wrapper")
      .filter({ has: page.locator("pre") })
      .first();
    await erroredMermaidDiagram.scrollIntoViewIfNeeded();
    await expect(page).toHaveScreenshot("errored_mermaid_diagram.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks properties for accordion component", async ({ page }) => {
    await page.goto("#/typescript/developer-guides/sample-guide", {
      waitUntil: "domcontentloaded",
    });
    const propertiesTable = page
      .locator(".table-wrapper")
      .filter({ has: page.getByRole("cell", { name: "title" }) })
      .first();
    await propertiesTable.scrollIntoViewIfNeeded();
    await expect(page).toHaveScreenshot("accordion_properties.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks system overview callout", async ({ page }) => {
    await page.goto("#/typescript/developer-guides/sample-guide", {
      waitUntil: "domcontentloaded",
    });
    const systemOverview = page
      .getByRole("heading", { name: "System Overview", exact: true })
      .locator("..");
    await systemOverview.scrollIntoViewIfNeeded();
    await expect(page).toHaveScreenshot("system_overview.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks visit apimatic card", async ({ page }) => {
    await page.goto("#/typescript/developer-guides/sample-guide", {
      waitUntil: "domcontentloaded",
    });
    const visitApimaticCard = page
      .getByRole("heading", { name: "Visit APIMatic", exact: true })
      .locator("../..");
    await visitApimaticCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("visit_apimatic_card.png", {
      maxDiffPixelRatio: 0.05,
    });
  });

  test("Checks frame image lightbox", async ({ page }) => {
    await page.goto("#/typescript/developer-guides/sample-guide", {
      waitUntil: "domcontentloaded",
    });
    const frameImage = page.getByAltText("Yosemite Valley");
    await frameImage.scrollIntoViewIfNeeded();
    await frameImage.click();
    const lightbox = page.locator('[aria-label="Close frame"]');
    await lightbox.waitFor({ state: "visible" });
    await expect(page).toHaveScreenshot("frame_image_lightbox.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks video player", async ({ page }) => {
    await page.goto("#/typescript/developer-guides/sample-guide", {
      waitUntil: "domcontentloaded",
    });
    const videoPlayer = page.getByTestId("video-player-iframe");
    await videoPlayer.waitFor({ state: "visible" });
    const videoFrame = videoPlayer.frameLocator("iframe").first();
    await videoFrame
      .locator("video, .html5-video-player")
      .first()
      .waitFor({ state: "attached", timeout: 15000 })
      .catch(() => {});
    await videoPlayer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot("video_player.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks code block", async ({ page }) => {
    await page.goto("#/typescript/developer-guides/sample-guide", {
      waitUntil: "domcontentloaded",
    });
    const codeBlock = page
      .locator("pre")
      .filter({ has: page.locator("code.language-ruby") })
      .first();
    await codeBlock.scrollIntoViewIfNeeded();
    await expect(page).toHaveScreenshot("code_block.png", {
      maxDiffPixelRatio: 0.03,
    });
  });
});

test.describe("Maxio Portal @maxio_portal", () => {
  test("Checks Getting Started Page for Csharp language where context plugins are visible - maxio", async ({
    page,
  }) => {
    await page.goto(
      "#/net-standard-library/getting-started/how-to-get-started",
      {
        waitUntil: "domcontentloaded",
      },
    );
    const contextPlugins = page.locator('[data-tour="context-plugins"]');
    await contextPlugins
      .locator("button.cursor svg")
      .waitFor({ state: "visible" });
    await contextPlugins
      .locator("button.vscode svg")
      .waitFor({ state: "visible" });
    await contextPlugins
      .locator("button.claude svg")
      .waitFor({ state: "visible" });
    await expect(page).toHaveScreenshot(
      "gettting-started-page-maxio-light.png",
      {
        maxDiffPixelRatio: 0.03,
      },
    );
  });

  test("Checks Context Plugin - Cursor", async ({ page }) => {
    await page.goto(
      "#/net-standard-library/getting-started/how-to-get-started",
      {
        waitUntil: "domcontentloaded",
      },
    );
    const contextPlugins = page.locator('[data-tour="context-plugins"]');
    await contextPlugins.waitFor({ state: "visible" });
    const cursorBtn = contextPlugins.locator("button.cursor");
    await cursorBtn.click();
    await expect(page).toHaveScreenshot("context-plugin-cursor.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Context Plugin - VS Code", async ({ page }) => {
    await page.goto(
      "#/net-standard-library/getting-started/how-to-get-started",
      {
        waitUntil: "domcontentloaded",
      },
    );
    const contextPlugins = page.locator('[data-tour="context-plugins"]');
    await contextPlugins.waitFor({ state: "visible" });
    const vscodeBtn = contextPlugins.locator("button.vscode");
    await vscodeBtn.click();
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("context-plugin-vscode.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Context Plugin - Claude", async ({ page }) => {
    await page.goto(
      "#/net-standard-library/getting-started/how-to-get-started",
      {
        waitUntil: "domcontentloaded",
      },
    );
    const contextPlugins = page.locator('[data-tour="context-plugins"]');
    await contextPlugins.waitFor({ state: "visible" });
    const claudeBtn = contextPlugins.locator("button.claude");
    await claudeBtn.click();
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("context-plugin-claude.png", {
      maxDiffPixelRatio: 0.03,
    });
  });
});

test.describe("Generated Portal Pages @generated_portal", () => {
  test("Checks Model Page - structures", async ({ page }) => {
    await page.goto(
      "#/net-standard-library/models/structures/test-request-body",
      { waitUntil: "domcontentloaded" },
    );
    await expect(page).toHaveScreenshot("model_page_structures.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks SDK Infrastructure - configuration", async ({ page }) => {
    await page.goto(
      "#/net-standard-library/sdk-infrastructure/configuration/configuration-based-initialization",
      { waitUntil: "domcontentloaded" },
    );
    await expect(page).toHaveScreenshot("sdk_infra_configuration.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks OneOf/AnyOf Definitions Page", async ({ page }) => {
    await page.goto(
      "#/net-standard-library/models/oneof-anyof-definitions/test-request-body-combinator-required-nullable",
      { waitUntil: "domcontentloaded" },
    );
    await expect(page).toHaveScreenshot("oneof_anyof_definitions.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks OneOf/AnyOf Definitions Page - expanded", async ({ page }) => {
    await page.goto(
      "#/net-standard-library/models/oneof-anyof-definitions/test-request-body-combinator-required-nullable",
      { waitUntil: "domcontentloaded" },
    );
    const chevron = page
      .locator("span")
      .filter({ has: page.locator("svg.lucide-chevron-down") })
      .first();
    await chevron.waitFor({ state: "visible" });
    await chevron.evaluate((el) => (el as HTMLElement).click());
    const expandedCode = page.locator("code").filter({
      hasText:
        "TestRequestBodyCombinatorRequiredNullable.FromString(string mString)",
    });
    await expandedCode.waitFor({ state: "visible" });
    await expect(page).toHaveScreenshot(
      "oneof_anyof_definitions_expanded.png",
      { maxDiffPixelRatio: 0.03 },
    );
  });

  test("Checks space between code blocks on Getting Started", async ({
    page,
  }) => {
    await page.goto("#/rest/getting-started/how-to-get-started", {
      waitUntil: "domcontentloaded",
    });
    const scrollContainer = page.locator("#scroll-container");
    await scrollContainer.waitFor({ state: "visible" });
    await scrollContainer.click();
    await page.keyboard.press("End");
    const feedbackText = page.getByText("Was this page helpful?");
    await feedbackText.waitFor({ state: "visible" });
    await expect(page).toHaveScreenshot("code_blocks_spacing.png", {
      maxDiffPixelRatio: 0.03,
    });
  });
});

test.describe("General Portal Tests @general_portal", () => {
  const moreOptionsBtn = "ai-assisted-menu-toggle";
  test("Checks Copy Button - cosmos - light ", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveScreenshot("copyButton-cosmos-light.png", {
      maxDiffPixelRatio: 0.03,
    });
    await page.getByTestId(moreOptionsBtn).click();
    await expect(page).toHaveScreenshot("aiAssistMenu-cosmos-light.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Copy Button - cosmos - dark ", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/general_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "defaultMode",
      newValue: "dark",
      page,
    });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveScreenshot("copyButton-cosmos-dark.png", {
      maxDiffPixelRatio: 0.03,
    });
    await page.getByTestId(moreOptionsBtn).click();
    await expect(page).toHaveScreenshot("aiAssistMenu-cosmos-dark.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Copy Button - standard - light ", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/general_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "baseTheme",
      newValue: "standard",
      page,
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveScreenshot("copyButton-standard-light.png", {
      maxDiffPixelRatio: 0.03,
    });
    await page.getByTestId(moreOptionsBtn).click();
    await expect(page).toHaveScreenshot("aiAssistMenu-standard-light.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks Copy Button - standard - dark ", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/general_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "baseTheme",
      newValue: "standard",
      page,
    });

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "defaultMode",
      newValue: "dark",
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveScreenshot("copyButton-standard-dark.png", {
      maxDiffPixelRatio: 0.03,
    });
    await page.getByTestId(moreOptionsBtn).click();
    await expect(page).toHaveScreenshot("aiAssistMenu-standard-dark.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Checks AI Assist Button", async ({ page }) => {
    const tempPortalPath = createTempPortalJs(
      "dx-test-portals/general_portal/static/js/portal.js",
    );

    updatePortalJsProperty({
      filePath: tempPortalPath,
      property: "showCopyPage",
      newValue: "false",
      page,
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveScreenshot("aiAssist-button.png", {
      maxDiffPixelRatio: 0.03,
    });
    await page.getByTestId(moreOptionsBtn).click();
    await expect(page).toHaveScreenshot("aiAssistMenu-no-copy.png", {
      maxDiffPixelRatio: 0.03,
    });
  });
});
