const login = require('../cases/OY2-1494_Test_SPA_Login');

module.exports= {
    beforeEach: function (browser) {
         login.beforeEach(browser);

    },
      
    afterEach: function (browser) {
        login.afterEach(browser);
   
    },
      
    "Login with state user": function (browser, testData = browser.globals.user) {
        login['Login to SPA and Waiver Dashboard'](browser, testData);
    },

    "Login with state admin user": function (browser) {
        this['Login with state user'](browser, browser.globals.state_admin);
    },

    "Login with cms_approvers": function (browser) {
        this['Login with state user'](browser, browser.globals.cms_approvers);
    },

    "Login with cms_system_admin": function (browser) {
        this['Login with state user'](browser, browser.globals.cms_system_admin);
    },
}