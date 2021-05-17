const login = require('../cases/OY2-1494_Test_SPA_Login');

module.exports = {
    "@tags": ["profile", "smoke", "regression-soon"],

    before: function (browser) {
        console.log('Setting up the browser instance...');
        console.log('Opening the browser...')
        console.log('Maximizing the browser window size...');
        browser.windowMaximize().url(browser.launch_url);
        browser.waitForElementPresent('body');
        login["Login to Medicaid as Regular User"](browser);
    },

    after: function (browser) {
        login["Verify logout from SPA and Wavier Dashboard as Regular User"](browser);
        console.log("Stopping test executions...")
        console.log('Closing down the browser instance...');
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
        let expected = "Profile Information";
        let full_name = "(//h3)[2]";
        let name = "//div//div[text()='MOSTATEEDIT CONVER']";
        let email = "(//h3)[3]";
        let email_address = "//div//div[text()='Macproemailnotification@gmail.com']";
        browser.verify.containsText('.ds-l-col--6>h3', expected);
        browser.useXpath().expect.element("(//h3)[2]").to.be.visible;
        browser.useXpath().expect.element(name).to.be.visible;
        browser.useXpath().expect.element(email).to.be.visible;
        browser.useXpath().expect.element(email_address).to.be.visible;
    },
}