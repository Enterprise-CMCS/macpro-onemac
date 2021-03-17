/*
    Test Scenario: Create Request Temporary Extension form - 1915(b) and 1915(c)
    Description: This will login to the application, click the link to start the "Request Temporary Extension form -
    1915(b) and 1915(c)" process, enter the required information, and upload documents using files located in the
    'files' folder. Lastly, comments will be entered in the Summary and then submitted.

 */

const timeout = 1000;
const waiverRAI = require('./OY2-2218_Test_SPA_Respond_To_1915b_Waiver_RAI');
let spa;
module.exports = {

    before : function(browser) {
        waiverRAI.before(browser);
        browser.pause(timeout);
    },

    after : function(browser) {
        waiverRAI.after(browser);
    },

    "Click on 'Request Temporary Extension form - 1915(b) and 1915(c)'" : function (browser, testData = {
        selector: '@requestTemp',
        subUrl: '/waiverextension',
    }) {
        spa = browser.page.spaBasePage();
        waiverRAI["Click on Respond to 1915(b) Waiver RAI"](browser, testData);
    },

    "Enter Waiver Number" : function (browser) {
        waiverRAI["Enter Waiver Number"](browser);
    },

    "Upload Documents": function(browser) {
        waiverRAI["Upload Documents"](browser, 3);
    },

    "Enter Comments": function (browser) {
        waiverRAI["Enter Comments"](browser);
    },

    "Submit Response": function (browser) {
        waiverRAI["Submit Response"](browser);
    },
};
