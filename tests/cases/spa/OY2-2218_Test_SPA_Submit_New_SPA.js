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
        login["Verify SPA and Waiver Dashboard"](browser);
        login["Enter Login Credentials"](browser)
    },

    after : function(browser) {
        login["Logout of SPA and Waiver Dashboard"](browser);
        login.after(browser);
    },

    "Click on 'Start a new SPA'": function (browser) {
        let link = '@newSPA';
        let subDir = '/spa';
        const spa = browser.page.spaBasePage();

        spa
            .useXpath()
            .assert.elementPresent(link)
            .click(link)
            .expect.url().to.contain(subDir)
            .before(timeout);
    },

    'Enter SPA State/Territory Information' : function (browser) {
        let selector = 'select[id=territory]'
        let state_option = "Virginia";
        browser.useCss()
            .click(selector)
            .setValue(selector, ["V", "V" , "V"])
            .click(selector)
            .assert.containsText(selector, state_option)
            .pause(timeout);
    },

    'Enter SPA ID' : function (browser) {
        let selector = '@transmittalNumber';
        let spa_id = "A1234567890";
        const spa = browser.page.spaBasePage();
        spa.click(selector)
            .setValue(selector, spa_id).pause(500)
            .expect.element(selector).value.to.equals(spa_id);
    },

    'Upload Documents' : function (browser) {
        const spa = browser.page.spaBasePage();
        spa.uploadFiles(8)
        browser.pause(timeout);
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

        browser.click('button[type=submit]')
            .waitForElementVisible('body')
            .assert.elementPresent(alert_selector)
            .assert.elementPresent(p_selector)
            .assert.containsText(alert_selector, alert_msg)
            .assert.containsText(p_selector, msg)
            .pause(1000);
    }
};