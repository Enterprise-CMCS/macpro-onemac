const login = require('../suites/OY2_9999_Login');

module.exports = {
    "@tags": ["smoke", "regression-soon"],

    before: function (browser) {
        login.beforeEach(browser);
        login['Login with cms_approvers'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);
    },



    'CMS Approver user can see the text, profile information and status card': function (browser) {
        let my_account_button = 'button#myAccountLink';
        let manage_account_link = 'a#manageAccountLink';
        

        // Click on button My Account and get access to account management 
        browser.useCss().click(my_account_button); 
        browser.useCss().click(manage_account_link); 
        browser.pause(2000);
        //browser.expect.element(".ds-l-col--6>h3").to.be.present;
        let text_cms_approver = "//*[@id='profileDisclaimer']";
        let profile_information = "//*[@id='profileInfoHeader']";
        let full_name = "(//h3)[1]";
        let onemac_cms_user = "(//div[@class='ds-c-review__body'])[1]";
        let email = "(//h3)[3]";
        let email_address = "(//div[@class='ds-c-review__body'])[3]";
        let status = "//*[@id='accessHeader']";
        let access_granted = "//dd/em";
        let cms_system_admins = "//dd/p";
        let cmsystem_admin_nameOne = "(//dd/p/a)[1]";
        let cmsystem_admin_nameTwo = "(//dd/p/a)[2]";

        browser.useXpath().expect.element(text_cms_approver).to.be.visible;
        browser.useXpath().expect.element(profile_information).to.be.visible;
        browser.useXpath().expect.element(full_name).to.be.visible;
        browser.useXpath().expect.element(onemac_cms_user).to.be.visible;
        browser.useXpath().expect.element(email).to.be.visible;
        browser.useXpath().expect.element(email_address).to.be.visible;
        browser.useXpath().expect.element(status).to.be.visible;
        browser.useXpath().expect.element(access_granted).to.be.visible;
        browser.useXpath().expect.element(cms_system_admins).to.be.visible;
        browser.useXpath().expect.element(cmsystem_admin_nameOne).to.be.visible;
        browser.useXpath().expect.element(cmsystem_admin_nameTwo).to.be.visible;
        browser.useCss();
    },
}