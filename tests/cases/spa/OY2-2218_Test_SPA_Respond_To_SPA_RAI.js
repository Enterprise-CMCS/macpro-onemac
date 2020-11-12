/*
    Test Scenario: Create SPA Waiver
    Description: This will login to the application, click the link to start the SPA Waiver process,
    enter the required SPA Waiver information, and upload documents using files
    located in the 'files' folder. Lastly, comments will be entered in the Summary and then submitted.

 */

const new_spa = require('./OY2-2218_Test_SPA_Submit_New_SPA');
module.exports = {
    tags : ['regression'],

    before : function(browser) {
        new_spa.before(browser)
    },

    after : function(browser) {
        new_spa.after(browser);
    },

    "Login to SPA and Waiver Dashboard": new_spa["Login to SPA and Waiver Dashboard"],

    "Click on 'Respond to SPA RAI'": function (browser) {
        let link = '@respondSPA'
        let subDir = "/sparai";

        const spa = browser.page.spaBasePage();

        spa
            .useXpath()
            .assert.elementPresent(link)
            .click(link)
            .expect.url().to.contain(subDir)
            .before(spa.pauseAction);
    },

    "Enter SPA ID" : new_spa["Enter SPA ID"],

    "Upload Documents" : function (browser) {
        const spa = browser.page.spaBasePage();
        spa.uploadFiles(9);
    },

    "Enter Comments" : new_spa["Enter Comments"],

    "Submit Response" : new_spa["Submit SPA"],

    "Logout" : new_spa["Logout of SPA and Waiver Dashboard"]
};