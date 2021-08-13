/*
const login = require('./OY2_9999_Login');

let spaCHIPId;
module.exports = {
    "@tags": ["smoke", "regression-soon"],

    before: function (browser) {
        login.beforeEach(browser);
        login['Login with state submitter user'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);
    },
    

    'State Submitter user see error message when waiver number not exist in 1915c Appendix forms': function (browser) {
        // Go to Submit New CHIP SPA page
        //browser.useCss().click("button#chipSpaBtn");
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[4]");
        // Verify that Submit New CHIP SPA page is displayed 
        browser.useCss().expect.element('form > h3:nth-of-type(1)').to.be.visible;

        // Enter Submit SPA ID 
        // Enter Waiver number
        let YY = Math.floor(Math.random() * Math.floor(80)) + 10;
        let NNNN = Math.floor(Math.random() * Math.floor(7999)) + 1000;
        //let xxxx = Math.floor(Math.random() * Math.floor(7999)) + 1000;
        // SS-YY-NNNN
        spaCHIPId = 'MD.' + NNNN + '.R' + YY + '.' + YY;
        // input the SPA ID number 
        browser.useCss().setValue("input#transmittalNumber", spaCHIPId);
        //check if the error message shows up
        let error_message = "//div[@id='transmittalNumberStatusMsg']"; 
        browser.useXpath().expect.element(error_message).to.be.visible;
        browser.useXpath().assert.containsText(error_message, "Waiver Number not found. Please ensure you have the correct Waiver Number before submitting. Contact the MACPro Help Desk (code: OMP002) if you need support.");
        browser.useCss();
    },
}
*/