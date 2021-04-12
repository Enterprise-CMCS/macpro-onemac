// Updated by: Guli
// Date      :03/09/2021
// The automated UI test scripts that belongs to this module has 
// element location related problem, we will be disabling this test 
// until these issues are refactored and resolved. 3/25/2021

/*
const loginModule = require('../cases/OY2-1494_Test_SPA_Login');
const submitWaiver = require('../suites/OY2_4807_Validate_Waiver_Form_Logic');
let pdfElement = "//span[text()='adobe.pdf']";
let excelElement = "//span[text()='excel.xlsx']";
let fileElement = "//span[text()='file.docx']";
let picElement = "//span[text()='picture.jpg']";
let textElement = "//span[text()='textnotes.txt']";
module.exports = {
    "@tags": ["smoke", "attachmentType"],
    before: function (browser) {
        console.log('Setting up the browser instance...');
        console.log('Opening the browser...')
        console.log('Maximizing the browser window size...');
        browser.windowMaximize().url(browser.launch_url);
        browser.waitForElementPresent('body');
        loginModule["Login to Medicaid as Regular User"](browser);
    },
    after: function (browser) {
        loginModule["Verify logout from SPA and Wavier Dashboard as Regular User"](browser);
        console.log("Stopping test executions...")
        console.log('Closing down the browser instance...');
        browser.end();
    },
    'Verify the attachment types for SPA': function (browser) {
        browser.click("button#spaSubmitBtn");
        let fileUploadElem = "[name='uploader-input-0']";
        // Verify upload PDF file 
        let filePath = require('path').resolve(__dirname + '/files/adobe.pdf')
        browser.useCss().setValue(fileUploadElem, filePath);
        browser.useXpath().expect.element(pdfElement).to.be.visible;
        browser.useCss().click("[fill='currentColor']");
        // Verify upload EXCEL file 
        filePath = require('path').resolve(__dirname + '/files/excel.xlsx')
        browser.useCss().setValue(fileUploadElem, filePath);
        browser.useXpath().expect.element(excelElement).to.be.visible;
        browser.useCss().click("[fill='currentColor']");
        // Verify upload DOC file 
        filePath = require('path').resolve(__dirname + '/files/file.docx')
        browser.useCss().setValue(fileUploadElem, filePath);
        browser.useXpath().expect.element(fileElement).to.be.visible;
        browser.useCss().click("[fill='currentColor']");
        // Verify upload PICTURE file 
        filePath = require('path').resolve(__dirname + '/files/picture.jpg')
        browser.useCss().setValue(fileUploadElem, filePath);
        browser.useXpath().expect.element(picElement).to.be.visible;
        browser.useCss().click("[fill='currentColor']");
        // Verify upload TEXT file 
        filePath = require('path').resolve(__dirname + '/files/textnotes.txt')
        browser.useCss().setValue(fileUploadElem, filePath);
        browser.useXpath().expect.element(textElement).to.be.visible;
        browser.useCss().click("[fill='currentColor']").pause(1000);
        browser.back();
    },
    'Verify the multiple attachment types for SPA': function (browser) {
        browser.useCss().click("button#spaSubmitBtn");
        let fileUploadElem = "[name='uploader-input-0']";
        // Verify upload PDF file 
        let filePath = require('path').resolve(__dirname + '/files/adobe.pdf')
        browser.useCss().setValue(fileUploadElem, filePath);
        browser.useXpath().expect.element(pdfElement).to.be.visible;
        // Verify upload EXCEL file 
        filePath = require('path').resolve(__dirname + '/files/excel.xlsx')
        browser.useCss().setValue(fileUploadElem, filePath);
        browser.useXpath().expect.element(excelElement).to.be.visible;
        // Verify upload DOC file 
        filePath = require('path').resolve(__dirname + '/files/file.docx')
        browser.useCss().setValue(fileUploadElem, filePath);
        browser.useXpath().expect.element(fileElement).to.be.visible;
        // Verify upload PICTURE file 
        filePath = require('path').resolve(__dirname + '/files/picture.jpg')
        browser.useCss().setValue(fileUploadElem, filePath);
        browser.useXpath().expect.element(picElement).to.be.visible;
        // Verify upload TEXT file 
        filePath = require('path').resolve(__dirname + '/files/textnotes.txt')
        browser.useCss().setValue(fileUploadElem, filePath);
        browser.useXpath().expect.element(textElement).to.be.visible;
        browser.back();
    },
    'Verify the uploaded attachment in the submission lists for the submitted SPA/Waiver': function (browser) {
        browser.useCss();
        submitWaiver["Verify that user can submit a New Waiver"](browser);
        let waiverNumber = '//tbody/tr[1]/td/a';
        let attachementElement = ".form-container a[target='_blank']";
        browser.useXpath().click(waiverNumber);
        browser.useCss().expect.element(attachementElement).to.be.visible;
        browser.back();
    },
    'Verify “No file chosen” case': function (browser) {
        browser.useCss().click("button#spaSubmitBtn");
        browser.verify.containsText("tr:nth-of-type(1) > td:nth-of-type(3)", "No file chosen"); 
        browser.back();
    }
}
/*
# Test Case Location:
---------------------------------------------------------------------------------------
proot root directory name:  macstack-spa-submission-form ===> projroot/
projroot/package.json:
---------------------------------------------------------------------------------------
 1) All of the external code library we use, are stated here.
 2) Also custome command script short-cuts are stated here as well.
    It is located at "Scripts" section.
      For example instead of running lenghty test command like below every time:
            node nightwatch -c conf/nightwatch.conf.js -e chrome --tag smoke
    We can simply run it like this
        npm run smoke-build-test
projroot/conf/nightwatch.conf.js
---------------------------------------------------------------------------------------
1) Configuration file that connects .env file to test scripts
2) Configuration file that contains webdriver set-up details
Automation Test Scripts:  projroot/tests/suites/
---------------------------------------------------------------------------------------
1. create javascript file
2. write before function
3. write after fucntion
4. write as many test cases you need
*/
