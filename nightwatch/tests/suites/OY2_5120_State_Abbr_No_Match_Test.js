// Updated by: Guli 
// Date      : 03/19/2021

const login = require('../cases/OY2-1494_Test_SPA_Login');

module.exports = {

    "@tags": ["smoke", "regression-soon"],

    before: function (browser) {
        login.beforeEach(browser);
    },

    after: function (browser) {
        login.afterEach(browser);
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
