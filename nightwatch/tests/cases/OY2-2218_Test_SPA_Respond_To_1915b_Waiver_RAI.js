/*
    Test Scenario: Create Response to 1915(b) Waiver RAI
    Description: This will login to the application, click the link to start the Respond to 1915(b) Waiver RAI process,
    enter the required information, and upload documents using files located in the 'files' folder. Lastly, comments
    will be entered in the Additional Information field and then submitted.

 */

const timeout = 1000;

const new_waiver = require('./OY2-2218_Test_SPA_Submit_New_Waiver');
let spa;
module.exports = {

    before : function(browser) {
       new_waiver.before(browser);
    },

    after : function(browser) {
        new_waiver.after(browser);
    },

    "Click on Respond to 1915(b) Waiver RAI" : function (browser, testData = {
        selector: "@respondWaiver",
        subUrl: '/waiverrai'
    }) {
        new_waiver["Click on 'Submit new Waiver'"](browser, testData);
    },

    "Enter Waiver Number" : function(browser) {
        spa = browser.page.spaBasePage();
        const tid = spa.getID('waiver.txt');
        new_waiver["Enter Waiver Number"](browser, tid);
    },

    "Upload Documents": function (browser) {
        new_waiver["Upload Documents"](browser, 1);
    },

    "Enter Comments": function (browser) {
        new_waiver["Enter Comments"](browser);
    },

    "Submit Response": function (browser) {
        new_waiver["Submit Waiver"](browser);
    }

};
