import { Locator, Page } from '@playwright/test';
import {BasePage} from "./base.page";

export class CartPage extends BasePage {
    readonly checkoutButton: Locator;
    readonly sauceLabsBackPack: Locator;
    readonly sauceLabsBikeLight: Locator;
    
    readonly cartTitleText: string = "Your Cart";

    constructor(page: Page) {
        super(page);
        this.checkoutButton = this.page.getByTestId('checkout');
        this.sauceLabsBackPack = this.page.getByTestId('item-4-title-link');
        this.sauceLabsBikeLight = this.page.getByTestId('item-0-title-link');
    }
}