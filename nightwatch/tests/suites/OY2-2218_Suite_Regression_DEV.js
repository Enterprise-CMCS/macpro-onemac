const login = require('../cases/OY2-1494_Test_SPA_Login');
const regression = require('./OY2-2218_Suite_Regression');
const timeout = 1000;

module.exports = {
    "@tags": ["regression", "devEnv"],

    before: function (browser) {
        login.before(browser);
        login["Login to SPA and Waiver Dashboard"](browser);
        browser.pause(timeout * 5);
    },

    after: function (browser) {
        regression.after(browser);
    },

    "Submit a SPA Report": function (browser) {
        regression["Submit a SPA Report"](browser);
    },

    "Submit a SPA RAI Response": function (browser) {
        regression["Submit a SPA RAI Response"](browser);
    },

    "Submit a SPA Waiver ": function (browser) {
        regression["Submit a SPA Waiver "](browser);
    },

    "Submit a 1915b Waiver RAI": function (browser) {
        regression["Submit a 1915b Waiver RAI"](browser);
    },

    "Submit a Temporary Request Extension": function (browser) {
        regression["Submit a Temporary Request Extension"](browser);
    },

};
