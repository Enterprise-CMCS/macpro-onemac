// Updated by: Guli 
// Date      : 03/19/2021
const login = require('../cases/OY2-1494_Test_SPA_Login');

module.exports = {

    "@tags": ["FAQ", "smoke", "regression-soon"],

    // Opens the browser, goes to the test site
    before: function (browser) {
        console.log('Setting up the browser instance...');
        console.log('Opening the browser...')
        console.log('Maximizing the browser window size...');
        browser.windowMaximize().url(browser.launch_url);
        browser.waitForElementPresent('body');
    },

    // After all the test case executions, clear out the browser
    after: function (browser) {
        login["Verify logout from SPA and Wavier Dashboard as Regular User"](browser);
        console.log("Stopping test executions...")
        console.log('Closing down the browser instance...');
        browser.end();
    },

    'User can go to the FAQ without logging into the application': function (browser) {
        let fqaLink = "//a[text()='FAQ']";
        browser.useXpath().click(fqaLink).pause(500);
        let pageBanner = 'div#title_bar > h1';
        let expectedBannerText = 'SPA and Waiver Frequently Asked Questions';
        browser.useCss().expect.element(pageBanner).to.be.visible;
        browser.verify.containsText(pageBanner, expectedBannerText).pause(500);
        browser.back();  // go back to previous page
    },

    'User logs into Medicaid as Regular user': function(browser) {
        login["Login to Medicaid as Regular User"](browser);
    },

    'User can go to the FAQ with logging into the application': function (browser) {
        let fqaLink = "//a[text()='FAQ']";
        browser.useXpath().click(fqaLink).pause(500);
        let pageBanner = 'div#title_bar > h1';
        let expectedBannerText = 'SPA and Waiver Frequently Asked Questions';
        browser.useCss().expect.element(pageBanner).to.be.visible;
        browser.verify.containsText(pageBanner, expectedBannerText);
        browser.back();  // go back to previous page
    },

    'For each section under SPAs, there is a link to open the corresponding question in the FAQ': function (browser) {
        // Submit a New SPA
        let newSPALink = 'button#spaSubmitBtn';
        browser.click(newSPALink);
        browser.click('.form-card a');
        let fqaHeader = 'h4#spa-id-format';
        browser.useCss().expect.element(fqaHeader).to.be.visible;
        let expectedText = 'What format is used to enter a SPA ID?';
        browser.verify.containsText(fqaHeader, expectedText);
        browser.back();  // go back to previous page
        browser.back();  // go back to previous page

        // Respond to SPA RAI
        let respondToSAPRAI = 'button#spaRaiBtn';
        browser.click(respondToSAPRAI);
        browser.click('.form-card a');
        browser.useCss().expect.element(fqaHeader).to.be.visible;
        browser.verify.containsText(fqaHeader, expectedText);
        browser.back();  // go back to previous page
        browser.back();  // go back to previous page
    },

    'For each section under Waivers, there is a link to open the corresponding question in the FAQ': function (browser) {
        // Submit a new Waiver 
        browser.click('button#waiverBtn');
        browser.click('.form-card a');
        let fqaHeader = 'h4#waiver-id-format';
        browser.useCss().expect.element(fqaHeader).to.be.visible;
        let expectedText = 'What format is used to enter a 1915(b) waiver number?';
        browser.verify.containsText(fqaHeader, expectedText);
        browser.back();
        browser.back();

        // Respond to 1915(b) Waiver RAI
        browser.click('button#waiverRaiBtn');
        browser.click('.form-card a');
        browser.useCss().expect.element(fqaHeader).to.be.visible;
        browser.verify.containsText(fqaHeader, expectedText);
        browser.back();
        browser.back();

        // Request Waiver Temporary Extension
        browser.click('button#waiverExtBtn');
        browser.click('.form-card a');
        browser.useCss().expect.element(fqaHeader).to.be.visible;
        browser.verify.containsText(fqaHeader, expectedText);
    },

    'Clicking the link on the FAQ page will result in a new detailed page': function (browser) {
        let linkInFAQ = '.form-card [target]';
        browser.click(linkInFAQ);
        // Switch to new tab
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[1];
            browser.switchWindow(handle);
        });
        // Verify the new window 
        browser.expect.element('h2').to.be.visible;
        browser.verify.containsText('h2', 'Submittal of State plans and plan amendments');
        browser.closeWindow(); // Close tab
        // Switch to main window
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[0];
            browser.switchWindow(handle);
        });
    }
}
