const login = require('../suites/OY2_9999_Login');

module.exports = {
    "@tags": ["profileOne", "smoke", "regression-soon"],

    before: function (browser) {
        login.beforeEach(browser);
        login['Login with state submitter user'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);

    },

    'User can see their profile page information Full Name and Email': function (browser) {
        let my_account_button = 'button#myAccountLink';
        let manage_account_link = 'a#manageAccountLink';

        // Click on button My Account and get access to account management 
        browser.click(my_account_button); 
        browser.click(manage_account_link); 
        browser.pause(2000);
        //browser.expect.element(".ds-l-col--6>h3").to.be.present;
        let profile_information = "(//div[@class='ds-l-col--6']/h3)[1]";
        let full_name = "(//h3)[2]";
        let STATE_SUBMITTER_name ="(//div[@class='ds-c-review__body'])[1]";
        let email = "(//h3)[3]";
        let email_address = "(//div[@class='ds-c-review__body'])[2]";
        let phone_number = "(//h3)[4]";
        browser.useXpath().expect.element(profile_information).to.be.visible;
        browser.useXpath().expect.element(full_name).to.be.visible;
        browser.useXpath().expect.element(STATE_SUBMITTER_name).to.be.visible;
        browser.useXpath().expect.element(email).to.be.visible;
        browser.useXpath().expect.element(email_address).to.be.visible;
        browser.useXpath().expect.element(phone_number).to.be.visible;
        browser.useCss();
    },
}