# SwagLabs E2E Test Plan
## Overview
This test plan covers end-to-end testing of two major features in the SwagLabs demo application:
1. Login Functionality
2. Shopping Cart and Checkout Flow

## 1. Login Functionality

### 1.1 Happy Path Validation
TC001: Standard User Login
- Description: Verify successful login with valid standard user credentials
- Precondition: User is on login page
- Test Data: 
  - Username: standard_user
  - Password: secret_sauce
- Expected Response: Successful navigation to inventory page
- Validation Points:
  - URL changes to inventory page
  - Inventory title is visible
  - Shopping cart is accessible

TC002: Performance Glitch User Login
- Description: Verify login with performance glitch user
- Test Data: 
  - Username: performance_glitch_user
  - Password: secret_sauce
- Expected Response: Successful login with potential delay
- Validation: Monitor response time thresholds

### 1.2 Error Handling
TC003: Locked Out User
- Description: Verify proper error handling for locked out accounts
- Test Data:
  - Username: locked_out_user
  - Password: secret_sauce
- Expected Response: Error message indicating account is locked
- Validation: Error message content and visibility

TC004: Problem User Login
- Description: Verify handling of problem user login
- Test Data:
  - Username: problem_user
  - Password: secret_sauce
- Expected Response: Appropriate error messaging
- Validation: Error visibility and content

TC005: Invalid Credentials
- Description: Verify system handling of invalid login attempts
- Test Scenarios:
  - Invalid username, valid password
  - Valid username, invalid password
  - Empty username field
  - Empty password field
- Expected Response: Clear error messaging
- Validation: Error message accuracy and visibility

## 2. Shopping Cart and Checkout Flow

### 2.1 Product Selection
TC006: Add Items to Cart
- Description: Verify adding multiple items to shopping cart
- Precondition: Logged in as standard user
- Test Steps:
  1. Add items to cart
- Expected Response:
  - Cart badge updates correctly
  - Items appear in cart
- Validation:
  - Cart badge count accuracy
  - Product presence in cart
  - Price accuracy

TC007: Remove Items from Cart
- Description: Verify removal of items from cart
- Test Steps:
  1. Add items to cart
  2. Remove items using Remove button
- Expected Response: Cart updates correctly
- Validation:
  - Cart badge updates
  - Items removed from cart view

### 2.2 Checkout Process
TC008: Complete Checkout Flow
- Description: Verify end-to-end checkout process
- Test Steps:
  1. Add items to cart
  2. Navigate to cart
  3. Click Checkout
  4. Enter shipping information
  5. Review order
  6. Complete purchase
- Expected Response: Order completion confirmation
- Validation:
  - Navigation through all checkout steps
  - Order summary accuracy
  - Confirmation message
  - Price calculations

TC009: Input Field Validation
- Description: Verify checkout information validation
- Test Scenarios:
  - Empty required fields
  - Invalid zip/postal code format
  - Special characters in name fields
- Expected Response: Appropriate validation messages
- Validation: Error message display and content

### 2.3 Edge Cases
TC010: Empty Cart Checkout
- Description: Verify system handling of checkout with empty cart
- Test Steps:
  1. Navigate to cart without adding items
  2. Attempt checkout process
- Expected Response: Appropriate messaging or prevention
- Validation: System prevents invalid checkout

TC011: Price Calculation
- Description: Verify accurate price calculations
- Test Steps:
  1. Add multiple items
  2. Proceed to checkout
- Validation Points:
  - Subtotal calculation
  - Tax calculation
  - Total price accuracy
