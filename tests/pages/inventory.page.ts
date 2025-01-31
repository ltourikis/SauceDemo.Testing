import { Locator, Page } from '@playwright/test';
import {BasePage} from "./base.page";

export class InventoryPage extends BasePage {
    
    readonly shoppingCartLink: Locator
    readonly shoppingCartBadge: Locator
    readonly sauceLabsBackpack: Locator;
    readonly sauceLabsBikeLight: Locator;
    readonly sauceLabsBoltTShirt: Locator;
    readonly sauceLabsFleeceJacket: Locator;
    readonly sauceLabsOnesie: Locator;
    readonly testAllTheThingsTShirt: Locator;
    
    readonly inventoryTitleText: string = "Products";
    readonly Url: string = "https://www.saucedemo.com/inventory.html";

    constructor(page: Page) {
        super(page);
        this.shoppingCartLink = this.page.getByTestId('shopping-cart-link');
        this.shoppingCartBadge = this.page.getByTestId('shopping-cart-badge');
        this.sauceLabsBackpack = this.page.getByTestId('add-to-cart-sauce-labs-backpack');
        this.sauceLabsBikeLight = this.page.getByTestId('add-to-cart-sauce-labs-bike-light');
        this.sauceLabsBoltTShirt = this.page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt');
        this.sauceLabsFleeceJacket = this.page.getByTestId('add-to-cart-sauce-labs-fleece-jacket');
        this.sauceLabsOnesie = this.page.getByTestId('add-to-cart-sauce-labs-onesie');
        this.testAllTheThingsTShirt = this.page.getByTestId('add-to-cart-test.allthethings()-t-shirt-(red)');
    }

    async addItemsToCart(addToCartButtons: Locator[]) {
        for (const button of addToCartButtons) {
            await button.click();
        }
    }
}