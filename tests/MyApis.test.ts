import path from "path";
import { test, expect } from "@playwright/test";
import { MyApisPage } from "../pages/MyApisPage";

let apiEntityId: string | null = null;

const specUrl = "https://petstore.swagger.io/v2/swagger.json";

test.afterEach(async ({ page }) => {
  if (apiEntityId) {
    const myApisPage = new MyApisPage(page);
    await myApisPage.deleteApiEntity(apiEntityId);
    apiEntityId = null;
  }
});

test("Checks Sample Api Import", async ({ page }) => {
  await page.goto("/");
  const myApisPage = new MyApisPage(page);

  expect(await myApisPage.isPageDisplayed()).toBe(true);
  await myApisPage.clickImportApi();
  await myApisPage.useSampleApi();

  apiEntityId = await myApisPage.waitForApiEntitiesAndGetId();
  expect(apiEntityId).toBeTruthy();

  expect(await myApisPage.isLoggingSummaryDisplayed()).toBe(true);
});

test("Import spec file creates entity on dashboard", async ({ page }) => {
  const filePath = path.join(__dirname, "fixtures/petstore.json");
  await page.goto("/");
  const myApisPage = new MyApisPage(page);
  expect(await myApisPage.isPageDisplayed()).toBe(true);

  apiEntityId = await myApisPage.importSpecViaFile(filePath);
  expect(apiEntityId).toBeTruthy();

  expect(await myApisPage.isLoggingSummaryDisplayed()).toBe(true);
  await myApisPage.proceedFromLoggingSummary();
  await myApisPage.proceedFromValidationSummary();

  await expect(
    myApisPage.getApiEntityCard("Swagger Petstore - OpenApi 3.1"),
  ).toBeVisible();
});

test("Import zip file creates entity on dashboard", async ({ page }) => {
  const filePath = path.join(__dirname, "fixtures/spec.zip");
  await page.goto("/");
  const myApisPage = new MyApisPage(page);
  expect(await myApisPage.isPageDisplayed()).toBe(true);

  apiEntityId = await myApisPage.importSpecViaFile(filePath);
  expect(apiEntityId).toBeTruthy();

  expect(await myApisPage.isLoggingSummaryDisplayed()).toBe(true);
  await myApisPage.proceedFromLoggingSummary();
  await myApisPage.proceedFromValidationSummary();

  await expect(
    myApisPage.getApiEntityCard("Swagger Petstore - OpenApi 3.1"),
  ).toBeVisible();
});

test("Import spec via URL creates entity on dashboard", async ({ page }) => {
  await page.goto("/");
  const myApisPage = new MyApisPage(page);
  expect(await myApisPage.isPageDisplayed()).toBe(true);

  apiEntityId = await myApisPage.importSpecViaUrl(specUrl);
  expect(apiEntityId).toBeTruthy();

  expect(await myApisPage.isLoggingSummaryDisplayed()).toBe(true);
  await myApisPage.proceedFromLoggingSummary();
  await myApisPage.proceedFromValidationSummary();

  await expect(myApisPage.getApiEntityCard("Swagger Petstore")).toBeVisible();
});

test("Checks Download SDK for all languages and file names", async ({
  page,
}) => {
  test.setTimeout(120_000);
  const platforms: Array<{
    platform: string;
    template: string;
    expectedName: string;
  }> = [
    {
      platform: "DotNet",
      template: "CS_NET_STANDARD_LIB",
      expectedName: "APIMATIC Calculator-CS_NET_STANDARD_LIB",
    },
    {
      platform: "Java",
      template: "JAVA_ECLIPSE_JRE_LIB",
      expectedName: "APIMATIC Calculator-JAVA_ECLIPSE_JRE_LIB",
    },
    {
      platform: "Python",
      template: "PYTHON_GENERIC_LIB",
      expectedName: "APIMATIC Calculator-PYTHON_GENERIC_LIB",
    },
    {
      platform: "Ruby",
      template: "RUBY_GENERIC_LIB",
      expectedName: "APIMATIC Calculator-RUBY_GENERIC_LIB",
    },
    {
      platform: "PHP",
      template: "PHP_GENERIC_LIB_V2",
      expectedName: "APIMATIC Calculator-PHP_GENERIC_LIB_V2",
    },
    {
      platform: "TypeScript",
      template: "TS_GENERIC_LIB",
      expectedName: "APIMATIC Calculator-TS_GENERIC_LIB",
    },
    {
      platform: "Go",
      template: "GO_GENERIC_LIB",
      expectedName: "APIMATIC Calculator-GO_GENERIC_LIB",
    },
  ];

  await page.goto("/");
  const myApisPage = new MyApisPage(page);
  expect(await myApisPage.isPageDisplayed()).toBe(true);

  await myApisPage.clickGenerateAndWaitForValidation();
  await myApisPage.clickProceedBtn();
  await myApisPage.clickDownloadSourceCodeBtn();

  for (const { platform, template, expectedName } of platforms) {
    await myApisPage.getLanguageBtn(platform).click();
    const download = await myApisPage.downloadSdkAndWait(template);
    expect(download.suggestedFilename()).toContain(expectedName);
    await myApisPage.clickGenerateForAnotherLanguageBtn();
  }
});

