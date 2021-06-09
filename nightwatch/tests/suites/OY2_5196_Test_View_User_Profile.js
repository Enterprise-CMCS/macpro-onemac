const login = require("../cases/OY2-1494_Test_SPA_Login");

const timeout = 1000;
let pageObjects;

module.exports = {
  "@tags": ["smoke", "regression-soon"],
  
  before: function (browser) {
    login.beforeEach(browser);
},

after: function (browser) {
    login.afterEach(browser);
},

  "Navigate to the Manage Account page": function (
    browser,
    testData = {
      myAccountLink: "@myAccountLink",
      manageAccountLink: "@manageAccountLink",
      subUrl: "/profile",
      pageTitle: "Account Management"
    }
  ) {
    pageObjects = browser.page.spaBasePage();

    pageObjects.click(testData.myAccountLink).waitForElementPresent(testData.manageAccountLink);
    pageObjects.click(testData.manageAccountLink).waitForElementPresent("body");
    browser.assert.urlContains(testData.subUrl);
    browser.verify.containsText('h1', testData.pageTitle);
  },
};