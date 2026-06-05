import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ApiPlaygroundSettingsPage } from "./ApiPlaygroundSettingsPage";

export class DocsEditorPage extends BasePage {
  readonly saveBtn: Locator;
  readonly previewBtn: Locator;
  readonly apiPlaygroundLink: Locator;
  readonly getStartedImage: Locator;
  readonly publishPortalBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.saveBtn = page.getByRole("button", { name: "Save" });
    this.previewBtn = page.getByRole("button", { name: "Preview" });
    this.apiPlaygroundLink = page.getByRole("link", {
      name: "API Playground",
    });
    this.getStartedImage = page.getByRole("button", { name: "Get Started" });
    this.publishPortalBtn = page.getByRole("button", {
      name: "Publish Portal",
    });
  }

  async isPageDisplayed(): Promise<boolean> {
    await this.getStartedImage.waitFor({ state: "visible" });
    return true;
  }

  async clickSave() {
    await this.saveBtn.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickPreview(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.previewBtn.click(),
    ]);
    await newPage.waitForLoadState("domcontentloaded");
    return newPage;
  }

  async clickPreviewAndCaptureDocsgenResponse(): Promise<{
    previewPage: Page;
    status: number;
  }> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.previewBtn.click(),
    ]);
    const response = await newPage.waitForNavigation({
      waitUntil: "domcontentloaded",
    });
    return { previewPage: newPage, status: response?.status() ?? 0 };
  }

  async navigateToApiPlayground(): Promise<ApiPlaygroundSettingsPage> {
    await this.apiPlaygroundLink.click();
    return new ApiPlaygroundSettingsPage(this.page);
  }

  async waitForApiPlaygroundOptionsResponse(): Promise<{
    useLegacyApiPlayground: boolean;
  }> {
    const response = await this.page.waitForResponse((res) =>
      res.url().includes("draft-portal-settings/api-playground-options"),
    );
    const body = await response.json();
    return body.apiPlaygroundOptions as { useLegacyApiPlayground: boolean };
  }
  async getConfig(): Promise<Record<string, unknown>> {
    const config = await this.page.evaluate(() => {
      const scripts = Array.from(
        document.querySelectorAll("script:not([src])"),
      );
      for (const script of scripts) {
        const match = script.textContent.match(
          /APIMaticDevPortal\.show\s*\(\s*(\{[\s\S]*\})\s*\)/,
        );
        if (match) {
          return JSON.parse(match[1]);
        }
      }
      return null;
    });

    if (!config)
      throw new Error("APIMaticDevPortal.show() config not found on page");
    return config;
  }

  async clickPublishPortalBtn() {
    await this.publishPortalBtn.click();
  }
}
