import { Locator, Page } from '@playwright/test';

export class BasePage {
    protected page: Page;
    readonly title: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.getByTestId('title');
    }
}