/*
    Test Scenario: Create Appendix K Waiver Amendment
    Description: This will login to the application, click the link to start the Submission process,
    enter the required Waiver information, and upload documents using files located in the 'files' folder.
    Lastly, comments will be entered in the Additional Information and then submitted.
 */

const login =require('./OY2-1494_Test_SPA_Login');
const new_spa = require('./OY2-2218_Test_SPA_Submit_New_SPA');
let spa;
const timeout = 2000;

module.exports = {
    before: function (browser) {
        login.before(browser);
        login["Login to SPA and Waiver Dashboard"](browser);
        browser.pause(2000);
        spa = browser.page.spaBasePage();
    },

    after: function (browser) {
        login["Logout of SPA and Waiver Dashboard"](browser);
        login.after(browser);
    },

    "Click on 'Submit 1915(c) Appendix K Amendment'": function (browser) {
        let testData = {
            selector: "@submitAppK",
            subUrl: '/waiverappk'
        };
        spa = browser.page.spaBasePage();
        spa.assert.elementPresent(testData.selector);
        spa.click(testData.selector);
        browser.expect.url().to.contain(testData.subUrl).before(5000);
    },

    "Enter Waiver Number": function (browser, spa_id = spa.getWaiverAppKNumber()) {
        let selector = '@transmittal';
        spa = browser.page.spaBasePage();
        spa.click(selector);
        spa.setValue(selector, spa_id);
        spa.expect.element(selector).value.to.equals(spa_id);
    },

    "Upload Documents": function (browser) {
        spa = browser.page.spaBasePage();
        spa.uploadFiles(7).pause(500);
    },

    "Enter Comments": function (browser) {
        new_spa["Enter Comments"](browser);
    },

    "Submit Form": function (browser) {
        browser.pause(timeout)
        new_spa["Submit SPA"](browser);
    }
};
