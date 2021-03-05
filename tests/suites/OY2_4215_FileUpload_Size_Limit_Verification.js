// Updated by: Guli 
// Date      : 03/04/2021

module.exports = {

    "@tags": ["fileUploadLimit", "smoke"],

    before : function(browser) {
        console.log('Setting up the browser instance...');
        console.log('Opening the browser...')
        console.log('Maximizing the browser window size...');
        browser.windowMaximize().url(browser.launch_url);
        browser.waitForElementPresent('body');
    },

    after : function(browser) {
        login["Verify logout from SPA and Wavier Dashboard as Regular User"](browser);
        console.log("Stopping test executions...")
        console.log('Closing down the browser instance...');
        browser.end();
    }, 

    'Login to Medicaid as Regular User' : function(browser) {
        // Test Data 
        const username = browser.globals.user;
        const password = browser.globals.pass;
        let spaPageTitle = 'SPA and Waiver Dashboard';

        // Test Stesp
        browser.click('.nav-right > [type]');  // click the login button
        browser.setValue('#okta-signin-username', username);
        browser.setValue('#okta-signin-password', password);
        browser.click('#tandc');
        browser.click('#okta-signin-submit');
        browser.waitForElementPresent('body');

        // Test Assertion
        browser.verify.containsText('h1', spaPageTitle);
    }, 

    'Verify that file upload exceeding 80MB is not allowed': function(browser) {
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
