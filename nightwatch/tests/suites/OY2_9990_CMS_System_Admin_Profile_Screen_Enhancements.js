const login = require('../suites/OY2_9999_Login');
let spaCHIPId;
module.exports = {
    "@tags": ["smoke", "regression-soon"],


    before: function (browser) {
        login.beforeEach(browser);
        login['Login with cms_system_admin'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);
    },

    
    'CMS System Admin User Profile Screen Enhancements': function (browser) {
        //check on Submission List on the homepage
        let user_management_title = "//h1";
        let name_title = "(//tr[@role='row']/th)[1]";
        let email_title = "(//tr[@role='row']/th)[2]";
        let status_title = "(//tr[@role='row']/th)[3]";
        let role_title = "(//tr[@role='row']/th)[4]";


        let last_modified_title = "(//tr[@role='row']/th)[5]";
        let modified_by_title = "(//tr[@role='row']/th)[6]";
        let personnel_actions_title = "(//tr[@role='row']/th)[7]";
        let faq_link = "(//a[@class='ds-u-text-decoration--none'])[2]";
        let user_management_link = "//a[@id='userManagementLink']";
        let home_link = "(//a[@class='ds-u-text-decoration--none'])[1]";
        let my_account_button = "//button[@id='myAccountLink']";
        let management_profile_link = "//a[@id='manageAccountLink']";
        
        browser.useXpath().expect.element(user_management_title).to.be.visible;
        browser.useXpath().expect.element(name_title).to.be.visible;
        browser.useXpath().expect.element(email_title).to.be.visible;
        browser.useXpath().expect.element(status_title).to.be.visible;
        browser.useXpath().expect.element(role_title).to.be.visible;
        browser.useXpath().expect.element(last_modified_title).to.be.visible;
        browser.useXpath().expect.element(modified_by_title).to.be.visible;
        browser.useXpath().expect.element(personnel_actions_title).to.be.visible;
        browser.useXpath().expect.element(faq_link).to.be.visible;
        browser.useXpath().expect.element(user_management_link).to.be.visible;
        browser.useXpath().expect.element(home_link).to.be.visible;
        browser.click(my_account_button);
        browser.pause(500);
        browser.useXpath().expect.element(management_profile_link).to.be.visible;
        browser.click(management_profile_link);
        browser.pause(500);
        
        //verify the user profile page
        let user_profile_title = "//h1";
        //let text_on_top = "//div[@class='subheader-message']";
        let profile_information_title = "//h2[@id='profileInfoHeader']";
        let full_name_title = "(//h3)[1]";
        let full_name = "(//div[@class='ds-c-review__body'])[1]";
        let role_title_two  = "(//h3)[2]";
        let role = "(//div[@class='ds-c-review__body'])[2]";
        let email_title_two = "(//h3)[3]";
        let email = "(//div[@class='ds-c-review__body'])[3]";
        let phone_number_title = "//span";
        let phone_number_add = "//button[@id='addButton']";
        //let status = "//h2[@id='accessHeader']";
        //let state_access_management = "(//h3)[5]";
        //let state_name_one = "//div[@class='state-access-card']/dt";
        //let access_granted_status = "//div[@class='state-access-card']/dd/em";
        //let cms_system_admins = "//div[@class='state-access-card']/dd/p";
        let text_at_bottom = "//div[@id='profileDisclaimer']";
        //let close_button = "//button[@class='close-button']";
        //let add_state_button = "//button[@class='ds-c-button add-state-button']";
        browser.useXpath().expect.element(user_profile_title).to.be.visible;
        //browser.useXpath().expect.element(text_on_top).to.be.visible;
        browser.useXpath().expect.element(profile_information_title).to.be.visible;
        browser.useXpath().expect.element(full_name_title).to.be.visible;
        browser.useXpath().expect.element(full_name).to.be.visible;
        browser.useXpath().expect.element(role_title_two).to.be.visible;
        browser.useXpath().expect.element(role).to.be.visible;
        browser.useXpath().expect.element(email_title_two).to.be.visible;
        browser.useXpath().expect.element(email).to.be.visible;
        browser.useXpath().expect.element(phone_number_title).to.be.visible;
        browser.useXpath().expect.element(phone_number_add).to.be.visible;
        //browser.useXpath().expect.element(status).to.be.visible;
        //browser.useXpath().expect.element(state_access_management).to.be.visible;
        //browser.useXpath().expect.element(state_name_one).to.be.visible;
        //browser.useXpath().expect.element(access_granted_status).to.be.visible;
        //browser.useXpath().expect.element(cms_system_admins).to.be.visible;
        browser.useXpath().expect.element(text_at_bottom).to.be.visible;
        //browser.useXpath().expect.element(close_button).to.be.visible;
        //browser.useXpath().expect.element(add_state_button).to.be.visible;
        browser.useCss();

        
    },
}