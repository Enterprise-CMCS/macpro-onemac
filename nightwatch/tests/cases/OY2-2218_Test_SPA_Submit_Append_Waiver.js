/*
    Test Scenario: Amendment Waiver Action
    Description: This will login to the application, click the link to start the Waiver process,
    enter the required Waiver information for a NEW waiver action, and upload documents using files
    located in the 'files' folder. Lastly, comments will be entered in the Summary and then submitted.

 */

const new_waiver = require('./OY2-2218_Test_SPA_Submit_New_Waiver');
let spa;
const timeout = 1000;

module.exports = {

    before: function (browser) {
        new_waiver.before(browser);
        browser.pause(timeout * 2);
        spa = browser.page.spaBasePage();
    },

    after: function (browser) {
        new_waiver.after(browser);
    },

    "Click on 'Submit new Waiver'": function (browser) {
        new_waiver["Click on 'Submit new Waiver'"](browser);
    },

    "Enter Action Type": function (browser, testData = {
        selector: '@actionType',
        text: "Waiver amendment",
    }) {
        new_waiver["Enter Action Type"](browser, testData);
    },

    "Enter Waiver Authority": function (browser, testData = {
        selector: '@waiverAuthority',
        text: "All other 1915(b) Waivers",
    }) {
        this["Enter Action Type"](browser, testData);
    },

    "Enter Waiver Number": function (browser, waiverAction = 'amendment') {
        new_waiver["Enter Waiver Number"](browser, waiverAction);
    },

    "Upload Documents": function (browser) {
        new_waiver["Enter Waiver Number"](browser);
    },

    "Enter Comments": function (browser) {
        new_waiver["Enter Comments"](browser);
    },

    "Submit Waiver": function (browser) {
        new_waiver["Submit Waiver"](browser);
    }

};