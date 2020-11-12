/*
    Test Scenario: Create Response to 1915(b) Waiver RAI
    Description: This will login to the application, click the link to start the Respond to 1915(b) Waiver RAI process,
    enter the required information, and upload documents using files located in the 'files' folder. Lastly, comments
    will be entered in the Summary and then submitted.

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

    "Click on Respond to 1915(b) Waiver RAI" : function (browser) {
        let buttonText = "Respond to 1915(b) Waiver RAI";
        const spa = browser.page.spaBasePage();
        let buttonSelected = '@respondWaiver';
        spa.expect.element('xpath', buttonSelected).to.be.present.before(timeout);
        spa.useXpath().expect.element(buttonSelected).text.equals(buttonText);
        spa.click(buttonSelected).waitForElementNotPresent(buttonSelected);
    },

    "Enter Waiver ID" : spa_waiver["Enter Waiver Number"],

    "Upload Documents": spa_waiver["Upload Documents"],

    "Enter Comments": spa_waiver["Enter Comments"],

    "Submit Response": spa_waiver["Submit SPA"]

};
