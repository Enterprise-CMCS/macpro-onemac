/*
    Test Scenario: Create a new SPA
    Description: This will login to the application, enter the required SPA information, and upload documents using files
    located in the 'files' folder. Lastly, comments will be entered in the Additional Information field and then submitted.


 */

const timeout = 1000;
const login = require('./OY2-1494_Test_SPA_Login');
let spa;
module.exports = {

    before : function(browser) {
        login.beforeEach(browser);
        login['Login to SPA and Waiver Dashboard'](browser);
        browser.pause(timeout * 3);
    },

    after : function(browser) {
        login.afterEach(browser);
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
        let id = (spa_id) ? spa_id : spa.getTransmitNumber(true, browser.globals.user.state);
        spa.expect.element(selector).to.be.visible.before(timeout * 10);
        spa.setValue(selector, id, () => {
            browser.keys([browser.Keys.TAB]);
            spa.expect.element(selector).value.to.contain(id);
        });

    },

   /* "Enter SPA ID (Optional)" : function (browser) {
        spa = browser.page.spaBasePage();
        this['Enter SPA ID'](browser, spa.getTransmitNumber(true, "ND"));
    },*/
/*

    'Upload Documents Number' : function (browser, numOfFiles = 9) {
        spa = browser.page.spaBasePage();
        spa.uploadFiles(numOfFiles);
    },
*/

    "Upload Documents": function (browser, required = 1, type = 'pdf') {
        let validate = (fileName) => {
           //browser.expect.element(`//*[contains(text(),"${fileName}")]`).text.contain(fileName);
           browser.expect.element(`//*[contains(text(),"${fileName}")]`).to.be.present;
        }
             spa = browser.page.spaBasePage();
        spa.uploadDocs(type);
    },
   // "Upload another Documents": function (browser) {
   //     this['Upload another Documents'](browser, 1, 'docx');
   // },

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
        browser.pause(3000);
    },

};
