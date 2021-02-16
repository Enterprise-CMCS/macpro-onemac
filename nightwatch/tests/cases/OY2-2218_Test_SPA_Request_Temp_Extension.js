/*
    Test Scenario: Create Request Temporary Extension form - 1915(b) and 1915(c)
    Description: This will login to the application, click the link to start the "Request Temporary Extension form -
    1915(b) and 1915(c)" process, enter the required information, and upload documents using files located in the
    'files' folder. Lastly, comments will be entered in the Summary and then submitted.

 */

const timeout = 1000;
const login = require('./OY2-1494_Test_SPA_Login');
const new_waiver = require('./OY2-2218_Test_SPA_Submit_New_Waiver');
let spa;
module.exports = {

    before : function(browser) {
        login.before(browser);
        login["Login to SPA and Waiver Dashboard via Okta"](browser);
        browser.pause(timeout * 2);
    },

    after : function(browser) {
        login["Logout of SPA and Waiver Dashboard"](browser);
        login.after(browser);
    },

    "Click on 'Request Temporary Extension form - 1915(b) and 1915(c)'" : function (browser) {
        let buttonText = "Request Temporary Extension form - 1915(b) and 1915(c)";
        let buttonSelected = '@requestTemp';
        spa = browser.page.spaBasePage();
        spa.expect.element(buttonSelected).to.be.present.before(timeout);
        spa.expect.element(buttonSelected).text.equals(buttonText);
        spa.click(buttonSelected).waitForElementNotPresent(buttonSelected);
        spa.pause(timeout * 3);
    },

    "Enter Waiver Number" : function (browser) {
        spa = browser.page.spaBasePage();
        new_waiver["Enter Waiver Number"](browser, spa.getWaiverID())
    },

    "Upload Documents": function(browser) {
        new_waiver["Upload Documents"](browser, 3);
    },

    "Enter Comments": function (browser) {
        new_waiver["Enter Comments"](browser);
    },

    "Submit Response": function (browser) {
        new_waiver["Submit SPA Waiver"](browser);
    },
};
