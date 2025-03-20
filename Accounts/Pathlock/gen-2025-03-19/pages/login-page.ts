import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#ctl00_ctl00_PageContent_PageContent_Login1_UserName');
    this.passwordInput = page.locator('#ctl00_ctl00_PageContent_PageContent_Login1_Password');
    this.loginButton = page.locator('#ctl00_ctl00_PageContent_PageContent_Login1_LoginLinkButton');
  }

  async goto() {
    await this.page.goto('/App/LoginPage.aspx');
    await expect(this.page).toHaveURL(/LoginPage\.aspx/);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    // Wait for navigation to complete after login
    await this.page.waitForNavigation();
  }
}