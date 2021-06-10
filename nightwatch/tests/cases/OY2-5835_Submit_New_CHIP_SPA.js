const new_spa = require('./OY2-2218_Test_SPA_Submit_New_SPA');
const timeout = 1000;
let spa;

module.exports = {

    before : function(browser) {
        new_spa.before(browser);
     },

    beforeEach: function (browser) {
        spa = browser.page.spaBasePage();
    },

    after : function(browser) {
        new_spa.after(browser);
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
        this['Enter SPA ID'](browser, spa.getTransmitNumber(true, "ND", "chipspa.txt"));
    },

    "Upload Documents": function (browser, required = 2, type = 'pdf') {
        new_spa['Upload Documents'](browser,required,type);
        
    },

    'Enter Comments' : function (browser) {
        new_spa['Enter Comments'](browser);
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
