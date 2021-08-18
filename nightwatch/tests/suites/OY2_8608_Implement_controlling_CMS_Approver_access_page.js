/*
const login = require('../suites/OY2_9999_Login');

module.exports = {
    "@tags": ["profileOne", "smoke", "regression-soon"],

    before: function (browser) {
        login.beforeEach(browser);
        login['Login with cms_role_approvers'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);

    },

    'CMS Role Approver User can view FAQ, Home, Account Management': function (browser) {
        //check on Submission List on the homepage
        let home_link = "(//a[@class='ds-u-text-decoration--none'])[1]";
        let user_management_link = "//a[@id='userManagementLink']";
        let faq_link = "(//a[@class='ds-u-text-decoration--none'])[2]";
        let name_title = "//th[@id='nameColHeader']";
        let status_title = "//th[@id='statusColHeader']";
        let last_modified_title = "//th[@id='lastModifiedColHeader']";
        let modified_by_title = "//th[@id='doneByNameColHeader']";
        let personel_actions_title = "//th[@id='personnelActionsColHeader']";
        let my_account_button = "//button[@id='myAccountLink']";
        let management_profile_link = "//a[@id='manageAccountLink']";
        browser.useXpath().expect.element(home_link).to.be.visible;
        browser.useXpath().expect.element(user_management_link).to.be.visible;
        browser.useXpath().expect.element(faq_link).to.be.visible;
        browser.useXpath().expect.element(name_title).to.be.visible;
        browser.useXpath().expect.element(status_title).to.be.visible;
        browser.useXpath().expect.element(last_modified_title).to.be.visible;
        browser.useXpath().expect.element(modified_by_title).to.be.visible;
        browser.useXpath().expect.element(personel_actions_title).to.be.visible;
        browser.click(my_account_button);
        browser.pause(500);
        browser.useXpath().expect.element(management_profile_link).to.be.visible;
        browser.useXpath().click(management_profile_link);
        browser.pause(500);
        let profile_information_title = "//*[@id='profileInfoHeader']";
        browser.useXpath().expect.element(profile_information_title).to.be.visible;
        browser.click(user_management_link);
        browser.useCss();
    },
}
*/
