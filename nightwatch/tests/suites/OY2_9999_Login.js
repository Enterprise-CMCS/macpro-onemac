const login = require('../cases/OY2-1494_Test_SPA_Login');

module.exports= {
    beforeEach: function (browser) {
         login.beforeEach(browser);

    },
      
    afterEach: function (browser) {
        login.afterEach(browser);
   
    },
      
    "Login with state submitter user": function (browser, testData = browser.globals.submitter) {
        login['Login to SPA and Waiver Dashboard'](browser, testData);
    },

    "Login with state admin user": function (browser) {
        this['Login with state submitter user'](browser, browser.globals.state_admin);
    },
    "Login with cms_reviewers": function (browser) {
        this['Login with state submitter user'](browser, browser.globals.cms_reviewers);
    },

    "Login with cms_approvers": function (browser) {
        this['Login with state submitter user'](browser, browser.globals.cms_approvers);
    },

    "Login with cms_system_admin": function (browser) {
        this['Login with state submitter user'](browser, browser.globals.cms_system_admin);
    },

    "Login with cms_helpdesk_users": function (browser) {
        this['Login with state submitter user'](browser, browser.globals.cms_helpdesk);
    },
  
    "Login with state submitter pending user": function (browser) {
        this['Login with state submitter user'](browser, browser.globals.submitter_pending);
    },

    "Login with state admin pending user": function (browser) {
        this['Login with state submitter user'](browser, browser.globals.state_admin_pending);
    },

    "Login with cms_approvers pending user": function (browser) {
        this['Login with state submitter user'](browser, browser.globals.cms_approvers_pending);
    },

    "Login with state submitter denied user": function (browser) {
        this['Login with state submitter user'](browser, browser.globals.submitter_denied);
    },

    "Login with state admin denied user": function (browser) {
        this['Login with state submitter user'](browser, browser.globals.state_admin_denied);
    },

    "Login with cms_approvers denied user": function (browser) {
        this['Login with state submitter user'](browser, browser.globals.cms_approvers_denied);
    },
}