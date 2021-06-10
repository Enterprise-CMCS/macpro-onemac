const { first } = require('lodash');
const login = require('../cases/OY2-1494_Test_SPA_Login');

let spaCHIPId;
module.exports = {
    "@tags": ["smoke", "regression-soon"],

    before: function (browser) {
        const testData = {
            username: process.env.TEST_STATE_USERS,
            password: process.env.TEST_STATE_USER_PASSWORD,
          }
          login.before(browser);
          //click on button
          //browser.useCss().click("#loginBtn");
        login["Login to SPA and Waiver Dashboard via Okta"](browser,testData);
    },

    after: function (browser) {
        login["Verify logout from SPA and Wavier Dashboard as Regular User"](browser);
        console.info("Stopping test executions...")
        console.info('Closing down the browser instance...');
        browser.end();
    },

    'State user check the Submit 1915(c) Appendix K Amendment': function (browser) {
        // Go to Submit 1915(c) Appendix K Amendment
        //browser.useXpath().click("(//button[@class='ds-c-button ds-c-button--transparent'])[8]");
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[4]");
        // Verify that Submit 1915(c) Appendix K Amendment is displayed 
        browser.useCss().expect.element('form > h3:nth-of-type(1)').to.be.visible;
        // Verify that text "if your Appendix ..." shows up on the page
        browser.useXpath().expect.element('//div[@class="form-subheader-message"]').to.be.visible;
        // Verify that waiver formate message shows up
        browser.useXpath().expect.element('//div[@class="label-container"]/p').to.be.visible
        browser.useCss();

        // Enter Waiver number
        let YY = Math.floor(Math.random() * Math.floor(80)) + 10;
        let NNNNN = Math.floor(Math.random() * Math.floor(79999)) + 10000;
        //let xxxx = Math.floor(Math.random() * Math.floor(7999)) + 1000;
        // SS.####.R##.## or SS.#####.R##.## use wrong format to check error message
        //spaCHIPId = 'MD.'+'2345678'+'R11'+'41';
        //browser.useCss().setValue("input#transmittalNumber", spaCHIPId);
        //browser.useXpath().expect.element('(//div[@class="ds-u-color--error"])[1]').to.be.visible;
        //enter the correct waiver number format
        //browser.useCss().setValue("input#transmittalNumber", '');
        let spaCHIPId2 = 'MD.' + NNNNN + '.R' + YY + '.' + YY;
        // input the SPA ID number 
        browser.useCss().setValue("input#transmittalNumber", spaCHIPId2);

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
        browser.useXpath().setValue('//textarea', 'This is a test K Amendment');

        // Click Submit 
        browser.useCss().click("[value='Submit']").pause(1000);

        // Verify the CHIP SPA was submitted 
        browser.useXpath().verify.containsText("(//tbody/tr)[1]/td[1]/a", spaCHIPId2);
        browser.useXpath().verify.containsText("(//tbody/tr)[1]/td[2]", "1915(c) Appendix K Amendment");
        browser.useCss();
    },


    'State user check the Submit 1915(c) Appendix K Amendment error message on format and FAQ': function (browser) {
        // Go to Submit 1915(c) Appendix K Amendment
        //browser.useXpath().click("(//button[@class='ds-c-button ds-c-button--transparent'])[8]");
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[4]");
        // Verify that Submit 1915(c) Appendix K Amendment is displayed 
        browser.useCss().expect.element('form > h3:nth-of-type(1)').to.be.visible;

        // Enter Waiver number
        // SS.####.R##.## or SS.#####.R##.## use wrong format to check error message
        spaCHIPId = 'MD.'+'2345678'+'R11'+'41';
        browser.useCss().setValue("input#transmittalNumber", spaCHIPId);
        browser.useXpath().expect.element('(//div[@class="ds-u-color--error"])[1]').to.be.visible;

        // Verify the attachment names
        let first_1915c_Template = "(//div[@class='uploader-type-label'])[1]";
        let second_other = "(//div[@class='uploader-type-label'])[2]";
        browser.useXpath().expect.element(first_1915c_Template).to.be.visible;
        browser.useXpath().expect.element(second_other).to.be.visible;

        //click on "What is my Waiver Number?" link and FAQ page
        let what_isWaiver_number = "//div[@class='label-rcol']/a";
        browser.useXpath().click(what_isWaiver_number).pause(500);
        //Switch to new tab
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[1];
            browser.switchWindow(handle);
        });
        // Verify the new window 
        //let pageBanner = 'div#title_bar > h1';
        let waivers_title = "(//h3)[2]";
        //let expectedBannerText = 'Frequently Asked Questions';
        let expectedWaiver = 'Waivers';
        //browser.useCss().moveToElement(pageBanner, 10, 10).pause(200);
        browser.useXpath().moveToElement(waivers_title, 10, 10).pause(200);
        //browser.useCss().expect.element(pageBanner).to.be.visible;
        browser.useXpath().expect.element(waivers_title).to.be.visible;
        //browser.verify.containsText(pageBanner, expectedBannerText);
        browser.verify.containsText(waivers_title, expectedWaiver);
        browser.useXpath().click("(//h4[@class='faq-collapsible-trigger'])[5]").pause(200);
        let r_message = "((//div[@class='Collapsible__contentOuter']/div/ul)[3]/li)[3]";
        let last_two_number = "((//div[@class='Collapsible__contentOuter']/div/ul)[3]/li)[4]";
        let r02 = "((//div[@class='Collapsible__contentOuter']/div)[5]/p)[2]";
        browser.useXpath().expect.element(r_message).to.be.visible;
        browser.useXpath().expect.element(last_two_number).to.be.visible;
        browser.useXpath().expect.element(r02).to.be.visible;
        browser.closeWindow(); // Close tab
        // Switch to main window
        browser.windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[0];
            browser.switchWindow(handle);
        })
        browser.useXpath().moveToElement('//div[@class="nav-left"]/img', 10, 10).pause(200);
        browser.useCss();
    }
    
}