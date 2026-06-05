import { type Download, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MyApisPage extends BasePage {
  readonly myApis: Locator;
  readonly importApiBtn: Locator;
  readonly sampleApiBtn: Locator;
  readonly loggingSummaryDialog: Locator;
  readonly generateBtn: Locator;
  readonly proceedFromLoggingSummaryBtn: Locator;
  readonly proceedFromValidationSummaryBtn: Locator;
  readonly proceedBtn: Locator;
  readonly downloadSourceCodeBtn: Locator;
  readonly dotnetV2Btn: Locator;
  readonly alphaTag: Locator;
  readonly editDocsLink: Locator;
  readonly importNewApiItem: Locator;
  readonly browseFileBtn: Locator;
  readonly importSubmitBtn: Locator;
  readonly loggingSummaryList: Locator;
  readonly urlInput: Locator;
  readonly generateForAnotherLanguageBtn: Locator;
  readonly downloadZipBtn: Locator;
  readonly previewApiPortalBtn: Locator;
  readonly transformApiBtn: Locator;
  readonly transformFileInput: Locator;
  readonly transformFormatSelect: Locator;
  readonly transformConvertBtn: Locator;
  readonly threeDotsMenuBtn: Locator;
  readonly exportApiMenuItem: Locator;
  readonly exportDialogTitle: Locator;
  readonly exportBtn: Locator;
  readonly exportFormatSelect: Locator;
  readonly specifyUrlBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.myApis = page.getByRole("heading", { name: "Manage your APIs!" });
    this.importApiBtn = page.locator("a").filter({ hasText: "Import API" });
    this.sampleApiBtn = page
      .getByRole("listitem")
      .filter({ hasText: "Use Sample API" })
      .locator("a");
    this.loggingSummaryDialog = page
      .locator("#apiImportModal")
      .getByText("Logging Summary");
    this.generateBtn = page.getByText("Generate", { exact: true });
    this.proceedFromLoggingSummaryBtn = page.locator(
      '#apiImportModal input[type="button"]',
    );
    this.proceedFromValidationSummaryBtn = page
      .locator("button")
      .filter({ hasText: "Proceed" })
      .first();
    this.proceedBtn = page.locator("a").filter({ hasText: "Proceed" }).last();
    this.downloadSourceCodeBtn = page.getByText("Download Source Code");
    this.dotnetV2Btn = page.locator("span.platform-DotNetV2");
    this.editDocsLink = page.getByRole("link", { name: "Edit Docs" }).first();
    this.alphaTag = page.locator(".prerelease-tag-DotNetV2");
    this.importNewApiItem = page.getByText("Import New API", { exact: true });
    this.browseFileBtn = page.locator("#apiImportModal").getByText("Browse…");
    this.importSubmitBtn = page.locator(
      '#apiImportModal input[type="submit"][value="Import"]',
    );
    this.loggingSummaryList = page.locator("#apiImportModal ul");
    this.urlInput = page
      .locator("#apiImportModal")
      .getByPlaceholder(
        "Recommended for relative path references e.g., imports and includes",
      );
    this.generateForAnotherLanguageBtn = page.getByText(
      "Generate for another language",
      { exact: true },
    );
    this.downloadZipBtn = page.getByRole("link", { name: "Download Zip" });
    this.previewApiPortalBtn = page
      .getByRole("link", { name: "Preview API Portal" })
      .first();
    this.transformApiBtn = page.getByText("Transform API", { exact: true });
    this.transformFileInput = page
      .getByRole("dialog")
      .locator('input[type="file"]');
    this.transformFormatSelect = page.getByRole("dialog").locator("select");
    this.transformConvertBtn = page
      .getByRole("dialog")
      .getByRole("button", { name: "Convert" });
    this.threeDotsMenuBtn = page.locator("#menu-dropdwon").first();
    this.exportApiMenuItem = page.getByText("Export API", { exact: true });
    this.exportDialogTitle = page.getByRole("heading", {
      name: "Export API Description",
    });
    this.exportBtn = page.getByRole("button", { name: "Export" });
    this.exportFormatSelect = page.getByRole("dialog").locator("select").last();
    this.specifyUrlBtn = page.getByRole("textbox", { name: "Specify URL" });
  }

  async isPageDisplayed(): Promise<boolean> {
    await this.myApis.waitFor({ state: "visible" });
    await this.page.waitForLoadState("networkidle");
    return true;
  }

  async clickImportApi() {
    await this.importApiBtn.first().click();
  }

  async useSampleApi() {
    await this.sampleApiBtn.click();
  }
  async waitForApiEntitiesAndGetId(): Promise<string> {
    const apiBaseUrl =
      process.env.API_BASE_URL ?? "https://api.dev.apimatic.io";

    const response = await this.page.waitForResponse((res) => {
      return (
        res.url().startsWith(`${apiBaseUrl}/api-entities`) &&
        res.request().method() === "POST"
      );
    });

    const body = await response.json();
    return body.id as string;
  }

  async createApiEntity(url: string): Promise<string> {
    const apiBaseUrl =
      process.env.API_BASE_URL ?? "https://api.dev.apimatic.io";
    const apiKey = process.env.APIMATIC_API_KEY;

    if (!apiKey) {
      throw new Error("APIMATIC_API_KEY environment variable is not set");
    }

    const response = await this.page.request.post(
      `${apiBaseUrl}/api-entities/import-via-url`,
      {
        headers: {
          Authorization: `X-Auth-Key ${apiKey}`,
          "Content-Type":
            "application/vnd.apimatic.apiEntityUrlImportDto.v1+json",
          Accept: "application/json",
        },
        data: { url },
      },
    );

    if (!response.ok()) {
      throw new Error(
        `Failed to create API entity (${response.status()}): ${await response.text()}`,
      );
    }

    const body = (await response.json()) as { id?: string };
    if (!body.id) {
      throw new Error(
        "API entity creation succeeded but response id is missing",
      );
    }

    return body.id;
  }

  async deleteApiEntity(id: string): Promise<void> {
    const apiBaseUrl =
      process.env.API_BASE_URL ?? "https://api.dev.apimatic.io";
    const apiKey = process.env.APIMATIC_API_KEY;

    const response = await this.page.request.delete(
      `${apiBaseUrl}/api-entities/${id}`,
      {
        headers: apiKey ? { Authorization: `X-Auth-Key ${apiKey}` } : {},
      },
    );

    if (!response.ok()) {
      // Best-effort cleanup; don't fail the test on delete issues
      console.warn(
        `Failed to delete API entity ${id}: ${response.status()} ${response.statusText()}`,
      );
    }
  }

  async isLoggingSummaryDisplayed(): Promise<boolean> {
    await this.loggingSummaryDialog.waitFor({ state: "visible" });
    return true;
  }

  async clickGenerateAndWaitForValidation() {
    await this.generateBtn.first().click();
    await this.proceedBtn.waitFor({ state: "visible" });
  }

  async clickProceedBtn() {
    await this.proceedBtn.click();
  }

  async proceedFromLoggingSummary(): Promise<void> {
    const apiBaseUrl =
      process.env.API_BASE_URL ?? "https://api.dev.apimatic.io";
    await this.proceedFromLoggingSummaryBtn.waitFor({ state: "visible" });
    await Promise.all([
      this.page.waitForResponse(
        (res) =>
          res.url().startsWith(`${apiBaseUrl}/api-groups/`) &&
          res.request().method() === "GET" &&
          res.request().headers()["accept"]?.includes("withApiEntity") &&
          res.status() === 200,
      ),
      this.proceedFromLoggingSummaryBtn.click(),
    ]);
  }

  async proceedFromValidationSummary() {
    await this.page.keyboard.press("Escape");
  }

  async clickDownloadSourceCodeBtn() {
    await this.downloadSourceCodeBtn.click();
  }

  async verifyV2Exists(): Promise<boolean> {
    await this.dotnetV2Btn.waitFor({ state: "visible" });
    return this.dotnetV2Btn.isVisible();
  }

  async verifyAlphaTagExists(): Promise<boolean> {
    return this.alphaTag.isVisible();
  }

  async clickEditDocs() {
    await this.editDocsLink.click();
  }

  async closeModal() {
    await this.page.keyboard.press("Escape");
  }

  async importSpecViaFile(filePath: string): Promise<string> {
    const apiBaseUrl =
      process.env.API_BASE_URL ?? "https://api.dev.apimatic.io";
    await this.importApiBtn.first().click();
    await this.importNewApiItem.click();
    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await this.browseFileBtn.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (res) =>
          res.url() === `${apiBaseUrl}/api-entities` &&
          res.request().method() === "POST" &&
          res.status() === 201,
      ),
      this.importSubmitBtn.click(),
    ]);
    const body = await response.json();
    return body.id as string;
  }

  async importSpecViaUrl(url: string): Promise<string> {
    const apiBaseUrl =
      process.env.API_BASE_URL ?? "https://api.dev.apimatic.io";
    await this.importApiBtn.first().click();
    await this.importNewApiItem.click();
    await this.urlInput.fill(url);
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (res) =>
          res.url() === `${apiBaseUrl}/api-entities` &&
          res.request().method() === "POST" &&
          res.status() === 201,
      ),
      this.importSubmitBtn.click(),
    ]);
    const body = await response.json();
    return body.id as string;
  }

  getLanguageBtn(platform: string): Locator {
    return this.page.locator(`span.platform-${platform}`);
  }

  async downloadSdkAndWait(template: string): Promise<Download> {
    const apiBaseUrl =
      process.env.API_BASE_URL ?? "https://api.dev.apimatic.io";
    await this.page.waitForResponse(
      (res) =>
        res.url().startsWith(`${apiBaseUrl}/codegen`) &&
        res.url().includes(`template=${template}`) &&
        res.request().method() === "GET" &&
        res.status() === 200,
    );
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.downloadZipBtn.click(),
    ]);
    await download.path();
    return download;
  }

  getApiEntityCard(name: string): Locator {
    return this.page.getByRole("heading", { name, exact: true });
  }

  async getFirstEntityIdFromDashboard(): Promise<string> {
    const href = await this.page
      .getByRole("link", { name: "Edit API" })
      .first()
      .getAttribute("href");
    const id = href?.split("/").pop() ?? "";
    if (!id) throw new Error("Could not extract entity ID from dashboard card");
    return id;
  }

  async clickGenerateForAnotherLanguageBtn() {
    await this.generateForAnotherLanguageBtn.click();
  }

  async openTransformApiModal() {
    await this.transformApiBtn.click();
  }

  async setInputFileForTransform(filePath: string) {
    await this.transformFileInput.setInputFiles(filePath);
  }

  async transformSpecAndDownload(
    formatValue: string,
    retry = true,
  ): Promise<Download> {
    const apiBaseUrl =
      process.env.API_BASE_URL ?? "https://api.dev.apimatic.io";
    await this.transformFormatSelect.selectOption({
      value: `string:${formatValue}`,
    });

    const downloadPromise = this.page.waitForEvent("download");
    await this.transformConvertBtn.click();

    const transformationResponse = await this.page.waitForResponse(
      (res) =>
        res.url() === `${apiBaseUrl}/transformations` &&
        res.request().method() === "POST",
    );

    if (transformationResponse.status() === 429 && retry) {
      const retryAfterHeader = transformationResponse.headers()["retry-after"];
      const waitMs = retryAfterHeader
        ? parseInt(retryAfterHeader, 10) * 1000
        : 60_000;
      await this.page.waitForTimeout(waitMs);
      await this.page.keyboard.press("Escape");
      await this.page.waitForTimeout(300);
      await this.transformApiBtn.click();
      await this.page.waitForTimeout(400);
      return this.transformSpecAndDownload(formatValue, false);
    }

    if (transformationResponse.status() !== 201) {
      throw new Error(
        `Transformation failed with status ${transformationResponse.status()}`,
      );
    }
    await this.page.waitForTimeout(500);

    const hasProceed = await this.page.evaluate(() =>
      Array.from(document.querySelectorAll(".transformer-import-modal a")).some(
        (a) =>
          (a as HTMLElement).textContent?.trim() === "Proceed" &&
          (a as HTMLElement).offsetParent !== null,
      ),
    );
    if (hasProceed) {
      await this.page
        .getByText("Proceed")
        .filter({ visible: true })
        .first()
        .click();
    }

    const download = await downloadPromise;
    await download.path();
    return download;
  }

  async openThreeDotsMenu(): Promise<void> {
    await this.threeDotsMenuBtn.click();
  }

  async clickExportApi(): Promise<void> {
    await this.exportApiMenuItem.click();
  }

  async isExportDialogVisible(): Promise<boolean> {
    await this.exportDialogTitle.waitFor({ state: "visible" });
    return true;
  }

  async selectExportFormat(formatValue: string): Promise<void> {
    await this.exportFormatSelect.selectOption({
      value: `string:${formatValue}`,
    });
  }

  async clickExportAndGetNewTab(): Promise<Page> {
    const [newTab] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.exportBtn.click(),
    ]);
    await newTab.waitForLoadState("domcontentloaded");
    return newTab;
  }

  async clickPreviewApiPortalAndCaptureDocsgenResponse(): Promise<{
    previewPage: import("@playwright/test").Page;
    status: number;
  }> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.previewApiPortalBtn.click(),
    ]);
    const response = await newPage.waitForResponse(
      (res) =>
        res.url().includes("/docsgen") &&
        res.request().method() === "GET" &&
        res.status() === 200,
    );
    return { previewPage: newPage, status: response.status() };
  }

  async specifyUrlForTransform(url: string) {
    await this.specifyUrlBtn.fill(url);
  }
}
