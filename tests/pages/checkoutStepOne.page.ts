import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutStepOnePage extends BasePage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;

    readonly checkoutStepOneTitleText: string = "Checkout: Your Information";

    constructor(page: Page) {
        super(page);
        this.firstNameInput = this.page.getByTestId('firstName');
        this.lastNameInput = this.page.getByTestId('lastName');
        this.postalCodeInput = this.page.getByTestId('postalCode');
        this.continueButton = this.page.getByTestId('continue');
        this.cancelButton = this.page.getByTestId('cancel');
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueCheckout() {
        await this.continueButton.click();
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }
}