# Pathlock E2E Tests with Playwright

This project contains end-to-end tests for the Pathlock application using Playwright.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Install Playwright browsers:
   ```
   npx playwright install
   ```

## Running Tests

Run the tests in headless mode:
```
npm test
```

Run the tests in headed mode (visible browser):
```
npm run test:headed
```

View the test report:
```
npm run report
```

## Test Structure

- `/pages`: Page Object Models for each page in the application
- `/tests`: Test specifications
- `playwright.config.ts`: Playwright configuration

## Test Scenario

The main test scenario performs the following steps:
1. Logs into the Pathlock application
2. Navigates to Compliance > Campaigns
3. Creates a scheduled report
4. Navigates to Admin > Scheduled Reports > Reporting > Scheduled Reports
5. Finds and deletes the created report