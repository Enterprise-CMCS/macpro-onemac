/*
    Test Scenario: Create Renew Waiver Action
    Description: This will login to the application, click the link to start the Waiver process,
    enter the required Waiver information for the RENEW action, and upload documents using files
    located in the 'files' folder. Lastly, comments will be entered in the Additional Information field and then submitted.

 */

const login =require('./OY2-1494_Test_SPA_Login_Dev');
const new_spa = require('./OY2-2218_Test_SPA_Submit_New_SPA');
let spa;
const timeout = 2000;
const waiverAction = "renewal";
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
        text: "Request for waiver renewal",
    }) {
        spa = browser.page.spaBasePage();
        spa.expect.element(testData.selector).to.be.visible.after(timeout * 5);
        spa.setValue(testData.selector, testData.text);
        spa.verify.containsText(testData.selector, testData.text);
    },

    "Enter Waiver Authority": function (browser) {
        const testData = {
            selector: '@waiverAuthority',
            authority: "All other 1915(b) Waivers",
        }
        spa = browser.page.spaBasePage();
        spa.expect.element(testData.selector).to.be.visible;
        spa.setValue(testData.selector, testData.authority).pause(500);
        spa.expect.element(testData.selector).text.to.contain(testData.authority);
    },

    "Enter Waiver Number": function (browser, waiverAction = 'renewal', state = "OR") {
        spa = browser.page.spaBasePage();
        new_spa["Enter SPA ID"](browser, spa.getWaiverNumber(waiverAction, state));
    },

    "Upload Documents": function (browser) {
        new_spa["Upload Documents"](browser);
    },

    "Enter Comments": function (browser) {
        new_spa["Enter Comments"](browser);
    },

    "Submit Waiver": function (browser) {
        browser.pause(timeout)
        new_spa["Submit SPA"](browser);
    }

};