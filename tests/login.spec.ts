import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';
import { TestUsers } from './fixtures/test-data';

test.describe('Login Functionality', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.navigateTo();
    });

    test('should login successfully with valid credentials', async () => {
        // Act
        await loginPage.login(TestUsers.STANDARD.username, TestUsers.STANDARD.password);
        
        // Assert
        await expect(inventoryPage.title).toBeVisible();
        await expect(inventoryPage.title).toHaveText(inventoryPage.inventoryTitleText);
    });

    test('should show error for locked out user', async () => {
        // Act
        await loginPage.login(TestUsers.LOCKED.username, TestUsers.LOCKED.password);
        
        // Assert
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText(loginPage.lockOutMessage);
        await expect(inventoryPage.title).not.toBeVisible();
    });

    test('should show error for invalid credentials', async () => {
        // Act
        await loginPage.login(TestUsers.PROBLEM.username, TestUsers.PROBLEM.password);
        
        // Assert
        await expect(loginPage.errorMessage).toHaveText(loginPage.problemMessage);
        await expect(inventoryPage.title).not.toBeVisible();
    });
});