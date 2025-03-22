import { Page, Locator, expect } from '@playwright/test';

export class ScheduledReportsPage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly selectCheckbox: Locator;
  readonly deleteSelectedRecordsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.locator('#ctl00_ctl00_ctl00_A_DataControls_DataPlaceHolder_pageTabContainer_TabPanel1_searchBox');
    this.selectCheckbox = page.locator('[id="ctl00_ctl00_ctl00_A_DataControls_DataPlaceHolder_pageTabContainer_TabPanel1_GridView1_ctl02_selectCheckBox"]');
    this.deleteSelectedRecordsButton = page.getByText('Delete selected records');
  }

  async searchForReport(reportName: string) {
    await this.searchBox.fill(reportName);
    await this.searchBox.press('Enter');
    await this.page.waitForURL('/App/Schedules/List.aspx');
  }

  async selectReport() {
    await this.selectCheckbox.click();
  }

  async deleteSelectedReports() {
    await this.deleteSelectedRecordsButton.click();
  }

  async confirmDelete() {
    this.page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Are you sure you want to delete?');
      await dialog.accept();
    });
  }
}
