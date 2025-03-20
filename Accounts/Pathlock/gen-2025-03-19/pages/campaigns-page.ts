import { Page, Locator, expect } from '@playwright/test';

export class CampaignsPage {
  readonly page: Page;
  readonly exportButton: Locator;
  readonly scheduleReportOption: Locator;
  readonly screenNameInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.exportButton = page.getByText('Export');
    this.scheduleReportOption = page.getByText('Schedule Report');
    this.screenNameInput = page.locator('[id="ctl00_ctl00_ctl00_ctl00_ProfileTailorHeader1_ProfileTailorMenuPanel1_ReportSchedule1_TabContainer_ScheduleInfo_txtScreenName"]');
    this.saveButton = page.getByText('Save');
  }

  async hoverOverExport() {
    await this.exportButton.hover();
  }

  async clickScheduleReport() {
    await this.scheduleReportOption.click();
  }

  async enterReportName(name: string) {
    await this.screenNameInput.fill(name);
  }

  async saveReport() {
    await this.saveButton.click();
  }
}
