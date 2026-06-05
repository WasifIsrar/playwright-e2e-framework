import { type Locator, type Page } from "@playwright/test";

export class BasePage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
}
