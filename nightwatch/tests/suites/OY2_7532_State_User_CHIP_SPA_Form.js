const login = require('../cases/OY2-1494_Test_SPA_Login');

let spaCHIPId;
module.exports = {
    "@tags": ["smoke", "regression-soon"],

    before: function (browser, testData = { 
        name: browser.globals.devuser,
        pass: browser.globals.devpass,
        state: "MD"}) {
        login.beforeEach(browser);
        login['Login to SPA and Waiver Dashboard'](browser,testData);
    },

    after: function (browser) {
       login.afterEach(browser);
    },

    'State user check the Submit New CHIP SPA form': function (browser) {
        // Go to Submit New CHIP SPA page
        browser.useCss().click("button#chipSpaBtn");
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
}