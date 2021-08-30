/*
// The automated UI test scripts that belongs to this module has 
// element location related problem, we will be disabling this test 
// until these issues are refactored and resolved. 3/25/2021


const locator = '(//*[@disabled])';
const login = require('../suites/OY2_9999_Login');
let spaID;
let generatedWaiverID;

module.exports = {
    "@tags": ["smoke"],

    before: function (browser) {
        login.beforeEach(browser);
        login['Login with state submitter user'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);
    },

    // DONE 
    'Verify Submitter user can submit new SPA': function (browser) {
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(3000);
        //browser.useXpath().click("//button[text()='Submit New Medicaid SPA']");
        // create random SPA ID
        let num1 = Math.floor(Math.random() * Math.floor(80)) + 10;
        let num2 = Math.floor(Math.random() * Math.floor(80)) + 10;
        let num3 = Math.floor(Math.random() * Math.floor(80)) + 10;
        // SS-YY-NNNN
        //changed the state to MD
        spaID = 'MD-' + num1 + '-' + num2 + '' + num3;
        // input the SPA ID number 
        browser.useCss().setValue("input#transmittalNumber", spaID);
        // upload the first documents
        let fileUploadElem = "[name='uploader-input-0']";
        browser.assert.elementPresent(fileUploadElem);
        let filePath = require('path').resolve(__dirname + '/files/file.docx');
        browser.setValue(fileUploadElem, filePath);

        // upload the second documents
        fileUploadElem = "[name='uploader-input-1']";
        browser.assert.elementPresent(fileUploadElem);
        filePath = require('path').resolve(__dirname + '/files/file.docx');
        browser.setValue(fileUploadElem, filePath);

        // write the Summary 
        let phrase = "This is a test, test, test";
        browser.setValue('textarea', phrase);

        // Submit the new SPA 
        browser.useCss().waitForElementPresent("[value='Submit']", 1000);
        browser.useCss().click("[value='Submit']").pause(8000);
        
        // Verify the SPA on Submission List 
        // browser.useXpath().click("//a[@id='new-submission-button']");
        //browser.useXpath().waitForElementVisible("(//table[@class='submissions-table']/tbody/tr/td/a)[1]", 1000);
        // browser.refresh();
        let element = '//tbody/tr[1]/td[1]/a';
        let timeout = 5000;
        browser.useXpath().waitForElementVisible(element,timeout); 
        browser.useXpath().verify.containsText(element, spaID).pause(8000);
        browser.useCss();
        return spaID;
    },

    
    // DONE
    // 'Verify SPA and Waiver Dashboard > Respond to RAI for SPA Submission': function (browser) {
    //     browser.useCss().click("button#spaRaiBtn");
    //     browser.useCss().setValue("input#transmittalNumber", spaID);

    //     // upload a document and make a comment 
    //     let fileUploadElem = "[name='uploader-input-0']";
    //     let filePath = require('path').resolve(__dirname + '/files/file.docx')
    //     browser.useCss().setValue(fileUploadElem, filePath).pause(1000);
    //     browser.useCss().setValue("textarea", "This is a test, just a test");

    //     // click ["Submit"] button 
    //     browser.useCss().click("[value='Submit']").pause(1000);

    //     // Verify the submitted Content 
    //     let submittedIDNumber = "//table[@class='submissions-table']//tr[1]/td[1]/a";
    //     let submittedType = "//table[@class='submissions-table']//tr[1]/td[2]/span";
    //     let submittedDate = "//table[@class='submissions-table']//tr[1]/td[3]";
    //     // SPA ID Verification 
    //     browser.useXpath().expect.element(submittedIDNumber).to.be.visible;
    //     browser.useXpath().assert.containsText(submittedIDNumber, spaID);
    //     browser.useXpath().expect.element(submittedType).to.be.visible;
    //     browser.useXpath().assert.containsText(submittedType, "SPA RAI");
    //     browser.useXpath().expect.element(submittedDate).to.be.visible;
    //     browser.useCss();
    // },

    // DONE 
    // 'Verify Submitter user can submit 1915(b) Waiver Action': function (browser) {
    //     browser.useCss().click("button#waiverBtn");
    //     browser.useCss().click("select#action-type");
    //     browser.useCss().click("select#action-type > option[value='new']");
    //     browser.useCss().click("select#waiver-authority");
    //     browser.useCss().click("select#waiver-authority > option[value='1915(b)(4)']");

    //     // Enter Waiver number
    //     let num1 = Math.floor(Math.random() * Math.floor(80)) + 10;
    //     let num2 = Math.floor(Math.random() * Math.floor(80)) + 10;
    //     // SS-YY-NNNN
    //     generatedWaiverID = 'VA.' + num1 + '' + num2;
    //     // input the SPA ID number 
    //     browser.useCss().setValue("input#transmittalNumber", generatedWaiverID);

    //     // upload a document and make a comment 
    //     let fileUploadElem = "[name='uploader-input-0']";
    //     let filePath = require('path').resolve(__dirname + '/files/file.docx')
    //     browser.useCss().setValue(fileUploadElem, filePath).pause(5000);
    //     browser.useCss().setValue("textarea", "This is a test, just a test");

    //     // click ["Submit"] button 
    //     browser.useCss().click("[value='Submit']").pause(1000);

    //     // Verify the submitted SPA Report Content 
    //     let submittedIDNumber = "//table[@class='submissions-table']//tr[1]/td[1]/a";
    //     let submittedType = "//table[@class='submissions-table']//tr[1]/td[2]/span";
    //     let submittedDate = "//table[@class='submissions-table']//tr[1]/td[3]";
    //     // Waiver ID Verification 
    //     browser.useXpath().expect.element(submittedIDNumber).to.be.visible;
    //     browser.useXpath().assert.containsText(submittedIDNumber, generatedWaiverID);
    //     // Submitted Type Verification 
    //     browser.useXpath().expect.element(submittedType).to.be.visible;
    //     browser.useXpath().assert.containsText(submittedType, "Waiver");
    //     // Data Submitted Verification 
    //     browser.useXpath().expect.element(submittedDate).to.be.visible;
    //     browser.useCss();
    // },

    // DONE 
    // 'Verify SPA and Waiver Action Content': function (browser) {
    //     browser.useXpath().click("//table[@class='submissions-table']//tr[1]/td[1]/a");

    //     // Verify Action Type
    //     browser.useXpath().assert.containsText("(//div[@class='ds-c-review__body'])[1]", "new");

    //     // Verify Waiver Authority
    //     browser.useXpath().assert.containsText("(//div[@class='ds-c-review__body'])[2]", "1915(b)(4)");

    //     // Verify Waiver Authority
    //     browser.useXpath().assert.containsText("(//div[@class='ds-c-review__body'])[3]", generatedWaiverID);

    //     // Verify Waiver Authority
    //     browser.useXpath().assert.containsText("(//div[@class='ds-c-review__body'])[4]", "2021");

    //     browser.back();  // go back to previous page
    // },


    // 'Verify Submitter user can submit Respond to 1915(b) Waiver RAI': function (browser) {
    //     browser.pause(2000);
    //     browser.useCss().click("button#waiverRaiBtn");
    //     browser.useCss().setValue("input#transmittalNumber", generatedWaiverID);

    //     // upload a document and make a comment 
    //     let fileUploadElem = "[name='uploader-input-0']";
    //     let filePath = require('path').resolve(__dirname + '/files/file.docx')
    //     browser.useCss().setValue(fileUploadElem, filePath).pause(5000);
    //     browser.useCss().setValue("textarea", "This is a test, just a test");

    //     // click ["Submit"] button 
    //     browser.useCss().click("[value='Submit']").pause(1000);

    //     // Verify the submitted SPA Report Content 
    //     let submittedIDNumber = "//table[@class='submissions-table']//tr[1]/td[1]/a";
    //     let submittedType = "//table[@class='submissions-table']//tr[1]/td[2]/span";
    //     let submittedDate = "//table[@class='submissions-table']//tr[1]/td[3]";
    //     // Waiver ID Verification 
    //     browser.useXpath().expect.element(submittedIDNumber).to.be.visible;
    //     browser.useXpath().assert.containsText(submittedIDNumber, generatedWaiverID);
    //     // Submitted Type Verification 
    //     browser.useXpath().expect.element(submittedType).to.be.visible;
    //     browser.useXpath().assert.containsText(submittedType, "Waiver RAI");
    //     // Data Submitted Verification 
    //     browser.useXpath().expect.element(submittedDate).to.be.visible;
    //     browser.useCss();
    // },

    // ------------------- VERIFYING ERROR MESSSAGE ---------------------------------- //
    // // DONE 
    //     'Verify error message > Submit new SPA': function (browser) {
    //     let link_submitNewSPA = 'button#spaSubmitBtn';
    //     let bttn_submit = "[value='Submit']";

    //     // Go to New SAP page and click Submit button
    //     browser.click(link_submitNewSPA);
    //     browser.click(bttn_submit);

    //     let error_pageAlert = '.ds-c-alert__heading';
    //     browser.waitForElementPresent(error_pageAlert);
    //     browser.verify.containsText(error_pageAlert, 'There was a problem submitting your form.');

    //     // Check for each input error message is visible to the user
    //     let count = 1;
    //     let locator = "(//div[@class='ds-u-color--error'])";
    //     browser.elements('xpath', locator, function (elements) {
    //         elements.value.forEach(function (element) {
    //             let xpath = locator.concat('[' + count + ']');
    //             browser.useXpath().assert.visible(xpath);
    //             count++;
    //         })
    //         browser.useCss();
    //     });

    //     browser.back();
    // },

    // DONE 
    // 'Verify error message > Respond to SPA RAI': function (browser) {
    //     let link_respondToSPARAI = 'button#spaRaiBtn';
    //     let bttn_submit = "[value='Submit']";

    //     // Go to Respond to SPA RAI page and click Submit button
    //     browser.click(link_respondToSPARAI);
    //     browser.click(bttn_submit);

    //     // Check for page error header after clicking Submit button
    //     // without any inputs to the required fields
    //     let error_pageAlert = '.ds-c-alert__heading';
    //     browser.waitForElementPresent(error_pageAlert);
    //     browser.verify.containsText(error_pageAlert, 'There was a problem submitting your form.');

    //     // Check for each input error message is visible to the user
    //     let count = 1;
    //     let locator = "(//div[@class='ds-u-color--error'])";
    //     browser.elements('xpath', locator, function (elements) {
    //         elements.value.forEach(function (element) {
    //             let xpath = locator.concat('[' + count + ']');
    //             browser.useXpath().assert.visible(xpath);
    //             count++;
    //         })
    //         browser.useCss();
    //     });

    //     browser.back();
    // },

    // DONE 
    // 'Verify error message > Submit new Waiver': function (browser) {
    //     let link_submitNewWaiver = 'button#waiverBtn';
    //     let bttn_submit = "[value='Submit']";

    //     // Go to Submit new Waiver page and click Submit button
    //     browser.click(link_submitNewWaiver);
    //     browser.click(bttn_submit);

    //     // Check for page error header after clicking Submit button
    //     // without any inputs to the required fields
    //     let error_pageAlert = '.ds-c-alert__heading';
    //     browser.waitForElementPresent(error_pageAlert);
    //     browser.verify.containsText(error_pageAlert, 'There was a problem submitting your form.');

    //     // Check for each input error message is visible to the user
    //     let count = 1;
    //     let locator = "(//div[@class='ds-u-color--error'])";
    //     browser.elements('xpath', locator, function (elements) {
    //         elements.value.forEach(function (element) {
    //             let xpath = locator.concat('[' + count + ']');
    //             browser.useXpath().assert.visible(xpath);
    //             count++;
    //         })
    //         browser.useCss();
    //     });

    //     browser.back();
    // },

    // 'Verify error message > Respond to 1915(c) Waiver RAI': function (browser) {
    //     let link_RespondTo1915 = 'button#waiverRaiBtn';
    //     let bttn_submit = "[value='Submit']";

    //     // Go to Submit new Waiver page and click Submit button
    //     browser.useCss().click(link_RespondTo1915);
    //     browser.useCss().click(bttn_submit);


    //     // Check for page error header after clicking Submit button
    //     // without any inputs to the required fields
    //     let error_pageAlert = '.ds-c-alert__heading';
    //     browser.waitForElementPresent(error_pageAlert);
    //     browser.verify.containsText(error_pageAlert, 'There was a problem submitting your form.');

    //     // Check for each input error message is visible to the user
    //     // Check for each input error message is visible to the user
    //     let count = 1;
    //     let locator = "(//div[@class='ds-u-color--error'])";
    //     browser.elements('xpath', locator, function (elements) {
    //         elements.value.forEach(function (element) {
    //             let xpath = locator.concat('[' + count + ']');
    //             browser.useXpath().assert.visible(xpath);
    //             count++;
    //         })
    //         browser.useCss();
    //     });

    //     browser.back();

    // },

//     'Verify error message > Request Temporary Extension form - 1915(b) and 1915(c)': function (browser) {
//         let link_requestTempExtension = 'button#waiverExtBtn';
//         let bttn_submit = "[value='Submit']";

//         // Go to Submit new Waiver page and click Submit button
//         browser.click(link_requestTempExtension);
//         browser.click(bttn_submit);

//         // Check for page error header after clicking Submit button
//         // without any inputs to the required fields
//         let error_pageAlert = '.ds-c-alert__heading';
//         browser.waitForElementPresent(error_pageAlert);
//         browser.verify.containsText(error_pageAlert, 'There was a problem submitting your form.');

//         // Check for each input error message is visible to the user
//         let count = 1;
//         let locator = "(//div[@class='ds-u-color--error'])";
//         browser.elements('xpath', locator, function (elements) {
//             elements.value.forEach(function (element) {
//                 let xpath = locator.concat('[' + count + ']');
//                 browser.useXpath().assert.visible(xpath);
//                 count++;
//             })
//             browser.useCss();
//         });

//         browser.back();  // go back to previous page
//     }
};
//oy2-5226-nightwatch-new 
*/