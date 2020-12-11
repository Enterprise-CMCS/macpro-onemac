/*
    Test Scenario: Create SPA Waiver
    Description: This will login to the application, click the link to start the SPA Waiver process,
    enter the required SPA Waiver information, and upload documents using files
    located in the 'files' folder. Lastly, comments will be entered in the Summary and then submitted.

 */

const login =require('./OY2-1494_Test_SPA_Login');
const new_spa = require('./OY2-2218_Test_SPA_Submit_New_SPA');
module.exports = {

    before : function(browser) {
        login.before(browser);
        login["Login to SPA and Waiver Dashboard"](browser);
    },

    after : function(browser) {
        login["Logout of SPA and Waiver Dashboard"](browser);
        login.after(browser);
    },


    "Click on 'Respond to SPA RAI'": function (browser) {
        let link = '@respondSPA'
        let subDir = "/sparai";

        const spa = browser.page.spaBasePage();

        spa.assert.elementPresent(link)
            .click(link)
            .expect.url().to.contain(subDir)
            .before(spa.pauseAction);
    },

    "Enter SPA ID" : function (browser) {
        new_spa["Enter SPA ID"](browser);
    },

    "Upload Documents" : function (browser) {
        const spa = browser.page.spaBasePage();
        spa.uploadFiles(10);
    },

    "Enter Comments" : function(browser) {
        new_spa["Enter Comments"](browser);
    },

    "Submit Response" : function (browser) {
        new_spa["Submit SPA"](browser);
    },
};