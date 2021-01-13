
const login = require('../cases/OY2-1494_Test_SPA_Login');
module.exports = {
    "@tags": ["regression"],

    before: function (browser) {
        login.before(browser);
    },

    beforeEach: function (browser) {
        browser.pause(1000);
        login["Login to SPA and Waiver Dashboard"](browser);
    },

    after: function (browser) {
        login.after(browser);
    },

    afterEach: function (browser) {
        login["Logout of SPA and Waiver Dashboard"](browser);
    },

    "Submit a SPA Report": function (browser) {
        const newSPA = require('../cases/OY2-2218_Test_SPA_Submit_New_SPA');
        newSPA["Click on 'Start a new SPA'"](browser);
        newSPA["Enter SPA State/Territory Information"](browser);
        newSPA["Enter SPA ID"](browser);
        newSPA["Upload Documents"](browser);
        newSPA["Enter Comments"](browser);
        newSPA["Submit SPA"](browser);
    },

    "Submit a SPA RAI Response'": function (browser) {
        const spaRAI = require('../cases/OY2-2218_Test_SPA_Respond_To_SPA_RAI');
        spaRAI["Click on 'Respond to SPA RAI'"](browser);
        spaRAI["Enter SPA ID"](browser);
        spaRAI["Upload Documents"](browser);
        spaRAI["Enter Comments"](browser);
        spaRAI["Submit Response"](browser);
    },

    "Submit a SPA Waiver ": function (browser) {
        const spaWaiver = require('../cases/OY2-2218_Test_SPA_Submit_New_Waiver');
        spaWaiver["Click on 'Submit new Waiver'"](browser);
        spaWaiver["Enter SPA State/Territory Information"](browser);
        spaWaiver["Enter Waiver Authority"](browser);
        spaWaiver["Enter Waiver Number"](browser);
        spaWaiver["Enter Action Type"](browser);
        spaWaiver["Upload Documents"](browser);
        spaWaiver["Enter Comments"](browser);
        spaWaiver["Submit SPA Waiver"](browser);
    },

    "Submit a 1915b Waiver RAI": function (browser) {
        const waiverRAI = require('../cases/OY2-2218_Test_SPA_Respond_To_1915b_Waiver_RAI');
        waiverRAI["Click on Respond to 1915(b) Waiver RAI"](browser);
        waiverRAI["Enter Waiver Number"](browser);
        waiverRAI["Upload Documents"](browser);
        waiverRAI["Enter Comments"](browser);
        waiverRAI["Submit Response"](browser);
    },

    "Submit a Temporary Request Extension": function (browser) {
        const tempExt = require('../cases/OY2-2218_Test_SPA_Request_Temp_Extension');
        tempExt["Click on 'Request Temporary Extension form - 1915(b) and 1915(c)'"](browser);
        tempExt["Enter Waiver Number"](browser);
        tempExt["Upload Documents"](browser);
        tempExt["Enter Comments"](browser);
        tempExt["Submit Response"](browser);
    },
};