import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { CampaignsPage } from '../pages/campaigns-page';
import { ScheduledReportsPage } from '../pages/scheduled-reports-page';

test.describe('Pathlock E2E Test', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let campaignsPage: CampaignsPage;
  let scheduledReportsPage: ScheduledReportsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    campaignsPage = new CampaignsPage(page);
    scheduledReportsPage = new ScheduledReportsPage(page);
  });

  test('Schedule report and delete it', async ({ page }) => {
    const reportName = 'Test123';

    // Step 1: Open URL
    await page.goto('https://flex-qa-plc.stage.pathlockgrc.com/App/LoginPage.aspx');

    // Step 2: Sign in with credentials
    await loginPage.login('QA_Admin', 'Welcome@123');

    // Step 3: Click on "Open Menu"
    await dashboardPage.openMenu();

    // Step 4: Click "Compliance"
    await dashboardPage.navigateToCompliance();

    // Step 5: Click "Campaigns"
    await dashboardPage.navigateToCampaigns();

    // Step 6: Hover over "Export"
    await campaignsPage.hoverOverExport();

    // // Step 7: Click "Schedule Report"
    // await campaignsPage.clickScheduleReport();

    // // Step 8: Enter "Test123" into the input field
    // await page.locator('ctl00$ctl00$ctl00$ctl00$ProfileTailorHeader1$ProfileTailorMenuPanel1$ReportSchedule1$TabContainer$ScheduleInfo$txtScreenName').fill(reportName);

    // // Step 9: Click "Save"
    // await campaignsPage.saveReport();

    // // Step 10: Click on "Open Menu"
    // await dashboardPage.openMenu();

    // // Step 11: Click "Admin"
    // await dashboardPage.navigateToAdmin();

    // // Step 12: Click "Reporting"
    // await dashboardPage.navigateToReporting();

    // // Step 13: Click "Scheduled Reports"
    // await dashboardPage.navigateToScheduledReportsSubMenu();

    // // Step 14: Enter "Test123" into the search box
    // await page.locator('ctl00$ctl00$ctl00$A$DataControls$DataPlaceHolder$pageTabContainer$TabPanel1$searchBox').fill(reportName);

    // // Step 15: Click checkbox
    // await page.locator('ctl00$ctl00$ctl00$A$DataControls$DataPlaceHolder$pageTabContainer$TabPanel1$GridView1$ctl02$selectCheckBox').click();

    // // Step 16: Click "Delete selected records"
    // await scheduledReportsPage.deleteSelectedReports();

    // // Step 17: Accept prompt with value "Are you sure you want to delete?"
    // page.on('dialog', async dialog => {
    //   expect(dialog.message()).toContain('Are you sure you want to delete?');
    //   await dialog.accept();
    // });

    // // Step 18: Open URL
    // await page.goto('https://flex-qa-plc.stage.pathlockgrc.com/App/LoginPage.aspx');
  });
});
