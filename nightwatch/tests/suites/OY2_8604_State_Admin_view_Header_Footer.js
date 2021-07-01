const login = require('../suites/OY2_9999_Login');

module.exports = {
    "@tags": ["smoke", "regression-soon"],

    // 'verify header before login': function (browser) {
    //     let one_mac_logo = '(//img)[2]';
    //     let us_official_banner = '//div/div[@class="usa-bar"]';

    //     browser.useXpath().expect.element(one_mac_logo).to.be.visible;
    //     browser.useXpath().expect.element(us_official_banner).to.be.visible;
    //     browser.useXpath().assert.containsText(us_official_banner, "An official website of the United States government");
    // },


    before: function (browser) {
        login.beforeEach(browser);
        login['Login with state admin user'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);

    },

    'state admin user verify header after login': function (browser) {
        let one_mac_logo = '(//img)[2]';
        let us_official_banner = '//div/div[@class="usa-bar"]';

        browser.useXpath().expect.element(one_mac_logo).to.be.visible;
        browser.useXpath().expect.element(us_official_banner).to.be.visible;
        browser.useXpath().assert.containsText(us_official_banner, "An official website of the United States government");
    },

    'state admin user verify footer after login': function (browser) {
        let my_account_button = 'button#myAccountLink';
        let manage_account_link = 'a#manageAccountLink';

        // Click on button My Account and get access to account management 
        browser.useCss().click(my_account_button); 
        browser.useCss().click(manage_account_link); 
        browser.pause(2000);

        let madicaid_gov_logo = "(//section/div)[1]";
        let hhs_logo = "(//section/div/div)[1]";
        let text_next_hhs_logo = "(//section/div/div)[2]";
        let email_footer = "(//div[@class='footer-bottom-container']/div)[1]";
        let address_footer = "(//div[@class='footer-bottom-container']/div)[2]";

        

        browser.useXpath().expect.element(madicaid_gov_logo).to.be.visible;
        browser.useXpath().expect.element(hhs_logo).to.be.visible;
        browser.useXpath().expect.element(text_next_hhs_logo).to.be.visible;
        browser.useXpath().expect.element(email_footer).to.be.visible;
        browser.useXpath().expect.element(address_footer).to.be.visible;
        browser.useXpath().assert.containsText(email_footer, "Email MACPro_HelpDesk@cms.hhs.gov for help or feedback.");
        browser.useXpath().assert.containsText(address_footer, "7500 Security Boulevard Baltimore, MD 21244");
        browser.useCss();
    },
}