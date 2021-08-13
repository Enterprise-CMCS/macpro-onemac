const login = require('../suites/OY2_9999_Login');

module.exports = {
    "@tags": ["profileOne", "smoke", "regression-soon"],

    before: function (browser) {
        login.beforeEach(browser);
        login['Login with cms_reviewers'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);

    },

    'CMS Reviewer view User Profile page and FAQ page': function (browser) {
        let my_account_button = "//button[@id='myAccountLink']";
        let management_profile_link = "//a[@id='manageAccountLink']";
        browser.useXpath().click(my_account_button);
        browser.pause(500);
        browser.useXpath().expect.element(management_profile_link).to.be.visible;
        browser.useXpath().click(management_profile_link);
        browser.pause(500);
        let user_profile_title = "//h1";
        let profile_information_title = "//*[@id='profileInfoHeader']";
        let full_name_title = "(//h3)[1]";
        let full_name = "(//div[@class='ds-c-review__body'])[1]";
        let role_title = "(//h3)[2]";
        let role = "(//div[@class='ds-c-review__body'])[2]";
        let email_title = "(//h3)[3]";
        let email = "(//div[@class='ds-c-review__body'])[3]";
        let phone_number_title = "//label[@class='ds-c-label']";
        let add_phone_button = "//button[@id='addButton']";
        let text_at_bottom = "//div[@id='profileDisclaimer']";
        let group_division = "(//h2)[3]";
        let group_title = "(//h3)[4]";
        let group = "//div[@class='cms-group-division-section']/p";
        let division_title = "(//h3)[5]";
        let division = "//div[@class='cms-group-division-section cms-division-background']/p";
        let faq_link = "(//a[@class='ds-u-text-decoration--none'])[3]";
        let status = "(//h2)[2]";
        let access_granted = "//div[@class='state-access-card']//dd//em";
        let cms_role_approvers = "//div[@class='state-access-card']//dd//p";
        browser.useXpath().expect.element(user_profile_title).to.be.visible;
        browser.useXpath().expect.element(profile_information_title).to.be.visible;
        browser.useXpath().expect.element(full_name_title).to.be.visible;
        browser.useXpath().expect.element(full_name).to.be.visible;
        browser.useXpath().expect.element(role_title).to.be.visible;
        browser.useXpath().expect.element(role).to.be.visible;
        browser.useXpath().expect.element(email_title).to.be.visible;
        browser.useXpath().expect.element(email).to.be.visible;
        browser.useXpath().expect.element(phone_number_title).to.be.visible;
        browser.useXpath().expect.element(add_phone_button).to.be.visible;
        browser.useXpath().expect.element(text_at_bottom).to.be.visible;
        browser.useXpath().expect.element(group_division).to.be.visible;
        browser.useXpath().expect.element(group_title).to.be.visible;
        browser.useXpath().expect.element(group).to.be.visible;
        browser.useXpath().expect.element(division_title).to.be.visible;
        browser.useXpath().expect.element(division).to.be.visible;
        browser.useXpath().expect.element(status).to.be.visible;
        browser.useXpath().expect.element(access_granted).to.be.visible;
        browser.useXpath().expect.element(cms_role_approvers).to.be.visible;
        browser.useXpath().expect.element(faq_link).to.be.visible;
        browser.useXpath().click(faq_link);
        browser.pause(500);
        let frequently_asked_question_title = "//h1";
        browser.useXpath().expect.element(frequently_asked_question_title).to.be.visible;
        browser.useCss();
    },
}