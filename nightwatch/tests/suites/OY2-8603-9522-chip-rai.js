
const fs = require('fs');
const locator = '(//*[@disabled])';
const login = require('../suites/OY2_9999_Login');
const new_spa = require('../cases/OY2-2218_Test_SPA_Submit_New_SPA');
let spaID;
let chipspaID;
let spa;
let generatedWaiverID;
const timeout = 1000;


module.exports = {
    "@tags": ["smoke", "smoke2"],

    before: function (browser) {
        login.beforeEach(browser);
        login['Login with state submitter user'](browser);
    },
    after: function (browser) {
        login.afterEach(browser);
    },

    'Verify user can submit new CHIP SPA': function (browser) {
        browser.useCss().click("#new-submission-button");
        browser.useCss().click("#root > div > div.choice-container > ul > li:nth-child(1) > a > h4");
        browser.useCss().click("#root > div > div.choice-container > ul > li:nth-child(3) > a > h4");
        let num1 = Math.floor(Math.random() * Math.floor(80)) + 10;
        let num2 = Math.floor(Math.random() * Math.floor(80)) + 10;
        let num3 = Math.floor(Math.random() * Math.floor(80)) + 10;
        // SS-YY-NNNN
        chipspaID = 'MD-' + num1 + '-' + num2 + '' + num3;
        // input the SPA ID number 
        browser.useCss().setValue("input#transmittalNumber", chipspaID);
        // upload the first documents
        let fileUploadElem = "[name='uploader-input-0']";
        browser.assert.elementPresent(fileUploadElem);
        let filePath = require('path').resolve(__dirname + '/files/file.docx')
        browser.setValue(fileUploadElem, filePath);

        // upload the second documents
        fileUploadElem = "[name='uploader-input-1']";
        browser.assert.elementPresent(fileUploadElem);
        filePath = require('path').resolve(__dirname + '/files/adobe.pdf')
        browser.setValue(fileUploadElem, filePath);
        browser.pause(timeout * 5);

        // upload the third documents
        fileUploadElem = "[name='uploader-input-2']";
        browser.assert.elementPresent(fileUploadElem);
        filePath = require('path').resolve(__dirname + '/files/adobe.pdf')
        browser.setValue(fileUploadElem, filePath);
       
        // write the Summary 
        let phrase = "This is a test, test, test";
        let charCount = "//*[@id='root']/div/div[3]/div[2]/form/div[3]/div[2]";
        // let charCount = "/html/body/reference/div/div/div[3]/form/div[3]/div[2]";
        browser.useXpath().assert.elementPresent(charCount);
        browser.useXpath().assert.containsText( charCount, "0/4000");
        browser.useCss();
        browser.setValue('textarea', phrase);
        browser.useXpath().assert.containsText( charCount, "26/4000");
        browser.useCss();
        filePath = require('path').resolve(__dirname + '/files/textvalidation.txt')
        console.log("filePath--" , filePath);
        // let text4000 = fs.readFileSync(path.join(__dirname, '/files/textvalidation.txt'),'utf8');
        let text4000 = fs.readFileSync(filePath,'utf8');
        browser.pause(2000);
        browser.setValue('textarea', text4000);
        browser.useXpath().assert.containsText( charCount, "4000/4000").pause(1000);
        browser.useCss();
        browser.pause(3000);

        // Submit the new SPA 
        browser.click("[value='Submit']").pause(2000);

        // Verify the SPA on Submission List 
        browser.useXpath().verify.containsText('(//table//td)[1]/a', chipspaID);
        browser.useCss();
        browser.click("xpath", "(//table//td)[1]/a").pause(2000);
        browser.useXpath().assert.not.elementPresent("/html/body/reference/div/div/div[3]/form/div[1]/div/div/div[2]/a");
        browser.useXpath().assert.not.elementPresent("/html/body/reference/div/div/div[3]/form/div[2]/p[2]");
        browser.useCss();
        browser.click( "#back-button > svg").waitForElementPresent("body");
        browser.pause(5000);
        return chipspaID;
    },

    
    'Verify SPA and Waiver Dashboard > Respond to CHIP RAI for SPA Submission': function (browser) {
        browser.useCss().click("#new-submission-button");
        browser.useCss().click("#root > div > div.choice-container > ul > li:nth-child(1) > a > h4");
        browser.useCss().click("#root > div > div.choice-container > ul > li:nth-child(4) > a > h4");
        browser.useCss().setValue("input#transmittalNumber", chipspaID);

        // upload a document and make a comment 
        let fileUploadElem = "[name='uploader-input-0']";
        let filePath = require('path').resolve(__dirname + '/files/file.docx')
        browser.useCss().setValue(fileUploadElem, filePath).pause(3000);
        // upload the second documents
        fileUploadElem = "[name='uploader-input-1']";
        //browser.assert.elementPresent(fileUploadElem);
        filePath = require('path').resolve(__dirname + '/files/file.docx')
        browser.setValue(fileUploadElem, filePath);
        browser.pause(timeout * 5);
        

        // write the Summary 
        let phrase = "This is a test, test, test";
        let charCount = "//*[@id='root']/div/div[3]/div[2]/form/div[3]/div[2]";
        // let charCount = "/html/body/reference/div/div/div[3]/form/div[3]/div[2]";
        browser.useXpath().assert.elementPresent(charCount);
        browser.useXpath().assert.containsText( charCount, "0/4000");
        browser.useCss();
        browser.setValue('textarea', phrase);
        browser.useXpath().assert.containsText( charCount, "26/4000");
        browser.useCss();
        filePath = require('path').resolve(__dirname + '/files/textvalidation.txt')
        console.log("filePath--" , filePath);
        // let text4000 = fs.readFileSync(path.join(__dirname, '/files/textvalidation.txt'),'utf8');
        let text4000 = fs.readFileSync(filePath,'utf8');
        browser.pause(2000);
        browser.setValue('textarea', text4000);
        browser.useXpath().assert.containsText( charCount, "4000/4000").pause(1000);
        browser.useCss();
        browser.pause(3000);

        // click ["Submit"] button 
        browser.useCss().click("[value='Submit']").pause(1000);

        // Verify the submitted Content 
        let submittedIDNumber = "//table[@class='submissions-table']//tr[1]/td[1]/a";
        
        // SPA ID Verification 
        browser.useXpath().expect.element(submittedIDNumber).to.be.visible;
        browser.click("xpath", "//table[@class='submissions-table']//tr[1]/td[1]/a").pause(2000);
        browser.useXpath().assert.not.elementPresent("/html/body/reference/div/div/div[3]/form/div[1]/div/div/div[2]/a");
        browser.useXpath().assert.not.elementPresent("/html/body/reference/div/div/div[3]/form/div[2]/p[2]");
        browser.useCss();
        browser.click( "#back-button > svg").waitForElementPresent("body");
        browser.pause(5000);
    },

    
}