const login = require('../cases/OY2-1494_Test_SPA_Login');

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
        const testData = {
            username: process.env.TEST_STATE_USERS,
            password: process.env.TEST_STATE_USER_PASSWORD,
          }

          login.before(browser);
          //click on button
          //browser.useCss().click("#loginBtn");

        let one_mac_logo = '(//img)[2]';
        let us_official_banner = '//div/div[@class="usa-bar"]';
        let madicaid_gov_logo = "(//div/img)[6]";
        let hhs_logo = "(//div/img)[7]";
        let text_next_hhs_logo = "//div/div[@class='footer-fed-gov-text']";
        let email_footer = "(//div[@class='footer-bottom-container']/div)[1]";
        let address_footer = "(//div[@class='footer-bottom-container']/div)[2]";
        //check on header and footer before login 
        browser.useXpath().expect.element(one_mac_logo).to.be.visible;
        browser.useXpath().expect.element(us_official_banner).to.be.visible;
        browser.useXpath().assert.containsText(us_official_banner, "An official website of the United States government");
        browser.useXpath().expect.element(madicaid_gov_logo).to.be.visible;
        browser.useXpath().expect.element(hhs_logo).to.be.visible;
        browser.useXpath().expect.element(text_next_hhs_logo).to.be.visible;
        browser.useXpath().expect.element(email_footer).to.be.visible;
        browser.useXpath().expect.element(address_footer).to.be.visible;
        browser.useXpath().assert.containsText(email_footer, "Email MACPro_HelpDesk@cms.hhs.gov for help or feedback.");
        browser.useXpath().assert.containsText(address_footer, "7500 Security Boulevard Baltimore, MD 21244");
        browser.useCss();
        
        login["Login to SPA and Waiver Dashboard via Okta"](browser,testData);
    },

    after: function (browser) {
        login["Verify logout from SPA and Wavier Dashboard as Regular User"](browser);
        console.info("Stopping test executions...")
        console.info('Closing down the browser instance...');
        browser.end();
    },

    'state user verify header after login': function (browser) {
        let one_mac_logo = '(//img)[2]';
        let us_official_banner = '//div/div[@class="usa-bar"]';

        browser.useXpath().expect.element(one_mac_logo).to.be.visible;
        browser.useXpath().expect.element(us_official_banner).to.be.visible;
        browser.useXpath().assert.containsText(us_official_banner, "An official website of the United States government");
    },

    'state user verify footer after login': function (browser) {
        let madicaid_gov_logo = "(//div/img)[6]";
        let jscode ="window.scrollTo(0, document.body.scrollHeight)";
        JavascriptExecutor.browser.useCss().executeScript(jscode);
        let hhs_logo = "(//div/img)[7]";
        let text_next_hhs_logo = "//div/div[@class='footer-fed-gov-text']";
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