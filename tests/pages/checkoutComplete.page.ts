import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutCompletePage extends BasePage {
    readonly backHomeButton: Locator;
    readonly completeHeader: Locator;
    readonly completeText: Locator;

    readonly checkoutCompleteTitleText: string = "Checkout: Complete!";

    constructor(page: Page) {
        super(page);
        this.backHomeButton = this.page.getByTestId('back-to-products');
        this.completeHeader = this.page.getByTestId('complete-header');
        this.completeText = this.page.getByTestId('complete-text');
    }

    async goBackHome() {
        await this.backHomeButton.click();
    }
}