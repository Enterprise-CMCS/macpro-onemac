// Updated by: Guli 
// Date      : 03/23/2021
// Updated on  06/15/2021

const login = require('../suites/OY2_9999_Login');
let spaID;
module.exports = {
    "@tags": ["smoke", "regression-soon"],

    // Opens the browser, goes to the test site
    before: function (browser) {
        login.beforeEach(browser);
        login['Login with state submitter user'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);
    },

    'Verify that submitter user can submit a New Waiver': function (browser) {
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(2500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.useCss();
        //browser.click('button#waiverBtn');    // click Submit New Waiver
        browser.click('select#action-type');   // click action type
        browser.click("select#action-type > option[value='new']");  // Select "New Waiver"
        browser.click('select#waiver-authority'); // Click Waiver Authority
        browser.click("select#waiver-authority > option[value='1915(b)(4)']");
        let num1 = Math.floor(Math.random() * Math.floor(80)) + 10;
        let num2 = Math.floor(Math.random() * Math.floor(80)) + 10;
        let num3 = Math.floor(Math.random());
        // SS.#####
        spaID = 'MD.' + num1 + '' + num2 + '' + num3;
        browser.setValue('input#transmittalNumber', spaID);

        // upload the file 
        let fileUploadElem = "[name='uploader-input-0']";
        browser.assert.elementPresent(fileUploadElem).pause(2000);
        let filePath = require('path').resolve(__dirname + '/files/file.docx')
        console.log("FILE PAHT: " + filePath);
        browser.setValue(fileUploadElem, filePath).pause(2000);

        // write the Summary 
        let phrase = "This is a test, test, test";
        browser.setValue('textarea', phrase);

        // Submit the new SPA 
        browser.click("[value='Submit']").pause(2000);
        browser.pause(3000);
        browser.refresh();

        // Verify the SPA on Submission List 
        //browser.useXpath().verify.containsText('(//table//td)[1]/a', spaID);
        browser.useXpath().verify.containsText('//td[@id="transmittalNumber-0"]/a',spaID);
        browser.useCss();
        return spaID;
    },

    // -----------------------------------------New Waiver----------------------------------------------------------------------------
    
    'Validate Waiver Form Logic for New Waiver and 1915(c)': function (browser) {
        // Submit Waiver again
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(2500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.useCss();
        //browser.click('button#waiverBtn');    // click Submit New Waiver
        browser.click('select#action-type');   // click action type
        browser.click("select#action-type > option[value='new']");  // Select "New Waiver"
        browser.click('select#waiver-authority'); // Click Waiver Authority
        browser.click("select#waiver-authority > option[value='1915(b)(4)']");
        browser.click('input#transmittalNumber');
        browser.setValue('input#transmittalNumber', spaID); // wait for 2 seconds
        browser.keys([browser.Keys.TAB]);
        let phrase = "Test for number exists";
        browser.setValue('textarea', phrase);

        // Verify that duplicate error message
        let expected = "this Waiver Number already exists";
        browser.useXpath().verify.containsText('//div[@id="transmittalNumberStatusMsg"]', expected).pause(6000);
        //browser.back();  // go back to previous page
        let dashboard_link = "//a[@id='dashboardLink']";
        browser.useXpath().click(dashboard_link);
        browser.useCss();
    },


    // 'Validate Waiver Form Logic for New Waiver and All other': function (browser) {
    //     //browser.click('button#waiverBtn');    // click Submit New Waiver
    //     browser.useXpath().click("//a[@id='new-submission-button']");
    //     browser.pause(2500);
    //     browser.useXpath().click("(//h4)[2]");
    //     browser.pause(500);
    //     browser.useXpath().click("(//h4)[1]");
    //     browser.useCss();
    //     browser.click('select#action-type');   // click action type
    //     browser.click("select#action-type > option[value='new']");  // Select "New Waiver"
    //     browser.click('select#waiver-authority'); // Click Waiver Authority
    //     browser.click("select#waiver-authority > option[value='1915(b)']");   // dropdown value
    //     browser.click('input#transmittalNumber');
    //     browser.setValue('input#transmittalNumber', spaID); // wait for 2 seconds
    //     browser.keys([browser.Keys.TAB]);
    //     let phrase = "Test for number exists";
    //     browser.setValue('textarea', phrase);

    //     //browser.setValue('input#transmittalNumber', 'VA.32.R19.67'); // wait for 2 seconds

    //     // Verify that duplicate error message
    //     let expected = "this Waiver Number already exists";
    //     browser.useXpath().verify.containsText('//div[@id="transmittalNumberStatusMsg"]', expected).pause(2000);
    //     //browser.back();  // go back to previous page
    //     let dashboard_link = "//a[@id='dashboardLink']";
    //     browser.useXpath().click(dashboard_link);
    //     browser.useCss();
    // },

    
    // ---------------------------------------------Waiver Amendament-------------------------------------------------------------------------

    'Validate Waiver Form Logic for Waiver Amendment and 1915(b)': function (browser) {
        //browser.click('button#waiverBtn');    // click Submit New Waiver
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(1500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.useCss();
        browser.click('select#action-type');   // click action type
        browser.click("select#action-type > option[value='amendment']");      // ----- Select "New Waiver"
        browser.click('select#waiver-authority'); // Click Waiver Authority
        browser.click("select#waiver-authority > option[value='1915(b)(4)']");
        browser.click('input#transmittalNumber');
        browser.setValue('input#transmittalNumber', "MD.3772 "); // wait for 2 seconds
        browser.keys([browser.Keys.TAB]);

        // Verify that duplicate error message
        let expected = "this Waiver Number already exists";
        browser.expect.element('div#transmittalNumberStatusMsg').text.to.not.equal(expected);
        //browser.back();  // go back to previous page
        let dashboard_link = "//a[@id='dashboardLink']";
        browser.useXpath().click(dashboard_link);
        browser.useCss();
    },

    'Validate Waiver Form Logic for Waiver Amendment and All other': function (browser) {
        //browser.click('button#waiverBtn');    // click Submit New Waiver
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(1500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.useCss();
        browser.click('select#action-type');   // click action type
        browser.click("select#action-type > option[value='amendment']");      // ----- Select "New Waiver"
        browser.click('select#waiver-authority'); // Click Waiver Authority
        browser.click("select#waiver-authority > option[value='1915(b)']");  // dropdown value
        browser.click('input#transmittalNumber');
        browser.setValue('input#transmittalNumber', spaID); // wait for 2 seconds
        browser.keys([browser.Keys.TAB]);
        //browser.setValue('input#transmittalNumber', 'VA.32.R19.67'); // wait for 2 seconds

        // Verify that duplicate error message
        let expected = "this Waiver Number already exists";
        browser.expect.element('div#transmittalNumberStatusMsg').text.to.not.equal(expected);
        //browser.back();  // go back to previous page
        let dashboard_link = "//a[@id='dashboardLink']";
        browser.useXpath().click(dashboard_link);
        browser.useCss();
    },

    // -----------------------------------------Request for Waiver Renewal----------------------------------------------------
    'Validate Waiver Form Logic for Waiver Renewal and 1915(b)': function (browser) {
        //browser.click('button#waiverBtn');    // click Submit New Waiver
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(1500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.useCss();
        browser.click('select#action-type');   // click action type
        browser.click("[value='renewal']");      // ----- Select "New Waiver"
        browser.click('select#waiver-authority'); // Click Waiver Authority
        browser.click("select#waiver-authority > option[value='1915(b)(4)']");
        browser.click('input#transmittalNumber');
        browser.setValue('input#transmittalNumber', spaID); // wait for 2 seconds
        browser.keys([browser.Keys.TAB]);
        //browser.setValue('input#transmittalNumber', 'VA.32.R19.67'); // wait for 2 seconds

        // Verify that duplicate error message
        let expected = "this Waiver Number already exists";
        browser.expect.element('div#transmittalNumberStatusMsg').text.to.not.equal(expected);
        //browser.back();  // go back to previous page
        let dashboard_link = "//a[@id='dashboardLink']";
        browser.useXpath().click(dashboard_link);
        browser.useCss();
    },

    'Validate Waiver Form Logic for Waiver Renewal and All other': function (browser) {
        //browser.click('button#waiverBtn');    // click Submit New Waiver
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(1500);
        browser.useXpath().click("(//h4)[2]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.useCss();
        browser.click('select#action-type').pause(1000);   // click action type
        browser.click("[value='renewal']");      // ----- Select "New Waiver"
        browser.click('select#waiver-authority'); // Click Waiver Authority
        browser.click("select#waiver-authority > option[value='1915(b)']");   // dropdown value
        browser.click('input#transmittalNumber');
        browser.setValue('input#transmittalNumber', spaID); // wait for 2 seconds
        browser.keys([browser.Keys.TAB]);
        //browser.setValue('input#transmittalNumber', 'VA.32.R19.67'); // wait for 2 seconds

        // Verify that duplicate error message
        let expected = "this Waiver Number already exists";
        browser.expect.element('div#transmittalNumberStatusMsg').text.to.not.equal(expected);
        //browser.back();  // go back to previous page
        let dashboard_link = "//a[@id='dashboardLink']";
        browser.useXpath().click(dashboard_link);
        browser.useCss();
    }
    
    
}