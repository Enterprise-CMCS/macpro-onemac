
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

    
    'CMS Approver User Profile Screen Enhancements': function (browser) {
        //check on Submission List on the homepage
        let user_management_title = "//h1";
        let name_title = "(//tr[@role='row']/th)[1]";
        let email_title = "(//tr[@role='row']/th)[2]";
        let faq_link = "(//a[@class='ds-u-text-decoration--none'])[2]";
        let home_link = "(//a[@class='ds-u-text-decoration--none'])[1]";
        let my_account_button = "//button[@id='myAccountLink']";
        let management_profile_link = "//a[@id='manageAccountLink']";
        

        
        browser.useXpath().expect.element(name_title).to.be.visible;
        browser.useXpath().expect.element(email_title).to.be.visible;
        browser.useXpath().expect.element(faq_link).to.be.visible;
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
        let full_name = "//*[@id='root']/div/div[2]/div[2]/div[1]/div[1]/div[1]/div/div";
        let role_title  = "(//h3)[2]";
        let role = "//*[@id='root']/div/div[2]/div[2]/div[1]/div[1]/div[2]/div/div";
        let email_title_two = "(//h3)[3]";
        let email = "//*[@id='root']/div/div[2]/div[2]/div[1]/div[1]/div[3]/div/div";
        let phone_number_title = "//span";
        let phone_number_add = "//button[@id='addButton']";
        let text_at_bottom = "//div[@id='profileDisclaimer']";
        
        browser.useXpath().expect.element(user_profile_title).to.be.visible;
        browser.useXpath().expect.element(profile_information_title).to.be.visible;
        browser.useXpath().expect.element(full_name_title).to.be.visible;
        browser.useXpath().expect.element(full_name).to.be.visible;
        browser.useXpath().expect.element(role_title).to.be.visible;
        browser.useXpath().expect.element(role).to.be.visible;
        browser.useXpath().expect.element(email_title_two).to.be.visible;
        browser.useXpath().expect.element(email).to.be.visible;
        browser.useXpath().expect.element(phone_number_title).to.be.visible;
        browser.useXpath().expect.element(phone_number_add).to.be.visible;
        browser.useXpath().expect.element(text_at_bottom).to.be.visible;
        browser.useCss();

        
    },
}