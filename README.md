# Platform Test Automation

This project contains automated tests for the platform using Playwright framework.

## Project Structure

```
platform-test-automation/
├── package.json                 # Node.js dependencies and scripts
├── playwright.config.ts         # Playwright configuration file
├── pages/                       # Page Object Model classes
│   ├── BasePage.ts             # Base page class with common functionality
│   ├── LoginPage.ts            # Login page object
│   └── MyApisPage.ts           # My APIs page object
├── tests/                      # Test files
│   ├── auth.setup.ts           # Authentication setup for tests
│   └── example.spec.ts         # Example test specifications
├── playwright/                 # Playwright generated files
│   └── .auth/                  # Authentication state files
├── playwright-report/          # Generated test reports
│   ├── index.html             # Main report file
│   ├── data/                  # Report data files
│   └── trace/                 # Trace viewer files
└── test-results/              # Test execution results
    └── example-*/             # Individual test result folders
        ├── error-context.md   # Error context information
        └── trace.zip         # Test execution traces
```

## Key Directories

### `/pages`

Contains Page Object Model (POM) classes that encapsulate page-specific functionality:

- **BasePage.ts**: Common functionality shared across all pages
- **LoginPage.ts**: Login page interactions and elements
- **MyApisPage.ts**: API management page interactions and elements

### `/tests`

Contains test files and test setup:

- **auth.setup.ts**: Handles authentication setup for test sessions
- **example.spec.ts**: Sample test specifications

### `/playwright-report`

Generated HTML reports with test execution results, including:

- Test pass/fail status
- Screenshots and videos
- Trace files for debugging

### `/test-results`

Contains detailed test execution artifacts:

- Error contexts
- Screenshots
- Videos
- Trace files for failed tests

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:

   ```bash
   $env:baseUrl = "baseUrl"
   ```

3. Run tests:

   ```bash
   npx playwright test
   ```

4. View test report:
   ```bash
   npx playwright show-report
   ```

## Configuration

The `playwright.config.ts` file contains:

- Browser configurations
- Test timeout settings
- Report configurations
- Base URL settings
- Authentication setup

## Authentication

Tests use a global authentication setup defined in `auth.setup.ts` that:

- Logs into the application
- Stores authentication state
- Reuses the session across tests

## Page Object Model

This project follows the Page Object Model pattern where:

- Each page has its own class in the `/pages` directory
- Page classes contain locators and methods specific to that page
- Tests interact with pages through these classes rather than directly with elements

## Reports and Debugging

After test execution:

- View HTML report: `npx playwright show-report`
- Open trace viewer: `npx playwright show-trace test-results/path-to-trace.zip`
- Screenshots and videos are automatically captured on failure
