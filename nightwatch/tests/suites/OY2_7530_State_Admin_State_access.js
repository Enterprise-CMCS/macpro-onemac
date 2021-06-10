const login = require('../suites/OY2_9999_Login');

module.exports = {
    "@tags": ["smoke", "regression-soon"],

    before: function (browser) {
        login.beforeEach(browser);
        login['Login with state admin user'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);

    },


    'Admin user can see the list all names with a link to contact their email': function (browser) {
        let name = '(//tr/th)[1]';
        let email = '(//tr/th)[2]';
        let status = '(//tr/th)[3]';
        let personal_actions = '(//tr/th)[4]';
        let state_user_for_va_mi = '(//tr/td)[5]';
        let first_email ='(//tr/td)[2]';
        let second_email ='(//tr/td)[6]';
        let third_email ='(//tr/td)[10]';
        let fourth_email ='(//tr/td)[14]';
        //check on name and email for four listed user
        browser.useXpath().expect.element(name).to.be.visible;
        browser.useXpath().expect.element(email).to.be.visible;
        browser.useXpath().expect.element(status).to.be.visible;
        browser.useXpath().expect.element(personal_actions).to.be.visible;
        browser.useXpath().expect.element(state_user_for_va_mi).to.be.visible;
        browser.useXpath().expect.element(first_email).to.be.visible;
        browser.useXpath().expect.element(second_email).to.be.visible;
        browser.useXpath().expect.element(third_email).to.be.visible;
        browser.useXpath().expect.element(fourth_email).to.be.visible;
    },


    'User can see their profile page information Full Name and Email': function (browser) {
        let my_account_button = 'button#myAccountLink';
        let manage_account_link = 'a#manageAccountLink';
        //element on account management page
        let profile_information = '(//div/h3)[1]';
        let full_name = '(//div/h3)[2]';
        let email = '(//div/h3)[3]';
        let state_access_management = '(//div/h3)[4]';
        let one_mac_approver_name = '(//div/div[@class="ds-c-review__body"])[1]';
        let one_mac_approver_email = '(//div/div[@class="ds-c-review__body"])[2]';
        let virginia = '//div/dt';
        let access_granted = '//div/dd/em';
        // Click on button My Account and get access to account management 
        browser.useCss().click(my_account_button); 
        browser.useCss().click(manage_account_link); 
        browser.pause(2000);
        browser.useXpath().expect.element(profile_information).to.be.visible;
        browser.useXpath().expect.element(full_name).to.be.visible;
        browser.useXpath().expect.element(email).to.be.visible;
        browser.useXpath().expect.element(state_access_management).to.be.visible;
        browser.useXpath().expect.element(one_mac_approver_email).to.be.visible;
        browser.useXpath().expect.element(one_mac_approver_name).to.be.visible;
        browser.useXpath().expect.element(virginia).to.be.visible;
        browser.useXpath().expect.element(access_granted).to.be.visible;
        browser.useCss();
    },
}