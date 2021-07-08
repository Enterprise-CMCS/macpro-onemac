const login = require('../suites/OY2_9999_Login');
let spaCHIPId;
module.exports = {
    "@tags": ["smoke", "regression-soon"],


    before: function (browser) {
        login.beforeEach(browser);
        login['Login with state submitter user'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);
    },

    
    'State Submitter User can view Submission List Dashboard, FAQ, About, Account Management, SubmissionSelection': function (browser) {
        //check on Submission List on the homepage
        let submission_list = "//h1";
        let spa_waiver_number = "(//table[@class='submissions-table']/thead/tr/th)[1]";
        let type_title = "(//table[@class='submissions-table']/thead/tr/th)[2]";
        let state_title = "(//table[@class='submissions-table']/thead/tr/th)[3]";
        let date_submitted = "(//table[@class='submissions-table']/thead/tr/th)[4]";
        let state_submitter = "(//table[@class='submissions-table']/thead/tr/th)[5]";
        let dashboard_link = "//a[@id='dashboardLink']";
        let faq_link = "(//a[@class='ds-u-text-decoration--none'])[2]";
        let home_link = "(//a[@class='ds-u-text-decoration--none'])[1]";
        let my_account_button = "//button[@id='myAccountLink']";
        let management_profile_link = "//a[@id='manageAccountLink']";
        let new_submission_button = "//a[@id='new-submission-button']";
        browser.useXpath().expect.element(submission_list).to.be.visible;
        browser.useXpath().expect.element(spa_waiver_number).to.be.visible;
        browser.useXpath().expect.element(type_title).to.be.visible;
        browser.useXpath().expect.element(state_title).to.be.visible;
        browser.useXpath().expect.element(date_submitted).to.be.visible;
        browser.useXpath().expect.element(state_submitter).to.be.visible;
        browser.useXpath().expect.element(faq_link).to.be.visible;
        browser.useXpath().expect.element(home_link).to.be.visible;
        browser.useXpath().expect.element(my_account_button).to.be.visible;
        browser.click(my_account_button);
        browser.pause(500);
        browser.useXpath().expect.element(management_profile_link).to.be.visible;
        browser.click(management_profile_link);
        browser.pause(500);
        
        //verify the user profile page
        let user_profile_title = "//h1";
        let text_on_top = "//div[@class='subheader-message']";
        let profile_information_title = "(//h3)[1]";
        let full_name_title = "(//h3)[2]";
        let full_name = "(//div[@class='ds-c-review__body'])[1]";
        let email_title = "(//h3)[3]";
        let email = "(//div[@class='ds-c-review__body'])[2]";
        let phone_number_title = "(//h3)[4]";
        let phone_number = "(//div[@class='ds-c-review__body'])[3]";
        let edit_button = "//button[@class='ds-c-button phone-edit-button']";
        let state_access_management = "(//h3)[5]";
        let state_name_one = "//div[@class='state-access-card']/dt";
        let access_granted_status = "//div[@class='state-access-card']/dd/em";
        let state_admins = "//div[@class='state-access-card']/dd/p";
        let close_button = "//button[@class='close-button']";
        let add_state_button = "//button[@class='ds-c-button add-state-button']";
        browser.useXpath().expect.element(user_profile_title).to.be.visible;
        browser.useXpath().expect.element(text_on_top).to.be.visible;
        browser.useXpath().expect.element(profile_information_title).to.be.visible;
        browser.useXpath().expect.element(full_name_title).to.be.visible;
        browser.useXpath().expect.element(full_name).to.be.visible;
        browser.useXpath().expect.element(email_title).to.be.visible;
        browser.useXpath().expect.element(email).to.be.visible;
        browser.useXpath().expect.element(phone_number_title).to.be.visible;
        browser.useXpath().expect.element(phone_number).to.be.visible;
        browser.useXpath().expect.element(edit_button).to.be.visible;
        browser.useXpath().expect.element(state_access_management).to.be.visible;
        browser.useXpath().expect.element(state_name_one).to.be.visible;
        browser.useXpath().expect.element(access_granted_status).to.be.visible;
        browser.useXpath().expect.element(state_admins).to.be.visible;
        browser.useXpath().expect.element(close_button).to.be.visible;
        browser.useXpath().expect.element(add_state_button).to.be.visible;
        browser.useCss();

        
    },
}