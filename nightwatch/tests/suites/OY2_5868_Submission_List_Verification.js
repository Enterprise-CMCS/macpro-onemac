// // Updated by: Guli 
// // Date      : 03/04/2021
// // The automated UI test scripts that belongs to this module has 
// // element location related problem, we will be disabling this test 
// // until these issues are refactored and resolved. 3/25/2021
// // Updated on 6/16/2021


// let generatedSPAID;
// let generatedWaiverID;
// const login = require('../suites/OY2_9999_Login');
// module.exports = {
//     "@tags": ["smoke", "regression"],
//     // Opens the browser, goes to the test site
//     before: function (browser) {
//         login.beforeEach(browser);
//         login['Login with state submitter user'](browser);
//     },

//     after: function (browser) {
//         login.afterEach(browser);
//     },

//     'Submission List Verification > Submit new SPA and Respond to SPA RAI': function (browser) {
//         // Submit a SPA Report 
//         browser.useXpath().click("//a[@id='new-submission-button']");
//         browser.pause(500);
//         browser.useXpath().click("(//h4)[1]");
//         browser.pause(500);
//         browser.useXpath().click("(//h4)[1]");
//         //browser.useXpath().click("//button[text()='Submit New Medicaid SPA']");
//         // create random SPA ID
//         let num1 = Math.floor(Math.random() * Math.floor(80)) + 10;
//         let num2 = Math.floor(Math.random() * Math.floor(80)) + 10;
//         let num3 = Math.floor(Math.random() * Math.floor(80)) + 10;
//         // SS-YY-NNNN
//         //changed the state to MD
//         let spaID = 'MD-' + num1 + '-' + num2 + '' + num3;
//         // input the SPA ID number 
//         browser.useCss().setValue("input#transmittalNumber", spaID);
//         // upload the first documents
//         let fileUploadElem = "[name='uploader-input-0']";
//         browser.assert.elementPresent(fileUploadElem);
//         let filePath = require('path').resolve(__dirname + '/files/file.docx');
//         browser.setValue(fileUploadElem, filePath);

//         // upload the second documents
//         fileUploadElem = "[name='uploader-input-1']";
//         browser.assert.elementPresent(fileUploadElem);
//         filePath = require('path').resolve(__dirname + '/files/file.docx');
//         browser.setValue(fileUploadElem, filePath);

//         // write the Summary 
//         let phrase = "This is a test, test, test";
//         browser.setValue('textarea', phrase);

//         // Submit the new SPA 
//         browser
//         .useCss()
//         .waitForElementPresent("[value='Submit']", 1000)
//         .click("[value='Submit']").pause(5000);
        
//         //browser.refresh();
//         browser.pause(5000);
//         browser.refresh();

//         // Verify the SPA on Submission List 
//         // browser.useXpath().click("//a[@id='new-submission-button']");
//         //browser.useXpath().waitForElementVisible("(//table[@class='submissions-table']/tbody/tr/td/a)[1]", 1000);
//         // browser.refresh();
//         //browser.useXpath().verify.containsText('(//table[@class="submissions-table"]/tbody/tr/td/a)[1]', spaID);
//         browser.useXpath().verify.containsText('(//td[@role="cell"])[1]', spaID);

//         // Verify the submitted Content 
//         const submittedIDNumber = "[id=transmittalNumber-0] > a";
//         let submittedType = "[id=type-0] span";
//         let submittedDate = "[id=submittedAt-0]";
//         // SPA ID Verification 
//         // browser.useXpath().expect.element(submittedIDNumber).to.be.visible;
//         // //browser.useXpath().assert.containsText(submittedIDNumber, generatedSPAID);
//         // browser.useXpath().assert.containsText(submittedIDNumber, spaID);
//         // // Submitted Type Verification 
//         // browser.useXpath().expect.element(submittedType).to.be.visible;
//         // browser.pause(1000);
//         // browser.useXpath().assert.containsText(submittedType, "Medicaid SPA").pause(1000);
//         // // Data Submitted Verification 
//         // browser.useXpath().expect.element(submittedDate).to.be.visible;
//         // browser.useCss();

//         //Submission List Verification Respond to SPA RAI
//         browser.useXpath().click("//a[@id='new-submission-button']");
//         browser.pause(3000);
//         browser.useXpath().click("(//h4)[1]");
//         browser.pause(1000);
//         browser.useXpath().click("(//h4)[2]");
//         let selector = '#transmittalNumber';
//         browser.useCss().setValue(selector,spaID);
//         // upload a file 
//         fileUploadElem = "[name='uploader-input-0']";
//         filePath = require('path').resolve(__dirname + '/files/file.docx')
//         browser.useCss().setValue(fileUploadElem, filePath).pause(5000);
//         browser.useCss().setValue("textarea", "This is a test, just a test");
//         // Submit the SPA RAI
//         browser.useCss().click("[value='Submit']").pause(3000);
//         // Verify the submitted Content 
//         // SPA ID Verification 
//         browser.useCss().expect.element(submittedIDNumber).to.be.visible;
//         //browser.useXpath().assert.containsText(submittedIDNumber, generatedSPAID);
//         browser.useCss().assert.containsText(submittedIDNumber, spaID);
//         // Submitted Type Verification 
//         browser.useCss().expect.element(submittedType).to.be.visible;
//         browser.useCss().assert.containsText(submittedType, "SPA RAI");
//         // Data Submitted Verification 
//         browser.useCss().expect.element(submittedDate).to.be.visible;
//         browser.useCss();
//     },
    

