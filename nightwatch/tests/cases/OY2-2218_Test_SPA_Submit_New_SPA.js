/*
    Test Scenario: Create a new SPA
    Description: This will login to the application, enter the required SPA information, and upload documents using files
    located in the 'files' folder. Lastly, comments will be entered in the Summary and then submitted.


 */

const timeout = 1000;
const login = require('./OY2-1494_Test_SPA_Login_Dev');
let spa;
module.exports = {

    before : function(browser) {
        login.before(browser);
        login["Login to SPA and Waiver Dashboard"](browser);
        browser.pause(timeout * 3);
    },

    after : function(browser) {
        login["Logout of SPA and Waiver Dashboard"](browser);
        login.after(browser);
    },

    "Click on 'Start a new SPA'": function (browser, testData = {
        selector: '@newSPA',
        subUrl: '/spa',
    }) {
        spa = browser.page.spaBasePage();
        spa.assert.elementPresent(testData.selector);
        spa.click(testData.selector).waitForElementPresent('body');
        browser.assert.urlContains(testData.subUrl);
    },
    /*
    "Enter SPA State/Territory Information" : function (browser) {
        spa = browser.page.spaBasePage();
        let testData = {
            selector: '@territory',
            state_option: "Virginia"
        }

        spa.click(testData.selector)
        spa.setValue(testData.selector, "VVV");
        spa.waitForElementVisible(testData.selector);
        spa.verify.containsText(testData.selector, testData.state_option);
        spa.pause(timeout);
    },

    */

    "Enter SPA ID" : function (browser, spa_id) {
        spa = browser.page.spaBasePage();
        let selector = '@transmittal';
        let id = (spa_id) ? spa_id : spa.getTransmitNumber(false, "AK");
        spa.expect.element(selector).to.be.visible.before(timeout * 10);
        spa.setValue(selector, id, () => {
            browser.keys([browser.Keys.TAB]);
            spa.expect.element(selector).value.to.contain(id);
        });

    },

    "Enter SPA ID (Optional)" : function (browser) {
        spa = browser.page.spaBasePage();
        this["Enter ID"](browser, spa.getTransmitNumber(true, "ND"));
    },
/*

    'Upload Documents Number' : function (browser, numOfFiles = 9) {
        spa = browser.page.spaBasePage();
        spa.uploadFiles(numOfFiles);
    },
*/

    "Upload Documents": function (browser, required = 2, type = 'pdf') {
        let validate = (selector, fileName) => browser.expect.element(selector).value.contains(fileName);
        spa = browser.page.spaBasePage();
        spa.uploadDocs(type, required, validate);
    },

    'Enter Comments' : function (browser, selector = 'textarea',
                                 entered_text = "Relax. This is only a test") {
        spa = browser.page.spaBasePage();
        spa.enterComments(selector, entered_text);
        spa.verify.containsText(selector, entered_text)
    },

    'Submit SPA' : function (browser, testData = [
        {selector: '@alert_banner', msg: "Submission Completed"},
        {selector: '@alert_text', msg: "Your submission has been received."},
    ]) {
        spa = browser.page.spaBasePage();

        browser.click('[type="submit"]').waitForElementPresent('body');

        Array.from(testData).forEach(obj => {
            spa.verify.elementPresent(obj.selector);
            //spa.verify.containsText(obj.selector, obj.msg);
            browser.pause(timeout / 2);
        });
    },

};
