import { test, expect } from "@playwright/test";
import { PackagePublishingPage } from "../pages/PackagePublishingPage";
import fs from "fs";
import path from "path";

const allLanguages = ["csharp", "java", "php", "python", "ruby", "typescript"];
const versionFilePath = path.join(__dirname, "fixtures/sdk-versions.txt");

function readAndBumpVersion(): string {
  if (!fs.existsSync(versionFilePath)) {
    fs.writeFileSync(versionFilePath, "1.0.5");
  }
  const current = fs.readFileSync(versionFilePath, "utf-8").trim();
  const parts = current.split(".").map(Number);
  parts[2] += 1;
  const next = parts.join(".");
  fs.writeFileSync(versionFilePath, next);
  return current;
}
const language = process.env.PUBLISH_LANGUAGE;
test(`Validates Publishing Package for ${language}`, async ({ page }) => {
  test.setTimeout(360_000); // 6 minutes to cover 5 min polling + overhead
  if (!language) {
    throw new Error("PUBLISH_LANGUAGE environment variable is not set");
  }

  await page.goto(`${process.env.PACKAGE_PUBLISHING_BASEURL}`);
  const apiGroupId = page.url().match(/\/publish\/([a-f0-9]+)\//)?.[1];
  if (!apiGroupId) throw new Error("Could not extract apiGroupId from URL");
  const packagePublishingPage = new PackagePublishingPage(page);
  await packagePublishingPage.isPageDisplayed();
  await packagePublishingPage.chooseLanguage();

  for (const lang of allLanguages.filter((l) => l !== language)) {
    await packagePublishingPage.uncheckLanguage(lang);
  }

  const version = process.env.PUBLISH_VERSION ?? readAndBumpVersion();
  await packagePublishingPage.enterVersionNumber(language, version);

  await packagePublishingPage.clickPublishBtn();
  await packagePublishingPage.clickPublishNowBtn();
  await packagePublishingPage.waitForPublishingInProgress();
  await packagePublishingPage.waitForPublishSuccess(language, apiGroupId);
});
