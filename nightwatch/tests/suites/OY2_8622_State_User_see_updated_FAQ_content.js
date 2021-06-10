const login = require('../cases/OY2-1494_Test_SPA_Login');

let spaCHIPId;
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
        login["Login to SPA and Waiver Dashboard via development login"](browser,testData);
    },

    after: function (browser) {
        login["Verify logout from SPA and Wavier Dashboard as Regular User"](browser);
        console.info("Stopping test executions...")
        console.info('Closing down the browser instance...');
        browser.end();
    },
    

    'User can go to the FAQ with logging into the application': function (browser) {
        let fqaLink = "//a[text()='FAQ']";
        browser.useXpath().click(fqaLink).pause(500);
        //Switch to new tab
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[1];
            browser.switchWindow(handle);
        });
        // Verify the new window 
        let pageBanner = '//h1';
        let expectedBannerText = 'Frequently Asked Questions';
        browser.useXpath().expect.element(pageBanner).to.be.visible;
        browser.useXpath().verify.containsText(pageBanner, expectedBannerText);
        
        //verify General section
        let general_link = "(//h4)[1]";
        browser.useXpath().expect.element(general_link).to.be.visible;
        browser.click(general_link);
        browser.pause(100);
        let general_link_answer = "(//div[@class='Collapsible__contentInner'])[1]";
        browser.useXpath().expect.element(general_link_answer).to.be.visible;

        //verify State Plan Amendments(SPAs)
        let spas = "(//h3)[1]";
        let spas_link_one = "(//h4)[2]";
        let spas_link_two = "(//h4)[3]";
        browser.useXpath().expect.element(spas).to.be.visible;
        browser.useXpath().expect.element(spas_link_one).to.be.visible;
        browser.useXpath().expect.element(spas_link_two).to.be.visible;
        browser.click(spas_link_one);
        browser.pause(100);
        let link_one_section = "(//div[@class='Collapsible__contentInner'])[2]";
        let ss = "(//ul/li)[1]";
        let yy = "(//ul/li)[2]";
        let four_numeric_digits = "(//ul/li)[3]";
        let optional_modifier = "(//ul/li)[4]";
        browser.useXpath().expect.element(link_one_section).to.be.visible;
        browser.useXpath().expect.element(ss).to.be.visible;
        browser.useXpath().expect.element(yy).to.be.visible;
        browser.useXpath().expect.element(four_numeric_digits).to.be.visible;
        browser.useXpath().expect.element(optional_modifier).to.be.visible;
        browser.click(spas_link_two);
        browser.useXpath().expect.element("(//tbody)[1]").to.be.visible;
        browser.useXpath().expect.element("(//tbody)[2]").to.be.visible;
        browser.useXpath().expect.element("(//tbody)[3]").to.be.visible;
        browser.useXpath().expect.element("(//tbody)[4]").to.be.visible;

        //verify waivers section
        let waivers = "(//h3)[2]";
        let waivers_link_first = "(//h4[@class='faq-collapsible-trigger'])[4]";
        let waivers_link_second = "(//h4)[9]";
        let waivers_link_third = "(//h4)[10]";
        let waivers_link_fourth = "(//h4)[11]";
        let waivers_link_fifth = "(//h4)[12]";
        browser.useXpath().moveToElement(waivers_link_fifth, 10, 10).waitForElementVisible(waivers_link_fifth, 500);
        let confirmation_email_question = "(//h4)[13]";
        let state_submission_question = "(//h4)[14]";
        browser.useXpath().expect.element(waivers).to.be.visible;
        browser.pause(2000);
        browser.useXpath().expect.element(waivers_link_first).to.be.visible;
        browser.useXpath().expect.element(waivers_link_second).to.be.visible;
        browser.useXpath().expect.element(waivers_link_third).to.be.visible;
        browser.useXpath().expect.element(waivers_link_fourth).to.be.visible;
        browser.useXpath().expect.element(waivers_link_fifth).to.be.visible;
        browser.useXpath().expect.element(confirmation_email_question).to.be.visible;
        browser.useXpath().expect.element(state_submission_question).to.be.visible;
        browser.useXpath().click(waivers_link_first);
        let waiver_link_first_sentence1 = "(//div[@class='Collapsible__contentInner'])[4]/p";
        let waiver_ss_first = "((//div[@class='Collapsible__contentInner'])[4]/ul/li)[1]";
        let waiver_base_num = "((//div[@class='Collapsible__contentInner'])[4]/ul/li)[2]";
        let renewal_num = "((//div[@class='Collapsible__contentInner'])[4]/ul/li)[3]";
        let amendment_num = "((//div[@class='Collapsible__contentInner'])[4]/ul/li)[4]";
        let waiver_link_first_sentence2 = "((//div[@class='Collapsible__contentInner'])[4]/p)[2]";
        let waiver_link_first_sentence3 = "((//div[@class='Collapsible__contentInner'])[4]/p)[3]";
        browser.useXpath().expect.element(waiver_link_first_sentence1).to.be.visible;
        browser.useXpath().expect.element(waiver_ss_first).to.be.visible;
        browser.useXpath().expect.element(waiver_base_num).to.be.visible;
        browser.useXpath().expect.element(renewal_num).to.be.visible;
        browser.useXpath().expect.element(amendment_num).to.be.visible;
        browser.useXpath().expect.element(waiver_link_first_sentence2).to.be.visible;
        browser.useXpath().expect.element(waiver_link_first_sentence3).to.be.visible;
        









        browser.closeWindow(); // Close tab
        // Switch to main window
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[0];
            browser.switchWindow(handle);
        });
        browser.useCss();
    },
}