/*
    Test Scenario: Create SPA Waiver
    Description: This will login to the application, click the link to start the SPA Waiver process,
    enter the required SPA Waiver information, and upload documents using files
    located in the 'files' folder. Lastly, comments will be entered in the Summary and then submitted.

 */

const new_spa = require('./OY2-2218_Test_SPA_Submit_New_SPA');
module.exports = {
    tags : ['regression'],

    before: function (browser) {
        new_spa.before(browser);
    },

    after: function (browser) {
        new_spa.after(browser);
    },

    "Login to SPA and Waiver Dashboard": new_spa["Login to SPA and Waiver Dashboard"],

    "Click on 'Submit new Waiver'": function (browser) {
        let new_spa = "@newWaiver";
        const spa = browser.page.spaBasePage();
        spa
            .assert.elementPresent('@newWaiver')
            .click(new_spa)
            .expect.url().to.contain("/waiver")
            .before(spa.pauseAction);
    },

    "Enter SPA State/Territory Information": new_spa["Enter SPA State/Territory Information"],

    "Enter Action Type": function (browser) {
        let selector = '#actionType';
        let value = 'N';
        let action_type = 'New waiver';
        browser
            .click(selector)
            .keys(value)
            .click(selector)
            .verify.containsText(selector, action_type)
            .pause(500);
    },

    "Enter Waiver Authority": function (browser) {
        let selector = '#waiverAuthority'
        let value = 'A'
        let state_option = 'All other 1915(b) Waivers';

        browser.useCss()
            .click(selector)
            .keys(value)
            .click(selector)
            .verify.containsText(selector, state_option)
            .pause(500);
    },

    "Enter Waiver Number": function (browser) {
        const spa = browser.page.spaBasePage();
        let selector = '@transmittal';
        let spa_id = spa.waiverNumber();
        spa.click(selector).setValue(selector, spa_id)
            .expect.element(selector).value.to.equals(spa_id);
    },

    "Upload Documents": function (browser) {
        const spa = browser.page.spaBasePage();
        spa.uploadFiles(7).pause(500);
    },

    "Enter Comments": new_spa["Enter Comments"],

    "Submit SPA Waiver": new_spa["Submit SPA"]
};