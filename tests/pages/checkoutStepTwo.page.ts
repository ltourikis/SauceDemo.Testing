import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutStepTwoPage extends BasePage {
    readonly finishButton: Locator;
    readonly cancelButton: Locator;
    readonly summarySubtotal: Locator;
    readonly summaryTax: Locator;
    readonly summaryTotal: Locator;
    readonly sauceLabsBackPack: Locator;
    readonly sauceLabsBikeLight: Locator;

    readonly checkoutStepTwoTitleText: string = "Checkout: Overview";

    constructor(page: Page) {
        super(page);
        this.finishButton = this.page.getByTestId('finish');
        this.cancelButton = this.page.getByTestId('cancel');
        this.summarySubtotal = this.page.getByTestId('subtotal_label');
        this.summaryTax = this.page.getByTestId('tax_label');
        this.summaryTotal = this.page.getByTestId('total_label');
        this.sauceLabsBackPack = this.page.getByTestId('item-4-title-link');
        this.sauceLabsBikeLight = this.page.getByTestId('item-0-title-link');
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }
}