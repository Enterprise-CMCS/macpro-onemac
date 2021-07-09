
const login = require('../suites/OY2_9999_Login');
module.exports = {

    "@tags": ["smoke", "regression-soon"],

    before: function (browser) {
        login.beforeEach(browser);
        login['Login with cms_helpdesk_users'](browser); 
    },

    after: function (browser) {
        login.afterEach(browser);
    },
    'Verify the sort funtionality on Dashboard': function (browser) {
       browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[2]/div[1]/div/h1", "Submission List");
    },
}