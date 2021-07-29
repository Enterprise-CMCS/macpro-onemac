// Updated by: Guli
// Date      :03/09/2021
// The automated UI test scripts that belongs to this module has 
// element location related problem, we will be disabling this test 
// until these issues are refactored and resolved. 3/25/2021
// Updated on 6/21/2021



//const loginModule = require('../cases/OY2-1494_Test_SPA_Login');
const login = require('../suites/OY2_9999_Login');
const submitWaiver = require('../suites/OY2_4807_Validate_Waiver_Form_Logic');
let pdfElement = "//span[text()='adobe.pdf']";
let excelElement = "//span[text()='excel.xlsx']";
let fileElement = "//span[text()='file.docx']";
let picElement = "//span[text()='picture.jpg']";
let textElement = "//span[text()='textnotes.txt']";
module.exports = {
    "@tags": ["smoke", "regression-soon"],
  
    before: function (browser) {
        login.beforeEach(browser);
        login['Login with state submitter user'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);
    },

    'Verify the attachment types for SPA': function (browser) {
        //browser.click("button#spaSubmitBtn");
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        let fileUploadElem = "[name='uploader-input-0']";
        // Verify upload PDF file 
        let filePath = require('path').resolve(__dirname + '/files/adobe.pdf')
        browser.useCss().setValue(fileUploadElem, filePath);
        browser.pause(500);
        browser.useXpath().expect.element(pdfElement).to.be.visible;
        browser.pause(500);
        //browser.useCss().click("[fill='currentColor']");
        browser.useXpath().click("//button[@class='uploader-clear-button']");
        // Verify upload EXCEL file 
        filePath = require('path').resolve(__dirname + '/files/excel.xlsx')
        browser.useCss().setValue(fileUploadElem, filePath);
        browser.pause(500);
        browser.useXpath().expect.element(excelElement).to.be.visible;
        browser.pause(500);
        //browser.useCss().click("[fill='currentColor']");
        browser.useXpath().click("//button[@class='uploader-clear-button']");
        // Verify upload DOC file 
        filePath = require('path').resolve(__dirname + '/files/file.docx')
        browser.useCss().setValue(fileUploadElem, filePath);
        browser.pause(500);
        browser.useXpath().expect.element(fileElement).to.be.visible;
        browser.pause(500);
        //browser.useCss().click("[fill='currentColor']");
        browser.useXpath().click("//button[@class='uploader-clear-button']");
        // Verify upload PICTURE file 
        filePath = require('path').resolve(__dirname + '/files/picture.jpg')
        browser.useCss().setValue(fileUploadElem, filePath);
        browser.pause(500);
        browser.useXpath().expect.element(picElement).to.be.visible;
        browser.pause(500);
        //browser.useCss().click("[fill='currentColor']");
        browser.useXpath().click("//button[@class='uploader-clear-button']");
        // Verify upload TEXT file 
        filePath = require('path').resolve(__dirname + '/files/textnotes.txt')
        browser.useCss().setValue(fileUploadElem, filePath);
        browser.pause(500);
        browser.useXpath().expect.element(textElement).to.be.visible;
        browser.pause(500);
        //browser.useCss().click("[fill='currentColor']").pause(1000);
        browser.useXpath().click("//button[@class='uploader-clear-button']");
        //browser.back();
        browser.useXpath().click("//a[@id='dashboardLink']");
        browser.useCss();
    },

    'Verify the multiple attachment types for SPA': function (browser) {
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        //browser.useCss().click("button#spaSubmitBtn");
        let fileUploadElem = "[name='uploader-input-0']";
        // Verify upload PDF file 
        let filePath = require('path').resolve(__dirname + '/files/adobe.pdf')
        browser.useCss().setValue(fileUploadElem, filePath).pause(500);
        browser.useXpath().expect.element(pdfElement).to.be.visible;
        // Verify upload EXCEL file 
        filePath = require('path').resolve(__dirname + '/files/excel.xlsx')
        browser.useCss().setValue(fileUploadElem, filePath).pause(500);
        browser.useXpath().expect.element(excelElement).to.be.visible;
        // Verify upload DOC file 
        filePath = require('path').resolve(__dirname + '/files/file.docx')
        browser.useCss().setValue(fileUploadElem, filePath).pause(500);
        browser.useXpath().expect.element(fileElement).to.be.visible;
        // Verify upload PICTURE file 
        filePath = require('path').resolve(__dirname + '/files/picture.jpg')
        browser.useCss().setValue(fileUploadElem, filePath).pause(500);
        browser.useXpath().expect.element(picElement).to.be.visible;
        // Verify upload TEXT file 
        filePath = require('path').resolve(__dirname + '/files/textnotes.txt')
        browser.useCss().setValue(fileUploadElem, filePath).pause(500);
        browser.useXpath().expect.element(textElement).to.be.visible;
        //browser.back();
        let dashboard_link = "//a[@id='dashboardLink']";
        browser.useXpath().click(dashboard_link);
        //browser.useCss();
    },

    'Verify the uploaded attachment in the submission lists for the submitted SPA/Waiver': function (browser) {
        browser.useCss();
        submitWaiver["Verify that submitter user can submit a New Waiver"](browser);
        let waiverNumber = '//tbody/tr[1]/td/a';
        let attachementElement = ".form-container a[target='_blank']";
        browser.useXpath().click(waiverNumber).pause(4000);
        browser.useCss().expect.element(attachementElement).to.be.visible;
        //browser.back();
        browser.useXpath().click("//a[@id='dashboardLink']");
    },

    'Verify “No file chosen” case': function (browser) {
        //browser.useCss().click("button#spaSubmitBtn").pause(4000);
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.useCss().verify.containsText("tr:nth-of-type(1) > td:nth-of-type(3)", "No file chosen"); 
        //browser.back();
        let dashboard_link = "//a[@id='dashboardLink']";
        browser.useXpath().click(dashboard_link);
    },
}