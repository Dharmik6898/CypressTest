//Search Bar Custom Commands
Cypress.Commands.add('searchItem', (searchTerm) => {
    cy.get('#search-bar-input').type("water{enter}");
});

//Product Counter validate from locator
Cypress.Commands.add('validateProductCounter', (locator, expectedItemNumber) => {
    cy.get(locator).find('span').first().should('contain', expectedItemNumber);
});
