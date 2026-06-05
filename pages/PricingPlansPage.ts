import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PricingPlansPage extends BasePage {
  readonly pricingHeading: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    super(page);
    this.pricingHeading = page.getByRole("heading", {
      name: "We've got amazing plans for you!",
    });
    this.logo = page.locator('a[href="/dashboard"]');
  }

  async isPageDisplayed(): Promise<boolean> {
    await this.pricingHeading.waitFor({ state: "visible" });
    return true;
  }

  async clickLogo(): Promise<void> {
    await this.logo.click();
    await this.page.waitForURL(/onboarding.*\/setup/);
  }
}
