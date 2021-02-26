/*
    Test Scenario: Create SPA Waiver
    Description: This will login to the application, click the link to start the SPA Waiver process,
    enter the required SPA Waiver information, and upload documents using files
    located in the 'files' folder. Lastly, comments will be entered in the Summary and then submitted.

 */

const login =require('./OY2-1494_Test_SPA_Login');
const new_spa = require('./OY2-2218_Test_SPA_Submit_New_SPA');
let spa;
const timeout = 1000;
module.exports = {

    before: function (browser) {
        login.before(browser);
        login["Login to SPA and Waiver Dashboard"](browser);
        browser.pause(timeout * 2);
        spa = browser.page.spaBasePage();
    },

    after: function (browser) {
        login["Logout of SPA and Waiver Dashboard"](browser);
        login.after(browser);
    },

    "Click on 'Submit new Waiver'": function (browser) {
        let testData = {
            selector: "@newWaiver",
            subUrl: '/waiver'
        };
        spa = browser.page.spaBasePage();
        spa.assert.elementPresent(testData.selector);
        spa.click(testData.selector);
        browser.expect.url().to.contain(testData.subUrl).before(5000);
    },

    "Enter SPA State/Territory Information": function(browser) {
        new_spa["Enter SPA State/Territory Information"](browser);
    },

    "Enter Action Type": function (browser) {
        spa = browser.page.spaBasePage();
        let testData = {
            selector: '@actionType',
            value: 'N',
            action_type: 'New waiver'
        }
        spa.expect.element(testData.selector).to.be.visible;
        spa.setValue(testData.selector, testData.value);
        spa.verify.containsText(testData.selector, testData.action_type);
    },

    "Enter Waiver Authority": function (browser) {
        const testData = {
            selector: '@waiverAuthority',
            authority: "All other 1915(b) Waivers",
        }
        spa = browser.page.spaBasePage();
        spa.expect.element(testData.selector).to.be.visible;
        spa.setValue(testData.selector, testData.authority).pause(500);
        spa.expect.element(testData.selector).text.to.contain(testData.authority);
    },

    "Enter Waiver Number": function (browser, spa_id) {
        spa = browser.page.spaBasePage();
        let id = (spa_id) ? spa_id : spa.getWaiverNumber();
        new_spa["Enter SPA ID"](browser, id);
    },

    "Upload Documents": function (browser) {
        new_spa["Upload Documents"](browser);
    },

    "Enter Comments": function (browser) {
        new_spa["Enter Comments"](browser);
    },

    "Submit SPA Waiver": function (browser) {
        browser.pause(timeout)
        new_spa["Submit SPA"](browser);
    }

};