test("Preview portal docsgen call is successful for existing entity", async ({
  page,
}) => {
  await page.goto("/");
  const myApisPage = new MyApisPage(page);
  expect(await myApisPage.isPageDisplayed()).toBe(true);

  await myApisPage.clickGenerateAndWaitForValidation();
  await myApisPage.clickProceedBtn();

  const { previewPage, status } =
    await myApisPage.clickPreviewApiPortalAndCaptureDocsgenResponse();
  expect(status).toBe(200);
  await expect(previewPage).toHaveTitle(/APIMATIC Calculator/);
});

test("Transform via URL", async ({ page }) => {
  await page.goto("/");
  const myApisPage = new MyApisPage(page);
  expect(await myApisPage.isPageDisplayed()).toBe(true);
  await myApisPage.openTransformApiModal();
  await myApisPage.specifyUrlForTransform(specUrl);
  const download = await myApisPage.transformSpecAndDownload("OpenApi3Json");
  expect(download.suggestedFilename()).toBe("swagger.json-OpenApi3Json.json");
});

const transformFormats: Array<{ value: string; expectedName: string }> = [
  { value: "OpenApi3Json", expectedName: "petstore.json-OpenApi3Json.json" },
  { value: "OpenApi3Yaml", expectedName: "petstore.json-OpenApi3Yaml.yaml" },
  { value: "OpenApi31Json", expectedName: "petstore.json-OpenApi31Json.json" },
  { value: "OpenApi31Yaml", expectedName: "petstore.json-OpenApi31Yaml.yaml" },
  { value: "Swagger20", expectedName: "petstore.json-Swagger20.json" },
  { value: "SwaggerYaml", expectedName: "petstore.json-SwaggerYaml.yaml" },
  { value: "Swagger10", expectedName: "petstore.json-Swagger10.json" },
  { value: "RAML10", expectedName: "petstore.json-RAML10.raml" },
  { value: "RAML", expectedName: "petstore.json-RAML.raml" },
  {
    value: "Postman20",
    expectedName: "petstore.json-Postman20.postman_collection.json",
  },
  {
    value: "Postman10",
    expectedName: "petstore.json-Postman10.postman_collection.json",
  },
  { value: "Insomnia", expectedName: "petstore.json-Insomnia.json" },
  { value: "InsomniaYaml", expectedName: "petstore.json-InsomniaYaml.yaml" },
  { value: "APIBluePrint", expectedName: "petstore.json-APIBluePrint.apib" },
  { value: "WADL2009", expectedName: "petstore.json-WADL2009.wadl" },
  { value: "WSDL", expectedName: "petstore.json-WSDL.wsdl" },
  {
    value: "GraphQlSchema",
    expectedName: "petstore.json-GraphQlSchema.graphql",
  },
  { value: "APIMATIC", expectedName: "petstore.json-APIMATIC.json" },
];

for (const { value, expectedName } of transformFormats) {
  test(`Transform API to ${value} downloads correct file`, async ({ page }) => {
    const filePath = path.join(__dirname, "fixtures/petstore.json");
    await page.goto("/");
    const myApisPage = new MyApisPage(page);
    expect(await myApisPage.isPageDisplayed()).toBe(true);

    await myApisPage.openTransformApiModal();
    await myApisPage.setInputFileForTransform(filePath);
    const download = await myApisPage.transformSpecAndDownload(value);
    expect(download.suggestedFilename()).toBe(expectedName);
  });
}

test("Export API opens spec in new tab for all formats", async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto("/");
  const myApisPage = new MyApisPage(page);
  expect(await myApisPage.isPageDisplayed()).toBe(true);
  await myApisPage.openThreeDotsMenu();
  await myApisPage.clickExportApi();

  for (const { value } of transformFormats) {
    expect(await myApisPage.isExportDialogVisible()).toBe(true);

    await myApisPage.selectExportFormat(value);

    const newTab = await myApisPage.clickExportAndGetNewTab();

    expect(newTab.url()).toContain("/apientity/export/");
    expect(newTab.url()).toContain(`format=${value}`);

    const content = await newTab.evaluate(() => document.body.innerText);
    expect(content.length).toBeGreaterThan(0);

    await newTab.close();
  }
});

test.skip("Checks C# Beta Language", async ({ page }) => {
  await page.goto("/");
  const myApisPage = new MyApisPage(page);
  expect(await myApisPage.isPageDisplayed()).toBe(true);
  await myApisPage.clickGenerateAndWaitForValidation();
  await myApisPage.clickProceedBtn();
  await myApisPage.clickDownloadSourceCodeBtn();
  expect(await myApisPage.verifyV2Exists());
  expect(await myApisPage.verifyAlphaTagExists());
});
