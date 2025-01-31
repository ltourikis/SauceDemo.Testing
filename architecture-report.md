# SwagLabs Test Framework - Architecture and Implementation

## Technology Stack Choice
Playwright was selected as the primary testing framework for this implementation, aligning with both current practices at Kaizen and Bettson's testing infrastructure. Its modern features, such as auto-waiting mechanisms, powerful selector engine, and built-in tracing capabilities, make it an ideal choice for testing of web applications.

## Project Architecture
The solution follows the Page Object Model (POM) pattern with a clean, maintainable structure:

```
SauceDemo/
├── .auth/                 # Authentication state storage
├── fixtures/             
│   └── test-data.ts      # Test data and configurations
├── pages/                # Page Object definitions
│   ├── base.page.ts      
│   ├── login.page.ts
│   └── ...
├── tests/                # Test implementations
│   ├── login.spec.ts
│   └── shopitems.spec.ts
├── .env                  # Environment variables
└── playwright.config.ts  # Framework configuration
```

### Key Architectural Components

#### Base Page Pattern
The `BasePage` class serves as the foundation for all page objects, implementing common functionality:
```typescript
export class BasePage {
    protected page: Page;
    readonly title: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.getByTestId('title');
    }
}
```
This pattern allows for easy extension of common functionality across all pages, promoting code reuse and maintainability. While Playwright can function effectively without a base page pattern (unlike Selenium where it's crucial), I chose to implement it here to avoid duplicating the title locator across pages. Similar pattern can be followed for other common page elements.

#### Environment Management
Sensitive data like credentials are managed through environment variables using `.env`:
```
STANDARD_USER=standard_user
STANDARD_PASSWORD=secret_sauce
```
The `.env` file is added to `.gitignore` to prevent credential exposure, while `test-data.ts` provides a clean interface to access these variables:
```typescript
export const TestUsers = {
    STANDARD: {
        username: process.env.STANDARD_USER,
        password: process.env.STANDARD_PASSWORD
    }
}
```

#### Authentication State Management
A notable optimization is the implementation of authentication state storage via `auth.setup.ts`:
```typescript
setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login(TestUsers.STANDARD.username, TestUsers.STANDARD.password);
    await page.context().storageState({ path: authFile });
});
```
This setup file:
- Runs before other tests (configured via `dependencies: ['setup']`)
- Stores authentication state in `storageState.json`
- Allows tests to start from an authenticated state, saving execution time
- The storage file is properly added to `.gitignore` for security

### Configuration Choices
The `playwright.config.ts` includes several strategic decisions:

```typescript
export default defineConfig({
  fullyParallel: true,
  headless: false,
  testIdAttribute: 'data-test'
})
```

Key configuration choices:
- Modified default testIdAttribute from data-testid to data-test to match application's attribute convention
- Development-friendly configuration with visible browser (`headless: false`)
- Kept chromium project for simplicity
- Project structure configured with setup and chromium projects:
  ```typescript
  projects: [
    { 
      name: 'setup', 
      testMatch: /.*\.setup\.ts/ 
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
      storageState: 'playwright/.auth/storageState.json',
    },
      dependencies: ['setup'],
    },
  ]
  ```

### Test Organization
Tests are organized by feature:

1. **Login Tests (Parallel)**
   - Run in parallel for efficiency
   - Stateless nature allows concurrent execution
   - Each test maintains isolation through fresh context

2. **Shopping Cart Tests (Serial)**
   - Configured with `test.describe.configure({ mode: 'serial' })`
   - Sequential execution prevents cart state conflicts
   - Ensures reliable test results for order-dependent operations

## Testing Strategy

### Page Object Model (POM)
- Reduces test maintenance by centralizing selector updates
- Follow playwright proposed user-facing attributes and qa-attributes startegy for locators
- Encapsulates page-specific selectors and actions in dedicated classes
- Provides clear, readable APIs for test interactions (e.g., login(), addItemsToCart())

### Clean Test Structure
- Follows the Arrange-Act-Assert pattern for clear test organization
- Keeps assertions in test files only, not in page objects
- Uses descriptive test names that document expected behavior
- Maintains focused test scenarios that verify a single piece of functionality as well as e2e full flows

### Test Data Management
- Separates test data from test logic via the test-data.ts fixture
- Manages sensitive data through environment variables
- Allows easy modification of test data without changing test logic

### State Management
- Uses stored authentication state to optimize test execution
- Handles sequential vs parallel execution based on state dependencies