
const login = require('../suites/OY2_9999_Login');

module.exports = {
    "@tags": ["smoke", "regression-soon"],

    before: function (browser) {
        login.beforeEach(browser);
        login['Login with cms_role_approvers pending user'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);

    },

    'CMS Role Approver User pending status view system access is pending approval': function (browser) {
        //check on user management page 
        let home_link = "(//a[@class='ds-u-text-decoration--none'])[1]";
        let faq_link = "(//a[@class='ds-u-text-decoration--none'])[2]";
        let user_management_link = "//a[@id='userManagementLink']";
        let user_management_title = "//h1";
        //let puzzle_piece_image = "//div[@class='empty-list']/img";
        //let pending_message = "//div[@class='empty-list']/h4";
        let my_account_button = "//button[@id='myAccountLink']";
        let management_profile_link = "//a[@id='manageAccountLink']";
        
        browser.useXpath().expect.element(home_link).to.be.visible;
        browser.useXpath().expect.element(faq_link).to.be.visible;
        browser.useXpath().expect.element(user_management_link).to.be.visible;
        browser.useXpath().expect.element(user_management_title).to.be.visible;
        //browser.useXpath().expect.element(puzzle_piece_image).to.be.visible;
       // browser.useXpath().expect.element(pending_message).to.be.visible;
       // browser.useXpath().verify.containsText(pending_message, "Your system access is pending approval. Contact the CMS System Admin with any questions.");
        browser.useXpath().expect.element(my_account_button).to.be.visible;
        browser.click(my_account_button);
        browser.useXpath().expect.element(management_profile_link).to.be.visible;
        browser.click(management_profile_link);
        browser.pause(500);
        let profile_information_title = "//*[@id='profileInfoHeader']";
        browser.useXpath().expect.element(profile_information_title).to.be.visible;
        browser.useCss();
    },
}
