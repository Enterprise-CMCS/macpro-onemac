/*
    Test Scenario: Create a new SPA
    Description: This will login to the application, enter the required SPA information, and upload documents using files
    located in the 'files' folder. Lastly, comments will be entered in the Summary and then submitted.


 */

const timeout = 500;
const login = require('./OY2-1494_Test_SPA_Login');

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

    "Click on 'Start a new SPA'": function (browser) {
        const spa = browser.page.spaBasePage();
        spa.verify.elementPresent('@newSPA');
        spa.click('@newSPA').waitForElementPresent('body');
        spa.expect.url().to.contain('/spa').before(5000);
    },

    "Enter SPA State/Territory Information" : function (browser) {
        let selector = 'select[id=territory]'
        let state_option = "Virginia";
        browser.click(selector)
        browser.setValue(selector, "VVV");

        browser.waitForElementVisible(selector);
        browser.verify.containsText(selector, state_option);
        browser.pause(timeout);
    },

    'Enter SPA ID' : function (browser) {
        let selector = '@transmittal';
        const spa = browser.page.spaBasePage();
        let spa_id = spa.getTransmitNumber();
        spa.click(selector);
        spa.setValue(selector, spa_id);
        browser.pause(500);
        spa.expect.element(selector).value.to.equal(spa_id);
    },

    'Upload Documents' : function (browser) {
        const spa = browser.page.spaBasePage();
        spa.uploadFiles(9);
    },

    'Enter Comments' : function (browser) {
        let selector = '#textfield_1';
        let entered_text = "Relax. This is only a test";
        browser
            .assert.elementPresent(selector)
            .sendKeys(selector, entered_text)
            .assert.containsText(selector, entered_text)
            .pause(timeout);
    },

    'Submit SPA' : function (browser) {
        let alert_selector = "#alert_3";
        let p_selector = "p[class=ds-c-alert__text]"
        let alert_msg = "Submission Completed";
        let msg = "Your submission has been received.";

        browser.click('[type="submit"]');
        browser.waitForElementVisible('body');
        browser
            .assert.elementPresent(alert_selector)
            .assert.elementPresent(p_selector)
            .assert.containsText(alert_selector, alert_msg)
            .assert.containsText(p_selector, msg)
            .pause(1000);
    },

};