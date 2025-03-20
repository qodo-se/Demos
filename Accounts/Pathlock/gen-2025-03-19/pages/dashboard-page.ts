import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly openMenuButton: Locator;
  readonly complianceMenuItem: Locator;
  readonly campaignsMenuItem: Locator;
  readonly adminMenuItem: Locator;
  readonly scheduledReportsMenuItem: Locator;
  readonly reportingMenuItem: Locator;
  readonly scheduledReportsSubMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openMenuButton = page.locator('li.open-menu > a')
    this.complianceMenuItem = page.locator('#ctl00_ctl00_ctl00_ctl00_TreeView1t146');
    this.campaignsMenuItem = page.locator('#ctl00_ctl00_ctl00_ctl00_TreeView1t152')
    this.adminMenuItem = page.locator('#ctl00_ctl00_ctl00_ctl00_TreeView1t169');
    this.scheduledReportsMenuItem = page.getByText('Scheduled Reports', { exact: true });
    this.reportingMenuItem = page.getByText('Reporting');
    this.scheduledReportsSubMenuItem = page.getByText('Scheduled Reports');
  }

  async openMenu() {
    await this.openMenuButton.click();
  }

  async navigateToCompliance() {
    await this.complianceMenuItem.click();
  }

  async navigateToCampaigns() {
    await this.campaignsMenuItem.click();
  }

  async navigateToAdmin() {
    await this.adminMenuItem.click();
  }

  async navigateToScheduledReports() {
    await this.scheduledReportsMenuItem.click();
  }

  async navigateToReporting() {
    await this.reportingMenuItem.click();
  }

  async navigateToScheduledReportsSubMenu() {
    await this.scheduledReportsSubMenuItem.click();
  }
}