import { test, expect } from '@playwright/test';
import { InventoryPage } from './pages/inventory.page';
import { CartPage } from './pages/cart.page';
import { CheckoutStepOnePage } from './pages/checkoutStepOne.page';
import { CheckoutStepTwoPage } from "./pages/checkoutStepTwo.page";
import { CheckoutCompletePage } from "./pages/checkoutComplete.page";

test.describe.configure({ mode: 'serial' });

test.describe('Shop items e2e tests', () => {
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutStepOnePage: CheckoutStepOnePage;
    let checkoutStepTwoPage: CheckoutStepTwoPage;
    let checkoutCompletePage: CheckoutCompletePage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutStepOnePage = new CheckoutStepOnePage(page);
        checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        checkoutCompletePage = new CheckoutCompletePage(page);

        await page.goto(inventoryPage.Url);
    });

    test('should add two items to the cart, proceed to checkout and complete purchase', async () => {
        
        // Add items to cart
        await inventoryPage.addItemsToCart([
           inventoryPage.sauceLabsBackpack, 
           inventoryPage.sauceLabsBikeLight]);
        await expect(inventoryPage.shoppingCartBadge).toHaveText('2');

        // Navigate to cart
        await inventoryPage.shoppingCartLink.click();
        
        // Verify items in cart
        await expect(cartPage.sauceLabsBackPack).toBeVisible();
        await expect(cartPage.sauceLabsBikeLight).toBeVisible();

        // Proceed to checkout
        await cartPage.checkoutButton.click();
        
        // Complete purchase
       await checkoutStepOnePage.fillCheckoutInformation('John', 'Doe', '12345');
       await checkoutStepOnePage.continueCheckout();
       await checkoutStepTwoPage.finishCheckout();
       
       // Assert completion
       await expect(checkoutCompletePage.completeHeader).toBeVisible();
    });

    test('should not complete purchase with an empty cart', async () => {
        
        // Navigate to cart
        await inventoryPage.shoppingCartLink.click();
        
        // Proceed to checkout
        await cartPage.checkoutButton.click();

        // Complete purchase
        await checkoutStepOnePage.fillCheckoutInformation('John', 'Doe', '12345');
        await checkoutStepOnePage.continueCheckout();
        await checkoutStepTwoPage.finishCheckout();

        // Assert completion
        await expect(checkoutCompletePage.completeHeader).not.toBeVisible();
    });
});