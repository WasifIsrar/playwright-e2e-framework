import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { AccountSettingsPage } from "./AccountSettingsPage";
import { PricingPlansPage } from "./PricingPlansPage";
import { LoginPage } from "./LoginPage";

export class SetupPage extends BasePage {
  readonly setupHeading: Locator;
  readonly settingsBtn: Locator;
  readonly accountSettingsLink: Locator;
  readonly pricingPlansLink: Locator;
  readonly profileBtn: Locator;
  readonly signOutLink: Locator;
  readonly downloadYourProject: Locator;
  readonly navigateStep: Locator;
  readonly previewStep: Locator;
  readonly skillsStep: Locator;
  readonly themeCard: Locator;
  readonly cliSetupTab: Locator;
  readonly documentationCard: Locator;
  readonly recipeCard: Locator;
  readonly customizeSDKCard: Locator;
  readonly publishSDKCard: Locator;
  readonly copilotCard: Locator;
  readonly cardLiveExampleLink: Locator;
  readonly cardDocumentationLink: Locator;
  readonly cardCloseBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.setupHeading = page.getByRole("heading", {
      name: "Set up your single landing pad for Developers and AI agents.",
    });
    this.settingsBtn = page.getByRole("button", { name: "Settings" });
    this.accountSettingsLink = page.getByRole("link", {
      name: "Account Settings",
    });
    this.pricingPlansLink = page.getByRole("link", { name: "Pricing Plans" });
    this.profileBtn = page.getByRole("button", { name: "After Glitch" });
    this.signOutLink = page.getByRole("link", { name: "Sign Out" });
    this.downloadYourProject = page.getByText("Download your project");
    this.navigateStep = page.getByText("Navigate to your project folder");
    this.previewStep = page.getByText("Preview your Portal and SDKs");
    this.skillsStep = page.getByText("Install APIMatic agent skills");
    this.themeCard = page.getByLabel(
      "Open guide for Personalize your Portal theme",
    );
    this.cliSetupTab = page.getByText("CLI Setup");
    this.documentationCard = page.getByLabel(
      "Open guide for Add documentation pages",
    );
    this.recipeCard = page.getByLabel("Open guide for Create API Recipes");
    this.customizeSDKCard = page.getByLabel("Open guide for Customize SDKs");
    this.publishSDKCard = page.getByLabel(
      "Open guide for Publish SDKs to registries",
    );
    this.copilotCard = page.getByLabel("Open guide for Enable API Copilot");
    this.cardLiveExampleLink = page
      .getByRole("dialog")
      .getByRole("link", { name: /Live example/ });
    this.cardDocumentationLink = page
      .getByRole("dialog")
      .getByRole("link", { name: /Documentation/ });
    this.cardCloseBtn = page
      .getByRole("dialog")
      .getByRole("button", { name: "Close" });
  }

  async isPageDisplayed(): Promise<boolean> {
    await this.setupHeading.waitFor({ state: "visible" });
    return true;
  }

  async openAccountSettings(): Promise<AccountSettingsPage> {
    await this.settingsBtn.click();
    const [newTab] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.accountSettingsLink.click(),
    ]);
    await newTab.waitForLoadState("domcontentloaded");
    return new AccountSettingsPage(newTab);
  }

  async openPricingPlans(): Promise<PricingPlansPage> {
    await this.settingsBtn.click();
    const [newTab] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.pricingPlansLink.click(),
    ]);
    await newTab.waitForLoadState("domcontentloaded");
    return new PricingPlansPage(newTab);
  }

  async signOut(): Promise<LoginPage> {
    await this.profileBtn.click();
    await this.signOutLink.click();
    await this.page.waitForURL(/Account\/Login/);
    return new LoginPage(this.page);
  }

  async clickDownloadYourProject() {
    await this.downloadYourProject.click();
  }

  async clickNavigateStep() {
    await this.navigateStep.click();
  }

  async clickPreviewStep() {
    await this.previewStep.click();
  }

  async clickSkillsStep() {
    await this.skillsStep.click();
  }

  async openThemeCard() {
    await this.themeCard.click();
  }

  async switchToCLISetup() {
    await this.cliSetupTab.click();
  }

  async openDocumentationCard() {
    await this.documentationCard.click();
  }

  async openRecipeCard() {
    await this.recipeCard.click();
  }

  async openCustomizedSDKCard() {
    await this.customizeSDKCard.click();
  }

  async openPublishSDKCard() {
    await this.publishSDKCard.click();
  }

  async openCopilotCard() {
    await this.copilotCard.click();
  }

  async clickLiveExampleOnThemeCard(): Promise<Page> {
    return this.clickCardLiveExample();
  }

  async clickCardLiveExample(): Promise<Page> {
    const [newTab] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.cardLiveExampleLink.click(),
    ]);
    await newTab.waitForLoadState("domcontentloaded");
    return newTab;
  }

  async clickCardDocumentation(): Promise<Page> {
    const [newTab] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.cardDocumentationLink.click(),
    ]);
    await newTab.waitForLoadState("domcontentloaded");
    return newTab;
  }

  async closeCardDialog() {
    await this.cardCloseBtn.click();
  }
}
