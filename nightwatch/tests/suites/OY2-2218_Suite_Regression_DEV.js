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

    "Submit a SPA Report": function (browser) {
        regression["Submit a SPA Report"](browser);
    },

    "Submit a SPA RAI Response'": function (browser) {
        regression["Submit a SPA RAI Response'"](browser);
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
    "SPA Submission Backend Test": function (browser) {
        const tempExt = require('../cases/OY2-4513_Test_Backend_Submit_Transmittal');
        tempExt["Click on 'Dev Backend Test'"](browser);
        tempExt["Enter Bad SPA ID"](browser);
        tempExt["Submit Bad SPA"](browser);
        tempExt["Refresh Valid 'Dev Backend Test'"](browser);
        tempExt["Enter Valid SPA ID"](browser);
        tempExt["Submit Valid SPA Id"](browser);
        tempExt["Refresh Dup 'Dev Backend Test'"](browser);
        tempExt["Enter Duplicate SPA ID"](browser);
        tempExt["Submit Dup Id Submission Response"](browser);

    }
};
