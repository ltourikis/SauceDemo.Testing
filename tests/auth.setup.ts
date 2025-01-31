import { test as setup } from '@playwright/test';
import { TestUsers } from './fixtures/test-data';
import { LoginPage } from './pages/login.page';
import * as path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/storageState.json');

setup('authenticate', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateTo();
        await loginPage.login(TestUsers.STANDARD.username, TestUsers.STANDARD.password);
        await page.context().storageState({ path: authFile });
});

export { expect } from '@playwright/test';