# Playwright E2E Test Automation Framework

This project contains automated tests for the APIMatic platform using Playwright. It covers dashboard functionality, portal editor, package publishing, onboarding flows, and visual regression testing.

## Project Structure

```
playwright-e2e-framework/
├── package.json                        # Node.js dependencies and scripts
├── playwright.config.ts                # Playwright configuration file
├── .env                                # Environment variables (not committed)
├── .gitignore
├── .github/
│   └── workflows/                      # GitHub Actions CI/CD workflows
│       ├── dashboard.yml
│       ├── package-publishing.yml
│       ├── portalEditor.yml
│       ├── dx-visual.yml
│       ├── onboarding-visual.yml
│       └── post-onboarding.yml
├── pages/                              # Page Object Model classes
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── MyApisPage.ts
│   ├── SetupPage.ts
│   ├── DocsEditorPage.ts
│   ├── ApiPlaygroundSettingsPage.ts
│   ├── PackagePublishingPage.ts
│   ├── AccountSettingsPage.ts
│   └── PricingPlansPage.ts
├── tests/                              # Test files and setup
│   ├── auth.setup.ts                   # Auth setup for package publishing user
│   ├── onboarding.setup.ts             # Auth setup for onboarding user
│   ├── MyApis.test.ts                  # Dashboard / API management tests
│   ├── portalEditor.test.ts            # Portal editor and API Playground tests
│   ├── package-publishing.test.ts      # SDK package publishing tests
│   ├── deleteEntities.test.ts          # Cleanup: deletes API entities
│   ├── post-onboarding.test.ts         # Post-onboarding workflow tests
│   ├── onboarding-visual-test.ts       # Visual regression for onboarding
│   ├── fixtures/
│   │   ├── petstore.json               # OpenAPI 3.0 Petstore spec (test input)
│   │   └── sdk-versions.txt            # Tracks current published SDK version
│   └── dx-visual-regression/
│       └── dx-visual-regression.test.ts
├── utils/
│   └── dx-utils.ts                     # Helper utilities for DX portal testing
├── dx-test-portals/                    # Test portal projects for visual regression
│   ├── custom_components_portal/
│   ├── general_portal/
│   ├── generated_portal/               # Served locally for dx-visual tests
│   ├── maxio_portal/
│   └── thoughtspot_portal/
├── dx-portal-snapshots/                # Baseline snapshots for visual regression
│   ├── dx-portal-visual-regression/
│   └── onboarding-visual/
├── playwright/
│   └── .auth/                          # Stored authentication state (not committed)
├── playwright-report/                  # Generated HTML reports
└── test-results/                       # Test execution artifacts
```

## Key Directories

### `/pages`

Page Object Model (POM) classes that encapsulate page-specific interactions:

| File | Purpose |
|------|---------|
| `BasePage.ts` | Base class providing shared `page` property |
| `LoginPage.ts` | Login form interactions; returns `MyApisPage` on success |
| `MyApisPage.ts` | Main dashboard — API import, SDK generation, download, transform, export, delete |
| `SetupPage.ts` | Onboarding setup cards (theme, docs, recipes, SDKs, Copilot) and navigation |
| `DocsEditorPage.ts` | Docs editor save/preview and API Playground navigation |
| `ApiPlaygroundSettingsPage.ts` | API Playground config, AI settings, Context Plugins, API Copilot |
| `PackagePublishingPage.ts` | SDK package publishing — language selection, version management, publish status |
| `AccountSettingsPage.ts` | User profile updates and sign-out |
| `PricingPlansPage.ts` | Pricing tier selection |

### `/tests`

| File | Test Project | Description |
|------|-------------|-------------|
| `auth.setup.ts` | `setup` | Authenticates the package-publishing user and saves session state |
| `onboarding.setup.ts` | `onboarding-setup` | Authenticates the onboarding user and saves session state |
| `MyApis.test.ts` | `chromium` | 13 tests — API import (sample/file/URL), spec transforms, SDK generation and download |
| `portalEditor.test.ts` | `chromium` | Portal editor workflows and API Playground settings |
| `package-publishing.test.ts` | `package-publishing` | SDK package publishing validation per language |
| `deleteEntities.test.ts` | `cleanup` | Deletes API entities listed in `fixtures/entities.txt` after test runs |
| `post-onboarding.test.ts` | `onboarding` | Post-onboarding flow validation |
| `onboarding-visual-test.ts` | `onboarding-visual` | Visual regression for onboarding screens (1920×1080) |
| `dx-visual-regression.test.ts` | `dx-portal-visual-regression` | Visual regression against locally served DX portals |

### `/utils`

- **`dx-utils.ts`**: Helpers for DX portal testing — `createTempPortalJs()` creates a temporary portal config, `updatePortalJsProperty()` modifies portal configuration properties dynamically.

### `/dx-test-portals`

Five pre-built portal projects used as test inputs for visual regression. `generated_portal/` is served on `http://localhost:4546` during the `dx-visual.yml` workflow.

### `/dx-portal-snapshots`

