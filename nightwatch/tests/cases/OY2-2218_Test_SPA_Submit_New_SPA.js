/*
    Test Scenario: Create a new SPA
    Description: This will login to the application, enter the required SPA information, and upload documents using files
    located in the 'files' folder. Lastly, comments will be entered in the Summary and then submitted.


 */

const timeout = 1000;
const login = require('./OY2-1494_Test_SPA_Login');
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
        browser.pause(timeout);
    },

    "Enter SPA ID" : function (browser, spa_id = "") {
        let selector = '@transmittal';
        let id = (spa_id.length !== 0) ? spa_id : spa.getTransmitNumber(false);
        spa = browser.page.spaBasePage();
        spa.expect.element(selector).to.be.visible.before(timeout * 10);
        const enterValue = async function () {
            spa.setValue(selector, id);
            console.log("ID is: ",id);
            spa.expect.element(selector).value.to.contain(id);
        };
        spa.click(selector, enterValue);
    },

    "Enter SPA ID (Optional)" : function (browser) {
        spa = browser.page.spaBasePage();
        this["Enter ID"](browser, spa.getTransmitNumber(true));
    },

    "Upload Documents": function (browser, type = 'pdf', required = true) {
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
        browser.url(function (current) {
            browser.pause(timeout);
            browser.click('[type="submit"]').waitForElementPresent('body');
            browser.pause(timeout * 5);
            browser.expect.url().to.not.equals(current.value).before(timeout * 20);
        });

        Array.from(testData).forEach(obj => {
            spa.verify.elementPresent(obj.selector);
            spa.verify.containsText(obj.selector, obj.msg);
            browser.pause(timeout / 2);
        });
    },

};
