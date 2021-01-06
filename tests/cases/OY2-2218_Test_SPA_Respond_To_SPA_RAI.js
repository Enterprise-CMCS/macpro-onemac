/*
    Test Scenario: Create SPA Waiver
    Description: This will login to the application, click the link to start the SPA Waiver process,
    enter the required SPA Waiver information, and upload documents using files
    located in the 'files' folder. Lastly, comments will be entered in the Summary and then submitted.

 */

const login =require('./OY2-1494_Test_SPA_Login');
const new_spa = require('./OY2-2218_Test_SPA_Submit_New_SPA');
let spa;
module.exports = {

    before : function(browser) {
        login.before(browser);
        login["Navigate to SPA and Waiver Dashboard"](browser);
        login["Login to SPA and Waiver Dashboard"](browser);
        spa = browser.page.spaBasePage();
    },

    after : function(browser) {
        login["Logout of SPA and Waiver Dashboard"](browser);
        login.after(browser);
    },

    "Click on 'Respond to SPA RAI'": function (browser) {
        let link = '[id=spaRaiBtn]'
        let subDir = "/sparai";
        spa = browser.page.spaBasePage();
        browser.assert.elementPresent(link);
        browser.click(link);
        browser.expect.url().to.contain(subDir).before(5000);
    },

    "Enter SPA ID" : function (browser) {
        let selector = "#transmittalNumber";
        let transmitNumber = "VA-20-1234"
        browser.setValue(selector, transmitNumber);
        browser.pause(500);
        browser.expect.element(selector).value.to.equal(transmitNumber);

    },

    "Upload Documents" : function (browser) {
        spa = browser.page.spaBasePage();
        spa.uploadFiles(10);
    },

    "Enter Comments" : function(browser) {
        new_spa["Enter Comments"](browser);
    },

    "Submit Response" : function (browser) {
        new_spa["Submit SPA"](browser);
    },
};