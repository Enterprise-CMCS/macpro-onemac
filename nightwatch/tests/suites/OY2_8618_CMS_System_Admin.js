const login = require('../suites/OY2_9999_Login');

module.exports = {
    "@tags": ["smoke", "regression-soon"],

    before: function (browser) {
        login.beforeEach(browser);
        login['Login with cms_system_admin'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);
    },


    'CMS System Admin user can see the text, profile information': function (browser) {
        let my_account_button = 'button#myAccountLink';
        let manage_account_link = 'a#manageAccountLink';
        let user_management_title = "//h1";
        let user_management_link = "//a[@id='userManagementLink']";
        browser.useXpath().expect.element(user_management_link).to.be.visible;
        browser.useXpath().expect.element(user_management_title).to.be.visible;

        // Click on button My Account and get access to account management 
        browser.useCss().click(my_account_button); 
        browser.useCss().click(manage_account_link); 
        browser.pause(2000);
        //browser.expect.element(".ds-l-col--6>h3").to.be.present;
        let text_cms_approver = "//div[@class='subheader-message']";
        let profile_information = "//div[@class='ds-l-col--6']/h3";
        let full_name = "(//h3)[2]";
        let onemac_cms_user = "(//div[@class='ds-c-review__body'])[1]";
        let email = "(//h3)[3]";
        let email_address = "(//div[@class='ds-c-review__body'])[2]";


        browser.useXpath().expect.element(text_cms_approver).to.be.visible;
        browser.useXpath().assert.containsText(text_cms_approver, "MACPro_HelpDesk@cms.hhs.gov");
        browser.useXpath().assert.containsText(text_cms_approver,"(833) 228-2540");
        browser.useXpath().assert.containsText(text_cms_approver,"Below is the account information for your role as a CMS System Admin.");
        browser.useXpath().expect.element(profile_information).to.be.visible;
        browser.useXpath().expect.element(full_name).to.be.visible;
        browser.useXpath().expect.element(onemac_cms_user).to.be.visible;
        browser.useXpath().expect.element(email).to.be.visible;
        browser.useXpath().expect.element(email_address).to.be.visible;
        browser.useCss();
    },
}