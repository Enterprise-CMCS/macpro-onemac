const login = require("./OY2-1494_Test_SPA_Login");

const timeout = 1000;
let pageObjects;

module.exports = {
  before: function (browser) {
    login.beforeEach(browser);
    login["Login to SPA and Waiver Dashboard"](browser);
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
      pageTitle: "User Profile"
    }
  ) {
    pageObjects = browser.page.spaBasePage();

    pageObjects.click(testData.myAccountLink)
    .waitForElementPresent(testData.manageAccountLink)
    .click(testData.manageAccountLink)
    .expect.url().to.contain(testData.subUrl);
    //browser.waitForElementPresent('body');
    //browser.expect.element('h1').text.to.contain(testData.pageTitle);
  },
};
