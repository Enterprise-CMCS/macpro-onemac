/*
    Test Scenario: Create SPA Waiver
    Description: This will login to the application, click the link to start the SPA Waiver process,
    enter the required SPA Waiver information, and upload documents using files
    located in the 'files' folder. Lastly, comments will be entered in the Summary and then submitted.

 */

const login =require('./OY2-1494_Test_SPA_Login');
const new_spa = require('./OY2-2218_Test_SPA_Submit_New_SPA');
let spa;
module.exports = {

    before: function (browser) {
        login.before(browser);
        login["Login to SPA and Waiver Dashboard"](browser);
    },

    after: function (browser) {
        login["Logout of SPA and Waiver Dashboard"](browser);
        login.after(browser);
    },

    "Click on 'Submit new Waiver'": function (browser) {
        let new_spa = "@newWaiver";
        spa = browser.page.spaBasePage();
        spa.assert.elementPresent('@newWaiver');
        spa
            .click(new_spa)
            .expect.url().to.contain("/waiver")
            .before(5000);
    },

    "Enter SPA State/Territory Information": function(browser) {
        new_spa["Enter SPA State/Territory Information"](browser);
    },

    "Enter Action Type": function (browser) {
        let selector = '#actionType';
        let value = 'N';
        let action_type = 'New waiver';
        browser.setValue(selector, value);
        browser.verify.containsText(selector, action_type);
    },

    "Enter Waiver Authority": function (browser) {
        const testData = {
            authority: "All other 1915(b) Waivers",
        }

        spa.setValue('@waiverAuthority', testData.authority);
        browser.verify.containsText(testData.selector, testData.authority).pause(500);
    },

    "Enter Waiver Number": function (browser) {
        let selector = '@transmittal';
        let spa_id = spa.getWaiverNumber();
        spa.click(selector).setValue(selector, spa_id);
        browser.expect.element(selector).value.to.equals(spa_id);
    },

    "Upload Documents": function (browser) {
        spa = browser.page.spaBasePage();
        spa.uploadFiles(7).pause(500);
    },

    "Enter Comments": function (browser) {
        new_spa["Enter Comments"](browser);
    },

    "Submit SPA Waiver": function (browser) {
        new_spa["Submit SPA"](browser);
    }

};