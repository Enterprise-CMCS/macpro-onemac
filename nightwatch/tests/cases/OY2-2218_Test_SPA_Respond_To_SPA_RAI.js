/*
    Test Scenario: Create SPA Waiver
    Description: This will login to the application, click the link to start the SPA Waiver process,
    enter the required SPA Waiver information, and upload documents using files
    located in the 'files' folder. Lastly, comments will be entered in the Summary and then submitted.

 */

const login =require('./OY2-1494_Test_SPA_Login');
const new_spa = require('./OY2-2218_Test_SPA_Submit_New_SPA');
let spa;
const timeout = 5000;
module.exports = {

    before : function(browser) {
        login.before(browser);
        login["Login to SPA and Waiver Dashboard via Okta"](browser);
        browser.pause(2000);
    },

    after : function(browser) {
        login["Logout of SPA and Waiver Dashboard"](browser);
        login.after(browser);
    },

    "Click on 'Respond to SPA RAI'": function (browser) {
        let link = '@respondSPA'
        let subDir = "/sparai";
        spa = browser.page.spaBasePage();
        spa.assert.elementPresent(link);
        spa.click(link);
        browser.expect.url().to.contain(subDir).before(5000);
    },

    "Enter SPA ID" : function (browser) {
        spa = browser.page.spaBasePage();
        new_spa["Enter SPA ID"](browser, spa.getSpaID());
    },

    "Upload Documents" : function (browser) {
        new_spa["Upload Documents"](browser, 10);
    },

    "Enter Comments" : function(browser) {
        new_spa["Enter Comments"](browser);
    },

    "Submit Response" : function (browser) {
        new_spa["Submit SPA"](browser);
    },
};
