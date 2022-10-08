const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    'baseUrl': "http://localhost:3000",
    "excludeSpecPattern": ["**/e2e/examples/*.js"],
    // "viewportHeight": "1920",
    // "viewportWidth": "1280"
  },
});
