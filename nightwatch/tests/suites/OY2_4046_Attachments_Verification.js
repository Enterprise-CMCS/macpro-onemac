// Updated by: Guli 
// Date      : 03/19/2021

const login = require('../cases/OY2-1494_Test_SPA_Login');

module.exports = {
    "@tags": ["fileUploadVisbilityTest", "smoke", "regression"],

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

    'Verify that State User can see the optional attachments on SPA form page': function (browser) {
        // Go to [Submit new SPA] page 
        browser.click('button#spaSubmitBtn');

        // Verify for the optional attachment visiblity
        let counts = 1;
        locator1 = "(//td/div)";
        browser.elements('xpath', locator1, function (elements) {
            elements.value.forEach(function (element) {
                let xpaths = locator1.concat('[' + counts + ']');
                browser.useXpath().expect.element(xpaths).to.be.visible;
                counts++;
            })
            browser.useCss();
        });
        browser.back();  // go back to previous page
    },

    'Verify that State User can see the optional attachments on Respond to SPA RAI page': function (browser) {
        // Go to [Respond to SPA RAI] page 
        browser.click('button#spaRaiBtn');

        // Verify for the optional attachment visiblity
        let counts = 1;
        locator1 = "(//td/div)";
        browser.elements('xpath', locator1, function (elements) {
            elements.value.forEach(function (element) {
                let xpaths = locator1.concat('[' + counts + ']');
                browser.useXpath().expect.element(xpaths).to.be.visible;
                counts++;
            })
            browser.useCss();
        });
        browser.back();  // go back to previous page
    },


    'Verify that State User can see the optional attachments on Submit new Waiver page': function (browser) {
        // Go to [Submit new Waiver] page 
        browser.click('button#waiverBtn');

        // Verify for the optional attachment visiblity
        let counts = 1;
        locator1 = "(//td/div)";
        browser.elements('xpath', locator1, function (elements) {
            elements.value.forEach(function (element) {
                let xpaths = locator1.concat('[' + counts + ']');
                browser.useXpath().expect.element(xpaths).to.be.visible;
                counts++;
            })
            browser.useCss();
        });
        browser.back();  // go back to previous page
    },

    'Verify that State User can see the optional attachments on Respond to 1915(c) Waiver RAI page': function (browser) {
        // Go to [Respond to 1915(c) Waiver RAI] page 
        browser.click('button#waiverRaiBtn');

        // Verify for the optional attachment visiblity
        let counts = 1;
        locator1 = "(//td/div)";
        browser.elements('xpath', locator1, function (elements) {
            elements.value.forEach(function (element) {
                let xpaths = locator1.concat('[' + counts + ']');
                browser.useXpath().expect.element(xpaths).to.be.visible;
                counts++;
            })
            browser.useCss();
        });
        browser.back();  // go back to previous page
    },

    'Verify that State User can see the optional attachments on Request Temporary Extension form page': function (browser) {
        // Go to [Respond to 1915(c) Waiver RAI] page 
        browser.click('button#waiverExtBtn');

        // Verify for the optional attachment visiblity
        let counts = 1;
        locator1 = "(//td/div)";
        browser.elements('xpath', locator1, function (elements) {
            elements.value.forEach(function (element) {
                let xpaths = locator1.concat('[' + counts + ']');
                browser.useXpath().expect.element(xpaths).to.be.visible;
                counts++;
            })
            browser.useCss();
        });
        browser.back();  // go back to previous page
    }
}