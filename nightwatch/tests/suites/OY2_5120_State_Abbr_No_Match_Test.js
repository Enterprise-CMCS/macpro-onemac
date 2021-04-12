// Updated by: Guli 
// Date      : 03/19/2021

const login = require('../cases/OY2-1494_Test_SPA_Login');

module.exports = {

    "@tags": ["abbrVerify", "smoke", "regression"],

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

    'Verify that there are no state abbribiation option': function (browser) {
        browser.click('#spaSubmitBtn');
        browser.click("[value='Submit']");
        let state_territory = "//*[contains(text(), 'State/Territory')]";
        browser.useXpath().expect.element(state_territory).to.be.not.present;
        browser.useCss();

        // Enter illegal State abbribiation 
        let abbr = 'QA';
        browser.setValue('input#transmittalNumber', abbr);
        let expectedErroMsg = "The SPA ID must contain valid Territory/State Code";
        browser.verify.containsText('div#transmittalNumberStatusMsg', expectedErroMsg);
    }
}
