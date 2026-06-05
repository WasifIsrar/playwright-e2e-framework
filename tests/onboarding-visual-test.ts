import { test, expect } from "@playwright/test";
import { SetupPage } from "../pages/SetupPage.ts";

let setupPage: SetupPage;

// Auth is provided by the `onboarding-setup` project via storageState, so every
// test starts already logged in. Each test gets its own fresh page fixture, so
// navigating to "/" here gives a clean, fully-settled onboarding screen — no
// re-login and no reload() needed to reset state between tests.
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  setupPage = new SetupPage(page);
  expect(await setupPage.isPageDisplayed()).toBe(true);
});

test("Build It Yourself Screen - Top", async () => {
  expect(await setupPage.isPageDisplayed()).toBe(true);
  await expect(setupPage.page).toHaveScreenshot("build-it-yourself-first.png", {
    maxDiffPixelRatio: 0.03,
  });
});

test("Build It Yourself Screen - Bottom", async () => {
  await setupPage.page.evaluate(() =>
    window.scrollTo(0, document.body.scrollHeight),
  );
  await expect(setupPage.page).toHaveScreenshot(
    "build-it-yourself-bottom.png",
    {
      maxDiffPixelRatio: 0.03,
    },
  );
});

test("Download Your Project - Expanded", async () => {
  await setupPage.clickDownloadYourProject();
  await expect(setupPage.page).toHaveScreenshot(
    "download-your-project-expanded.png",
    {
      maxDiffPixelRatio: 0.03,
    },
  );
});

test("Navigate Step - Expanded", async () => {
  await setupPage.clickNavigateStep();
  await expect(setupPage.page).toHaveScreenshot("navigate-step-expanded.png", {
    maxDiffPixelRatio: 0.03,
  });
});

test("Preview Step - Expanded", async () => {
  await setupPage.clickPreviewStep();
  await expect(setupPage.page).toHaveScreenshot("preview-step-expanded.png", {
    maxDiffPixelRatio: 0.03,
  });
});

test("Skills Step - Expanded", async () => {
  await setupPage.clickSkillsStep();
  await expect(setupPage.page).toHaveScreenshot("skills-step-expanded.png", {
    maxDiffPixelRatio: 0.03,
  });
});

test.describe("Cards Tests", () => {
  test("Theme Card", async () => {
    await setupPage.openThemeCard();
    await expect(setupPage.page).toHaveScreenshot("theme-card-ai-setup.png", {
      maxDiffPixelRatio: 0.03,
    });
    await setupPage.switchToCLISetup();
    await expect(setupPage.page).toHaveScreenshot("theme-card-cli-setup.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Documentation Card", async () => {
    await setupPage.openDocumentationCard();
    await expect(setupPage.page).toHaveScreenshot(
      "documentation-card-ai-setup.png",
      {
        maxDiffPixelRatio: 0.03,
      },
    );
    await setupPage.switchToCLISetup();
    await expect(setupPage.page).toHaveScreenshot(
      "documentation-card-cli-setup.png",
      {
        maxDiffPixelRatio: 0.03,
      },
    );
  });

  test("Recipe Card", async () => {
    await setupPage.openRecipeCard();
    await expect(setupPage.page).toHaveScreenshot("recipe-card-ai-setup.png", {
      maxDiffPixelRatio: 0.03,
    });
    await setupPage.switchToCLISetup();
    await expect(setupPage.page).toHaveScreenshot("recipe-card-cli-setup.png", {
      maxDiffPixelRatio: 0.03,
    });
  });

  test("Customize SDK Card", async () => {
    await setupPage.openCustomizedSDKCard();
    await expect(setupPage.page).toHaveScreenshot(
      "customize-sdk-card-ai-setup.png",
      {
        maxDiffPixelRatio: 0.03,
      },
    );
    await setupPage.switchToCLISetup();
    await expect(setupPage.page).toHaveScreenshot(
      "customize-sdk-card-cli-setup.png",
      {
        maxDiffPixelRatio: 0.03,
      },
    );
  });

  test("Publish SDK Card", async () => {
    await setupPage.openPublishSDKCard();
    await expect(setupPage.page).toHaveScreenshot(
      "publish-sdk-card-ai-setup.png",
      {
        maxDiffPixelRatio: 0.03,
      },
    );
  });

  test("Copilot Card", async () => {
    await setupPage.openCopilotCard();
    await expect(setupPage.page).toHaveScreenshot("copilot-card-ai-setup.png", {
      maxDiffPixelRatio: 0.03,
    });
    await setupPage.switchToCLISetup();
    await expect(setupPage.page).toHaveScreenshot(
      "copilot-card-cli-setup.png",
      {
        maxDiffPixelRatio: 0.03,
      },
    );
  });
});
