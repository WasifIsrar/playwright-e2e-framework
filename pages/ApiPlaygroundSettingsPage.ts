import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ApiPlaygroundSettingsPage extends BasePage {
  readonly heading: Locator;
  readonly useLegacyToggle: Locator;
  readonly settingText: Locator;
  readonly aiConfigTab: Locator;
  readonly apiCopilotHeader: Locator;
  readonly contextPluginsInActionCard: Locator;
  readonly viewLiveExamplesButton: Locator;
  readonly letUsHandleSetupCard: Locator;
  readonly setThemUpForMeButton: Locator;
  readonly setUpContextPluginsHeader: Locator;
  readonly contextPluginsSetupSteps: Locator;
  readonly setUpContextPluginsDropdownButton: Locator;
  readonly settingCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole("heading", { name: "API Playground" });
    // The toggle is: <label class="toggle-switch-api-call">
    //   <span>Use Legacy API Playground</span>
    //   <input id="ap-switch" type="checkbox" class="toggle-switch-input">
    // </label>
    // Multiple #ap-switch checkboxes exist on page; target the one inside the api-call toggle
    this.useLegacyToggle = page.locator(
      ".toggle-switch-api-call input[type='checkbox']",
    );
    this.settingText = page.getByLabel("Use Legacy API Playground");
    this.aiConfigTab = page.locator("div.title.lh-22", {
      hasText: "AI Configuration",
    });
    this.apiCopilotHeader = page.getByRole("heading", {
      name: "API Copilot",
      exact: true,
    });
    this.contextPluginsInActionCard = page
      .locator("div.card-wrapper", {
        has: page.getByRole("heading", {
          name: "See Context Plugins in Action",
          exact: true,
        }),
      })
      .first();
    this.viewLiveExamplesButton = this.contextPluginsInActionCard.getByRole(
      "button",
      { name: "View live examples", exact: true },
    );
    this.letUsHandleSetupCard = page
      .locator("div.card-wrapper", {
        has: page.getByRole("heading", {
          name: "Let Us Handle the Setup",
          exact: true,
        }),
      })
      .first();
    this.setThemUpForMeButton = this.letUsHandleSetupCard.getByRole("button", {
      name: "Set Them Up For Me",
    });
    this.setUpContextPluginsHeader = page
      .locator("div.setup-guide-header", {
        has: page.getByRole("heading", {
          name: "Set Up Context Plugins",
          exact: true,
        }),
      })
      .first();
    this.contextPluginsSetupSteps = page
      .locator("div.flex.flex-col.mb-5", {
        has: page.getByText("Activate the Context Plugins toggle", {
          exact: true,
        }),
      })
      .first();
    this.setUpContextPluginsDropdownButton = this.setUpContextPluginsHeader
      .locator("button")
      .first();
    this.settingCheckbox = page.locator(".toggle-switch.undefined");
  }

  async waitForContentVisible() {
    await this.settingText.waitFor({ state: "attached" });
  }
  async isLegacyToggleChecked(): Promise<boolean> {
    return await this.useLegacyToggle.isChecked();
  }

  async clickAiConfigurationTab() {
    // Ensure the tab is visible before clicking (SPA UI changes aren't
    // always accompanied by network idle). Wait for the resulting header
    // so the caller can rely on the content being present.
    await this.aiConfigTab.waitFor({ state: "visible" });
    await this.aiConfigTab.click();
    await this.apiCopilotHeader.waitFor({ state: "visible" });
  }

  async isApiCopilotHeaderVisible(): Promise<boolean> {
    await this.apiCopilotHeader.waitFor({ state: "visible" });
    return this.apiCopilotHeader.isVisible();
  }

  async isSectionHeadingVisible(name: string): Promise<boolean> {
    const heading = this.page.getByRole("heading", { name, exact: true });
    await heading.waitFor({ state: "visible" });
    return heading.isVisible();
  }

  async getToggleBackgroundColorForSection(name: string): Promise<string> {
    const heading = this.page.getByRole("heading", { name, exact: true });
    await heading.waitFor({ state: "visible" });
    const visual = heading.locator(
      "xpath=following::span[contains(concat(' ', normalize-space(@class), ' '), ' toggle-switch ')][1]",
    );
    await visual.waitFor({ state: "visible" });
    return await visual.evaluate(
      (el) => window.getComputedStyle(el as Element).backgroundColor,
    );
  }

  async clickSectionToggleVisual(name: string) {
    const heading = this.page.getByRole("heading", { name, exact: true });
    await heading.waitFor({ state: "visible" });
    const visual = heading.locator(
      "xpath=following::span[contains(concat(' ', normalize-space(@class), ' '), ' toggle-switch ')][1]",
    );
    await visual.waitFor({ state: "visible" });
    await visual.click();
  }

  async isSectionToggleChecked(name: string): Promise<boolean> {
    const heading = this.page.getByRole("heading", { name, exact: true });
    await heading.waitFor({ state: "visible" });
    const toggleInput = heading.locator(
      "xpath=following::input[contains(concat(' ', normalize-space(@class), ' '), ' toggle-switch-input ')][1]",
    );
    await toggleInput.waitFor({ state: "attached" });
    return toggleInput.isChecked();
  }

  async setLegacyToggle(enable: boolean) {
    const currentState = await this.useLegacyToggle.isChecked();
    if (currentState !== enable) {
      // Click the parent label to toggle since the input may be visually hidden
      await this.useLegacyToggle.locator("..").click();
    }
  }

  async clickLegacyToggleVisual() {
    const label = this.useLegacyToggle.locator("..");
    const visual = label.locator("span.toggle-switch").first();
    await visual.waitFor({ state: "visible" });
    await visual.click();
  }

  async getLegacyToggleBackgroundColor(): Promise<string> {
    const label = this.useLegacyToggle.locator("..");
    const visual = label.locator("span.toggle-switch").first();
    await visual.waitFor({ state: "visible" });
    return await visual.evaluate(
      (el) => window.getComputedStyle(el as Element).backgroundColor,
    );
  }

  async checkCopliot() {
    await this.settingCheckbox.first().click();
  }

  async scrollToContextPluginsInActionCard() {
    await this.contextPluginsInActionCard.scrollIntoViewIfNeeded();
  }

  async scrollToTopOfAiConfiguration() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToLetUsHandleSetupCard() {
    await this.scrollToTopOfAiConfiguration();
    await this.letUsHandleSetupCard.scrollIntoViewIfNeeded();
  }

  async scrollToSetUpContextPluginsSection() {
    await this.scrollToTopOfAiConfiguration();
    await this.setUpContextPluginsHeader.scrollIntoViewIfNeeded();
  }

  async isContextPluginsInActionCardVisible(): Promise<boolean> {
    await this.scrollToContextPluginsInActionCard();
    await this.contextPluginsInActionCard.waitFor({ state: "visible" });
    return this.contextPluginsInActionCard.isVisible();
  }

  async isViewLiveExamplesButtonVisible(): Promise<boolean> {
    await this.scrollToContextPluginsInActionCard();
    await this.viewLiveExamplesButton.waitFor({ state: "visible" });
    return this.viewLiveExamplesButton.isVisible();
  }

  async isLetUsHandleSetupCardVisible(): Promise<boolean> {
    await this.scrollToLetUsHandleSetupCard();
    await this.letUsHandleSetupCard.waitFor({ state: "visible" });
    return this.letUsHandleSetupCard.isVisible();
  }

  async isSetThemUpForMeButtonVisible(): Promise<boolean> {
    await this.scrollToLetUsHandleSetupCard();
    await this.setThemUpForMeButton.waitFor({ state: "visible" });
    return this.setThemUpForMeButton.isVisible();
  }

  async isSetUpContextPluginsHeaderVisible(): Promise<boolean> {
    await this.scrollToSetUpContextPluginsSection();
    await this.setUpContextPluginsHeader.waitFor({ state: "visible" });
    return this.setUpContextPluginsHeader.isVisible();
  }

  async isContextPluginsSetupStepsVisible(): Promise<boolean> {
    await this.scrollToSetUpContextPluginsSection();
    await this.contextPluginsSetupSteps.waitFor({ state: "visible" });
    return this.contextPluginsSetupSteps.isVisible();
  }

  async clickSetUpContextPluginsDropdown() {
    await this.scrollToSetUpContextPluginsSection();
    await this.setUpContextPluginsDropdownButton.waitFor({ state: "visible" });
    await this.setUpContextPluginsDropdownButton.click();
  }

  async isSetUpContextPluginsChevronUp(): Promise<boolean> {
    const chevron = this.setUpContextPluginsDropdownButton.locator("svg").first();
    await chevron.waitFor({ state: "visible" });
    const className = (await chevron.getAttribute("class")) ?? "";
    return className.includes("rotate-180");
  }

  async isContextPluginsSetupStepsCollapsed(): Promise<boolean> {
    await this.contextPluginsSetupSteps.waitFor({ state: "hidden" });
    return true;
  }
}
