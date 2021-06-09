// Updated by: Guli 
// Date      : 03/19/2021

const login = require('../suites/OY2_9999_Login');

module.exports = {
    "@tags": ["smoke", "regression-soon"],

    before: function (browser) {
        login.beforeEach(browser);
        login['Login with state user'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);
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
