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

    'Verify that State Submitter User can enter Waiver number in RAI form with correct format': function (browser) {
       //browser.useCss().click("button#waiverRaiBtn").pause(500);
       browser.useXpath().click("//a[@id='new-submission-button']");
       browser.pause(500);
       browser.useXpath().click("(//h4)[2]");
       browser.pause(500);
       browser.useXpath().click("(//h4)[2]");
       //   MD.23232
       browser.useCss().setValue('input#transmittalNumber', "MD.23232233").pause(1000);
       browser.pause(2000)
       browser.clearValue('input#transmittalNumber').pause(500);
       browser.useCss().setValue('input#transmittalNumber', "MD.5555").pause(500);
       browser.expect.element('div#transmittalNumberStatusMsgr').to.be.not.present;
       browser.back();
       browser.useCss();
    }
}