import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { MyApisPage } from "./MyApisPage";

export class LoginPage extends BasePage {
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginBtn: Locator;
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.emailField = page.getByRole("textbox", { name: "Email" });
    this.passwordField = page.getByRole("textbox", { name: "Password" });
    this.loginBtn = page.getByRole("button", { name: "Login" });
    this.page = page;
  }

  async login(email: string, password: string): Promise<MyApisPage> {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginBtn.click();
    return new MyApisPage(this.page);
  }
}
