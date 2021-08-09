const login = require('../suites/OY2_9999_Login');
let spaCHIPId;
module.exports = {
    "@tags": ["smoke", "regression-soon"],


    before: function (browser) {
        login.beforeEach(browser);
        login['Login with state submitter user'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);
    },

    
    'State Submitter Waiver Submission Details Screen Enhancements': function (browser) {
        //check on Submission List Waiver Type
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
        browser.useCss().setValue("textarea", "This is a test for waiver");
        // click ["Submit"] button 
        browser.useCss().click("[value='Submit']").pause(1000);
        browser.pause(3000);
        browser.refresh();
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

        //click on waiver and verify the page
        browser.useXpath().click(submittedIDNumber);
        browser.pause(500);
        let waiver_action_details = "//h1";
        let date_submitted_title = "(//h2)[1]";
        let date = "(//div[@class='ds-c-review__body'])[1]";
        let waiver_action_details_title = "(//h2)[2]";
        let waiver_authority = "(//h3)[1]";
        let waiver_name = "(//div[@class='ds-c-review__body'])[2]";
        let action_type_title = "(//h3)[2]";
        let new_waiver = "(//div[@class='ds-c-review__body'])[3]";
        let waiver_number_title = "(//h3)[3]";
        let waiver_number = "(//div[@class='ds-c-review__body'])[4]";
        let attachments_title = "(//h2)[3]";
        let download_all_button = "//button[@class='ds-c-button ds-c-button--primary']";
        let attachment_one_name = "(//h3)[4]";
        let attachment_one_link = "//li[@class='choice-list-item']/a";
        let additional_information_title = "(//h2)[4]";
        let additional_information = "(//div[@class='ds-c-review__body'])[5]";
        browser.useXpath().expect.element(waiver_action_details).to.be.visible;
        browser.useXpath().expect.element(date_submitted_title).to.be.visible;
        browser.useXpath().expect.element(date).to.be.visible;
        browser.useXpath().expect.element(waiver_action_details_title).to.be.visible;
        browser.useXpath().expect.element(waiver_authority).to.be.visible;
        browser.useXpath().expect.element(waiver_name).to.be.visible;
        browser.useXpath().expect.element(action_type_title).to.be.visible;
        browser.useXpath().expect.element(new_waiver).to.be.visible;
        browser.useXpath().expect.element(waiver_number_title).to.be.visible;
        browser.useXpath().expect.element(waiver_number).to.be.visible;
        browser.useXpath().expect.element(attachments_title).to.be.visible;
        browser.useXpath().expect.element(download_all_button).to.be.visible;
        browser.useXpath().expect.element(attachment_one_name).to.be.visible;
        browser.useXpath().expect.element(attachment_one_link).to.be.visible;
        browser.useXpath().expect.element(additional_information_title).to.be.visible;
        browser.useXpath().expect.element(additional_information).to.be.visible;
        //click on download all button
        browser.useXpath().click(download_all_button);
        browser.pause(500);
    },
    

    'State Submitter SPA Submission Details Screen Enhancements': function (browser) {

        let dashboard_link = "//a[@id='dashboardLink']";
        browser.useXpath().moveToElement(dashboard_link, 10, 10).waitForElementVisible(dashboard_link, 500);
        browser.useXpath().click(dashboard_link);
        browser.pause(1000);
        //check on Submission List SPA Type
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        //browser.useXpath().click("//button[text()='Submit New Medicaid SPA']");
        // create random SPA ID
        let num1 = Math.floor(Math.random() * Math.floor(80)) + 10;
        let num2 = Math.floor(Math.random() * Math.floor(80)) + 10;
        let num3 = Math.floor(Math.random() * Math.floor(80)) + 10;
        // SS-YY-NNNN
        //changed the state to MD
        let spaID = 'MD-' + num1 + '-' + num2 + '' + num3;
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
        browser.click("[value='Submit']").pause(2000);
        
        //browser.refresh();
        browser.pause(3000);
        browser.refresh();

        //click on SPA and verify the page
        let spa_id_top = "//td[@id='transmittalNumber-0']/a";
        browser.useXpath().waitForElementPresent(spa_id_top, 1000);
        browser.refresh();
        browser.useXpath().click(spa_id_top);
        browser.pause(500);
        let medicaid_spa_submission_details = "//h1";
        let date_submitted_title = "(//h2)[1]";
        let date = "(//div[@class='ds-c-review__body'])[1]";
        let medicaid_spa_details_title = "(//h2)[2]";
        let spa_id_title = "(//h3)[1]";
        let spa_id = "(//div[@class='ds-c-review__body'])[2]";
        let attachments_title = "(//h2)[3]";
        let download_all_button = "//button[@class='ds-c-button ds-c-button--primary']";
        let attachment_one_name = "(//h3)[2]";
        let attachment_one_link = "(//li[@class='choice-list-item']/a)[1]";
        let attachment_two_name = "(//h3)[3]";
        let attachment_two_link = "(//li[@class='choice-list-item']/a)[2]";
        let additional_information_title = "(//h2)[4]";
        let additional_information = "(//div[@class='ds-c-review__body'])[3]";
        browser.useXpath().expect.element(medicaid_spa_submission_details).to.be.visible;
        browser.useXpath().expect.element(date_submitted_title).to.be.visible;
        browser.useXpath().expect.element(date).to.be.visible;
        browser.useXpath().expect.element(medicaid_spa_details_title).to.be.visible;
        browser.useXpath().expect.element(spa_id_title).to.be.visible;
        browser.useXpath().expect.element(spa_id).to.be.visible;
        
        browser.useXpath().expect.element(attachments_title).to.be.visible;
        browser.useXpath().expect.element(download_all_button).to.be.visible;
        browser.useXpath().expect.element(attachment_one_name).to.be.visible;
        browser.useXpath().expect.element(attachment_one_link).to.be.visible;
        browser.useXpath().expect.element(attachment_two_name).to.be.visible;
        browser.useXpath().expect.element(attachment_two_link).to.be.visible;
        browser.useXpath().expect.element(additional_information_title).to.be.visible;
        browser.useXpath().expect.element(additional_information).to.be.visible;
        //click on download all button
        browser.useXpath().click(download_all_button);
        browser.pause(500);
    },
}