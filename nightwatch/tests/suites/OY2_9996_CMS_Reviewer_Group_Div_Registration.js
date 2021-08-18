

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
    'CMS reviewer group and division': function (browser) {
        //check on user management page
        let my_account_button = 'button#myAccountLink';
        let manage_account_link = 'a#manageAccountLink'; 
        browser.useCss().click(my_account_button); 
        browser.useCss().click(manage_account_link); 
        browser.pause(2000);
        browser.useXpath().assert.containsText( "//h2", "Profile Information").pause(2000);
        
        let full_name = "(//div[@class='ds-c-review__body'])[1]";
        let role = "(//div[@class='ds-c-review__body'])[2]";
        let role_email = "(//div[@class='ds-c-review__body'])[3]";
        let group = "(//dd)[2]";
        let division = "(//dd)[3]";

        
        browser.useXpath().assert.containsText( full_name, "CMSReviewer Nightwatch");
        browser.useXpath().assert.containsText( role, "CMS Reviewer");
        browser.useXpath().assert.containsText( role_email, "cmsreviewer@nightwatch.test");
        browser.useXpath().assert.containsText( group, "State Demonstrations Group");
        browser.useXpath().assert.containsText( division, "Div of Eligibility & Coverage Demonstrations");
        browser.useCss();
    },
}
