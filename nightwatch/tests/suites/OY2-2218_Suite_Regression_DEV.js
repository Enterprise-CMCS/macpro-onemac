const login = require('../cases/OY2-1494_Test_SPA_Login');
const regression = require('./OY2-2218_Suite_Regression');

const timeout = 1000;

module.exports = {
    "@tags": ["regression", "devEnv"],

    before: function (browser) {
        login.before(browser);
    },

    beforeEach: function (browser) {
        login["Login to SPA and Waiver Dashboard"](browser);
        browser.pause(timeout);
    },

    after: function (browser) {
        login.after(browser);
    },

    afterEach: function (browser) {
        login["Logout of SPA and Waiver Dashboard"](browser);
        browser.pause(timeout);
    },

    "Submit New SPA": function (browser) {
        regression["Submit New SPA"](browser);
    },

    "Respond to SPA RAI": function (browser) {
        regression["Respond to SPA RAI"](browser);
    },

    "Submit New Waiver": function (browser) {
        regression["Submit New Waiver"](browser);
    },

    "Respond to 1915(b) Waiver RAI": function (browser) {
        regression["Respond to 1915(b) Waiver RAI"](browser);
    },

    "Request Temporary Extension form - 1915(b) and 1915(c)": function (browser) {
        regression["Request Temporary Extension form - 1915(b) and 1915(c)"](browser);
    },
};
