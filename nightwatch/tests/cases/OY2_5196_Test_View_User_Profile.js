const login = require("./OY2-1494_Test_SPA_Login");

const timeout = 1000;
let spa;

module.exports = {
  before: function (browser) {
    login.before(browser);
    login["Login to SPA and Waiver Dashboard"](browser);
    spa = browser.page.spaBasePage();
    browser.pause(timeout * 3);
  },

  after: function (browser) {
    login["Logout of SPA and Waiver Dashboard"](browser);
    login.after(browser);
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
    spa.click(testData.myAccountLink).waitForElementPresent(testData.manageAccountLink);
    spa.click(testData.myAccountLink).waitForElementPresent("body");
    browser.assert.urlContains(testData.subUrl);
    browser.verify.containsText('h1', testData.pageTitle);
  },
};
