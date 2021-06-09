const login = require('./OY2-1494_Test_SPA_Login');
module.exports = {
  tags : ['smoke'],

  before : function(browser) {
    login.beforeEach(browser);
  },

  after : function(browser) {
    browser.end();
  },

  'Enter Login Credentials' : function (browser) {
    const loginPage = browser.page.spaBasePage();
    loginPage.verify.elementPresent("@devLoginButton")
    .click("@devLoginButton");
    browser.waitForElementPresent('body');
    loginPage.setValue('@devUserField', 'automatedtester011@gmail.com');
    loginPage.setValue('@devPassField', 'badpassword');
    loginPage.click('@devSubmitBtn')
        .verify.visible('@devSubmitBtn')
        .assert.elementPresent("#alert_1")
        .assert.visible("#alert_1")
        .assert.containsText("#alert_1", "Login Error");
  }
};