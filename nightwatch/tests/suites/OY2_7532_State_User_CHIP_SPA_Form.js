const login = require('../cases/OY2-1494_Test_SPA_Login');

module.exports = {
    "@tags": ["smoke", "regression-soon"],

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

    'State user check the Submit New CHIP SPA form': function (browser) {
        let submit_new_chip_spa_button = "(//button[@class='ds-c-button ds-c-button--transparent'])[3]";
        let manage_account_link = 'a#manageAccountLink';

        // Click on button My Account and get access to account management 
        browser.click(my_account_button); 
        browser.click(manage_account_link); 
        browser.pause(2000);
        //browser.expect.element(".ds-l-col--6>h3").to.be.present;
        let expected = "Profile Information";
        let full_name = "(//h3)[2]";
        let email = "(//h3)[3]";
        let email_address = "//div[text()='zzsespa03@gmail.com']";
        browser.useXpath().expect.element("(//div[@class='ds-l-col--6']/h3)[1]").to.be.visible;
        browser.useXpath().expect.element("(//h3)[2]").to.be.visible;
        browser.useXpath().expect.element("//div[text()='OneMacState STATEUSER']").to.be.visible;
        browser.useXpath().expect.element(email).to.be.visible;
        browser.useXpath().expect.element(email_address).to.be.visible;
        browser.useCss();
    },
}