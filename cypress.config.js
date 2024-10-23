const { defineConfig } = require("Cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://delivery.publix.com/store/publix/storefront',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
});
