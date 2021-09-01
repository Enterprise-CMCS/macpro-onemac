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


    'State Submitter user check the SPA ID Format in New Medicaid SPA Link': function (browser) {
        //let medicaid_SPA_Link = "//button[@id='spaSubmitBtn']";
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        // Go to Submit New Medicaid SPA page
        //browser.useXpath().click(medicaid_SPA_Link);
        // Verify that Submit New Medicaid SPA page is displayed 
        browser.useCss().expect.element('form > h3:nth-of-type(1)').to.be.visible;

        // Enter Submit SPA ID 
        // Enter Waiver number
        let YY = Math.floor(Math.random() * Math.floor(80)) + 10;
        let NNNN = Math.floor(Math.random() * Math.floor(7999)) + 1000;
        //let xxxx = Math.floor(Math.random() * Math.floor(7999)) + 1000;
        // SS-YY-NNNN
        spaCHIPId = 'MD-' + YY + '-' + NNNN + '-A';
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

        // Go to Submit New Medicaid SPA page
        //browser.useXpath().click(medicaid_SPA_Link);
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        // Verify that Submit New Medicaid SPA page is displayed 
        browser.useCss().expect.element('form > h3:nth-of-type(1)').to.be.visible;
        YY = Math.floor(Math.random() * Math.floor(80)) + 10;
        NNNN = Math.floor(Math.random() * Math.floor(7999)) + 1000;
        //let xxxx = Math.floor(Math.random() * Math.floor(7999)) + 1000;
        // SS-YY-NNNN
        spaCHIPId = 'MD-' + YY + '-' + NNNN + '-';
        // input the SPA ID number 
        browser.useCss().setValue("input#transmittalNumber", spaCHIPId);
        // verify the error message
        browser.useXpath().expect.element("//div[@id='transmittalNumberStatusMsg']").to.be.visible;
        browser.useCss();
    },

    'State Submitter user check the SPA ID Format in Respond to Medicaid SPA RAI': function (browser) {
        let dashboard_link ='//a[@id="dashboardLink"]';
        //let medicaid_SPA_RAI_Link = "//button[@id='spaRaiBtn']";
        // Go to Submit New Medicaid SPA page
        browser.useXpath().click(dashboard_link);
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        //browser.useXpath().click(medicaid_SPA_RAI_Link);
        // Verify that Submit New Medicaid SPA page is displayed 
        browser.useCss().expect.element('form > h3:nth-of-type(1)').to.be.visible;
        let YY = Math.floor(Math.random() * Math.floor(80)) + 10;
        let NNNN = Math.floor(Math.random() * Math.floor(7999)) + 1000;
        //let xxxx = Math.floor(Math.random() * Math.floor(7999)) + 1000;
        // SS-YY-NNNN
        spaCHIPId = 'MD-' + YY + '-' + NNNN + '-2222222222';
        // input the SPA ID number 
        browser.useCss().setValue("input#transmittalNumber", spaCHIPId);
        // verify the error message
        browser.useXpath().expect.element("//div[@id='transmittalNumberStatusMsg']").to.be.visible;
        browser.useCss();
    },

    // 'State Submitter user check the SPA ID Format in New CHIP SPA Link': function (browser) {
    //     let dashboard_link ='//a[@id="dashboardLink"]';
    //     //let submit_CHIP_SPA_Link = "//button[@id='chipSpaBtn']";
    //     // Go to Submit New Medicaid SPA page
    //     browser.useXpath().click(dashboard_link);
    //     browser.useXpath().click("//a[@id='new-submission-button']");
    //     browser.pause(500);
    //     browser.useXpath().click("(//h4)[1]");
    //     browser.pause(500);
    //     browser.useXpath().click("(//h4)[3]");
    //     //browser.useXpath().click(submit_CHIP_SPA_Link);
    //     // Verify that Submit New Medicaid SPA page is displayed 
    //     browser.useCss().expect.element('form > h3:nth-of-type(1)').to.be.visible;
    //     let YY = Math.floor(Math.random() * Math.floor(80)) + 10;
    //     let NNNN = Math.floor(Math.random() * Math.floor(7999)) + 1000;
    //     //let xxxx = Math.floor(Math.random() * Math.floor(7999)) + 1000;
    //     // SS-YY-NNNN
    //     spaCHIPId = 'MD-' + YY + '-' + NNNN + '+';
    //     // input the SPA ID number 
    //     browser.useCss().setValue("input#transmittalNumber", spaCHIPId);
    //     // verify the error message
    //     browser.useXpath().expect.element("//div[@id='transmittalNumberStatusMsg']").to.be.visible;
    //     browser.useCss();
    // },
}