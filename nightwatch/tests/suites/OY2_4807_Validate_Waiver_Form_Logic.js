// Updated by: Guli 
// Date      : 03/04/2021

const login = require('../cases/OY2-1494_Test_SPA_Login');
let spaID;
module.exports = {
    "@tags": ["waiverFormValidation", "smoke", "regression"],

    // Opens the browser, goes to the test site
    before: function (browser) {
        console.log('Setting up the browser instance...');
        console.log('Opening the browser...')
        console.log('Maximizing the browser window size...');
        browser.windowMaximize().url(browser.launch_url);
        browser.waitForElementPresent('body');
        login["Login to Medicaid as Regular User"](browser);
    },

    // After all the test case executions, clear out the browser
    after: function (browser) {
        login["Verify logout from SPA and Wavier Dashboard as Regular User"](browser);
        console.log("Stopping test executions...")
        console.log('Closing down the browser instance...');
        browser.end();
    },

    'Verify that user can submit a New Waiver': function (browser) {
        browser.click('button#waiverBtn');    // click Submit New Waiver
        browser.click('select#actionType');   // click action type
        browser.click("select#actionType > option[value='new']");  // Select "New Waiver"
        browser.click('select#waiverAuthority'); // Click Waiver Authority
        browser.click("select#waiverAuthority > option[value='1915(b)(4)']");
        let num1 = Math.floor(Math.random() * Math.floor(80)) + 10;
        let num2 = Math.floor(Math.random() * Math.floor(80)) + 10;
        // SS.#####
        spaID = 'MD.' + num1 + '' + num2;
        browser.setValue('input#transmittalNumber', spaID);

        // upload the file 
        let fileUploadElem = "[name='uploader-input-0']";
        browser.assert.elementPresent(fileUploadElem);
        let filePath = require('path').resolve(__dirname + '/files/file.docx')
        console.log("FILE PAHT: " + filePath);
        browser.setValue(fileUploadElem, filePath);

        // write the Summary 
        let phrase = "This is a test, test, test";
        browser.setValue('textarea#textfield_1', phrase);

        // Submit the new SPA 
        browser.click("[value='Submit']");

        // Verify the SPA on Submission List 
        browser.useXpath().verify.containsText('(//table//td)[1]/a', spaID);
        browser.useCss();
    },

    // -----------------------------------------New Waiver----------------------------------------------------------------------------

    'Validate Waiver Form Logic for New Waiver and 1915(c)': function (browser) {
        // Submit Waiver again
        browser.click('button#waiverBtn');    // click Submit New Waiver
        browser.click('select#actionType');   // click action type
        browser.click("select#actionType > option[value='new']");  // Select "New Waiver"
        browser.click('select#waiverAuthority'); // Click Waiver Authority
        browser.click("select#waiverAuthority > option[value='1915(b)(4)']");
        browser.click('input#transmittalNumber');
        browser.setValue('input#transmittalNumber', spaID); // wait for 2 seconds
        browser.keys([browser.Keys.TAB]);

        // Verify that duplicate error message
        let expected = "According to our records, this Waiver Number already exists. Please check the Waiver Number and try entering it again.";
        browser.verify.containsText('div#transmittalNumberStatusMsg', expected).pause(50000);
        browser.back();  // go back to previous page
    },


    'Validate Waiver Form Logic for New Waiver and All other': function (browser) {
        browser.click('button#waiverBtn');    // click Submit New Waiver
        browser.click('select#actionType');   // click action type
        browser.click("select#actionType > option[value='new']");  // Select "New Waiver"
        browser.click('select#waiverAuthority'); // Click Waiver Authority
        browser.click("select#waiverAuthority > option[value='1915(b)']");   // dropdown value
        browser.click('input#transmittalNumber');
        browser.setValue('input#transmittalNumber', spaID); // wait for 2 seconds
        browser.keys([browser.Keys.TAB]);

        //browser.setValue('input#transmittalNumber', 'VA.32.R19.67'); // wait for 2 seconds

        // Verify that duplicate error message
        let expected = "According to our records, this Waiver Number already exists. Please check the Waiver Number and try entering it again.";
        browser.verify.containsText('div#transmittalNumberStatusMsg', expected);
        browser.back();  // go back to previous page
    },

    'Validate Waiver Form Logic for New Waiver and Apendex K Waiver': function (browser) {
        browser.click('button#waiverBtn');    // click Submit New Waiver
        browser.click('select#actionType');   // click action type
        browser.click("select#actionType > option[value='new']");  // Select "New Waiver"
        browser.click('select#waiverAuthority'); // Click Waiver Authority
        browser.click("select#waiverAuthority > option[value='1915(c)']");   // ----- dropdown value
        browser.click('input#transmittalNumber');
        browser.setValue('input#transmittalNumber', spaID); // wait for 2 seconds
        browser.keys([browser.Keys.TAB]);
        //browser.setValue('input#transmittalNumber', 'VA.32.R19.67'); // wait for 2 seconds

        // Verify that duplicate error message
        browser.expect.element('div#transmittalNumberStatusMsg').to.be.not.present;
        browser.back();  // go back to previous page
    },

    // ---------------------------------------------Waiver Amendament-------------------------------------------------------------------------

    'Validate Waiver Form Logic for Waiver Amendment and 1915(b)': function (browser) {
        browser.click('button#waiverBtn');    // click Submit New Waiver
        browser.click('select#actionType');   // click action type
        browser.click("select#actionType > option[value='amendment']");      // ----- Select "New Waiver"
        browser.click('select#waiverAuthority'); // Click Waiver Authority
        browser.click("select#waiverAuthority > option[value='1915(b)(4)']");
        browser.click('input#transmittalNumber');
        browser.setValue('input#transmittalNumber', spaID); // wait for 2 seconds
        browser.keys([browser.Keys.TAB]);
        //browser.setValue('input#transmittalNumber', 'VA.32.R19.67'); // wait for 2 seconds

        // Verify that duplicate error message
        browser.expect.element('div#transmittalNumberStatusMsg').to.be.not.present;
        browser.back();  // go back to previous page
    },

    'Validate Waiver Form Logic for Waiver Amendment and All other': function (browser) {
        browser.click('button#waiverBtn');    // click Submit New Waiver
        browser.click('select#actionType');   // click action type
        browser.click("select#actionType > option[value='amendment']");      // ----- Select "New Waiver"
        browser.click('select#waiverAuthority'); // Click Waiver Authority
        browser.click("select#waiverAuthority > option[value='1915(b)']");  // dropdown value
        browser.click('input#transmittalNumber');
        browser.setValue('input#transmittalNumber', spaID); // wait for 2 seconds
        browser.keys([browser.Keys.TAB]);
        //browser.setValue('input#transmittalNumber', 'VA.32.R19.67'); // wait for 2 seconds

        // Verify that duplicate error message
        browser.expect.element('div#transmittalNumberStatusMsg').to.be.not.present;
        browser.back();  // go back to previous page
    },

    'Validate Waiver Form Logic for Waiver Amendment and Apendex K Waiver': function (browser) {
        browser.click('button#waiverBtn');    // click Submit New Waiver
        browser.click('select#actionType');   // click action type
        browser.click("select#actionType > option[value='amendment']");  // Select "New Waiver"
        browser.click('select#waiverAuthority'); // Click Waiver Authority
        browser.click("select#waiverAuthority > option[value='1915(c)']");   // ----- dropdown value
        browser.click('input#transmittalNumber');
        browser.setValue('input#transmittalNumber', spaID); // wait for 2 seconds
        browser.keys([browser.Keys.TAB]);
        //browser.setValue('input#transmittalNumber', 'VA.32.R19.67'); // wait for 2 seconds

        // Verify that duplicate error message
        browser.expect.element('div#transmittalNumberStatusMsg').to.be.not.present;
        browser.back();  // go back to previous page
    },


    // -----------------------------------------Request for Waiver Renewal----------------------------------------------------
    'Validate Waiver Form Logic for Waiver Renewal and 1915(b)': function (browser) {
        browser.click('button#waiverBtn');    // click Submit New Waiver
        browser.click('select#actionType');   // click action type
        browser.click("[value='renewal']");      // ----- Select "New Waiver"
        browser.click('select#waiverAuthority'); // Click Waiver Authority
        browser.click("select#waiverAuthority > option[value='1915(b)(4)']");
        browser.click('input#transmittalNumber');
        browser.setValue('input#transmittalNumber', spaID); // wait for 2 seconds
        browser.keys([browser.Keys.TAB]);
        //browser.setValue('input#transmittalNumber', 'VA.32.R19.67'); // wait for 2 seconds

        // Verify that duplicate error message
        browser.expect.element('div#transmittalNumberErrorMsg').to.be.not.present;
        browser.back();  // go back to previous page
    },

    'Validate Waiver Form Logic for Waiver Renewal and All other': function (browser) {
        browser.click('button#waiverBtn');    // click Submit New Waiver
        browser.click('select#actionType').pause(1000);   // click action type
        browser.click("[value='renewal']");      // ----- Select "New Waiver"
        browser.click('select#waiverAuthority'); // Click Waiver Authority
        browser.click("select#waiverAuthority > option[value='1915(b)']");   // dropdown value
        browser.click('input#transmittalNumber');
        browser.setValue('input#transmittalNumber', spaID); // wait for 2 seconds
        browser.keys([browser.Keys.TAB]);
        //browser.setValue('input#transmittalNumber', 'VA.32.R19.67'); // wait for 2 seconds

        // Verify that duplicate error message
        browser.expect.element('div#transmittalNumberErrorMsg').to.be.not.present;
        browser.back();  // go back to previous page
    },

    'Validate Waiver Form Logic for Waiver Renewal and Apendex K Waiver': function (browser) {
        browser.click('button#waiverBtn');    // click Submit New Waiver
        browser.click('select#actionType');   // click action type
        browser.click("[value='renewal']");  // Select "New Waiver"
        browser.click('select#waiverAuthority'); // Click Waiver Authority
        browser.click("select#waiverAuthority > option[value='1915(c)']");   // ----- dropdown value
        browser.click('input#transmittalNumber');
        browser.setValue('input#transmittalNumber', spaID); // wait for 2 seconds
        browser.keys([browser.Keys.TAB]);

        // Verify that duplicate error message
        browser.expect.element('div#transmittalNumberErrorMsg').to.be.not.present;
        browser.back();  // go back to previous page
    }
}
