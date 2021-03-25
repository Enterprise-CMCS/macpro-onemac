// Updated by: Guli 
// Date      : 03/04/2021
// The automated UI test scripts that belongs to this module has 
// element location related problem, we will be disabling this test 
// until these issues are refactored and resolved. 3/25/2021

/*
let generatedSPAID;
let generatedWaiverID;
const login = require('../cases/OY2-1494_Test_SPA_Login');

module.exports = {

    "@tags": ["subList", "smoke", "regression"],

    // Opens the browser, goes to the test site
    before: function (browser) {
        console.log('Setting up the browser instance...');
        console.log('Opening the browser...')
        console.log('Maximizing the browser window size...');
        browser.windowMaximize().url(browser.launch_url);
        browser.waitForElementPresent('body');
        login["Login to Medicaid as Regular User"](browser);
    },

    // After all the test case executions, clear out the browser
    after: function (browser) {
        login["Verify logout from SPA and Wavier Dashboard as Regular User"](browser);
        console.log("Stopping test executions...")
        console.log('Closing down the browser instance...');
        browser.end();
    },

    'Submission List Verification > Submit new SPA': function (browser) {
        // Submit a SPA Report 
        const newSPA = require('../suites/OY2-3636_Suite_Smoke.js');
        generatedSPAID = newSPA['Verify error message > Submit new SPA'](browser);

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
        browser.useXpath().assert.containsText(submittedType, "SPA");

        // Data Submitted Verification 
        browser.useXpath().expect.element(submittedDate).to.be.visible;
        browser.useCss();
    },

    /*

    'Submission List Verification > Respond to SPA RAI': function (browser) {
        const spaRAI = require('../cases/OY2-2218_Test_SPA_Respond_To_SPA_RAI');
        spaRAI["Click on 'Respond to SPA RAI'"](browser);

        // Enter existing SPA ID 
        let selector = '@transmittal';
        const spa = browser.page.spaBasePage();
        spa.click(selector);
        spa.setValue(selector, generatedSPAID);
        browser.pause(1000);

        // upload a file 
        console.log("About to upload a file")
        let fileUploadElem = "[name='uploader-input-0']";
        let filePath = require('path').resolve(__dirname + '/files/file.docx')
        browser.useCss().setValue(fileUploadElem, filePath).pause(1000);

        spaRAI["Enter Comments"](browser);
        browser.useCss().click("[value='Submit']").pause(500);

        // Verify the submitted Content 
        let submittedIDNumber = "//table[@class='submissions-table']//tr[1]/td[1]/a";
        let submittedType = "//table[@class='submissions-table']//tr[1]/td[2]/span";
        let submittedDate = "//table[@class='submissions-table']//tr[1]/td[3]";

        // SPA ID Verification 
        browser.useXpath().expect.element(submittedIDNumber).to.be.visible;
        browser.useXpath().assert.containsText(submittedIDNumber, generatedSPAID);

        // Submitted Type Verification 
        browser.useXpath().expect.element(submittedType).to.be.visible;
        browser.useXpath().assert.containsText(submittedType, "SPA RAI");

        // Data Submitted Verification 
        browser.useXpath().expect.element(submittedDate).to.be.visible;
    },

    'Submission List Verification > Respond to SPA RAI': function (browser) {
        const spaWaiver = require('../cases/OY2-2218_Test_SPA_Submit_New_Waiver');
        spaWaiver["Click on 'Submit new Waiver'"](browser);

        browser.useCss().click("select#actionType");
        browser.useCss().click("select#actionType > option[value='new']");
        browser.useCss().click("select#waiverAuthority");
        browser.useCss().click("select#waiverAuthority > option[value='1915(b)(4)']");

        generatedWaiverID = spaWaiver["Enter Waiver Number"](browser);
        spaWaiver["Upload Documents"](browser);
        spaWaiver["Enter Comments"](browser);
        browser.useCss().click("[value='Submit']").pause(500);

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

    },

    'Submission List Verification > Respond to 1915(b) Waiver RAI': function (browser) {
        const waiverRAI = require('../cases/OY2-2218_Test_SPA_Respond_To_1915b_Waiver_RAI');
        waiverRAI["Click on Respond to 1915(b) Waiver RAI"](browser);
        browser.useCss().setValue('input#transmittalNumber', generatedWaiverID);
        waiverRAI["Upload Documents"](browser);
        waiverRAI["Enter Comments"](browser);
        browser.useCss().click("[value='Submit']").pause(500);

        // Verify the submitted SPA Report Content 
        let submittedIDNumber = "//table[@class='submissions-table']//tr[1]/td[1]/a";
        let submittedType = "//table[@class='submissions-table']//tr[1]/td[2]/span";
        let submittedDate = "//table[@class='submissions-table']//tr[1]/td[3]";

        // ID Verification 
        browser.useXpath().expect.element(submittedIDNumber).to.be.visible;
        browser.useXpath().assert.containsText(submittedIDNumber, generatedWaiverID);

        // Submitted Type Verification 
        browser.useXpath().expect.element(submittedType).to.be.visible;
        browser.useXpath().assert.containsText(submittedType, "Waiver RAI");

        // Data Submitted Verification 
        browser.useXpath().expect.element(submittedDate).to.be.visible;
    },

    "Submission List Verification > Submit a Temporary Request Extension": function (browser) {
        const tempExt = require('../cases/OY2-2218_Test_SPA_Request_Temp_Extension');
        tempExt["Click on 'Request Temporary Extension form - 1915(b) and 1915(c)'"](browser);
        browser.useCss().setValue('input#transmittalNumber', generatedWaiverID);
        tempExt["Upload Documents"](browser);
        tempExt["Enter Comments"](browser);
        browser.useCss().click("[value='Submit']").pause(500);

        // Verify the submitted SPA Report Content 
        let submittedIDNumber = "//table[@class='submissions-table']//tr[1]/td[1]/a";
        let submittedType = "//table[@class='submissions-table']//tr[1]/td[2]/span";
        let submittedDate = "//table[@class='submissions-table']//tr[1]/td[3]";

        // ID Verification 
        browser.useXpath().expect.element(submittedIDNumber).to.be.visible;
        browser.useXpath().assert.containsText(submittedIDNumber, generatedWaiverID);

        // Submitted Type Verification 
        browser.useXpath().expect.element(submittedType).to.be.visible;
        browser.useXpath().assert.containsText(submittedType, "Temporary Extension Request");

        // Data Submitted Verification 
        browser.useXpath().expect.element(submittedDate).to.be.visible;
        browser.useCss();
    }
    */

