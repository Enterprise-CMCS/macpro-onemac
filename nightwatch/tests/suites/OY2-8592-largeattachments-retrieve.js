

const locator = '(//*[@disabled])';
const login = require('../suites/OY2_9999_Login');
const timeout = 1000;
let spaID;
let generatedWaiverID;

module.exports = {
    "@tags": ["smoke", "smoke2"],

    before: function (browser) {
        login.beforeEach(browser);
        login['Login with state submitter user'](browser);
    },
    after: function (browser) {
        login.afterEach(browser);
    },


    // 'Login to Medicaid as Developer' : function(browser) {
    //     // Verifying that Login page is displayed
    //     login["Logout of SPA and Waiver Dashboard"](browser);
    // },

    // 'Login to Medicaid' : function(browser) {
    //     // Verifying that Login page is displayed
    //     login["Login to SPA and Waiver Dashboard via Okta"](browser);
    // },

    // DONE 
    'Verify user can submit new SPA': function (browser) {
        browser.useCss().click("#new-submission-button");
        browser.useXpath().click("(//li[@class='choice']/a)[1]");
        browser.useXpath().click("(//li[@class='choice']/a)[1]");
        // create random SPA ID
        let num1 = Math.floor(Math.random() * Math.floor(80)) + 10;
        let num2 = Math.floor(Math.random() * Math.floor(80)) + 10;
        let num3 = Math.floor(Math.random() * Math.floor(80)) + 10;
        // SS-YY-NNNN
        spaID = 'MD-' + num1 + '-' + num2 + '' + num3;
        // input the SPA ID number 
        browser.useCss().setValue("input#transmittalNumber", spaID);      
        // upload the first documents
        let fileUploadElem = "[name='uploader-input-0']";
        browser.assert.elementPresent(fileUploadElem);
        let filePath = require('path').resolve(__dirname + '/files/15MB.pdf')
        browser.setValue(fileUploadElem, filePath);
        browser.pause(timeout * 3);

        // upload the second documents
        fileUploadElem = "[name='uploader-input-1']";
        browser.assert.elementPresent(fileUploadElem);
        filePath = require('path').resolve(__dirname + '/files/adobe.pdf')
        browser.setValue(fileUploadElem, filePath);

        // write the Summary 
        let phrase = "This is a test, test, test";
        browser.setValue('textarea', phrase);

        // Submit the new SPA 
        browser.useCss().click("[value='Submit']").pause(timeout * 25);

       // Verify the SPA on Submission List 
       browser.useXpath().verify.containsText('//*[@id="transmittalNumber-0"]/a', spaID).pause(4000);
       browser.useCss();
       browser.click("xpath", "//*[@id='transmittalNumber-0']/a").pause(2000);
       browser.click("xpath", "(//li[@class='choice-list-item']/a)[1]").pause(2000);
       
    //    //Switch to new tab
    //     browser.windowHandles(function (result) {
    //     // 0 == current main window, 1 == new tab
    //     var handle = result.value[1];
    //     browser.switchWindow(handle);
    //     browser.assert.urlContains("15MB.pdf").pause(timeout*6);
    //     });
    //     browser.pause(timeout*5);
    //     browser.closeWindow(); // Close tab
    //     // Switch to main window
    //     browser.windowHandles(function (result) {
    //         // 0 == current main window, 1 == new tab
    //         var handle = result.value[0];
    //         browser.switchWindow(handle);
    //         //browser.back().pause(3000);
    //     });
        
       return spaID;
    },
}
