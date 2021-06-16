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


    'Admin user can see the list all names with a link to contact their email': function (browser) {
        let name = '(//tr/th)[1]';
        let email = '(//tr/th)[2]';
        let state = '(//tr/th)[3]'
        let status = '(//tr/th)[4]';
        let personal_actions = '(//tr/th)[5]';
        let state_user_name = '(//tr/td)[11]';
        let first_email ='(//tr/td)[2]';
        let second_email ='(//tr/td)[7]';
        let third_email ='(//tr/td)[12]';
        let fourth_email ='(//tr/td)[17]';
        let fifth_email ='(//tr/td)[22]';
        let sixth_email ='(//tr/td)[27]';
        let seventh_email ='(//tr/td)[32]';
        let eight_email ='(//tr/td)[37]';
        //check on name and email for four listed user
        browser.useXpath().expect.element(name).to.be.visible;
        browser.useXpath().expect.element(email).to.be.visible;
        browser.useXpath().expect.element(state).to.be.visible;
        browser.useXpath().expect.element(status).to.be.visible;
        browser.useXpath().expect.element(personal_actions).to.be.visible;
        browser.useXpath().expect.element(state_user_name).to.be.visible;
        browser.useXpath().expect.element(first_email).to.be.visible;
        browser.useXpath().expect.element(second_email).to.be.visible;
        browser.useXpath().expect.element(third_email).to.be.visible;
        browser.useXpath().expect.element(fourth_email).to.be.visible;
        browser.useXpath().expect.element(fifth_email).to.be.visible;
        browser.useXpath().expect.element(sixth_email).to.be.visible;
        browser.useXpath().expect.element(seventh_email).to.be.visible;
        browser.useXpath().expect.element(eight_email).to.be.visible;
    },


    'User can see their profile page information Full Name and Email': function (browser) {
        let my_account_button = 'button#myAccountLink';
        let manage_account_link = 'a#manageAccountLink';
        //element on account management page
        let profile_information = '(//div/h3)[1]';
        let full_name = '(//div/h3)[2]';
        let email = '(//div/h3)[3]';
        let status = '(//div/h3)[4]';
        let one_cms_name = '(//div/div[@class="ds-c-review__body"])[1]';
        let one_cms_email = '(//div/div[@class="ds-c-review__body"])[2]';
        let access_granted = '//div/dd/em';
        // Click on button My Account and get access to account management 
        browser.useCss().click(my_account_button); 
        browser.useCss().click(manage_account_link); 
        browser.pause(2000);
        browser.useXpath().expect.element(profile_information).to.be.visible;
        browser.useXpath().expect.element(full_name).to.be.visible;
        browser.useXpath().expect.element(email).to.be.visible;
        browser.useXpath().expect.element(status).to.be.visible;
        browser.useXpath().expect.element(one_cms_email).to.be.visible;
        browser.useXpath().expect.element(one_cms_name).to.be.visible;
        browser.useXpath().expect.element(access_granted).to.be.visible;
        browser.useCss();
    },
}