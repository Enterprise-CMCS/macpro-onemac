

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
        
        let full_name = "/html/body/reference/div/div/div[2]/div[2]/div[1]/div[1]/div[1]/div/div";
        let role = "/html/body/reference/div/div/div[2]/div[2]/div[1]/div[1]/div[2]/div/div";
        let role_email = "/html/body/reference/div/div/div[2]/div[2]/div[1]/div[1]/div[3]/div/div";
        let group = "/html/body/reference/div/div/div[2]/div[2]/div[1]/div[2]/div/div[2]/div[1]/p";
        let division = "/html/body/reference/div/div/div[2]/div[2]/div[1]/div[2]/div/div[2]/div[2]/p";

        
        browser.useXpath().assert.containsText( full_name, "CMSReviewer Nightwatch");
        browser.useXpath().assert.containsText( role, "CMS Reviewer");
        browser.useXpath().assert.containsText( role_email, "cmsreviewer@nightwatch.test");
        browser.useXpath().assert.containsText( group, "State Demonstrations Group");
        browser.useXpath().assert.containsText( division, "Div of Eligibility & Coverage Demonstrations");
        browser.useCss();
    },
}
