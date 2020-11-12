const login = require('./OY2-1494_Test_SPA_Login');
module.exports = {
  tags : ['smoke'],

  before : function(browser) {
    login.before(browser);
    login["Verify SPA and Waiver Dashboard"](browser);
  },

  after : function(browser) {
    login.after(browser);
  },

  'Enter Login Credentials' : function (browser) {
    const loginPage = browser.page.spaLoginPage();
    loginPage.setValue('@userField', 'automatedtester011@gmail.com');
    loginPage.setValue('@passField', 'badpassword');
    loginPage.click('@submitBtn')
        .verify.visible('@submitBtn')
        .assert.elementPresent("#alert_1")
        .assert.visible("#alert_1")
        .assert.containsText("#alert_1", "Login Error");
  }
};