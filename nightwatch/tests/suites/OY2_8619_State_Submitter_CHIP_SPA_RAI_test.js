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

    'State Submitter user check the Submit New CHIP SPA form': function (browser) {
        // Go to Submit New CHIP SPA page
        //browser.useCss().click("button#chipSpaBtn");
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[3]");
        // Verify that Submit New CHIP SPA page is displayed 
        browser.useCss().expect.element('form > h3:nth-of-type(1)').to.be.visible;

        // Enter Submit SPA ID 
        // Enter Waiver number
        let YY = Math.floor(Math.random() * Math.floor(80)) + 10;
        let NNNN = Math.floor(Math.random() * Math.floor(7999)) + 1000;
        let xxxx = Math.floor(Math.random() * Math.floor(7999)) + 1000;
        // SS-YY-NNNN
        spaCHIPId = 'MD-' + YY + '-' + NNNN + '-' + xxxx;
        // input the SPA ID number 
        browser.useCss().setValue("input#transmittalNumber", spaCHIPId);

        // Take care of the attachement. 
        // First File Uplaoding 
        let fileUploadElem = "[name='uploader-input-0']";
        let filePath = require('path').resolve(__dirname + '/files/adobe.pdf')
        browser.useCss().setValue(fileUploadElem, filePath).pause(1000);

        // Second File Uplaoding 
        fileUploadElem = "[name='uploader-input-1']";
        filePath = require('path').resolve(__dirname + '/files/excel.xlsx')
        browser.useCss().setValue(fileUploadElem, filePath).pause(1000);

        // Third File Uplaoding 
        fileUploadElem = "[name='uploader-input-2']";
        filePath = require('path').resolve(__dirname + '/files/file.docx')
        browser.useCss().setValue(fileUploadElem, filePath).pause(1000);

        // Enter Additional Information 
        browser.useXpath().moveToElement('//textarea', 10, 10).pause(500);
        browser.useXpath().setValue('//textarea', 'This is a test, test, test');

        // Click Submit 
        browser.useCss().click("[value='Submit']").pause(1000);

        // Verify the CHIP SPA was submitted 
        browser.useXpath().verify.containsText("(//tbody/tr)[1]/td[1]/a", spaCHIPId);
        browser.useCss();
    },

    'Verify that State Submitter User can enter Waiver number in RAI form with correct format': function (browser) {
        browser.pause(1000);
        //browser.useXpath().click("//button[text()='Respond to CHIP SPA RAI']").pause(1000);
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[4]");
        browser.useXpath().expect.element("//div[@class='form-subheader-message']").to.be.present;

        browser.useCss().clearValue("input#transmittalNumber");
        browser.useCss().setValue("input#transmittalNumber", "MD-89-1111-1111");
        browser.useXpath().expect.element("//input[@id='transmittalNumber']").to.be.visible;
        browser.pause(3000);
        browser.useCss().clearValue("input#transmittalNumber");

        // input the SPA ID number 
        browser.useCss().setValue("input#transmittalNumber", spaCHIPId);

        // Take care of the attachement. 
        // First File Uplaoding 
        let fileUploadElem = "[name='uploader-input-0']";
        let filePath = require('path').resolve(__dirname + '/files/adobe.pdf')
        browser.useCss().setValue(fileUploadElem, filePath).pause(1000);

        // Second File Uplaoding 
        fileUploadElem = "[name='uploader-input-1']";
        filePath = require('path').resolve(__dirname + '/files/excel.xlsx')
        browser.useCss().setValue(fileUploadElem, filePath).pause(1000);

        // Enter Additional Information 
        browser.useXpath().moveToElement('//textarea', 10, 10).pause(500);
        browser.useXpath().setValue('//textarea', 'This is a test, test, test');

        // Click Submit 
        browser.useCss().click("[value='Submit']").pause(4000);

        // Verify the CHIP SPA was submitted 
        browser.useXpath().verify.containsText("(//tbody/tr)[1]/td[1]/a", spaCHIPId).pause(3000);
        browser.useCss();
    }
}