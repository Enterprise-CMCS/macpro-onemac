// Updated by: Guli 
// Date      : 03/19/2021

const login = require('../suites/OY2_9999_Login');
module.exports = {

    "@tags": ["smoke", "regression-soon"],

    before: function (browser) {
        login.beforeEach(browser);
        login['Login with state submitter user'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);
    },
    'Verify that there are no state abbribiation option': function (browser) {
        //browser.click('#spaSubmitBtn');
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.useCss();
        //browser.click("[value='Submit']");
        let state_territory = "//*[contains(text(), 'State/Territory')]";
        browser.useXpath().expect.element(state_territory).to.be.not.present;
        browser.useCss();

        // Enter illegal State abbribiation 
        let abbr = 'QA';
        browser.setValue('input#transmittalNumber', abbr);
        let expectedErroMsg = "You can only submit for a state you have access to. If you need to add another state, visit your user profile to request access.";
        browser.verify.containsText('div#transmittalNumberStatusMsg', expectedErroMsg);
    }
}
