/// <reference types="Cypress" />

import '@cypress/xpath';

describe('Publix Delivery E-commerce Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add and manage products in the cart', () => {
    
    let product_one_price; //To save price for product1
    let product_two_price; //To save price for product2

    //Add the first product in the cart and store the price in the variable
    cy.get('.e-fsno8i').first().within(() => {
      cy.get('.e-1jioxed').find('span').first().invoke('text').then((price) => {
        product_one_price = price.trim();
      });
      cy.get('[data-testid="addItemButtonExpandingAdd"]').parent().first().click();
    });
    
    cy.validateProductCounter('.e-arzqjs',"1"); //Validate the counter on product tile
    cy.validateProductCounter('.e-15iysp6',"1"); //Validate the counter on cart

    cy.searchItem("water{enter}"); //Search water in the search bar

    cy.get('[data-testid="addItemButtonExpandingAdd"]').parent().first().click(); //Add first item in the list to cart

    cy.validateProductCounter('.e-arzqjs',"1"); //Validate the counter on product tile
    cy.validateProductCounter('.e-15iysp6',"2"); //Validate the counter on cart

    cy.get('.e-arzqjs').find('button[class="e-rfpuw"]').first().click(); //Remove the product from cart using button on the product tile

    cy.get('.e-arzqjs').should('not.exist'); //Validate the counter on product tile is updated.

    cy.validateProductCounter('.e-15iysp6',"1"); //Validate the counter on cart is updated

    //Add the product(second item) in the cart and store the price in the variable
    cy.get('.e-fsno8i').first().within(() => {
      cy.get('.e-1jioxed').find('span').first().invoke('text').then((price) => {
        product_two_price = price.trim(); 
      });
      cy.get('[data-testid="addItemButtonExpandingAdd"]').parent().first().click();
    });

    cy.then(() => {
      let product_one_price_number =  parseFloat(product_one_price.split('$')[1]); //Get the numeric value for the price
      let product_two_price_number =  parseFloat(product_two_price.split('$')[1]); //Get the numeric value for the price
      let resultString = "$"+product_one_price_number+"$"+product_two_price_number; //Prepare string to validate the price in cart
      let subtotal = (product_one_price_number + product_two_price_number).toFixed(2); //Prepare the subtotal to validate
      cy.get('.e-15iysp6').click(); //Open cart
      cy.get('.e-b311fy').find('.e-y7gk1u').should("have.text", resultString); //Validate the product price in the cart with the price stored from product tile
      cy.get('.e-1umwukd').should("have.text","$"+subtotal.toString()); //Validate the subtotal in the cart. 
    });
  });
});



