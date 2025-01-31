import { Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly lockOutMessage: string = "Epic sadface: Sorry, this user has been locked out.";
    readonly problemMessage: string = "Epic sadface: Sorry, this users login is facing problems";

    constructor(private page: Page) {
        this.userNameInput = this.page.getByTestId('username');
        this.passwordInput = this.page.getByTestId('password');
        this.loginButton = this.page.getByTestId('login-button');
        this.errorMessage = this.page.getByTestId('error');
    }
    
    async navigateTo() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}