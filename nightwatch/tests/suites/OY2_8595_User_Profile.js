const login = require('../cases/OY2-1494_Test_SPA_Login');

module.exports = {
    "@tags": ["profileOne", "smoke", "regression-soon"],

    before: function (browser) {
        const testData = {
            username: process.env.TEST_STATE_USERS,
            password: process.env.TEST_STATE_USER_PASSWORD,
          }
          login.before(browser);
          //click on button
          //browser.useCss().click("#loginBtn");
        login["Login to SPA and Waiver Dashboard via Okta"](browser,testData);
    },

    after: function (browser) {
        login["Verify logout from SPA and Wavier Dashboard as Regular User"](browser);
        console.info("Stopping test executions...")
        console.info('Closing down the browser instance...');
        browser.end();
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
        let state_user_name ="//div[text()='OneMACState STATEUser']";
        let email = "(//h3)[3]";
        let email_address = "//div[text()='nkrishna@collabralink.com']";
        browser.useXpath().expect.element(profile_information).to.be.visible;
        browser.useXpath().expect.element(full_name).to.be.visible;
        browser.useXpath().expect.element(state_user_name).to.be.visible;
        browser.useXpath().expect.element(email).to.be.visible;
        browser.useXpath().expect.element(email_address).to.be.visible;
        browser.useCss();
    },
}