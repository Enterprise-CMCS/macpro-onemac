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
        login["Login to SPA and Waiver Dashboard via Okta"](browser);
        browser.pause(timeout * 2);
    },

    after : function(browser) {
        login["Logout of SPA and Waiver Dashboard"](browser);
        login.after(browser);
    },

    "Click on 'Start a new SPA'": function (browser) {
        spa = browser.page.spaBasePage();
        spa.assert.elementPresent('@newSPA');
        spa.click('@newSPA').waitForElementPresent('body');
        browser.expect.url().to.contain('/spa').before(timeout * 5);
        browser.pause(timeout * 3);
    },

    /*
    "Enter SPA State/Territory Information" : function (browser) {
        spa = browser.page.spaBasePage();
        let testData = {
            selector: '@territory',
            state_option: "Virginia"
        }
        spa.waitForElementVisible(testData.selector);
        spa.click(testData.selector)
        spa.setValue(testData.selector, "VVV");
        spa.verify.containsText(testData.selector, testData.state_option);
        spa.pause(timeout * 5);
    },
     */

    'Enter SPA ID': function (browser, id) {
        spa = browser.page.spaBasePage();
        let testData = {
            selector: '@transmittal',
            id: (!id) ? spa.getTransmitNumber() : id,
        }
        spa.click(testData.selector);
        spa.setValue(testData.selector, testData.id);
        browser.keys([browser.Keys.TAB, browser.Keys.NULL]);
        browser.pause(timeout * 5);
        spa.expect.element(testData.selector).value.to.contain(testData.id);

    },

    'Upload Documents' : function (browser, numFiles = 9) {
        spa = browser.page.spaBasePage();
        spa.uploadFiles(numFiles);
    },

    'Enter Comments' : function (browser, selector = 'textarea',
                                 entered_text = "Relax. This is only a test") {
        spa = browser.page.spaBasePage();
        spa.enterComments(selector, entered_text);
        spa.assert.containsText(selector, entered_text)
    },

    'Submit SPA' : function (browser) {
        let testData = {
            alert: {
                selector: '@alertText',
                msg: "Submission Completed",
            },
            confirm: {
                selector: '@confirmText',
                msg: "Your submission has been received.",
            },
        };
        spa = browser.page.spaBasePage();

        browser.url(function (current) {
            browser.click('[type="submit"]').waitForElementPresent('body');
            browser.expect.url().to.not.equals(current.value).before(timeout * 10);
        });

        spa
            .assert.elementPresent(testData.alert.selector)
            .assert.containsText(testData.alert.selector, testData.alert.msg)
            .assert.elementPresent(testData.confirm.selector)
            .assert.containsText(testData.confirm.selector, testData.confirm.msg)
            .pause(timeout * 3);
    },

};
