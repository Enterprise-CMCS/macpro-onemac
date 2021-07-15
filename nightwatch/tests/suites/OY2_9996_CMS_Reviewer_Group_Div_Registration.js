

const login = require('../suites/OY2_9999_Login');
let spaCHIPId;
module.exports = {
    "@tags": ["smoke", "regression-soon"],


    before: function (browser) {
        login.beforeEach(browser);
        login['Login with cms_reviewers'](browser);
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
    
        pageObjects.click(testData.myAccountLink).waitForElementPresent(testData.manageAccountLink);
        pageObjects.click(testData.manageAccountLink).waitForElementPresent("body");
        browser.assert.urlContains(testData.subUrl);
        browser.verify.containsText('h1', testData.pageTitle);
        browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[2]/div[1]/div[2]/dl/div/div[2]/dt", "Maryland");
        browser.useCss();
        browser.click("xpath", "/html/body/reference/div/div/div[1]/div[2]/div[1]/div[2]/a[2]").waitForElementPresent("body");
    
      },
}