//     'Submission List Verification > Submit 1915(b) Waiver Action AND Respond to 1915(b) Waiver RAI AND Submit a Temporary Request Extension': function (browser) {
//         //browser.useCss().click("button#waiverBtn");
//         browser.useXpath().click("//a[@id='new-submission-button']");
//         browser.pause(500);
//         browser.useXpath().click("(//h4)[2]");
//         browser.pause(500);
//         browser.useXpath().click("(//h4)[1]");
//         browser.useCss().click("select#action-type");
//         browser.useCss().click("select#action-type > option[value='new']");
//         browser.useCss().click("select#waiver-authority");
//         browser.useCss().click("select#waiver-authority > option[value='1915(b)(4)']");
//         // Enter Waiver number
//         let num1 = Math.floor(Math.random() * Math.floor(80)) + 10;
//         let num2 = Math.floor(Math.random() * Math.floor(80)) + 10;
//         // SS-YY-NNNN
//         generatedWaiverID = 'MD.' + num1 + '' + num2;
//         // input the SPA ID number 
//         browser.useCss().setValue("input#transmittalNumber", generatedWaiverID);
//         // upload a document and make a comment 
//         let fileUploadElem = "[name='uploader-input-0']";
//         let filePath = require('path').resolve(__dirname + '/files/file.docx')
//         browser.useCss().setValue(fileUploadElem, filePath).pause(5000);
//         browser.useCss().setValue("textarea", "This is a test, just a test");
//         // click ["Submit"] button 
//         browser.useCss().click("[value='Submit']").pause(1000);
//         // Verify the submitted SPA Report Content 
//         const submittedIDNumber = "[id=transmittalNumber-0] > a";
//         let submittedType = "[id=type-0] span";
//         let submittedDate = "[id=submittedAt-0]";
//         // Waiver ID Verification 
//         browser.useCss().expect.element(submittedIDNumber).to.be.visible;
//         browser.useCss().assert.containsText(submittedIDNumber, generatedWaiverID);
//         // Submitted Type Verification 
//         browser.useCss().expect.element(submittedType).to.be.visible;
//         browser.useCss().assert.containsText(submittedType, "Waiver");
//         // Data Submitted Verification 
//         browser.useCss().expect.element(submittedDate).to.be.visible;
//         browser.useCss();

//         // Submission List Verification Respond to 1915(b) Waiver RAI
//         // Go to Respond to Waiver RAI
//         browser.useXpath().click("//a[@id='new-submission-button']");
//         browser.pause(500);
//         browser.useXpath().click("(//h4)[2]");
//         browser.pause(500);
//         browser.useXpath().click("(//h4)[2]");
//         browser.useCss().setValue('input#transmittalNumber', generatedWaiverID);
//         // upload a document and make a comment 
//         browser.useCss().setValue(fileUploadElem, filePath).pause(5000);
//         browser.useCss().setValue("textarea", "This is a test, just a test");
//         // click ["Submit"] button 
//         browser.useCss().click("[value='Submit']").pause(1000);
//         // Verify the submitted SPA Report Content 
//         // ID Verification 
//         browser.useCss().expect.element(submittedIDNumber).to.be.visible;
//         browser.useCss().assert.containsText(submittedIDNumber, generatedWaiverID);
//         // Submitted Type Verification 
//         browser.useCss().expect.element(submittedType).to.be.visible;
//         browser.useCss().assert.containsText(submittedType, "Waiver RAI");
//         // Data Submitted Verification 
//         browser.useCss().expect.element(submittedDate).to.be.visible;
//         browser.useCss();

//         // Submission List Verification Submit a Temporary Request Extension
//         browser.useXpath().click("//a[@id='new-submission-button']");
//         browser.pause(500);
//         browser.useXpath().click("(//h4)[2]");
//         browser.pause(500);
//         browser.useXpath().click("(//h4)[3]");
//         browser.useCss().setValue('input#transmittalNumber', generatedWaiverID);
//         // upload a document and make a comment 
//         browser.useCss().setValue(fileUploadElem, filePath).pause(5000);
//         browser.useCss().setValue("textarea", "This is a test, just a test");
//         // click ["Submit"] button 
//         browser.useCss().click("[value='Submit']").pause(1000);
//         // Verify the submitted SPA Report Content 
//         // ID Verification 
//         browser.useCss().expect.element(submittedIDNumber).to.be.visible;
//         browser.useCss().assert.containsText(submittedIDNumber, generatedWaiverID);
//         // Submitted Type Verification 
//         browser.useCss().expect.element(submittedType).to.be.visible;
//         browser.useCss().assert.containsText(submittedType, "Temporary Extension Request");
//         // Data Submitted Verification 
//         browser.useCss().expect.element(submittedDate).to.be.visible;
//         browser.useCss();
//     },
// }