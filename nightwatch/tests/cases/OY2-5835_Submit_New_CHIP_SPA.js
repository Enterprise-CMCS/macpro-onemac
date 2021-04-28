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

    "Click on 'Start a new CHIP SPA'": function (browser, testData = {
        selector: '[id=chipSpaBtn]',
        subUrl: '/chipspa',
    }) {
        spa = browser.page.spaBasePage();
        spa.assert.elementPresent(testData.selector);
        spa.click(testData.selector).waitForElementPresent('body');
        browser.assert.urlContains(testData.subUrl);
    },

    "Enter SPA ID" : function (browser, spa_id) {
        spa = browser.page.spaBasePage();
        let selector = '@transmittal';
        let id = (spa_id) ? spa_id : spa.getTransmitNumber(false, "ME", "chipspa.txt");
        spa.expect.element(selector).to.be.visible.before(timeout * 10);
        spa.setValue(selector, id, () => {
            browser.keys([browser.Keys.TAB]);
            spa.expect.element(selector).value.to.contain(id);
        });

    },

    "Enter SPA ID (Optional)" : function (browser) {
        spa = browser.page.spaBasePage();
        this["Enter ID"](browser, spa.getTransmitNumber(true, "ND", "chipspa.txt"));
    },

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

    'Submit SPA' : function (
        browser,
        testData = { selector: '@alert_banner' }
    ) {
        spa = browser.page.spaBasePage();
        browser.click('[type="submit"]');
        spa.expect.element(testData.selector).to.be.visible.before(timeout * 20);
    },

};
