// Updated by: Guli 
// Date      : 03/04/2021


const login = require('../cases/OY2-1494_Test_SPA_Login');
module.exports = {

    "@tags": ["fileUploadLimit", "smoke", "regression"],

    before: function (browser) {
        console.log('Setting up the browser instance...');
        console.log('Opening the browser...')
        console.log('Maximizing the browser window size...');
        browser.windowMaximize().url(browser.launch_url);
        browser.waitForElementPresent('body');
        login["Login to Medicaid as Regular User"](browser);
    },

    after: function (browser) {
        login["Verify logout from SPA and Wavier Dashboard as Regular User"](browser);
        console.log("Stopping test executions...")
        console.log('Closing down the browser instance...');
        browser.end();
    },
    
    'Verify that file upload exceeding 80MB is not allowed': function (browser) {
        // Test Data 
        let fileUploadElem = "[name='uploader-input-0']";
        let errorMsgElement = '.ds-u-color--error div';
        let expectedErrorMsg = 'An attachment cannot be larger than 80MB';

        // 1. Click [Submit new SPA] 
        browser.click('button#spaSubmitBtn');
        // 2. Click first ["Choose File"] button 
        //    and upload the file 
        browser.assert.elementPresent(fileUploadElem).pause(2000);
        let filePath = require('path').resolve(__dirname + '/files/Data_Larger_80mb.csv')
        console.log("FILE PAHT: " + filePath);
        browser.setValue(fileUploadElem, filePath).pause(2000);

        // 3. Capture the error message displayed
        browser.assert.elementPresent(errorMsgElement);
        browser.verify.containsText(errorMsgElement, expectedErrorMsg);
    }
}