Baseline screenshot snapshots for visual regression. Snapshots are stored per test project and compared with a 3% pixel-diff tolerance.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install
```

### 3. Set up environment variables

Create a `.env` file in the project root (it is gitignored):

```env
baseUrl=https://app.apimatic.io/dashboard
API_BASE_URL=https://api.apimatic.io
APIMATIC_API_KEY=your_api_key_here

# Used by auth.setup.ts and package-publishing tests
PACKAGE_PUBLISHING_EMAIL=your_email@example.com
PACKAGE_PUBLISHING_PASSWORD=your_password
PUBLISH_LANGUAGE=python
PACKAGE_PUBLISHING_BASEURL=https://dash.apimatic.io/publish/<id>/publish-now

# Used by onboarding.setup.ts and onboarding tests
ONBOARDING_EMAIL=your_onboarding_email@example.com
ONBOARDING_PASSWORD=your_onboarding_password
```

### 4. Run tests

```bash
# Run all tests (chromium project)
npx playwright test

# Run a specific test file
npx playwright test tests/MyApis.test.ts

# Run a specific named project
npx playwright test --project=chromium
npx playwright test --project=package-publishing
npx playwright test --project=onboarding
```

### 5. View test report

```bash
npx playwright show-report
```

## Test Projects

The `playwright.config.ts` defines the following projects:

| Project | Matches | Depends On | Description |
|---------|---------|-----------|-------------|
| `setup` | `auth.setup.ts` | — | Saves package-publishing user session |
| `onboarding-setup` | `onboarding.setup.ts` | — | Saves onboarding user session |
| `chromium` | All tests except visual/standalone | `setup` | Main test suite (Desktop Chrome) |
| `cleanup` | `deleteEntities.test.ts` | — | Deletes test entities after runs |
| `package-publishing` | `package-publishing.test.ts` | `setup` | SDK package publishing per language |
| `onboarding` | `post-onboarding.test.ts` | `onboarding-setup` | Post-onboarding flows |
| `onboarding-visual` | `onboarding-visual-test.ts` | `onboarding-setup` | Visual regression at 1920×1080 |
| `dx-portal-visual-regression` | `dx-visual-regression.test.ts` | — | Visual regression against local portal (port 4546) |

## Configuration

`playwright.config.ts` key settings:

- **Base URL**: Loaded from `baseUrl` environment variable
- **Trace**: `retain-on-failure`
- **Reporter**: HTML
- **Snapshot path**: `dx-portal-snapshots/{projectName}/{testFileDir}/{arg}{ext}`

## Authentication

Two separate authentication setups are used:

- **`auth.setup.ts`**: Logs in as the package-publishing user (`PACKAGE_PUBLISHING_EMAIL` / `PACKAGE_PUBLISHING_PASSWORD`) and saves state to `playwright/.auth/`.
- **`onboarding.setup.ts`**: Logs in as the onboarding user (`ONBOARDING_EMAIL` / `ONBOARDING_PASSWORD`) and saves state separately.

Both setups store session state so tests reuse the authenticated session without logging in each time.

## Visual Regression Testing

Two visual regression projects are configured:

- **`onboarding-visual`**: Captures and compares screenshots of the onboarding flow at 1920×1080.
- **`dx-portal-visual-regression`**: Serves one of the `dx-test-portals/` projects locally on port 4546 and compares rendered portal screenshots against baselines in `dx-portal-snapshots/`.

To update snapshots after intentional UI changes:

```bash
npx playwright test --project=onboarding-visual --update-snapshots
npx playwright test --project=dx-portal-visual-regression --update-snapshots
```

## CI/CD Workflows

All workflows are in `.github/workflows/` and run on GitHub Actions.

| Workflow | Trigger | Runner | Project Run |
|----------|---------|--------|------------|
| `dashboard.yml` | Manual (env: dev/prod) | Ubuntu | `chromium` |
| `portalEditor.yml` | Manual (env: dev/prod) | Ubuntu | `chromium` (portalEditor only) |
| `package-publishing.yml` | Cron (Mon 5am) or manual | Ubuntu | `package-publishing` (matrix per language) |
| `onboarding-visual.yml` | Manual (env: dev/prod) | Ubuntu | `onboarding-visual` |
| `post-onboarding.yml` | Manual (env: dev/prod) | Ubuntu | `onboarding` |
| `dx-visual.yml` | Manual | Windows | `dx-portal-visual-regression` |

**`package-publishing.yml`** runs a language matrix (csharp, java, php, python, ruby, typescript) in parallel and auto-commits a version bump to `fixtures/sdk-versions.txt` after a successful publish.

All workflows upload `playwright-report` as an artifact with 30-day retention.

## Page Object Model

Tests interact with the app exclusively through POM classes in `/pages`. Each class:

- Extends `BasePage` (which holds the Playwright `page` instance)
- Exposes typed locators and action methods
- Returns other page objects where navigation occurs (e.g. `LoginPage.login()` returns `MyApisPage`)

## Reports and Debugging

```bash
# Open HTML report
npx playwright show-report

# Open trace viewer for a failed test
npx playwright show-trace test-results/<test-folder>/trace.zip

# Run tests with headed browser for local debugging
npx playwright test --headed

# Run tests in UI mode
npx playwright test --ui
```

Screenshots and videos are automatically captured on failure and included in the HTML report.
