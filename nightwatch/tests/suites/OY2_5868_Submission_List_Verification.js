// Updated by: Guli 
// Date      : 03/04/2021
// The automated UI test scripts that belongs to this module has 
// element location related problem, we will be disabling this test 
// until these issues are refactored and resolved. 3/25/2021
// Updated on 6/16/2021


let generatedSPAID;
let generatedWaiverID;
const login = require('../suites/OY2_9999_Login');
module.exports = {
    "@tags": ["smoke", "regression"],
    // Opens the browser, goes to the test site
    before: function (browser) {
        login.beforeEach(browser);
        login['Login with state submitter user'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);
    },

    'Submission List Verification > Submit new SPA and Respond to SPA RAI': function (browser) {
        // Submit a SPA Report 
        const newSPA = require('../suites/OY2-3636_Suite_Smoke.js');
        generatedSPAID = newSPA['Verify Submitter user can submit new SPA'](browser);
        // Verify the submitted Content 
        let submittedIDNumber = "//table[@class='submissions-table']//tr[1]/td[1]/a";
        let submittedType = "//table[@class='submissions-table']//tr[1]/td[2]/span";
        let submittedDate = "//table[@class='submissions-table']//tr[1]/td[3]";
        // SPA ID Verification 
        browser.useXpath().expect.element(submittedIDNumber).to.be.visible;
        browser.useXpath().assert.containsText(submittedIDNumber, generatedSPAID);
        // Submitted Type Verification 
        browser.useXpath().expect.element(submittedType).to.be.visible;
        browser.pause(1000);
        browser.useXpath().assert.containsText(submittedType, "Medicaid SPA").pause(1000);
        // Data Submitted Verification 
        browser.useXpath().expect.element(submittedDate).to.be.visible;
        browser.useCss();

        //Submission List Verification Respond to SPA RAI
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        let selector = '#transmittalNumber';
        browser.useCss().setValue(selector,generatedSPAID);
        // upload a file 
        console.log("About to upload a file")
        let fileUploadElem = "[name='uploader-input-0']";
        let filePath = require('path').resolve(__dirname + '/files/file.docx')
        browser.useCss().setValue(fileUploadElem, filePath).pause(5000);
        browser.useCss().setValue("textarea", "This is a test, just a test");
        // Submit the SPA RAI
        browser.useCss().click("[value='Submit']").pause(500);
        // Verify the submitted Content 
        // SPA ID Verification 
        browser.useXpath().expect.element(submittedIDNumber).to.be.visible;
        browser.useXpath().assert.containsText(submittedIDNumber, generatedSPAID);
        // Submitted Type Verification 
        browser.useXpath().expect.element(submittedType).to.be.visible;
        browser.useXpath().assert.containsText(submittedType, "SPA RAI");
        // Data Submitted Verification 
        browser.useXpath().expect.element(submittedDate).to.be.visible;
        browser.useCss();
    },
    

    'Submission List Verification > Submit 1915(b) Waiver Action AND Respond to 1915(b) Waiver RAI AND Submit a Temporary Request Extension': function (browser) {
        //browser.useCss().click("button#waiverBtn");
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.useCss().click("select#actionType");
        browser.useCss().click("select#actionType > option[value='new']");
        browser.useCss().click("select#waiverAuthority");
        browser.useCss().click("select#waiverAuthority > option[value='1915(b)(4)']");
        // Enter Waiver number
        let num1 = Math.floor(Math.random() * Math.floor(80)) + 10;
        let num2 = Math.floor(Math.random() * Math.floor(80)) + 10;
        // SS-YY-NNNN
        generatedWaiverID = 'MD.' + num1 + '' + num2;
        // input the SPA ID number 
        browser.useCss().setValue("input#transmittalNumber", generatedWaiverID);
        // upload a document and make a comment 
        let fileUploadElem = "[name='uploader-input-0']";
        let filePath = require('path').resolve(__dirname + '/files/file.docx')
        browser.useCss().setValue(fileUploadElem, filePath).pause(5000);
        browser.useCss().setValue("textarea", "This is a test, just a test");
        // click ["Submit"] button 
        browser.useCss().click("[value='Submit']").pause(1000);
        // Verify the submitted SPA Report Content 
        let submittedIDNumber = "//table[@class='submissions-table']//tr[1]/td[1]/a";
        let submittedType = "//table[@class='submissions-table']//tr[1]/td[2]/span";
        let submittedDate = "//table[@class='submissions-table']//tr[1]/td[3]";
        // Waiver ID Verification 
        browser.useXpath().expect.element(submittedIDNumber).to.be.visible;
        browser.useXpath().assert.containsText(submittedIDNumber, generatedWaiverID);
        // Submitted Type Verification 
        browser.useXpath().expect.element(submittedType).to.be.visible;
        browser.useXpath().assert.containsText(submittedType, "Waiver");
        // Data Submitted Verification 
        browser.useXpath().expect.element(submittedDate).to.be.visible;
        browser.useCss();

        // Submission List Verification Respond to 1915(b) Waiver RAI
        // Go to Respond to Waiver RAI
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        browser.useCss().setValue('input#transmittalNumber', generatedWaiverID);
        // upload a document and make a comment 
        browser.useCss().setValue(fileUploadElem, filePath).pause(5000);
        browser.useCss().setValue("textarea", "This is a test, just a test");
        // click ["Submit"] button 
        browser.useCss().click("[value='Submit']").pause(1000);
        // Verify the submitted SPA Report Content 
        // ID Verification 
        browser.useXpath().expect.element(submittedIDNumber).to.be.visible;
        browser.useXpath().assert.containsText(submittedIDNumber, generatedWaiverID);
        // Submitted Type Verification 
        browser.useXpath().expect.element(submittedType).to.be.visible;
        browser.useXpath().assert.containsText(submittedType, "Waiver RAI");
        // Data Submitted Verification 
        browser.useXpath().expect.element(submittedDate).to.be.visible;
        browser.useCss();

        // Submission List Verification Submit a Temporary Request Extension
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[3]");
        browser.useCss().setValue('input#transmittalNumber', generatedWaiverID);
        // upload a document and make a comment 
        browser.useCss().setValue(fileUploadElem, filePath).pause(5000);
        browser.useCss().setValue("textarea", "This is a test, just a test");
        // click ["Submit"] button 
        browser.useCss().click("[value='Submit']").pause(1000);
        // Verify the submitted SPA Report Content 
        // ID Verification 
        browser.useXpath().expect.element(submittedIDNumber).to.be.visible;
        browser.useXpath().assert.containsText(submittedIDNumber, generatedWaiverID);
        // Submitted Type Verification 
        browser.useXpath().expect.element(submittedType).to.be.visible;
        browser.useXpath().assert.containsText(submittedType, "Temporary Extension Request");
        // Data Submitted Verification 
        browser.useXpath().expect.element(submittedDate).to.be.visible;
        browser.useCss();
    },
}