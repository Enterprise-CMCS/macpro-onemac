/*
    Test Scenario: New Waiver Action
    Description: This will login to the application, click the link to start the Waiver process,
    enter the required Waiver information for a NEW waiver action, and upload documents using files
    located in the 'files' folder. Lastly, comments will be entered in the Summary and then submitted.

 */

const login =require('./OY2-1494_Test_SPA_Login');
const new_spa = require('./OY2-2218_Test_SPA_Submit_New_SPA');
let spa;
const timeout = 2000;
const waiverAction = "new";

module.exports = {

    before: function (browser) {
        login.before(browser);
        login["Login to SPA and Waiver Dashboard"](browser);
        browser.pause(2000);
        spa = browser.page.spaBasePage();
    },

    after: function (browser) {
        login["Logout of SPA and Waiver Dashboard"](browser);
        login.after(browser);
    },

    "Click on 'Submit new Waiver'": function (browser, testData = {
        selector: "@newWaiver",
        subUrl: '/waiver'
    }) {
        new_spa["Click on 'Start a new SPA'"](browser, testData);
    },

    "Enter Action Type": function (browser, testData = {
        selector: '@actionType',
        text: "New waiver",
    }) {
        spa = browser.page.spaBasePage();
        spa.expect.element(testData.selector).to.be.visible.after(timeout * 5);
        spa.setValue(testData.selector, testData.text);
        spa.verify.containsText(testData.selector, testData.text);
    },

    "Enter Waiver Authority": function (browser, text = "All other 1915(b) Waivers") {
        const testData = {
            selector: '@waiverAuthority',
            text: text,
        };
        this["Enter Action Type"](browser, testData);
    },

    "Enter Waiver Number": function (browser, waiverAction = 'new', state = "KS") {
        spa = browser.page.spaBasePage();
        new_spa["Enter SPA ID"](browser, spa.getWaiverNumber(waiverAction, state));
    },

    "Upload Documents": function (browser) {
        new_spa["Upload Documents"](browser, 1);
    },

    "Enter Comments": function (browser) {
        new_spa["Enter Comments"](browser);
    },

    "Submit Waiver": function (browser) {
        browser.pause(timeout)
        new_spa["Submit SPA"](browser);
    }

};