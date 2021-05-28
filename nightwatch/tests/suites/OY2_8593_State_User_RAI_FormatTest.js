const login = require('../cases/OY2-1494_Test_SPA_Login');

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
        login["Login to SPA and Waiver Dashboard via Okta"](browser,testData);
    },

    after: function (browser) {
        login["Verify logout from SPA and Wavier Dashboard as Regular User"](browser);
        console.info("Stopping test executions...")
        console.info('Closing down the browser instance...');
        browser.end();
    },

    'Verify that State User can enter Waiver number in RAI form with correct format': function (browser) {
       browser.useCss().click("button#waiverRaiBtn").pause(500);
       //   MD.23232
       browser.useCss().setValue('input#transmittalNumber', "MD.23232233").pause(1000);
       browser.pause(2000)
       browser.clearValue('input#transmittalNumber').pause(500);
       browser.useCss().setValue('input#transmittalNumber', "MD.23232").pause(500);
       browser.expect.element('div#transmittalNumberStatusMsgr').to.be.not.present;
       browser.back();
       browser.useCss();
    }
}