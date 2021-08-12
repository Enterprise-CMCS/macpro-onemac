
const fs = require('fs');
const locator = '(//*[@disabled])';
const login = require('../suites/OY2_9999_Login');
const new_spa = require('../cases/OY2-2218_Test_SPA_Submit_New_SPA');
let spaID;
let spa;
let generatedWaiverID;
const timeout = 1000;


module.exports = {
    "@tags": ["smoke", "smoke2"],

    before: function (browser) {
        login.beforeEach(browser);
        login['Login with state submitter user'](browser);
    },
    after: function (browser) {
        login.afterEach(browser);
    },

    'Verify user can submit 1915(b) Waiver Action': function (browser) {
        browser.useCss().click("#new-submission-button");
        browser.useXpath().click("(//li[@class='choice']/a)[2]");
        browser.useXpath().click("(//li[@class='choice']/a)[1]");
        browser.useCss().click("select#actionType");
        browser.useCss().click("select#actionType > option[value='new']");
        browser.useCss().click("select#waiverAuthority");
        browser.useCss().click("select#waiverAuthority > option[value='1915(b)(4)']");

        // Enter Waiver number
        let num1 = Math.floor(Math.random() * Math.floor(80)) + 10;
        let num2 = Math.floor(Math.random() * Math.floor(80)) + 10;
        let num3 = Math.floor(Math.random());
        // SS-YY-NNNN
        generatedWaiverID = 'MD.' + num1 + '' + num2 + '' + num3;
        // input the SPA ID number 
        browser.useCss().setValue("input#transmittalNumber", generatedWaiverID);

        // upload a document and make a comment 
        let fileUploadElem = "[name='uploader-input-0']";
        let filePath = require('path').resolve(__dirname + '/files/file.docx')
        browser.useCss().setValue(fileUploadElem, filePath).pause(5000);
        

        // write the Summary 
        let phrase = "This is a test, test, test";
        let charCount = "//*[@id='root']/div/div[3]/div[2]/form/div[3]/div[2]";
        browser.useXpath().assert.elementPresent(charCount);
        browser.useXpath().assert.containsText( charCount, "0/4000");
        browser.useCss();
        browser.setValue('textarea', phrase);
        browser.useXpath().assert.containsText( charCount, "26/4000");
        browser.useCss();
        filePath = require('path').resolve(__dirname + '/files/textvalidation.txt')
        console.log("filePath--" , filePath);
        let text4000 = fs.readFileSync(filePath,'utf8');
        browser.pause(2000);
        browser.setValue('textarea', text4000);
        browser.useXpath().assert.containsText( charCount, "4000/4000");
        browser.useCss();
        browser.pause(3000);

        // click ["Submit"] button 
        browser.useCss().click("[value='Submit']").pause(6000);

        // Verify the submitted Waiver Report Content 
        const submittedIDNumber = "//tbody/tr[1]/td[1]/a";
        let submittedType = "[id=type-0] span";
        let submittedDate = "[id=submittedAt-0]";
        // Waiver ID Verification 
       // browser.useCss().expect.element(submittedIDNumber).to.be.visible;
        browser.waitForElementPresent('xpath', submittedIDNumber)
        browser.useXpath().assert.containsText(submittedIDNumber, generatedWaiverID);
        // Submitted Type Verification 
        browser.useCss().expect.element(submittedType).to.be.visible;
        browser.useCss().assert.containsText(submittedType, "Waiver");
        // Data Submitted Verification 
        browser.useCss().expect.element(submittedDate).to.be.visible;
        browser.click("xpath", "//table[@class='submissions-table']//tr[1]/td[1]/a").pause(2000);
        browser.useXpath().assert.not.elementPresent("/html/body/reference/div/div/div[4]/form/div[1]/div/div[1]/div[2]/a");
        browser.useXpath().assert.not.elementPresent("/html/body/reference/div/div/div[4]/form/div[2]/p[2]");
        browser.useCss();
        browser.click( "#back-button > svg").waitForElementPresent("body");
        browser.pause(5000);
    },


    'Verify user can submit 1915(b) Waiver Action Error Messages': function (browser) {
        
        const tests_data={
            wavNum: {
                selector: "/html/body/reference/div/div/div[3]/div[2]/form/div[1]/div/input",
            },
            error1:{
                selector: "/html/body/reference/div/div/div[3]/div[2]/form/div[1]/div/div[2]",
            },
            
        }
        browser.useCss().click("#new-submission-button");
        browser.useXpath().click("(//li[@class='choice']/a)[2]");
        browser.useXpath().click("(//li[@class='choice']/a)[1]");
        browser.useCss().click("select#actionType");
        browser.useCss().click("select#actionType > option[value='new']");
        browser.useCss().click("select#waiverAuthority");
        browser.useCss().click("select#waiverAuthority > option[value='1915(b)(4)']");
        console.log("generatedWaiverID--" + generatedWaiverID);
        browser.useCss().setValue("input#transmittalNumber", generatedWaiverID);
        browser.useXpath().assert.containsText(tests_data.error1.selector, "According to our records, this Waiver Number already exists. Please check the Waiver Number and try entering it again.").pause(6000);
        browser.useCss();
        browser.clearValue("xpath", tests_data.wavNum.selector);
        browser.setValue("xpath", tests_data.wavNum.selector, 'MD.123456' );
        browser.useXpath().assert.containsText(tests_data.error1.selector, "The Waiver Number must be in the format of SS.#### or SS.#####").pause(6000);
        browser.useCss();
        browser.clearValue("xpath", tests_data.wavNum.selector);
        browser.setValue("xpath", tests_data.wavNum.selector, 'TX' );
        browser.useXpath().assert.containsText(tests_data.error1.selector, "You can only submit for a state you have access to. If you need to add another state, visit your user profile to request access.").pause(6000);
        browser.useCss();

       
        //Renewal
        browser.useCss().click("select#actionType");
        browser.useCss().click("select#actionType > option[value='renewal']");
        browser.useCss().click("select#waiverAuthority");
        browser.useCss().click("select#waiverAuthority > option[value='1915(b)(4)']");
        browser.clearValue("xpath", tests_data.wavNum.selector);
        browser.setValue("xpath", tests_data.wavNum.selector, 'MD.7662' ).pause(5000);
        browser.useXpath().assert.containsText(tests_data.error1.selector, "The Waiver Number must be in the format of SS.####.R## or SS.#####.R##").pause(3000);
        browser.useCss();
        browser.clearValue("xpath", tests_data.wavNum.selector);
        browser.setValue("xpath", tests_data.wavNum.selector, 'MD.9999.R01' );
        browser.useXpath().assert.containsText(tests_data.error1.selector, "Waiver Number not found. Please ensure you have the correct Waiver Number before submitting. Contact the MACPro Help Desk (code: OMP002) if you need support.").pause(3000);
        browser.useCss();
    
        
        //Amendment
        browser.useCss().click("select#actionType");
        browser.useCss().click("select#actionType > option[value='amendment']");
        browser.verify.not.containsText("select#actionType", '1915(c) Appendix K Amendment');
        browser.useCss().click("select#waiverAuthority");
        browser.useCss().click("select#waiverAuthority > option[value='1915(b)(4)']");
        browser.clearValue("xpath", tests_data.wavNum.selector);
        browser.setValue("xpath", tests_data.wavNum.selector, 'MD-23-1234' );
        browser.useXpath().assert.containsText(tests_data.error1.selector, "The Waiver Number must be in the format of SS.####.R##.M## or SS.#####.R##.M##").pause(3000);
        browser.useCss();
        browser.clearValue("xpath", tests_data.wavNum.selector);
        browser.setValue("xpath", tests_data.wavNum.selector, 'MD.7321.R03.M05' );
        browser.useXpath().assert.containsText(tests_data.error1.selector, "Waiver Number not found. Please ensure you have the correct Waiver Number before submitting. Contact the MACPro Help Desk (code: OMP002) if you need support.").pause(3000);
        browser.useCss();
        browser.clearValue("xpath", tests_data.wavNum.selector);
        browser.useCss();     
    },

}