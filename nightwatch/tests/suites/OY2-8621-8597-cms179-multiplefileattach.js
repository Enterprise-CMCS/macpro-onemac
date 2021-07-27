const locator = '(//*[@disabled])';
const login = require('../suites/OY2_9999_Login');
const timeout = 1000;
let spaID;
let generatedWaiverID;

module.exports = {
    "@tags": ["smoke", "smoke2"],

    // Opens the browser, goes to the test site
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
        browser.useCss().click("#root > div > div.choice-container > ul > li:nth-child(1) > a > div > h4");
        browser.useCss().click("#root > div > div.choice-container > ul > li:nth-child(1) > a > div > h4");
        // create random SPA ID
        let num1 = Math.floor(Math.random() * Math.floor(80)) + 10;
        let num2 = Math.floor(Math.random() * Math.floor(80)) + 10;
        let num3 = Math.floor(Math.random() * Math.floor(80)) + 10;
        // SS-YY-NNNN
        spaID = 'MD-' + num1 + '-' + num2 + '' + num3;
        // input the SPA ID number 
        browser.useCss().setValue("input#transmittalNumber", spaID);      
        let fileUploadElem = "[name='uploader-input-0']";
        browser.assert.elementPresent(fileUploadElem);
        browser.useXpath().assert.containsText( "/html/body/reference/div/div/div[3]/div[2]/form/div[2]/div[2]/div/table/tbody/tr[2]/td[2]/label", "Add File");
        browser.useCss();
        
        let filePath = require('path').resolve(__dirname + '/files/file.docx')
        browser.setValue(fileUploadElem, filePath);
        browser.expect.element(fileUploadElem).to.not.be.enabled;
        browser.click("xpath", "//*[@id='root']/div/div[3]/div[2]/form/div[2]/div[2]/div/table/tbody/tr[1]/td[3]/div/button" );
        browser.expect.element(fileUploadElem).to.be.enabled;
        browser.setValue(fileUploadElem, filePath);

        // upload the second documents
        
        fileUploadElem = "[name='uploader-input-1']";
        browser.assert.elementPresent(fileUploadElem);
        let filePaths = ['/files/picture.jpg', '/files/adobe.pdf', '/files/excel.xlsx', '/files/adobe.pdf'];

        
        for (let i = 0; i < 4; i++) {
            filePath = require('path').resolve(__dirname + filePaths[i] )
            browser.setValue(fileUploadElem, filePath);
        }
        browser.pause(timeout * 7);

        // write the Summary 
        let phrase = "This is a test, test, test";
        browser.setValue('textarea', phrase);

        // Submit the new SPA 
        browser.click("[value='Submit']").pause(6000);
       
        // Verify the SPA on Submission List 
        browser.useXpath().verify.containsText('//*[@id="transmittalNumber-0"]/a', spaID).pause(4000);
        browser.useCss();
        return spaID;
    },
}