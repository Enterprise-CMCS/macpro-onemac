/*
    Test Scenario: Create Request Temporary Extension form - 1915(b) and 1915(c)
    Description: This will login to the application, click the link to start the "Request Temporary Extension form -
    1915(b) and 1915(c)" process, enter the required information, and upload documents using files located in the
    'files' folder. Lastly, comments will be entered in the Summary and then submitted.

 */

const timeout = 500;
const spa_waiver = require('./OY2-2218_Test_SPA_Submit_New_Waiver');
module.exports = {
    tags : ['regression'],

    before : function(browser) {
        spa_waiver.before(browser);
    },

    after : function(browser) {
        spa_waiver.after(browser);
    },

    "Click on 'Request Temporary Extension form - 1915(b) and 1915(c)'" : function (browser) {
        let buttonText = "Request Temporary Extension form - 1915(b) and 1915(c)";
        const spa = browser.page.spaBasePage();
        let buttonSelected = '@requestTemp';
        spa.expect.element('xpath', buttonSelected).to.be.present.before(timeout);
        spa.useXpath().expect.element(buttonSelected).text.equals(buttonText);
        spa.click(buttonSelected).waitForElementNotPresent(buttonSelected);
    },

    "Enter Waiver ID" : spa_waiver["Enter Waiver Number"],

    "Upload Documents": function(browser) {
        const spa = browser.page.spaBasePage();
        spa.uploadFiles(3).pause(500);
    },

    "Enter Comments": spa_waiver["Enter Comments"],

    "Submit Response": spa_waiver["Submit SPA"],
};
