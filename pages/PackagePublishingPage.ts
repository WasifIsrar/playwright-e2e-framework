import { BasePage } from "./BasePage";
import { type Download, type Locator, type Page } from "@playwright/test";

interface PublishEvent {
  sdkLanguage: string;
  publishType: "SourceCode" | "Package";
  eventType: "Succeeded" | "Failed" | "InProgress";
}

interface PublishLog {
  events: PublishEvent[];
}

const languageMap: Record<string, string> = {
  csharp: "CSharp",
  java: "Java",
  php: "Php",
  python: "Python",
  ruby: "Ruby",
  typescript: "TypeScript",
};

export class PackagePublishingPage extends BasePage {
  readonly packageVersionsField: Locator;
  readonly chooseLanguageBtn: Locator;
  readonly publishBtn: Locator;
  readonly publishNowBtn: Locator;
  readonly publishInProgress: Locator;

  constructor(page: Page) {
    super(page);
    this.packageVersionsField = page.getByRole("textbox", {
      name: "Provide version number for the C#, Java, PHP, Python, Ruby and TypeScript packages",
    });
    this.chooseLanguageBtn = page.locator(
      'input[name="singleVersion"] + button',
    );
    this.publishBtn = page.getByRole("button", {
      name: "Publish Packages and Source Code",
    });
    this.publishNowBtn = page.getByRole("button", { name: "Publish now" });
    this.publishInProgress = page.getByRole("heading", {
      name: "Publish In Progress",
    });
  }

  async isPageDisplayed() {
    await this.packageVersionsField.waitFor({ state: "visible" });
  }

  async clickVersionField() {
    await this.packageVersionsField.click();
  }

  async chooseLanguage() {
    await this.chooseLanguageBtn.click();
  }

  async uncheckLanguage(language: string) {
    await this.page
      .locator(`[name="packages.${language}.shouldPublish"]`)
      .locator("..")
      .click();
  }
  async clickPublishBtn() {
    this.publishBtn.click();
  }

  async enterVersionNumber(language: string, versionNumber: string) {
    await this.page
      .locator(`[name="packages.${language}.version"]`)
      .fill(versionNumber);
  }

  async clickPublishNowBtn() {
    this.publishNowBtn.click();
  }

  async waitForPublishingInProgress() {
    await this.publishInProgress.waitFor({
      state: "visible",
      timeout: 120_000,
    });
  }

  async waitForPublishSuccess(
    language: string,
    apiGroupId: string,
    timeoutMs = 600_000,
    intervalMs = 10_000,
  ): Promise<void> {
    const apiLanguage = languageMap[language.toLowerCase()];
    if (!apiLanguage) throw new Error(`Unknown language: ${language}`);

    const baseUrl =
      process.env.PACKAGE_PUBLISHING_API_URL ??
      "https://api.package-publishing.dev.apimatic.io";
    const url = `${baseUrl}/api/publish-logs?apiGroupId=${apiGroupId}`;
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
      const response = await this.page.context().request.get(url, {
        headers: { Accept: "application/json" },
      });

      if (!response.ok()) {
        throw new Error(`Publish logs API returned ${response.status()}`);
      }

      const logs = (await response.json()) as PublishLog[];
      const batchStartTime = logs[0] ? new Date(logs[0].startedAt).getTime() : 0;
      const latest = logs.find(
        (log) =>
          log.events.some((e) => e.sdkLanguage === apiLanguage) &&
          batchStartTime - new Date(log.startedAt).getTime() < 120_000,
      );

      if (latest) {
        const langEvents = latest.events.filter(
          (e) => e.sdkLanguage === apiLanguage,
        );

        const failed = langEvents.find((e) => e.eventType === "Failed");
        if (failed) {
          throw new Error(
            `Publish ${failed.publishType} failed for ${apiLanguage}`,
          );
        }

        const sourceSucceeded =
          language.toLowerCase() === "php" ||
          langEvents.some(
            (e) =>
              e.publishType === "SourceCode" && e.eventType === "Succeeded",
          );
        const packageSucceeded = langEvents.some(
          (e) => e.publishType === "Package" && e.eventType === "Succeeded",
        );

        if (sourceSucceeded && packageSucceeded) return;
      }

      await this.page.waitForTimeout(intervalMs);
    }

    throw new Error(
      `Timed out after ${timeoutMs / 1000}s waiting for publish success for ${language}`,
    );
  }
}
