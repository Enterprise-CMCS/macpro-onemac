/*
    Test Scenario: Create Response to 1915(b) Waiver RAI
    Description: This will login to the application, click the link to start the Respond to 1915(b) Waiver RAI process,
    enter the required information, and upload documents using files located in the 'files' folder. Lastly, comments
    will be entered in the Summary and then submitted.

 */

const timeout = 500;

const login =require('./OY2-1494_Test_SPA_Login');
const new_waiver = require('./OY2-2218_Test_SPA_Submit_New_Waiver');

module.exports = {
    tags : ['regression'],

    before : function(browser) {
        login.before(browser);
        login["Login to SPA and Waiver Dashboard"](browser);
    },

    after : function(browser) {
        login["Logout of SPA and Waiver Dashboard"](browser);
        login.after(browser);
    },

    "Click on Respond to 1915(b) Waiver RAI" : function (browser) {
        let buttonText = "Respond to 1915(b) Waiver RAI";
        const spa = browser.page.spaBasePage();
        let buttonSelected = '@respondWaiver';
        spa.expect.element(buttonSelected).to.be.present.before(timeout);
        spa.expect.element(buttonSelected).text.equals(buttonText);
        spa.click(buttonSelected).waitForElementNotPresent(buttonSelected);
    },

    "Enter Waiver Number" : function(browser) {
        new_waiver["Enter Waiver Number"](browser);
    },

    "Upload Documents": function (browser) {
        const spa = browser.page.spaBasePage();
        spa.uploadFiles(7).pause(500);
    },

    "Enter Comments": function (browser) {
        new_waiver["Enter Comments"](browser);
    },

    "Submit Response": function (browser) {
        new_waiver["Submit SPA Waiver"](browser);
    }

};
