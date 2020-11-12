/*
    Test Scenario: Create Response to 1915(b) Waiver RAI
    Description: This will login to the application, click the link to start the Respond to 1915(b) Waiver RAI process,
    enter the required information, and upload documents using files located in the 'files' folder. Lastly, comments
    will be entered in the Summary and then submitted.

 */

const timeout = 500;
const new_spa = require('./OY2-2218_Test_SPA_Submit_New_SPA');
module.exports = {
    tags : ['regression'],

    before : function(browser) {
        new_spa.before(browser);
    },

    after : function(browser) {
        new_spa.after(browser);
    },

    "Click on Respond to 1915(b) Waiver RAI" : function (browser) {
        let buttonText = "Respond to 1915(b) Waiver RAI";
        const spa = browser.page.spaBasePage();
        let buttonSelected = '@respondWaiver';
        spa.expect.element(buttonSelected).to.be.present.before(timeout);
        spa.expect.element(buttonSelected).text.equals(buttonText);
        spa.click(buttonSelected).waitForElementNotPresent(buttonSelected);
    },

    "Enter Waiver ID" : new_spa["Enter SPA ID"],

    "Upload Documents": function (browser) {
        const spa = browser.page.spaBasePage();
        spa.uploadFiles(7).pause(500);
    },

    "Enter Comments": new_spa["Enter Comments"],

    "Submit Response": new_spa["Submit SPA"]

};
