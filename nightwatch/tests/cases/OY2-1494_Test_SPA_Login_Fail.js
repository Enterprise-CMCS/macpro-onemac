const login = require('./OY2-1494_Test_SPA_Login_Dev');
module.exports = {
  tags : ['smoke'],

  before : function(browser) {
    login.before(browser);
  },

  after : function(browser) {
    login.after(browser);
  },

  'Enter Login Credentials' : function (browser) {
    const loginPage = browser.page.spaBasePage();
    loginPage.click("@devLoginButton");
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