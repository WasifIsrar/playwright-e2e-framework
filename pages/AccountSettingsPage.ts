import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { LoginPage } from "./LoginPage";

export class AccountSettingsPage extends BasePage {
  readonly updateProfileHeading: Locator;
  readonly logo: Locator;
  readonly profileDropdown: Locator;
  readonly signOutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.updateProfileHeading = page.getByRole("heading", {
      name: "Update Profile",
    });
    this.logo = page.locator('a[href="/dashboard"]');
    this.profileDropdown = page.getByRole("link", { name: "AG After Glitch" });
    this.signOutLink = page.getByRole("link", { name: "Sign out" });
  }

  async isPageDisplayed(): Promise<boolean> {
    await this.updateProfileHeading.waitFor({ state: "visible" });
    return true;
  }

  async clickLogo(): Promise<void> {
    await this.logo.click();
    await this.page.waitForURL(/onboarding.*\/setup/);
  }

  async signOut(): Promise<LoginPage> {
    await this.profileDropdown.click();
    await this.signOutLink.click();
    await this.page.waitForURL(/Account\/Login/);
    return new LoginPage(this.page);
  }
}
