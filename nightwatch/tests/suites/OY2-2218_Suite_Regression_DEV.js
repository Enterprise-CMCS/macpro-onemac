const regression = require('./OY2-2218_Suite_Regression');
const login = require('../cases/OY2-1494_Test_SPA_Login_Dev');
const timeout = 1000;

module.exports = {
    "@tags": ["regression", "devEnv"],

    before: function (browser) {
        login.before(browser);
        login["Login to SPA and Waiver Dashboard"](browser);
    },

    afterEach: function (browser) {
        browser.click('link text', "Dashboard").waitForElementPresent('body');
    },

    after: function (browser) {
        regression.after(browser);
    },

    "Submit a SPA Report": function (browser) {
        regression["Submit a SPA Report"](browser);
    },

    "Submit a Waiver ": function (browser) {
        regression["Submit a New Waiver Action"](browser);
    },

    "Submit a SPA RAI Response": function (browser) {
        regression["Submit a SPA RAI Response"](browser);
    },

    "Submit an Amendment Waiver Action": function (browser) {
        regression["Submit an Amendment Waiver Action"](browser);
    },

    "Submit a Renewal Waiver Action": function (browser) {
        regression["Submit a Renewal Waiver Action"](browser);
    },

    "Submit a 'Respond to 1915(b) Waiver RAI'": function (browser) {
        regression["Submit a 'Respond to 1915(b) Waiver RAI'"](browser);
    },

    "Submit a Temporary Request Extension": function (browser) {
        regression["Submit a Temporary Request Extension"](browser);
    },
/*

    "Submit a 1915(c) Appendix K Amendment": function (browser) {
        regression["Submit a 1915(c) Appendix K Amendment"](browser);
    },
*/

};
