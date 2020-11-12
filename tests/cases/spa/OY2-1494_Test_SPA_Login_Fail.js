const login = require('./OY2-1494_Test_SPA_Login');
module.exports = {
  tags : ['smoke'],

  before : function(browser) {
    login.before(browser);
    login["Click Login"](browser);
  },

  after : function(browser) {
    login.after(browser);
  },

  'Login to WMS Dashboard' : function (browser) {
    const spa = browser.page.spaLoginPage();
    spa.setValue('@userField', 'automatedtester011@gmail.com');
    spa.setValue('@passField', 'badpassword');
    spa.click('@submitBtn')
        .verify.visible('@submitBtn')
        .assert.elementPresent("#alert_1")
        .assert.visible("#alert_1")
        .assert.containsText("#alert_1", "Login Error");
  }
};