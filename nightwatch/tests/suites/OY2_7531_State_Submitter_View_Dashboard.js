let generatedSPAID;
let generatedWaiverID;
const login = require('./OY2_9999_Login');

module.exports = {
    "@tags": ["smoke", "regression-soon"],

    before: function (browser) {
        login.beforeEach(browser);
        login['Login with state submitter user'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);

    },

    'User can see their state access management': function (browser) {
        let my_account_button = 'button#myAccountLink';
        let manage_account_link = 'a#manageAccountLink';

        // Click on button My Account and get access to account management
        browser.click(my_account_button);
        browser.click(manage_account_link);
        browser.pause(2000);
        //check on state access management for state submitter user 

        let state_access_management = "(//h3)[5]";

        let maryland = "(//div[@class='state-access-card']/dt)[1]";
        let maryland_access_granted = "(//div[@class='state-access-card']/dd/em)[1]";
        //check if each element is visible
        browser.useXpath().expect.element(state_access_management).to.be.visible;
        browser.useXpath().expect.element(maryland_access_granted).to.be.visible;
        browser.useXpath().expect.element(maryland).to.be.visible;
        browser.useCss();
        let dashboard = "(//div[@class ='nav-left-links']/a)[2]";
        browser.pause(2000);
        browser.useXpath().waitForElementVisible(dashboard, 1000);
        browser.useXpath().click(dashboard);
        browser.useCss();
        browser.pause(2000);
    },

    'Verify Submitter user can submit new SPA': function (browser) {
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
        browser
        .useCss()
        .waitForElementPresent("[value='Submit']", 1000)
        .click("[value='Submit']").pause(8000);
        
        browser.refresh();
        browser.pause(5000);
        browser.refresh();

        // Verify the SPA on Submission List 
        // browser.useXpath().click("//a[@id='new-submission-button']");
        //browser.useXpath().waitForElementVisible("(//table[@class='submissions-table']/tbody/tr/td/a)[1]", 1000);
        // browser.refresh();
        browser.useXpath().waitForElementPresent('xpath','(//td[@role="cell"])[1]').verify.containsText('(//td[@role="cell"])[1]', spaID);
        browser.useCss();
        // return spaID;
        generatedSPAID = spaID;
    },

    'Submit new SPA with state name and verify if it shows under submission list': function (browser) {
        // Submit a SPA Report 
        // const newSPA = require('./OY2-3636_Suite_Smoke.js');
        // generatedSPAID = newSPA['Verify Submitter user can submit new SPA'](browser);
        // Verify the submitted Content 
        let submittedIDNumber = "//table[@class='submissions-table']//tr[1]/td[1]/a";
        let submittedType = "//table[@class='submissions-table']//tr[1]/td[2]/span";
        let submittedDate = "//table[@class='submissions-table']//tr[1]/td[3]";
        // SPA ID Verification
        browser.useXpath().expect.element(submittedIDNumber).to.be.visible;
        browser.pause(5000);
        browser.useXpath().assert.containsText(submittedIDNumber, generatedSPAID);
        browser.pause(3000);
        // Submitted Type Verification
        browser.useXpath().expect.element(submittedType).to.be.visible;
        browser.pause(1000);
        browser.useXpath().assert.containsText(submittedType, "Medicaid SPA").pause(1000);
        // Data Submitted Verification
        browser.useXpath().expect.element(submittedDate).to.be.visible;
        browser.useXpath().assert.containsText("(//tbody/tr/td)[3]","MD");
        browser.useCss();
    },
}
